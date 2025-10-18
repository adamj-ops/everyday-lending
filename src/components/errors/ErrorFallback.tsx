/**
 * Error Fallback Component
 *
 * Reusable error fallback UI for different error scenarios.
 */

'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatError } from '@/lib/errors/ErrorHandler';

type ErrorFallbackProps = {
  error?: Error | unknown;
  resetError?: () => void;
  showHomeButton?: boolean;
  showDetails?: boolean;
};

/**
 * Generic error fallback component
 *
 * @example
 * ```tsx
 * <ErrorFallback
 *   error={error}
 *   resetError={() => reset()}
 *   showHomeButton
 * />
 * ```
 */
export function ErrorFallback({
  error,
  resetError,
  showHomeButton = false,
  showDetails = false,
}: ErrorFallbackProps) {
  const formattedError = error ? formatError(error) : null;

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-red-900">
          {formattedError?.title || 'Something Went Wrong'}
        </h2>

        <p className="mb-2 text-sm text-red-700">
          {formattedError?.message || 'An unexpected error occurred.'}
        </p>

        {formattedError?.action && (
          <p className="mb-4 text-sm font-medium text-red-800">
            {formattedError.action}
          </p>
        )}

        {showDetails && error instanceof Error && (
          <details className="mb-4 text-left">
            <summary className="cursor-pointer text-sm font-medium text-red-800">
              Technical Details
            </summary>
            <div className="mt-2 rounded bg-red-100 p-3 text-xs text-red-900">
              <p className="font-semibold">{error.name}</p>
              <p className="mt-1">{error.message}</p>
              {error.stack && (
                <pre className="mt-2 max-h-40 overflow-auto text-[10px] whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
            </div>
          </details>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {resetError && (
            <Button onClick={resetError} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}

          <Button
            onClick={() => window.location.reload()}
            variant="default"
            size="sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Page
          </Button>

          {showHomeButton && (
            <Button
              onClick={() => (window.location.href = '/')}
              variant="secondary"
              size="sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal error message component (for inline errors)
 */
export function InlineError({ error }: { error: Error | unknown }) {
  const formattedError = formatError(error);

  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-900">{formattedError.title}</h4>
          <p className="mt-1 text-xs text-red-700">{formattedError.message}</p>
          {formattedError.action && (
            <p className="mt-1 text-xs font-medium text-red-800">{formattedError.action}</p>
          )}
        </div>
      </div>
    </div>
  );
}
