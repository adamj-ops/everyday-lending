# Story 1.5: Playwright E2E Setup

**Epic:** Epic 2 - Test Infrastructure
**Priority:** HIGH
**Estimated Effort:** 2 days
**Status:** Ready for Development
**Assignee:** TBD

---

## User Story

**As a** QA engineer
**I want** automated end-to-end tests for critical user flows
**So that** I can catch integration bugs before they reach production and ensure the user experience works correctly

---

## Business Value

- **Primary Value:** Prevents critical path regressions, catches integration bugs unit tests miss
- **User Impact:** Ensures key workflows (loan application, payment) work end-to-end
- **Technical Value:** Foundation for continuous E2E testing in Epic 3-6
- **Strategic Alignment:** Required for SOC 2 compliance (documented testing processes)

---

## Description

Implement Playwright E2E testing infrastructure with data seeding, page objects, and 3 critical flow tests: Application Wizard, Payment Flow, and Portfolio Dashboard. Tests must be reliable (<3% flaky rate) and fast (<5 minutes total runtime).

### Context

Current state:
- No E2E test framework
- Manual testing only (time-consuming, error-prone)
- No automated regression testing

This story establishes E2E testing foundation before Sprint 2 (Analytics MVP).

---

## Acceptance Criteria

### AC-1.5.1: Playwright Configuration
**Given** Playwright is installed
**When** I run `npm run test:e2e`
**Then** E2E tests execute in Chromium + mobile viewport

**Configuration Requirements:**
- Test directory: `tests/e2e`
- Parallel execution: 2 workers in CI, unlimited locally
- Retry: 2x in CI, 0x locally
- Browsers: Chromium (desktop), iPhone 14 (mobile)
- Base URL: `http://localhost:3000`
- Artifacts: HTML report, screenshots on failure, video on failure

**Verification:**
- [ ] `npm run test:e2e` runs all E2E tests
- [ ] `npm run test:e2e:ui` opens Playwright UI
- [ ] `npm run test:e2e:debug` opens debug mode
- [ ] Tests run in Chromium and iPhone 14 viewports
- [ ] Dev server starts automatically before tests
- [ ] HTML report generated in `playwright-report/`
- [ ] Screenshots saved in `test-results/` on failure

---

### AC-1.5.2: Data Seeding Infrastructure
**Given** tests need consistent data
**When** tests run
**Then** database is seeded with idempotent test data

**Seeding Requirements:**
- Idempotent (can run multiple times without errors)
- Organization-scoped (test-org-1)
- Seed functions for: organizations, borrowers, lenders, properties, loans, payments
- Clean-up function to remove all test data

**Verification:**
- [ ] Seed functions at `tests/e2e/fixtures/seeds.ts`
- [ ] `seedTestOrganization()` creates test org
- [ ] `seedBorrowers(count, orgId)` creates N borrowers
- [ ] `seedProperties(count, orgId)` creates N properties
- [ ] `seedLoans(...)` creates loans with relationships
- [ ] `seedPayments(loans)` creates payments for loans
- [ ] `cleanTestData()` removes all test data
- [ ] Seeding uses Supabase service role (admin access)
- [ ] Seeding is fast (<5 seconds for 100 records)

---

### AC-1.5.3: Page Objects
**Given** tests need reusable page interactions
**When** I write E2E tests
**Then** I use page object classes for common pages

**Page Objects Required:**
- `LoanApplicationPage` (loan wizard)
- `LoanDetailPage` (loan detail view)
- `PaymentRecordPage` (payment dialog)
- `DashboardPage` (analytics dashboard - placeholder for Sprint 2)

**Verification:**
- [ ] Page objects at `tests/e2e/fixtures/pages/*.ts`
- [ ] Each page object has:
  - Locators for all interactive elements
  - Methods for common actions (fillForm, submit, etc.)
  - Getters for data verification
- [ ] Locators use accessible selectors (getByRole, getByLabel)
- [ ] No hard-coded waits (use auto-waiting)

---

### AC-1.5.4: E2E Test - Application Wizard
**Given** I am a loan officer
**When** I complete the loan application wizard
**Then** the loan is created successfully

**Test Steps:**
1. Navigate to `/loans/new`
2. Step 1: Select borrower (from seeded data)
3. Step 2: Select property (from seeded data)
4. Step 3: Enter loan terms (amount, rate, term, structure)
5. Step 4: Review and submit
6. Verify redirect to loan detail page
7. Verify loan appears in database

**Edge Cases:**
- Validation errors (required fields)
- Form auto-save to localStorage
- Back button navigation
- Cancel button returns to loans list

**Verification:**
- [ ] Happy path test passes
- [ ] Validation test passes
- [ ] Auto-save test passes
- [ ] Tests run in <30 seconds
- [ ] No flaky failures (5 runs, 0 failures)

---

### AC-1.5.5: E2E Test - Payment Flow
**Given** a loan exists
**When** I record a payment
**Then** the payment is saved and loan balance updates

**Test Steps:**
1. Seed a loan with known balance ($250,000)
2. Navigate to loan detail page
3. Click "Record Payment" button
4. Fill payment form (amount: $2,500, date, method)
5. Submit form
6. Verify success toast appears
7. Verify payment in Payments tab
8. Verify balance updated ($247,500)

**Edge Cases:**
- Payment allocation (principal vs interest)
- Late payment (fee calculation)
- Overpayment (excess handling)

**Verification:**
- [ ] Happy path test passes
- [ ] Payment allocation test passes
- [ ] Tests run in <30 seconds
- [ ] No flaky failures (5 runs, 0 failures)
- [ ] Balance calculation verified

---

### AC-1.5.6: E2E Test - Portfolio Dashboard
**Given** loans exist in database
**When** I navigate to the dashboard
**Then** I see portfolio metrics

**Test Steps:**
1. Seed 20 loans with mixed statuses
2. Navigate to `/dashboard`
3. Verify key metrics display:
   - Total Portfolio balance
   - Active Loan count
   - Weighted Avg Coupon
   - NPL Rate
4. Apply status filter
5. Verify metrics update

**Note:** This test is a placeholder for Sprint 2. Dashboard UI doesn't exist yet, so test may be skipped with `test.skip()` until Story 2.5 completes.

**Verification:**
- [ ] Test structure ready
- [ ] Seeding logic works
- [ ] Test can be enabled in Sprint 2
- [ ] Test marked as `.skip()` if dashboard not ready

---

### AC-1.5.7: CI Integration (<3% Flaky Rate)
**Given** E2E tests run in CI
**When** tests execute 100 times
**Then** <3 failures occur (success rate >97%)

**Flaky Test Prevention:**
- Use Playwright auto-waiting (no hard-coded waits)
- Use stable selectors (getByRole, getByLabel, not CSS classes)
- Seed idempotent data (UUIDs, not auto-increment IDs)
- Retry 2x in CI
- Parallel execution: 2 workers (to catch race conditions)

**Verification:**
- [ ] Run tests 10x locally: 0 failures
- [ ] Run tests in CI: <3% flaky rate
- [ ] Retry logic works (flaky tests pass on retry)
- [ ] Parallel execution doesn't cause race conditions

---

### AC-1.5.8: HTML Test Report
**Given** E2E tests have run
**When** I open `playwright-report/index.html`
**Then** I see:
- Test results summary (passed, failed, skipped)
- Duration per test
- Screenshots for failed tests
- Video for failed tests (optional)
- Test code with annotations

**Verification:**
- [ ] HTML report generated after tests
- [ ] Report opens in browser
- [ ] Click test to see details
- [ ] Screenshots visible for failures
- [ ] Test duration tracked

---

### AC-1.5.9: Screenshots & Videos on Failure
**Given** a test fails
**When** I review test artifacts
**Then** I find:
- Screenshot at point of failure
- Video of full test execution (optional)
- Trace file for detailed debugging

**Verification:**
- [ ] Screenshots in `test-results/`
- [ ] Videos in `test-results/` (if enabled)
- [ ] Traces can be viewed with `npx playwright show-trace`
- [ ] Artifacts help debug failures quickly

---

## Technical Specification

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
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

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

### Data Seeding

```typescript
// tests/e2e/fixtures/seeds.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function seedTestOrganization() {
  const testOrg = {
    id: 'test-org-1',
    name: 'Test Lender Co',
    slug: 'test-lender',
  };

  await supabase
    .from('organizations')
    .upsert(testOrg, { onConflict: 'id' });

  return testOrg;
}

export async function cleanTestData() {
  await supabase.from('payments').delete().ilike('id', 'payment-%');
  await supabase.from('loans').delete().ilike('id', 'loan-%');
  await supabase.from('properties').delete().ilike('id', 'property-%');
  await supabase.from('borrowers').delete().ilike('id', 'borrower-%');
  await supabase.from('organizations').delete().eq('id', 'test-org-1');
}
```

### Page Object Example

```typescript
// tests/e2e/fixtures/pages/LoanApplicationPage.ts
import { Locator, Page } from '@playwright/test';

export class LoanApplicationPage {
  readonly page: Page;
  readonly borrowerSelect: Locator;
  readonly propertySelect: Locator;
  readonly amountInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.borrowerSelect = page.getByLabel('Borrower');
    this.propertySelect = page.getByLabel('Property');
    this.amountInput = page.getByLabel('Loan Amount');
    this.submitButton = page.getByRole('button', { name: 'Create Loan' });
  }

  async goto() {
    await this.page.goto('/loans/new');
  }

  async fillLoanDetails(details: {
    borrower: string;
    property: string;
    amount: number;
  }) {
    await this.borrowerSelect.click();
    await this.page.getByText(details.borrower).click();

    await this.propertySelect.click();
    await this.page.getByText(details.property).click();

    await this.amountInput.fill(details.amount.toString());
  }

  async submit() {
    await this.submitButton.click();
  }
}
```

---

## Implementation Tasks

### Task 1: Install Playwright
**Estimated:** 15 minutes

```bash
npm install -D @playwright/test
npx playwright install chromium
```

**Definition of Done:**
- Playwright installed
- Chromium browser installed
- No version conflicts

---

### Task 2: Create Playwright Configuration
**File:** `playwright.config.ts`
**Estimated:** 30 minutes

- [ ] Create config with all settings
- [ ] Configure retry logic (2x in CI)
- [ ] Configure browsers (Chromium, iPhone 14)
- [ ] Configure web server (auto-start dev)
- [ ] Test configuration works

**Definition of Done:**
- Config file exists
- Dev server starts automatically
- Tests can run

---

### Task 3: Create Data Seeding Infrastructure
**File:** `tests/e2e/fixtures/seeds.ts`
**Estimated:** 2 hours

- [ ] Implement `seedTestOrganization()`
- [ ] Implement `seedBorrowers(count, orgId)`
- [ ] Implement `seedProperties(count, orgId)`
- [ ] Implement `seedLoans(...)`
- [ ] Implement `seedPayments(loans)`
- [ ] Implement `cleanTestData()`
- [ ] Test seeding locally

**Definition of Done:**
- All seed functions work
- Idempotent (can run multiple times)
- Fast (<5 seconds for 100 records)
- Clean-up removes all test data

---

### Task 4: Create Page Objects
**Files:** `tests/e2e/fixtures/pages/*.ts`
**Estimated:** 2 hours

- [ ] LoanApplicationPage (wizard interactions)
- [ ] LoanDetailPage (view loan, record payment)
- [ ] PaymentRecordPage (payment dialog)
- [ ] DashboardPage (placeholder for Sprint 2)

**Definition of Done:**
- All page objects implemented
- Methods use accessible selectors
- No hard-coded waits

---

### Task 5: Write Application Wizard E2E Test
**File:** `tests/e2e/loan-application.spec.ts`
**Estimated:** 3 hours

- [ ] Happy path test (complete wizard)
- [ ] Validation test (required fields)
- [ ] Auto-save test (localStorage persistence)
- [ ] Cancel test (returns to list)

**Definition of Done:**
- 4 test cases
- All tests pass
- No flaky failures (5 runs, 0 failures)
- Tests run in <30 seconds

---

### Task 6: Write Payment Flow E2E Test
**File:** `tests/e2e/payment-flow.spec.ts`
**Estimated:** 2 hours

- [ ] Happy path test (record payment)
- [ ] Payment allocation test (principal/interest split)

**Definition of Done:**
- 2 test cases
- All tests pass
- Balance calculation verified
- No flaky failures

---

### Task 7: Write Portfolio Dashboard E2E Test
**File:** `tests/e2e/portfolio-dashboard.spec.ts`
**Estimated:** 1 hour

- [ ] Create test structure
- [ ] Implement seeding logic
- [ ] Mark test as `.skip()` (dashboard doesn't exist yet)
- [ ] Add TODO comment for Sprint 2

**Definition of Done:**
- Test structure ready
- Can be enabled in Sprint 2
- Seeding logic works

---

### Task 8: Add NPM Scripts
**File:** `package.json`
**Estimated:** 10 minutes

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

**Definition of Done:**
- All scripts work
- Tests run in CI
- Debug mode works

---

### Task 9: Verify Flaky Rate
**Estimated:** 1 hour

- [ ] Run tests 10x locally: 0 failures
- [ ] Run tests in CI: <3% flaky rate
- [ ] Fix any flaky tests (use better selectors, add waits)

**Definition of Done:**
- <3% flaky rate achieved
- Tests reliable in CI

---

## Files to Create

1. `playwright.config.ts` (configuration)
2. `tests/e2e/fixtures/seeds.ts` (data seeding)
3. `tests/e2e/fixtures/pages/LoanApplicationPage.ts`
4. `tests/e2e/fixtures/pages/LoanDetailPage.ts`
5. `tests/e2e/fixtures/pages/PaymentRecordPage.ts`
6. `tests/e2e/fixtures/pages/DashboardPage.ts`
7. `tests/e2e/loan-application.spec.ts`
8. `tests/e2e/payment-flow.spec.ts`
9. `tests/e2e/portfolio-dashboard.spec.ts`

**Total:** 9 new files, ~800 lines of code

---

## Files to Modify

1. `package.json` (add E2E scripts)
2. `.gitignore` (add `test-results/`, `playwright-report/`)
3. `.env.test` (add test environment variables)

---

## Dependencies

### External
- `@playwright/test` (E2E framework)

### Internal
- Supabase client (for data seeding)
- All pages being tested

---

## Testing Strategy

### Meta: Testing the Tests
- Run tests 10x to verify no flaky failures
- Test retry logic works
- Test parallel execution doesn't cause race conditions

---

## Definition of Done

- [ ] All 9 acceptance criteria verified
- [ ] All 9 implementation tasks completed
- [ ] 3 E2E flows implemented (1 skipped for Sprint 2)
- [ ] Flaky rate <3%
- [ ] Tests run in <5 minutes
- [ ] HTML report generated
- [ ] Code review completed
- [ ] Merged to main

---

**Story Status:** Ready for Development
**Created:** October 19, 2025
**Last Updated:** October 19, 2025
**Estimated Completion:** 2 days
