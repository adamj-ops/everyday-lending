'use client';

import * as React from 'react';
import { ArrowUpDown, MoreHorizontal, Search } from 'lucide-react';

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

export interface Lender {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  investmentCapacity: number;
  totalFunded: number;
  activeLoans: number;
  status: 'active' | 'inactive' | 'pending';
}

interface LenderTableProps {
  lenders: Lender[];
  onRowClick?: (lender: Lender) => void;
  onEdit?: (lender: Lender) => void;
  onDelete?: (lender: Lender) => void;
  showSearch?: boolean;
  isLoading?: boolean;
  className?: string;
}

type SortField = 'name' | 'investmentCapacity' | 'totalFunded' | 'activeLoans';
type SortDirection = 'asc' | 'desc';

/**
 * LenderTable - Attio-style data table for lenders
 *
 * Features:
 * - Sortable columns
 * - Search functionality
 * - Row actions (edit, delete)
 * - Clickable rows
 * - Status indicators
 *
 * @example
 * ```tsx
 * <LenderTable
 *   lenders={lenders}
 *   onRowClick={(lender) => openDrawer(lender)}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
export function LenderTable({
  lenders,
  onRowClick,
  onEdit,
  onDelete,
  showSearch = true,
  isLoading = false,
  className,
}: LenderTableProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');

  const filteredLenders = React.useMemo(() => {
    if (!searchQuery)
      return lenders;

    const query = searchQuery.toLowerCase();
    return lenders.filter(
      lender =>
        lender.name.toLowerCase().includes(query)
        || lender.email.toLowerCase().includes(query),
    );
  }, [lenders, searchQuery]);

  const sortedLenders = React.useMemo(() => {
    const sorted = [...filteredLenders].sort((a, b) => {
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
  }, [filteredLenders, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    }
    else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // const getStatusVariant = (status: Lender['status']) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-neutral-500">Loading lenders...</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {showSearch && (
        <div className="px-4 py-3 border-b border-[#eeeff1]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b8b9bb]" />
            <Input
              type="search"
              placeholder="Search lenders..."
              className="pl-10 h-7"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="border-b border-[#eeeff1] h-[37px]">
              <TableHead className="w-12 px-4" />
              <TableHead className="px-4">
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 font-medium text-sm text-foreground hover:text-foreground/80"
                >
                  Lender
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4">
                <button
                  type="button"
                  onClick={() => handleSort('investmentCapacity')}
                  className="flex items-center gap-2 font-medium text-sm text-foreground hover:text-foreground/80"
                >
                  Investment Capacity
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4">
                <button
                  type="button"
                  onClick={() => handleSort('totalFunded')}
                  className="flex items-center gap-2 font-medium text-sm text-foreground hover:text-foreground/80"
                >
                  Total Funded
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4">
                <button
                  type="button"
                  onClick={() => handleSort('activeLoans')}
                  className="flex items-center gap-2 font-medium text-sm text-foreground hover:text-foreground/80"
                >
                  Active Loans
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4">Status</TableHead>
              <TableHead className="w-12 px-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLenders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="text-[#696a6c]">
                    {searchQuery ? 'No lenders found' : 'No lenders yet'}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedLenders.map(lender => (
                <TableRow
                  key={lender.id}
                  className="cursor-pointer hover:bg-[#fbfbfb] border-b border-[#eeeff1] h-[37px]"
                  onClick={() => onRowClick?.(lender)}
                >
                  <TableCell className="px-4" />
                  <TableCell className="px-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={lender.avatar}
                        fallback={lender.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                        size="md"
                      />
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {lender.name}
                        </p>
                        <p className="text-xs text-[#696a6c] font-semibold">
                          {lender.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-sm text-foreground">
                      ${lender.investmentCapacity.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-sm text-foreground">
                      ${lender.totalFunded.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-sm text-foreground">
                      {lender.activeLoans}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <Badge variant="category">
                      {lender.status.charAt(0).toUpperCase() + lender.status.slice(1)}
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
                            onEdit?.(lender);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          View Loans
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(lender);
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

      {sortedLenders.length > 0 && (
        <div className="px-4 py-3 border-t border-[#eeeff1]">
          <p className="text-sm text-[#696a6c]">
            Showing
            {' '}
            {sortedLenders.length}
            {' '}
            of
            {' '}
            {lenders.length}
            {' '}
            lenders
          </p>
        </div>
      )}
    </div>
  );
}
