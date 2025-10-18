/**
 * Inline Edit Hook
 *
 * Provides state management for inline editing with validation and debouncing.
 */

'use client';

import { useCallback, useState } from 'react';

type UseInlineEditOptions<T> = {
  /** Initial value */
  initialValue: T;

  /** Save handler */
  onSave: (value: T) => Promise<void>;

  /** Optional validation */
  validate?: (value: T) => string | null;

  /** Debounce delay in ms (default: 500ms) - Reserved for future use */
  _debounceMs?: number;
};

export function useInlineEdit<T>({
  initialValue,
  onSave,
  validate,
}: UseInlineEditOptions<T>) {
  const [value, setValue] = useState<T>(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = useCallback(() => {
    setIsEditing(true);
    setError(null);
  }, []);

  const cancelEdit = useCallback(() => {
    setValue(initialValue);
    setIsEditing(false);
    setError(null);
  }, [initialValue]);

  const save = useCallback(async () => {
    // Validate
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
        return false;
      }
    }

    // Don't save if unchanged
    if (value === initialValue) {
      setIsEditing(false);
      return true;
    }

    setIsSaving(true);
    setError(null);

    try {
      await onSave(value);
      setIsEditing(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [value, initialValue, validate, onSave]);

  return {
    value,
    setValue,
    isEditing,
    isSaving,
    error,
    startEdit,
    cancelEdit,
    save,
  };
}
