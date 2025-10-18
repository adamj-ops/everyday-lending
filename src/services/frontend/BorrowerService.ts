/**
 * Frontend Borrower Service
 *
 * Client-side service layer for borrower operations.
 * Provides a clean interface between React hooks and backend APIs.
 */

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

class BorrowerServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'BorrowerServiceError';
  }
}

export class FrontendBorrowerService {
  private static handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof Response) {
      throw new BorrowerServiceError(
        `${defaultMessage}: ${error.statusText}`,
        error.status,
      );
    }

    if (error instanceof Error) {
      throw new BorrowerServiceError(error.message);
    }

    throw new BorrowerServiceError(defaultMessage);
  }

  /**
   * Fetch all borrowers with optional search query
   */
  static async getBorrowers(searchQuery?: string): Promise<BorrowerWithLoans[]> {
    try {
      const url = searchQuery
        ? `/api/borrowers?search=${encodeURIComponent(searchQuery)}`
        : '/api/borrowers';

      const response = await fetch(url);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch borrowers');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch borrowers');
    }
  }

  /**
   * Fetch single borrower by ID
   */
  static async getBorrowerById(id: number): Promise<BorrowerWithLoans | null> {
    try {
      const response = await fetch(`/api/borrowers/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        this.handleError(response, 'Failed to fetch borrower');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch borrower');
    }
  }

  /**
   * Create a new borrower
   */
  static async createBorrower(data: BorrowerCreateData): Promise<BorrowerWithLoans> {
    try {
      const response = await fetch('/api/borrowers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to create borrower');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to create borrower');
    }
  }

  /**
   * Update an existing borrower
   */
  static async updateBorrower(id: number, data: BorrowerUpdateData): Promise<BorrowerWithLoans> {
    try {
      const response = await fetch(`/api/borrowers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to update borrower');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to update borrower');
    }
  }

  /**
   * Delete a borrower
   */
  static async deleteBorrower(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/borrowers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to delete borrower');
      }
    } catch (error) {
      this.handleError(error, 'Failed to delete borrower');
    }
  }
}
