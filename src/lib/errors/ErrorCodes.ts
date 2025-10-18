/**
 * Error Codes
 *
 * Centralized error code definitions with user-friendly messages.
 */

export enum ErrorCode {
  // Authentication errors
  AUTH_UNAUTHORIZED = 'AUTH_001',
  AUTH_FORBIDDEN = 'AUTH_002',
  AUTH_SESSION_EXPIRED = 'AUTH_003',
  AUTH_INVALID_CREDENTIALS = 'AUTH_004',

  // Loan errors
  LOAN_NOT_FOUND = 'LOAN_001',
  LOAN_INVALID_STATUS = 'LOAN_002',
  LOAN_AMOUNT_EXCEEDS_LIMIT = 'LOAN_003',
  LOAN_INVALID_TERMS = 'LOAN_004',

  // Borrower errors
  BORROWER_NOT_FOUND = 'BORROWER_001',
  BORROWER_DUPLICATE_EMAIL = 'BORROWER_002',
  BORROWER_HAS_ACTIVE_LOANS = 'BORROWER_003',

  // Lender errors
  LENDER_NOT_FOUND = 'LENDER_001',
  LENDER_INSUFFICIENT_CAPITAL = 'LENDER_002',
  LENDER_DUPLICATE_EMAIL = 'LENDER_003',

  // Property errors
  PROPERTY_NOT_FOUND = 'PROPERTY_001',
  PROPERTY_INVALID_ADDRESS = 'PROPERTY_002',
  PROPERTY_HAS_ACTIVE_LOANS = 'PROPERTY_003',

  // Payment errors
  PAYMENT_NOT_FOUND = 'PAYMENT_001',
  PAYMENT_INSUFFICIENT_FUNDS = 'PAYMENT_002',
  PAYMENT_PROCESSING_FAILED = 'PAYMENT_003',
  PAYMENT_ALREADY_PROCESSED = 'PAYMENT_004',

  // Draw errors
  DRAW_NOT_FOUND = 'DRAW_001',
  DRAW_INVALID_STATUS = 'DRAW_002',
  DRAW_EXCEEDS_AVAILABLE_FUNDS = 'DRAW_003',
  DRAW_INSPECTION_REQUIRED = 'DRAW_004',

  // Validation errors
  VALIDATION_REQUIRED_FIELD = 'VALIDATION_001',
  VALIDATION_INVALID_FORMAT = 'VALIDATION_002',
  VALIDATION_OUT_OF_RANGE = 'VALIDATION_003',

  // System errors
  SYSTEM_DATABASE_ERROR = 'SYSTEM_001',
  SYSTEM_NETWORK_ERROR = 'SYSTEM_002',
  SYSTEM_INTERNAL_ERROR = 'SYSTEM_003',
  SYSTEM_SERVICE_UNAVAILABLE = 'SYSTEM_004',
}

export type ErrorCodeType = `${ErrorCode}`;

/**
 * User-friendly error messages mapped to error codes
 */
export const ERROR_MESSAGES: Record<ErrorCodeType, { title: string; message: string; action: string }> = {
  // Authentication
  [ErrorCode.AUTH_UNAUTHORIZED]: {
    title: 'Authentication Required',
    message: 'You must be logged in to access this resource.',
    action: 'Please log in and try again.',
  },
  [ErrorCode.AUTH_FORBIDDEN]: {
    title: 'Access Denied',
    message: 'You do not have permission to perform this action.',
    action: 'Contact your administrator if you believe this is an error.',
  },
  [ErrorCode.AUTH_SESSION_EXPIRED]: {
    title: 'Session Expired',
    message: 'Your session has expired.',
    action: 'Please log in again to continue.',
  },
  [ErrorCode.AUTH_INVALID_CREDENTIALS]: {
    title: 'Invalid Credentials',
    message: 'The email or password you entered is incorrect.',
    action: 'Please check your credentials and try again.',
  },

  // Loans
  [ErrorCode.LOAN_NOT_FOUND]: {
    title: 'Loan Not Found',
    message: 'The requested loan could not be found.',
    action: 'Please verify the loan ID and try again.',
  },
  [ErrorCode.LOAN_INVALID_STATUS]: {
    title: 'Invalid Loan Status',
    message: 'This operation cannot be performed in the current loan status.',
    action: 'Please check the loan status and try again.',
  },
  [ErrorCode.LOAN_AMOUNT_EXCEEDS_LIMIT]: {
    title: 'Loan Amount Exceeds Limit',
    message: 'The loan amount exceeds the available lending capacity.',
    action: 'Reduce the loan amount or contact a lender for higher capacity.',
  },
  [ErrorCode.LOAN_INVALID_TERMS]: {
    title: 'Invalid Loan Terms',
    message: 'The loan terms provided are invalid or incomplete.',
    action: 'Please review the loan terms and correct any errors.',
  },

  // Borrowers
  [ErrorCode.BORROWER_NOT_FOUND]: {
    title: 'Borrower Not Found',
    message: 'The requested borrower could not be found.',
    action: 'Please verify the borrower ID and try again.',
  },
  [ErrorCode.BORROWER_DUPLICATE_EMAIL]: {
    title: 'Email Already Exists',
    message: 'A borrower with this email address already exists.',
    action: 'Use a different email address or update the existing borrower.',
  },
  [ErrorCode.BORROWER_HAS_ACTIVE_LOANS]: {
    title: 'Borrower Has Active Loans',
    message: 'This borrower cannot be deleted because they have active loans.',
    action: 'Pay off or close all active loans before deleting the borrower.',
  },

  // Lenders
  [ErrorCode.LENDER_NOT_FOUND]: {
    title: 'Lender Not Found',
    message: 'The requested lender could not be found.',
    action: 'Please verify the lender ID and try again.',
  },
  [ErrorCode.LENDER_INSUFFICIENT_CAPITAL]: {
    title: 'Insufficient Capital',
    message: 'The lender does not have sufficient capital for this loan.',
    action: 'Reduce the participation amount or contact the lender.',
  },
  [ErrorCode.LENDER_DUPLICATE_EMAIL]: {
    title: 'Email Already Exists',
    message: 'A lender with this email address already exists.',
    action: 'Use a different email address or update the existing lender.',
  },

  // Properties
  [ErrorCode.PROPERTY_NOT_FOUND]: {
    title: 'Property Not Found',
    message: 'The requested property could not be found.',
    action: 'Please verify the property ID and try again.',
  },
  [ErrorCode.PROPERTY_INVALID_ADDRESS]: {
    title: 'Invalid Address',
    message: 'The property address provided is invalid.',
    action: 'Please enter a valid address and try again.',
  },
  [ErrorCode.PROPERTY_HAS_ACTIVE_LOANS]: {
    title: 'Property Has Active Loans',
    message: 'This property cannot be deleted because it has active loans.',
    action: 'Pay off or close all active loans before deleting the property.',
  },

  // Payments
  [ErrorCode.PAYMENT_NOT_FOUND]: {
    title: 'Payment Not Found',
    message: 'The requested payment could not be found.',
    action: 'Please verify the payment ID and try again.',
  },
  [ErrorCode.PAYMENT_INSUFFICIENT_FUNDS]: {
    title: 'Insufficient Funds',
    message: 'The payment could not be processed due to insufficient funds.',
    action: 'Please verify account balance and try again.',
  },
  [ErrorCode.PAYMENT_PROCESSING_FAILED]: {
    title: 'Payment Processing Failed',
    message: 'The payment could not be processed.',
    action: 'Please try again or contact support if the problem persists.',
  },
  [ErrorCode.PAYMENT_ALREADY_PROCESSED]: {
    title: 'Payment Already Processed',
    message: 'This payment has already been processed.',
    action: 'No further action is required.',
  },

  // Draws
  [ErrorCode.DRAW_NOT_FOUND]: {
    title: 'Draw Not Found',
    message: 'The requested draw could not be found.',
    action: 'Please verify the draw ID and try again.',
  },
  [ErrorCode.DRAW_INVALID_STATUS]: {
    title: 'Invalid Draw Status',
    message: 'This operation cannot be performed in the current draw status.',
    action: 'Please check the draw status and try again.',
  },
  [ErrorCode.DRAW_EXCEEDS_AVAILABLE_FUNDS]: {
    title: 'Exceeds Available Funds',
    message: 'The draw amount exceeds the available funds.',
    action: 'Reduce the draw amount to match available funds.',
  },
  [ErrorCode.DRAW_INSPECTION_REQUIRED]: {
    title: 'Inspection Required',
    message: 'This draw requires an inspection before approval.',
    action: 'Schedule an inspection and try again after completion.',
  },

  // Validation
  [ErrorCode.VALIDATION_REQUIRED_FIELD]: {
    title: 'Required Field',
    message: 'One or more required fields are missing.',
    action: 'Please fill in all required fields and try again.',
  },
  [ErrorCode.VALIDATION_INVALID_FORMAT]: {
    title: 'Invalid Format',
    message: 'One or more fields have an invalid format.',
    action: 'Please check the format and try again.',
  },
  [ErrorCode.VALIDATION_OUT_OF_RANGE]: {
    title: 'Value Out of Range',
    message: 'One or more values are out of acceptable range.',
    action: 'Please adjust the values and try again.',
  },

  // System
  [ErrorCode.SYSTEM_DATABASE_ERROR]: {
    title: 'Database Error',
    message: 'A database error occurred.',
    action: 'Please try again later or contact support.',
  },
  [ErrorCode.SYSTEM_NETWORK_ERROR]: {
    title: 'Network Error',
    message: 'A network error occurred.',
    action: 'Please check your connection and try again.',
  },
  [ErrorCode.SYSTEM_INTERNAL_ERROR]: {
    title: 'Internal Error',
    message: 'An internal server error occurred.',
    action: 'Please try again later or contact support.',
  },
  [ErrorCode.SYSTEM_SERVICE_UNAVAILABLE]: {
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable.',
    action: 'Please try again later.',
  },
};

/**
 * Get user-friendly error message for an error code
 */
export function getErrorMessage(code: ErrorCodeType) {
  return ERROR_MESSAGES[code] || {
    title: 'Unknown Error',
    message: 'An unknown error occurred.',
    action: 'Please try again or contact support.',
  };
}
