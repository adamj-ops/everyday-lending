import type { NextRequest } from 'next/server';
import { and, desc, eq, ilike } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { borrowers, loans, servicingIncome } from '@/models/Schema';

const createServicingIncomeSchema = z.object({
  loanId: z.number().positive('Loan ID is required'),
  feeTypeId: z.number().optional(),
  amount: z.string().min(1, 'Amount is required'), // decimal as string
  incomeDate: z.string().datetime(),
  description: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurringFrequency: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    // const status = searchParams.get('status');
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = db
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
      .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id));

    // Apply filters
    const conditions = [];

    if (search) {
      conditions.push(
        ilike(loans.loanNumber, `%${search}%`),
      );
    }

    // Note: Status filtering removed as it's not in the schema

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const servicingIncomeRecords = await query
      .orderBy(desc(servicingIncome.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    let countQuery = db
      .select({ count: servicingIncome.id })
      .from(servicingIncome)
      .leftJoin(loans, eq(servicingIncome.loanId, loans.id));

    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions)) as any;
    }

    const countResult = await countQuery;
    const totalCount = countResult?.[0]?.count || 0;

    return NextResponse.json({
      data: servicingIncomeRecords,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching servicing income:', error);
    return NextResponse.json(
      { error: 'Failed to fetch servicing income records' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createServicingIncomeSchema.parse(body);

    const [newServicingIncome] = await db
      .insert(servicingIncome)
      .values({
        ...validated,
        incomeDate: new Date(validated.incomeDate),
      })
      .returning();

    return NextResponse.json(newServicingIncome, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 },
      );
    }

    console.error('Error creating servicing income record:', error);
    return NextResponse.json(
      { error: 'Failed to create servicing income record' },
      { status: 500 },
    );
  }
}
