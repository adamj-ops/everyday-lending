/**
 * Loading State Component
 *
 * Generic loading state component with timeout handling.
 */

'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type LoadingStateProps = {
  /** Loading message */
  message?: string;

  /** Timeout in milliseconds (default: 30000ms / 30s) */
  timeout?: number;

  /** Callback when timeout is reached */
  onTimeout?: () => void;

  /** Custom className */
  className?: string;

  /** Show retry button after timeout */
  showRetry?: boolean;

  /** Retry callback */
  onRetry?: () => void;
};

export function LoadingState({
  message = 'Loading...',
  timeout = 30000,
  onTimeout,
  className,
  showRetry = true,
  onRetry,
}: LoadingStateProps) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
      if (onTimeout) {
        onTimeout();
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  if (timedOut) {
    return (
      <div
        className={cn('flex flex-col items-center justify-center p-8', className)}
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <p className="mb-2 text-sm font-medium text-gray-900">
            Taking longer than expected...
          </p>
          <p className="mb-4 text-sm text-gray-500">
            The operation is taking longer than usual. Please wait or try again.
          </p>
          {showRetry && onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm">
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center justify-center p-8', className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        <span className="text-sm text-gray-600">{message}</span>
      </div>
    </div>
  );
}

/**
 * Inline loading spinner (smaller, for inline use)
 */
export function InlineLoadingSpinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn('h-4 w-4 animate-spin text-gray-400', className)}
      aria-label="Loading"
    />
  );
}
