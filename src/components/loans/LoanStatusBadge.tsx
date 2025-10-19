/**
 * Loan Status Badge Component
 *
 * Displays the current status of a loan with color coding.
 */

import { cn } from '@/lib/utils';
import { getStateColor, getStateDisplayName, getStateIcon } from '@/state-machines/loan-lifecycle.machine';

type LoanStatusBadgeProps = {
  status: string;
  className?: string;
  showIcon?: boolean;
};

export function LoanStatusBadge({ status, className, showIcon = true }: LoanStatusBadgeProps) {
  const colors = getStateColor(status);
  const displayName = getStateDisplayName(status);
  const icon = getStateIcon(status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold',
        colors.bg,
        colors.text,
        colors.border,
        className,
      )}
    >
      {showIcon && <span>{icon}</span>}
      <span>{displayName}</span>
    </span>
  );
}
