'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { count, desc, eq, ilike, or, sum } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { lenderParticipations, lenders, loans } from '@/models/Schema';

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
      let query = db
        .select({
          id: lenders.id,
          name: lenders.name,
          email: lenders.email,
          phone: lenders.phone,
          address: lenders.address,
          city: lenders.city,
          state: lenders.state,
          zipCode: lenders.zipCode,
          taxId: lenders.taxId,
          contactPerson: lenders.contactPerson,
          investmentCapacity: lenders.investmentCapacity,
          isActive: lenders.isActive,
          createdAt: lenders.createdAt,
          updatedAt: lenders.updatedAt,
          activeParticipationsCount: count(lenderParticipations.id),
          totalCapitalCommitted: sum(lenderParticipations.participationAmount),
        })
        .from(lenders)
        .leftJoin(lenderParticipations, eq(lenders.id, lenderParticipations.lenderId))
        .groupBy(lenders.id)
        .orderBy(desc(lenders.createdAt));

      // Add search filter if provided
      if (searchQuery) {
        query = query.where(
          or(
            ilike(lenders.name, `%${searchQuery}%`),
            ilike(lenders.email, `%${searchQuery}%`),
          ),
        ) as typeof query;
      }

      const results = await query;

      // Fetch participations for each lender
      const lendersWithParticipations = await Promise.all(
        results.map(async (lender) => {
          const lenderParticipationsData = await db
            .select({
              id: lenderParticipations.id,
              loanId: lenderParticipations.loanId,
              participationAmount: lenderParticipations.participationAmount,
              participationPercentage: lenderParticipations.participationPercentage,
              loan: {
                loanNumber: loans.loanNumber,
                status: loans.status,
              },
            })
            .from(lenderParticipations)
            .leftJoin(loans, eq(lenderParticipations.loanId, loans.id))
            .where(eq(lenderParticipations.lenderId, lender.id));

          return {
            ...lender,
            participations: lenderParticipationsData,
            totalCapitalCommitted: lender.totalCapitalCommitted || '0',
          };
        }),
      );

      return lendersWithParticipations;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Fetch single lender by ID with participations
export function useLender(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.lender(id),
    queryFn: async (): Promise<LenderWithParticipations | null> => {
      const lender = await db
        .select()
        .from(lenders)
        .where(eq(lenders.id, id))
        .limit(1);

      if (!lender[0]) {
        return null;
      }

      const lenderParticipationsData = await db
        .select({
          id: lenderParticipations.id,
          loanId: lenderParticipations.loanId,
          participationAmount: lenderParticipations.participationAmount,
          participationPercentage: lenderParticipations.participationPercentage,
          loan: {
            loanNumber: loans.loanNumber,
            status: loans.status,
          },
        })
        .from(lenderParticipations)
        .leftJoin(loans, eq(lenderParticipations.loanId, loans.id))
        .where(eq(lenderParticipations.lenderId, id));

      const totalCapitalCommitted = lenderParticipationsData.reduce(
        (sum, p) => sum + Number.parseFloat(p.participationAmount),
        0,
      );

      return {
        ...lender[0],
        participations: lenderParticipationsData,
        activeParticipationsCount: lenderParticipationsData.length,
        totalCapitalCommitted: totalCapitalCommitted.toString(),
      };
    },
    enabled: !!id,
  });
}

// Create lender mutation
export function useCreateLender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LenderCreateData) => {
      const result = await db
        .insert(lenders)
        .values({
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return result[0];
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
      const result = await db
        .update(lenders)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(lenders.id, id))
        .returning();

      return result[0];
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
      const result = await db
        .delete(lenders)
        .where(eq(lenders.id, id))
        .returning();

      return result[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lenders });
    },
  });
}
