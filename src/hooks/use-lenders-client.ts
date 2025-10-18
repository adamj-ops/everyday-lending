'use client';

import type { LenderCreateData, LenderUpdateData, LenderWithParticipations } from '@/services/frontend/LenderService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FrontendLenderService,

} from '@/services/frontend/LenderService';

// Re-export types for backward compatibility
export type { LenderCreateData, LenderUpdateData, LenderWithParticipations };

// Query keys
const QUERY_KEYS = {
  lenders: ['lenders'] as const,
  lender: (id: number) => ['lenders', id] as const,
};

/**
 * Fetch all lenders with participation counts
 */
export function useLenders(searchQuery?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.lenders, searchQuery],
    queryFn: () => FrontendLenderService.getLenders(searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch single lender by ID with participations
 */
export function useLender(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.lender(id),
    queryFn: () => FrontendLenderService.getLenderById(id),
    enabled: !!id,
  });
}

/**
 * Create lender mutation
 */
export function useCreateLender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LenderCreateData) => FrontendLenderService.createLender(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lenders });
    },
  });
}

/**
 * Update lender mutation
 */
export function useUpdateLender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LenderUpdateData }) =>
      FrontendLenderService.updateLender(id, data),
    onSuccess: (updatedLender, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lenders });
      queryClient.setQueryData(QUERY_KEYS.lender(id), updatedLender);
    },
  });
}

/**
 * Delete lender mutation
 */
export function useDeleteLender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FrontendLenderService.deleteLender(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lenders });
    },
  });
}
