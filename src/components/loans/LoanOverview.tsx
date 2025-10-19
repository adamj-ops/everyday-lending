/**
 * Loan Overview Component
 *
 * Displays key loan metrics and information.
 */

'use client';

import type { LoanWithDetails } from '@/services/frontend/LoanService';
import { Building2, Calendar, DollarSign, Percent, TrendingUp, User } from 'lucide-react';
import { LoanStatusBadge } from './LoanStatusBadge';

type LoanOverviewProps = {
  loan: LoanWithDetails;
};

export function LoanOverview({ loan }: LoanOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Status and Key Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <DollarSign className="h-4 w-4" />
            Loan Amount
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            $
            {Number.parseFloat(loan.loanAmount).toLocaleString()}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <TrendingUp className="h-4 w-4" />
            Current Balance
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            $
            {Number.parseFloat(loan.currentBalance).toLocaleString()}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Percent className="h-4 w-4" />
            Interest Rate
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {loan.interestRate}
            %
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Calendar className="h-4 w-4" />
            Term
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {loan.termMonths}
            {' '}
            mo
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Loan Information */}
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Loan Information</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <LoanStatusBadge status={loan.status} />
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Origination Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(loan.originationDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Maturity Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(loan.maturityDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monthly Payment</span>
                <span className="text-sm font-medium text-gray-900">
                  $
                  {Number.parseFloat(loan.monthlyPayment).toLocaleString()}
                </span>
              </div>

              {loan.nextPaymentDate && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Next Payment Due</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(loan.nextPaymentDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment Summary</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Principal Paid</span>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  $
                  {loan.principalPaid ? Number.parseFloat(loan.principalPaid).toLocaleString() : '0'}
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Interest Paid</span>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  $
                  {loan.interestPaid ? Number.parseFloat(loan.interestPaid).toLocaleString() : '0'}
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Fees Paid</span>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  $
                  {loan.feesPaid ? Number.parseFloat(loan.feesPaid).toLocaleString() : '0'}
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Late Fees</span>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  $
                  {loan.lateFeesPaid ? Number.parseFloat(loan.lateFeesPaid).toLocaleString() : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Borrower Card */}
          {loan.borrower && (
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="h-4 w-4" />
                Borrower
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {loan.borrower.firstName}
                  {' '}
                  {loan.borrower.lastName}
                </p>
                <p className="text-sm text-gray-600">{loan.borrower.email}</p>
                {loan.borrower.phone && (
                  <p className="text-sm text-gray-600">{loan.borrower.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Property Card */}
          {loan.property && (
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Building2 className="h-4 w-4" />
                Property
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{loan.property.address}</p>
                <p className="text-sm text-gray-600">
                  {loan.property.city}
                  ,
                  {' '}
                  {loan.property.state}
                  {' '}
                  {loan.property.zipCode}
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="rounded-lg border bg-white p-4">
            <div className="mb-3 text-sm font-semibold text-gray-700">Quick Actions</div>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Record Payment
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Generate Payoff Quote
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                View Documents
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {loan.notes && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Notes</h3>
          <p className="text-sm whitespace-pre-wrap text-gray-700">{loan.notes}</p>
        </div>
      )}
    </div>
  );
}
