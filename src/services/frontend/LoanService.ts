/**
 * Frontend Loan Service
 *
 * Client-side service layer for loan operations.
 * Provides a clean interface between React hooks and backend APIs.
 * Handles error transformation and request/response formatting.
 */

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

export type LoanCreateData = {
  borrowerId: number;
  propertyId: number;
  loanAmount: string;
  interestRate: string;
  termMonths: number;
  monthlyPayment: string;
  originationDate: Date;
  maturityDate: Date;
  notes?: string;
};

class LoanServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'LoanServiceError';
  }
}

export class FrontendLoanService {
  private static handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof Response) {
      throw new LoanServiceError(
        `${defaultMessage}: ${error.statusText}`,
        error.status,
      );
    }

    if (error instanceof Error) {
      throw new LoanServiceError(error.message);
    }

    throw new LoanServiceError(defaultMessage);
  }

  /**
   * Fetch all loans with optional search query
   */
  static async getLoans(searchQuery?: string): Promise<LoanWithDetails[]> {
    try {
      const url = searchQuery
        ? `/api/loans?search=${encodeURIComponent(searchQuery)}`
        : '/api/loans';

      const response = await fetch(url);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch loans');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch loans');
    }
  }

  /**
   * Fetch single loan by ID
   */
  static async getLoanById(id: number): Promise<LoanWithDetails | null> {
    try {
      const response = await fetch(`/api/loans/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        this.handleError(response, 'Failed to fetch loan');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch loan');
    }
  }

  /**
   * Create a new loan
   */
  static async createLoan(data: LoanCreateData): Promise<LoanWithDetails> {
    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to create loan');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to create loan');
    }
  }

  /**
   * Update an existing loan
   */
  static async updateLoan(id: number, data: LoanUpdateData): Promise<LoanWithDetails> {
    try {
      const response = await fetch(`/api/loans/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to update loan');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to update loan');
    }
  }

  /**
   * Delete a loan
   */
  static async deleteLoan(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/loans/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to delete loan');
      }
    } catch (error) {
      this.handleError(error, 'Failed to delete loan');
    }
  }
}
