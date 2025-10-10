import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { properties } from '@/models/Schema';
import { propertyUpdateSchema } from '@/validations/PropertyValidation';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .select()
      .from(properties)
      .where(eq(properties.id, Number.parseInt(id)))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate the request body
    const validationResult = propertyUpdateSchema.safeParse(body);

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
      .update(properties)
      .set({
        ...cleanedData,
        updatedAt: new Date(),
      })
      .where(eq(properties.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return PUT(request, { params });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await db
      .delete(properties)
      .where(eq(properties.id, Number.parseInt(id)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

