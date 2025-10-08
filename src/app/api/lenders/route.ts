import type { NextRequest } from 'next/server';
import { count, desc, eq, ilike, or, sum } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { lenderParticipations, lenders, loans } from '@/models/Schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');

    let query = db
      .select({
        id: lenders.id,
        name: lenders.name,
        email: lenders.email,
        phone: lenders.phone,
        address: lenders.address,
        city: lenders.city,
        state: lenders.state,
        zipCode: lenders.zipCode,
        taxId: lenders.taxId,
        contactPerson: lenders.contactPerson,
        investmentCapacity: lenders.investmentCapacity,
        isActive: lenders.isActive,
        createdAt: lenders.createdAt,
        updatedAt: lenders.updatedAt,
        activeParticipationsCount: count(lenderParticipations.id),
        totalCapitalCommitted: sum(lenderParticipations.participationAmount),
      })
      .from(lenders)
      .leftJoin(lenderParticipations, eq(lenders.id, lenderParticipations.lenderId))
      .groupBy(lenders.id)
      .orderBy(desc(lenders.createdAt));

    // Add search filter if provided
    if (searchQuery) {
      query = query.where(
        or(
          ilike(lenders.name, `%${searchQuery}%`),
          ilike(lenders.email, `%${searchQuery}%`),
        ),
      ) as typeof query;
    }

    const results = await query;

    // Fetch participations for each lender
    const lendersWithParticipations = await Promise.all(
      results.map(async (lender) => {
        const lenderParticipationsData = await db
          .select({
            id: lenderParticipations.id,
            loanId: lenderParticipations.loanId,
            participationAmount: lenderParticipations.participationAmount,
            participationPercentage: lenderParticipations.participationPercentage,
            loan: {
              loanNumber: loans.loanNumber,
              status: loans.status,
            },
          })
          .from(lenderParticipations)
          .leftJoin(loans, eq(lenderParticipations.loanId, loans.id))
          .where(eq(lenderParticipations.lenderId, lender.id));

        return {
          ...lender,
          participations: lenderParticipationsData,
          totalCapitalCommitted: lender.totalCapitalCommitted || '0',
        };
      }),
    );

    return NextResponse.json(lendersWithParticipations);
  } catch (error) {
    console.error('Error fetching lenders:', error);
    return NextResponse.json({ error: 'Failed to fetch lenders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await db
      .insert(lenders)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating lender:', error);
    return NextResponse.json({ error: 'Failed to create lender' }, { status: 500 });
  }
}
