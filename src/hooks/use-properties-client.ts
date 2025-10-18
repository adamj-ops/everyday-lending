'use client';

import type { Property, PropertyCreateData, PropertyUpdateData } from '@/services/frontend/PropertyService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FrontendPropertyService,

} from '@/services/frontend/PropertyService';

// Re-export types for backward compatibility
export type { Property, PropertyCreateData, PropertyUpdateData };

// Query keys
const QUERY_KEYS = {
  properties: ['properties'] as const,
  property: (id: number) => ['property', id] as const,
};

/**
 * Fetch all properties with optional search
 */
export function useProperties(searchQuery: string = '') {
  return useQuery<Property[]>({
    queryKey: [...QUERY_KEYS.properties, searchQuery],
    queryFn: () => FrontendPropertyService.getProperties(searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch a single property by ID
 */
export function useProperty(id: number) {
  return useQuery<Property | null>({
    queryKey: QUERY_KEYS.property(id),
    queryFn: () => FrontendPropertyService.getPropertyById(id),
    enabled: id > 0,
  });
}

/**
 * Create property mutation
 */
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PropertyCreateData) => FrontendPropertyService.createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.properties });
    },
  });
}

/**
 * Update property mutation
 */
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PropertyUpdateData }) =>
      FrontendPropertyService.updateProperty(id, data),
    onSuccess: (updatedProperty, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.properties });
      queryClient.setQueryData(QUERY_KEYS.property(id), updatedProperty);
    },
  });
}

/**
 * Delete property mutation
 */
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FrontendPropertyService.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.properties });
    },
  });
}
