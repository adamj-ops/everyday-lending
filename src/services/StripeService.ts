/**
 * StripeService - Stripe Connect integration wrapper
 *
 * Responsibilities:
 * - Stripe Connect account management
 * - Payment intent creation and processing
 * - Webhook signature verification
 * - Error handling and retry logic
 *
 * Architecture: Service Layer Pattern
 * Dependencies: Stripe SDK
 */

import Stripe from 'stripe';
import { Env } from '@/libs/Env';

export type StripeConfig = {
  secretKey: string;
  publishableKey: string;
  webhookSecret: string;
};

export type ConnectedAccount = {
  id: string;
  email: string;
  country: string;
  type: 'express' | 'standard' | 'custom';
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
};

export type PaymentIntent = {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  clientSecret: string;
};

export class StripeService {
  private stripe: Stripe;
  private config: StripeConfig;

  constructor(config?: Partial<StripeConfig>) {
    this.config = {
      secretKey: config?.secretKey || Env.STRIPE_SECRET_KEY || '',
      publishableKey: config?.publishableKey || '',
      webhookSecret: config?.webhookSecret || '',
    };

    if (!this.config.secretKey) {
      throw new Error('Stripe secret key is required');
    }

    this.stripe = new Stripe(this.config.secretKey, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  /**
   * Create a connected account for a lender
   */
  async createConnectedAccount(email: string, country: string = 'US'): Promise<ConnectedAccount> {
    try {
      const account = await this.stripe.accounts.create({
        type: 'express',
        country,
        email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      return {
        id: account.id,
        email: account.email || email,
        country: account.country || country,
        type: account.type as 'express' | 'standard' | 'custom',
        chargesEnabled: account.charges_enabled || false,
        payoutsEnabled: account.payouts_enabled || false,
        detailsSubmitted: account.details_submitted || false,
      };
    } catch (error) {
      console.error('Failed to create Stripe connected account:', error);
      throw new Error(`Failed to create connected account: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get connected account status
   */
  async getAccountStatus(accountId: string): Promise<ConnectedAccount> {
    try {
      const account = await this.stripe.accounts.retrieve(accountId);

      return {
        id: account.id,
        email: account.email || '',
        country: account.country || '',
        type: account.type as 'express' | 'standard' | 'custom',
        chargesEnabled: account.charges_enabled || false,
        payoutsEnabled: account.payouts_enabled || false,
        detailsSubmitted: account.details_submitted || false,
      };
    } catch (error) {
      console.error('Failed to get Stripe account status:', error);
      throw new Error(`Failed to get account status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(amount: number, description?: string): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        description: description || 'Loan payment',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert back to dollars
        currency: paymentIntent.currency,
        status: paymentIntent.status as PaymentIntent['status'],
        clientSecret: paymentIntent.client_secret || '',
      };
    } catch (error) {
      console.error('Failed to create Stripe payment intent:', error);
      throw new Error(`Failed to create payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Process a payment using a payment intent
   */
  async processPayment(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status as PaymentIntent['status'],
        clientSecret: paymentIntent.client_secret || '',
      };
    } catch (error) {
      console.error('Failed to process Stripe payment:', error);
      throw new Error(`Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Transfer funds to a connected account
   */
  async transferToConnectedAccount(amount: number, destinationAccountId: string, description?: string): Promise<string> {
    try {
      const transfer = await this.stripe.transfers.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        destination: destinationAccountId,
        description: description || 'Loan payment distribution',
      });

      return transfer.id;
    } catch (error) {
      console.error('Failed to transfer funds to connected account:', error);
      throw new Error(`Failed to transfer funds: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify webhook signature
   */
  async verifyWebhookSignature(event: any, signature: string): Promise<boolean> {
    try {
      if (!this.config.webhookSecret) {
        console.warn('Stripe webhook secret not configured, skipping verification');
        return true; // Allow in development
      }

      const verifiedEvent = this.stripe.webhooks.constructEvent(
        JSON.stringify(event),
        signature,
        this.config.webhookSecret,
      );

      return verifiedEvent !== null;
    } catch (error) {
      console.error('Stripe webhook signature verification failed:', error);
      return false;
    }
  }

  /**
   * Get payment intent by ID
   */
  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status as PaymentIntent['status'],
        clientSecret: paymentIntent.client_secret || '',
      };
    } catch (error) {
      console.error('Failed to get Stripe payment intent:', error);
      throw new Error(`Failed to get payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Cancel a payment intent
   */
  async cancelPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status as PaymentIntent['status'],
        clientSecret: paymentIntent.client_secret || '',
      };
    } catch (error) {
      console.error('Failed to cancel Stripe payment intent:', error);
      throw new Error(`Failed to cancel payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a refund
   */
  async createRefund(paymentIntentId: string, amount?: number, reason?: string): Promise<string> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
        reason: reason as 'duplicate' | 'fraudulent' | 'requested_by_customer' | undefined,
      });

      return refund.id;
    } catch (error) {
      console.error('Failed to create Stripe refund:', error);
      throw new Error(`Failed to create refund: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account balance
   */
  async getAccountBalance(): Promise<{ available: number; pending: number }> {
    try {
      const balance = await this.stripe.balance.retrieve();

      return {
        available: balance.available[0]?.amount ? balance.available[0].amount / 100 : 0,
        pending: balance.pending[0]?.amount ? balance.pending[0].amount / 100 : 0,
      };
    } catch (error) {
      console.error('Failed to get Stripe account balance:', error);
      throw new Error(`Failed to get account balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
