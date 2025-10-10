import type { NextRequest } from 'next/server';
import { count, desc, eq, ilike, or } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans } from '@/models/Schema';
import { borrowerSchema } from '@/validations/BorrowerValidation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');

    let query = db
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
      .groupBy(borrowers.id)
      .orderBy(desc(borrowers.createdAt));

    // Add search filter if provided
    if (searchQuery) {
      query = query.where(
        or(
          ilike(borrowers.firstName, `%${searchQuery}%`),
          ilike(borrowers.lastName, `%${searchQuery}%`),
          ilike(borrowers.email, `%${searchQuery}%`),
        ),
      ) as typeof query;
    }

    const results = await query;

    // Fetch loans for each borrower
    const borrowersWithLoans = await Promise.all(
      results.map(async (borrower) => {
        const borrowerLoans = await db
          .select({
            id: loans.id,
            loanNumber: loans.loanNumber,
            loanAmount: loans.loanAmount,
            status: loans.status,
            currentBalance: loans.currentBalance,
          })
          .from(loans)
          .where(eq(loans.borrowerId, borrower.id));

        return {
          ...borrower,
          loans: borrowerLoans,
        };
      }),
    );

    return NextResponse.json(borrowersWithLoans);
  } catch (error) {
    console.error('Error fetching borrowers:', error);
    return NextResponse.json({ error: 'Failed to fetch borrowers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = borrowerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    // Convert empty strings to null for optional fields
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value === '' ? null : value]),
    );

    const result = await db
      .insert(borrowers)
      .values({
        ...cleanedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating borrower:', error);
    return NextResponse.json({ error: 'Failed to create borrower' }, { status: 500 });
  }
}
