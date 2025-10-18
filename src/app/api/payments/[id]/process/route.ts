/**
 * Payment Processing API Route
 *
 * POST /api/payments/[id]/process - Process a specific payment
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { LoanService } from '@/services/LoanService';
import { PaymentService } from '@/services/PaymentService';
import { PlaidService } from '@/services/PlaidService';
import { StripeService } from '@/services/StripeService';

// Validation schema
const ProcessPaymentSchema = z.object({
  method: z.enum(['ach', 'wire', 'check', 'credit_card']),
  bankAccountId: z.string().optional(),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Initialize services
const loanService = new LoanService();
const stripeService = new StripeService();
const plaidService = new PlaidService();
const paymentService = new PaymentService(loanService, stripeService, plaidService);

/**
 * POST /api/payments/[id]/process
 * Process a specific payment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const paymentId = Number.parseInt(id);

    if (Number.isNaN(paymentId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const validatedData = ProcessPaymentSchema.parse(body);

    // Get existing payment to extract loan ID and amount
    const existingPayment = await paymentService.getPaymentById(paymentId);
    if (!existingPayment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 },
      );
    }

    // Process payment with updated method and details
    const processedPayment = await paymentService.processPayment({
      loanId: existingPayment.loanId,
      amount: Number.parseFloat(existingPayment.amount),
      method: validatedData.method,
      bankAccountId: validatedData.bankAccountId,
      referenceNumber: validatedData.referenceNumber,
      notes: validatedData.notes,
    });

    return NextResponse.json({
      success: true,
      data: processedPayment,
      message: 'Payment processed successfully',
    });
  } catch (error) {
    console.error('POST /api/payments/[id]/process failed:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.issues },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.name === 'PaymentFailedError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 422 },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to process payment' },
      { status: 500 },
    );
  }
}
