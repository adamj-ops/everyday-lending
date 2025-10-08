'use client';

import type { LenderWithParticipations } from '@/hooks/use-lenders-client';
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
import { useLenders } from '@/hooks/use-lenders-client';

type LendersTableProps = {
  onLenderSelect: (lender: LenderWithParticipations) => void;
  onCreateLender: () => void;
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

export function LendersTable({ onLenderSelect, onCreateLender }: LendersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: lenders, isLoading, error } = useLenders(searchQuery);

  const handleRowClick = (lender: LenderWithParticipations) => {
    onLenderSelect(lender);
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
            Error loading lenders. Please try again.
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
                  placeholder="Search lenders by name or email…"
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
                {lenders?.length || 0}
                {' '}
                lenders
              </div>
              <Button size="sm" onClick={onCreateLender}>
                <Plus className="mr-2 h-4 w-4" />
                New Lender
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lenders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Lenders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Lender Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Active Participations</TableHead>
                <TableHead className="text-right font-semibold">Total Capital Committed</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenders?.map((lender, index) => (
                <motion.tr
                  key={lender.id}
                  className="h-[44px] cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleRowClick(lender)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="text-sm font-medium">
                    <div>
                      <div className="font-medium">
                        {lender.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lender.contactPerson || 'No contact person'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {lender.email}
                  </TableCell>
                  <TableCell className="text-sm">
                    {lender.phone || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={lender.isActive
                        ? 'border-green-200 bg-green-100 text-green-700'
                        : 'border-gray-200 bg-gray-100 text-gray-700'}
                    >
                      {lender.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-200 bg-blue-100 text-blue-700">
                      {lender.activeParticipationsCount}
                      {' '}
                      active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatCurrency(lender.totalCapitalCommitted)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(lender.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRowClick(lender)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Lender
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

          {lenders?.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-muted-foreground">
                {searchQuery ? 'No lenders found matching your search.' : 'No lenders found.'}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
