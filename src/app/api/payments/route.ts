/**
 * Payment API Routes
 *
 * GET /api/payments - List payments with optional filtering
 * POST /api/payments - Create a new payment
 */

import type { NextRequest } from 'next/server';
import { and, count as drizzleCount, desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { payments } from '@/models/Schema';
import { LoanService } from '@/services/LoanService';
import { PaymentService } from '@/services/PaymentService';
import { PlaidService } from '@/services/PlaidService';
import { StripeService } from '@/services/StripeService';

// Validation schemas
const ProcessPaymentSchema = z.object({
  loanId: z.number().int().positive(),
  amount: z.number().positive(),
  method: z.enum(['ach', 'wire', 'check', 'credit_card']),
  bankAccountId: z.string().optional(),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
});

const GetPaymentsSchema = z.object({
  loanId: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

// Initialize services
const loanService = new LoanService();
const stripeService = new StripeService();
const plaidService = new PlaidService();
const paymentService = new PaymentService(loanService, stripeService, plaidService);

/**
 * GET /api/payments
 * List payments with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryParams = {
      loanId: searchParams.get('loanId') ? Number.parseInt(searchParams.get('loanId')!) : undefined,
      limit: Number.parseInt(searchParams.get('limit') || '50'),
      offset: Number.parseInt(searchParams.get('offset') || '0'),
    };

    const validatedParams = GetPaymentsSchema.parse(queryParams);

    // Build query conditions
    const conditions = [];
    if (validatedParams.loanId) {
      conditions.push(eq(payments.loanId, validatedParams.loanId));
    }

    // Execute query
    const paymentList = await db.select({
      id: payments.id,
      loanId: payments.loanId,
      paymentDate: payments.paymentDate,
      amount: payments.amount,
      principalAmount: payments.principalAmount,
      interestAmount: payments.interestAmount,
      feesAmount: payments.feesAmount,
      lateFeeAmount: payments.lateFeeAmount,
      paymentType: payments.paymentType,
      paymentMethod: payments.paymentMethod,
      referenceNumber: payments.referenceNumber,
      notes: payments.notes,
      createdAt: payments.createdAt,
      updatedAt: payments.updatedAt,
    })
      .from(payments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(payments.paymentDate))
      .limit(validatedParams.limit)
      .offset(validatedParams.offset);

    // Get total count for pagination
    const [countResult] = await db.select({ count: drizzleCount() })
      .from(payments)
      .where(conditions.length > 0 ? and(...conditions) : undefined);
    const count = countResult?.count ?? 0;

    return NextResponse.json({
      success: true,
      data: paymentList,
      pagination: {
        total: count,
        limit: validatedParams.limit,
        offset: validatedParams.offset,
        hasMore: validatedParams.offset + validatedParams.limit < count,
      },
    });
  } catch (error) {
    console.error('GET /api/payments failed:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid query parameters', details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to retrieve payments' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/payments
 * Create a new payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = ProcessPaymentSchema.parse(body);

    // Process payment
    const payment = await paymentService.processPayment(validatedData);

    return NextResponse.json({
      success: true,
      data: payment,
      message: 'Payment processed successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/payments failed:', error);

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
