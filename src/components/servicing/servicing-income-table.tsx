'use client';

import { format } from 'date-fns';
import { Download, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data - will be replaced with real API calls
const mockServicingIncome = [
  {
    id: '1',
    loanId: 'LOAN-001',
    borrowerName: 'John Smith',
    feeType: 'Origination Fee',
    amount: 2500,
    receivedDate: new Date('2024-01-15'),
    status: 'received',
  },
  {
    id: '2',
    loanId: 'LOAN-002',
    borrowerName: 'Sarah Johnson',
    feeType: 'Servicing Fee',
    amount: 1200,
    receivedDate: new Date('2024-01-14'),
    status: 'received',
  },
  {
    id: '3',
    loanId: 'LOAN-003',
    borrowerName: 'Mike Wilson',
    feeType: 'Late Fee',
    amount: 150,
    receivedDate: new Date('2024-01-13'),
    status: 'pending',
  },
];

export function ServicingIncomeTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredData = mockServicingIncome.filter((item) => {
    const matchesSearch
      = item.loanId.toLowerCase().includes(searchTerm.toLowerCase())
        || item.borrowerName.toLowerCase().includes(searchTerm.toLowerCase())
        || item.feeType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return <Badge variant="default" className="bg-green-100 text-green-800">Received</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Servicing Income</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="mb-4 flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by loan ID, borrower, or fee type..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0
                ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        No servicing income records found
                      </TableCell>
                    </TableRow>
                  )
                : (
                    filteredData.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.loanId}</TableCell>
                        <TableCell>{item.borrowerName}</TableCell>
                        <TableCell>{item.feeType}</TableCell>
                        <TableCell>
                          $
                          {item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{format(item.receivedDate, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                      </TableRow>
                    ))
                  )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination would go here */}
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing
            {' '}
            {filteredData.length}
            {' '}
            of
            {' '}
            {mockServicingIncome.length}
            {' '}
            records
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
