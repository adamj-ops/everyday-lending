/**
 * Loan Application Validation Schemas
 *
 * Zod schemas for validating loan application form data.
 */

import { z } from 'zod';

/**
 * Borrower step validation
 */
export const borrowerStepSchema = z.object({
  borrowerId: z.number().optional(),
  isNewBorrower: z.boolean(),
  // New borrower fields
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  ssn: z.string().optional(),
  dateOfBirth: z.date().optional(),
  creditScore: z.number().min(300).max(850).optional(),
  annualIncome: z.string().optional(),
}).refine(
  data => data.borrowerId || (data.firstName && data.lastName && data.email),
  {
    message: 'Either select existing borrower or provide borrower details',
    path: ['borrowerId'],
  },
);

/**
 * Property step validation
 */
export const propertyStepSchema = z.object({
  propertyId: z.number().optional(),
  isNewProperty: z.boolean(),
  // New property fields
  address: z.string().min(1, 'Address is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
  state: z.string().min(2, 'State is required').max(2).optional(),
  zipCode: z.string().min(5, 'ZIP code is required').optional(),
  propertyType: z.enum(['single-family', 'multi-family', 'commercial', 'land']).optional(),
  purchasePrice: z.string().optional(),
  estimatedValue: z.string().optional(),
  afterRepairValue: z.string().optional(),
  rehabBudget: z.string().optional(),
}).refine(
  data => data.propertyId || (data.address && data.city && data.state && data.zipCode),
  {
    message: 'Either select existing property or provide property details',
    path: ['propertyId'],
  },
);

/**
 * Loan terms step validation
 */
export const loanTermsStepSchema = z.object({
  loanAmount: z.string().min(1, 'Loan amount is required'),
  interestRate: z.string().min(1, 'Interest rate is required'),
  termMonths: z.number().min(1, 'Term must be at least 1 month').max(360, 'Term cannot exceed 360 months'),
  loanStructure: z.enum(['fully-amortizing', 'interest-only', 'balloon']),
  originationDate: z.date(),
  originationPoints: z.number().min(0).max(10).optional(),
  processingFee: z.number().min(0).optional(),
  inspectionFee: z.number().min(0).optional(),
  notes: z.string().optional(),
});

/**
 * Document upload step validation
 */
export const documentUploadStepSchema = z.object({
  documents: z.array(z.object({
    type: z.enum(['application', 'appraisal', 'insurance', 'title', 'other']),
    file: z.any(),
    name: z.string(),
  })).optional(),
});

/**
 * Complete loan application validation
 */
export const loanApplicationSchema = z.object({
  borrower: borrowerStepSchema,
  property: propertyStepSchema,
  loanTerms: loanTermsStepSchema,
  documents: documentUploadStepSchema,
});

export type LoanApplicationData = z.infer<typeof loanApplicationSchema>;
export type BorrowerStepData = z.infer<typeof borrowerStepSchema>;
export type PropertyStepData = z.infer<typeof propertyStepSchema>;
export type LoanTermsStepData = z.infer<typeof loanTermsStepSchema>;
export type DocumentUploadStepData = z.infer<typeof documentUploadStepSchema>;
