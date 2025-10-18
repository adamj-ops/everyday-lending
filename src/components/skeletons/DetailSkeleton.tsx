/**
 * Detail Skeleton Component
 *
 * Loading skeleton for detail pages.
 */

import { cn } from '@/lib/utils';
import { CardSkeleton } from './CardSkeleton';

type DetailSkeletonProps = {
  className?: string;
};

export function DetailSkeleton({ className }: DetailSkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="rounded-lg border bg-white p-6">
        <div className="mb-4 h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-4">
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <CardSkeleton variant="detail" count={8} />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <CardSkeleton variant="detail" count={4} />
          <CardSkeleton variant="detail" count={3} />
        </div>
      </div>
    </div>
  );
}
