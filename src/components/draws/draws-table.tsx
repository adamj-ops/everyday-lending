'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
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

type Draw = {
  id: number;
  loanNumber: string;
  borrowerName: string;
  drawNumber: number;
  requestedAmount: number;
  approvedAmount?: number;
  status: 'pending' | 'approved' | 'disbursed' | 'rejected';
  requestDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  description?: string;
  contractorName?: string;
};

// Mock data - will be replaced with real API calls
const mockDraws: Draw[] = [
  {
    id: 1,
    loanNumber: 'LN-2025-001',
    borrowerName: 'Mike Chen',
    drawNumber: 1,
    requestedAmount: 25000,
    approvedAmount: 25000,
    status: 'disbursed',
    requestDate: '2025-01-10',
    approvalDate: '2025-01-12',
    disbursementDate: '2025-01-15',
    description: 'Kitchen renovation - cabinets and countertops',
    contractorName: 'ABC Construction',
  },
  {
    id: 2,
    loanNumber: 'LN-2025-002',
    borrowerName: 'Sarah Martinez',
    drawNumber: 1,
    requestedAmount: 30000,
    status: 'pending',
    requestDate: '2025-01-14',
    description: 'Bathroom renovation - tile and fixtures',
    contractorName: 'XYZ Renovations',
  },
  {
    id: 3,
    loanNumber: 'LN-2025-003',
    borrowerName: 'John Davis',
    drawNumber: 2,
    requestedAmount: 20000,
    approvedAmount: 18000,
    status: 'approved',
    requestDate: '2025-01-12',
    approvalDate: '2025-01-16',
    description: 'Flooring installation - hardwood throughout',
    contractorName: 'Floor Masters',
  },
];

export function DrawsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [draws] = useState<Draw[]>(mockDraws);

  const filteredDraws = draws.filter((draw) => {
    const matchesSearch
      = draw.borrowerName.toLowerCase().includes(searchTerm.toLowerCase())
        || draw.loanNumber.toLowerCase().includes(searchTerm.toLowerCase())
        || draw.contractorName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || draw.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Draw['status']) => {
    switch (status) {
      case 'disbursed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Draw['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-blue-100 text-blue-700',
      disbursed: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Draw Requests</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Batch Approve
            </Button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search by borrower, loan number, or contractor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="disbursed">Disbursed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Number</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Draw #</TableHead>
                <TableHead>Requested Amount</TableHead>
                <TableHead>Approved Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Contractor</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDraws.length > 0
                ? (
                    filteredDraws.map(draw => (
                      <motion.tr
                        key={draw.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">
                          {draw.loanNumber}
                        </TableCell>
                        <TableCell>{draw.borrowerName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            #
                            {draw.drawNumber}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(draw.requestedAmount)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {draw.approvedAmount ? formatCurrency(draw.approvedAmount) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(draw.status)}
                            {getStatusBadge(draw.status)}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(draw.requestDate)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {draw.contractorName || 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            {draw.status === 'pending' && (
                              <Button variant="outline" size="sm">
                                Approve
                              </Button>
                            )}
                            {draw.status === 'approved' && (
                              <Button variant="outline" size="sm">
                                Disburse
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )
                : (
                    <TableRow>
                      <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                        No draws found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination would go here */}
        {filteredDraws.length > 0 && (
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Showing
              {' '}
              {filteredDraws.length}
              {' '}
              of
              {' '}
              {draws.length}
              {' '}
              draws
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
