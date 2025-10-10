import { useQuery } from '@tanstack/react-query';

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

/**
 * Fetch all properties with optional search
 */
export function useProperties(searchQuery: string = '') {
  return useQuery<Property[]>({
    queryKey: ['properties', searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/properties?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      return response.json();
    },
  });
}

/**
 * Fetch a single property by ID
 */
export function useProperty(id: number) {
  return useQuery<Property>({
    queryKey: ['property', id],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch property');
      }

      return response.json();
    },
    enabled: id > 0,
  });
}
