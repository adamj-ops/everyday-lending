import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[10px] border-0 px-[5px] py-0.5 text-xs font-bold whitespace-nowrap transition-colors h-[19px] [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80',
        destructive:
          'bg-destructive text-white [a&]:hover:bg-destructive/90',
        outline:
          'border border-[#dcdbdd] text-foreground bg-background [a&]:hover:bg-neutral-100',
        // Attio-style category tags (from Figma)
        category:
          'bg-neutral-100 text-foreground [a&]:hover:bg-neutral-200',
        success:
          'bg-success-light text-success-dark',
        warning:
          'bg-warning-light text-warning-dark',
        info:
          'bg-info-light text-info-dark',
      },
    },
    defaultVariants: {
      variant: 'category',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'>
  & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
