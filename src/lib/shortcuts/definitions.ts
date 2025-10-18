/**
 * Keyboard Shortcuts Definitions
 *
 * Centralized definitions for all keyboard shortcuts in the application.
 */

export type KeyboardShortcut = {
  id: string;
  keys: string[];
  description: string;
  category: 'navigation' | 'actions' | 'editing' | 'general';
  action: () => void;
};

export type ShortcutCategory = {
  name: string;
  shortcuts: Array<{
    keys: string[];
    description: string;
  }>;
};

/**
 * All keyboard shortcuts organized by category
 */
export const SHORTCUT_DEFINITIONS: ShortcutCategory[] = [
  {
    name: 'Navigation',
    shortcuts: [
      { keys: ['G', 'D'], description: 'Go to Dashboard' },
      { keys: ['G', 'L'], description: 'Go to Loans' },
      { keys: ['G', 'B'], description: 'Go to Borrowers' },
      { keys: ['G', 'E'], description: 'Go to Lenders' },
      { keys: ['G', 'P'], description: 'Go to Properties' },
      { keys: ['G', 'Y'], description: 'Go to Payments' },
      { keys: ['G', 'W'], description: 'Go to Draws' },
      { keys: ['G', 'A'], description: 'Go to Analytics' },
    ],
  },
  {
    name: 'Actions',
    shortcuts: [
      { keys: ['C', 'L'], description: 'Create New Loan' },
      { keys: ['C', 'B'], description: 'Create New Borrower' },
      { keys: ['C', 'E'], description: 'Create New Lender' },
      { keys: ['C', 'P'], description: 'Create New Property' },
    ],
  },
  {
    name: 'General',
    shortcuts: [
      { keys: ['⌘', 'K'], description: 'Open Command Palette' },
      { keys: ['?'], description: 'Show Keyboard Shortcuts' },
      { keys: ['/'], description: 'Focus Search' },
      { keys: ['Esc'], description: 'Close Modal / Cancel' },
    ],
  },
  {
    name: 'List Navigation',
    shortcuts: [
      { keys: ['J'], description: 'Move Down in List' },
      { keys: ['K'], description: 'Move Up in List' },
      { keys: ['Enter'], description: 'Select Item' },
    ],
  },
  {
    name: 'Editing',
    shortcuts: [
      { keys: ['⌘', 'S'], description: 'Save Changes' },
      { keys: ['⌘', 'Enter'], description: 'Submit Form' },
      { keys: ['Esc'], description: 'Cancel Edit' },
    ],
  },
];

/**
 * Get formatted key display (e.g., "Cmd" on Mac, "Ctrl" on Windows)
 */
export function getKeyDisplay(key: string): string {
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().includes('MAC');

  const keyMap: Record<string, string> = {
    '⌘': isMac ? '⌘' : 'Ctrl',
    cmd: isMac ? '⌘' : 'Ctrl',
    meta: isMac ? '⌘' : 'Ctrl',
    ctrl: 'Ctrl',
    alt: isMac ? '⌥' : 'Alt',
    shift: '⇧',
    enter: '↵',
    esc: 'Esc',
    escape: 'Esc',
    space: 'Space',
    tab: 'Tab',
    backspace: '⌫',
    delete: 'Del',
  };

  return keyMap[key.toLowerCase()] || key.toUpperCase();
}

