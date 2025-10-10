import { z } from 'zod';

/**
 * Zod validation schema for property data
 */
export const propertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
  state: z.string().min(1, 'State is required').max(50, 'State must be less than 50 characters'),
  zipCode: z.string().min(1, 'Zip code is required').max(20, 'Zip code must be less than 20 characters'),
  propertyType: z.string().optional().nullable(),
  bedrooms: z.coerce.number().int().min(0, 'Bedrooms must be positive').optional().nullable(),
  bathrooms: z.coerce.number().min(0, 'Bathrooms must be positive').optional().nullable(),
  squareFeet: z.coerce.number().int().min(0, 'Square feet must be positive').optional().nullable(),
  lotSize: z.coerce.number().min(0, 'Lot size must be positive').optional().nullable(),
  yearBuilt: z.coerce.number().int().min(1800, 'Year built must be after 1800').max(new Date().getFullYear() + 1, 'Year built cannot be in the future').optional().nullable(),
  estimatedValue: z.coerce.number().min(0, 'Estimated value must be positive').optional().nullable(),
  purchasePrice: z.coerce.number().min(0, 'Purchase price must be positive').optional().nullable(),
  rehabBudget: z.coerce.number().min(0, 'Rehab budget must be positive').optional().nullable(),
  afterRepairValue: z.coerce.number().min(0, 'After repair value must be positive').optional().nullable(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

/**
 * Partial schema for updates (all fields optional except ID)
 */
export const propertyUpdateSchema = propertySchema.partial();

export type PropertyUpdateData = z.infer<typeof propertyUpdateSchema>;

