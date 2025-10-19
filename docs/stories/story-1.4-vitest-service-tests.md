# Story 1.4: Vitest Configuration & Service Tests

**Epic:** Epic 2 - Test Infrastructure
**Priority:** HIGH
**Estimated Effort:** 2 days
**Status:** Ready for Development
**Assignee:** TBD

---

## User Story

**As a** developer
**I want** comprehensive unit test coverage with fast test execution
**So that** I can confidently refactor code and catch regressions before they reach production

---

## Business Value

- **Primary Value:** Prevents regressions, reduces bug escape rate by 70%
- **Developer Impact:** Enables confident refactoring, reduces fear of changing "working" code
- **Technical Value:** Foundation for TDD approach in Epic 3-6
- **Strategic Alignment:** SOC 2 compliance requires documented testing processes

---

## Description

Establish unit testing infrastructure using Vitest with 80% coverage threshold on critical business logic. Focus on service layer (6 services) and calculation utilities (amortization, fees) which contain the most critical logic.

### Context

Current state:
- No unit test framework configured
- No test coverage measurement
- Phase 5 delivered ~7K LOC with 58/100 test score (per deep-dive analysis)
- Services and calculations are untested

This story establishes the testing foundation before adding Epic 3-6 features (~10K more LOC).

---

## Acceptance Criteria

### AC-1.4.1: Vitest Configuration
**Given** Vitest is installed
**When** I run `npm test`
**Then** all unit tests execute with coverage report

**Configuration Requirements:**
- Global test threshold: ≥80% lines, functions, branches, statements
- Changed files threshold: ≥90% (warning only)
- Coverage reporters: text (console), json, html, lcov
- Test environment: jsdom (for React components)
- Exclude from coverage: stories, test files, types, page/layout files
- Pool: threads (for performance)

**Verification:**
- [ ] `npm test` runs all tests
- [ ] `npm run test:watch` runs in watch mode
- [ ] `npm run test:coverage` generates coverage report
- [ ] `npm run test:ui` opens Vitest UI
- [ ] Coverage report in `coverage/` directory
- [ ] HTML report accessible at `coverage/index.html`
- [ ] CI fails if coverage <80%

---

### AC-1.4.2: Test Setup File
**Given** tests need common setup
**When** any test file runs
**Then** setup runs automatically with:
- `@testing-library/jest-dom` matchers
- Auto cleanup after each test
- Next.js router mocked
- Environment variables set
- Fetch API mocked

**Verification:**
- [ ] Setup file at `tests/setup.ts`
- [ ] Jest-dom matchers available (`toBeInTheDocument`, etc.)
- [ ] Components cleanup automatically
- [ ] useRouter() works in tests
- [ ] Environment variables accessible
- [ ] No "fetch is not defined" errors

---

### AC-1.4.3: Service Layer Tests (≥85% Coverage Each)
**Given** 6 frontend services exist
**When** I run service tests
**Then** each service has ≥85% coverage:

| Service | Functions | Test Cases | Coverage Target |
|---------|-----------|------------|-----------------|
| LoanService | 12 | 45 | ≥85% |
| BorrowerService | 8 | 24 | ≥85% |
| LenderService | 8 | 24 | ≥85% |
| PropertyService | 8 | 24 | ≥85% |
| PaymentService | 10 | 36 | ≥85% |
| DrawService | 10 | 36 | ≥85% |

**Test Coverage Per Service:**
- Happy path (successful operations)
- Error handling (404, 400, 500)
- Network errors
- Validation errors
- Edge cases (empty results, pagination edge cases)

**Verification:**
- [ ] All 6 service test files exist
- [ ] Each service ≥85% coverage
- [ ] All HTTP methods tested (GET, POST, PATCH, DELETE)
- [ ] Error scenarios tested
- [ ] Tests run in <10 seconds

---

### AC-1.4.4: Amortization Calculation Tests (100% Coverage)
**Given** amortization calculations are critical
**When** I run amortization tests
**Then** all functions have 100% coverage:

**Functions to Test:**
- `calculateMonthlyPayment()` - 3 loan structures
- `generateAmortizationSchedule()` - full schedule generation
- `calculatePayoffAmount()` - payoff quotes
- `calculatePerDiemInterest()` - daily interest
- `calculateRemainingBalance()` - balance at any date

**Test Scenarios:**
- Fully amortizing loan (12 months, 24 months, 30 years)
- Interest-only loan (principal paid at end)
- Balloon payment loan (partial amortization)
- Edge cases: $0 balance, negative payment (should error), 0% rate

**Verification:**
- [ ] Test file: `tests/unit/calculations/amortization.test.ts`
- [ ] 100% line coverage
- [ ] 100% branch coverage
- [ ] All loan structures tested
- [ ] Edge cases tested
- [ ] Tests verify against known correct values (financial calculator)

---

### AC-1.4.5: Fee Calculation Tests (100% Coverage)
**Given** fee calculations affect loan profitability
**When** I run fee calculation tests
**Then** all functions have 100% coverage:

**Functions to Test:**
- `calculateOriginationFee()` - points-based and flat fee
- `calculateLateFee()` - percentage, flat, and greater-of
- `calculatePrepaymentPenalty()` - 4 types (months-interest, percentage, flat, sliding-scale)
- `calculateNSFFee()` - insufficient funds fee
- `calculateInspectionFee()` - draw inspection fee

**Test Scenarios:**
- Points-based origination (2.5 points on $250K)
- Flat origination fee ($2,500)
- Late fee percentage (5% of payment)
- Late fee greater-of (5% or $100, whichever is higher)
- Prepayment penalty 6-month interest
- Prepayment penalty after penalty period (should be $0)

**Verification:**
- [ ] Test file: `tests/unit/calculations/fees.test.ts`
- [ ] 100% line coverage
- [ ] 100% branch coverage
- [ ] All fee types tested
- [ ] Edge cases tested
- [ ] Tests verify against known correct values

---

### AC-1.4.6: HTML Coverage Report
**Given** tests have run with coverage
**When** I open `coverage/index.html`
**Then** I see:
- Overall coverage percentage (≥80%)
- Per-file coverage breakdown
- Uncovered lines highlighted in red
- Covered lines highlighted in green
- Branch coverage visualization

**Verification:**
- [ ] HTML report generated after `npm run test:coverage`
- [ ] Report opens in browser
- [ ] Click file to see line-by-line coverage
- [ ] Uncovered lines clearly visible
- [ ] Coverage percentage accurate

---

### AC-1.4.7: Fast Test Execution
**Given** tests are written
**When** I run `npm test`
**Then** all tests complete in <30 seconds

**Performance Targets:**
- Service tests: <10 seconds (6 files, ~180 tests)
- Calculation tests: <5 seconds (2 files, ~50 tests)
- Total runtime: <30 seconds

**Verification:**
- [ ] Full test suite <30 seconds
- [ ] Individual test files <5 seconds each
- [ ] Watch mode responsive (<1 second re-run)
- [ ] No timeout errors
- [ ] No memory leaks

---

### AC-1.4.8: CI Integration Ready
**Given** Vitest is configured
**When** tests run in CI
**Then** they produce artifacts for CI pipeline:
- Coverage JSON for Codecov
- Coverage LCOV for PR comments
- JUnit XML for test results (optional)

**Verification:**
- [ ] Coverage JSON at `coverage/coverage-final.json`
- [ ] Coverage LCOV at `coverage/lcov.info`
- [ ] Coverage can be uploaded to Codecov
- [ ] Tests exit with code 0 on success, 1 on failure
- [ ] CI can parse test results

---

## Technical Specification

### Vitest Configuration

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
        'src/app/**/page.tsx',
        'src/types/**',
      ],
      thresholds: {
        global: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
        perFile: true,
      },
    },
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

### Test Setup

```typescript
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
// tests/setup.ts
import '@testing-library/jest-dom';

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

### Example Service Test

```typescript
// tests/unit/services/LoanService.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '@/lib/errors/AppError';
import { LoanService } from '@/services/frontend/LoanService';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(() => {
    service = new LoanService();
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
  });
});
```

---

## Implementation Tasks

### Task 1: Install Vitest & Dependencies
**Estimated:** 15 minutes

```bash
npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

**Definition of Done:**
- All packages installed
- No version conflicts
- `package.json` updated

---

### Task 2: Create Vitest Configuration
**File:** `vitest.config.mts`
**Estimated:** 30 minutes

- [ ] Create config file with all settings
- [ ] Configure coverage thresholds
- [ ] Set up path aliases
- [ ] Configure test environment (jsdom)
- [ ] Test configuration works (`npm test` runs)

**Definition of Done:**
- Config file exists
- Tests can be run
- Coverage is measured
- Path aliases work (@/ imports)

---

### Task 3: Create Test Setup File
**File:** `tests/setup.ts`
**Estimated:** 30 minutes

- [ ] Import jest-dom matchers
- [ ] Add cleanup after each test
- [ ] Mock Next.js router
- [ ] Mock environment variables
- [ ] Mock fetch API (if needed)

**Definition of Done:**
- Setup runs before all tests
- Mocks work correctly
- No test failures due to missing mocks

---

### Task 4: Write LoanService Tests
**File:** `tests/unit/services/LoanService.test.ts`
**Estimated:** 3 hours

- [ ] Test `getLoans()` - success, pagination, filtering
- [ ] Test `getLoan()` - success, 404 error
- [ ] Test `createLoan()` - success, validation error
- [ ] Test `updateLoan()` - success, 404, validation error
- [ ] Test `deleteLoan()` - success, 404
- [ ] Test network errors
- [ ] Aim for ≥85% coverage

**Definition of Done:**
- 45+ test cases
- ≥85% coverage
- All edge cases tested
- Tests pass

---

### Task 5: Write Remaining Service Tests
**Files:** `tests/unit/services/{Borrower,Lender,Property,Payment,Draw}Service.test.ts`
**Estimated:** 6 hours (5 services × 1.2 hours each)

- [ ] BorrowerService: 24 test cases, ≥85% coverage
- [ ] LenderService: 24 test cases, ≥85% coverage
- [ ] PropertyService: 24 test cases, ≥85% coverage
- [ ] PaymentService: 36 test cases, ≥85% coverage
- [ ] DrawService: 36 test cases, ≥85% coverage

**Pattern per service:**
- Test all CRUD operations
- Test error scenarios
- Test validation
- Test pagination/filtering (where applicable)

**Definition of Done:**
- All 5 test files complete
- Each ≥85% coverage
- All tests pass
- No flaky tests

---

### Task 6: Write Amortization Calculation Tests
**File:** `tests/unit/calculations/amortization.test.ts`
**Estimated:** 3 hours

- [ ] Test `calculateMonthlyPayment()`:
  - Fully amortizing (compare against financial calculator)
  - Interest-only
  - Balloon payment
  - Edge cases ($0 balance, 0% rate)
- [ ] Test `generateAmortizationSchedule()`:
  - 12-month schedule
  - Verify first/last payment split (interest vs principal)
  - Verify ending balance ≈ $0
  - Balloon payment in final month
- [ ] Test `calculatePayoffAmount()`:
  - Standard payoff
  - Payoff with prepayment penalty
  - Payoff with accrued fees
- [ ] Test `calculatePerDiemInterest()`
- [ ] Test `calculateRemainingBalance()`

**Definition of Done:**
- 100% line coverage
- 100% branch coverage
- All loan structures tested
- Tests verify against known correct values

---

### Task 7: Write Fee Calculation Tests
**File:** `tests/unit/calculations/fees.test.ts`
**Estimated:** 2 hours

- [ ] Test `calculateOriginationFee()`:
  - Points-based (2.5 points on $250K = $6,250)
  - Flat fee ($2,500)
- [ ] Test `calculateLateFee()`:
  - Percentage (5% of payment)
  - Flat ($100)
  - Greater-of (5% or $100, whichever higher)
- [ ] Test `calculatePrepaymentPenalty()`:
  - 6-month interest penalty
  - Percentage penalty
  - Flat penalty
  - Past penalty period (should be $0)
- [ ] Test `calculateNSFFee()`
- [ ] Test `calculateInspectionFee()`

**Definition of Done:**
- 100% line coverage
- 100% branch coverage
- All fee types tested
- Tests verify against known correct values

---

### Task 8: Add NPM Scripts
**File:** `package.json`
**Estimated:** 10 minutes

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

**Definition of Done:**
- All scripts work
- `npm test` runs all tests
- `npm run test:watch` enters watch mode
- `npm run test:coverage` generates coverage report

---

### Task 9: Verify Coverage Thresholds
**Estimated:** 30 minutes

- [ ] Run `npm run test:coverage`
- [ ] Verify overall coverage ≥80%
- [ ] Verify each service ≥85%
- [ ] Verify calculations 100%
- [ ] Fix any uncovered lines
- [ ] Review HTML report

**Definition of Done:**
- Coverage thresholds met
- HTML report generated
- No uncovered critical paths

---

## Files to Create

1. `vitest.config.mts` (Vitest configuration)
2. `tests/setup.ts` (test setup)
3. `tests/unit/services/LoanService.test.ts`
4. `tests/unit/services/BorrowerService.test.ts`
5. `tests/unit/services/LenderService.test.ts`
6. `tests/unit/services/PropertyService.test.ts`
7. `tests/unit/services/PaymentService.test.ts`
8. `tests/unit/services/DrawService.test.ts`
9. `tests/unit/calculations/amortization.test.ts`
10. `tests/unit/calculations/fees.test.ts`

**Total:** 10 new files, ~1,200 lines of test code

---

## Files to Modify

1. `package.json` (add test scripts)
2. `.gitignore` (add `coverage/` directory)

---

## Dependencies

### External
- `vitest` (test runner)
- `@vitest/coverage-v8` (coverage tool)
- `@testing-library/react` (React testing utilities)
- `@testing-library/jest-dom` (additional matchers)
- `jsdom` (DOM environment for tests)
- `@vitejs/plugin-react` (React plugin for Vitest)

### Internal
- All service classes (`src/services/frontend/*.ts`)
- Calculation utilities (`src/lib/calculations/*.ts`)

---

## Testing Strategy

### Meta: Testing the Tests
- Run tests in CI to verify they pass
- Verify coverage thresholds block merges
- Test watch mode responsiveness
- Verify mocks work correctly

### Performance Testing
- Measure total test runtime
- Identify slow tests (>1 second)
- Optimize if needed (parallel execution, smaller test data)

---

## Definition of Done

- [ ] All 8 acceptance criteria verified
- [ ] All 9 implementation tasks completed
- [ ] Coverage ≥80% globally
- [ ] Services ≥85% coverage each
- [ ] Calculations 100% coverage
- [ ] Tests run in <30 seconds
- [ ] HTML coverage report generated
- [ ] NPM scripts work
- [ ] Code review completed
- [ ] Merged to main

---

## Notes

### Design Decisions
- Vitest chosen over Jest (faster, native ESM support, Vite integration)
- V8 coverage over Istanbul (faster, more accurate)
- jsdom over happy-dom (better React support)
- Single-threaded pool (simpler, fewer issues)

### Future Enhancements (Out of Scope)
- Component tests (defer to Epic 9)
- Hook tests (defer to Epic 9)
- Snapshot tests (defer to Epic 9)
- Visual regression tests (defer to Epic 9)

### Known Limitations
- Page/layout files excluded from coverage (tested via E2E)
- Some React hooks untestable in isolation (need component tests)
- Coverage may drop as new code added (monitor in CI)

---

**Story Status:** Ready for Development
**Created:** October 19, 2025
**Last Updated:** October 19, 2025
**Estimated Completion:** 2 days
