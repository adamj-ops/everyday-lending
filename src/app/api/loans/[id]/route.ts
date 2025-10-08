import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans, properties } from '@/models/Schema';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .select({
        id: loans.id,
        loanNumber: loans.loanNumber,
        loanAmount: loans.loanAmount,
        interestRate: loans.interestRate,
        termMonths: loans.termMonths,
        monthlyPayment: loans.monthlyPayment,
        originationDate: loans.originationDate,
        maturityDate: loans.maturityDate,
        status: loans.status,
        currentBalance: loans.currentBalance,
        principalPaid: loans.principalPaid,
        interestPaid: loans.interestPaid,
        feesPaid: loans.feesPaid,
        lateFeesPaid: loans.lateFeesPaid,
        lastPaymentDate: loans.lastPaymentDate,
        nextPaymentDate: loans.nextPaymentDate,
        notes: loans.notes,
        createdAt: loans.createdAt,
        updatedAt: loans.updatedAt,
        borrower: {
          id: borrowers.id,
          firstName: borrowers.firstName,
          lastName: borrowers.lastName,
          email: borrowers.email,
          phone: borrowers.phone,
        },
        property: {
          id: properties.id,
          address: properties.address,
          city: properties.city,
          state: properties.state,
          zipCode: properties.zipCode,
        },
      })
      .from(loans)
      .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
      .leftJoin(properties, eq(loans.propertyId, properties.id))
      .where(eq(loans.id, Number.parseInt(id)))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching loan:', error);
    return NextResponse.json({ error: 'Failed to fetch loan' }, { status: 500 });
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
      .update(loans)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(loans.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating loan:', error);
    return NextResponse.json({ error: 'Failed to update loan' }, { status: 500 });
  }
}
