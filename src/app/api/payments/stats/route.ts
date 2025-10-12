import type { NextRequest } from 'next/server';
import { count, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { payments } from '@/models/Schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = Number.parseInt(searchParams.get('month') || String(new Date().getMonth() + 1));
    const year = Number.parseInt(searchParams.get('year') || String(new Date().getFullYear()));

    // Calculate date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Get total payments for the month
    const totalPaymentsResult = await db
      .select({
        totalAmount: sql<number>`sum(${payments.amount})`,
        count: count(),
      })
      .from(payments)
      .where(
        sql`${payments.paymentDate} >= ${startDate} AND ${payments.paymentDate} <= ${endDate}`,
      );

    // Get pending payments (payments from last 7 days that might be processing)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const pendingPaymentsResult = await db
      .select({
        count: count(),
      })
      .from(payments)
      .where(
        sql`${payments.paymentDate} >= ${sevenDaysAgo}`,
      );

    // Get overdue payments (payments older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const overduePaymentsResult = await db
      .select({
        count: count(),
      })
      .from(payments)
      .where(
        sql`${payments.paymentDate} < ${thirtyDaysAgo}`,
      );

    // Calculate success rate (for now, we'll assume all payments are successful)
    // In a real implementation, you'd have a status field
    const successRate = totalPaymentsResult[0]?.count && totalPaymentsResult[0].count > 0
      ? ((totalPaymentsResult[0].count - (overduePaymentsResult[0]?.count || 0)) / totalPaymentsResult[0].count) * 100
      : 100;

    const stats = {
      totalPayments: totalPaymentsResult[0]?.totalAmount || 0,
      totalCount: totalPaymentsResult[0]?.count || 0,
      pendingPayments: pendingPaymentsResult[0]?.count || 0,
      overduePayments: overduePaymentsResult[0]?.count || 0,
      successRate: Math.round(successRate * 100) / 100,
      month,
      year,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching payment stats:', error);
    return NextResponse.json({ error: 'Failed to fetch payment stats' }, { status: 500 });
  }
}
