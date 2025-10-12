import type { NextRequest } from 'next/server';
import { and, desc, eq, ilike } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { feeTypes } from '@/models/Schema';

const createFeeTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  amount: z.string().optional(), // decimal as string
  percentage: z.string().optional(), // decimal as string
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const isActive = searchParams.get('isActive');
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = db.select().from(feeTypes);

    // Apply filters
    const conditions = [];

    if (search) {
      conditions.push(ilike(feeTypes.name, `%${search}%`));
    }

    if (isActive !== null) {
      conditions.push(eq(feeTypes.isActive, isActive === 'true'));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const feeTypesRecords = await query
      .orderBy(desc(feeTypes.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    let countQuery = db.select({ count: feeTypes.id }).from(feeTypes);

    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions)) as any;
    }

    const countResult = await countQuery;
    const totalCount = countResult?.[0]?.count || 0;

    return NextResponse.json({
      data: feeTypesRecords,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching fee types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fee types' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createFeeTypeSchema.parse(body);

    const [newFeeType] = await db
      .insert(feeTypes)
      .values(validated)
      .returning();

    return NextResponse.json(newFeeType, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 },
      );
    }

    console.error('Error creating fee type:', error);
    return NextResponse.json(
      { error: 'Failed to create fee type' },
      { status: 500 },
    );
  }
}
