import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { rehabDraws } from '@/models/Schema';
import { drawApprovalSchema } from '@/validations/DrawValidation';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = drawApprovalSchema.parse(body);

    // Check if draw exists and is pending
    const existingDraw = await db
      .select()
      .from(rehabDraws)
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .limit(1);

    if (!existingDraw[0]) {
      return NextResponse.json({ error: 'Draw not found' }, { status: 404 });
    }

    if (existingDraw[0].status !== 'pending') {
      return NextResponse.json({ error: 'Draw is not pending approval' }, { status: 400 });
    }

    // Approve draw
    const approvedDraw = await db
      .update(rehabDraws)
      .set({
        status: 'approved',
        approvedAmount: validated.approvedAmount,
        approvalDate: new Date(),
        notes: validated.notes,
        updatedAt: new Date(),
      })
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .returning();

    return NextResponse.json(approvedDraw[0]);
  } catch (error) {
    console.error('Error approving draw:', error);
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to approve draw' }, { status: 500 });
  }
}
