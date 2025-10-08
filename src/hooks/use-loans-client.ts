'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Types
export type LoanWithDetails = {
  id: number;
  loanNumber: string;
  loanAmount: string;
  interestRate: string;
  termMonths: number;
  monthlyPayment: string;
  originationDate: Date;
  maturityDate: Date;
  status: 'active' | 'paid_off' | 'defaulted' | 'foreclosed' | 'cancelled';
  currentBalance: string;
  principalPaid: string | null;
  interestPaid: string | null;
  feesPaid: string | null;
  lateFeesPaid: string | null;
  lastPaymentDate: Date | null;
  nextPaymentDate: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  borrower: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
  } | null;
  property: {
    id: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  } | null;
};

export type LoanUpdateData = {
  status?: 'active' | 'paid_off' | 'defaulted' | 'foreclosed' | 'cancelled';
  interestRate?: string;
  termMonths?: number;
  monthlyPayment?: string;
  maturityDate?: Date;
  notes?: string | null;
};

// Query keys
const QUERY_KEYS = {
  loans: ['loans'] as const,
  loan: (id: number) => ['loans', id] as const,
};

// Fetch all loans with borrower and property details
export function useLoans(searchQuery?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.loans, searchQuery],
    queryFn: async (): Promise<LoanWithDetails[]> => {
      const url = searchQuery
        ? `/api/loans?search=${encodeURIComponent(searchQuery)}`
        : '/api/loans';

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch loans');
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Fetch single loan by ID
export function useLoan(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.loan(id),
    queryFn: async (): Promise<LoanWithDetails | null> => {
      const response = await fetch(`/api/loans/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch loan');
      }

      return response.json();
    },
    enabled: !!id,
  });
}

// Update loan mutation
export function useUpdateLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: LoanUpdateData }) => {
      const response = await fetch(`/api/loans/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update loan');
      }

      return response.json();
    },
    onSuccess: (updatedLoan, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loans });
      queryClient.setQueryData(QUERY_KEYS.loan(id), updatedLoan);
    },
  });
}
