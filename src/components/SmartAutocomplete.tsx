/**
 * Smart Autocomplete Component
 *
 * Intelligent autocomplete with fuzzy search and contextual suggestions.
 */

'use client';

import type { ReactNode } from 'react';
import { Command } from 'cmdk';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type AutocompleteOption = {
  value: string | number;
  label: string;
  description?: string;
  metadata?: string;
  icon?: ReactNode;
};

type SmartAutocompleteProps = {
  /** Available options */
  options: AutocompleteOption[];

  /** Currently selected value */
  value?: string | number;

  /** Callback when selection changes */
  onChange: (value: string | number) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Is loading state */
  isLoading?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Custom className */
  className?: string;

  /** Allow custom values (not in options list) - Reserved for future use */
  _allowCustom?: boolean;

  /** Custom empty state message */
  emptyMessage?: string;
};

/**
 * Smart autocomplete with fuzzy search
 *
 * @example
 * ```tsx
 * <SmartAutocomplete
 *   options={borrowers.map(b => ({
 *     value: b.id,
 *     label: `${b.firstName} ${b.lastName}`,
 *     description: b.email,
 *     metadata: `${b.activeLoansCount} active loans`
 *   }))}
 *   value={selectedBorrowerId}
 *   onChange={setSelectedBorrowerId}
 *   placeholder="Select borrower..."
 * />
 * ```
 */
export function SmartAutocomplete({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  isLoading = false,
  disabled = false,
  className,
  emptyMessage = 'No results found',
}: SmartAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter((option) => {
    if (!searchQuery) {
      return true;
    }

    const query = searchQuery.toLowerCase();
    const labelMatch = option.label.toLowerCase().includes(query);
    const descriptionMatch = option.description?.toLowerCase().includes(query);
    const metadataMatch = option.metadata?.toLowerCase().includes(query);

    return labelMatch || descriptionMatch || metadataMatch;
  });

  // Get selected option
  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [isOpen]);

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        disabled={disabled || isLoading}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        {isLoading
          ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            )
          : selectedOption
            ? (
                <div className="flex items-center gap-2 overflow-hidden">
                  {selectedOption.icon}
                  <span className="truncate">{selectedOption.label}</span>
                </div>
              )
            : (
                <span className="text-gray-500">{placeholder}</span>
              )}
        <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
          <Command>
            <div className="flex items-center border-b px-3">
              <Command.Input
                placeholder="Search..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-gray-500">
                {emptyMessage}
              </Command.Empty>

              {filteredOptions.map(option => (
                <Command.Item
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300',
                      option.value === value && 'bg-blue-600 border-blue-600',
                    )}
                  >
                    {option.value === value && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>

                  {option.icon}

                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-gray-500">{option.description}</div>
                    )}
                  </div>

                  {option.metadata && (
                    <div className="text-xs text-gray-400">{option.metadata}</div>
                  )}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </div>
      )}
    </div>
  );
}
