import { z } from 'zod';

export const drawSchema = z.object({
  loanId: z.number().positive('Loan ID is required'),
  drawNumber: z.number().positive('Draw number must be positive'),
  requestedAmount: z.string().min(1, 'Requested amount is required'), // decimal as string
  description: z.string().min(1, 'Description is required'),
  contractorName: z.string().optional(),
  workCompleted: z.string().optional(),
});

export const drawUpdateSchema = z.object({
  requestedAmount: z.string().optional(), // decimal as string
  approvedAmount: z.string().optional(), // decimal as string
  description: z.string().min(1, 'Description is required').optional(),
  contractorName: z.string().optional(),
  workCompleted: z.string().optional(),
  notes: z.string().optional(),
});

export const drawApprovalSchema = z.object({
  approvedAmount: z.string().min(1, 'Approved amount is required'), // decimal as string
  notes: z.string().optional(),
});

export const drawDisbursementSchema = z.object({
  disbursementDate: z.string().min(1, 'Disbursement date is required'),
  notes: z.string().optional(),
});

export type DrawFormData = z.infer<typeof drawSchema>;
export type DrawUpdateData = z.infer<typeof drawUpdateSchema>;
export type DrawApprovalData = z.infer<typeof drawApprovalSchema>;
export type DrawDisbursementData = z.infer<typeof drawDisbursementSchema>;
