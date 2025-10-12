import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-7 w-full rounded border border-[#dcdbdd] bg-white px-3 py-1 text-xs shadow-sm transition-colors',
        'file:border-0 file:bg-transparent file:text-xs file:font-semibold file:text-foreground',
        'placeholder:text-[#b8b9bb]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
