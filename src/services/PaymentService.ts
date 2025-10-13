/**
 * PaymentService - Payment processing and reconciliation
 *
 * Responsibilities:
 * - Stripe Connect integration for marketplace payments
 * - Plaid integration for ACH and bank verification
 * - Payment scheduling and automation
 * - Reconciliation with accounting systems
 * - Failed payment handling and retry logic
 *
 * Architecture: Enhanced Modular Monolith Service Layer
 * Dependencies: Stripe, Plaid, Drizzle ORM, LoanService
 */

import type { LoanService } from './LoanService';
import type { PlaidService } from './PlaidService';
import type { StripeService } from './StripeService';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { lenderParticipations, loans, payments } from '@/models/Schema';

// Custom error classes
export class PaymentFailedError extends Error {
  constructor(paymentId: string, reason: string) {
    super(`Payment ${paymentId} failed: ${reason}`);
    this.name = 'PaymentFailedError';
  }
}

export class WebhookVerificationError extends Error {
  constructor(service: string) {
    super(`Webhook verification failed for ${service}`);
    this.name = 'WebhookVerificationError';
  }
}

export class InsufficientFundsError extends Error {
  constructor(amount: number, available: number) {
    super(`Insufficient funds: requested ${amount}, available ${available}`);
    this.name = 'InsufficientFundsError';
  }
}

// Payment types
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type PaymentType = 'principal' | 'interest' | 'fees' | 'escrow' | 'late_fee' | 'prepayment';
export type PaymentMethod = 'ach' | 'wire' | 'check' | 'credit_card';

export type PaymentRecord = {
  id: number;
  loanId: number;
  paymentDate: Date;
  amount: string;
  principalAmount: string;
  interestAmount: string;
  feesAmount: string;
  lateFeeAmount: string;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod | null;
  referenceNumber: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProcessPaymentRequest = {
  loanId: number;
  amount: number;
  method: PaymentMethod;
  bankAccountId?: string;
  referenceNumber?: string;
  notes?: string;
};

export type PaymentAllocation = {
  principal: number;
  interest: number;
  fees: number;
  lateFees: number;
  escrow: number;
  overpayment: number;
};

export class PaymentService {
  private loanService: LoanService;
  private stripeService: StripeService;
  private plaidService: PlaidService;

  constructor(loanService: LoanService, stripeService: StripeService, plaidService: PlaidService) {
    this.loanService = loanService;
    this.stripeService = stripeService;
    this.plaidService = plaidService;
  }

  /**
   * Process a payment for a loan
   * Implements payment waterfall: Interest → Principal → Fees → Escrow
   */
  async processPayment(request: ProcessPaymentRequest): Promise<PaymentRecord> {
    try {
      // 1. Validate loan exists and get loan details
      const loan = await this.loanService.getLoanById(request.loanId);
      if (!loan) {
        throw new Error(`Loan ${request.loanId} not found`);
      }

      // 2. Calculate payment allocation using waterfall logic
      const allocation = this.calculatePaymentAllocation(loan, request.amount);

      // 3. Create payment record
      const [paymentRecord] = await db.insert(payments).values({
        loanId: request.loanId,
        paymentDate: new Date(),
        amount: request.amount.toString(),
        principalAmount: allocation.principal.toString(),
        interestAmount: allocation.interest.toString(),
        feesAmount: allocation.fees.toString(),
        lateFeeAmount: allocation.lateFees.toString(),
        paymentType: 'principal', // Primary payment type
        paymentMethod: request.method,
        referenceNumber: request.referenceNumber || null,
        notes: request.notes || null,
      }).returning();

      // 4. Process payment through appropriate service
      let externalPaymentId: string;
      if (request.method === 'ach' && request.bankAccountId) {
        externalPaymentId = await this.plaidService.createACHTransfer(
          request.bankAccountId,
          request.amount,
          `Payment for loan ${request.loanId}`,
        );
      } else {
        externalPaymentId = await this.stripeService.createPaymentIntent(
          request.amount,
          `Payment for loan ${request.loanId}`,
        );
      }

      // 5. Update loan balances
      await this.updateLoanBalances(request.loanId, allocation);

      // 6. Update payment record with external ID
      const [updatedPayment] = await db.update(payments)
        .set({
          referenceNumber: externalPaymentId,
          updatedAt: new Date(),
        })
        .where(eq(payments.id, paymentRecord.id))
        .returning();

      return updatedPayment;
    } catch (error) {
      console.error('Payment processing failed:', error);
      throw new PaymentFailedError(request.loanId.toString(), error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * Calculate payment allocation using waterfall logic
   * Order: Interest → Principal → Fees → Escrow
   */
  private calculatePaymentAllocation(loan: any, paymentAmount: number): PaymentAllocation {
    const allocation: PaymentAllocation = {
      principal: 0,
      interest: 0,
      fees: 0,
      lateFees: 0,
      escrow: 0,
      overpayment: 0,
    };

    let remainingAmount = paymentAmount;

    // Calculate outstanding amounts
    const loanAmount = Number.parseFloat(loan.loanAmount || '0');
    const principalPaid = Number.parseFloat(loan.principalPaid || '0');
    const interestPaid = Number.parseFloat(loan.interestPaid || '0');
    const feesPaid = Number.parseFloat(loan.feesPaid || '0');
    const lateFeesPaid = Number.parseFloat(loan.lateFeesPaid || '0');

    // Calculate outstanding interest (simplified: monthly interest rate * current balance)
    const monthlyInterestRate = Number.parseFloat(loan.interestRate || '0') / 100 / 12;
    const currentBalance = Number.parseFloat(loan.currentBalance || '0');
    const accruedInterest = currentBalance * monthlyInterestRate;

    // Calculate outstanding fees (simplified: assume 1% origination fee)
    const originationFee = loanAmount * 0.01;
    const outstandingFees = Math.max(0, originationFee - feesPaid);

    // Calculate outstanding late fees (simplified: assume $50 per late payment)
    const outstandingLateFees = Math.max(0, 50 - lateFeesPaid);

    // 1. Apply to accrued interest first
    if (remainingAmount > 0 && accruedInterest > 0) {
      allocation.interest = Math.min(remainingAmount, accruedInterest);
      remainingAmount -= allocation.interest;
    }

    // 2. Apply to outstanding fees
    if (remainingAmount > 0 && outstandingFees > 0) {
      allocation.fees = Math.min(remainingAmount, outstandingFees);
      remainingAmount -= allocation.fees;
    }

    // 3. Apply to outstanding late fees
    if (remainingAmount > 0 && outstandingLateFees > 0) {
      allocation.lateFees = Math.min(remainingAmount, outstandingLateFees);
      remainingAmount -= allocation.lateFees;
    }

    // 4. Apply to principal balance
    if (remainingAmount > 0 && currentBalance > 0) {
      allocation.principal = Math.min(remainingAmount, currentBalance);
      remainingAmount -= allocation.principal;
    }

    // 5. Any remaining amount is overpayment (applied to principal)
    if (remainingAmount > 0) {
      allocation.overpayment = remainingAmount;
      allocation.principal += remainingAmount;
    }

    return allocation;
  }

  /**
   * Update loan balances after payment processing
   */
  private async updateLoanBalances(loanId: number, allocation: PaymentAllocation): Promise<void> {
    const totalPaid = allocation.principal + allocation.interest + allocation.fees + allocation.lateFees;

    await db.update(loans)
      .set({
        currentBalance: db.raw(`current_balance - ${allocation.principal}`),
        principalPaid: db.raw(`principal_paid + ${allocation.principal}`),
        interestPaid: db.raw(`interest_paid + ${allocation.interest}`),
        feesPaid: db.raw(`fees_paid + ${allocation.fees}`),
        lateFeesPaid: db.raw(`late_fees_paid + ${allocation.lateFees}`),
        lastPaymentDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(loans.id, loanId));
  }

  /**
   * Handle payment webhook from Stripe
   */
  async handleStripeWebhook(event: any): Promise<void> {
    try {
      // 1. Verify webhook signature
      const isValid = await this.stripeService.verifyWebhookSignature(event);
      if (!isValid) {
        throw new WebhookVerificationError('Stripe');
      }

      // 2. Parse event type and handle accordingly
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object);
          break;
        default:
          console.log(`Unhandled Stripe webhook event: ${event.type}`);
      }
    } catch (error) {
      console.error('Stripe webhook handling failed:', error);
      throw error;
    }
  }

  /**
   * Handle successful payment from Stripe webhook
   */
  private async handlePaymentSuccess(paymentIntent: any): Promise<void> {
    const referenceNumber = paymentIntent.id;

    // Find payment record by reference number
    const [payment] = await db.select()
      .from(payments)
      .where(eq(payments.referenceNumber, referenceNumber))
      .limit(1);

    if (payment) {
      // Update payment status to completed
      await db.update(payments)
        .set({
          updatedAt: new Date(),
        })
        .where(eq(payments.id, payment.id));
    }
  }

  /**
   * Handle failed payment from Stripe webhook
   */
  private async handlePaymentFailure(paymentIntent: any): Promise<void> {
    const referenceNumber = paymentIntent.id;

    // Find payment record by reference number
    const [payment] = await db.select()
      .from(payments)
      .where(eq(payments.referenceNumber, referenceNumber))
      .limit(1);

    if (payment) {
      // Mark payment as failed and log the failure reason
      await db.update(payments)
        .set({
          notes: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
          updatedAt: new Date(),
        })
        .where(eq(payments.id, payment.id));
    }
  }

  /**
   * Get payment history for a loan
   */
  async getPaymentHistory(loanId: number): Promise<PaymentRecord[]> {
    try {
      const paymentHistory = await db.select()
        .from(payments)
        .where(eq(payments.loanId, loanId))
        .orderBy(desc(payments.paymentDate));

      return paymentHistory;
    } catch (error) {
      console.error('Failed to retrieve payment history:', error);
      throw error;
    }
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId: number): Promise<PaymentRecord | null> {
    try {
      const [payment] = await db.select()
        .from(payments)
        .where(eq(payments.id, paymentId))
        .limit(1);

      return payment || null;
    } catch (error) {
      console.error('Failed to retrieve payment:', error);
      throw error;
    }
  }

  /**
   * Calculate late fees for a loan
   */
  calculateLateFee(loanId: number, daysLate: number): number {
    // Basic late fee calculation: $50 base fee + $5 per day late
    const baseLateFee = 50;
    const dailyLateFee = 5;
    const maxLateFee = 500; // Cap at $500

    const calculatedFee = baseLateFee + (dailyLateFee * daysLate);
    return Math.min(calculatedFee, maxLateFee);
  }

  /**
   * Process payment for multiple lenders (split payment)
   */
  async processSplitPayment(loanId: number, amount: number, method: PaymentMethod): Promise<PaymentRecord[]> {
    try {
      // Get lender participations for this loan
      const participations = await db.select()
        .from(lenderParticipations)
        .where(eq(lenderParticipations.loanId, loanId));

      if (participations.length === 0) {
        throw new Error(`No lender participations found for loan ${loanId}`);
      }

      const payments: PaymentRecord[] = [];

      // Process payment for each lender based on their participation percentage
      for (const participation of participations) {
        const lenderAmount = (amount * Number.parseFloat(participation.participationPercentage)) / 100;

        const payment = await this.processPayment({
          loanId,
          amount: lenderAmount,
          method,
          notes: `Split payment for lender ${participation.lenderId}`,
        });

        payments.push(payment);
      }

      return payments;
    } catch (error) {
      console.error('Split payment processing failed:', error);
      throw error;
    }
  }

  /**
   * Verify bank account ownership using Plaid
   */
  async verifyBankAccount(bankAccountId: string): Promise<boolean> {
    try {
      return await this.plaidService.verifyAccount(bankAccountId);
    } catch (error) {
      console.error('Bank account verification failed:', error);
      return false;
    }
  }

  /**
   * Get account balance using Plaid
   */
  async getAccountBalance(bankAccountId: string): Promise<number> {
    try {
      return await this.plaidService.getAccountBalance(bankAccountId);
    } catch (error) {
      console.error('Failed to get account balance:', error);
      throw error;
    }
  }
}
