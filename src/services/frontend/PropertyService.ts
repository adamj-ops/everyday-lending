/**
 * Frontend Property Service
 *
 * Client-side service layer for property operations.
 * Provides a clean interface between React hooks and backend APIs.
 */

export type Property = {
  id: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string | null;
  bedrooms: number | null;
  bathrooms: string | null;
  squareFeet: number | null;
  lotSize: string | null;
  yearBuilt: number | null;
  estimatedValue: string | null;
  purchasePrice: string | null;
  rehabBudget: string | null;
  afterRepairValue: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyCreateData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: string;
  squareFeet?: number;
  lotSize?: string;
  yearBuilt?: number;
  estimatedValue?: string;
  purchasePrice?: string;
  rehabBudget?: string;
  afterRepairValue?: string;
};

export type PropertyUpdateData = Partial<PropertyCreateData>;

class PropertyServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'PropertyServiceError';
  }
}

export class FrontendPropertyService {
  private static handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof Response) {
      throw new PropertyServiceError(
        `${defaultMessage}: ${error.statusText}`,
        error.status,
      );
    }

    if (error instanceof Error) {
      throw new PropertyServiceError(error.message);
    }

    throw new PropertyServiceError(defaultMessage);
  }

  /**
   * Fetch all properties with optional search query
   */
  static async getProperties(searchQuery?: string): Promise<Property[]> {
    try {
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const url = params.toString() ? `/api/properties?${params.toString()}` : '/api/properties';
      const response = await fetch(url);

      if (!response.ok) {
        this.handleError(response, 'Failed to fetch properties');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch properties');
    }
  }

  /**
   * Fetch single property by ID
   */
  static async getPropertyById(id: number): Promise<Property | null> {
    try {
      const response = await fetch(`/api/properties/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        this.handleError(response, 'Failed to fetch property');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to fetch property');
    }
  }

  /**
   * Create a new property
   */
  static async createProperty(data: PropertyCreateData): Promise<Property> {
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to create property');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to create property');
    }
  }

  /**
   * Update an existing property
   */
  static async updateProperty(id: number, data: PropertyUpdateData): Promise<Property> {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to update property');
      }

      return response.json();
    } catch (error) {
      this.handleError(error, 'Failed to update property');
    }
  }

  /**
   * Delete a property
   */
  static async deleteProperty(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        this.handleError(response, 'Failed to delete property');
      }
    } catch (error) {
      this.handleError(error, 'Failed to delete property');
    }
  }
}
