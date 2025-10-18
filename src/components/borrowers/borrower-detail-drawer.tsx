'use client';

import type { Borrower } from './borrower-table';
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

type BorrowerDetailDrawerProps = {
  /**
   * Whether the drawer is open
   */
  open: boolean;

  /**
   * Callback when drawer open state changes
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Borrower data to display
   */
  borrower: Borrower | null;

  /**
   * Callback for edit action
   */
  onEdit?: (borrower: Borrower) => void;

  /**
   * Callback for delete action
   */
  onDelete?: (borrower: Borrower) => void;
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
 * BorrowerDetailDrawer - Right-side detail panel (Attio pattern)
 *
 * Displays comprehensive borrower information with tabs for:
 * - Details (borrower info)
 * - Activity (timeline of actions)
 * - Notes (comments/notes)
 * - Files (documents)
 *
 * @example
 * ```tsx
 * <BorrowerDetailDrawer
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   borrower={selectedBorrower}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
export function BorrowerDetailDrawer({
  open,
  onOpenChange,
  borrower,
  onEdit,
  onDelete,
}: BorrowerDetailDrawerProps) {
  if (!borrower) {
    return null;
  }

  const getStatusVariant = (status: Borrower['status']) => {
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-96 p-0 sm:w-[540px]">
        {/* Header */}
        <div className="border-b border-neutral-100 p-6">
          <div className="flex items-start gap-4">
            <Avatar
              src={borrower.avatar}
              fallback={borrower.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()}
              size="lg"
            />
            <div className="flex-1">
              <SheetTitle className="text-2xl">{borrower.name}</SheetTitle>
              <SheetDescription className="mt-1">
                {borrower.email}
              </SheetDescription>
              <div className="mt-3 flex gap-2">
                <Badge variant={getStatusVariant(borrower.status)}>
                  {borrower.status.charAt(0).toUpperCase() + borrower.status.slice(1)}
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
                <DropdownMenuItem onClick={() => onEdit?.(borrower)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-error"
                  onClick={() => onDelete?.(borrower)}
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
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0 space-y-6 p-6">
            {/* Financial Information */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Financial Information
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Credit Score"
                  value={borrower.creditScore}
                  mono
                />
                <DetailField
                  label="Total Loans"
                  value={`$${borrower.totalLoans.toLocaleString()}`}
                  mono
                />
                <DetailField
                  label="Debt-to-Income Ratio"
                  value="32%"
                  mono
                />
                <DetailField
                  label="Annual Income"
                  value="$185,000"
                  mono
                />
              </dl>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Personal Information
              </h3>
              <dl className="space-y-4">
                <DetailField
                  label="Email"
                  value={borrower.email}
                />
                <DetailField
                  label="Phone"
                  value="+1 (555) 123-4567"
                />
                <DetailField
                  label="Employment Status"
                  value="Employed"
                />
                <DetailField
                  label="Employer"
                  value="Tech Corp Inc."
                />
              </dl>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Related Loans
              </h3>
              <div className="space-y-2">
                {/* Placeholder for loan cards */}
                <div className="cursor-pointer rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-neutral-800">
                        123 Main St, Springfield
                      </p>
                      <p className="text-sm text-neutral-500">L-2024-001</p>
                    </div>
                    <p className="font-mono font-semibold text-neutral-800">
                      $450,000
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-neutral-800">
                        456 Oak Ave, Riverside
                      </p>
                      <p className="text-sm text-neutral-500">L-2024-002</p>
                    </div>
                    <p className="font-mono font-semibold text-neutral-800">
                      $800,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0 p-6">
            <div className="space-y-4">
              {/* Activity Timeline Placeholder */}
              <div className="flex gap-4">
                <div className="mt-2 h-2 w-2 rounded-full bg-brand-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Loan application submitted
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-2 h-2 w-2 rounded-full bg-neutral-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Credit check completed
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Yesterday at 3:24 PM
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-2 h-2 w-2 rounded-full bg-neutral-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Profile created
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    3 days ago
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-0 p-6">
            <div className="py-8 text-center text-neutral-500">
              No notes yet
            </div>
          </TabsContent>

          <TabsContent value="files" className="mt-0 p-6">
            <div className="py-8 text-center text-neutral-500">
              No files uploaded
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
