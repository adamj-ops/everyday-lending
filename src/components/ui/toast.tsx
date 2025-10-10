import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'border-green-200 bg-green-50 text-green-900',
        destructive: 'destructive group text-destructive-foreground border-destructive bg-destructive',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type ToastProps = {
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastVariants>;

const Toast = ({ ref, className, variant, onClose, children, ...props }: ToastProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground focus:opacity-100 focus:ring-2 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
Toast.displayName = 'Toast';

const ToastTitle = ({ ref, className, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.RefObject<HTMLHeadingElement | null> }) => {
  return <div ref={ref} className={cn('text-sm font-semibold', className)} {...props} />;
};
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = ({ ref, className, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  return <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />;
};
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastDescription, ToastTitle };
