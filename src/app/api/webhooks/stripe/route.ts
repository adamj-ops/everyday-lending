/**
 * Stripe Webhook Handler
 *
 * POST /api/webhooks/stripe - Handle Stripe webhook events
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { LoanService } from '@/services/LoanService';
import { PaymentService, WebhookVerificationError } from '@/services/PaymentService';
import { PlaidService } from '@/services/PlaidService';
import { StripeService } from '@/services/StripeService';

// Initialize services
const loanService = new LoanService();
const stripeService = new StripeService();
const plaidService = new PlaidService();
const paymentService = new PaymentService(loanService, stripeService, plaidService);

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body and signature
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 },
      );
    }

    // Parse the webhook event
    let event;
    try {
      event = JSON.parse(body);
    } catch (error) {
      console.error('Invalid JSON in webhook body:', error);
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 },
      );
    }

    // Verify webhook signature
    const isValid = await stripeService.verifyWebhookSignature(event, signature);
    if (!isValid) {
      console.error('Invalid Stripe webhook signature');
      throw new WebhookVerificationError('Stripe');
    }

    // Handle the webhook event
    await paymentService.handleStripeWebhook(event);

    console.log(`Successfully processed Stripe webhook: ${event.type}`);

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error) {
    console.error('Stripe webhook processing failed:', error);

    if (error instanceof WebhookVerificationError) {
      return NextResponse.json(
        { error: 'Webhook verification failed' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
}

// Disable body parsing for webhooks to get raw body
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
