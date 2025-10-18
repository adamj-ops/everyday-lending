/**
 * Frontend Lender Service
 *
 * Client-side service layer for lender operations.
 * Provides a clean interface between React hooks and backend APIs.
 */

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

class LenderServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'LenderServiceError';
  }
}

export class FrontendLenderService {
  private static handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof Response) {
      throw new LenderServiceError(
        `${defaultMessage}: ${error.statusText}`,
        error.status,
      );
    }

    if (error instanceof Error) {
      throw new LenderServiceError(error.message);
    }

    throw new LenderServiceError(defaultMessage);
  }

  /**
   * Fetch all lenders with optional search query
   */
  static async getLenders(searchQuery?: string): Promise<LenderWithParticipations[]> {
    try {
      const url = searchQuery
        ? `/api/lenders?search=${encodeURIComponent(searchQuery)}`
        : '/api/lenders';

      const response = await fetch(url);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch lenders');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch lenders');
    }
  }

  /**
   * Fetch single lender by ID
   */
  static async getLenderById(id: number): Promise<LenderWithParticipations | null> {
    try {
      const response = await fetch(`/api/lenders/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        this.handleError(response, 'Failed to fetch lender');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch lender');
    }
  }

  /**
   * Create a new lender
   */
  static async createLender(data: LenderCreateData): Promise<LenderWithParticipations> {
    try {
      const response = await fetch('/api/lenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to create lender');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to create lender');
    }
  }

  /**
   * Update an existing lender
   */
  static async updateLender(id: number, data: LenderUpdateData): Promise<LenderWithParticipations> {
    try {
      const response = await fetch(`/api/lenders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to update lender');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to update lender');
    }
  }

  /**
   * Delete a lender
   */
  static async deleteLender(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/lenders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to delete lender');
      }
    } catch (error) {
      this.handleError(error, 'Failed to delete lender');
    }
  }
}
