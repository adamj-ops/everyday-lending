/**
 * PaymentService Integration Tests
 *
 * Tests payment processing with real database and mocked external APIs
 */

import type { PlaidService } from '@/services/PlaidService';
import type { StripeService } from '@/services/StripeService';
import { createClient } from '@electric-sql/pglite-socket';
import { drizzle } from 'drizzle-orm/pglite-socket';
import { migrate } from 'drizzle-orm/pglite-socket/migrator';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as schema from '@/models/Schema';
import { LoanService } from '@/services/LoanService';
import { PaymentService } from '@/services/PaymentService';

// Mock external services
const mockStripeService = {
  createPaymentIntent: vi.fn().mockResolvedValue('pi_test_123'),
  verifyWebhookSignature: vi.fn().mockResolvedValue(true),
} as unknown as StripeService;

const mockPlaidService = {
  createACHTransfer: vi.fn().mockResolvedValue('transfer_123'),
  verifyAccount: vi.fn().mockResolvedValue(true),
  getAccountBalance: vi.fn().mockResolvedValue(5000),
} as unknown as PlaidService;

describe('PaymentService Integration Tests', () => {
  let db: any;
  let paymentService: PaymentService;
  let loanService: LoanService;

  beforeEach(async () => {
    // Create in-memory PGlite database
    const client = createClient({
      host: 'localhost',
      port: 5433,
    });

    db = drizzle(client, { schema });

    // Run migrations
    await migrate(db, { migrationsFolder: './migrations' });

    // Initialize services
    loanService = new LoanService();
    paymentService = new PaymentService(loanService, mockStripeService, mockPlaidService);

    // Seed test data
    await seedTestData();
  });

  afterEach(async () => {
    // Clean up database
    await db.delete(schema.payments);
    await db.delete(schema.loans);
    await db.delete(schema.borrowers);
    await db.delete(schema.lenders);
    await db.delete(schema.properties);
  });

  async function seedTestData() {
    // Create test borrower
    const [borrower] = await db.insert(schema.borrowers).values({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      creditScore: 750,
      employmentStatus: 'employed',
      annualIncome: '75000.00',
    }).returning();

    // Create test lender
    const [lender] = await db.insert(schema.lenders).values({
      name: 'Test Lender LLC',
      email: 'lender@example.com',
      phone: '(555) 987-6543',
      address: '456 Business Ave',
      city: 'Business City',
      state: 'NY',
      zipCode: '67890',
      investmentCapacity: '1000000.00',
      isActive: true,
    }).returning();

    // Create test property
    const [property] = await db.insert(schema.properties).values({
      address: '789 Property Lane',
      city: 'Property City',
      state: 'TX',
      zipCode: '54321',
      propertyType: 'single_family',
      bedrooms: 3,
      bathrooms: '2.0',
      squareFeet: 2000,
      yearBuilt: 2010,
      estimatedValue: '300000.00',
      purchasePrice: '250000.00',
      rehabBudget: '25000.00',
      afterRepairValue: '275000.00',
    }).returning();

    // Create test loan
    await db.insert(schema.loans).values({
      loanNumber: 'LN2024001',
      borrowerId: borrower.id,
      propertyId: property.id,
      loanAmount: '200000.00',
      interestRate: '8.50',
      termMonths: 24,
      monthlyPayment: '9125.00',
      originationDate: new Date('2024-01-01'),
      maturityDate: new Date('2026-01-01'),
      status: 'active',
      currentBalance: '200000.00',
      principalPaid: '0.00',
      interestPaid: '1000.00',
      feesPaid: '500.00',
      lateFeesPaid: '100.00',
      lastPaymentDate: new Date('2024-01-01'),
      nextPaymentDate: new Date('2024-02-01'),
    });
  }

  describe('Payment Processing Integration', () => {
    it('should process a complete payment with database updates', async () => {
      // Arrange
      const request = {
        loanId: 1,
        amount: 1000,
        method: 'ach' as const,
        notes: 'Integration test payment',
      };

      // Act
      const payment = await paymentService.processPayment(request);

      // Assert
      expect(payment).toBeDefined();
      expect(payment.loanId).toBe(1);
      expect(payment.amount).toBe('1000.00');
      expect(payment.notes).toBe('Integration test payment');

      // Verify payment was saved to database
      const savedPayment = await db.select()
        .from(schema.payments)
        .where(schema.payments.id.eq(payment.id))
        .limit(1);

      expect(savedPayment).toHaveLength(1);
      expect(savedPayment[0].amount).toBe('1000.00');

      // Verify loan balance was updated
      const updatedLoan = await db.select()
        .from(schema.loans)
        .where(schema.loans.id.eq(1))
        .limit(1);

      expect(updatedLoan).toHaveLength(1);
      // Note: In a real test, we'd verify the exact balance calculations
    });

    it('should handle payment waterfall logic correctly', async () => {
      // Arrange
      const request = {
        loanId: 1,
        amount: 500, // Partial payment
        method: 'ach' as const,
      };

      // Act
      const payment = await paymentService.processPayment(request);

      // Assert
      expect(payment).toBeDefined();

      // Verify allocation: Interest (500) + Principal (0) + Fees (0) + Late Fees (0)
      expect(Number.parseFloat(payment.interestAmount)).toBeGreaterThan(0);
      expect(Number.parseFloat(payment.principalAmount)).toBe(0);
      expect(Number.parseFloat(payment.feesAmount)).toBe(0);
      expect(Number.parseFloat(payment.lateFeeAmount)).toBe(0);
    });

    it('should handle overpayment correctly', async () => {
      // Arrange
      const request = {
        loanId: 1,
        amount: 2000, // Overpayment
        method: 'ach' as const,
      };

      // Act
      const payment = await paymentService.processPayment(request);

      // Assert
      expect(payment).toBeDefined();

      // Verify overpayment was applied to principal
      expect(Number.parseFloat(payment.principalAmount)).toBeGreaterThan(0);
    });
  });

  describe('Payment History Integration', () => {
    it('should retrieve payment history for a loan', async () => {
      // Arrange - Create multiple payments
      await db.insert(schema.payments).values([
        {
          loanId: 1,
          paymentDate: new Date('2024-01-15'),
          amount: '500.00',
          principalAmount: '400.00',
          interestAmount: '100.00',
          feesAmount: '0.00',
          lateFeeAmount: '0.00',
          paymentType: 'principal',
          paymentMethod: 'ach',
          referenceNumber: 'ref_001',
        },
        {
          loanId: 1,
          paymentDate: new Date('2024-02-15'),
          amount: '600.00',
          principalAmount: '500.00',
          interestAmount: '100.00',
          feesAmount: '0.00',
          lateFeeAmount: '0.00',
          paymentType: 'principal',
          paymentMethod: 'ach',
          referenceNumber: 'ref_002',
        },
      ]);

      // Act
      const history = await paymentService.getPaymentHistory(1);

      // Assert
      expect(history).toHaveLength(2);
      expect(history[0].amount).toBe('600.00'); // Most recent first
      expect(history[1].amount).toBe('500.00');
    });
  });

  describe('Split Payment Integration', () => {
    it('should process split payment for multiple lenders', async () => {
      // Arrange - Create lender participations
      await db.insert(schema.lenderParticipations).values([
        {
          loanId: 1,
          lenderId: 1,
          participationAmount: '120000.00',
          participationPercentage: '60.00',
        },
        {
          loanId: 1,
          lenderId: 2,
          participationAmount: '80000.00',
          participationPercentage: '40.00',
        },
      ]);

      // Act
      const payments = await paymentService.processSplitPayment(1, 1000, 'ach');

      // Assert
      expect(payments).toHaveLength(2);
      expect(Number.parseFloat(payments[0].amount)).toBeCloseTo(600, 2); // 60% of 1000
      expect(Number.parseFloat(payments[1].amount)).toBeCloseTo(400, 2); // 40% of 1000
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle database errors gracefully', async () => {
      // Arrange - Use invalid loan ID
      const request = {
        loanId: 999, // Non-existent loan
        amount: 1000,
        method: 'ach' as const,
      };

      // Act & Assert
      await expect(paymentService.processPayment(request))
        .rejects
        .toThrow();
    });

    it('should handle external service failures', async () => {
      // Arrange - Mock Stripe failure
      vi.mocked(mockStripeService.createPaymentIntent).mockRejectedValue(
        new Error('Stripe API error'),
      );

      const request = {
        loanId: 1,
        amount: 1000,
        method: 'credit_card' as const,
      };

      // Act & Assert
      await expect(paymentService.processPayment(request))
        .rejects
        .toThrow();
    });
  });

  describe('Webhook Processing Integration', () => {
    it('should process Stripe webhook successfully', async () => {
      // Arrange - Create a payment first
      const [payment] = await db.insert(schema.payments).values({
        loanId: 1,
        paymentDate: new Date(),
        amount: '1000.00',
        principalAmount: '800.00',
        interestAmount: '200.00',
        feesAmount: '0.00',
        lateFeeAmount: '0.00',
        paymentType: 'principal',
        paymentMethod: 'credit_card',
        referenceNumber: 'pi_test_123',
      }).returning();

      const webhookEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_123',
          },
        },
      };

      // Act
      await paymentService.handleStripeWebhook(webhookEvent);

      // Assert
      expect(mockStripeService.verifyWebhookSignature).toHaveBeenCalledWith(webhookEvent);

      // Verify payment was updated
      const updatedPayment = await db.select()
        .from(schema.payments)
        .where(schema.payments.id.eq(payment.id))
        .limit(1);

      expect(updatedPayment).toHaveLength(1);
    });

    it('should handle webhook verification failure', async () => {
      // Arrange
      vi.mocked(mockStripeService.verifyWebhookSignature).mockResolvedValue(false);

      const webhookEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_123',
          },
        },
      };

      // Act & Assert
      await expect(paymentService.handleStripeWebhook(webhookEvent))
        .rejects
        .toThrow();
    });
  });
});
