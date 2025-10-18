/**
 * Optimistic Update Hook
 *
 * Provides optimistic UI updates with automatic rollback on error.
 */

'use client';

import type { UseMutationResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

type UseOptimisticUpdateOptions<TData, TVariables> = {
  /** React Query mutation */
  mutation: UseMutationResult<TData, Error, TVariables>;

  /** Query key to update */
  queryKey: unknown[];

  /** Function to apply optimistic update to cached data */
  updateFn: (oldData: TData | undefined, variables: TVariables) => TData;

  /** Optional success callback */
  onSuccess?: (data: TData, variables: TVariables) => void;

  /** Optional error callback */
  onError?: (error: Error, variables: TVariables, context: { previousData?: TData }) => void;
};

/**
 * Hook for optimistic updates with automatic rollback
 *
 * @example
 * ```tsx
 * const updateLoan = useUpdateLoan();
 * const optimisticUpdate = useOptimisticUpdate({
 *   mutation: updateLoan,
 *   queryKey: ['loans', loanId],
 *   updateFn: (oldData, variables) => ({
 *     ...oldData,
 *     ...variables.data,
 *   }),
 * });
 *
 * // Use it
 * optimisticUpdate.mutate({ id: loanId, data: { status: 'approved' } });
 * ```
 */
export function useOptimisticUpdate<TData, TVariables>({
  mutation,
  queryKey,
  updateFn,
  onSuccess,
  onError,
}: UseOptimisticUpdateOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  const mutate = useCallback(
    async (variables: TVariables) => {
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData>(queryKey);

      // Optimistically update the cache
      queryClient.setQueryData<TData>(queryKey, oldData => updateFn(oldData, variables));

      try {
        // Perform the mutation
        const data = await mutation.mutateAsync(variables);

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(data, variables);
        }

        return data;
      } catch (error) {
        // Rollback on error
        queryClient.setQueryData(queryKey, previousData);

        // Call error callback if provided
        if (onError && error instanceof Error) {
          onError(error, variables, { previousData });
        }

        throw error;
      }
    },
    [queryClient, queryKey, updateFn, mutation, onSuccess, onError],
  );

  return {
    ...mutation,
    mutate,
  };
}

/**
 * Simple optimistic update for list items
 */
export function useOptimisticListUpdate<TItem extends { id: number }>({
  queryKey,
  itemId,
  onUpdate,
}: {
  queryKey: unknown[];
  itemId: number;
  onUpdate: (item: TItem) => TItem;
}) {
  const queryClient = useQueryClient();

  return useCallback(
    (updates: Partial<TItem>) => {
      queryClient.setQueryData<TItem[]>(queryKey, (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return oldData.map((item) => {
          if (item.id === itemId) {
            const updated = { ...item, ...updates };
            return onUpdate ? onUpdate(updated) : updated;
          }
          return item;
        });
      });
    },
    [queryClient, queryKey, itemId, onUpdate],
  );
}
