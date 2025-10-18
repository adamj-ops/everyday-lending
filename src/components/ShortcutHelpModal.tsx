/**
 * Shortcut Help Modal Component
 *
 * Displays the keyboard shortcuts help modal using the ShortcutContext.
 */

'use client';

import { useShortcuts } from '@/contexts/ShortcutContext';
import { KeyboardShortcutHelp } from './KeyboardShortcutHelp';

export function ShortcutHelpModal() {
  const { showHelp, setShowHelp } = useShortcuts();

  return (
    <KeyboardShortcutHelp
      isOpen={showHelp}
      onClose={() => setShowHelp(false)}
    />
  );
}
