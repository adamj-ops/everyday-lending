/**
 * Keyboard Shortcut Help Component
 *
 * Modal showing all available keyboard shortcuts.
 */

'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getKeyDisplay, SHORTCUT_DEFINITIONS } from '@/lib/shortcuts/definitions';

type KeyboardShortcutHelpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function KeyboardShortcutHelp({ isOpen, onClose }: KeyboardShortcutHelpProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Keyboard Shortcuts</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            aria-label="Close shortcuts help"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SHORTCUT_DEFINITIONS.map(category => (
            <div key={category.name}>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.shortcuts.map((shortcut, index) => (
                  <div
                    key={`${category.name}-${index}`}
                    className="flex items-center justify-between rounded-md bg-gray-50 p-2"
                  >
                    <span className="text-sm text-gray-700">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd
                          key={`${category.name}-${index}-${keyIndex}`}
                          className="rounded bg-white px-2 py-1 font-mono text-xs font-semibold shadow-sm ring-1 ring-gray-200"
                        >
                          {getKeyDisplay(key)}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 border-t pt-4 text-center text-xs text-gray-500">
          <p>
            Press
            {' '}
            <kbd className="rounded bg-gray-100 px-2 py-1 font-mono">?</kbd>
            {' '}
            or
            {' '}
            <kbd className="rounded bg-gray-100 px-2 py-1 font-mono">Shift + /</kbd>
            {' '}
            to toggle
            this help
          </p>
        </div>
      </div>
    </div>
  );
}
