# Sprint 1 Technical Specification

**Epic 1: Phase 5 Completion (Foundation Hardening)**
**Epic 2: Test Infrastructure**

**Author:** BMAD Architect + Product Owner
**Date:** October 19, 2025
**Sprint Duration:** October 18-31, 2025 (13 days)
**Status:** Ready for Implementation

---

## Executive Summary

Sprint 1 completes the 13% remaining from Phase 5 and establishes comprehensive test infrastructure before beginning Epic 3 (Analytics MVP). This "foundation hardening" sprint ensures:

1. **User-facing completeness**: Loan Detail View fully functional and mobile-responsive
2. **API stability**: v1 router with standardized error model
3. **Quality confidence**: 80% test coverage with E2E critical paths
4. **CI/CD gates**: Automated checks preventing regressions

**Key Metrics:**
- 6 user stories (1.1 - 1.6)
- ~2,500 lines of code (implementation + tests)
- 80% unit test coverage target
- 3 E2E flows implemented
- Zero critical linting errors maintained

---

## Epic 1: Phase 5 Completion

### Story 1.1: Loan Detail View Enhancement

**Priority:** HIGH
**Estimated Effort:** 1 day
**Business Value:** Completes user-facing loan management workflow

#### Objectives
Create comprehensive loan detail page by composing existing Phase 5 components into unified dashboard experience.

#### Component Composition Strategy

**1. Page Structure**
```tsx
// /src/app/[locale]/loans/[id]/page.tsx
<LoanDetailDashboard loanId={params.id}>
  <Tabs defaultValue="overview">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="payments">Payments</TabsTrigger>
      <TabsTrigger value="documents">Documents</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
    </TabsList>

    <TabsContent value="overview">
      <LoanOverview loan={loan} />
      <PaymentSchedule loan={loan} />
      <ParticipationBreakdown loan={loan} />
    </TabsContent>

    <TabsContent value="payments">
      <AmortizationTable loan={loan} schedule={schedule} />
      <PaymentTimeline loan={loan} />
    </TabsContent>

    <TabsContent value="documents">
      <DocumentLibrary loanId={loan.id} />
    </TabsContent>

    <TabsContent value="activity">
      <LoanStatusTimeline loan={loan} />
      <ActivityFeed loanId={loan.id} />
    </TabsContent>
  </Tabs>
</LoanDetailDashboard>;
```

**2. Component Dependencies**

**Existing Components (Phase 5):**
- `PaymentSchedule` - src/components/loans/PaymentSchedule.tsx
- `AmortizationTable` - src/components/loans/AmortizationTable.tsx
- `LoanStatusBadge` - src/components/loans/LoanStatusBadge.tsx
- `LoanStatusTimeline` - src/components/loans/LoanStatusTimeline.tsx

**New Components Required:**
- `LoanDetailDashboard` - Container with layout
- `LoanOverview` - Summary metrics + key details
- `ParticipationBreakdown` - Lender participation display
- `PaymentTimeline` - Visual payment history
- `DocumentLibrary` - File upload/download (placeholder for MVP)
- `ActivityFeed` - Audit log display (placeholder for MVP)

#### Data Flow

```typescript
// 1. Fetch loan with relationships
const { data: loan } = await supabase
  .from('loans')
  .select(`
    *,
    borrower:borrowers(*),
    property:properties(*),
    participations:loan_participations(*, lender:lenders(*)),
    payments:payments(*),
    draws:draws(*),
    status_history:loan_status_audit(*)
  `)
  .eq('id', loanId)
  .single();

// 2. Calculate amortization schedule (client-side)
const schedule = generateAmortizationSchedule(loan);

// 3. Pass to composed components
<LoanOverview loan={loan} schedule={schedule} />
```

#### Responsive Breakpoints

| Breakpoint | Layout | Tabs | Sidepanel |
|------------|--------|------|-----------|
| **375px** (Mobile) | Single column, full width | Horizontal scroll | Hidden |
| **768px** (Tablet) | Single column, padded | Full width | Hidden |
| **1024px** (Desktop) | Two column (8:4 grid) | Left column | Right sidepanel |
| **1440px** (Wide) | Two column (9:3 grid) | Left column | Right sidepanel |

**Mobile-specific adjustments:**
- TabsList scrolls horizontally (no wrap)
- Tables switch to card view (vertical layout)
- Sidepanel content moves to bottom sheet modal

#### Accessibility Requirements

- **Keyboard navigation**: Tab through overview → tabs → content
- **ARIA labels**: `role="tabpanel"` on tab content, `aria-labelledby` on sections
- **Focus management**: Focus tab content on tab change
- **Screen reader**: Announce tab selection
- **Target**: Axe DevTools score ≥90

#### Acceptance Criteria

- [x] AC-1.1.1: Loan detail page loads loan data + relationships in single query
- [x] AC-1.1.2: Overview tab shows loan summary, payment schedule, participation breakdown
- [x] AC-1.1.3: Payments tab shows amortization table and payment timeline
- [x] AC-1.1.4: Documents tab shows placeholder "Coming Soon" message
- [x] AC-1.1.5: Activity tab shows status timeline and placeholder activity feed
- [x] AC-1.1.6: Page is responsive at 375px, 768px, 1024px breakpoints
- [x] AC-1.1.7: Axe DevTools accessibility score ≥90
- [x] AC-1.1.8: Loading states use TableSkeleton/CardSkeleton from Phase 5
- [x] AC-1.1.9: Error states use ErrorBoundary from Phase 5

#### Implementation Notes

**Files to Create:**
- `src/components/loans/LoanDetailDashboard.tsx` (container)
- `src/components/loans/LoanOverview.tsx` (summary metrics)
- `src/components/loans/ParticipationBreakdown.tsx` (lender table)
- `src/components/loans/PaymentTimeline.tsx` (visual timeline)
- `src/app/[locale]/loans/[id]/page.tsx` (route handler)

**Files to Modify:**
- None (pure composition, no changes to existing components)

**Estimated LOC:** ~600 lines (components + page)

---

### Story 1.2: Mobile Responsiveness Foundation

**Priority:** HIGH
**Estimated Effort:** 1 day
**Business Value:** Enables mobile access, sets patterns for Epic 5 (Inspector App)

#### Objectives
Establish responsive design patterns that will be reused in Epic 5 (Construction Draw Inspector mobile app).

#### Responsive Patterns to Implement

**1. Sidebar Navigation**

**Desktop (≥1024px):**
```tsx
<aside className="fixed top-0 left-0 h-screen w-64 border-r bg-card">
  <SidebarNav />
</aside>;
```

**Mobile (<768px):**
```tsx
<Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
  <SheetTrigger>
    <Button variant="ghost" size="icon">
      <Menu className="h-6 w-6" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-64">
    <SidebarNav onItemClick={() => setMobileNavOpen(false)} />
  </SheetContent>
</Sheet>;
```

**Implementation:**
- Create `MobileNav.tsx` component
- Add hamburger menu button (top-left, 44x44px touch target)
- Shadcn Sheet component for slide-in navigation
- Auto-close on navigation

**2. Table Overflow Strategy**

**Desktop:**
- Native table with horizontal scroll if needed
- Sticky first column (loan number/borrower name)
- All columns visible

**Mobile:**
- Switch to card view for <768px
- Each row becomes a Card component
- Key fields at top, secondary in collapsed section

```tsx
// Example: Loans table on mobile
<div className="space-y-2 md:hidden">
  {loans.map(loan => (
    <Card key={loan.id}>
      <CardHeader>
        <CardTitle>{loan.borrower.name}</CardTitle>
        <CardDescription>{loan.property.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="font-semibold">{formatCurrency(loan.amount)}</span>
        </div>
        <LoanStatusBadge status={loan.status} />
      </CardContent>
    </Card>
  ))}
</div>;
```

**3. Form Field Stacking**

**Desktop (≥768px):**
- Two-column layout for related fields
- Three-column for short fields (zip, state)

**Mobile (<768px):**
- Single column
- Full-width inputs
- Reduced vertical padding

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <FormField name="firstName" />
  <FormField name="lastName" />
</div>;
```

**4. Touch Target Sizing**

All interactive elements must meet 44x44px minimum:
- Buttons: `className="h-11 px-4"` (44px height)
- Icon buttons: `size="icon"` (44x44px)
- Table row tap areas: `className="min-h-[44px]"`
- Checkbox/radio: `className="h-6 w-6"` (24px with 10px padding = 44px)

#### Container Query Strategy

Use Tailwind container queries for component-level responsiveness:

```tsx
// Enable in tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      containers: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ]
}

// Usage in components
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
    {/* Responsive based on container, not viewport */}
  </div>
</div>
```

#### Acceptance Criteria

- [x] AC-1.2.1: Sidebar collapses to hamburger menu at <768px
- [x] AC-1.2.2: All data tables switch to card view at <768px
- [x] AC-1.2.3: Form fields stack to single column at <768px
- [x] AC-1.2.4: All touch targets are ≥44x44px
- [x] AC-1.2.5: Tested on iPhone 14 (390px), iPad (768px), desktop (1024px+)
- [x] AC-1.2.6: No horizontal scroll on any page at 375px width
- [x] AC-1.2.7: Navigation persists scroll position on mobile
- [x] AC-1.2.8: Patterns documented in Storybook for Epic 5 reuse

#### Implementation Notes

**Files to Create:**
- `src/components/layout/MobileNav.tsx` (mobile navigation)
- `src/components/layout/ResponsiveLayout.tsx` (layout wrapper)
- `src/hooks/useMediaQuery.ts` (breakpoint hook)

**Files to Modify:**
- `src/components/ui/DataTable.tsx` (add card view mode)
- `src/app/[locale]/layout.tsx` (use ResponsiveLayout)
- `tailwind.config.ts` (add container queries plugin)

**Dependencies:**
```bash
npm install @tailwindcss/container-queries
```

**Estimated LOC:** ~400 lines

---

### Story 1.3: API v1 Router & Error Model

**Priority:** HIGH
**Estimated Effort:** 0.5 days
**Business Value:** API stability and future-proofing

#### Objectives
Implement ADR-017 (API Versioning) and ADR-021 (Error Model) with minimal disruption to existing routes.

#### API v1 Router Structure

**Directory Structure:**
```
src/app/api/
  v1/
    route.ts                    # Health check + version info
    loans/
      route.ts                  # GET /api/v1/loans, POST /api/v1/loans
      [id]/
        route.ts                # GET /api/v1/loans/:id, PATCH, DELETE
    borrowers/
      route.ts                  # GET /api/v1/borrowers, POST
      [id]/route.ts
    lenders/
      route.ts
      [id]/route.ts
    properties/
      route.ts
      [id]/route.ts
    payments/
      route.ts
      [id]/route.ts

  # Legacy routes (proxy to v1 with deprecation warning)
  loans/route.ts                # Proxies to /api/v1/loans
  borrowers/route.ts
  ...
```

#### Error Model Implementation

**1. Error Response Format**

```typescript
// src/lib/errors/types.ts
export type APIError = {
  code: string; // e.g., "LOAN_NOT_FOUND"
  message: string; // Human-readable message
  details?: unknown; // Optional context (validation errors, etc.)
  traceId: string; // Correlation ID from x-trace-id header
  statusCode: number; // HTTP status code
};

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
      details: this.details,
      traceId: this.traceId || 'unknown',
    };
  }
}
```

**2. Error Code Registry**

```typescript
// src/lib/errors/codes.ts
export const ERROR_CODES = {
  // Auth (1xxx)
  UNAUTHORIZED: { code: 'UNAUTHORIZED', statusCode: 401, message: 'Authentication required' },
  FORBIDDEN: { code: 'FORBIDDEN', statusCode: 403, message: 'Insufficient permissions' },

  // Loans (2xxx)
  LOAN_NOT_FOUND: { code: 'LOAN_NOT_FOUND', statusCode: 404, message: 'Loan not found' },
  INVALID_LOAN_STATUS: { code: 'INVALID_LOAN_STATUS', statusCode: 400, message: 'Invalid loan status transition' },
  LOAN_VALIDATION_ERROR: { code: 'LOAN_VALIDATION_ERROR', statusCode: 400, message: 'Loan validation failed' },

  // Borrowers (3xxx)
  BORROWER_NOT_FOUND: { code: 'BORROWER_NOT_FOUND', statusCode: 404, message: 'Borrower not found' },
  DUPLICATE_BORROWER: { code: 'DUPLICATE_BORROWER', statusCode: 409, message: 'Borrower already exists' },

  // Payments (4xxx)
  PAYMENT_NOT_FOUND: { code: 'PAYMENT_NOT_FOUND', statusCode: 404, message: 'Payment not found' },
  INSUFFICIENT_FUNDS: { code: 'INSUFFICIENT_FUNDS', statusCode: 402, message: 'Insufficient funds' },

  // System (5xxx)
  INTERNAL_ERROR: { code: 'INTERNAL_ERROR', statusCode: 500, message: 'Internal server error' },
  DATABASE_ERROR: { code: 'DATABASE_ERROR', statusCode: 500, message: 'Database operation failed' },
  VALIDATION_ERROR: { code: 'VALIDATION_ERROR', statusCode: 400, message: 'Validation error' },
} as const;
```

**3. Trace ID Middleware**

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
  matcher: '/api/:path*', // Only API routes
};
```

**4. Error Handler Utility**

```typescript
// src/lib/errors/handler.ts
import { NextResponse } from 'next/server';
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
        details: error.errors,
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

**5. Example v1 Route Implementation**

```typescript
// src/app/api/v1/loans/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ERROR_CODES } from '@/lib/errors/codes';
import { handleAPIError } from '@/lib/errors/handler';
import { LoanService } from '@/services/frontend/LoanService';

const loanService = new LoanService();

export async function GET(request: NextRequest) {
  const traceId = request.headers.get('x-trace-id') || 'unknown';

  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '20');

    const loans = await loanService.getLoans({ page, limit });

    return NextResponse.json(loans, {
      headers: { 'x-trace-id': traceId },
    });
  } catch (error) {
    return handleAPIError(error, traceId);
  }
}

export async function POST(request: NextRequest) {
  const traceId = request.headers.get('x-trace-id') || 'unknown';

  try {
    const body = await request.json();
    const loan = await loanService.createLoan(body);

    return NextResponse.json(loan, {
      status: 201,
      headers: { 'x-trace-id': traceId },
    });
  } catch (error) {
    return handleAPIError(error, traceId);
  }
}
```

**6. Legacy Route Proxy**

```typescript
// src/app/api/loans/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.warn('⚠️ /api/loans is deprecated. Use /api/v1/loans instead.');

  // Proxy to v1
  const url = new URL(request.url);
  url.pathname = url.pathname.replace('/api/', '/api/v1/');

  return fetch(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}

export const POST = GET; // Same for all methods
export const PATCH = GET;
export const DELETE = GET;
```

#### Acceptance Criteria

- [x] AC-1.3.1: All routes available under `/api/v1` prefix
- [x] AC-1.3.2: Legacy routes proxy to v1 with deprecation warning
- [x] AC-1.3.3: All errors return standardized JSON format with trace ID
- [x] AC-1.3.4: Trace IDs propagate from request to response
- [x] AC-1.3.5: Error codes documented in ERROR_CODES registry
- [x] AC-1.3.6: Zod validation errors map to VALIDATION_ERROR
- [x] AC-1.3.7: Unknown errors log to console and return INTERNAL_ERROR
- [x] AC-1.3.8: No behavior changes to existing routes (pure refactor)

#### Implementation Notes

**Files to Create:**
- `src/lib/errors/types.ts` (TypeScript interfaces)
- `src/lib/errors/AppError.ts` (error class)
- `src/lib/errors/codes.ts` (error registry)
- `src/lib/errors/handler.ts` (error handler utility)
- `src/app/api/v1/**/*.ts` (all v1 routes)

**Files to Modify:**
- `src/middleware.ts` (add trace ID injection)
- `src/app/api/**/route.ts` (convert to proxies)

**Estimated LOC:** ~500 lines

---

## Epic 2: Test Infrastructure

### Story 1.4: Vitest Configuration & Service Tests

**Priority:** HIGH
**Estimated Effort:** 2 days
**Business Value:** Prevents regressions, enables confident refactoring

#### Objectives
Establish unit testing infrastructure with 80% coverage on critical business logic.

#### Vitest Configuration

```typescript
import path from 'node:path';
import react from '@vitejs/plugin-react';
// vitest.config.mts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/app/**/layout.tsx',
        'src/app/**/page.tsx', // Tested via E2E
        'src/types/**',
      ],
      // Coverage thresholds (BLOCKING in CI)
      thresholds: {
        global: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
        // Changed files must have 90%
        perFile: true,
      },
    },
    // Performance
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### Test Setup File

```typescript
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
// tests/setup.ts
import '@testing-library/jest-dom';

// Auto cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
```

#### Service Layer Tests

**Test Coverage Targets:**

| Service | Functions | Test Cases | Coverage |
|---------|-----------|------------|----------|
| LoanService | 12 | 45 | ≥85% |
| BorrowerService | 8 | 24 | ≥85% |
| LenderService | 8 | 24 | ≥85% |
| PropertyService | 8 | 24 | ≥85% |
| PaymentService | 10 | 36 | ≥85% |
| DrawService | 10 | 36 | ≥85% |

**Example Test File:**

```typescript
// tests/unit/services/LoanService.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '@/lib/errors/AppError';
import { ERROR_CODES } from '@/lib/errors/codes';
import { LoanService } from '@/services/frontend/LoanService';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(() => {
    service = new LoanService();
    // Mock fetch
    global.fetch = vi.fn();
  });

  describe('getLoans', () => {
    it('should fetch loans with pagination', async () => {
      const mockLoans = [
        { id: '1', amount: 250000, borrower: { name: 'John Doe' } },
        { id: '2', amount: 350000, borrower: { name: 'Jane Smith' } },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockLoans, total: 2 }),
      });

      const result = await service.getLoans({ page: 1, limit: 20 });

      expect(result.data).toEqual(mockLoans);
      expect(result.total).toBe(2);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v1/loans?page=1&limit=20',
        expect.any(Object)
      );
    });

    it('should throw AppError on 404', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({
          code: 'LOAN_NOT_FOUND',
          message: 'Loan not found',
        }),
      });

      await expect(service.getLoan('invalid-id')).rejects.toThrow(AppError);
    });

    it('should handle network errors', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(service.getLoans()).rejects.toThrow('Network error');
    });
  });

  describe('createLoan', () => {
    it('should create loan and return with ID', async () => {
      const newLoan = { amount: 250000, borrowerId: 'borrower-1' };
      const createdLoan = { id: 'loan-1', ...newLoan };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => createdLoan,
      });

      const result = await service.createLoan(newLoan);

      expect(result).toEqual(createdLoan);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v1/loans',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newLoan),
        })
      );
    });

    it('should throw on validation error', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          code: 'VALIDATION_ERROR',
          details: [{ field: 'amount', message: 'Required' }],
        }),
      });

      await expect(service.createLoan({})).rejects.toThrow(AppError);
    });
  });
});
```

#### Calculation Tests

**Amortization Calculator:**

```typescript
// tests/unit/calculations/amortization.test.ts
import { describe, expect, it } from 'vitest';
import {
  calculateMonthlyPayment,
  calculatePayoffAmount,
  generateAmortizationSchedule,
} from '@/lib/calculations/amortization';

describe('Amortization Calculations', () => {
  describe('calculateMonthlyPayment', () => {
    it('should calculate payment for fully amortizing loan', () => {
      const payment = calculateMonthlyPayment({
        principal: 250000,
        annualRate: 0.12,
        termMonths: 12,
        structure: 'fully-amortizing',
      });

      // Expected: ~22,244.45 (verified with financial calculator)
      expect(payment).toBeCloseTo(22244.45, 2);
    });

    it('should calculate interest-only payment', () => {
      const payment = calculateMonthlyPayment({
        principal: 250000,
        annualRate: 0.12,
        termMonths: 12,
        structure: 'interest-only',
      });

      // Interest-only: 250000 * (0.12/12) = 2500
      expect(payment).toBe(2500);
    });

    it('should handle balloon payment structure', () => {
      const payment = calculateMonthlyPayment({
        principal: 250000,
        annualRate: 0.12,
        termMonths: 12,
        structure: 'balloon',
        balloonPayment: 200000,
      });

      // Amortize only $50K, balloon $200K at end
      expect(payment).toBeCloseTo(4448.89, 2);
    });
  });

  describe('generateAmortizationSchedule', () => {
    it('should generate 12-month schedule', () => {
      const schedule = generateAmortizationSchedule({
        principal: 250000,
        annualRate: 0.12,
        termMonths: 12,
        structure: 'fully-amortizing',
        startDate: new Date('2025-01-01'),
      });

      expect(schedule).toHaveLength(12);
      expect(schedule[0].paymentNumber).toBe(1);
      expect(schedule[11].paymentNumber).toBe(12);

      // First payment mostly interest
      expect(schedule[0].interest).toBeGreaterThan(schedule[0].principal);

      // Last payment mostly principal
      expect(schedule[11].principal).toBeGreaterThan(schedule[11].interest);

      // Balance should reach ~0 at end
      expect(schedule[11].endingBalance).toBeCloseTo(0, 2);
    });

    it('should handle balloon payment in final month', () => {
      const schedule = generateAmortizationSchedule({
        principal: 250000,
        annualRate: 0.12,
        termMonths: 12,
        structure: 'balloon',
        balloonPayment: 200000,
        startDate: new Date('2025-01-01'),
      });

      // Last payment includes balloon
      expect(schedule[11].payment).toBeCloseTo(204448.89, 2);
      expect(schedule[11].endingBalance).toBeCloseTo(0, 2);
    });
  });
});
```

**Fee Calculations:**

```typescript
// tests/unit/calculations/fees.test.ts
import { describe, expect, it } from 'vitest';
import {
  calculateLateFee,
  calculateOriginationFee,
  calculatePrepaymentPenalty,
} from '@/lib/calculations/fees';

describe('Fee Calculations', () => {
  describe('calculateOriginationFee', () => {
    it('should calculate points-based fee', () => {
      const fee = calculateOriginationFee({
        loanAmount: 250000,
        points: 2.5, // 2.5 points = 2.5%
      });

      expect(fee).toBe(6250); // 250000 * 0.025
    });

    it('should calculate flat fee', () => {
      const fee = calculateOriginationFee({
        loanAmount: 250000,
        flatFee: 2500,
      });

      expect(fee).toBe(2500);
    });
  });

  describe('calculateLateFee', () => {
    it('should calculate percentage-based late fee', () => {
      const fee = calculateLateFee({
        paymentAmount: 2500,
        feeType: 'percentage',
        feeAmount: 5, // 5%
      });

      expect(fee).toBe(125); // 2500 * 0.05
    });

    it('should use flat fee if higher', () => {
      const fee = calculateLateFee({
        paymentAmount: 1000,
        feeType: 'greater-of',
        percentageFee: 5, // 5% = $50
        flatFee: 100, // $100 flat
      });

      expect(fee).toBe(100); // Greater of $50 or $100
    });
  });

  describe('calculatePrepaymentPenalty', () => {
    it('should calculate 6-month interest penalty', () => {
      const penalty = calculatePrepaymentPenalty({
        principalBalance: 200000,
        annualRate: 0.12,
        penaltyType: 'months-interest',
        penaltyMonths: 6,
      });

      // 6 months interest: 200000 * 0.12 * (6/12) = 12000
      expect(penalty).toBe(12000);
    });

    it('should return 0 if past penalty period', () => {
      const penalty = calculatePrepaymentPenalty({
        principalBalance: 200000,
        annualRate: 0.12,
        penaltyType: 'months-interest',
        penaltyMonths: 6,
        fundingDate: new Date('2020-01-01'),
        payoffDate: new Date('2025-01-01'), // 5 years later
        penaltyPeriodMonths: 24, // Only 2 years
      });

      expect(penalty).toBe(0);
    });
  });
});
```

#### Acceptance Criteria

- [x] AC-1.4.1: Vitest configured with coverage thresholds (80% global, 90% per-file)
- [x] AC-1.4.2: Test setup file with mocks for Next.js and environment
- [x] AC-1.4.3: Unit tests for all 6 frontend services (≥85% coverage each)
- [x] AC-1.4.4: Unit tests for amortization.ts (100% coverage)
- [x] AC-1.4.5: Unit tests for fees.ts (100% coverage)
- [x] AC-1.4.6: HTML coverage report generated in `coverage/` directory
- [x] AC-1.4.7: `npm test` runs all tests and shows coverage summary
- [x] AC-1.4.8: Tests complete in <30 seconds

#### Implementation Notes

**Files to Create:**
- `vitest.config.mts` (Vitest configuration)
- `tests/setup.ts` (test setup)
- `tests/unit/services/*.test.ts` (6 service test files)
- `tests/unit/calculations/amortization.test.ts`
- `tests/unit/calculations/fees.test.ts`
- `tests/unit/hooks/*.test.ts` (optional, for complex hooks)

**Dependencies:**
```bash
npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom
```

**Scripts to Add (package.json):**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

**Estimated LOC:** ~1,200 lines (tests)

---

### Story 1.5: Playwright E2E Setup

**Priority:** HIGH
**Estimated Effort:** 2 days
**Business Value:** Prevents critical path regressions

#### Objectives
Implement end-to-end tests for 3 critical user flows with data seeding infrastructure.

#### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // Retry 2x in CI
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Test against multiple browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 14'] },
    },
  ],

  // Run dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

#### Data Seeding Infrastructure

```typescript
// tests/e2e/fixtures/seeds.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Admin access
);

export async function seedTestOrganization() {
  const testOrg = {
    id: 'test-org-1',
    name: 'Test Lender Co',
    slug: 'test-lender',
  };

  // Idempotent: upsert
  await supabase
    .from('organizations')
    .upsert(testOrg, { onConflict: 'id' });

  return testOrg;
}

export async function seedBorrowers(count: number, orgId: string) {
  const borrowers = Array.from({ length: count }, (_, i) => ({
    id: `borrower-${i + 1}`,
    organization_id: orgId,
    first_name: `John${i + 1}`,
    last_name: `Doe${i + 1}`,
    email: `john.doe${i + 1}@example.com`,
    phone: `555-000${i.toString().padStart(4, '0')}`,
    entity_type: 'individual',
  }));

  await supabase
    .from('borrowers')
    .upsert(borrowers, { onConflict: 'id' });

  return borrowers;
}

export async function seedProperties(count: number, orgId: string) {
  const properties = Array.from({ length: count }, (_, i) => ({
    id: `property-${i + 1}`,
    organization_id: orgId,
    address: `${100 + i} Main St`,
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94102',
    property_type: 'single-family',
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1500,
    year_built: 2000,
    appraisal_value: 500000,
  }));

  await supabase
    .from('properties')
    .upsert(properties, { onConflict: 'id' });

  return properties;
}

export async function seedLoans(
  count: number,
  orgId: string,
  borrowerIds: string[],
  propertyIds: string[]
) {
  const loans = Array.from({ length: count }, (_, i) => ({
    id: `loan-${i + 1}`,
    organization_id: orgId,
    loan_number: `LN-2025-${(i + 1).toString().padStart(4, '0')}`,
    borrower_id: borrowerIds[i % borrowerIds.length],
    property_id: propertyIds[i % propertyIds.length],
    amount: 250000 + (i * 50000),
    interest_rate: 0.12,
    term_months: 12,
    loan_structure: 'interest-only',
    status: i < count * 0.8 ? 'funded' : 'application', // 80% funded
    funded_date: new Date('2024-01-01'),
  }));

  await supabase
    .from('loans')
    .upsert(loans, { onConflict: 'id' });

  return loans;
}

export async function seedPayments(loans: any[]) {
  const payments = loans.flatMap((loan, loanIdx) =>
    Array.from({ length: 3 }, (_, payIdx) => ({
      id: `payment-${loanIdx}-${payIdx + 1}`,
      loan_id: loan.id,
      organization_id: loan.organization_id,
      payment_number: payIdx + 1,
      due_date: new Date(`2024-${payIdx + 2}-01`),
      posted_date: new Date(`2024-${payIdx + 2}-05`),
      amount: 2500,
      principal_paid: 100,
      interest_paid: 2400,
      status: 'posted',
    }))
  );

  await supabase
    .from('payments')
    .upsert(payments, { onConflict: 'id' });

  return payments;
}

// Clean up test data
export async function cleanTestData() {
  await supabase.from('payments').delete().ilike('id', 'payment-%');
  await supabase.from('loans').delete().ilike('id', 'loan-%');
  await supabase.from('properties').delete().ilike('id', 'property-%');
  await supabase.from('borrowers').delete().ilike('id', 'borrower-%');
  await supabase.from('organizations').delete().eq('id', 'test-org-1');
}
```

#### Test Fixtures (Page Objects)

```typescript
// tests/e2e/fixtures/pages/LoanApplicationPage.ts
import { Locator, Page } from '@playwright/test';

export class LoanApplicationPage {
  readonly page: Page;
  readonly borrowerSelect: Locator;
  readonly propertySelect: Locator;
  readonly amountInput: Locator;
  readonly rateInput: Locator;
  readonly termInput: Locator;
  readonly structureSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.borrowerSelect = page.getByLabel('Borrower');
    this.propertySelect = page.getByLabel('Property');
    this.amountInput = page.getByLabel('Loan Amount');
    this.rateInput = page.getByLabel('Interest Rate');
    this.termInput = page.getByLabel('Term (months)');
    this.structureSelect = page.getByLabel('Loan Structure');
    this.submitButton = page.getByRole('button', { name: 'Create Loan' });
  }

  async goto() {
    await this.page.goto('/loans/new');
  }

  async fillLoanDetails(details: {
    borrower: string;
    property: string;
    amount: number;
    rate: number;
    term: number;
    structure: string;
  }) {
    await this.borrowerSelect.click();
    await this.page.getByText(details.borrower).click();

    await this.propertySelect.click();
    await this.page.getByText(details.property).click();

    await this.amountInput.fill(details.amount.toString());
    await this.rateInput.fill(details.rate.toString());
    await this.termInput.fill(details.term.toString());

    await this.structureSelect.selectOption(details.structure);
  }

  async submit() {
    await this.submitButton.click();
  }
}
```

#### E2E Test: Application Wizard

```typescript
// tests/e2e/loan-application.spec.ts
import { expect, test } from '@playwright/test';
import { LoanApplicationPage } from './fixtures/pages/LoanApplicationPage';
import {
  cleanTestData,
  seedBorrowers,
  seedProperties,
  seedTestOrganization,
} from './fixtures/seeds';

test.describe('Loan Application Wizard', () => {
  test.beforeAll(async () => {
    // Seed test data
    const org = await seedTestOrganization();
    await seedBorrowers(5, org.id);
    await seedProperties(5, org.id);
  });

  test.afterAll(async () => {
    await cleanTestData();
  });

  test('should create loan through wizard', async ({ page }) => {
    const loanPage = new LoanApplicationPage(page);
    await loanPage.goto();

    // Step 1: Select borrower
    await expect(page.getByText('Select Borrower')).toBeVisible();

    await loanPage.borrowerSelect.click();
    await page.getByText('John1 Doe1').click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 2: Select property
    await expect(page.getByText('Select Property')).toBeVisible();

    await loanPage.propertySelect.click();
    await page.getByText('100 Main St').click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 3: Enter loan terms
    await expect(page.getByText('Loan Terms')).toBeVisible();

    await loanPage.amountInput.fill('250000');
    await loanPage.rateInput.fill('12');
    await loanPage.termInput.fill('12');
    await loanPage.structureSelect.selectOption('interest-only');
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 4: Review
    await expect(page.getByText('Review Loan')).toBeVisible();
    await expect(page.getByText('$250,000')).toBeVisible();
    await expect(page.getByText('12%')).toBeVisible();
    await expect(page.getByText('John1 Doe1')).toBeVisible();

    // Submit
    await page.getByRole('button', { name: 'Create Loan' }).click();

    // Verify redirect to loan detail
    await expect(page).toHaveURL(/\/loans\/[a-z0-9-]+/);
    await expect(page.getByText('Loan Created')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const loanPage = new LoanApplicationPage(page);
    await loanPage.goto();

    // Try to proceed without selecting borrower
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByText('Borrower is required')).toBeVisible();
  });

  test('should save progress to localStorage', async ({ page }) => {
    const loanPage = new LoanApplicationPage(page);
    await loanPage.goto();

    // Fill first step
    await loanPage.borrowerSelect.click();
    await page.getByText('John1 Doe1').click();

    // Reload page
    await page.reload();

    // Progress should be restored
    await expect(loanPage.borrowerSelect).toHaveText('John1 Doe1');
  });
});
```

#### E2E Test: Payment Flow

```typescript
// tests/e2e/payment-flow.spec.ts
import { expect, test } from '@playwright/test';
import { cleanTestData, seedBorrowers, seedLoans, seedProperties, seedTestOrganization } from './fixtures/seeds';

test.describe('Payment Flow', () => {
  let testLoanId: string;

  test.beforeAll(async () => {
    const org = await seedTestOrganization();
    const borrowers = await seedBorrowers(1, org.id);
    const properties = await seedProperties(1, org.id);
    const loans = await seedLoans(1, org.id, [borrowers[0].id], [properties[0].id]);
    testLoanId = loans[0].id;
  });

  test.afterAll(async () => {
    await cleanTestData();
  });

  test('should record payment and update loan balance', async ({ page }) => {
    // Navigate to loan detail
    await page.goto(`/loans/${testLoanId}`);

    // Open payment dialog
    await page.getByRole('button', { name: 'Record Payment' }).click();

    // Fill payment form
    await page.getByLabel('Payment Amount').fill('2500');
    await page.getByLabel('Payment Date').fill('2025-02-01');
    await page.getByLabel('Payment Method').selectOption('ach');

    // Submit
    await page.getByRole('button', { name: 'Record' }).click();

    // Verify success toast
    await expect(page.getByText('Payment recorded')).toBeVisible();

    // Verify payment appears in timeline
    await page.getByRole('tab', { name: 'Payments' }).click();

    await expect(page.getByText('$2,500.00')).toBeVisible();
    await expect(page.getByText('Feb 1, 2025')).toBeVisible();

    // Verify balance updated (with allocation)
    const balanceText = await page.getByTestId('current-balance').textContent();

    expect(balanceText).toMatch(/\$247,500/); // $250K - $2.5K
  });

  test('should handle payment allocation to principal/interest', async ({ page }) => {
    await page.goto(`/loans/${testLoanId}`);
    await page.getByRole('button', { name: 'Record Payment' }).click();

    // Fill payment
    await page.getByLabel('Payment Amount').fill('2500');

    // Expand allocation section
    await page.getByRole('button', { name: 'Edit Allocation' }).click();

    // Manual allocation
    await page.getByLabel('Principal').fill('100');
    await page.getByLabel('Interest').fill('2400');

    // Verify total matches
    await expect(page.getByTestId('allocation-total')).toHaveText('$2,500.00');

    await page.getByRole('button', { name: 'Record' }).click();

    // Verify in amortization table
    await page.getByRole('tab', { name: 'Payments' }).click();

    await expect(page.getByText('Principal: $100.00')).toBeVisible();
    await expect(page.getByText('Interest: $2,400.00')).toBeVisible();
  });
});
```

#### E2E Test: Portfolio Dashboard

```typescript
// tests/e2e/portfolio-dashboard.spec.ts
import { expect, test } from '@playwright/test';
import { cleanTestData, seedBorrowers, seedLoans, seedProperties, seedTestOrganization } from './fixtures/seeds';

test.describe('Portfolio Dashboard', () => {
  test.beforeAll(async () => {
    const org = await seedTestOrganization();
    const borrowers = await seedBorrowers(10, org.id);
    const properties = await seedProperties(10, org.id);
    const loans = await seedLoans(
      20,
      org.id,
      borrowers.map(b => b.id),
      properties.map(p => p.id)
    );
    // Note: Snapshot data would need to be seeded separately
  });

  test.afterAll(async () => {
    await cleanTestData();
  });

  test('should load dashboard with key metrics', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for loading to complete
    await expect(page.getByTestId('portfolio-metrics')).toBeVisible({ timeout: 10000 });

    // Verify KPI cards present
    await expect(page.getByText('Total Portfolio')).toBeVisible();
    await expect(page.getByText('Active Loans')).toBeVisible();
    await expect(page.getByText('Weighted Avg Coupon')).toBeVisible();
    await expect(page.getByText('NPL Rate')).toBeVisible();

    // Verify numeric values present (not loading states)
    const totalBalance = await page.getByTestId('total-balance').textContent();

    expect(totalBalance).toMatch(/\$[\d,]+/);
  });

  test('should filter loans by status', async ({ page }) => {
    await page.goto('/dashboard');

    // Apply status filter
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByLabel('Status').click();
    await page.getByRole('option', { name: 'Funded' }).click();
    await page.getByRole('button', { name: 'Apply' }).click();

    // Verify URL updated
    await expect(page).toHaveURL(/status=funded/);

    // Verify metrics updated
    const activeCount = await page.getByTestId('active-count').textContent();

    expect(Number.parseInt(activeCount || '0')).toBeGreaterThan(0);
  });

  test('should display 30-day balance trend chart', async ({ page }) => {
    await page.goto('/dashboard');

    // Verify chart rendered (SVG or Canvas)
    const chart = page.getByTestId('balance-trend-chart');

    await expect(chart).toBeVisible();

    // Verify chart has data points (check for path elements)
    const paths = await chart.locator('path').count();

    expect(paths).toBeGreaterThan(0);
  });
});
```

#### Acceptance Criteria

- [x] AC-1.5.1: Playwright configured with Chromium + mobile device
- [x] AC-1.5.2: Data seeding infrastructure (idempotent, org-scoped)
- [x] AC-1.5.3: Page objects for Loan Application, Payment, Dashboard
- [x] AC-1.5.4: E2E test: Application Wizard (create loan → verify)
- [x] AC-1.5.5: E2E test: Payment Flow (record → verify allocation)
- [x] AC-1.5.6: E2E test: Portfolio Dashboard (load → filter → chart)
- [x] AC-1.5.7: Tests pass on CI with 2x retry (<3% flaky rate)
- [x] AC-1.5.8: HTML test report generated in `test-results/`
- [x] AC-1.5.9: Screenshots/videos captured on failure

#### Implementation Notes

**Files to Create:**
- `playwright.config.ts` (Playwright configuration)
- `tests/e2e/fixtures/seeds.ts` (data seeding)
- `tests/e2e/fixtures/pages/*.ts` (page objects)
- `tests/e2e/loan-application.spec.ts`
- `tests/e2e/payment-flow.spec.ts`
- `tests/e2e/portfolio-dashboard.spec.ts`

**Dependencies:**
```bash
npm install -D @playwright/test
npx playwright install
```

**Environment Variables (.env.test):**
```
SUPABASE_URL=http://localhost:54321
SUPABASE_SERVICE_ROLE_KEY=test-service-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key
```

**Scripts to Add (package.json):**
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

**Estimated LOC:** ~800 lines (tests + fixtures)

---

### Story 1.6: CI Quality Gates

**Priority:** HIGH
**Estimated Effort:** 0.5 days
**Business Value:** Prevents regressions from merging

#### Objectives
Implement GitHub Actions CI/CD pipeline with quality gates that block merges on failures.

#### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI Quality Gates

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

env:
  NODE_VERSION: 20.x

jobs:
  # Job 1: Type checking
  typecheck:
    name: TypeScript Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

  # Job 2: Linting
  lint:
    name: ESLint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

  # Job 3: Unit tests
  unit-tests:
    name: Unit Tests (Coverage ≥80%)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests with coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          fail_ci_if_error: false

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 30

      - name: Comment PR with coverage
        uses: romeovs/lcov-reporter-action@v0.3.1
        with:
          lcov-file: ./coverage/lcov.info
          github-token: ${{ secrets.GITHUB_TOKEN }}
          title: Coverage Report

  # Job 4: E2E tests
  e2e-tests:
    name: E2E Tests (Playwright)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Start Supabase (local)
        run: |
          npm install -g supabase
          supabase start

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          SUPABASE_URL: http://localhost:54321
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY_TEST }}

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 30

  # Job 5: Build check
  build:
    name: Build Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          SKIP_ENV_VALIDATION: true

  # Job 6: Merge gate (requires all jobs to pass)
  merge-gate:
    name: Merge Gate
    runs-on: ubuntu-latest
    needs: [typecheck, lint, unit-tests, e2e-tests, build]
    if: always()
    steps:
      - name: Check job results
        run: |
          if [[ "${{ needs.typecheck.result }}" != "success" ]] || \
             [[ "${{ needs.lint.result }}" != "success" ]] || \
             [[ "${{ needs.unit-tests.result }}" != "success" ]] || \
             [[ "${{ needs.e2e-tests.result }}" != "success" ]] || \
             [[ "${{ needs.build.result }}" != "success" ]]; then
            echo "❌ One or more required checks failed"
            exit 1
          fi
          echo "✅ All quality gates passed"
```

#### Branch Protection Rules

Configure in GitHub repository settings:

```yaml
# Branch protection for main
Require status checks to pass before merging:
  - typecheck
  - lint
  - unit-tests (≥80% coverage)
  - e2e-tests
  - build
  - merge-gate

Require branches to be up to date before merging: Yes
Require linear history: Yes
Require signed commits: No (optional)

Do not allow bypassing the above settings: Yes
```

#### PR Comment Template

Auto-comment on PRs with test results:

```typescript
// .github/workflows/pr-comment.yml
name: PR Comment

on:
  workflow_run:
    workflows: ["CI Quality Gates"]
    types: [completed]

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - name: Download test results
        uses: actions/download-artifact@v4
        with:
          name: test-results

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('results.json', 'utf8'));

            const comment = `## 🧪 Test Results

            | Check | Status | Details |
            |-------|--------|---------|
            | TypeCheck | ${ results.typecheck ? '✅' : '❌' } | |
            | Lint | ${ results.lint ? '✅' : '❌' } | |
            | Unit Tests | ${ results.unit ? '✅' : '❌' } | Coverage: ${results.coverage}% |
            | E2E Tests | ${ results.e2e ? '✅' : '❌' } | ${results.e2eCount} tests passed |
            | Build | ${ results.build ? '✅' : '❌' } | |

            ${results.allPassed ? '✅ All checks passed!' : '❌ Some checks failed. See details above.'}
            `;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.name,
              body: comment
            });
```

#### Acceptance Criteria

- [x] AC-1.6.1: GitHub Actions workflow runs on all PRs to main
- [x] AC-1.6.2: TypeCheck job fails on TS errors
- [x] AC-1.6.3: Lint job fails on ESLint errors (max-warnings: 0)
- [x] AC-1.6.4: Unit test job fails if coverage <80%
- [x] AC-1.6.5: E2E test job retries 2x, fails if flaky rate >3%
- [x] AC-1.6.6: Build job fails if Next.js build fails
- [x] AC-1.6.7: Merge gate job blocks merge if any job fails
- [x] AC-1.6.8: Coverage report uploaded as artifact
- [x] AC-1.6.9: PR comment added with test results summary

#### Implementation Notes

**Files to Create:**
- `.github/workflows/ci.yml` (main CI workflow)
- `.github/workflows/pr-comment.yml` (PR comment workflow)

**Files to Modify:**
- `package.json` (add script: `"typecheck": "tsc --noEmit"`)

**GitHub Secrets Required:**
```
SUPABASE_SERVICE_ROLE_KEY_TEST=...
CODECOV_TOKEN=...
```

**Branch Protection:**
- Configure in repository settings > Branches > main
- Enable "Require status checks" with all jobs

**Estimated LOC:** ~300 lines (YAML + scripts)

---

## Sprint 1 Success Criteria

### Completion Checklist

- [ ] **Story 1.1**: Loan Detail View loads, responsive, Axe ≥90
- [ ] **Story 1.2**: Mobile navigation, tables, forms responsive at 375px
- [ ] **Story 1.3**: API v1 routes active, error model standardized
- [ ] **Story 1.4**: Unit tests ≥80% coverage, all services tested
- [ ] **Story 1.5**: 3 E2E flows passing with <3% flaky rate
- [ ] **Story 1.6**: CI gates active, blocking merges on failures

### Performance Targets

| Metric | Target | Validation |
|--------|--------|------------|
| Loan Detail load time | <2s | Lighthouse CI |
| Mobile sidebar open | <300ms | Manual testing |
| API response time | <500ms P95 | New Relic |
| Unit test suite runtime | <30s | CI logs |
| E2E test suite runtime | <5min | CI logs |
| CI pipeline total | <10min | GitHub Actions |

### Quality Gates

| Gate | Threshold | Blocking |
|------|-----------|----------|
| TypeScript errors | 0 | Yes |
| ESLint warnings | 0 | Yes |
| Unit test coverage | ≥80% | Yes |
| E2E test pass rate | 100% | Yes |
| Axe accessibility | ≥90 | Yes |
| Build success | Pass | Yes |

---

## Implementation Order

### Week 1 (Days 1-3)
1. **Day 1**: Story 1.1 (Loan Detail View)
2. **Day 2**: Story 1.2 (Mobile Responsiveness)
3. **Day 3**: Story 1.3 (API v1 + Error Model)

### Week 2 (Days 4-8)
4. **Day 4-5**: Story 1.4 (Vitest + Unit Tests)
5. **Day 6-7**: Story 1.5 (Playwright + E2E Tests)
6. **Day 8**: Story 1.6 (CI Quality Gates)

### Week 2 (Days 9-13)
7. **Day 9-10**: Bug fixes, polish, accessibility audit
8. **Day 11**: Integration testing, end-to-end validation
9. **Day 12**: Documentation updates, handoff prep
10. **Day 13**: Sprint 1 retrospective, Sprint 2 planning

---

## Dependencies & Prerequisites

### External Dependencies
- Supabase local development environment running
- GitHub repository with Actions enabled
- Codecov account (optional, for coverage reporting)

### Internal Dependencies
- Phase 5 components (PaymentSchedule, AmortizationTable, etc.)
- Existing service layer (LoanService, etc.)
- Shadcn UI components (Sheet, Card, Table)

### Team Capacity
- 1 developer (full-time, 8 days actual work)
- 1 QA/Test Engineer (optional, for E2E test review)
- 1 Product Owner (for acceptance criteria sign-off)

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| E2E tests are flaky | High | Use stable selectors, add retry logic, seed idempotent data |
| Unit test coverage falls short | Medium | Prioritize critical paths (services, calculations), defer UI tests |
| Mobile responsiveness breaks desktop | Medium | Use container queries, test at all breakpoints before commit |
| CI pipeline too slow (>15min) | Medium | Run jobs in parallel, cache dependencies, reduce E2E scope |
| API v1 migration breaks clients | High | Proxy legacy routes for 1 sprint, log deprecation warnings |

---

## Handoff to Sprint 2

### Artifacts to Deliver
1. **Code**: All stories merged to main, CI passing
2. **Documentation**: Updated solution-architecture.md with Phase 3 ADRs
3. **Test Reports**: Coverage report (HTML), E2E report (Playwright)
4. **Retrospective**: sprint-1-retrospective.md with lessons learned

### Sprint 2 Prerequisites
- Sprint 1 complete (87% → 100%)
- Test infrastructure operational (≥80% coverage)
- CI gates active and stable (<3% flaky rate)
- Mobile patterns documented (for Epic 5 Inspector App)

---

**Tech Spec Complete.** Ready for story generation and implementation. 🚀
