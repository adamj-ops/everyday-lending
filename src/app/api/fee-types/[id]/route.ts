import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { feeTypes } from '@/models/Schema';

const updateFeeTypeSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  amount: z.string().optional(), // decimal as string
  percentage: z.string().optional(), // decimal as string
  isActive: z.boolean().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: feeTypeId } = await params;

    const [feeType] = await db
      .select()
      .from(feeTypes)
      .where(eq(feeTypes.id, Number.parseInt(feeTypeId))) as any;

    if (!feeType) {
      return NextResponse.json(
        { error: 'Fee type not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(feeType);
  } catch (error) {
    console.error('Error fetching fee type:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fee type' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: feeTypeId } = await params;
    const body = await request.json();
    const validated = updateFeeTypeSchema.parse(body);

    // Check if fee type exists
    const [existingFeeType] = await db
      .select()
      .from(feeTypes)
      .where(eq(feeTypes.id, Number.parseInt(feeTypeId))) as any;

    if (!existingFeeType) {
      return NextResponse.json(
        { error: 'Fee type not found' },
        { status: 404 },
      );
    }

    const [updatedFeeType] = await db
      .update(feeTypes)
      .set(validated)
      .where(eq(feeTypes.id, Number.parseInt(feeTypeId)))
      .returning();

    return NextResponse.json(updatedFeeType);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 },
      );
    }

    console.error('Error updating fee type:', error);
    return NextResponse.json(
      { error: 'Failed to update fee type' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: feeTypeId } = await params;

    // Check if fee type exists
    const [existingFeeType] = await db
      .select()
      .from(feeTypes)
      .where(eq(feeTypes.id, Number.parseInt(feeTypeId))) as any;

    if (!existingFeeType) {
      return NextResponse.json(
        { error: 'Fee type not found' },
        { status: 404 },
      );
    }

    await db.delete(feeTypes).where(eq(feeTypes.id, Number.parseInt(feeTypeId)));

    return NextResponse.json({ message: 'Fee type deleted successfully' });
  } catch (error) {
    console.error('Error deleting fee type:', error);
    return NextResponse.json(
      { error: 'Failed to delete fee type' },
      { status: 500 },
    );
  }
}
