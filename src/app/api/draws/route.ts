import type { NextRequest } from 'next/server';
import { and, desc, eq, ilike, or } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans, rehabDraws } from '@/models/Schema';
import { drawSchema } from '@/validations/DrawValidation';

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
        id: rehabDraws.id,
        loanId: rehabDraws.loanId,
        drawNumber: rehabDraws.drawNumber,
        requestedAmount: rehabDraws.requestedAmount,
        approvedAmount: rehabDraws.approvedAmount,
        status: rehabDraws.status,
        requestDate: rehabDraws.requestDate,
        approvalDate: rehabDraws.approvalDate,
        disbursementDate: rehabDraws.disbursementDate,
        description: rehabDraws.description,
        contractorName: rehabDraws.contractorName,
        workCompleted: rehabDraws.workCompleted,
        notes: rehabDraws.notes,
        createdAt: rehabDraws.createdAt,
        updatedAt: rehabDraws.updatedAt,
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
      .from(rehabDraws)
      .leftJoin(loans, eq(rehabDraws.loanId, loans.id))
      .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
      .orderBy(desc(rehabDraws.requestDate));

    // Apply filters
    const conditions = [];

    if (searchQuery) {
      conditions.push(
        or(
          ilike(loans.loanNumber, `%${searchQuery}%`),
          ilike(borrowers.firstName, `%${searchQuery}%`),
          ilike(borrowers.lastName, `%${searchQuery}%`),
          ilike(rehabDraws.contractorName, `%${searchQuery}%`),
        ),
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      conditions.push(eq(rehabDraws.status, statusFilter as any));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const result = await query.limit(limit).offset(offset);

    // Get total count for pagination
    let countQuery = db.select({ count: rehabDraws.id }).from(rehabDraws);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions)) as any;
    }
    const totalCount = await countQuery;

    return NextResponse.json({
      draws: result,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        totalPages: Math.ceil(totalCount.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching draws:', error);
    return NextResponse.json({ error: 'Failed to fetch draws' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = drawSchema.parse(body);

    // Note: Loan ID is validated directly in the schema

    // Create draw request
    const newDraw = await db
      .insert(rehabDraws)
      .values({
        loanId: validated.loanId,
        drawNumber: validated.drawNumber,
        requestedAmount: validated.requestedAmount,
        status: 'pending',
        requestDate: new Date(),
        description: validated.description,
        contractorName: validated.contractorName,
        workCompleted: validated.workCompleted,
      })
      .returning();

    return NextResponse.json(newDraw[0], { status: 201 });
  } catch (error) {
    console.error('Error creating draw:', error);
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create draw' }, { status: 500 });
  }
}
