import type * as React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Card } from './card';

export type MetricCardProps = {
  /**
   * Label for the metric (e.g., "Total Loans")
   */
  label: string;

  /**
   * Primary value to display (e.g., "$24.8M")
   */
  value: string;

  /**
   * Optional trend percentage (e.g., 12.5 for +12.5%)
   * Positive = green up arrow, Negative = red down arrow
   */
  trend?: number;

  /**
   * Optional trend context (e.g., "vs last month")
   */
  trendContext?: string;

  /**
   * Optional mini chart component
   */
  chart?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
};

/**
 * MetricCard - Display key metrics with optional trends and charts
 *
 * Based on Everyday Lending Design System
 * Reference: docs/design-system.md - Metric Card Pattern
 *
 * @example
 * ```tsx
 * <MetricCard
 *   label="Total Loans"
 *   value="$24.8M"
 *   trend={12.5}
 *   trendContext="vs last month"
 * />
 * ```
 */
export function MetricCard({
  label,
  value,
  trend,
  trendContext = 'vs last month',
  chart,
  className,
}: MetricCardProps) {
  const isPositiveTrend = trend !== undefined && trend > 0;
  const isNegativeTrend = trend !== undefined && trend < 0;

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Label */}
          <p className="text-sm text-neutral-500">{label}</p>

          {/* Value */}
          <p className="mt-1 text-3xl font-semibold text-neutral-800">
            {value}
          </p>

          {/* Trend Indicator */}
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              {isPositiveTrend && (
                <TrendingUp className="h-4 w-4 text-success" aria-label="Trending up" />
              )}
              {isNegativeTrend && (
                <TrendingDown className="h-4 w-4 text-error" aria-label="Trending down" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositiveTrend && 'text-success',
                  isNegativeTrend && 'text-error',
                )}
              >
                {isPositiveTrend && '+'}
                {Math.abs(trend)}
                %
              </span>
              <span className="text-xs text-neutral-400">{trendContext}</span>
            </div>
          )}
        </div>

        {/* Mini Chart Area */}
        {chart && (
          <div className="ml-4 h-16 w-24">
            {chart}
          </div>
        )}
      </div>
    </Card>
  );
}
