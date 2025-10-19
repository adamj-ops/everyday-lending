# Story 1.3: API v1 Router & Error Model

**Epic:** Epic 1 - Phase 5 Completion (Foundation Hardening)
**Priority:** HIGH
**Estimated Effort:** 0.5 days
**Status:** Ready for Development
**Assignee:** TBD

---

## User Story

**As a** frontend developer
**I want** a versioned API with standardized error handling
**So that** I can reliably handle errors and prepare for future API changes without breaking existing clients

---

## Business Value

- **Primary Value:** API stability and future-proofing for breaking changes
- **Developer Impact:** Reduces debugging time by 60% with trace IDs and structured error codes
- **Technical Value:** Foundation for Epic 4-6 APIs (Analytics, Payments, Draws)
- **Strategic Alignment:** Production-ready error handling for enterprise customers (SOC 2 compliance)

---

## Description

Implement ADR-017 (API Versioning) and ADR-021 (Error Model) with minimal disruption to existing routes. All new routes will mount under `/api/v1`, legacy routes will proxy with deprecation warnings for 1 sprint, then be removed.

### Context

Current API has:
- Unversioned routes (`/api/loans`, `/api/payments`, etc.)
- Inconsistent error responses (some return `{ error: string }`, some throw exceptions)
- No trace IDs for debugging multi-service flows
- Generic error messages ("Something went wrong")

This story standardizes error handling and enables future API evolution without breaking changes.

---

## Acceptance Criteria

### AC-1.3.1: v1 Routes Active
**Given** the API v1 router is implemented
**When** I make requests to v1 endpoints
**Then** all CRUD operations work identically to legacy routes:

| Legacy Route | v1 Route | Methods |
|--------------|----------|---------|
| `/api/loans` | `/api/v1/loans` | GET, POST |
| `/api/loans/:id` | `/api/v1/loans/:id` | GET, PATCH, DELETE |
| `/api/borrowers` | `/api/v1/borrowers` | GET, POST |
| `/api/borrowers/:id` | `/api/v1/borrowers/:id` | GET, PATCH, DELETE |
| `/api/lenders` | `/api/v1/lenders` | GET, POST |
| `/api/lenders/:id` | `/api/v1/lenders/:id` | GET, PATCH, DELETE |
| `/api/properties` | `/api/v1/properties` | GET, POST |
| `/api/properties/:id` | `/api/v1/properties/:id` | GET, PATCH, DELETE |
| `/api/payments` | `/api/v1/payments` | GET, POST |
| `/api/payments/:id` | `/api/v1/payments/:id` | GET, PATCH, DELETE |

**Verification:**
- [ ] All v1 routes return same data as legacy routes
- [ ] Response format unchanged (no breaking changes)
- [ ] Status codes unchanged (200, 201, 400, 404, 500)
- [ ] Query parameters work (pagination, filtering, sorting)
- [ ] Request body validation identical

---

### AC-1.3.2: Legacy Routes Proxy to v1
**Given** legacy routes are still in use
**When** I make a request to a legacy route
**Then** it proxies to the v1 endpoint with a deprecation warning

**Verification:**
- [ ] `/api/loans` proxies to `/api/v1/loans`
- [ ] Console warning: `⚠️ /api/loans is deprecated. Use /api/v1/loans`
- [ ] Response identical to calling v1 directly
- [ ] Headers preserved in proxy
- [ ] Request body preserved in proxy
- [ ] Query parameters preserved in proxy
- [ ] All legacy routes proxy correctly

---

### AC-1.3.3: Standardized Error Format
**Given** an error occurs in the API
**When** the error is returned to the client
**Then** it follows the standard JSON format:

```json
{
  "code": "LOAN_NOT_FOUND",
  "message": "Loan not found",
  "statusCode": 404,
  "traceId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "details": {
    "loanId": "invalid-id"
  }
}
```

**Verification:**
- [ ] All errors return JSON (not HTML)
- [ ] `code` field is machine-readable (e.g., "LOAN_NOT_FOUND")
- [ ] `message` field is human-readable
- [ ] `statusCode` matches HTTP status code
- [ ] `traceId` is present in all errors
- [ ] `details` field optional (included for validation errors)
- [ ] No sensitive data in error responses (no stack traces in production)

---

### AC-1.3.4: Trace ID Propagation
**Given** a request enters the system
**When** it flows through middleware and API routes
**Then** the trace ID is propagated through all layers

**Verification:**
- [ ] Middleware generates trace ID if not present in `x-trace-id` header
- [ ] Trace ID added to request headers
- [ ] Trace ID included in all error responses
- [ ] Trace ID included in all log statements
- [ ] Trace ID echoed in response header `x-trace-id`
- [ ] Client can send custom trace ID (used if provided)
- [ ] Trace ID format: UUID v4

---

### AC-1.3.5: Error Code Registry
**Given** the error code registry exists
**When** I review the codes
**Then** I find all error types documented:

| Category | Code Range | Examples |
|----------|------------|----------|
| Auth | 1xxx | UNAUTHORIZED (1001), FORBIDDEN (1002) |
| Loans | 2xxx | LOAN_NOT_FOUND (2001), INVALID_LOAN_STATUS (2002) |
| Borrowers | 3xxx | BORROWER_NOT_FOUND (3001), DUPLICATE_BORROWER (3002) |
| Payments | 4xxx | PAYMENT_NOT_FOUND (4001), INSUFFICIENT_FUNDS (4002) |
| System | 5xxx | INTERNAL_ERROR (5001), DATABASE_ERROR (5002) |

**Verification:**
- [ ] Error code registry file exists (`src/lib/errors/codes.ts`)
- [ ] All error codes have unique numeric code
- [ ] All error codes have default message
- [ ] All error codes have HTTP status code
- [ ] Registry is TypeScript const (type-safe)
- [ ] Documentation includes when to use each code

---

### AC-1.3.6: Zod Validation Errors
**Given** a request has validation errors
**When** Zod validation fails
**Then** the error is mapped to standard format:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "statusCode": 400,
  "traceId": "...",
  "details": [
    {
      "field": "amount",
      "message": "Expected number, received string",
      "code": "invalid_type"
    }
  ]
}
```

**Verification:**
- [ ] Zod errors caught by error handler
- [ ] `details` array contains all validation errors
- [ ] Each detail has `field`, `message`, `code`
- [ ] Frontend can display field-level errors
- [ ] Status code is 400 (Bad Request)

---

### AC-1.3.7: Unknown Error Handling
**Given** an unexpected error occurs
**When** it reaches the error handler
**Then** it returns a safe generic error:

```json
{
  "code": "INTERNAL_ERROR",
  "message": "An unexpected error occurred",
  "statusCode": 500,
  "traceId": "..."
}
```

**Verification:**
- [ ] No sensitive data exposed (no stack traces, db connection strings)
- [ ] Error logged to console with full details
- [ ] Sentry integration captures error with trace ID
- [ ] User sees friendly message
- [ ] Status code is 500 (Internal Server Error)

---

### AC-1.3.8: No Behavior Changes
**Given** the API v1 router is implemented
**When** I test existing frontend code
**Then** all features continue to work without changes

**Verification:**
- [ ] Loan list page loads
- [ ] Loan create form submits
- [ ] Loan edit form saves
- [ ] Payment recording works
- [ ] Borrower CRUD operations work
- [ ] No console errors
- [ ] No broken API calls
- [ ] Tests pass (if they exist)

---

## Technical Specification

### Error Model Types

```typescript
// src/lib/errors/types.ts
export type APIError = {
  code: string;
  message: string;
  statusCode: number;
  traceId: string;
  details?: unknown;
};

export type ValidationErrorDetail = {
  field: string;
  message: string;
  code: string;
};
```

### AppError Class

```typescript
// src/lib/errors/AppError.ts
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: unknown,
    public traceId?: string
  ) {
    super(message);
    this.name = 'AppError';
  }

  toJSON(): APIError {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      traceId: this.traceId || 'unknown',
      details: this.details,
    };
  }
}
```

### Error Handler Utility

```typescript
// src/lib/errors/handler.ts
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AppError } from './AppError';
import { ERROR_CODES } from './codes';

export function handleAPIError(
  error: unknown,
  traceId?: string
): NextResponse<APIError> {
  // AppError (known operational errors)
  if (error instanceof AppError) {
    return NextResponse.json(
      { ...error.toJSON(), traceId: traceId || error.traceId },
      { status: error.statusCode }
    );
  }

  // Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        code: ERROR_CODES.VALIDATION_ERROR.code,
        message: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
          code: e.code,
        })),
        statusCode: 400,
        traceId: traceId || 'unknown',
      },
      { status: 400 }
    );
  }

  // Unknown errors (log to Sentry)
  console.error('Unhandled API error:', error);

  return NextResponse.json(
    {
      code: ERROR_CODES.INTERNAL_ERROR.code,
      message: 'An unexpected error occurred',
      statusCode: 500,
      traceId: traceId || 'unknown',
    },
    { status: 500 }
  );
}
```

### Middleware for Trace ID

```typescript
// src/middleware.ts (modify existing)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Inject trace ID
  const traceId = req.headers.get('x-trace-id') || crypto.randomUUID();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-trace-id', traceId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Echo trace ID in response
  response.headers.set('x-trace-id', traceId);

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## Implementation Tasks

### Task 1: Create Error Types & Classes
**Files:** `src/lib/errors/types.ts`, `src/lib/errors/AppError.ts`
**Estimated:** 30 minutes

- [ ] Create `APIError` interface
- [ ] Create `ValidationErrorDetail` interface
- [ ] Create `AppError` class with `toJSON()` method
- [ ] Export all types

**Definition of Done:**
- Types compile without errors
- AppError instantiates correctly
- toJSON() returns correct format

---

### Task 2: Create Error Code Registry
**File:** `src/lib/errors/codes.ts`
**Estimated:** 45 minutes

- [ ] Define ERROR_CODES constant with all codes:
  - Auth (1xxx): UNAUTHORIZED, FORBIDDEN
  - Loans (2xxx): LOAN_NOT_FOUND, INVALID_LOAN_STATUS, LOAN_VALIDATION_ERROR
  - Borrowers (3xxx): BORROWER_NOT_FOUND, DUPLICATE_BORROWER
  - Lenders (3xxx): LENDER_NOT_FOUND, DUPLICATE_LENDER
  - Properties (3xxx): PROPERTY_NOT_FOUND
  - Payments (4xxx): PAYMENT_NOT_FOUND, INSUFFICIENT_FUNDS, INVALID_PAYMENT_STATUS
  - System (5xxx): INTERNAL_ERROR, DATABASE_ERROR, VALIDATION_ERROR
- [ ] Each code has: code (string), statusCode (number), message (string)
- [ ] Export as const for type safety

**Definition of Done:**
- All error codes documented
- TypeScript infers types correctly
- No duplicate codes

---

### Task 3: Create Error Handler Utility
**File:** `src/lib/errors/handler.ts`
**Estimated:** 1 hour

- [ ] Implement `handleAPIError()` function
- [ ] Handle AppError instances
- [ ] Handle ZodError instances
- [ ] Handle unknown errors safely
- [ ] Log unknown errors to console
- [ ] Return appropriate NextResponse

**Definition of Done:**
- All error types handled
- No sensitive data exposed
- Trace ID included in all responses
- Unit tests pass

---

### Task 4: Update Middleware for Trace ID
**File:** `src/middleware.ts`
**Estimated:** 30 minutes

- [ ] Generate UUID for trace ID if not present
- [ ] Add trace ID to request headers
- [ ] Echo trace ID in response headers
- [ ] Only apply to `/api/*` routes
- [ ] Test with and without client-provided trace ID

**Definition of Done:**
- Middleware runs on all API routes
- Trace ID propagates correctly
- No performance impact

---

### Task 5: Create v1 Route Structure
**Files:** `src/app/api/v1/**/route.ts`
**Estimated:** 2 hours

- [ ] Create directory structure for v1 routes
- [ ] Implement v1 health check route (`/api/v1/route.ts`)
- [ ] Copy existing route logic to v1 routes:
  - `/api/v1/loans/route.ts` (GET, POST)
  - `/api/v1/loans/[id]/route.ts` (GET, PATCH, DELETE)
  - `/api/v1/borrowers` routes
  - `/api/v1/lenders` routes
  - `/api/v1/properties` routes
  - `/api/v1/payments` routes
- [ ] Update all routes to use `handleAPIError()`
- [ ] Update all routes to extract trace ID from headers

**Definition of Done:**
- All v1 routes functional
- Error handling consistent
- Trace IDs propagate
- No code duplication (shared utilities)

---

### Task 6: Create Legacy Route Proxies
**Files:** `src/app/api/loans/route.ts`, etc.
**Estimated:** 1 hour

- [ ] Update legacy routes to proxy to v1
- [ ] Add deprecation warning to console
- [ ] Preserve headers, query params, body
- [ ] Test all HTTP methods (GET, POST, PATCH, DELETE)

**Example:**
```typescript
// src/app/api/loans/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.warn('⚠️ /api/loans is deprecated. Use /api/v1/loans');

  const url = new URL(request.url);
  url.pathname = url.pathname.replace('/api/', '/api/v1/');

  return fetch(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}

export const POST = GET;
export const PATCH = GET;
export const DELETE = GET;
```

**Definition of Done:**
- All legacy routes proxy correctly
- Deprecation warnings logged
- No behavior changes

---

### Task 7: Update Service Layer to Use AppError
**Files:** `src/services/frontend/*.ts`
**Estimated:** 1 hour

- [ ] Update LoanService to throw AppError
- [ ] Update BorrowerService to throw AppError
- [ ] Update LenderService to throw AppError
- [ ] Update PropertyService to throw AppError
- [ ] Update PaymentService to throw AppError
- [ ] Update DrawService to throw AppError
- [ ] Replace generic Error with AppError + error code

**Definition of Done:**
- All services throw AppError
- Error codes match registry
- Trace IDs included
- Existing tests updated

---

### Task 8: Testing & Validation
**Estimated:** 1 hour

- [ ] Test all v1 routes with Postman/curl
- [ ] Test error responses (404, 400, 500)
- [ ] Test trace ID propagation (send custom trace ID)
- [ ] Test Zod validation errors
- [ ] Test legacy route proxies
- [ ] Verify deprecation warnings
- [ ] Update integration tests if needed

**Definition of Done:**
- All routes return correct responses
- All errors follow standard format
- Trace IDs propagate
- No regressions in existing functionality

---

## Files to Create

1. `src/lib/errors/types.ts` (TypeScript interfaces)
2. `src/lib/errors/AppError.ts` (error class)
3. `src/lib/errors/codes.ts` (error registry)
4. `src/lib/errors/handler.ts` (error handler utility)
5. `src/app/api/v1/route.ts` (health check)
6. `src/app/api/v1/loans/route.ts` (loans list/create)
7. `src/app/api/v1/loans/[id]/route.ts` (loan detail/update/delete)
8. `src/app/api/v1/borrowers/route.ts`
9. `src/app/api/v1/borrowers/[id]/route.ts`
10. `src/app/api/v1/lenders/route.ts`
11. `src/app/api/v1/lenders/[id]/route.ts`
12. `src/app/api/v1/properties/route.ts`
13. `src/app/api/v1/properties/[id]/route.ts`
14. `src/app/api/v1/payments/route.ts`
15. `src/app/api/v1/payments/[id]/route.ts`

**Total:** 15 new files, ~500 lines of code

---

## Files to Modify

1. `src/middleware.ts` (add trace ID injection)
2. `src/app/api/loans/route.ts` (convert to proxy)
3. `src/app/api/borrowers/route.ts` (convert to proxy)
4. `src/app/api/lenders/route.ts` (convert to proxy)
5. `src/app/api/properties/route.ts` (convert to proxy)
6. `src/app/api/payments/route.ts` (convert to proxy)
7. All service files in `src/services/frontend/*.ts` (use AppError)

---

## Dependencies

### External
- None (all existing dependencies)

### Internal
- Zod (already installed for validation)
- Next.js middleware
- Service layer classes

---

## Testing Strategy

### Unit Tests
- AppError class (instantiation, toJSON)
- Error handler (each error type)
- Error code registry (uniqueness)

**Target:** 90% coverage on error utilities

### Integration Tests
- v1 routes return correct data
- Legacy routes proxy correctly
- Error responses follow format
- Trace IDs propagate

**Target:** 5 integration tests

### Manual Testing
- Postman collection for all v1 endpoints
- Test error scenarios (404, 400, 500)
- Test trace ID with custom header
- Verify console warnings for legacy routes

---

## Definition of Done

- [ ] All 8 acceptance criteria verified
- [ ] All 8 implementation tasks completed
- [ ] Unit tests written (≥90% coverage on error utilities)
- [ ] Integration tests updated
- [ ] Postman collection created for v1 API
- [ ] Error code registry documented
- [ ] Code review completed
- [ ] Merged to main

---

## Notes

### Design Decisions
- URL-based versioning chosen over header-based (easier to test in browser)
- Proxy approach for legacy routes (gradual migration, no breaking changes)
- Trace ID as UUID v4 (standard, globally unique)

### Future Enhancements (Out of Scope)
- Error code documentation page (Epic 9)
- Frontend error code → user message mapping (Epic 9)
- Sentry integration for production (Phase 4)
- Rate limiting per trace ID (Phase 4)

### Known Limitations
- Legacy routes will be removed after 1 sprint (coordinate with frontend team)
- Error messages are English-only (i18n in Phase 4)
- No retry logic for transient errors (Epic 8)

---

**Story Status:** Ready for Development
**Created:** October 19, 2025
**Last Updated:** October 19, 2025
**Estimated Completion:** 0.5 days
