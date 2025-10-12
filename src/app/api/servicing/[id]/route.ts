import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { borrowers, loans, servicingIncome } from '@/models/Schema';

const updateServicingIncomeSchema = z.object({
  loanId: z.number().positive().optional(),
  feeTypeId: z.number().optional(),
  amount: z.string().optional(), // decimal as string
  incomeDate: z.string().datetime().optional(),
  description: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringFrequency: z.string().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: servicingIncomeId } = await params;

    const [record] = await db
      .select({
        id: servicingIncome.id,
        loanId: servicingIncome.loanId,
        feeTypeId: servicingIncome.feeTypeId,
        amount: servicingIncome.amount,
        incomeDate: servicingIncome.incomeDate,
        description: servicingIncome.description,
        isRecurring: servicingIncome.isRecurring,
        recurringFrequency: servicingIncome.recurringFrequency,
        createdAt: servicingIncome.createdAt,
        updatedAt: servicingIncome.updatedAt,
        loan: {
          id: loans.id,
          loanNumber: loans.loanNumber,
          borrowerId: loans.borrowerId,
        },
        borrower: {
          id: borrowers.id,
          firstName: borrowers.firstName,
          lastName: borrowers.lastName,
        },
      })
      .from(servicingIncome)
      .leftJoin(loans, eq(servicingIncome.loanId, loans.id))
      .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
      .where(eq(servicingIncome.id, Number.parseInt(servicingIncomeId)));

    if (!record) {
      return NextResponse.json(
        { error: 'Servicing income record not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('Error fetching servicing income record:', error);
    return NextResponse.json(
      { error: 'Failed to fetch servicing income record' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: servicingIncomeId } = await params;
    const body = await request.json();
    const validated = updateServicingIncomeSchema.parse(body);

    // Check if record exists
    const [existingRecord] = await db
      .select()
      .from(servicingIncome)
      .where(eq(servicingIncome.id, Number.parseInt(servicingIncomeId)));

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Servicing income record not found' },
        { status: 404 },
      );
    }

    const updateData: any = { ...validated };
    if (validated.incomeDate) {
      updateData.incomeDate = new Date(validated.incomeDate);
    }

    const [updatedRecord] = await db
      .update(servicingIncome)
      .set(updateData)
      .where(eq(servicingIncome.id, Number.parseInt(servicingIncomeId)))
      .returning();

    return NextResponse.json(updatedRecord);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 },
      );
    }

    console.error('Error updating servicing income record:', error);
    return NextResponse.json(
      { error: 'Failed to update servicing income record' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: servicingIncomeId } = await params;

    // Check if record exists
    const [existingRecord] = await db
      .select()
      .from(servicingIncome)
      .where(eq(servicingIncome.id, Number.parseInt(servicingIncomeId)));

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Servicing income record not found' },
        { status: 404 },
      );
    }

    await db
      .delete(servicingIncome)
      .where(eq(servicingIncome.id, Number.parseInt(servicingIncomeId)));

    return NextResponse.json({ message: 'Servicing income record deleted successfully' });
  } catch (error) {
    console.error('Error deleting servicing income record:', error);
    return NextResponse.json(
      { error: 'Failed to delete servicing income record' },
      { status: 500 },
    );
  }
}
