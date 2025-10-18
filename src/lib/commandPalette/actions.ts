/**
 * Command Palette Actions
 *
 * Defines all available actions in the command palette.
 */

import { useRouter } from 'next/navigation';

export type CommandAction = {
  id: string;
  title: string;
  description?: string;
  shortcut?: string[];
  icon?: string;
  section: 'navigation' | 'create' | 'search' | 'settings';
  keywords?: string[];
  perform: () => void | Promise<void>;
};

/**
 * Get navigation actions for the command palette
 */
export function useNavigationActions(): CommandAction[] {
  const router = useRouter();

  return [
    {
      id: 'nav-dashboard',
      title: 'Go to Dashboard',
      description: 'View portfolio overview and metrics',
      shortcut: ['g', 'd'],
      section: 'navigation',
      keywords: ['dashboard', 'home', 'overview', 'metrics'],
      perform: () => router.push('/en/dashboard'),
    },
    {
      id: 'nav-loans',
      title: 'Go to Loans',
      description: 'View all loans',
      shortcut: ['g', 'l'],
      section: 'navigation',
      keywords: ['loans', 'portfolio'],
      perform: () => router.push('/en/dashboard/loans'),
    },
    {
      id: 'nav-borrowers',
      title: 'Go to Borrowers',
      description: 'View all borrowers',
      shortcut: ['g', 'b'],
      section: 'navigation',
      keywords: ['borrowers', 'clients'],
      perform: () => router.push('/en/dashboard/borrowers'),
    },
    {
      id: 'nav-lenders',
      title: 'Go to Lenders',
      description: 'View all lenders',
      shortcut: ['g', 'e'],
      section: 'navigation',
      keywords: ['lenders', 'partners'],
      perform: () => router.push('/en/dashboard/lenders'),
    },
    {
      id: 'nav-properties',
      title: 'Go to Properties',
      description: 'View all properties',
      shortcut: ['g', 'p'],
      section: 'navigation',
      keywords: ['properties', 'real estate'],
      perform: () => router.push('/en/dashboard/properties'),
    },
    {
      id: 'nav-payments',
      title: 'Go to Payments',
      description: 'View all payments',
      shortcut: ['g', 'y'],
      section: 'navigation',
      keywords: ['payments', 'transactions'],
      perform: () => router.push('/en/dashboard/payments'),
    },
    {
      id: 'nav-draws',
      title: 'Go to Draws',
      description: 'View construction draws',
      shortcut: ['g', 'w'],
      section: 'navigation',
      keywords: ['draws', 'construction'],
      perform: () => router.push('/en/dashboard/draws'),
    },
    {
      id: 'nav-analytics',
      title: 'Go to Analytics',
      description: 'View portfolio analytics',
      shortcut: ['g', 'a'],
      section: 'navigation',
      keywords: ['analytics', 'reports', 'insights'],
      perform: () => router.push('/en/dashboard/analytics'),
    },
  ];
}

/**
 * Get creation actions for the command palette
 */
export function useCreateActions(callbacks?: {
  onCreateLoan?: () => void;
  onCreateBorrower?: () => void;
  onCreateLender?: () => void;
  onCreateProperty?: () => void;
}): CommandAction[] {
  const router = useRouter();

  return [
    {
      id: 'create-loan',
      title: 'Create New Loan',
      description: 'Start a new loan application',
      shortcut: ['c', 'l'],
      section: 'create',
      keywords: ['create', 'new', 'loan', 'application'],
      perform: () => {
        if (callbacks?.onCreateLoan) {
          callbacks.onCreateLoan();
        } else {
          router.push('/en/dashboard/loans?action=create');
        }
      },
    },
    {
      id: 'create-borrower',
      title: 'Create New Borrower',
      description: 'Add a new borrower',
      shortcut: ['c', 'b'],
      section: 'create',
      keywords: ['create', 'new', 'borrower', 'client'],
      perform: () => {
        if (callbacks?.onCreateBorrower) {
          callbacks.onCreateBorrower();
        } else {
          router.push('/en/dashboard/borrowers?action=create');
        }
      },
    },
    {
      id: 'create-lender',
      title: 'Create New Lender',
      description: 'Add a new lender',
      shortcut: ['c', 'e'],
      section: 'create',
      keywords: ['create', 'new', 'lender', 'partner'],
      perform: () => {
        if (callbacks?.onCreateLender) {
          callbacks.onCreateLender();
        } else {
          router.push('/en/dashboard/lenders?action=create');
        }
      },
    },
    {
      id: 'create-property',
      title: 'Create New Property',
      description: 'Add a new property',
      shortcut: ['c', 'p'],
      section: 'create',
      keywords: ['create', 'new', 'property', 'real estate'],
      perform: () => {
        if (callbacks?.onCreateProperty) {
          callbacks.onCreateProperty();
        } else {
          router.push('/en/dashboard/properties?action=create');
        }
      },
    },
  ];
}

/**
 * Get all command palette actions
 */
export function useCommandActions(callbacks?: {
  onCreateLoan?: () => void;
  onCreateBorrower?: () => void;
  onCreateLender?: () => void;
  onCreateProperty?: () => void;
}): CommandAction[] {
  const navigationActions = useNavigationActions();
  const createActions = useCreateActions(callbacks);

  return [...navigationActions, ...createActions];
}
