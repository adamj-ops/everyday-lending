import type { NextRequest } from 'next/server';
import { count, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans } from '@/models/Schema';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .select({
        id: borrowers.id,
        firstName: borrowers.firstName,
        lastName: borrowers.lastName,
        email: borrowers.email,
        phone: borrowers.phone,
        address: borrowers.address,
        city: borrowers.city,
        state: borrowers.state,
        zipCode: borrowers.zipCode,
        ssn: borrowers.ssn,
        dateOfBirth: borrowers.dateOfBirth,
        creditScore: borrowers.creditScore,
        employmentStatus: borrowers.employmentStatus,
        annualIncome: borrowers.annualIncome,
        createdAt: borrowers.createdAt,
        updatedAt: borrowers.updatedAt,
        activeLoansCount: count(loans.id),
      })
      .from(borrowers)
      .leftJoin(loans, eq(borrowers.id, loans.borrowerId))
      .where(eq(borrowers.id, Number.parseInt(id)))
      .groupBy(borrowers.id)
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({ error: 'Borrower not found' }, { status: 404 });
    }

    // Fetch loans for this borrower
    const borrowerLoans = await db
      .select({
        id: loans.id,
        loanNumber: loans.loanNumber,
        loanAmount: loans.loanAmount,
        status: loans.status,
        currentBalance: loans.currentBalance,
      })
      .from(loans)
      .where(eq(loans.borrowerId, Number.parseInt(id)));

    return NextResponse.json({
      ...result[0],
      loans: borrowerLoans,
    });
  } catch (error) {
    console.error('Error fetching borrower:', error);
    return NextResponse.json({ error: 'Failed to fetch borrower' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const result = await db
      .update(borrowers)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(borrowers.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Borrower not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating borrower:', error);
    return NextResponse.json({ error: 'Failed to update borrower' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .delete(borrowers)
      .where(eq(borrowers.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Borrower not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting borrower:', error);
    return NextResponse.json({ error: 'Failed to delete borrower' }, { status: 500 });
  }
}
