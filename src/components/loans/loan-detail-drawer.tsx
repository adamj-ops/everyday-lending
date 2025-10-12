'use client';

import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  // SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { Loan } from './loan-table';

interface LoanDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loan: Loan | null;
  onEdit?: (loan: Loan) => void;
  onDelete?: (loan: Loan) => void;
}

interface DetailFieldProps {
  label: string;
  value: string | number;
  mono?: boolean;
}

function DetailField({ label, value, mono = false }: DetailFieldProps) {
  return (
    <div className="space-y-1">
      <dt className="text-sm font-medium text-neutral-500">{label}</dt>
      <dd className={mono ? 'font-mono text-neutral-800' : 'text-neutral-800'}>
        {value}
      </dd>
    </div>
  );
}

/**
 * LoanDetailDrawer - Right-side detail panel for loans
 * Shows comprehensive loan information, payments, and documents
 */
export function LoanDetailDrawer({
  open,
  onOpenChange,
  loan,
  onEdit,
  onDelete,
}: LoanDetailDrawerProps) {
  if (!loan)
    return null;

  const getStatusVariant = (status: Loan['status']) => {
    switch (status) {
      case 'active':
      case 'funded':
        return 'default';
      case 'pending':
      case 'in_review':
        return 'outline';
      case 'closed':
        return 'secondary';
      case 'defaulted':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getLoanTypeLabel = (type: Loan['loanType']) => {
    switch (type) {
      case 'fix_and_flip':
        return 'Fix & Flip';
      case 'bridge':
        return 'Bridge';
      case 'term':
        return 'Term';
      case 'construction':
        return 'Construction';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const getBorrowerInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const loanToValue = (loan.principalAmount / 850000) * 100; // Mock ARV
  const paymentsMade = 8; // Mock
  const paymentsRemaining = 18; // Mock
  const totalInterestPaid = 45600; // Mock

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-96 sm:w-[540px] p-0">
        {/* Header */}
        <div className="border-b border-neutral-100 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-2xl font-mono">
                {loan.loanNumber}
              </SheetTitle>
              <SheetDescription className="mt-1">
                {loan.property.address}
                ,
                {' '}
                {loan.property.city}
              </SheetDescription>
              <div className="flex gap-2 mt-3">
                <Badge variant={getStatusVariant(loan.status)}>
                  {loan.status.replace('_', ' ')}
                </Badge>
                <Badge variant="outline">
                  {getLoanTypeLabel(loan.loanType)}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(loan)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-error"
                  onClick={() => onDelete?.(loan)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="flex-1">
          <TabsList className="w-full justify-start border-b border-neutral-100 rounded-none px-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="parties">Parties</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-6 space-y-6 mt-0">
            {/* Loan Details */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Loan Information
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Principal Amount"
                  value={formatCurrency(loan.principalAmount)}
                  mono
                />
                <DetailField
                  label="Current Balance"
                  value={formatCurrency(loan.currentBalance)}
                  mono
                />
                <DetailField
                  label="Interest Rate"
                  value={`${loan.interestRate.toFixed(2)}%`}
                  mono
                />
                <DetailField
                  label="Loan-to-Value (LTV)"
                  value={`${loanToValue.toFixed(1)}%`}
                  mono
                />
                <DetailField
                  label="Origination Date"
                  value={formatDate(loan.originationDate)}
                />
                <DetailField
                  label="Maturity Date"
                  value={formatDate(loan.maturityDate)}
                />
              </dl>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Payment Summary
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Payments Made"
                  value={`${paymentsMade} of ${paymentsMade + paymentsRemaining}`}
                />
                <DetailField
                  label="Total Interest Paid"
                  value={formatCurrency(totalInterestPaid)}
                  mono
                />
                <DetailField
                  label="Next Payment Due"
                  value="Dec 1, 2025"
                />
                <DetailField
                  label="Monthly Payment"
                  value={formatCurrency(5700)}
                  mono
                />
              </dl>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Property Information
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Address"
                  value={`${loan.property.address}, ${loan.property.city}, ${loan.property.state}`}
                />
                <DetailField
                  label="ARV (After Repair Value)"
                  value={formatCurrency(850000)}
                  mono
                />
                <DetailField
                  label="Purchase Price"
                  value={formatCurrency(620000)}
                  mono
                />
              </dl>
            </div>
          </TabsContent>

          <TabsContent value="parties" className="p-6 space-y-6 mt-0">
            {/* Borrower */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Borrower
              </h3>
              <div className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg">
                <Avatar
                  src={loan.borrower.avatar}
                  fallback={getBorrowerInitials(loan.borrower.name)}
                  size="md"
                />
                <div>
                  <p className="font-medium text-neutral-800">
                    {loan.borrower.name}
                  </p>
                  <p className="text-sm text-neutral-500">Primary Borrower</p>
                </div>
              </div>
            </div>

            {/* Lender */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Lender
              </h3>
              <div className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg">
                <Avatar
                  src={loan.lender.avatar}
                  fallback={getBorrowerInitials(loan.lender.name)}
                  size="md"
                />
                <div>
                  <p className="font-medium text-neutral-800">
                    {loan.lender.name}
                  </p>
                  <p className="text-sm text-neutral-500">Capital Provider</p>
                </div>
              </div>
            </div>

            {/* Additional Parties */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Additional Parties
              </h3>
              <div className="space-y-2">
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-800">
                        John Smith Law Firm
                      </p>
                      <p className="text-sm text-neutral-500">
                        Closing Attorney
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-800">
                        ABC Title Company
                      </p>
                      <p className="text-sm text-neutral-500">Title Company</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="p-6 space-y-4 mt-0">
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Payment History
              </h3>
              <div className="space-y-2">
                {/* Payment records */}
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-neutral-800">
                        Payment #8
                      </p>
                      <p className="text-sm text-neutral-500">Nov 1, 2024</p>
                    </div>
                    <Badge variant="default">Paid</Badge>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-neutral-500">Amount:</span>
                    <span className="font-mono text-neutral-800">
                      $5,700.00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-neutral-500">Principal:</span>
                    <span className="font-mono text-neutral-600">
                      $1,200.00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-neutral-500">Interest:</span>
                    <span className="font-mono text-neutral-600">
                      $4,500.00
                    </span>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-neutral-800">
                        Payment #7
                      </p>
                      <p className="text-sm text-neutral-500">Oct 1, 2024</p>
                    </div>
                    <Badge variant="default">Paid</Badge>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-neutral-500">Amount:</span>
                    <span className="font-mono text-neutral-800">
                      $5,700.00
                    </span>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-neutral-800">
                        Payment #6
                      </p>
                      <p className="text-sm text-neutral-500">Sep 1, 2024</p>
                    </div>
                    <Badge variant="default">Paid</Badge>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-neutral-500">Amount:</span>
                    <span className="font-mono text-neutral-800">
                      $5,700.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="p-6 space-y-4 mt-0">
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Loan Documents
              </h3>
              <div className="space-y-2">
                <div className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-800">
                        Promissory Note
                      </p>
                      <p className="text-sm text-neutral-500">
                        Uploaded Mar 15, 2024
                      </p>
                    </div>
                    <Badge variant="outline">PDF</Badge>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-800">
                        Deed of Trust
                      </p>
                      <p className="text-sm text-neutral-500">
                        Uploaded Mar 15, 2024
                      </p>
                    </div>
                    <Badge variant="outline">PDF</Badge>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-800">
                        Property Appraisal
                      </p>
                      <p className="text-sm text-neutral-500">
                        Uploaded Mar 10, 2024
                      </p>
                    </div>
                    <Badge variant="outline">PDF</Badge>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-800">
                        Title Insurance
                      </p>
                      <p className="text-sm text-neutral-500">
                        Uploaded Mar 14, 2024
                      </p>
                    </div>
                    <Badge variant="outline">PDF</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="p-6 mt-0">
            <div className="space-y-4">
              {/* Activity Timeline */}
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Payment received
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Nov 1, 2024 • $5,700.00
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-neutral-300 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Payment received
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Oct 1, 2024 • $5,700.00
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-neutral-300 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Payment received
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Sep 1, 2024 • $5,700.00
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-neutral-300 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Document uploaded
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Mar 15, 2024 • Promissory Note
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-neutral-300 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Loan funded
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Mar 15, 2024 •
                    {' '}
                    {formatCurrency(loan.principalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
