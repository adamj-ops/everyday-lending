import { useQuery } from '@tanstack/react-query';

export interface DashboardStats {
  totalLoanValue: number;
  activeLoans: number;
  totalBorrowers: number;
  totalProperties: number;
  monthlyPayments: number;
  overduePayments: number;
  pendingDraws: number;
  completedDraws: number;
}

export interface RecentLoan {
  id: number;
  loanNumber: string;
  borrower: {
    firstName: string;
    lastName: string;
  } | null;
  property: {
    address: string;
  } | null;
  loanAmount: string;
  status: string;
}

/**
 * Fetch dashboard KPI statistics
 */
export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch all required data in parallel
      const [loansRes, borrowersRes, propertiesRes] = await Promise.all([
        fetch('/api/loans'),
        fetch('/api/borrowers'),
        fetch('/api/properties'),
      ]);

      if (!loansRes.ok || !borrowersRes.ok || !propertiesRes.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const loans = await loansRes.json();
      const borrowers = await borrowersRes.json();
      const properties = await propertiesRes.json();

      // Calculate total loan value (sum of current balances for active loans)
      const totalLoanValue = loans
        .filter((loan: any) => loan.status === 'active')
        .reduce((sum: number, loan: any) => sum + Number.parseFloat(loan.currentBalance || '0'), 0);

      // Count active loans
      const activeLoans = loans.filter((loan: any) => loan.status === 'active').length;

      // Calculate expected monthly payments for active loans
      const monthlyPayments = loans
        .filter((loan: any) => loan.status === 'active')
        .reduce((sum: number, loan: any) => sum + Number.parseFloat(loan.monthlyPayment || '0'), 0);

      // Count overdue payments (where nextPaymentDate is in the past)
      const today = new Date();
      const overduePayments = loans.filter((loan: any) => {
        if (!loan.nextPaymentDate || loan.status !== 'active') {
          return false;
        }
        return new Date(loan.nextPaymentDate) < today;
      }).length;

      return {
        totalLoanValue: Math.round(totalLoanValue),
        activeLoans,
        totalBorrowers: borrowers.length,
        totalProperties: properties.length,
        monthlyPayments: Math.round(monthlyPayments),
        overduePayments,
        pendingDraws: 0, // Placeholder for Phase 3
        completedDraws: 0, // Placeholder for Phase 3
      };
    },
    refetchInterval: 60000, // Refetch every minute
  });
}

/**
 * Fetch recent loans
 */
export function useRecentLoans(limit: number = 5) {
  return useQuery<RecentLoan[]>({
    queryKey: ['recent-loans', limit],
    queryFn: async () => {
      const response = await fetch('/api/loans');

      if (!response.ok) {
        throw new Error('Failed to fetch recent loans');
      }

      const loans = await response.json();

      // Return the most recent loans (already sorted by createdAt desc)
      return loans.slice(0, limit);
    },
  });
}

