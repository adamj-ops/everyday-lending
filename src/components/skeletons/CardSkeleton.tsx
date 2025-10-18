/**
 * Card Skeleton Component
 *
 * Loading skeleton for dashboard cards and metrics.
 */

import { cn } from '@/lib/utils';

type CardSkeletonProps = {
  count?: number;
  variant?: 'default' | 'stat' | 'detail';
  className?: string;
};

export function CardSkeleton({ count = 1, variant = 'default', className }: CardSkeletonProps) {
  if (variant === 'stat') {
    return (
      <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={`stat-card-${i}`}
            className="rounded-lg border bg-white p-6"
          >
            <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-3 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={cn('rounded-lg border bg-white p-6', className)}>
        <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />
        <div className="space-y-3">
          {Array.from({ length: count || 5 }).map((_, i) => (
            <div
              key={`detail-row-${i}`}
              className="flex justify-between"
            >
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`card-${i}`}
          className="rounded-lg border bg-white p-6"
        >
          <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
