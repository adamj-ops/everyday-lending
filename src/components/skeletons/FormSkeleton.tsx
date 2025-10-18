/**
 * Form Skeleton Component
 *
 * Loading skeleton for forms.
 */

import { cn } from '@/lib/utils';

type FormSkeletonProps = {
  fields?: number;
  className?: string;
};

export function FormSkeleton({ fields = 6, className }: FormSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div
          key={`form-field-${i}`}
          className="space-y-2"
        >
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded border bg-gray-100" />
        </div>
      ))}

      <div className="mt-6 flex gap-2">
        <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
