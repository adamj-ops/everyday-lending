/**
 * Table Skeleton Component
 *
 * Loading skeleton for data tables.
 */

import { cn } from '@/lib/utils';

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
  className?: string;
};

export function TableSkeleton({ rows = 5, columns = 5, className }: TableSkeletonProps) {
  return (
    <div className={cn('w-full overflow-hidden rounded-lg border', className)}>
      {/* Header */}
      <div className="flex border-b bg-gray-50 p-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={`header-${i}`}
            className="flex-1 px-2"
          >
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex p-4"
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="flex-1 px-2"
              >
                <div
                  className="h-4 animate-pulse rounded bg-gray-200"
                  style={{
                    width: `${Math.random() * 30 + 50}%`,
                    animationDelay: `${(rowIndex * columns + colIndex) * 50}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
