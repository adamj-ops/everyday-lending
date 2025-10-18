'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/toast';

export type Draw = {
  id: number;
  loanId: number;
  drawNumber: number;
  requestedAmount: number;
  approvedAmount?: number;
  status: 'pending' | 'approved' | 'disbursed' | 'rejected';
  requestDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  description?: string;
  contractorName?: string;
  workCompleted?: string;
  photos?: string;
  receipts?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  loan: {
    id: number;
    loanNumber: string;
    loanAmount: number;
    currentBalance: number;
    status: string;
  };
  borrower: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type DrawStats = {
  totalDraws: number;
  pendingDraws: number;
  approvedDraws: number;
  completedDraws: number;
  month: number;
  year: number;
};

export type CreateDrawData = {
  loanNumber: string;
  drawNumber: number;
  requestedAmount: number;
  description: string;
  contractorName?: string;
  workCompleted?: string;
};

export type UpdateDrawData = {
  requestedAmount?: number;
  approvedAmount?: number;
  description?: string;
  contractorName?: string;
  workCompleted?: string;
  notes?: string;
};

export type ApproveDrawData = {
  approvedAmount: number;
  notes?: string;
};

export type DisburseDrawData = {
  disbursementDate: string;
  notes?: string;
};

export function useDraws(search?: string, status?: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['draws', { search, status, page, limit }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) {
        params.append('search', search);
      }
      if (status) {
        params.append('status', status);
      }

      const response = await fetch(`/api/draws?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch draws');
      }
      return response.json();
    },
  });
}

export function useDraw(id: number) {
  return useQuery({
    queryKey: ['draw', id],
    queryFn: async () => {
      const response = await fetch(`/api/draws/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch draw');
      }
      return response.json() as Promise<Draw>;
    },
    enabled: !!id,
  });
}

export function useDrawStats(month?: number, year?: number) {
  return useQuery({
    queryKey: ['draw-stats', { month, year }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (month) {
        params.append('month', month.toString());
      }
      if (year) {
        params.append('year', year.toString());
      }

      const response = await fetch(`/api/draws/stats?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch draw stats');
      }
      return response.json() as Promise<DrawStats>;
    },
  });
}

export function useCreateDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDrawData) => {
      const response = await fetch('/api/draws', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create draw');
      }

      return response.json();
    },
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

export function useUpdateDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateDrawData }) => {
      const response = await fetch(`/api/draws/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update draw');
      }

      return response.json();
    },
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

export function useApproveDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ApproveDrawData }) => {
      const response = await fetch(`/api/draws/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to approve draw');
      }

      return response.json();
    },
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

export function useDisburseDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: DisburseDrawData }) => {
      const response = await fetch(`/api/draws/${id}/disburse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to disburse draw');
      }

      return response.json();
    },
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

export function useDeleteDraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/draws/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete draw');
      }

      return response.json();
    },
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
