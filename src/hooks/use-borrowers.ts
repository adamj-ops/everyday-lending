'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { count, desc, eq, ilike, or } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { borrowers, loans } from '@/models/Schema';

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
      let query = db
        .select({
          id: borrowers.id,
          firstName: borrowers.firstName,
          lastName: borrowers.lastName,
          email: borrowers.email,
          phone: borrowers.phone,
          address: borrowers.address,
          city: borrowers.city,
          state: borrowers.state,
          zipCode: borrowers.zipCode,
          ssn: borrowers.ssn,
          dateOfBirth: borrowers.dateOfBirth,
          creditScore: borrowers.creditScore,
          employmentStatus: borrowers.employmentStatus,
          annualIncome: borrowers.annualIncome,
          createdAt: borrowers.createdAt,
          updatedAt: borrowers.updatedAt,
          activeLoansCount: count(loans.id),
        })
        .from(borrowers)
        .leftJoin(loans, eq(borrowers.id, loans.borrowerId))
        .groupBy(borrowers.id)
        .orderBy(desc(borrowers.createdAt));

      // Add search filter if provided
      if (searchQuery) {
        query = query.where(
          or(
            ilike(borrowers.firstName, `%${searchQuery}%`),
            ilike(borrowers.lastName, `%${searchQuery}%`),
            ilike(borrowers.email, `%${searchQuery}%`),
          ),
        ) as typeof query;
      }

      const results = await query;

      // Fetch loans for each borrower
      const borrowersWithLoans = await Promise.all(
        results.map(async (borrower) => {
          const borrowerLoans = await db
            .select({
              id: loans.id,
              loanNumber: loans.loanNumber,
              loanAmount: loans.loanAmount,
              status: loans.status,
              currentBalance: loans.currentBalance,
            })
            .from(loans)
            .where(eq(loans.borrowerId, borrower.id));

          return {
            ...borrower,
            loans: borrowerLoans,
          };
        }),
      );

      return borrowersWithLoans;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Fetch single borrower by ID with loans
export function useBorrower(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.borrower(id),
    queryFn: async (): Promise<BorrowerWithLoans | null> => {
      const borrower = await db
        .select()
        .from(borrowers)
        .where(eq(borrowers.id, id))
        .limit(1);

      if (!borrower[0]) {
        return null;
      }

      const borrowerLoans = await db
        .select({
          id: loans.id,
          loanNumber: loans.loanNumber,
          loanAmount: loans.loanAmount,
          status: loans.status,
          currentBalance: loans.currentBalance,
        })
        .from(loans)
        .where(eq(loans.borrowerId, id));

      return {
        ...borrower[0],
        loans: borrowerLoans,
        activeLoansCount: borrowerLoans.length,
      };
    },
    enabled: !!id,
  });
}

// Create borrower mutation
export function useCreateBorrower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BorrowerCreateData) => {
      const result = await db
        .insert(borrowers)
        .values({
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return result[0];
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
      const result = await db
        .update(borrowers)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(borrowers.id, id))
        .returning();

      return result[0];
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
      const result = await db
        .delete(borrowers)
        .where(eq(borrowers.id, id))
        .returning();

      return result[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.borrowers });
    },
  });
}
