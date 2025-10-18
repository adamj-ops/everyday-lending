'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FrontendBorrowerService,
  type BorrowerWithLoans,
  type BorrowerUpdateData,
  type BorrowerCreateData,
} from '@/services/frontend/BorrowerService';

// Re-export types for backward compatibility
export type { BorrowerWithLoans, BorrowerUpdateData, BorrowerCreateData };

// Query keys
const QUERY_KEYS = {
  borrowers: ['borrowers'] as const,
  borrower: (id: number) => ['borrowers', id] as const,
};

/**
 * Fetch all borrowers with loan counts
 */
export function useBorrowers(searchQuery?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.borrowers, searchQuery],
    queryFn: () => FrontendBorrowerService.getBorrowers(searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch single borrower by ID with loans
 */
export function useBorrower(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.borrower(id),
    queryFn: () => FrontendBorrowerService.getBorrowerById(id),
    enabled: !!id,
  });
}

/**
 * Create borrower mutation
 */
export function useCreateBorrower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BorrowerCreateData) => FrontendBorrowerService.createBorrower(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.borrowers });
    },
  });
}

/**
 * Update borrower mutation
 */
export function useUpdateBorrower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BorrowerUpdateData }) =>
      FrontendBorrowerService.updateBorrower(id, data),
    onSuccess: (updatedBorrower, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.borrowers });
      queryClient.setQueryData(QUERY_KEYS.borrower(id), updatedBorrower);
    },
  });
}

/**
 * Delete borrower mutation
 */
export function useDeleteBorrower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FrontendBorrowerService.deleteBorrower(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.borrowers });
    },
  });
}
