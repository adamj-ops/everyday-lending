import { z } from 'zod';

/**
 * Zod validation schema for loan data
 */
export const loanSchema = z.object({
  loanNumber: z.string().optional(), // Auto-generated if not provided
  borrowerId: z.number().int().min(1, 'Borrower is required'),
  propertyId: z.number().int().min(1, 'Property is required'),
  loanAmount: z.number().min(1, 'Loan amount must be greater than 0'),
  interestRate: z.number().min(0, 'Interest rate must be positive').max(100, 'Interest rate cannot exceed 100%'),
  termMonths: z.number().int().min(1, 'Term must be at least 1 month'),
  monthlyPayment: z.number().optional(), // Can be auto-calculated
  originationDate: z.string().min(1, 'Origination date is required'),
  maturityDate: z.string().optional(), // Can be auto-calculated
  status: z.enum(['active', 'paid_off', 'defaulted', 'foreclosed', 'cancelled']).default('active'),
  currentBalance: z.number().optional(), // Defaults to loan amount
  principalPaid: z.number().optional().default(0),
  interestPaid: z.number().optional().default(0),
  feesPaid: z.number().optional().default(0),
  lateFeesPaid: z.number().optional().default(0),
  lastPaymentDate: z.string().optional().nullable(),
  nextPaymentDate: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type LoanFormData = z.infer<typeof loanSchema>;

/**
 * Partial schema for updates
 */
export const loanUpdateSchema = loanSchema.partial();

export type LoanUpdateData = z.infer<typeof loanUpdateSchema>;

/**
 * Generate a loan number in the format: LN-YYYYMMDD-XXXX
 * where XXXX is a random 4-digit number
 */
export function generateLoanNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `LN-${year}${month}${day}-${random}`;
}
