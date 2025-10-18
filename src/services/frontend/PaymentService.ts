/**
 * Frontend Payment Service
 *
 * Client-side service layer for payment operations.
 * Provides a clean interface between React hooks and backend APIs.
 */

export type Payment = {
  id: number;
  loanId: number;
  paymentDate: string;
  amount: number;
  principalAmount: number;
  interestAmount: number;
  feesAmount: number;
  lateFeeAmount: number;
  paymentType: string;
  paymentMethod: string;
  referenceNumber?: string;
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

export type PaymentStats = {
  totalPayments: number;
  totalCount: number;
  pendingPayments: number;
  overduePayments: number;
  successRate: number;
  month: number;
  year: number;
};

export type CreatePaymentData = {
  loanNumber: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'ACH' | 'Wire' | 'Check' | 'Card';
  referenceNumber?: string;
  notes?: string;
};

export type UpdatePaymentData = {
  amount?: number;
  paymentDate?: string;
  paymentMethod?: 'ACH' | 'Wire' | 'Check' | 'Card';
  referenceNumber?: string;
  notes?: string;
};

class PaymentServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'PaymentServiceError';
  }
}

export class FrontendPaymentService {
  private static handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof Response) {
      throw new PaymentServiceError(
        `${defaultMessage}: ${error.statusText}`,
        error.status,
      );
    }

    if (error instanceof Error) {
      throw new PaymentServiceError(error.message);
    }

    throw new PaymentServiceError(defaultMessage);
  }

  /**
   * Fetch payments with filters and pagination
   */
  static async getPayments(options?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Payment[]; total: number }> {
    try {
      const params = new URLSearchParams({
        page: (options?.page || 1).toString(),
        limit: (options?.limit || 10).toString(),
      });

      if (options?.search) {
        params.append('search', options.search);
      }
      if (options?.status) {
        params.append('status', options.status);
      }

      const response = await fetch(`/api/payments?${params}`);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch payments');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch payments');
    }
  }

  /**
   * Fetch single payment by ID
   */
  static async getPaymentById(id: number): Promise<Payment> {
    try {
      const response = await fetch(`/api/payments/${id}`);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch payment');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch payment');
    }
  }

  /**
   * Get payment statistics
   */
  static async getPaymentStats(options?: {
    month?: number;
    year?: number;
  }): Promise<PaymentStats> {
    try {
      const params = new URLSearchParams();
      if (options?.month) {
        params.append('month', options.month.toString());
      }
      if (options?.year) {
        params.append('year', options.year.toString());
      }

      const url = params.toString() ? `/api/payments/stats?${params}` : '/api/payments/stats';
      const response = await fetch(url);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch payment stats');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch payment stats');
    }
  }

  /**
   * Create a new payment
   */
  static async createPayment(data: CreatePaymentData): Promise<Payment> {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new PaymentServiceError(
          error.error || 'Failed to create payment',
          response.status,
        );
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to create payment');
    }
  }

  /**
   * Update an existing payment
   */
  static async updatePayment(id: number, data: UpdatePaymentData): Promise<Payment> {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new PaymentServiceError(
          error.error || 'Failed to update payment',
          response.status,
        );
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to update payment');
    }
  }

  /**
   * Delete a payment
   */
  static async deletePayment(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new PaymentServiceError(
          error.error || 'Failed to delete payment',
          response.status,
        );
      }
    } catch (error) {
      this.handleError(error, 'Failed to delete payment');
    }
  }
}
