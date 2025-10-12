import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans, payments } from '@/models/Schema';
import { paymentUpdateSchema } from '@/validations/PaymentValidation';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .select({
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
        loan: {
          id: loans.id,
          loanNumber: loans.loanNumber,
          loanAmount: loans.loanAmount,
          currentBalance: loans.currentBalance,
          status: loans.status,
        },
        borrower: {
          id: borrowers.id,
          firstName: borrowers.firstName,
          lastName: borrowers.lastName,
          email: borrowers.email,
        },
      })
      .from(payments)
      .leftJoin(loans, eq(payments.loanId, loans.id))
      .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
      .where(eq(payments.id, Number.parseInt(id)))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payment' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = paymentUpdateSchema.parse(body);

    // Check if payment exists
    const existingPayment = await db
      .select()
      .from(payments)
      .where(eq(payments.id, Number.parseInt(id)))
      .limit(1);

    if (!existingPayment[0]) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Update payment
    const updatedPayment = await db
      .update(payments)
      .set({
        ...validated,
        paymentDate: validated.paymentDate ? new Date(validated.paymentDate) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(payments.id, Number.parseInt(id)))
      .returning();

    return NextResponse.json(updatedPayment[0]);
  } catch (error) {
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Check if payment exists
    const existingPayment = await db
      .select()
      .from(payments)
      .where(eq(payments.id, Number.parseInt(id)))
      .limit(1);

    if (!existingPayment[0]) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Delete payment
    await db
      .delete(payments)
      .where(eq(payments.id, Number.parseInt(id)));

    return NextResponse.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 });
  }
}
