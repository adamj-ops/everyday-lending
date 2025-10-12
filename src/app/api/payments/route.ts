import type { NextRequest } from 'next/server';
import { desc, eq, ilike, or } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans, payments } from '@/models/Schema';
import { paymentSchema } from '@/validations/PaymentValidation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');
    const statusFilter = searchParams.get('status');
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = db
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
      .orderBy(desc(payments.paymentDate));

    // Add search filter if provided
    if (searchQuery) {
      query = query.where(
        or(
          ilike(loans.loanNumber, `%${searchQuery}%`),
          ilike(borrowers.firstName, `%${searchQuery}%`),
          ilike(borrowers.lastName, `%${searchQuery}%`),
          ilike(payments.referenceNumber, `%${searchQuery}%`),
        ),
      ) as any;
    }

    // Add status filter if provided
    if (statusFilter && statusFilter !== 'all') {
      // For now, we'll use payment date to determine status
      // In a real implementation, you'd have a status field
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      if (statusFilter === 'overdue') {
        query = query.where(eq(payments.paymentDate, thirtyDaysAgo)) as any;
      }
    }

    const result = await query.limit(limit).offset(offset);
    const totalCount = await db.select().from(payments);

    return NextResponse.json({
      payments: result,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        totalPages: Math.ceil(totalCount.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = paymentSchema.parse(body);

    // Find the loan by loan number
    const loan = await db
      .select()
      .from(loans)
      .where(eq(loans.loanNumber, validated.loanNumber))
      .limit(1);

    if (!loan[0]) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    // Create payment record
    const newPayment = await db
      .insert(payments)
      .values({
        loanId: loan[0].id,
        paymentDate: new Date(validated.paymentDate),
        amount: validated.amount,
        principalAmount: '0', // Will be calculated based on payment waterfall
        interestAmount: '0', // Will be calculated based on payment waterfall
        feesAmount: '0', // Will be calculated based on payment waterfall
        lateFeeAmount: '0', // Will be calculated based on payment waterfall
        paymentType: 'principal', // Default, can be updated
        paymentMethod: validated.paymentMethod,
        referenceNumber: validated.referenceNumber,
        notes: validated.notes,
      } as any)
      .returning();

    // TODO: Update loan balance and calculate payment waterfall
    // This would involve:
    // 1. Calculating interest due
    // 2. Applying payment waterfall (interest → principal → fees)
    // 3. Updating loan currentBalance
    // 4. Updating payment breakdown

    return NextResponse.json(newPayment[0], { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
