/**
 * Frontend Draw Service
 *
 * Client-side service layer for draw request operations.
 * Provides a clean interface between React hooks and backend APIs.
 */

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

class DrawServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'DrawServiceError';
  }
}

export class FrontendDrawService {
  private static handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof Response) {
      throw new DrawServiceError(
        `${defaultMessage}: ${error.statusText}`,
        error.status,
      );
    }

    if (error instanceof Error) {
      throw new DrawServiceError(error.message);
    }

    throw new DrawServiceError(defaultMessage);
  }

  /**
   * Fetch draws with filters and pagination
   */
  static async getDraws(options?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Draw[]; total: number }> {
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

      const response = await fetch(`/api/draws?${params}`);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch draws');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch draws');
    }
  }

  /**
   * Fetch single draw by ID
   */
  static async getDrawById(id: number): Promise<Draw> {
    try {
      const response = await fetch(`/api/draws/${id}`);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch draw');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch draw');
    }
  }

  /**
   * Get draw statistics
   */
  static async getDrawStats(options?: {
    month?: number;
    year?: number;
  }): Promise<DrawStats> {
    try {
      const params = new URLSearchParams();
      if (options?.month) {
        params.append('month', options.month.toString());
      }
      if (options?.year) {
        params.append('year', options.year.toString());
      }

      const url = params.toString() ? `/api/draws/stats?${params}` : '/api/draws/stats';
      const response = await fetch(url);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch draw stats');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch draw stats');
    }
  }

  /**
   * Create a new draw request
   */
  static async createDraw(data: CreateDrawData): Promise<Draw> {
    try {
      const response = await fetch('/api/draws', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new DrawServiceError(
          error.error || 'Failed to create draw',
          response.status,
        );
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to create draw');
    }
  }

  /**
   * Update an existing draw
   */
  static async updateDraw(id: number, data: UpdateDrawData): Promise<Draw> {
    try {
      const response = await fetch(`/api/draws/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new DrawServiceError(
          error.error || 'Failed to update draw',
          response.status,
        );
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to update draw');
    }
  }

  /**
   * Approve a draw request
   */
  static async approveDraw(id: number, data: ApproveDrawData): Promise<Draw> {
    try {
      const response = await fetch(`/api/draws/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new DrawServiceError(
          error.error || 'Failed to approve draw',
          response.status,
        );
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to approve draw');
    }
  }

  /**
   * Disburse an approved draw
   */
  static async disburseDraw(id: number, data: DisburseDrawData): Promise<Draw> {
    try {
      const response = await fetch(`/api/draws/${id}/disburse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new DrawServiceError(
          error.error || 'Failed to disburse draw',
          response.status,
        );
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to disburse draw');
    }
  }

  /**
   * Delete a draw
   */
  static async deleteDraw(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/draws/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new DrawServiceError(
          error.error || 'Failed to delete draw',
          response.status,
        );
      }
    } catch (error) {
      this.handleError(error, 'Failed to delete draw');
    }
  }
}
