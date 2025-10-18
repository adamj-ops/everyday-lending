/**
 * Loan Lifecycle State Machine
 *
 * Manages the complete lifecycle of a loan from application to payoff
 * Uses XState v5 for state management and workflow orchestration
 *
 * States:
 * - application: Initial loan application submitted
 * - underwriting: Loan being reviewed and evaluated
 * - approved: Loan approved, ready for funding
 * - funded: Loan disbursed, construction can begin
 * - servicing: Loan in active repayment phase
 * - paid-off: Loan fully repaid
 * - defaulted: Loan in default
 * - rejected: Loan application rejected
 */

import { assign, createMachine } from 'xstate';

export type LoanContext = {
  loanId: string;
  borrowerId: string;
  lenderId: string;
  propertyId: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  currentStatus: string;
  error?: string;
};

export type LoanEvent
  = | { type: 'SUBMIT_APPLICATION' }
    | { type: 'APPROVE' }
    | { type: 'REJECT'; reason: string }
    | { type: 'FUND' }
    | { type: 'START_SERVICING' }
    | { type: 'PAY_OFF' }
    | { type: 'DEFAULT' }
    | { type: 'RETRY' };

export const loanLifecycleMachine = createMachine({
  id: 'loanLifecycle',
  initial: 'application',
  types: {
    context: {} as LoanContext,
    events: {} as LoanEvent,
  },
  context: {
    loanId: '',
    borrowerId: '',
    lenderId: '',
    propertyId: '',
    amount: 0,
    interestRate: 0,
    termMonths: 0,
    currentStatus: 'application',
  },
  states: {
    'application': {
      on: {
        SUBMIT_APPLICATION: {
          target: 'underwriting',
          actions: assign({
            currentStatus: 'underwriting',
          }),
        },
      },
    },
    'underwriting': {
      on: {
        APPROVE: {
          target: 'approved',
          actions: assign({
            currentStatus: 'approved',
          }),
        },
        REJECT: {
          target: 'rejected',
          actions: assign({
            currentStatus: 'rejected',
            error: ({ event }) => event.reason,
          }),
        },
      },
    },
    'approved': {
      on: {
        FUND: {
          target: 'funded',
          actions: assign({
            currentStatus: 'funded',
          }),
        },
      },
    },
    'funded': {
      on: {
        START_SERVICING: {
          target: 'servicing',
          actions: assign({
            currentStatus: 'servicing',
          }),
        },
      },
    },
    'servicing': {
      on: {
        PAY_OFF: {
          target: 'paid-off',
          actions: assign({
            currentStatus: 'paid-off',
          }),
        },
        DEFAULT: {
          target: 'defaulted',
          actions: assign({
            currentStatus: 'defaulted',
          }),
        },
      },
    },
    'paid-off': {
      type: 'final',
    },
    'defaulted': {
      type: 'final',
    },
    'rejected': {
      type: 'final',
    },
  },
});

// Helper functions for state machine usage
export const isTransitionAllowed = (_currentState: string, _event: string): boolean => {
  // TODO: Implement transition validation logic
  // Check if the event is allowed from the current state
  return true;
};

export const getNextPossibleStates = (_currentState: string): string[] => {
  // TODO: Implement next states logic
  // Return array of possible next states from current state
  return [];
};

export const getStateDisplayName = (state: string): string => {
  const stateNames: Record<string, string> = {
    'application': 'Application Submitted',
    'underwriting': 'Under Review',
    'approved': 'Approved',
    'funded': 'Funded',
    'servicing': 'In Servicing',
    'paid-off': 'Paid Off',
    'defaulted': 'Defaulted',
    'rejected': 'Rejected',
  };
  return stateNames[state] || state;
};
