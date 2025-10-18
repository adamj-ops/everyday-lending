'use client';

import type {
  CreatePaymentData,
  Payment,
  PaymentStats,
  UpdatePaymentData,
} from '@/services/frontend/PaymentService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/toast';
import { FrontendPaymentService } from '@/services/frontend/PaymentService';

// Re-export types for backward compatibility
export type { CreatePaymentData, Payment, PaymentStats, UpdatePaymentData };

/**
 * Fetch payments with filters and pagination
 */
export function usePayments(search?: string, status?: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['payments', { search, status, page, limit }],
    queryFn: () => FrontendPaymentService.getPayments({ search, status, page, limit }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Fetch single payment by ID
 */
export function usePayment(id: number) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => FrontendPaymentService.getPaymentById(id),
    enabled: !!id,
  });
}

/**
 * Fetch payment statistics
 */
export function usePaymentStats(month?: number, year?: number) {
  return useQuery({
    queryKey: ['payment-stats', { month, year }],
    queryFn: () => FrontendPaymentService.getPaymentStats({ month, year }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Create payment mutation
 */
export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentData) => FrontendPaymentService.createPayment(data),
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

/**
 * Update payment mutation
 */
export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePaymentData }) =>
      FrontendPaymentService.updatePayment(id, data),
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

/**
 * Delete payment mutation
 */
export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FrontendPaymentService.deletePayment(id),
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
