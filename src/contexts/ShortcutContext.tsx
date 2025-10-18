/**
 * Shortcut Context
 *
 * Provides keyboard shortcut state and functions throughout the app.
 */

'use client';

import type { ReactNode } from 'react';
import { createContext, use } from 'react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

type ShortcutContextType = {
  showHelp: boolean;
  toggleHelp: () => void;
  setShowHelp: (show: boolean) => void;
};

const ShortcutContext = createContext<ShortcutContextType | undefined>(undefined);

export function ShortcutProvider({ children }: { children: ReactNode }) {
  const shortcuts = useKeyboardShortcuts();

  return (
    <ShortcutContext value={shortcuts}>
      {children}
    </ShortcutContext>
  );
}

export function useShortcuts() {
  const context = use(ShortcutContext);
  if (!context) {
    throw new Error('useShortcuts must be used within a ShortcutProvider');
  }
  return context;
}
