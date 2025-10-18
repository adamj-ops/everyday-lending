'use client';

import type {
  ApproveDrawData,
  CreateDrawData,
  DisburseDrawData,
  Draw,
  DrawStats,
  UpdateDrawData,
} from '@/services/frontend/DrawService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/toast';
import { FrontendDrawService } from '@/services/frontend/DrawService';

// Re-export types for backward compatibility
export type { ApproveDrawData, CreateDrawData, DisburseDrawData, Draw, DrawStats, UpdateDrawData };

/**
 * Fetch draws with filters and pagination
 */
export function useDraws(search?: string, status?: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['draws', { search, status, page, limit }],
    queryFn: () => FrontendDrawService.getDraws({ search, status, page, limit }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Fetch single draw by ID
 */
export function useDraw(id: number) {
  return useQuery({
    queryKey: ['draw', id],
    queryFn: () => FrontendDrawService.getDrawById(id),
    enabled: !!id,
  });
}

/**
 * Fetch draw statistics
 */
export function useDrawStats(month?: number, year?: number) {
  return useQuery({
    queryKey: ['draw-stats', { month, year }],
    queryFn: () => FrontendDrawService.getDrawStats({ month, year }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Create draw mutation
 */
export function useCreateDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDrawData) => FrontendDrawService.createDraw(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draws'] });
      queryClient.invalidateQueries({ queryKey: ['draw-stats'] });
      toast({
        title: 'Success',
        description: 'Draw request submitted successfully',
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
 * Update draw mutation
 */
export function useUpdateDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDrawData }) =>
      FrontendDrawService.updateDraw(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['draws'] });
      queryClient.invalidateQueries({ queryKey: ['draw', id] });
      queryClient.invalidateQueries({ queryKey: ['draw-stats'] });
      toast({
        title: 'Success',
        description: 'Draw updated successfully',
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
 * Approve draw mutation
 */
export function useApproveDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ApproveDrawData }) =>
      FrontendDrawService.approveDraw(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['draws'] });
      queryClient.invalidateQueries({ queryKey: ['draw', id] });
      queryClient.invalidateQueries({ queryKey: ['draw-stats'] });
      toast({
        title: 'Success',
        description: 'Draw approved successfully',
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
 * Disburse draw mutation
 */
export function useDisburseDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DisburseDrawData }) =>
      FrontendDrawService.disburseDraw(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['draws'] });
      queryClient.invalidateQueries({ queryKey: ['draw', id] });
      queryClient.invalidateQueries({ queryKey: ['draw-stats'] });
      toast({
        title: 'Success',
        description: 'Draw disbursed successfully',
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
 * Delete draw mutation
 */
export function useDeleteDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FrontendDrawService.deleteDraw(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draws'] });
      queryClient.invalidateQueries({ queryKey: ['draw-stats'] });
      toast({
        title: 'Success',
        description: 'Draw deleted successfully',
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
