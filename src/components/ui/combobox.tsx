'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
  value: string;
  label: string;
  subtitle?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  onCreate?: () => void;
  createLabel?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  disabled = false,
  className,
  onCreate,
  createLabel = 'Create new',
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
    || option.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue === value ? '' : selectedValue);
    setOpen(false);
    setSearchQuery('');
  };

  const handleCreate = () => {
    onCreate?.();
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn('w-full justify-between', className)}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <span className={cn('truncate', !selectedOption && 'text-muted-foreground')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select option</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            <div className="max-h-[300px] overflow-y-auto">
              {filteredOptions.length === 0 && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyText}
                </div>
              )}
              {filteredOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                >
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {option.subtitle && (
                      <div className="text-xs text-muted-foreground">{option.subtitle}</div>
                    )}
                  </div>
                  {value === option.value && (
                    <Check className="ml-2 h-4 w-4 text-accent" />
                  )}
                </button>
              ))}
            </div>
            {onCreate && (
              <div className="border-t pt-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleCreate}
                >
                  {createLabel}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

