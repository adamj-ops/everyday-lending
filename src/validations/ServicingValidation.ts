import { z } from 'zod';

export const servicingIncomeSchema = z.object({
  loanId: z.string().min(1, 'Loan ID is required'),
  feeTypeId: z.string().min(1, 'Fee type ID is required'),
  amount: z.number().positive('Amount must be positive'),
  receivedDate: z.string().datetime('Invalid date format'),
  status: z.enum(['received', 'pending', 'overdue']).default('pending'),
  notes: z.string().optional(),
});

export const feeTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  feeType: z.enum(['percentage', 'fixed']),
  amount: z.number().positive('Amount must be positive'),
  isActive: z.boolean().default(true),
});

export const updateServicingIncomeSchema = servicingIncomeSchema.partial();

export const updateFeeTypeSchema = feeTypeSchema.partial();

export type ServicingIncomeInput = z.infer<typeof servicingIncomeSchema>;
export type FeeTypeInput = z.infer<typeof feeTypeSchema>;
export type UpdateServicingIncomeInput = z.infer<typeof updateServicingIncomeSchema>;
export type UpdateFeeTypeInput = z.infer<typeof updateFeeTypeSchema>;
