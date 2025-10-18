/**
 * Amortization Schedule Calculations
 *
 * Generates payment schedules for different loan structures.
 */

export type LoanStructure = 'interest-only' | 'fully-amortizing' | 'balloon';

export type PaymentScheduleEntry = {
  paymentNumber: number;
  paymentDate: Date;
  paymentAmount: number;
  principalAmount: number;
  interestAmount: number;
  remainingBalance: number;
  cumulativePrincipal: number;
  cumulativeInterest: number;
};

export type AmortizationSchedule = {
  schedule: PaymentScheduleEntry[];
  totalPayments: number;
  totalPrincipal: number;
  totalInterest: number;
  finalPayment: number;
};

/**
 * Generate full amortization schedule
 */
export function generateAmortizationSchedule(params: {
  loanAmount: number;
  annualInterestRate: number;
  termMonths: number;
  originationDate: Date;
  structure: LoanStructure;
  balloonMonths?: number;
}): AmortizationSchedule {
  const { loanAmount, annualInterestRate, termMonths, originationDate, structure, balloonMonths } = params;

  switch (structure) {
    case 'interest-only':
      return generateInterestOnlySchedule(loanAmount, annualInterestRate, termMonths, originationDate);

    case 'balloon':
      return generateBalloonSchedule(
        loanAmount,
        annualInterestRate,
        termMonths,
        originationDate,
        balloonMonths || termMonths,
      );

    case 'fully-amortizing':
    default:
      return generateFullyAmortizingSchedule(loanAmount, annualInterestRate, termMonths, originationDate);
  }
}

/**
 * Generate fully amortizing schedule
 */
function generateFullyAmortizingSchedule(
  loanAmount: number,
  annualInterestRate: number,
  termMonths: number,
  originationDate: Date,
): AmortizationSchedule {
  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyPayment = annualInterestRate === 0
    ? loanAmount / termMonths
    : (loanAmount * monthlyRate * (1 + monthlyRate) ** termMonths)
      / ((1 + monthlyRate) ** termMonths - 1);

  let remainingBalance = loanAmount;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  const schedule: PaymentScheduleEntry[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const interestAmount = remainingBalance * monthlyRate;
    const principalAmount = monthlyPayment - interestAmount;

    remainingBalance -= principalAmount;
    cumulativePrincipal += principalAmount;
    cumulativeInterest += interestAmount;

    const paymentDate = new Date(originationDate);
    paymentDate.setMonth(paymentDate.getMonth() + month);

    schedule.push({
      paymentNumber: month,
      paymentDate,
      paymentAmount: monthlyPayment,
      principalAmount: Math.max(0, principalAmount),
      interestAmount,
      remainingBalance: Math.max(0, remainingBalance),
      cumulativePrincipal,
      cumulativeInterest,
    });
  }

  return {
    schedule,
    totalPayments: monthlyPayment * termMonths,
    totalPrincipal: loanAmount,
    totalInterest: cumulativeInterest,
    finalPayment: monthlyPayment,
  };
}

/**
 * Generate interest-only schedule
 */
function generateInterestOnlySchedule(
  loanAmount: number,
  annualInterestRate: number,
  termMonths: number,
  originationDate: Date,
): AmortizationSchedule {
  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyInterest = loanAmount * monthlyRate;

  const schedule: PaymentScheduleEntry[] = [];
  let cumulativeInterest = 0;

  for (let month = 1; month <= termMonths; month++) {
    cumulativeInterest += monthlyInterest;

    const paymentDate = new Date(originationDate);
    paymentDate.setMonth(paymentDate.getMonth() + month);

    const isLastPayment = month === termMonths;
    const paymentAmount = isLastPayment ? monthlyInterest + loanAmount : monthlyInterest;
    const principalAmount = isLastPayment ? loanAmount : 0;

    schedule.push({
      paymentNumber: month,
      paymentDate,
      paymentAmount,
      principalAmount,
      interestAmount: monthlyInterest,
      remainingBalance: isLastPayment ? 0 : loanAmount,
      cumulativePrincipal: principalAmount,
      cumulativeInterest,
    });
  }

  return {
    schedule,
    totalPayments: monthlyInterest * termMonths + loanAmount,
    totalPrincipal: loanAmount,
    totalInterest: cumulativeInterest,
    finalPayment: monthlyInterest + loanAmount,
  };
}

/**
 * Generate balloon payment schedule
 */
function generateBalloonSchedule(
  loanAmount: number,
  annualInterestRate: number,
  termMonths: number,
  originationDate: Date,
  balloonMonths: number,
): AmortizationSchedule {
  // Calculate payment as if fully amortizing over longer period
  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyPayment = annualInterestRate === 0
    ? loanAmount / balloonMonths
    : (loanAmount * monthlyRate * (1 + monthlyRate) ** balloonMonths)
      / ((1 + monthlyRate) ** balloonMonths - 1);

  let remainingBalance = loanAmount;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  const schedule: PaymentScheduleEntry[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const interestAmount = remainingBalance * monthlyRate;
    const principalAmount = month < termMonths ? monthlyPayment - interestAmount : remainingBalance;
    const paymentAmount = month < termMonths ? monthlyPayment : monthlyPayment + remainingBalance;

    remainingBalance -= principalAmount;
    cumulativePrincipal += principalAmount;
    cumulativeInterest += interestAmount;

    const paymentDate = new Date(originationDate);
    paymentDate.setMonth(paymentDate.getMonth() + month);

    schedule.push({
      paymentNumber: month,
      paymentDate,
      paymentAmount,
      principalAmount: Math.max(0, principalAmount),
      interestAmount,
      remainingBalance: Math.max(0, remainingBalance),
      cumulativePrincipal,
      cumulativeInterest,
    });
  }

  const balloonPayment = schedule[schedule.length - 1]?.paymentAmount || 0;

  return {
    schedule,
    totalPayments: monthlyPayment * (termMonths - 1) + balloonPayment,
    totalPrincipal: loanAmount,
    totalInterest: cumulativeInterest,
    finalPayment: balloonPayment,
  };
}

/**
 * Calculate interest-only monthly payment
 */
export function calculateInterestOnlyPayment(loanAmount: number, annualInterestRate: number): number {
  const monthlyRate = annualInterestRate / 100 / 12;
  return loanAmount * monthlyRate;
}

/**
 * Calculate per-diem interest for payoff quotes
 */
export function calculatePerDiemInterest(loanAmount: number, annualInterestRate: number): number {
  return (loanAmount * annualInterestRate / 100) / 365;
}

/**
 * Calculate payoff amount
 */
export function calculatePayoffAmount(params: {
  remainingBalance: number;
  annualInterestRate: number;
  lastPaymentDate: Date;
  payoffDate: Date;
  prepaymentPenalty?: number;
}): {
  remainingBalance: number;
  accruedInterest: number;
  prepaymentPenalty: number;
  totalPayoff: number;
  perDiemInterest: number;
  daysSinceLastPayment: number;
} {
  const { remainingBalance, annualInterestRate, lastPaymentDate, payoffDate, prepaymentPenalty = 0 } = params;

  // Calculate days since last payment
  const daysDiff = Math.floor((payoffDate.getTime() - lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate per-diem interest
  const perDiem = calculatePerDiemInterest(remainingBalance, annualInterestRate);

  // Calculate accrued interest
  const accruedInterest = perDiem * daysDiff;

  // Calculate total payoff
  const totalPayoff = remainingBalance + accruedInterest + prepaymentPenalty;

  return {
    remainingBalance,
    accruedInterest: Math.round(accruedInterest * 100) / 100,
    prepaymentPenalty,
    totalPayoff: Math.round(totalPayoff * 100) / 100,
    perDiemInterest: Math.round(perDiem * 100) / 100,
    daysSinceLastPayment: daysDiff,
  };
}
