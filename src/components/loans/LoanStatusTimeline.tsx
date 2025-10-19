/**
 * Loan Status Timeline Component
 *
 * Displays the loan status history as a visual timeline.
 */

'use client';

import type { LoanStatusAudit } from '@/state-machines/loan-lifecycle.machine';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStateColor, getStateDisplayName, getStateIcon } from '@/state-machines/loan-lifecycle.machine';

type LoanStatusTimelineProps = {
  currentStatus: string;
  statusHistory: LoanStatusAudit[];
  className?: string;
};

export function LoanStatusTimeline({ statusHistory, className }: LoanStatusTimelineProps) {
  // Sort history by date (newest first)
  const sortedHistory = [...statusHistory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-gray-900">Status History</h3>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" />

        {/* Timeline Entries */}
        <div className="space-y-6">
          {sortedHistory.map((entry, index) => {
            const isLatest = index === 0;
            const colors = getStateColor(entry.toStatus);
            const icon = getStateIcon(entry.toStatus);

            return (
              <div key={entry.id || index} className="relative flex gap-4">
                {/* Timeline Icon */}
                <div className={cn(
                  'relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2',
                  isLatest ? colors.bg : 'bg-white',
                  isLatest ? colors.border : 'border-gray-300',
                )}
                >
                  {isLatest
                    ? (
                        <span className="text-sm">{icon}</span>
                      )
                    : (
                        <Check className="h-4 w-4 text-gray-400" />
                      )}
                </div>

                {/* Timeline Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {getStateDisplayName(entry.toStatus)}
                      </h4>

                      {entry.reason && (
                        <p className="mt-1 text-sm text-gray-600">{entry.reason}</p>
                      )}

                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{new Date(entry.createdAt).toLocaleTimeString()}</span>
                        {entry.triggeredBy && (
                          <>
                            <span>•</span>
                            <span>
                              by
                              {entry.triggeredBy}
                            </span>
                          </>
                        )}
                      </div>

                      {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                            View Details
                          </summary>
                          <div className="mt-2 rounded-md bg-gray-50 p-2 text-xs">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(entry.metadata, null, 2)}
                            </pre>
                          </div>
                        </details>
                      )}
                    </div>

                    {isLatest && (
                      <span className={cn(
                        'rounded-full border px-2 py-1 text-xs font-semibold',
                        colors.bg,
                        colors.text,
                        colors.border,
                      )}
                      >
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
