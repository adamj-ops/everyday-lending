/**
 * PaymentService Unit Tests
 *
 * Tests payment processing logic, waterfall calculations, and error handling
 */

import type { Mock } from 'vitest';
import type { LoanService } from '@/services/LoanService';
import type { PlaidService } from '@/services/PlaidService';
import type { StripeService } from '@/services/StripeService';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PaymentFailedError, PaymentService, WebhookVerificationError } from '@/services/PaymentService';

// Mock the database
vi.mock('@/libs/DB', () => {
  const mockPaymentRecord = {
    id: 1,
    loanId: 1,
    paymentDate: new Date(),
    amount: '1000.00',
    principalAmount: '800.00',
    interestAmount: '200.00',
    feesAmount: '0.00',
    lateFeeAmount: '0.00',
    paymentType: 'principal',
    paymentMethod: 'ach',
    referenceNumber: 'pi_test_123',
    notes: 'Test payment',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return {
    db: {
      insert: vi.fn().mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockPaymentRecord]),
        }),
      }),
      update: vi.fn().mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([mockPaymentRecord]),
          }),
        }),
      }),
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockResolvedValue([mockPaymentRecord]),
            limit: vi.fn().mockResolvedValue([mockPaymentRecord]),
          }),
          limit: vi.fn().mockResolvedValue([mockPaymentRecord]),
        }),
      }),
      raw: vi.fn((sql: string) => sql),
      count: vi.fn(),
    },
  };
});

// Mock the services
const mockLoanService = {
  getLoanById: vi.fn(),
} as unknown as LoanService;

const mockStripeService = {
  createPaymentIntent: vi.fn(),
  verifyWebhookSignature: vi.fn(),
} as unknown as StripeService;

const mockPlaidService = {
  createACHTransfer: vi.fn(),
  verifyAccount: vi.fn(),
  getAccountBalance: vi.fn(),
} as unknown as PlaidService;

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(() => {
    vi.clearAllMocks();
    paymentService = new PaymentService(mockLoanService, mockStripeService, mockPlaidService);
  });

  describe('processPayment', () => {
    it('should process a payment successfully', async () => {
      // Arrange
      const mockLoan = {
        id: 1,
        currentBalance: '10000.00',
        interestPaid: '500.00',
        feesPaid: '100.00',
        lateFeesPaid: '50.00',
      };

      (mockLoanService.getLoanById as Mock).mockResolvedValue(mockLoan);
      (mockStripeService.createPaymentIntent as Mock).mockResolvedValue('pi_test_123');

      const request = {
        loanId: 1,
        amount: 1000,
        method: 'ach' as const,
        notes: 'Test payment',
      };

      // Act
      const result = await paymentService.processPayment(request);

      // Assert
      expect(result).toBeDefined();
      expect(result.loanId).toBe(1);
      expect(result.amount).toBe('1000.00');
      expect(mockLoanService.getLoanById).toHaveBeenCalledWith(1);
      expect(mockStripeService.createPaymentIntent).toHaveBeenCalledWith(1000, 'Payment for loan 1');
    });

    it('should throw PaymentFailedError when loan not found', async () => {
      // Arrange
      (mockLoanService.getLoanById as Mock).mockResolvedValue(null);

      const request = {
        loanId: 999,
        amount: 1000,
        method: 'ach' as const,
      };

      // Act & Assert
      await expect(paymentService.processPayment(request))
        .rejects
        .toThrow(PaymentFailedError);
    });

    it('should process ACH payment with bank account', async () => {
      // Arrange
      const mockLoan = {
        id: 1,
        currentBalance: '10000.00',
        interestPaid: '0.00',
        feesPaid: '0.00',
        lateFeesPaid: '0.00',
      };

      (mockLoanService.getLoanById as Mock).mockResolvedValue(mockLoan);
      (mockPlaidService.createACHTransfer as Mock).mockResolvedValue('transfer_123');

      const request = {
        loanId: 1,
        amount: 1000,
        method: 'ach' as const,
        bankAccountId: 'bank_123',
      };

      // Act
      const result = await paymentService.processPayment(request);

      // Assert
      expect(result).toBeDefined();
      expect(mockPlaidService.createACHTransfer).toHaveBeenCalledWith(
        'bank_123',
        1000,
        'Payment for loan 1',
      );
    });
  });

  describe('calculatePaymentAllocation', () => {
    it('should allocate payment correctly using waterfall logic', () => {
      // Arrange
      const mockLoan = {
        loanAmount: '10000.00',
        interestRate: '12.00', // 12% annual
        currentBalance: '10000.00',
        principalPaid: '0.00',
        interestPaid: '0.00',
        feesPaid: '0.00',
        lateFeesPaid: '0.00',
      };

      const paymentAmount = 1000;

      // Act
      const allocation = (paymentService as any).calculatePaymentAllocation(mockLoan, paymentAmount);

      // Assert
      // Accrued interest = 10000 * 0.12/12 = 100
      expect(allocation.interest).toBe(100); // All accrued interest
      // Outstanding fees = 10000 * 0.01 - 0 = 100
      expect(allocation.fees).toBe(100); // Outstanding fees
      // Outstanding late fees = 50 - 0 = 50
      expect(allocation.lateFees).toBe(50); // Outstanding late fees
      // Principal = 1000 - 100 - 100 - 50 = 750
      expect(allocation.principal).toBe(750); // Remaining after interest, fees, late fees
      expect(allocation.overpayment).toBe(0); // No overpayment
    });

    it('should handle overpayment correctly', () => {
      // Arrange
      const mockLoan = {
        loanAmount: '10000.00',
        interestRate: '12.00', // 12% annual
        currentBalance: '500.00',
        principalPaid: '9500.00',
        interestPaid: '100.00',
        feesPaid: '50.00',
        lateFeesPaid: '25.00',
      };

      const paymentAmount = 1000;

      // Act
      const allocation = (paymentService as any).calculatePaymentAllocation(mockLoan, paymentAmount);

      // Assert
      // Accrued interest = 500 * 0.12/12 = 5
      expect(allocation.interest).toBe(5);
      // Outstanding fees = 10000 * 0.01 - 50 = 50
      expect(allocation.fees).toBe(50);
      // Outstanding late fees = 50 - 25 = 25
      expect(allocation.lateFees).toBe(25);
      // Principal = 500 (current balance) + 420 (overpayment) = 920
      expect(allocation.principal).toBe(920);
      // Overpayment = 1000 - 5 - 50 - 25 - 500 = 420
      expect(allocation.overpayment).toBe(420);
    });

    it('should handle partial payment correctly', () => {
      // Arrange
      const mockLoan = {
        loanAmount: '10000.00',
        interestRate: '12.00', // 12% annual
        currentBalance: '10000.00',
        principalPaid: '0.00',
        interestPaid: '0.00',
        feesPaid: '0.00',
        lateFeesPaid: '0.00',
      };

      const paymentAmount = 200;

      // Act
      const allocation = (paymentService as any).calculatePaymentAllocation(mockLoan, paymentAmount);

      // Assert
      // Accrued interest = 10000 * 0.12/12 = 100
      expect(allocation.interest).toBe(100); // All accrued interest
      // Outstanding fees = 10000 * 0.01 - 0 = 100
      expect(allocation.fees).toBe(100); // All outstanding fees
      // Outstanding late fees = 50 - 0 = 50, but only 0 remaining after interest and fees
      expect(allocation.lateFees).toBe(0); // No late fees payment (insufficient funds)
      expect(allocation.principal).toBe(0); // No principal payment
      expect(allocation.overpayment).toBe(0); // No overpayment
    });
  });

  describe('calculateLateFee', () => {
    it('should calculate late fee correctly', () => {
      // Act
      const fee1 = paymentService.calculateLateFee(1, 5); // 5 days late
      const fee2 = paymentService.calculateLateFee(1, 30); // 30 days late
      const fee3 = paymentService.calculateLateFee(1, 100); // 100 days late (capped)

      // Assert
      expect(fee1).toBe(75); // 50 + (5 * 5) = 75
      expect(fee2).toBe(200); // 50 + (30 * 5) = 200
      expect(fee3).toBe(500); // Capped at 500
    });
  });

  describe('getPaymentHistory', () => {
    it('should retrieve payment history for a loan', async () => {
      // Act
      const history = await paymentService.getPaymentHistory(1);

      // Assert
      expect(history).toBeDefined();
      expect(Array.isArray(history)).toBe(true);
    });
  });

  describe('getPaymentById', () => {
    it('should retrieve payment by ID', async () => {
      // Act
      const payment = await paymentService.getPaymentById(1);

      // Assert
      expect(payment).toBeDefined();
      expect(payment?.id).toBe(1);
    });

    it('should return null for non-existent payment', async () => {
      // Arrange
      const { db } = await import('@/libs/DB');
      (db.select as Mock).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([]),
          }),
        }),
      });

      // Act
      const payment = await paymentService.getPaymentById(999);

      // Assert
      expect(payment).toBeNull();
    });
  });

  describe('verifyBankAccount', () => {
    it('should verify bank account successfully', async () => {
      // Arrange
      (mockPlaidService.verifyAccount as Mock).mockResolvedValue(true);

      // Act
      const result = await paymentService.verifyBankAccount('bank_123');

      // Assert
      expect(result).toBe(true);
      expect(mockPlaidService.verifyAccount).toHaveBeenCalledWith('bank_123');
    });

    it('should return false when verification fails', async () => {
      // Arrange
      (mockPlaidService.verifyAccount as Mock).mockRejectedValue(new Error('Verification failed'));

      // Act
      const result = await paymentService.verifyBankAccount('bank_123');

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('getAccountBalance', () => {
    it('should get account balance successfully', async () => {
      // Arrange
      (mockPlaidService.getAccountBalance as Mock).mockResolvedValue(5000);

      // Act
      const balance = await paymentService.getAccountBalance('bank_123');

      // Assert
      expect(balance).toBe(5000);
      expect(mockPlaidService.getAccountBalance).toHaveBeenCalledWith('bank_123');
    });

    it('should throw error when balance retrieval fails', async () => {
      // Arrange
      (mockPlaidService.getAccountBalance as Mock).mockRejectedValue(new Error('Balance retrieval failed'));

      // Act & Assert
      await expect(paymentService.getAccountBalance('bank_123'))
        .rejects
        .toThrow('Balance retrieval failed');
    });
  });

  describe('processSplitPayment', () => {
    it('should process split payment for multiple lenders', async () => {
      // Arrange
      const mockLoan = {
        id: 1,
        currentBalance: '10000.00',
        interestPaid: '0.00',
        feesPaid: '0.00',
        lateFeesPaid: '0.00',
      };

      (mockLoanService.getLoanById as Mock).mockResolvedValue(mockLoan);
      (mockStripeService.createPaymentIntent as Mock).mockResolvedValue('pi_test_123');

      // Mock lender participations
      const { db } = await import('@/libs/DB');
      (db.select as Mock).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([
            { id: 1, loanId: 1, lenderId: 1, participationPercentage: '60.00' },
            { id: 2, loanId: 1, lenderId: 2, participationPercentage: '40.00' },
          ]),
        }),
      });

      // Act
      const payments = await paymentService.processSplitPayment(1, 1000, 'ach');

      // Assert
      expect(payments).toHaveLength(2);
      expect(mockLoanService.getLoanById).toHaveBeenCalledTimes(2);
    });

    it('should throw error when no lender participations found', async () => {
      // Arrange
      const { db } = await import('@/libs/DB');
      (db.select as Mock).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      });

      // Act & Assert
      await expect(paymentService.processSplitPayment(1, 1000, 'ach'))
        .rejects
        .toThrow('No lender participations found for loan 1');
    });
  });

  describe('handleStripeWebhook', () => {
    it.skip('should handle payment success webhook', async () => {
      // Arrange
      (mockStripeService.verifyWebhookSignature as Mock).mockResolvedValue(true);

      const event = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_123',
          },
        },
      };

      // Act & Assert
      await expect(paymentService.handleStripeWebhook(event)).resolves.not.toThrow();
      expect(mockStripeService.verifyWebhookSignature).toHaveBeenCalledWith(event);
    });

    it.skip('should handle payment failure webhook', async () => {
      // Arrange
      (mockStripeService.verifyWebhookSignature as Mock).mockResolvedValue(true);

      const event = {
        type: 'payment_intent.payment_failed',
        data: {
          object: {
            id: 'pi_test_123',
            last_payment_error: {
              message: 'Card declined',
            },
          },
        },
      };

      // Act & Assert
      await expect(paymentService.handleStripeWebhook(event)).resolves.not.toThrow();
      expect(mockStripeService.verifyWebhookSignature).toHaveBeenCalledWith(event);
    });

    it('should throw WebhookVerificationError when signature is invalid', async () => {
      // Arrange
      (mockStripeService.verifyWebhookSignature as Mock).mockResolvedValue(false);

      const event = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_123',
          },
        },
      };

      // Act & Assert
      await expect(paymentService.handleStripeWebhook(event))
        .rejects
        .toThrow(WebhookVerificationError);
    });
  });
});
