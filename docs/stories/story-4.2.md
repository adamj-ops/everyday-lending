# Story 4.2: Payments API Routes

Status: Draft

## Story

As a developer,
I want comprehensive payments API routes,
so that the frontend can perform all payment-related operations including CRUD, processing, and reconciliation.

## Acceptance Criteria

1. **Basic CRUD Operations**
   - `GET /api/payments` - List payments with search and pagination
   - `POST /api/payments` - Create new payment record
   - `GET /api/payments/[id]` - Get single payment details
   - `PATCH /api/payments/[id]` - Update payment record
   - `DELETE /api/payments/[id]` - Delete payment record

2. **Payment Processing**
   - `POST /api/payments/process` - Process payment via Stripe/Plaid
   - `POST /api/payments/batch` - Process multiple payments
   - `POST /api/payments/retry` - Retry failed payment
   - `POST /api/payments/refund` - Process payment refund

3. **Payment Reconciliation**
   - `GET /api/payments/reconciliation` - Get reconciliation data
   - `POST /api/payments/reconcile` - Reconcile payments
   - `GET /api/payments/unreconciled` - Get unreconciled payments

4. **Payment Analytics**
   - `GET /api/payments/stats` - Get payment statistics
   - `GET /api/payments/reports` - Generate payment reports
   - `GET /api/payments/export` - Export payment data

5. **Webhook Integration**
   - `POST /api/webhooks/stripe` - Handle Stripe webhooks
   - `POST /api/webhooks/plaid` - Handle Plaid webhooks
   - Implement webhook signature verification
   - Add idempotency handling

## Tasks / Subtasks

- [ ] Create basic CRUD routes (AC: 1)
  - [ ] Implement `/api/payments/route.ts` with GET and POST
  - [ ] Implement `/api/payments/[id]/route.ts` with GET, PATCH, DELETE
  - [ ] Add Zod validation schemas for payment data
  - [ ] Implement search and pagination for GET /api/payments
- [ ] Implement payment processing routes (AC: 2)
  - [ ] Create `/api/payments/process/route.ts`
  - [ ] Create `/api/payments/batch/route.ts`
  - [ ] Create `/api/payments/retry/route.ts`
  - [ ] Create `/api/payments/refund/route.ts`
  - [ ] Integrate with PaymentService for business logic
- [ ] Add reconciliation routes (AC: 3)
  - [ ] Create `/api/payments/reconciliation/route.ts`
  - [ ] Create `/api/payments/reconcile/route.ts`
  - [ ] Create `/api/payments/unreconciled/route.ts`
  - [ ] Implement reconciliation logic
- [ ] Implement analytics routes (AC: 4)
  - [ ] Create `/api/payments/stats/route.ts`
  - [ ] Create `/api/payments/reports/route.ts`
  - [ ] Create `/api/payments/export/route.ts`
  - [ ] Add data aggregation and reporting logic
- [ ] Add webhook routes (AC: 5)
  - [ ] Create `/api/webhooks/stripe/route.ts`
  - [ ] Create `/api/webhooks/plaid/route.ts`
  - [ ] Implement webhook signature verification
  - [ ] Add idempotency handling with Redis

## Dev Notes

- Follow existing API route patterns from borrowers, lenders, loans routes
- Use PaymentService for business logic, not direct database access
- Implement proper error handling with descriptive messages
- Add rate limiting for payment processing endpoints
- Ensure all routes are properly authenticated
- Use Drizzle ORM for database operations
- Implement proper logging for audit trails

### Project Structure Notes

- Align with existing API structure in `/src/app/api/`
- Use existing validation patterns from `/src/validations/`
- Follow established error handling patterns
- Maintain consistency with existing service layer architecture

### References

- [Source: src/app/api/borrowers/route.ts] - Basic CRUD pattern
- [Source: src/app/api/loans/route.ts] - Search and pagination pattern
- [Source: src/services/PaymentService.ts] - Business logic service
- [Source: src/validations/BorrowerValidation.ts] - Validation pattern
- [Source: docs/solution-architecture.md#Epic-4-Payment-Processing] - Payment domain architecture

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4

### Debug Log References

### Completion Notes List

### File List
