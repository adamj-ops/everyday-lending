/**
 * Error Boundary Component
 *
 * Catches React errors and provides graceful fallback UI.
 * Integrates with Sentry for error reporting.
 */

'use client';

import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import React, { Component } from 'react';
import { Button } from '@/components/ui/button';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

/**
 * Error Boundary that catches errors in child components
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Error caught by Error Boundary:', error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Integrate with Sentry
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack,
    //     },
    //   },
    // });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  override render() {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
          <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-red-900">
              Something went wrong
            </h2>

            <p className="mb-4 text-sm text-red-700">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>

            {this.props.showDetails && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-sm font-medium text-red-800">
                  Error Details
                </summary>
                <div className="mt-2 rounded bg-red-100 p-3 text-xs text-red-900">
                  <p className="font-semibold">{this.state.error.name}</p>
                  <p className="mt-1">{this.state.error.message}</p>
                  {this.state.errorInfo && (
                    <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                onClick={this.handleReset}
                variant="outline"
                size="sm"
              >
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="default"
                size="sm"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
