/**
 * Payment Timeline Component
 *
 * Displays payment history for a loan.
 */

'use client';

import { DollarSign } from 'lucide-react';
import { TableSkeleton } from '@/components/skeletons/TableSkeleton';
import { usePayments } from '@/hooks/use-payments-client';

type PaymentTimelineProps = {
  loanId: number;
};

export function PaymentTimeline({ loanId }: PaymentTimelineProps) {
  // TODO: Filter payments by loanId when API supports it
  const { data: paymentsData, isLoading } = usePayments();

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />;
  }

  const payments = paymentsData?.data || [];

  // Filter payments for this loan (temporary until API supports filtering)
  const loanPayments = payments.filter(p => p.loanId === loanId);

  return (
    <div className="rounded-lg border bg-white">
      <div className="border-b p-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        <p className="mt-1 text-sm text-gray-500">
          {loanPayments.length}
          {' '}
          payments recorded
        </p>
      </div>

      {loanPayments.length === 0
        ? (
            <div className="p-12 text-center text-sm text-gray-500">
              No payments recorded yet
            </div>
          )
        : (
            <div className="divide-y">
              {loanPayments.map(payment => (
                <div key={payment.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          $
                          {payment.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Principal: $
                          {payment.principalAmount.toLocaleString()}
                          {' • Interest: $'}
                          {payment.interestAmount.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(payment.paymentDate).toLocaleDateString()}
                          {' • '}
                          {payment.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
    </div>
  );
}
