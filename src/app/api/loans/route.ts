import type { NextRequest } from 'next/server';
import { desc, eq, ilike, or } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans, properties } from '@/models/Schema';

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
