'use client';

import type { Payment } from '@/hooks/use-payments-client';
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
import { usePayments } from '@/hooks/use-payments-client';

export function PaymentsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: paymentsData, isLoading } = usePayments(searchTerm, statusFilter, page, limit);
  const payments = paymentsData?.data || [];
  const total = paymentsData?.total || 0;
  const pagination = { total, page, limit, totalPages: Math.ceil(total / limit) };

  const getStatusIcon = (payment: any) => {
    // Determine status based on payment date and other factors
    const paymentDate = new Date(payment.paymentDate);
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let status = 'successful';
    if (paymentDate < thirtyDaysAgo) {
      status = 'overdue';
    } else if (paymentDate > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) {
      status = 'pending';
    }
    switch (status) {
      case 'successful':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
      case 'overdue':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (payment: any) => {
    // Determine status based on payment date and other factors
    const paymentDate = new Date(payment.paymentDate);
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let status = 'successful';
    if (paymentDate < thirtyDaysAgo) {
      status = 'overdue';
    } else if (paymentDate > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) {
      status = 'pending';
    }
    const variants = {
      successful: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
      overdue: 'bg-red-100 text-red-700',
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
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
          <CardTitle>Payment History</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Process Payments
            </Button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search by borrower, loan number, or reference..."
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
              <SelectItem value="successful">Successful</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
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
                <TableHead>Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? (
                    <TableRow>
                      <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                        Loading payments...
                      </TableCell>
                    </TableRow>
                  )
                : payments.length > 0
                  ? (
                      payments.map((payment: Payment) => (
                        <motion.tr
                          key={payment.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            {payment.loan?.loanNumber || 'N/A'}
                          </TableCell>
                          <TableCell>
                            {payment.borrower ? `${payment.borrower.firstName} ${payment.borrower.lastName}` : 'N/A'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(payment)}
                              {getStatusBadge(payment)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{payment.paymentMethod}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {payment.referenceNumber || 'N/A'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))
                    )
                  : (
                      <TableRow>
                        <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                          No payments found
                        </TableCell>
                      </TableRow>
                    )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination && pagination.total > 0 && (
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Showing
              {' '}
              {pagination.page * pagination.limit - pagination.limit + 1}
              {' '}
              to
              {' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)}
              {' '}
              of
              {' '}
              {pagination.total}
              {' '}
              payments
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
