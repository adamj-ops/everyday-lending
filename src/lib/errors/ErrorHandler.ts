/**
 * Error Handler
 *
 * Centralized error handling utilities for the application.
 */

import type { ErrorCodeType } from './ErrorCodes';
import { getErrorMessage } from './ErrorCodes';

/**
 * Application error class with error code support
 */
export class AppError extends Error {
  constructor(
    public code: ErrorCodeType,
    message?: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
  ) {
    super(message || getErrorMessage(code).message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        ...getErrorMessage(this.code),
        statusCode: this.statusCode,
      },
    };
  }
}

/**
 * Handle API errors and convert to user-friendly format
 */
export async function handleApiError(response: Response): Promise<never> {
  let errorData: any;

  try {
    errorData = await response.json();
  } catch {
    errorData = { message: response.statusText };
  }

  const code = errorData.error?.code || determineErrorCode(response.status);
  const message = errorData.error?.message || errorData.message;

  throw new AppError(code, message, response.status);
}

/**
 * Determine error code from HTTP status
 */
function determineErrorCode(status: number): ErrorCodeType {
  switch (status) {
    case 401:
      return 'AUTH_001' as ErrorCodeType;
    case 403:
      return 'AUTH_002' as ErrorCodeType;
    case 404:
      return 'LOAN_001' as ErrorCodeType; // Generic not found
    case 400:
      return 'VALIDATION_001' as ErrorCodeType;
    case 503:
      return 'SYSTEM_004' as ErrorCodeType;
    default:
      return 'SYSTEM_003' as ErrorCodeType;
  }
}

/**
 * Format error for display
 */
export function formatError(error: unknown): { title: string; message: string; action: string } {
  if (error instanceof AppError) {
    return getErrorMessage(error.code);
  }

  if (error instanceof Error) {
    return {
      title: 'Error',
      message: error.message,
      action: 'Please try again or contact support.',
    };
  }

  return {
    title: 'Unknown Error',
    message: 'An unknown error occurred.',
    action: 'Please try again or contact support.',
  };
}

/**
 * Check if error is operational (expected) or programming error
 */
export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Log error to console (in development) or error tracking service (in production)
 */
export function logError(error: unknown, context?: Record<string, any>) {
  console.error('Error occurred:', error, context);

  // TODO: Integrate with Sentry or other error tracking service
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(error, { extra: context });
  // }
}

/**
 * Create retry handler for transient errors
 */
export async function createRetryHandler<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      lastError = error;

      // Don't retry on operational errors
      if (error instanceof AppError && error.isOperational) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
  }

  throw lastError;
}
