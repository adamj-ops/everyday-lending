# Story 1.0: LoanService Service Layer Foundation

Status: Draft

## Story

As a **developer**,
I want a **LoanService service layer** that abstracts business logic from API routes,
so that we have a maintainable, testable foundation for implementing loan lifecycle workflows.

## Acceptance Criteria

**AC-1: Service Layer Structure Created**
- `/src/services/` directory exists with proper TypeScript configuration
- `LoanService.ts` class created with clear method signatures
- Service follows single responsibility principle (loan operations only)
- Service is instantiable and injectable for testing

**AC-2: CRUD Operations Implemented**
- `getLoans(filters?)` - Retrieve loans with optional filtering/search
- `getLoanById(id)` - Retrieve single loan with borrower and property relationships
- `createLoan(data)` - Create new loan with validation
- `updateLoan(id, data)` - Update existing loan with validation
- `deleteLoan(id)` - Soft delete loan (archive pattern)
- All methods use Drizzle ORM for database operations
- All methods return typed results (no `any` types)

**AC-3: Business Logic Encapsulation**
- Loan number generation logic moved from API route to `generateLoanNumber()` method
- Monthly payment calculation logic moved from API route to `calculateMonthlyPayment(principal, rate, term)` method
- Maturity date calculation moved from API route to `calculateMaturityDate(originationDate, termMonths)` method
- All calculations include JSDoc documentation with examples

**AC-4: API Routes Refactored to Use Service**
- `/src/app/api/loans/route.ts` refactored to call `LoanService` methods
- `/src/app/api/borrowers/route.ts` refactored where it queries loans
- API routes become thin wrappers: parse request → call service → return response
- Error handling remains in API routes (HTTP-specific logic)

**AC-5: Comprehensive Unit Tests**
- `tests/services/LoanService.test.ts` created with Vitest
- Unit tests for all CRUD methods with mocked Drizzle database
- Unit tests for business logic (loan number generation, calculations)
- Test coverage ≥90% on LoanService methods
- Tests include edge cases (null values, invalid inputs, boundary conditions)

**AC-6: Integration Tests**
- `tests/integration/LoanService.integration.test.ts` created
- Integration tests with real database (PGlite test instance)
- Test full round-trip: create → read → update → delete
- Test with actual Drizzle schema and relationships

**AC-7: Type Safety & Error Handling**
- Service methods throw typed errors (e.g., `LoanNotFoundError`, `ValidationError`)
- All database operations wrapped in try-catch with appropriate error transformation
- Zod schemas used for input validation before database operations
- TypeScript strict mode compliance (no `any`, no type assertions without justification)

**AC-8: Documentation & Dev Experience**
- README.md in `/src/services/` explaining service layer pattern
- JSDoc comments on all public service methods
- Example usage code snippets in README
- Service instantiation pattern documented (singleton vs. per-request)

## Tasks / Subtasks

- [ ] **Task 1: Create Service Layer Structure** (AC-1)
  - [ ] Create `/src/services/` directory
  - [ ] Add `tsconfig.json` path alias for `@/services/*`
  - [ ] Create `LoanService.ts` with class skeleton and method signatures
  - [ ] Add Drizzle DB instance to service constructor

- [ ] **Task 2: Implement CRUD Operations** (AC-2)
  - [ ] Implement `getLoans(filters?)` with Drizzle select + where clauses
  - [ ] Implement `getLoanById(id)` with leftJoin for borrower/property
  - [ ] Implement `createLoan(data)` with Drizzle insert
  - [ ] Implement `updateLoan(id, data)` with Drizzle update
  - [ ] Implement `deleteLoan(id)` with soft delete pattern (status = 'archived')
  - [ ] Add TypeScript return types for all methods

- [ ] **Task 3: Encapsulate Business Logic** (AC-3)
  - [ ] Extract `generateLoanNumber()` from `/src/app/api/loans/route.ts`
  - [ ] Extract `calculateMonthlyPayment(principal, rate, term)` calculation
  - [ ] Extract `calculateMaturityDate(originationDate, termMonths)` calculation
  - [ ] Add JSDoc with examples for each calculation method

- [ ] **Task 4: Refactor API Routes** (AC-4)
  - [ ] Refactor `/src/app/api/loans/route.ts` GET handler to use `LoanService.getLoans()`
  - [ ] Refactor `/src/app/api/loans/route.ts` POST handler to use `LoanService.createLoan()`
  - [ ] Refactor `/src/app/api/borrowers/route.ts` to use `LoanService` for loan queries
  - [ ] Remove business logic from API routes (keep only HTTP parsing/response)

- [ ] **Task 5: Write Unit Tests** (AC-5)
  - [ ] Create `tests/services/LoanService.test.ts` with Vitest setup
  - [ ] Mock Drizzle database using `vi.mock()`
  - [ ] Write unit tests for `getLoans()`, `getLoanById()`, `createLoan()`, `updateLoan()`, `deleteLoan()`
  - [ ] Write unit tests for `generateLoanNumber()`, `calculateMonthlyPayment()`, `calculateMaturityDate()`
  - [ ] Test edge cases: null inputs, invalid data, boundary conditions
  - [ ] Achieve ≥90% code coverage (verify with `pnpm test:coverage`)

- [ ] **Task 6: Write Integration Tests** (AC-6)
  - [ ] Create `tests/integration/LoanService.integration.test.ts`
  - [ ] Set up PGlite test database with Drizzle schema
  - [ ] Write integration test: full CRUD lifecycle (create → read → update → delete)
  - [ ] Test relationships: loan with borrower and property joined
  - [ ] Clean up test data after each test (afterEach hook)

- [ ] **Task 7: Error Handling & Validation** (AC-7)
  - [ ] Create custom error classes: `LoanNotFoundError`, `ValidationError`, `DatabaseError`
  - [ ] Wrap all Drizzle operations in try-catch blocks
  - [ ] Add Zod validation for `createLoan(data)` and `updateLoan(id, data)` inputs
  - [ ] Validate TypeScript strict mode compliance with `pnpm type-check`

- [ ] **Task 8: Documentation** (AC-8)
  - [ ] Create `/src/services/README.md` with service layer pattern explanation
  - [ ] Add JSDoc comments to all public LoanService methods
  - [ ] Document service instantiation pattern (singleton recommended)
  - [ ] Add usage examples in README (how API routes should call services)

## Dev Notes

### Architecture Context

**Service Layer Pattern** (Source: `/docs/solution-architecture.md#Architecture Pattern Decision`)

```
Next.js App (Presentation)
  → API Routes (HTTP Layer)
    → Services (Business Logic)
      → Data Access (Drizzle ORM)
        → PostgreSQL
```

**Key Principles:**
- **Separation of Concerns**: API routes handle HTTP (parsing, auth, responses); Services handle business logic
- **Testability**: Services can be unit tested without spinning up HTTP server
- **Reusability**: Multiple API routes can call the same service methods
- **Type Safety**: Services enforce strict TypeScript contracts

**Pattern Reference:** Enhanced Modular Monolith with Service Layer (see `/docs/solution-architecture.md` lines 402-419)

### Existing Code to Refactor

**Current State:**
- API routes in `/src/app/api/loans/route.ts` contain business logic directly
- Loan number generation happens inline in POST handler (lines ~50-60)
- Monthly payment calculation happens inline (lines ~70-80)
- No clear separation between HTTP and domain logic

**Target State:**
- API routes become thin wrappers: `request → service.method() → response`
- All business logic moves to `LoanService`
- Service is independently testable with mocked database

### Database Integration

**Drizzle Connection:**
- Use existing `db` instance from `/src/libs/DB.ts`
- Import schema tables: `import { loans, borrowers, properties } from '@/models/Schema'`
- Use Drizzle query builder: `db.select()`, `db.insert()`, `db.update()`, `db.delete()`

**Key Schema Tables:**
- `loans` - Primary table (9 columns, foreign keys to borrowers/properties)
- `borrowers` - Related via `loans.borrowerId`
- `properties` - Related via `loans.propertyId`

**Relationships:**
```typescript
// Example: Get loan with borrower and property
const loan = await db
  .select()
  .from(loans)
  .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
  .leftJoin(properties, eq(loans.propertyId, properties.id))
  .where(eq(loans.id, loanId))
  .limit(1);
```

### Testing Standards

**Testing Framework:** Vitest (configured in `vitest.config.mts`)

**Test File Locations:**
- Unit tests: `/tests/services/LoanService.test.ts`
- Integration tests: `/tests/integration/LoanService.integration.test.ts`

**Coverage Target:** ≥90% for service layer methods

**Mocking Strategy:**
- **Unit Tests**: Mock Drizzle database using `vi.mock('@/libs/DB')`
- **Integration Tests**: Use PGlite (in-memory PostgreSQL) with real Drizzle schema

**Test Pattern Example:**
```typescript
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoanService } from '@/services/LoanService';

describe('LoanService', () => {
  let loanService: LoanService;

  beforeEach(() => {
    // Mock database
    vi.mock('@/libs/DB');
    loanService = new LoanService();
  });

  it('should create a loan with valid data', async () => {
    const loanData = { /* ... */ };
    const result = await loanService.createLoan(loanData);

    expect(result.id).toBeDefined();
    expect(result.loanNumber).toMatch(/^L-\d{6}$/);
  });
});
```

### Error Handling Pattern

**Custom Error Classes:**
```typescript
export class LoanNotFoundError extends Error {
  constructor(loanId: number) {
    super(`Loan with ID ${loanId} not found`);
    this.name = 'LoanNotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

**Usage in Service:**
```typescript
async getLoanById(id: number) {
  try {
    const loan = await db.select()...where(eq(loans.id, id));
    if (!loan) throw new LoanNotFoundError(id);
    return loan;
  } catch (error) {
    if (error instanceof LoanNotFoundError) throw error;
    throw new DatabaseError('Failed to retrieve loan', error);
  }
}
```

**API Route Handling:**
```typescript
// In /src/app/api/loans/[id]/route.ts
try {
  const loan = await loanService.getLoanById(id);
  return NextResponse.json(loan);
} catch (error) {
  if (error instanceof LoanNotFoundError) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

### Project Structure Notes

**New Directories Created:**
- `/src/services/` - Service layer for business logic
- `/tests/services/` - Unit tests for services
- `/tests/integration/` - Integration tests with real database

**Path Alias Configuration:**
Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/services/*": ["./src/services/*"]
    }
  }
}
```

### References

- [Solution Architecture - Service Layer Pattern] `/docs/solution-architecture.md` lines 402-466
- [Solution Architecture - Component Boundaries] `/docs/solution-architecture.md` lines 726-834
- [Solution Architecture - Project Structure] `/docs/solution-architecture.md` lines 1427-1461
- [Existing Drizzle Schema] `/src/models/Schema.ts`
- [Current Loans API Route] `/src/app/api/loans/route.ts`
- [Current Borrowers API Route] `/src/app/api/borrowers/route.ts`
- [Testing Strategy - Deep Dive Analysis] `/reports/deep-dive-analysis.md`

### Dependencies

**Existing (No New Installs Required):**
- `drizzle-orm` - Database ORM
- `@neondatabase/serverless` or `postgres` - PostgreSQL client
- `zod` - Input validation
- `vitest` - Testing framework
- `@electric-sql/pglite` - In-memory PostgreSQL for integration tests

### Constraints

1. **No Premature Abstraction**: Start with a single `LoanService` class. Don't create base classes or over-engineer.
2. **Boring Technology First**: Use plain TypeScript classes, no complex patterns (no factories, no dependency injection containers).
3. **Incremental Migration**: Refactor API routes one at a time to use the service. Don't break existing functionality.
4. **Test-First Development**: Write tests alongside implementation, not after.
5. **Type Safety**: Zero `any` types, full TypeScript strict mode compliance.

### Success Criteria

✅ **Definition of Done:**
- All 8 acceptance criteria met
- Tests pass: `pnpm test` (unit + integration)
- Type check passes: `pnpm type-check`
- Linting passes: `pnpm lint`
- Code coverage ≥90% on service methods: `pnpm test:coverage`
- API routes refactored and working (manual smoke test or E2E test)
- README documentation complete and accurate

✅ **Verification Steps:**
1. Run `pnpm test` - all tests green
2. Run `pnpm type-check` - no TypeScript errors
3. Run `pnpm test:coverage` - ≥90% coverage on `/src/services/LoanService.ts`
4. Manually test API routes: `curl http://localhost:3000/api/loans`
5. Review code: service methods are clean, well-documented, and follow patterns

## Dev Agent Record

### Context Reference

<!-- Story Context XML will be auto-generated by story-context workflow -->

### Agent Model Used

<!-- To be filled by dev agent -->

### Debug Log References

<!-- To be filled by dev agent -->

### Completion Notes List

<!-- To be filled by dev agent -->

### File List

<!-- To be filled by dev agent -->

---

**Story Created:** October 11, 2025 by Bob (Scrum Master - BMAD)
**Story Points:** 5 (Estimated)
**Epic:** 1.0 (Foundation - Pre-Epic 1 foundational work)
**Priority:** P0 (Blocker for loan lifecycle features)
