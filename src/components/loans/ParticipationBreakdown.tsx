/**
 * Participation Breakdown Component
 *
 * Displays lender participation details for a loan.
 */

'use client';

import { Users } from 'lucide-react';

type ParticipationBreakdownProps = {
  loanId: number;
};

export function ParticipationBreakdown({ loanId: _loanId }: ParticipationBreakdownProps) {
  // TODO: Fetch lender participations from API
  // loanId will be used when implementing API integration

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">Lender Participation</h3>
      </div>

      <p className="text-sm text-gray-500">
        Lender participation details coming soon...
      </p>

      {/* Placeholder for future implementation */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium text-gray-900">Primary Lender</p>
            <p className="text-sm text-gray-500">100% participation</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">$250,000</p>
            <p className="text-sm text-gray-500">100.0%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
