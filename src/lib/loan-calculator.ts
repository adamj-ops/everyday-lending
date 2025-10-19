/**
 * Loan calculation utilities
 */

/**
 * Calculate monthly payment for a loan
 * Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
 * Where:
 * M = Monthly payment
 * P = Principal loan amount
 * i = Monthly interest rate (annual rate / 12 / 100)
 * n = Number of months
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  annualInterestRate: number,
  termMonths: number,
): number {
  if (loanAmount <= 0 || termMonths <= 0) {
    return 0;
  }

  // For 0% interest, simple division
  if (annualInterestRate === 0) {
    return loanAmount / termMonths;
  }

  // Convert annual rate to monthly decimal rate
  const monthlyRate = annualInterestRate / 100 / 12;

  // Calculate monthly payment using amortization formula
  const payment
    = (loanAmount * monthlyRate * (1 + monthlyRate) ** termMonths)
      / ((1 + monthlyRate) ** termMonths - 1);

  return Math.round(payment * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate maturity date from origination date and term
 */
export function calculateMaturityDate(originationDate: Date, termMonths: number): Date {
  const maturityDate = new Date(originationDate);
  maturityDate.setMonth(maturityDate.getMonth() + termMonths);
  return maturityDate;
}

/**
 * Calculate total interest over the life of the loan
 */
export function calculateTotalInterest(
  loanAmount: number,
  monthlyPayment: number,
  termMonths: number,
): number {
  const totalPayments = monthlyPayment * termMonths;
  const totalInterest = totalPayments - loanAmount;
  return Math.max(0, totalInterest); // Ensure non-negative
}

/**
 * Calculate loan-to-value ratio (LTV)
 */
export function calculateLTV(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) {
    return 0;
  }
  return (loanAmount / propertyValue) * 100;
}

/**
 * Calculate loan-to-cost ratio (LTC)
 */
export function calculateLTC(
  loanAmount: number,
  purchasePrice: number,
  rehabBudget: number = 0,
): number {
  const totalCost = purchasePrice + rehabBudget;
  if (totalCost <= 0) {
    return 0;
  }
  return (loanAmount / totalCost) * 100;
}

/**
 * Calculate remaining balance after payments
 */
export function calculateRemainingBalance(
  originalAmount: number,
  principalPaid: number,
): number {
  return Math.max(0, originalAmount - principalPaid);
}

/**
 * Calculate next payment date from last payment
 */
export function calculateNextPaymentDate(lastPaymentDate: Date | null): Date {
  const baseDate = lastPaymentDate || new Date();
  const nextDate = new Date(baseDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate;
}

/**
 * Calculate Debt Service Coverage Ratio (DSCR)
 * DSCR = Net Operating Income / Total Debt Service
 * Minimum DSCR for approval is typically 1.20-1.25
 */
export function calculateDSCR(params: {
  netOperatingIncome: number; // Annual NOI
  annualDebtService: number; // Annual principal + interest payments
}): number {
  const { netOperatingIncome, annualDebtService } = params;

  if (annualDebtService === 0) {
    return 0;
  }

  return Math.round((netOperatingIncome / annualDebtService) * 100) / 100;
}

/**
 * Calculate Debt-to-Income Ratio (DTI)
 * DTI = Total Monthly Debt / Gross Monthly Income
 */
export function calculateDTI(params: {
  monthlyDebtPayments: number;
  grossMonthlyIncome: number;
}): number {
  const { monthlyDebtPayments, grossMonthlyIncome } = params;

  if (grossMonthlyIncome === 0) {
    return 0;
  }

  return Math.round((monthlyDebtPayments / grossMonthlyIncome) * 10000) / 100; // Percentage with 2 decimals
}

/**
 * Calculate After Repair Value (ARV) based LTV
 * Used for fix-and-flip loans
 */
export function calculateARVBasedLTV(
  loanAmount: number,
  afterRepairValue: number,
): number {
  if (afterRepairValue <= 0) {
    return 0;
  }
  return Math.round((loanAmount / afterRepairValue) * 10000) / 100;
}

/**
 * Calculate all-in cost basis
 * Purchase Price + Rehab Budget + Closing Costs
 */
export function calculateAllInCost(params: {
  purchasePrice: number;
  rehabBudget: number;
  closingCosts: number;
}): number {
  return params.purchasePrice + params.rehabBudget + params.closingCosts;
}

/**
 * Calculate potential profit margin
 * ARV - All-in Cost - Selling Costs
 */
export function calculateProfitMargin(params: {
  afterRepairValue: number;
  allInCost: number;
  sellingCosts: number;
}): {
  profit: number;
  profitMargin: number; // Percentage
} {
  const profit = params.afterRepairValue - params.allInCost - params.sellingCosts;
  const profitMargin = params.afterRepairValue > 0
    ? (profit / params.afterRepairValue) * 100
    : 0;

  return {
    profit: Math.round(profit * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100,
  };
}

/**
 * Calculate break-even sale price
 * Minimum sale price needed to cover all costs
 */
export function calculateBreakEvenPrice(params: {
  loanAmount: number;
  totalInterest: number;
  totalFees: number;
  rehabBudget: number;
  purchasePrice: number;
  sellingCosts: number;
}): number {
  const totalCosts
    = params.loanAmount
      + params.totalInterest
      + params.totalFees
      + (params.rehabBudget - params.loanAmount)
      + params.sellingCosts;

  return Math.round(totalCosts * 100) / 100;
}
