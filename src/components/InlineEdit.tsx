/**
 * Inline Edit Component
 *
 * Provides click-to-edit functionality with auto-save and optimistic updates.
 */

'use client';

import type { ReactNode } from 'react';
import { Check, Loader2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type InlineEditProps = {
  /** Current value */
  value: string | number;

  /** Callback when value is saved */
  onSave: (newValue: string) => Promise<void>;

  /** Optional validation function */
  validate?: (value: string) => string | null;

  /** Input type */
  type?: 'text' | 'number' | 'email' | 'tel';

  /** Placeholder text */
  placeholder?: string;

  /** Additional CSS classes */
  className?: string;

  /** Custom display format */
  displayFormatter?: (value: string | number) => ReactNode;

  /** Enable multi-line editing */
  multiline?: boolean;
};

/**
 * Inline editable text component with auto-save
 *
 * @example
 * ```tsx
 * <InlineEdit
 *   value={loan.loanAmount}
 *   onSave={async (newValue) => {
 *     await updateLoan.mutateAsync({ id: loan.id, data: { loanAmount: newValue } });
 *   }}
 * />
 * ```
 */
export function InlineEdit({
  value,
  onSave,
  validate,
  type = 'text',
  placeholder = 'Click to edit',
  className,
  displayFormatter,
  multiline = false,
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Update edit value when prop value changes
  useEffect(() => {
    setEditValue(String(value));
  }, [value]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(String(value));
    setError(null);
  };

  const handleSave = async () => {
    const trimmedValue = editValue.trim();

    // Validate if validator provided
    if (validate) {
      const validationError = validate(trimmedValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Don't save if value hasn't changed
    if (trimmedValue === String(value)) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await onSave(trimmedValue);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    } else if (e.key === 'Enter' && e.metaKey && multiline) {
      e.preventDefault();
      handleSave();
    }
  };

  const displayValue = displayFormatter ? displayFormatter(value) : String(value || placeholder);

  return (
    <div className={cn('group relative', className)}>
      {!isEditing ? (
        <button
          type="button"
          onClick={handleStartEdit}
          className={cn(
            'w-full cursor-pointer rounded px-2 py-1 text-left transition-colors',
            'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            !value && 'text-gray-400',
          )}
        >
          {displayValue}
        </button>
      ) : (
        <div className="relative">
          {multiline
            ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSave}
                  placeholder={placeholder}
                  className={cn(
                    'w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    error && 'border-red-500 ring-red-500',
                  )}
                  rows={3}
                  disabled={isSaving}
                />
              )
            : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={type}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSave}
                  placeholder={placeholder}
                  className={cn(
                    'w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    error && 'border-red-500 ring-red-500',
                  )}
                  disabled={isSaving}
                />
              )}

          {/* Loading/Success Indicator */}
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            {isSaving
              ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                )
              : error
                ? (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="text-red-500 hover:text-red-600"
                      aria-label="Cancel edit"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )
                : editValue !== String(value)
                  ? (
                      <button
                        type="button"
                        onClick={handleSave}
                        className="text-green-500 hover:text-green-600"
                        aria-label="Save changes"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )
                  : null}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-1 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Hint Text */}
          {!error && !isSaving && (
            <div className="mt-1 text-xs text-gray-500">
              Press Enter to save, Esc to cancel
              {multiline && ', or Cmd+Enter to save'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
