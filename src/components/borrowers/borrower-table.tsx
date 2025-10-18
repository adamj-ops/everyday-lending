'use client';

import { ArrowUpDown, MoreHorizontal, Search } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type Borrower = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  creditScore: number;
  totalLoans: number;
  status: 'active' | 'inactive' | 'pending';
};

type BorrowerTableProps = {
  /**
   * Array of borrowers to display
   */
  borrowers: Borrower[];

  /**
   * Callback when a borrower row is clicked
   */
  onRowClick?: (borrower: Borrower) => void;

  /**
   * Callback for edit action
   */
  onEdit?: (borrower: Borrower) => void;

  /**
   * Callback for delete action
   */
  onDelete?: (borrower: Borrower) => void;

  /**
   * Show search bar
   */
  showSearch?: boolean;

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Custom className
   */
  className?: string;
};

type SortField = 'name' | 'creditScore' | 'totalLoans';
type SortDirection = 'asc' | 'desc';

/**
 * BorrowerTable - Attio-style data table for borrowers
 *
 * Features:
 * - Sortable columns
 * - Search functionality
 * - Row actions (edit, delete)
 * - Clickable rows
 * - Status indicators
 * - Avatar support
 *
 * @example
 * ```tsx
 * <BorrowerTable
 *   borrowers={borrowers}
 *   onRowClick={(borrower) => openDrawer(borrower)}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
export function BorrowerTable({
  borrowers,
  onRowClick,
  onEdit,
  onDelete,
  showSearch = true,
  isLoading = false,
  className,
}: BorrowerTableProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');

  // Filter borrowers based on search
  const filteredBorrowers = React.useMemo(() => {
    if (!searchQuery) {
      return borrowers;
    }

    const query = searchQuery.toLowerCase();
    return borrowers.filter(
      borrower =>
        borrower.name.toLowerCase().includes(query)
        || borrower.email.toLowerCase().includes(query),
    );
  }, [borrowers, searchQuery]);

  // Sort borrowers
  const sortedBorrowers = React.useMemo(() => {
    const sorted = [...filteredBorrowers].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [filteredBorrowers, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // const getStatusVariant = (status: Borrower['status']) => {
  //   switch (status) {
  //     case 'active':
  //       return 'default';
  //     case 'inactive':
  //       return 'secondary';
  //     case 'pending':
  //       return 'outline';
  //     default:
  //       return 'secondary';
  //   }
  // };

  const getStatusLabel = (status: Borrower['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-neutral-500">Loading borrowers...</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header with Search */}
      {showSearch && (
        <div className="border-b border-[#eeeff1] px-4 py-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#b8b9bb]" />
            <Input
              type="search"
              placeholder="Search borrowers..."
              className="h-7 pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="h-[37px] border-b border-[#eeeff1]">
              <TableHead className="w-12 px-4">
                {/* Checkbox placeholder */}
              </TableHead>
              <TableHead className="px-4">
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80"
                >
                  Borrower
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4">
                <button
                  type="button"
                  onClick={() => handleSort('creditScore')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80"
                >
                  Credit Score
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4">
                <button
                  type="button"
                  onClick={() => handleSort('totalLoans')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80"
                >
                  Total Loans
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4">Status</TableHead>
              <TableHead className="w-12 px-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBorrowers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="text-[#696a6c]">
                    {searchQuery ? 'No borrowers found' : 'No borrowers yet'}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedBorrowers.map(borrower => (
                <TableRow
                  key={borrower.id}
                  className="h-[37px] cursor-pointer border-b border-[#eeeff1] hover:bg-[#fbfbfb]"
                  onClick={() => onRowClick?.(borrower)}
                >
                  <TableCell className="px-4">
                    {/* Checkbox placeholder */}
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={borrower.avatar}
                        fallback={borrower.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                        size="md"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {borrower.name}
                        </p>
                        <p className="text-xs font-semibold text-[#696a6c]">
                          {borrower.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-sm text-foreground">
                      {borrower.creditScore}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-sm text-foreground">
                      $
                      {borrower.totalLoans.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <Badge variant="category">
                      {getStatusLabel(borrower.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(borrower);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to loans
                          }}
                        >
                          View Loans
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(borrower);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer with count */}
      {sortedBorrowers.length > 0 && (
        <div className="border-t border-[#eeeff1] px-4 py-3">
          <p className="text-sm text-[#696a6c]">
            Showing
            {' '}
            {sortedBorrowers.length}
            {' '}
            of
            {' '}
            {borrowers.length}
            {' '}
            borrowers
          </p>
        </div>
      )}
    </div>
  );
}
