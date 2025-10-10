import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'border-green-200 bg-green-50 text-green-900',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, onClose, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);
Toast.displayName = 'Toast';

const ToastTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('text-sm font-semibold', className)} {...props} />;
  },
);
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />;
  },
);
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastTitle, ToastDescription };

