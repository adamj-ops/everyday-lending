import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { borrowers, loans, rehabDraws } from '@/models/Schema';
import { drawUpdateSchema } from '@/validations/DrawValidation';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
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
        photos: rehabDraws.photos,
        receipts: rehabDraws.receipts,
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
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({ error: 'Draw not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching draw:', error);
    return NextResponse.json({ error: 'Failed to fetch draw' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = drawUpdateSchema.parse(body);

    // Check if draw exists
    const existingDraw = await db
      .select()
      .from(rehabDraws)
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .limit(1);

    if (!existingDraw[0]) {
      return NextResponse.json({ error: 'Draw not found' }, { status: 404 });
    }

    // Update draw
    const updatedDraw = await db
      .update(rehabDraws)
      .set({
        ...validated,
        updatedAt: new Date(),
      })
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .returning();

    return NextResponse.json(updatedDraw[0]);
  } catch (error) {
    console.error('Error updating draw:', error);
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update draw' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Check if draw exists
    const existingDraw = await db
      .select()
      .from(rehabDraws)
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .limit(1);

    if (!existingDraw[0]) {
      return NextResponse.json({ error: 'Draw not found' }, { status: 404 });
    }

    // Delete draw
    await db
      .delete(rehabDraws)
      .where(eq(rehabDraws.id, Number.parseInt(id)));

    return NextResponse.json({ message: 'Draw deleted successfully' });
  } catch (error) {
    console.error('Error deleting draw:', error);
    return NextResponse.json({ error: 'Failed to delete draw' }, { status: 500 });
  }
}
