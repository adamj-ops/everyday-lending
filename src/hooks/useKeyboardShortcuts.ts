/**
 * Keyboard Shortcuts Hook
 *
 * Manages global keyboard shortcuts and provides an interface for components.
 */

'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  // Navigation shortcuts (G + key)
  useHotkeys('g,d', (e) => {
    e.preventDefault();
    router.push('/en/dashboard');
  }, { description: 'Go to Dashboard' });

  useHotkeys('g,l', (e) => {
    e.preventDefault();
    router.push('/en/dashboard/loans');
  }, { description: 'Go to Loans' });

  useHotkeys('g,b', (e) => {
    e.preventDefault();
    router.push('/en/dashboard/borrowers');
  }, { description: 'Go to Borrowers' });

  useHotkeys('g,e', (e) => {
    e.preventDefault();
    router.push('/en/dashboard/lenders');
  }, { description: 'Go to Lenders' });

  useHotkeys('g,p', (e) => {
    e.preventDefault();
    router.push('/en/dashboard/properties');
  }, { description: 'Go to Properties' });

  useHotkeys('g,y', (e) => {
    e.preventDefault();
    router.push('/en/dashboard/payments');
  }, { description: 'Go to Payments' });

  useHotkeys('g,w', (e) => {
    e.preventDefault();
    router.push('/en/dashboard/draws');
  }, { description: 'Go to Draws' });

  useHotkeys('g,a', (e) => {
    e.preventDefault();
    router.push('/en/dashboard/analytics');
  }, { description: 'Go to Analytics' });

  // Help shortcut
  useHotkeys('shift+/', (e) => {
    e.preventDefault();
    setShowHelp(prev => !prev);
  }, { description: 'Toggle Keyboard Shortcuts Help' });

  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);

  return {
    showHelp,
    toggleHelp,
    setShowHelp,
  };
}

/**
 * Hook for component-specific keyboard shortcuts
 *
 * @example
 * ```tsx
 * useLocalShortcuts({
 *   'enter': () => handleSubmit(),
 *   'esc': () => handleCancel(),
 * });
 * ```
 */
export function useLocalShortcuts(shortcuts: Record<string, () => void>, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const handler = shortcuts[key];

      if (handler && !isInputFocused()) {
        e.preventDefault();
        handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

/**
 * Check if an input element is currently focused
 */
function isInputFocused(): boolean {
  const activeElement = document.activeElement;
  if (!activeElement) {
    return false;
  }

  const tagName = activeElement.tagName.toLowerCase();
  return (
    tagName === 'input'
    || tagName === 'textarea'
    || tagName === 'select'
    || activeElement.getAttribute('contenteditable') === 'true'
  );
}

/**
 * Hook for list navigation with J/K keys
 *
 * @example
 * ```tsx
 * const { selectedIndex, setSelectedIndex } = useListNavigation(items.length);
 * ```
 */
export function useListNavigation(itemCount: number, onSelect?: (index: number) => void) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useHotkeys('j', (e) => {
    e.preventDefault();
    setSelectedIndex(prev => Math.min(prev + 1, itemCount - 1));
  }, { enabled: !isInputFocused() && itemCount > 0 });

  useHotkeys('k', (e) => {
    e.preventDefault();
    setSelectedIndex(prev => Math.max(prev - 1, 0));
  }, { enabled: !isInputFocused() && itemCount > 0 });

  useHotkeys('enter', (e) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(selectedIndex);
    }
  }, { enabled: !isInputFocused() && itemCount > 0 });

  return {
    selectedIndex,
    setSelectedIndex,
  };
}
