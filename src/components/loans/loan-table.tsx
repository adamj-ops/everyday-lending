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
  DropdownMenuSeparator,
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

export interface Loan {
  id: string;
  loanNumber: string;
  borrower: {
    name: string;
    avatar?: string;
  };
  lender: {
    name: string;
    avatar?: string;
  };
  property: {
    address: string;
    city: string;
    state: string;
  };
  principalAmount: number;
  currentBalance: number;
  interestRate: number;
  status:
    | 'active'
    | 'pending'
    | 'funded'
    | 'closed'
    | 'defaulted'
    | 'in_review';
  originationDate: string;
  maturityDate: string;
  loanType: 'fix_and_flip' | 'bridge' | 'term' | 'construction';
}

export interface LoanTableProps {
  loans: Loan[];
  onRowClick?: (loan: Loan) => void;
  onEdit?: (loan: Loan) => void;
  onDelete?: (loan: Loan) => void;
  onViewDetails?: (loan: Loan) => void;
  showSearch?: boolean;
  isLoading?: boolean;
  className?: string;
}

type SortField =
  | 'loanNumber'
  | 'borrowerName'
  | 'principalAmount'
  | 'currentBalance'
  | 'interestRate'
  | 'originationDate'
  | 'maturityDate';
type SortDirection = 'asc' | 'desc';

/**
 * LoanTable - Complex data table for loans with relationships
 * Displays borrower, lender, property, and financial information in Attio style
 */
export function LoanTable({
  loans,
  onRowClick,
  onEdit,
  onDelete,
  onViewDetails,
  showSearch = true,
  isLoading = false,
  className,
}: LoanTableProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>('loanNumber');
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>('asc');

  const filteredLoans = React.useMemo(() => {
    if (!searchQuery)
      return loans;

    const query = searchQuery.toLowerCase();
    return loans.filter(
      loan =>
        loan.loanNumber.toLowerCase().includes(query)
        || loan.borrower.name.toLowerCase().includes(query)
        || loan.lender.name.toLowerCase().includes(query)
        || loan.property.address.toLowerCase().includes(query)
        || loan.property.city.toLowerCase().includes(query),
    );
  }, [loans, searchQuery]);

  const sortedLoans = React.useMemo(() => {
    return [...filteredLoans].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'loanNumber':
          aValue = a.loanNumber;
          bValue = b.loanNumber;
          break;
        case 'borrowerName':
          aValue = a.borrower.name;
          bValue = b.borrower.name;
          break;
        case 'principalAmount':
          aValue = a.principalAmount;
          bValue = b.principalAmount;
          break;
        case 'currentBalance':
          aValue = a.currentBalance;
          bValue = b.currentBalance;
          break;
        case 'interestRate':
          aValue = a.interestRate;
          bValue = b.interestRate;
          break;
        case 'originationDate':
          aValue = new Date(a.originationDate).getTime();
          bValue = new Date(b.originationDate).getTime();
          break;
        case 'maturityDate':
          aValue = new Date(a.maturityDate).getTime();
          bValue = new Date(b.maturityDate).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue)
        return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue)
        return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredLoans, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    }
    else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
      month: 'short',
      day: 'numeric',
    });
  };

  const getBorrowerInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {showSearch && (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search loans..."
              className="pl-9"
              disabled
            />
          </div>
        )}
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-neutral-500">Loading loans...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {showSearch && (
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search loans..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {sortedLoans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm font-medium text-neutral-800">
            No loans found
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            {searchQuery
              ? 'Try adjusting your search'
              : 'Get started by creating your first loan'}
          </p>
        </div>
      ) : (
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="border-b border-[#eeeff1] h-[37px] hover:bg-white">
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('loanNumber')}
                >
                  <div className="flex items-center gap-2">
                    Loan Number
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('borrowerName')}
                >
                  <div className="flex items-center gap-2">
                    Borrower
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  </div>
                </TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Property</TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('principalAmount')}
                >
                  <div className="flex items-center gap-2">
                    Principal
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('currentBalance')}
                >
                  <div className="flex items-center gap-2">
                    Balance
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('interestRate')}
                >
                  <div className="flex items-center gap-2">
                    Rate
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('maturityDate')}
                >
                  <div className="flex items-center gap-2">
                    Maturity
                    <ArrowUpDown className="h-4 w-4 text-neutral-400" />
                  </div>
                </TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLoans.map(loan => (
                <TableRow
                  key={loan.id}
                  className="cursor-pointer hover:bg-[#fbfbfb] border-b border-[#eeeff1] h-[37px]"
                  onClick={() => onRowClick?.(loan)}
                >
                  <TableCell className="font-mono text-sm font-medium text-neutral-800">
                    {loan.loanNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={loan.borrower.avatar}
                        fallback={getBorrowerInitials(loan.borrower.name)}
                        size="sm"
                      />
                      <span className="text-sm text-neutral-800">
                        {loan.borrower.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={loan.lender.avatar}
                        fallback={getBorrowerInitials(loan.lender.name)}
                        size="sm"
                      />
                      <span className="text-sm text-neutral-800">
                        {loan.lender.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-neutral-800">
                        {loan.property.address}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {loan.property.city}
                        ,
                        {' '}
                        {loan.property.state}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-neutral-800">
                    $
                    {loan.principalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-neutral-800">
                    $
                    {loan.currentBalance.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-neutral-800">
                    {loan.interestRate.toFixed(2)}
                    %
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-neutral-600">
                      {getLoanTypeLabel(loan.loanType)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(loan.status)}>
                      {loan.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-600">
                    {formatDate(loan.maturityDate)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails?.(loan);
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(loan);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(loan);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
