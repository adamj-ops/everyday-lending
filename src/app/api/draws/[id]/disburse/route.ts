import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { rehabDraws } from '@/models/Schema';
import { drawDisbursementSchema } from '@/validations/DrawValidation';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = drawDisbursementSchema.parse(body);

    // Check if draw exists and is approved
    const existingDraw = await db
      .select()
      .from(rehabDraws)
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .limit(1);

    if (!existingDraw[0]) {
      return NextResponse.json({ error: 'Draw not found' }, { status: 404 });
    }

    if (existingDraw[0].status !== 'approved') {
      return NextResponse.json({ error: 'Draw is not approved for disbursement' }, { status: 400 });
    }

    // Disburse draw
    const disbursedDraw = await db
      .update(rehabDraws)
      .set({
        status: 'disbursed',
        disbursementDate: new Date(validated.disbursementDate),
        notes: validated.notes,
        updatedAt: new Date(),
      })
      .where(eq(rehabDraws.id, Number.parseInt(id)))
      .returning();

    // TODO: Update loan balance and disbursed amount
    // This would involve:
    // 1. Adding the disbursed amount to the loan's disbursed total
    // 2. Updating the loan's current balance
    // 3. Processing the actual payment/disbursement

    return NextResponse.json(disbursedDraw[0]);
  } catch (error) {
    console.error('Error disbursing draw:', error);
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to disburse draw' }, { status: 500 });
  }
}
