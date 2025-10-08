'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Types
export type BorrowerWithLoans = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  ssn: string | null;
  dateOfBirth: Date | null;
  creditScore: number | null;
  employmentStatus: string | null;
  annualIncome: string | null;
  createdAt: Date;
  updatedAt: Date;
  loans: {
    id: number;
    loanNumber: string;
    loanAmount: string;
    status: 'active' | 'paid_off' | 'defaulted' | 'foreclosed' | 'cancelled';
    currentBalance: string;
  }[];
  activeLoansCount: number;
};

export type BorrowerUpdateData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  ssn?: string | null;
  dateOfBirth?: Date | null;
  creditScore?: number | null;
  employmentStatus?: string | null;
  annualIncome?: string | null;
};

export type BorrowerCreateData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  ssn?: string;
  dateOfBirth?: Date;
  creditScore?: number;
  employmentStatus?: string;
  annualIncome?: string;
};

// Query keys
const QUERY_KEYS = {
  borrowers: ['borrowers'] as const,
  borrower: (id: number) => ['borrowers', id] as const,
};

// Fetch all borrowers with loan counts
export function useBorrowers(searchQuery?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.borrowers, searchQuery],
    queryFn: async (): Promise<BorrowerWithLoans[]> => {
      const url = searchQuery
        ? `/api/borrowers?search=${encodeURIComponent(searchQuery)}`
        : '/api/borrowers';

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch borrowers');
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Fetch single borrower by ID with loans
export function useBorrower(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.borrower(id),
    queryFn: async (): Promise<BorrowerWithLoans | null> => {
      const response = await fetch(`/api/borrowers/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch borrower');
      }

      return response.json();
    },
    enabled: !!id,
  });
}

// Create borrower mutation
export function useCreateBorrower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BorrowerCreateData) => {
      const response = await fetch('/api/borrowers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create borrower');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.borrowers });
    },
  });
}

// Update borrower mutation
export function useUpdateBorrower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BorrowerUpdateData }) => {
      const response = await fetch(`/api/borrowers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update borrower');
      }

      return response.json();
    },
    onSuccess: (updatedBorrower, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.borrowers });
      queryClient.setQueryData(QUERY_KEYS.borrower(id), updatedBorrower);
    },
  });
}

// Delete borrower mutation
export function useDeleteBorrower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/borrowers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete borrower');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.borrowers });
    },
  });
}
