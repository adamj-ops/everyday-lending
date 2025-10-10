import { z } from 'zod';

/**
 * Zod validation schema for borrower data
 */
export const borrowerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name must be less than 100 characters'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name must be less than 100 characters'),
  email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().max(100, 'City must be less than 100 characters').optional().nullable(),
  state: z.string().max(50, 'State must be less than 50 characters').optional().nullable(),
  zipCode: z.string().max(20, 'Zip code must be less than 20 characters').optional().nullable(),
  ssn: z.string().max(11, 'SSN must be less than 11 characters').optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  creditScore: z.coerce.number().int().min(300, 'Credit score must be at least 300').max(850, 'Credit score cannot exceed 850').optional().nullable(),
  employmentStatus: z.string().max(50, 'Employment status must be less than 50 characters').optional().nullable(),
  annualIncome: z.coerce.number().min(0, 'Annual income must be positive').optional().nullable(),
});

export type BorrowerFormData = z.infer<typeof borrowerSchema>;

/**
 * Partial schema for updates (all fields optional)
 */
export const borrowerUpdateSchema = borrowerSchema.partial();

export type BorrowerUpdateData = z.infer<typeof borrowerUpdateSchema>;

