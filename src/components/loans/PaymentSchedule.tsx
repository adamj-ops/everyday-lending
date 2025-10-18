/**
 * Payment Schedule Component
 *
 * Displays the payment schedule for a loan with summary metrics.
 */

'use client';

import type { AmortizationSchedule } from '@/lib/calculations/amortization';
import { Calendar, DollarSign, TrendingUp } from 'lucide-react';

type PaymentScheduleProps = {
  schedule: AmortizationSchedule;
  loanAmount: number;
  interestRate: number;
};

export function PaymentSchedule({ schedule, loanAmount, interestRate }: PaymentScheduleProps) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <DollarSign className="h-4 w-4" />
            Total Principal
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            $
            {loanAmount.toLocaleString()}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <TrendingUp className="h-4 w-4" />
            Total Interest
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            $
            {schedule.totalInterest.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {interestRate}
            % APR
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Calendar className="h-4 w-4" />
            Total Payments
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            $
            {schedule.totalPayments.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {schedule.schedule.length}
            {' '}
            payments
          </div>
        </div>
      </div>

      {/* Final Payment Highlight (for balloon/interest-only) */}
      {schedule.finalPayment > (schedule.totalPayments / schedule.schedule.length) * 1.5 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-yellow-100 p-2">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900">Balloon Payment</h4>
              <p className="mt-1 text-sm text-yellow-700">
                Final payment of
                {' '}
                <span className="font-semibold">
                  $
                  {schedule.finalPayment.toLocaleString()}
                </span>
                {' '}
                includes remaining principal balance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
