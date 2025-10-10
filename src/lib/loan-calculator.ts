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

