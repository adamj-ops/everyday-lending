import type { NextRequest } from 'next/server';
import { count, eq, sum } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { lenderParticipations, lenders, loans } from '@/models/Schema';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
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
      .where(eq(lenders.id, Number.parseInt(id)))
      .groupBy(lenders.id)
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({ error: 'Lender not found' }, { status: 404 });
    }

    // Fetch participations for this lender
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
      .where(eq(lenderParticipations.lenderId, Number.parseInt(id)));

    return NextResponse.json({
      ...result[0],
      participations: lenderParticipationsData,
      totalCapitalCommitted: result[0].totalCapitalCommitted || '0',
    });
  } catch (error) {
    console.error('Error fetching lender:', error);
    return NextResponse.json({ error: 'Failed to fetch lender' }, { status: 500 });
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
      .update(lenders)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(lenders.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Lender not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating lender:', error);
    return NextResponse.json({ error: 'Failed to update lender' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .delete(lenders)
      .where(eq(lenders.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Lender not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lender:', error);
    return NextResponse.json({ error: 'Failed to delete lender' }, { status: 500 });
  }
}
