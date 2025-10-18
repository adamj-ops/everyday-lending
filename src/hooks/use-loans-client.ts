'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  FrontendLoanService,
  type LoanWithDetails,
  type LoanUpdateData,
  type LoanCreateData,
} from '@/services/frontend/LoanService';

// Re-export types for backward compatibility
export type { LoanWithDetails, LoanUpdateData, LoanCreateData };

// Query keys
const QUERY_KEYS = {
  loans: ['loans'] as const,
  loan: (id: number) => ['loans', id] as const,
};

/**
 * Fetch all loans with borrower and property details
 */
export function useLoans(searchQuery?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.loans, searchQuery],
    queryFn: () => FrontendLoanService.getLoans(searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch single loan by ID
 */
export function useLoan(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.loan(id),
    queryFn: () => FrontendLoanService.getLoanById(id),
    enabled: !!id,
  });
}

/**
 * Create loan mutation
 */
export function useCreateLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoanCreateData) => FrontendLoanService.createLoan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loans });
    },
  });
}

/**
 * Update loan mutation
 */
export function useUpdateLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LoanUpdateData }) => 
      FrontendLoanService.updateLoan(id, data),
    onSuccess: (updatedLoan, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loans });
      queryClient.setQueryData(QUERY_KEYS.loan(id), updatedLoan);
    },
  });
}

/**
 * Delete loan mutation
 */
export function useDeleteLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FrontendLoanService.deleteLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loans });
    },
  });
}
