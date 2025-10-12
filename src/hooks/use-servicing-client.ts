'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Types
export interface ServicingIncome {
  id: string;
  loanId: string;
  feeTypeId: string;
  amount: number;
  receivedDate: string;
  status: 'received' | 'pending' | 'overdue';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  loan?: {
    id: string;
    loanNumber: string;
    borrowerId: string;
  };
  borrower?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface FeeType {
  id: string;
  name: string;
  description?: string;
  feeType: 'percentage' | 'fixed';
  amount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServicingStats {
  totalIncome: number;
  totalFees: number;
  activeLoans: number;
  pendingIncome: number;
  overdueIncome: number;
  efficiencyRate: number;
  period: string;
}

export interface CreateServicingIncomeInput {
  loanId: string;
  feeTypeId: string;
  amount: number;
  receivedDate: string;
  status?: 'received' | 'pending' | 'overdue';
  notes?: string;
}

export interface CreateFeeTypeInput {
  name: string;
  description?: string;
  feeType: 'percentage' | 'fixed';
  amount: number;
  isActive?: boolean;
}

// Query keys
const queryKeys = {
  servicingIncome: ['servicing-income'] as const,
  servicingIncomeList: (params: any) => [...queryKeys.servicingIncome, 'list', params] as const,
  servicingIncomeDetail: (id: string) => [...queryKeys.servicingIncome, 'detail', id] as const,
  feeTypes: ['fee-types'] as const,
  feeTypesList: (params: any) => [...queryKeys.feeTypes, 'list', params] as const,
  feeTypeDetail: (id: string) => [...queryKeys.feeTypes, 'detail', id] as const,
  servicingStats: (period: string) => ['servicing-stats', period] as const,
};

// Servicing Income Hooks
export function useServicingIncome(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: queryKeys.servicingIncomeList(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.set('search', params.search);
      if (params?.status) searchParams.set('status', params.status);
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());

      const response = await fetch(`/api/servicing?${searchParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch servicing income');
      }
      return response.json();
    },
  });
}

export function useServicingIncomeDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.servicingIncomeDetail(id),
    queryFn: async () => {
      const response = await fetch(`/api/servicing/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch servicing income detail');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateServicingIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateServicingIncomeInput) => {
      const response = await fetch('/api/servicing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create servicing income record');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.servicingIncome });
    },
  });
}

export function useUpdateServicingIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateServicingIncomeInput> }) => {
      const response = await fetch(`/api/servicing/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update servicing income record');
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.servicingIncome });
      queryClient.invalidateQueries({ queryKey: queryKeys.servicingIncomeDetail(id) });
    },
  });
}

export function useDeleteServicingIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/servicing/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete servicing income record');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.servicingIncome });
    },
  });
}

// Fee Types Hooks
export function useFeeTypes(params?: {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: queryKeys.feeTypesList(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.set('search', params.search);
      if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString());
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());

      const response = await fetch(`/api/fee-types?${searchParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch fee types');
      }
      return response.json();
    },
  });
}

export function useFeeTypeDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.feeTypeDetail(id),
    queryFn: async () => {
      const response = await fetch(`/api/fee-types/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch fee type detail');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateFeeType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFeeTypeInput) => {
      const response = await fetch('/api/fee-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create fee type');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feeTypes });
    },
  });
}

export function useUpdateFeeType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateFeeTypeInput> }) => {
      const response = await fetch(`/api/fee-types/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update fee type');
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feeTypes });
      queryClient.invalidateQueries({ queryKey: queryKeys.feeTypeDetail(id) });
    },
  });
}

export function useDeleteFeeType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/fee-types/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete fee type');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feeTypes });
    },
  });
}

// Servicing Stats Hook
export function useServicingStats(period: string = 'month') {
  return useQuery({
    queryKey: queryKeys.servicingStats(period),
    queryFn: async () => {
      const response = await fetch(`/api/servicing/stats?period=${period}`);
      if (!response.ok) {
        throw new Error('Failed to fetch servicing stats');
      }
      return response.json() as Promise<ServicingStats>;
    },
  });
}
