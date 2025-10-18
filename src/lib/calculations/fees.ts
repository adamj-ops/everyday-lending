/**
 * Fee Calculations
 *
 * Calculate various loan fees and costs.
 */

export type FeeStructure = {
  originationPoints?: number; // Percentage (e.g., 2 for 2%)
  originationFee?: number; // Fixed amount
  processingFee?: number;
  inspectionFee?: number;
  underwritingFee?: number;
  documentPreparationFee?: number;
  wireTransferFee?: number;
  otherFees?: Array<{ name: string; amount: number }>;
};

export type CalculatedFees = {
  originationFee: number;
  processingFee: number;
  inspectionFee: number;
  underwritingFee: number;
  documentPreparationFee: number;
  wireTransferFee: number;
  otherFees: number;
  totalFees: number;
};

/**
 * Calculate all loan fees
 */
export function calculateLoanFees(loanAmount: number, feeStructure: FeeStructure): CalculatedFees {
  // Origination fee (can be points-based or fixed)
  let originationFee = 0;
  if (feeStructure.originationPoints) {
    originationFee = loanAmount * (feeStructure.originationPoints / 100);
  } else if (feeStructure.originationFee) {
    originationFee = feeStructure.originationFee;
  }

  // Other fees
  const processingFee = feeStructure.processingFee || 0;
  const inspectionFee = feeStructure.inspectionFee || 0;
  const underwritingFee = feeStructure.underwritingFee || 0;
  const documentPreparationFee = feeStructure.documentPreparationFee || 0;
  const wireTransferFee = feeStructure.wireTransferFee || 0;

  // Sum other fees
  const otherFees = feeStructure.otherFees
    ? feeStructure.otherFees.reduce((sum, fee) => sum + fee.amount, 0)
    : 0;

  // Calculate total
  const totalFees
    = originationFee
      + processingFee
      + inspectionFee
      + underwritingFee
      + documentPreparationFee
      + wireTransferFee
      + otherFees;

  return {
    originationFee: Math.round(originationFee * 100) / 100,
    processingFee,
    inspectionFee,
    underwritingFee,
    documentPreparationFee,
    wireTransferFee,
    otherFees,
    totalFees: Math.round(totalFees * 100) / 100,
  };
}

/**
 * Calculate late fee
 */
export function calculateLateFee(params: {
  paymentAmount: number;
  lateFeeType: 'fixed' | 'percentage';
  lateFeeAmount: number;
  maxLateFee?: number;
}): number {
  const { paymentAmount, lateFeeType, lateFeeAmount, maxLateFee } = params;

  let lateFee = 0;

  if (lateFeeType === 'fixed') {
    lateFee = lateFeeAmount;
  } else {
    // Percentage of payment
    lateFee = paymentAmount * (lateFeeAmount / 100);
  }

  // Apply max cap if specified
  if (maxLateFee && lateFee > maxLateFee) {
    lateFee = maxLateFee;
  }

  return Math.round(lateFee * 100) / 100;
}

/**
 * Calculate prepayment penalty
 */
export function calculatePrepaymentPenalty(params: {
  remainingBalance: number;
  penaltyType: 'none' | 'fixed' | 'percentage' | 'sliding-scale';
  penaltyAmount: number;
  monthsElapsed?: number;
  penaltyPeriodMonths?: number;
}): number {
  const { remainingBalance, penaltyType, penaltyAmount, monthsElapsed = 0, penaltyPeriodMonths = 12 } = params;

  // No penalty after penalty period
  if (monthsElapsed >= penaltyPeriodMonths) {
    return 0;
  }

  switch (penaltyType) {
    case 'none':
      return 0;

    case 'fixed':
      return penaltyAmount;

    case 'percentage':
      return remainingBalance * (penaltyAmount / 100);

    case 'sliding-scale': {
      // Sliding scale: decreases over time
      const remainingMonths = penaltyPeriodMonths - monthsElapsed;
      const scale = remainingMonths / penaltyPeriodMonths;
      return remainingBalance * (penaltyAmount / 100) * scale;
    }

    default:
      return 0;
  }
}

/**
 * Calculate net proceeds to borrower (loan amount minus all fees)
 */
export function calculateNetProceeds(loanAmount: number, fees: CalculatedFees): number {
  return Math.round((loanAmount - fees.totalFees) * 100) / 100;
}

/**
 * Calculate annual percentage rate (APR)
 */
export function calculateAPR(params: {
  loanAmount: number;
  totalFees: number;
  totalInterest: number;
  termMonths: number;
}): number {
  const { loanAmount, totalFees, totalInterest, termMonths } = params;

  // Total cost of credit
  const totalCost = totalFees + totalInterest;

  // Effective interest rate
  const effectiveRate = (totalCost / loanAmount) / (termMonths / 12);

  return Math.round(effectiveRate * 10000) / 100; // Return as percentage with 2 decimals
}
