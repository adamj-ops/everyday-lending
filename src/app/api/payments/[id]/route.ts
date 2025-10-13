/**
 * Individual Payment API Routes
 *
 * GET /api/payments/[id] - Get payment by ID
 * PATCH /api/payments/[id] - Update payment
 * DELETE /api/payments/[id] - Delete payment
 */

import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { payments } from '@/models/Schema';
import { LoanService } from '@/services/LoanService';
import { PaymentService } from '@/services/PaymentService';
import { PlaidService } from '@/services/PlaidService';
import { StripeService } from '@/services/StripeService';

// Validation schemas
const UpdatePaymentSchema = z.object({
  notes: z.string().optional(),
  paymentMethod: z.enum(['ach', 'wire', 'check', 'credit_card']).optional(),
});

// Initialize services
const loanService = new LoanService();
const stripeService = new StripeService();
const plaidService = new PlaidService();
const paymentService = new PaymentService(loanService, stripeService, plaidService);

/**
 * GET /api/payments/[id]
 * Get payment by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const paymentId = Number.parseInt(params.id);

    if (isNaN(paymentId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID' },
        { status: 400 },
      );
    }

    const payment = await paymentService.getPaymentById(paymentId);

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error('GET /api/payments/[id] failed:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to retrieve payment' },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/payments/[id]
 * Update payment
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const paymentId = Number.parseInt(params.id);

    if (isNaN(paymentId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const validatedData = UpdatePaymentSchema.parse(body);

    // Check if payment exists
    const existingPayment = await paymentService.getPaymentById(paymentId);
    if (!existingPayment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 },
      );
    }

    // Update payment
    const [updatedPayment] = await db.update(payments)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(payments.id, paymentId))
      .returning();

    return NextResponse.json({
      success: true,
      data: updatedPayment,
      message: 'Payment updated successfully',
    });
  } catch (error) {
    console.error('PATCH /api/payments/[id] failed:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update payment' },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/payments/[id]
 * Delete payment
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const paymentId = Number.parseInt(params.id);

    if (isNaN(paymentId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID' },
        { status: 400 },
      );
    }

    // Check if payment exists
    const existingPayment = await paymentService.getPaymentById(paymentId);
    if (!existingPayment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 },
      );
    }

    // Delete payment
    await db.delete(payments)
      .where(eq(payments.id, paymentId));

    return NextResponse.json({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    console.error('DELETE /api/payments/[id] failed:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to delete payment' },
      { status: 500 },
    );
  }
}
