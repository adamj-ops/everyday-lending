import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { calculateMaturityDate, calculateMonthlyPayment } from '@/lib/loan-calculator';
import { db } from '@/libs/DB';
import { borrowers, loans, properties } from '@/models/Schema';
import { loanUpdateSchema } from '@/validations/LoanValidation';

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate the request body
    const validationResult = loanUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    // Recalculate monthly payment if relevant fields changed
    if (data.loanAmount !== undefined || data.interestRate !== undefined || data.termMonths !== undefined) {
      // Get current loan data if fields are missing
      const currentLoan = await db
        .select()
        .from(loans)
        .where(eq(loans.id, Number.parseInt(id)))
        .limit(1);

      if (currentLoan[0]) {
        const loanAmount = data.loanAmount ?? Number.parseFloat(currentLoan[0].loanAmount);
        const interestRate = data.interestRate ?? Number.parseFloat(currentLoan[0].interestRate);
        const termMonths = data.termMonths ?? currentLoan[0].termMonths;

        data.monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, termMonths);

        // Recalculate maturity date if origination date or term changed
        if (data.originationDate || data.termMonths) {
          const originationDate = data.originationDate
            ? new Date(data.originationDate)
            : currentLoan[0].originationDate;
          const maturityDate = calculateMaturityDate(originationDate, termMonths);
          data.maturityDate = maturityDate.toISOString().split('T')[0];
        }
      }
    }

    // Convert empty strings to null for optional fields
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value === '' ? null : value]),
    );

    const result = await db
      .update(loans)
      .set({
        ...cleanedData,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return PUT(request, { params });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .delete(loans)
      .where(eq(loans.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting loan:', error);
    return NextResponse.json({ error: 'Failed to delete loan' }, { status: 500 });
  }
}
