/**
 * Amortization Table Component
 *
 * Displays detailed payment-by-payment amortization schedule.
 */

'use client';

import type { AmortizationSchedule } from '@/lib/calculations/amortization';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { exportToCSV } from '@/lib/table/filters';

type AmortizationTableProps = {
  schedule: AmortizationSchedule;
  showAllRows?: boolean;
};

export function AmortizationTable({ schedule, showAllRows = false }: AmortizationTableProps) {
  const [isExpanded, setIsExpanded] = useState(showAllRows);

  const displayedRows = isExpanded ? schedule.schedule : schedule.schedule.slice(0, 5);

  const handleExport = () => {
    const exportData = schedule.schedule.map(entry => ({
      'Payment #': entry.paymentNumber,
      'Payment Date': entry.paymentDate.toLocaleDateString(),
      'Payment Amount': `$${entry.paymentAmount.toFixed(2)}`,
      'Principal': `$${entry.principalAmount.toFixed(2)}`,
      'Interest': `$${entry.interestAmount.toFixed(2)}`,
      'Remaining Balance': `$${entry.remainingBalance.toFixed(2)}`,
      'Cumulative Principal': `$${entry.cumulativePrincipal.toFixed(2)}`,
      'Cumulative Interest': `$${entry.cumulativeInterest.toFixed(2)}`,
    }));

    exportToCSV(exportData, 'amortization-schedule');
  };

  return (
    <div className="space-y-4">
      {/* Export Button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Payment #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Payment</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Principal</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Interest</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {displayedRows.map(entry => (
                <tr
                  key={entry.paymentNumber}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{entry.paymentNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {entry.paymentDate.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                    $
                    {entry.paymentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700">
                    $
                    {entry.principalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700">
                    $
                    {entry.interestAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                    $
                    {entry.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      {schedule.schedule.length > 5 && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Show Less
                  </>
                )
              : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show All
                    {' '}
                    {schedule.schedule.length}
                    {' '}
                    Payments
                  </>
                )}
          </Button>
        </div>
      )}
    </div>
  );
}
