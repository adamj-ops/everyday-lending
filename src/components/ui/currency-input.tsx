'use client';

import type React from 'react';
import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string | number;
  onChange?: (value: string) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      // Remove all non-digit characters except decimal point
      const cleaned = input.replace(/[^\d.]/g, '');

      // Ensure only one decimal point
      const parts = cleaned.split('.');
      const formatted = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;

      // Limit to 2 decimal places
      const [whole, decimal] = formatted.split('.');
      const limitedDecimal = decimal ? decimal.slice(0, 2) : decimal;
      const finalValue = decimal !== undefined ? `${whole}.${limitedDecimal}` : whole;

      onChange?.(finalValue);
    };

    const displayValue = value?.toString() || '';

    return (
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
          $
        </span>
        <Input
          ref={ref}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          className={cn('pl-7', className)}
          {...props}
        />
      </div>
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };

