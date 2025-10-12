import type { NextRequest } from 'next/server';
import { eq, gte, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { feeTypes, loans, servicingIncome } from '@/models/Schema';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'month'; // month, quarter, year

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Get total servicing income for the period
    const [totalIncomeResult] = await db
      .select({
        totalIncome: sql<number>`COALESCE(SUM(${servicingIncome.amount}), 0)`,
      })
      .from(servicingIncome)
      .where(
        gte(servicingIncome.incomeDate, startDate),
      );

    // Get total number of fee types
    const [feeTypesCount] = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(feeTypes)
      .where(eq(feeTypes.isActive, true));

    // Get active loans count
    const [activeLoansCount] = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(loans)
      .where(eq(loans.status, 'active'));

    // Get pending servicing income (for now, we'll use recent income as pending)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [pendingIncomeResult] = await db
      .select({
        pendingIncome: sql<number>`COALESCE(SUM(${servicingIncome.amount}), 0)`,
      })
      .from(servicingIncome)
      .where(gte(servicingIncome.incomeDate, thirtyDaysAgo));

    // Get overdue servicing income (for now, we'll use old income as overdue)
    const [overdueIncomeResult] = await db
      .select({
        overdueIncome: sql<number>`COALESCE(SUM(${servicingIncome.amount}), 0)`,
      })
      .from(servicingIncome)
      .where(sql`${servicingIncome.incomeDate} < ${thirtyDaysAgo}`);

    // Calculate efficiency rate (received vs total expected)
    const totalExpected = (totalIncomeResult?.totalIncome || 0) + (pendingIncomeResult?.pendingIncome || 0);
    const efficiencyRate = totalExpected > 0
      ? ((totalIncomeResult?.totalIncome || 0) / totalExpected) * 100
      : 100;

    const stats = {
      totalIncome: totalIncomeResult?.totalIncome || 0,
      totalFees: feeTypesCount?.count || 0,
      activeLoans: activeLoansCount?.count || 0,
      pendingIncome: pendingIncomeResult?.pendingIncome || 0,
      overdueIncome: overdueIncomeResult?.overdueIncome || 0,
      efficiencyRate: Math.round(efficiencyRate * 100) / 100, // Round to 2 decimal places
      period,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching servicing stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch servicing statistics' },
      { status: 500 },
    );
  }
}
