import type { NextRequest } from 'next/server';
import { desc, eq, ilike, or } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { calculateMaturityDate, calculateMonthlyPayment } from '@/lib/loan-calculator';
import { db } from '@/libs/DB';
import { borrowers, loans, properties } from '@/models/Schema';
import { generateLoanNumber, loanSchema } from '@/validations/LoanValidation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');

    let query = db
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
      .orderBy(desc(loans.createdAt));

    // Add search filter if provided
    if (searchQuery) {
      query = query.where(
        or(
          ilike(loans.loanNumber, `%${searchQuery}%`),
          ilike(borrowers.firstName, `%${searchQuery}%`),
          ilike(borrowers.lastName, `%${searchQuery}%`),
          ilike(properties.address, `%${searchQuery}%`),
        ),
      ) as typeof query;
    }

    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json({ error: 'Failed to fetch loans' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = loanSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    // Generate loan number if not provided
    if (!data.loanNumber) {
      data.loanNumber = generateLoanNumber();
    }

    // Calculate monthly payment if not provided
    if (!data.monthlyPayment && data.loanAmount && data.interestRate && data.termMonths) {
      data.monthlyPayment = calculateMonthlyPayment(
        data.loanAmount,
        data.interestRate,
        data.termMonths,
      );
    }

    // Calculate maturity date if not provided
    if (!data.maturityDate && data.originationDate && data.termMonths) {
      const originationDate = new Date(data.originationDate);
      const maturityDate = calculateMaturityDate(originationDate, data.termMonths);
      data.maturityDate = maturityDate.toISOString().split('T')[0];
    }

    // Set current balance to loan amount if not provided
    if (!data.currentBalance) {
      data.currentBalance = data.loanAmount;
    }

    // Calculate next payment date (one month from origination)
    if (!data.nextPaymentDate && data.originationDate) {
      const originationDate = new Date(data.originationDate);
      const nextPaymentDate = new Date(originationDate);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      data.nextPaymentDate = nextPaymentDate.toISOString().split('T')[0];
    }

    // Convert empty strings to null for optional fields
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value === '' ? null : value]),
    );

    const result = await db
      .insert(loans)
      .values({
        ...(cleanedData as any),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating loan:', error);
    return NextResponse.json({ error: 'Failed to create loan' }, { status: 500 });
  }
}
