'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Types
export type LenderWithParticipations = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  taxId: string | null;
  contactPerson: string | null;
  investmentCapacity: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  participations: {
    id: number;
    loanId: number;
    participationAmount: string;
    participationPercentage: string;
    loan: {
      loanNumber: string;
      status: 'active' | 'paid_off' | 'defaulted' | 'foreclosed' | 'cancelled';
    } | null;
  }[];
  activeParticipationsCount: number;
  totalCapitalCommitted: string;
};

export type LenderUpdateData = {
  name?: string;
  email?: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  taxId?: string | null;
  contactPerson?: string | null;
  investmentCapacity?: string | null;
  isActive?: boolean;
};

export type LenderCreateData = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  taxId?: string;
  contactPerson?: string;
  investmentCapacity?: string;
  isActive?: boolean;
};

// Query keys
const QUERY_KEYS = {
  lenders: ['lenders'] as const,
  lender: (id: number) => ['lenders', id] as const,
};

// Fetch all lenders with participation counts
export function useLenders(searchQuery?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.lenders, searchQuery],
    queryFn: async (): Promise<LenderWithParticipations[]> => {
      const url = searchQuery
        ? `/api/lenders?search=${encodeURIComponent(searchQuery)}`
        : '/api/lenders';

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch lenders');
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Fetch single lender by ID with participations
export function useLender(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.lender(id),
    queryFn: async (): Promise<LenderWithParticipations | null> => {
      const response = await fetch(`/api/lenders/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch lender');
      }

      return response.json();
    },
    enabled: !!id,
  });
}

// Create lender mutation
export function useCreateLender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LenderCreateData) => {
      const response = await fetch('/api/lenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create lender');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lenders });
    },
  });
}

// Update lender mutation
export function useUpdateLender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: LenderUpdateData }) => {
      const response = await fetch(`/api/lenders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update lender');
      }

      return response.json();
    },
    onSuccess: (updatedLender, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lenders });
      queryClient.setQueryData(QUERY_KEYS.lender(id), updatedLender);
    },
  });
}

// Delete lender mutation
export function useDeleteLender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/lenders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lender');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lenders });
    },
  });
}
