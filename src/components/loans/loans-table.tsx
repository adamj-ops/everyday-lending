'use client';

import type { LoanWithDetails } from '@/hooks/use-loans';
import { motion } from 'framer-motion';
import {
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useLoans } from '@/hooks/use-loans';

type LoansTableProps = {
  onLoanSelect: (loan: LoanWithDetails) => void;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'paid_off':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'defaulted':
    case 'foreclosed':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'cancelled':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const formatDate = (date: Date | null) => {
  if (!date) {
    return 'N/A';
  }
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number.parseFloat(amount));
};

export function LoansTable({ onLoanSelect }: LoansTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: loans, isLoading, error } = useLoans(searchQuery);

  const handleRowClick = (loan: LoanWithDetails) => {
    onLoanSelect(loan);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-destructive">
            Error loading loans. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative max-w-xs">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search loans or borrowers…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {loans?.length || 0}
              {' '}
              loans
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Loans</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Loan Code</TableHead>
                <TableHead className="font-semibold">Borrower</TableHead>
                <TableHead className="font-semibold">Property</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Amount</TableHead>
                <TableHead className="text-right font-semibold">Rate</TableHead>
                <TableHead className="text-right font-semibold">Term</TableHead>
                <TableHead className="font-semibold">Start Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans?.map((loan, index) => (
                <motion.tr
                  key={loan.id}
                  className="h-[44px] cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleRowClick(loan)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="text-sm font-medium">
                    {loan.loanNumber}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>
                      <div className="font-medium">
                        {loan.borrower ? `${loan.borrower.firstName} ${loan.borrower.lastName}` : 'No Borrower'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {loan.borrower?.email || 'N/A'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] text-sm">
                    <div className="truncate">
                      {loan.property?.address || 'No Property'}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {loan.property ? `${loan.property.city}, ${loan.property.state} ${loan.property.zipCode}` : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(loan.status)}`}
                    >
                      {loan.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatCurrency(loan.loanAmount)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {loan.interestRate}
                    %
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {loan.termMonths}
                    {' '}
                    mo
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(loan.originationDate)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRowClick(loan)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Loan
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>

          {loans?.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-muted-foreground">
                {searchQuery ? 'No loans found matching your search.' : 'No loans found.'}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
