import type { NextRequest } from 'next/server';
import { desc, ilike, or } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { properties } from '@/models/Schema';
import { propertySchema } from '@/validations/PropertyValidation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');

    let query = db
      .select()
      .from(properties)
      .orderBy(desc(properties.createdAt));

    // Add search filter if provided
    if (searchQuery) {
      query = query.where(
        or(
          ilike(properties.address, `%${searchQuery}%`),
          ilike(properties.city, `%${searchQuery}%`),
          ilike(properties.state, `%${searchQuery}%`),
        ),
      ) as typeof query;
    }

    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = propertySchema.safeParse(body);

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
      .insert(properties)
      .values({
        ...(cleanedData as any),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
