'use client';

import type { BorrowerWithLoans } from '@/hooks/use-borrowers-client';
import { motion } from 'framer-motion';
import {
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
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
import { useBorrowers } from '@/hooks/use-borrowers-client';

type BorrowersTableProps = {
  onBorrowerSelect: (borrower: BorrowerWithLoans) => void;
  onCreateBorrower: () => void;
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

export function BorrowersTable({ onBorrowerSelect, onCreateBorrower }: BorrowersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: borrowers, isLoading, error } = useBorrowers(searchQuery);

  const handleRowClick = (borrower: BorrowerWithLoans) => {
    onBorrowerSelect(borrower);
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
            Error loading borrowers. Please try again.
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
                  placeholder="Search borrowers by name or email…"
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
            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">
                {borrowers?.length || 0}
                {' '}
                borrowers
              </div>
              <Button size="sm" onClick={onCreateBorrower}>
                <Plus className="mr-2 h-4 w-4" />
                New Borrower
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Borrowers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Borrowers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Borrower Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Active Loans</TableHead>
                <TableHead className="font-semibold">Total Borrowed</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowers?.map((borrower, index) => (
                <motion.tr
                  key={borrower.id}
                  className="h-[44px] cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleRowClick(borrower)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="text-sm font-medium">
                    <div>
                      <div className="font-medium">
                        {borrower.firstName}
                        {' '}
                        {borrower.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {borrower.city && borrower.state
                          ? `${borrower.city}, ${borrower.state}`
                          : 'No address'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {borrower.email}
                  </TableCell>
                  <TableCell className="text-sm">
                    {borrower.phone || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-200 bg-blue-100 text-blue-700">
                      {borrower.activeLoansCount}
                      {' '}
                      active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatCurrency(
                      borrower.loans.reduce((sum, loan) => sum + Number.parseFloat(loan.loanAmount), 0).toString(),
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(borrower.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRowClick(borrower)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Borrower
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

          {borrowers?.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-muted-foreground">
                {searchQuery ? 'No borrowers found matching your search.' : 'No borrowers found.'}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
