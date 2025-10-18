'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/toast';

export type Payment = {
  id: number;
  loanId: number;
  paymentDate: string;
  amount: number;
  principalAmount: number;
  interestAmount: number;
  feesAmount: number;
  lateFeeAmount: number;
  paymentType: string;
  paymentMethod: string;
  referenceNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  loan: {
    id: number;
    loanNumber: string;
    loanAmount: number;
    currentBalance: number;
    status: string;
  };
  borrower: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type PaymentStats = {
  totalPayments: number;
  totalCount: number;
  pendingPayments: number;
  overduePayments: number;
  successRate: number;
  month: number;
  year: number;
};

export type CreatePaymentData = {
  loanNumber: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'ACH' | 'Wire' | 'Check' | 'Card';
  referenceNumber?: string;
  notes?: string;
};

export type UpdatePaymentData = {
  amount?: number;
  paymentDate?: string;
  paymentMethod?: 'ACH' | 'Wire' | 'Check' | 'Card';
  referenceNumber?: string;
  notes?: string;
};

export function usePayments(search?: string, status?: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['payments', { search, status, page, limit }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) {
        params.append('search', search);
      }
      if (status) {
        params.append('status', status);
      }

      const response = await fetch(`/api/payments?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      return response.json();
    },
  });
}

export function usePayment(id: number) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: async () => {
      const response = await fetch(`/api/payments/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment');
      }
      return response.json() as Promise<Payment>;
    },
    enabled: !!id,
  });
}

export function usePaymentStats(month?: number, year?: number) {
  return useQuery({
    queryKey: ['payment-stats', { month, year }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (month) {
        params.append('month', month.toString());
      }
      if (year) {
        params.append('year', year.toString());
      }

      const response = await fetch(`/api/payments/stats?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment stats');
      }
      return response.json() as Promise<PaymentStats>;
    },
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePaymentData) => {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment-stats'] });
      toast({
        title: 'Success',
        description: 'Payment recorded successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdatePaymentData }) => {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update payment');
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment', id] });
      queryClient.invalidateQueries({ queryKey: ['payment-stats'] });
      toast({
        title: 'Success',
        description: 'Payment updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete payment');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment-stats'] });
      toast({
        title: 'Success',
        description: 'Payment deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
