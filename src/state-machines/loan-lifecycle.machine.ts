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

/**
 * Loan status audit entry
 */
export type LoanStatusAudit = {
  id?: number;
  loanId: number;
  fromStatus: string;
  toStatus: string;
  triggeredBy: string;
  reason?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
};

/**
 * Valid state transitions map
 */
const VALID_TRANSITIONS: Record<string, string[]> = {
  'application': ['underwriting', 'rejected'],
  'underwriting': ['approved', 'rejected'],
  'approved': ['funded', 'rejected'],
  'funded': ['servicing'],
  'servicing': ['paid-off', 'defaulted'],
  'paid-off': [], // Final state
  'defaulted': [], // Final state
  'rejected': [], // Final state
};

/**
 * Check if a state transition is allowed
 */
export const isTransitionAllowed = (currentState: string, targetState: string): boolean => {
  const allowedStates = VALID_TRANSITIONS[currentState] || [];
  return allowedStates.includes(targetState);
};

/**
 * Get next possible states from current state
 */
export const getNextPossibleStates = (currentState: string): string[] => {
  return VALID_TRANSITIONS[currentState] || [];
};

/**
 * Get user-friendly display name for state
 */
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

/**
 * Get state color for UI
 */
export const getStateColor = (state: string): {
  bg: string;
  text: string;
  border: string;
} => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    'application': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    'underwriting': {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
    },
    'approved': {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
    },
    'funded': {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    'servicing': {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
    },
    'paid-off': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
    },
    'defaulted': {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
    },
    'rejected': {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-200',
    },
  };

  return colors[state] || {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
  };
};

/**
 * Get state icon
 */
export const getStateIcon = (state: string): string => {
  const icons: Record<string, string> = {
    'application': '📝',
    'underwriting': '🔍',
    'approved': '✅',
    'funded': '💰',
    'servicing': '🏦',
    'paid-off': '🎉',
    'defaulted': '⚠️',
    'rejected': '❌',
  };
  return icons[state] || '📄';
};

/**
 * Validate state transition and return error message if invalid
 */
export const validateTransition = (
  currentState: string,
  targetState: string,
): string | null => {
  if (!isTransitionAllowed(currentState, targetState)) {
    return `Cannot transition from ${getStateDisplayName(currentState)} to ${getStateDisplayName(targetState)}`;
  }
  return null;
};

/**
 * Create audit log entry for state transition
 */
export const createAuditEntry = (params: {
  loanId: number;
  fromStatus: string;
  toStatus: string;
  triggeredBy: string;
  reason?: string;
  metadata?: Record<string, any>;
}): LoanStatusAudit => {
  return {
    loanId: params.loanId,
    fromStatus: params.fromStatus,
    toStatus: params.toStatus,
    triggeredBy: params.triggeredBy,
    reason: params.reason,
    metadata: params.metadata,
    createdAt: new Date(),
  };
};
