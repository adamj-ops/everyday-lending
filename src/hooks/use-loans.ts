'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { desc, eq, ilike, or } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { borrowers, loans, properties } from '@/models/Schema';

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
      let query = db
        .select({
          // Loan fields
          id: loans.id,
          loanNumber: loans.loanNumber,
          loanAmount: loans.loanAmount,
          interestRate: loans.interestRate,
          termMonths: loans.termMonths,
          monthlyPayment: loans.monthlyPayment,
          originationDate: loans.originationDate,
          maturityDate: loans.maturityDate,
          status: loans.status,
          currentBalance: loans.currentBalance,
          principalPaid: loans.principalPaid,
          interestPaid: loans.interestPaid,
          feesPaid: loans.feesPaid,
          lateFeesPaid: loans.lateFeesPaid,
          lastPaymentDate: loans.lastPaymentDate,
          nextPaymentDate: loans.nextPaymentDate,
          notes: loans.notes,
          createdAt: loans.createdAt,
          updatedAt: loans.updatedAt,
          // Borrower fields
          borrower: {
            id: borrowers.id,
            firstName: borrowers.firstName,
            lastName: borrowers.lastName,
            email: borrowers.email,
            phone: borrowers.phone,
          },
          // Property fields
          property: {
            id: properties.id,
            address: properties.address,
            city: properties.city,
            state: properties.state,
            zipCode: properties.zipCode,
          },
        })
        .from(loans)
        .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
        .leftJoin(properties, eq(loans.propertyId, properties.id))
        .orderBy(desc(loans.createdAt));

      // Add search filter if provided
      if (searchQuery) {
        query = query.where(
          or(
            ilike(loans.loanNumber, `%${searchQuery}%`),
            ilike(borrowers.firstName, `%${searchQuery}%`),
            ilike(borrowers.lastName, `%${searchQuery}%`),
            ilike(properties.address, `%${searchQuery}%`),
          ),
        ) as typeof query;
      }

      const results = await query;
      return results;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Fetch single loan by ID
export function useLoan(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.loan(id),
    queryFn: async (): Promise<LoanWithDetails | null> => {
      const result = await db
        .select({
          // Loan fields
          id: loans.id,
          loanNumber: loans.loanNumber,
          loanAmount: loans.loanAmount,
          interestRate: loans.interestRate,
          termMonths: loans.termMonths,
          monthlyPayment: loans.monthlyPayment,
          originationDate: loans.originationDate,
          maturityDate: loans.maturityDate,
          status: loans.status,
          currentBalance: loans.currentBalance,
          principalPaid: loans.principalPaid,
          interestPaid: loans.interestPaid,
          feesPaid: loans.feesPaid,
          lateFeesPaid: loans.lateFeesPaid,
          lastPaymentDate: loans.lastPaymentDate,
          nextPaymentDate: loans.nextPaymentDate,
          notes: loans.notes,
          createdAt: loans.createdAt,
          updatedAt: loans.updatedAt,
          // Borrower fields
          borrower: {
            id: borrowers.id,
            firstName: borrowers.firstName,
            lastName: borrowers.lastName,
            email: borrowers.email,
            phone: borrowers.phone,
          },
          // Property fields
          property: {
            id: properties.id,
            address: properties.address,
            city: properties.city,
            state: properties.state,
            zipCode: properties.zipCode,
          },
        })
        .from(loans)
        .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
        .leftJoin(properties, eq(loans.propertyId, properties.id))
        .where(eq(loans.id, id))
        .limit(1);

      return result[0] || null;
    },
    enabled: !!id,
  });
}

// Update loan mutation
export function useUpdateLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: LoanUpdateData }) => {
      const result = await db
        .update(loans)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(loans.id, id))
        .returning();

      return result[0];
    },
    onSuccess: (updatedLoan, { id }) => {
      // Invalidate and refetch loans list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loans });

      // Update the specific loan in cache
      queryClient.setQueryData(QUERY_KEYS.loan(id), updatedLoan);
    },
  });
}
