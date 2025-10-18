'use client';

import type { Lender } from './lender-table';
import { MoreHorizontal } from 'lucide-react';

import * as React from 'react';
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

type LenderDetailDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lender: Lender | null;
  onEdit?: (lender: Lender) => void;
  onDelete?: (lender: Lender) => void;
};

type DetailFieldProps = {
  label: string;
  value: string | number;
  mono?: boolean;
};

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
 * LenderDetailDrawer - Right-side detail panel for lenders
 */
export function LenderDetailDrawer({
  open,
  onOpenChange,
  lender,
  onEdit,
  onDelete,
}: LenderDetailDrawerProps) {
  if (!lender) {
    return null;
  }

  const getStatusVariant = (status: Lender['status']) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const utilizationRate = lender.totalFunded / lender.investmentCapacity;
  const availableCapital = lender.investmentCapacity - lender.totalFunded;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-96 p-0 sm:w-[540px]">
        {/* Header */}
        <div className="border-b border-neutral-100 p-6">
          <div className="flex items-start gap-4">
            <Avatar
              src={lender.avatar}
              fallback={lender.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()}
              size="lg"
            />
            <div className="flex-1">
              <SheetTitle className="text-2xl">{lender.name}</SheetTitle>
              <SheetDescription className="mt-1">
                {lender.email}
              </SheetDescription>
              <div className="mt-3 flex gap-2">
                <Badge variant={getStatusVariant(lender.status)}>
                  {lender.status.charAt(0).toUpperCase() + lender.status.slice(1)}
                </Badge>
                <Badge variant="outline">
                  {lender.activeLoans}
                  {' '}
                  Active Loans
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
                <DropdownMenuItem onClick={() => onEdit?.(lender)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-error"
                  onClick={() => onDelete?.(lender)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="flex-1">
          <TabsList className="w-full justify-start rounded-none border-b border-neutral-100 px-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0 space-y-6 p-6">
            {/* Investment Information */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Investment Information
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Investment Capacity"
                  value={`$${lender.investmentCapacity.toLocaleString()}`}
                  mono
                />
                <DetailField
                  label="Total Funded"
                  value={`$${lender.totalFunded.toLocaleString()}`}
                  mono
                />
                <DetailField
                  label="Available Capital"
                  value={`$${availableCapital.toLocaleString()}`}
                  mono
                />
                <DetailField
                  label="Utilization Rate"
                  value={`${(utilizationRate * 100).toFixed(1)}%`}
                  mono
                />
                <DetailField
                  label="Active Loans"
                  value={lender.activeLoans}
                  mono
                />
              </dl>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Contact Information
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Email"
                  value={lender.email}
                />
                <DetailField
                  label="Phone"
                  value="+1 (555) 987-6543"
                />
                <DetailField
                  label="Company"
                  value="Investment Partners LLC"
                />
                <DetailField
                  label="Type"
                  value="Institutional"
                />
              </dl>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Investment Preferences
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Property Types"
                  value="Residential, Multi-family"
                />
                <DetailField
                  label="Min Investment"
                  value="$100,000"
                  mono
                />
                <DetailField
                  label="Max Investment"
                  value="$2,000,000"
                  mono
                />
                <DetailField
                  label="Target IRR"
                  value="12-15%"
                  mono
                />
              </dl>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-0 space-y-4 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Funded Loans
              </h3>
              <div className="space-y-2">
                {/* Loan cards */}
                <div className="cursor-pointer rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-neutral-800">
                        123 Main St, Springfield
                      </p>
                      <p className="text-sm text-neutral-500">L-2024-001</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Funded:</span>
                    <span className="font-mono text-neutral-800">$450,000</span>
                  </div>
                </div>

                <div className="cursor-pointer rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-neutral-800">
                        789 Oak Ave, Riverside
                      </p>
                      <p className="text-sm text-neutral-500">L-2024-003</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Funded:</span>
                    <span className="font-mono text-neutral-800">$800,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-4">
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Portfolio Performance
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-neutral-500">Total Returns</dt>
                  <dd className="font-mono text-sm font-semibold text-success">
                    +14.2%
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-neutral-500">Avg Loan Term</dt>
                  <dd className="font-mono text-sm text-neutral-800">18 months</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-neutral-500">Default Rate</dt>
                  <dd className="font-mono text-sm text-neutral-800">0%</dd>
                </div>
              </dl>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0 p-6">
            <div className="space-y-4">
              {/* Activity Timeline */}
              <div className="flex gap-4">
                <div className="mt-2 h-2 w-2 rounded-full bg-brand-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Funded new loan
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    2 hours ago • $800,000
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-2 h-2 w-2 rounded-full bg-neutral-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Payment received
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Yesterday • $12,500
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-2 h-2 w-2 rounded-full bg-neutral-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Profile updated
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    3 days ago
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-0 p-6">
            <div className="py-8 text-center text-neutral-500">
              No documents uploaded
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
