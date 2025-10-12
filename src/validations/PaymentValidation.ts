import { z } from 'zod';

export const paymentSchema = z.object({
  loanNumber: z.string().min(1, 'Loan number is required'),
  amount: z.string().min(1, 'Amount is required'), // decimal as string
  paymentDate: z.string().min(1, 'Payment date is required'),
  paymentMethod: z.enum(['ACH', 'Wire', 'Check', 'Card']),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
});

export const paymentUpdateSchema = z.object({
  amount: z.string().min(1, 'Amount is required').optional(), // decimal as string
  paymentDate: z.string().min(1, 'Payment date is required').optional(),
  paymentMethod: z.enum(['ACH', 'Wire', 'Check', 'Card']).optional(),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
});

export const paymentProcessSchema = z.object({
  paymentId: z.number().positive('Payment ID is required'),
  processType: z.enum(['process', 'retry', 'refund']),
  amount: z.string().min(1, 'Amount is required').optional(), // decimal as string
  reason: z.string().optional(),
});

export const batchPaymentSchema = z.object({
  paymentIds: z.array(z.number().positive()).min(1, 'At least one payment ID is required'),
  action: z.enum(['process', 'retry', 'refund']),
  reason: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
export type PaymentUpdateData = z.infer<typeof paymentUpdateSchema>;
export type PaymentProcessData = z.infer<typeof paymentProcessSchema>;
export type BatchPaymentData = z.infer<typeof batchPaymentSchema>;
