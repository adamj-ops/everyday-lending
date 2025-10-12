# Story 6.2: Servicing API Routes

Status: Draft

## Story

As a developer,
I want comprehensive servicing API routes,
so that the frontend can perform all servicing-related operations including fee management, income tracking, and servicing analytics.

## Acceptance Criteria

1. **Servicing Income CRUD Operations**
   - `GET /api/servicing-income` - List servicing income with search and pagination
   - `POST /api/servicing-income` - Create new servicing income record
   - `GET /api/servicing-income/[id]` - Get single servicing income details
   - `PATCH /api/servicing-income/[id]` - Update servicing income record
   - `DELETE /api/servicing-income/[id]` - Delete servicing income record

2. **Fee Types Management**
   - `GET /api/fee-types` - List all fee types
   - `POST /api/fee-types` - Create new fee type
   - `GET /api/fee-types/[id]` - Get single fee type details
   - `PATCH /api/fee-types/[id]` - Update fee type
   - `DELETE /api/fee-types/[id]` - Delete fee type

3. **Servicing Analytics**
   - `GET /api/servicing/stats` - Get servicing statistics
   - `GET /api/servicing/income-trends` - Get income trends over time
   - `GET /api/servicing/fee-collection-rates` - Get fee collection rates
   - `GET /api/servicing/performance-metrics` - Get performance metrics

4. **Fee Management Operations**
   - `POST /api/servicing/calculate-fees` - Calculate fees for loan
   - `POST /api/servicing/apply-fees` - Apply fees to loan
   - `POST /api/servicing/waive-fees` - Waive fees for loan
   - `POST /api/servicing/adjust-fees` - Adjust fees for loan

5. **Servicing Reports**
   - `GET /api/servicing/reports` - Generate servicing reports
   - `GET /api/servicing/export` - Export servicing data
   - `GET /api/servicing/audit-trail` - Get servicing audit trail
   - `POST /api/servicing/generate-statement` - Generate loan statement

## Tasks / Subtasks

- [ ] Create servicing income CRUD routes (AC: 1)
  - [ ] Implement `/api/servicing-income/route.ts` with GET and POST
  - [ ] Implement `/api/servicing-income/[id]/route.ts` with GET, PATCH, DELETE
  - [ ] Add Zod validation schemas for servicing income data
  - [ ] Implement search and pagination for GET /api/servicing-income
- [ ] Implement fee types management routes (AC: 2)
  - [ ] Implement `/api/fee-types/route.ts` with GET and POST
  - [ ] Implement `/api/fee-types/[id]/route.ts` with GET, PATCH, DELETE
  - [ ] Add Zod validation schemas for fee types
  - [ ] Implement fee type configuration logic
- [ ] Add servicing analytics routes (AC: 3)
  - [ ] Create `/api/servicing/stats/route.ts`
  - [ ] Create `/api/servicing/income-trends/route.ts`
  - [ ] Create `/api/servicing/fee-collection-rates/route.ts`
  - [ ] Create `/api/servicing/performance-metrics/route.ts`
  - [ ] Add data aggregation and analytics logic
- [ ] Implement fee management routes (AC: 4)
  - [ ] Create `/api/servicing/calculate-fees/route.ts`
  - [ ] Create `/api/servicing/apply-fees/route.ts`
  - [ ] Create `/api/servicing/waive-fees/route.ts`
  - [ ] Create `/api/servicing/adjust-fees/route.ts`
  - [ ] Implement fee calculation and application logic
- [ ] Add servicing reports routes (AC: 5)
  - [ ] Create `/api/servicing/reports/route.ts`
  - [ ] Create `/api/servicing/export/route.ts`
  - [ ] Create `/api/servicing/audit-trail/route.ts`
  - [ ] Create `/api/servicing/generate-statement/route.ts`
  - [ ] Implement report generation and export logic

## Dev Notes

- Follow existing API route patterns from borrowers, lenders, loans routes
- Use existing database tables: `servicing_income` and `fee_types`
- Implement proper error handling with descriptive messages
- Add rate limiting for servicing endpoints
- Ensure all routes are properly authenticated
- Use Drizzle ORM for database operations
- Implement proper logging for audit trails
- Follow established service layer patterns

### Project Structure Notes

- Align with existing API structure in `/src/app/api/`
- Use existing validation patterns from `/src/validations/`
- Follow established error handling patterns
- Maintain consistency with existing service layer architecture

### References

- [Source: src/app/api/borrowers/route.ts] - Basic CRUD pattern
- [Source: src/app/api/loans/route.ts] - Search and pagination pattern
- [Source: src/models/Schema.ts] - Servicing income and fee types tables
- [Source: src/validations/BorrowerValidation.ts] - Validation pattern
- [Source: docs/solution-architecture.md#Epic-6-Loan-Servicing] - Servicing domain architecture

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4

### Debug Log References

### Completion Notes List

### File List
