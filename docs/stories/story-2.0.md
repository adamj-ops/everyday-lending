# Story 2.0: Payment Processing Platform Foundation

Status: Draft

## Story

As a **lender**,
I want a **PaymentService with Stripe Connect and Plaid integration** that processes loan payments automatically,
so that I can collect payments efficiently and distribute funds to participating lenders without manual intervention.

## Acceptance Criteria

**AC-1: PaymentService Architecture Created**
- `/src/services/PaymentService.ts` class created with clear method signatures
- Service integrates with existing `LoanService` for loan data retrieval
- Service follows single responsibility principle (payment operations only)
- Service is instantiable and injectable for testing

**AC-2: Stripe Connect Integration Scaffolding**
- `StripeService.ts` wrapper class created for Stripe Connect operations
- Stripe Connect SDK configured with environment variables
- Connected account creation methods (`createConnectedAccount`, `getAccountStatus`)
- Payment intent creation and processing methods (`createPaymentIntent`, `processPayment`)
- Webhook signature verification utility (`verifyWebhookSignature`)

**AC-3: Plaid Integration Scaffolding**
- `PlaidService.ts` wrapper class created for Plaid operations
- Plaid SDK configured with environment variables
- Bank account linking methods (`createLinkToken`, `exchangePublicToken`)
- ACH transfer initiation methods (`createACHTransfer`, `getTransferStatus`)
- Account verification methods (`verifyAccount`, `getAccountBalance`)

**AC-4: Payment Processing Core Logic**
- `processPayment(loanId, amount, method)` method implemented
- Payment waterfall logic: Interest → Principal → Fees → Escrow
- Payment allocation tracking and loan balance updates
- Integration with `LoanService` for loan data and balance calculations
- Support for partial payments and overpayments

**AC-5: Payment API Routes Created**
- `/src/app/api/payments/route.ts` - GET (list payments), POST (create payment)
- `/src/app/api/payments/[id]/route.ts` - GET, PATCH, DELETE individual payments
- `/src/app/api/payments/[id]/process/route.ts` - RPC endpoint for payment processing
- `/src/app/api/webhooks/stripe/route.ts` - Stripe webhook handler
- `/src/app/api/webhooks/plaid/route.ts` - Plaid webhook handler

**AC-6: Payment Data Model Integration**
- PaymentService uses existing `payments` table from Drizzle schema
- Payment records include: loanId, amount, type, status, processedAt, method
- Payment status tracking: pending, processing, completed, failed, refunded
- Integration with `lenderParticipations` table for multi-lender splits

**AC-7: Comprehensive Unit Tests**
- `tests/services/PaymentService.test.ts` created with Vitest
- Unit tests for all payment processing methods with mocked Stripe/Plaid
- Unit tests for payment waterfall logic and allocation calculations
- Test coverage ≥90% on PaymentService methods
- Tests include edge cases: failed payments, partial payments, overpayments

**AC-8: Integration Tests**
- `tests/integration/PaymentService.integration.test.ts` created
- Integration tests with real database (PGlite) and mocked Stripe/Plaid APIs
- Test full payment lifecycle: create → process → allocate → update loan balance
- Test webhook processing with signature verification

**AC-9: Error Handling & Security**
- Custom error classes: `PaymentFailedError`, `WebhookVerificationError`, `InsufficientFundsError`
- All Stripe/Plaid operations wrapped in try-catch with appropriate error transformation
- Webhook signature verification for security
- Idempotency keys for payment processing to prevent duplicate charges

**AC-10: Documentation & Configuration**
- README.md in `/src/services/` explaining payment processing architecture
- Environment variable documentation for Stripe and Plaid configuration
- JSDoc comments on all public service methods
- Example usage code snippets and webhook handling patterns

## Tasks / Subtasks

- [ ] **Task 1: PaymentService Architecture** (AC-1)
  - [ ] Create `/src/services/PaymentService.ts` with class skeleton
  - [ ] Add constructor with LoanService dependency injection
  - [ ] Define method signatures for all payment operations
  - [ ] Add TypeScript interfaces for payment data types

- [ ] **Task 2: Stripe Connect Integration** (AC-2)
  - [ ] Create `/src/services/StripeService.ts` wrapper class
  - [ ] Configure Stripe SDK with environment variables
  - [ ] Implement `createConnectedAccount()` for lender onboarding
  - [ ] Implement `createPaymentIntent()` for payment processing
  - [ ] Implement `verifyWebhookSignature()` for security
  - [ ] Add Stripe error handling and retry logic

- [ ] **Task 3: Plaid Integration** (AC-3)
  - [ ] Create `/src/services/PlaidService.ts` wrapper class
  - [ ] Configure Plaid SDK with environment variables
  - [ ] Implement `createLinkToken()` for bank account linking
  - [ ] Implement `exchangePublicToken()` for account verification
  - [ ] Implement `createACHTransfer()` for ACH payments
  - [ ] Add Plaid error handling and retry logic

- [ ] **Task 4: Payment Processing Logic** (AC-4)
  - [ ] Implement `processPayment(loanId, amount, method)` method
  - [ ] Implement payment waterfall: Interest → Principal → Fees → Escrow
  - [ ] Add payment allocation tracking and loan balance updates
  - [ ] Integrate with LoanService for loan data retrieval
  - [ ] Handle partial payments and overpayments

- [ ] **Task 5: API Routes Implementation** (AC-5)
  - [ ] Create `/src/app/api/payments/route.ts` with GET and POST handlers
  - [ ] Create `/src/app/api/payments/[id]/route.ts` with GET, PATCH, DELETE
  - [ ] Create `/src/app/api/payments/[id]/process/route.ts` RPC endpoint
  - [ ] Create `/src/app/api/webhooks/stripe/route.ts` webhook handler
  - [ ] Create `/src/app/api/webhooks/plaid/route.ts` webhook handler

- [ ] **Task 6: Database Integration** (AC-6)
  - [ ] Use existing `payments` table from Drizzle schema
  - [ ] Implement payment record creation and updates
  - [ ] Add payment status tracking and transitions
  - [ ] Integrate with `lenderParticipations` for multi-lender splits
  - [ ] Update loan balances after payment processing

- [ ] **Task 7: Unit Tests** (AC-7)
  - [ ] Create `tests/services/PaymentService.test.ts` with Vitest
  - [ ] Mock StripeService and PlaidService using `vi.mock()`
  - [ ] Test all payment processing methods
  - [ ] Test payment waterfall logic and allocation calculations
  - [ ] Test edge cases: failed payments, partial payments, overpayments
  - [ ] Achieve ≥90% code coverage

- [ ] **Task 8: Integration Tests** (AC-8)
  - [ ] Create `tests/integration/PaymentService.integration.test.ts`
  - [ ] Set up PGlite test database with Drizzle schema
  - [ ] Mock Stripe and Plaid APIs for integration testing
  - [ ] Test full payment lifecycle with real database
  - [ ] Test webhook processing with signature verification

- [ ] **Task 9: Error Handling & Security** (AC-9)
  - [ ] Create custom error classes for payment failures
  - [ ] Implement webhook signature verification
  - [ ] Add idempotency keys for payment processing
  - [ ] Wrap all external API calls in try-catch blocks
  - [ ] Add input validation with Zod schemas

- [ ] **Task 10: Documentation** (AC-10)
  - [ ] Create `/src/services/README.md` with payment architecture explanation
  - [ ] Document environment variables for Stripe and Plaid
  - [ ] Add JSDoc comments to all public methods
  - [ ] Document webhook handling patterns and security considerations
  - [ ] Add example usage code snippets

## Dev Notes

### Architecture Context

**Payment Processing Pattern** (Source: `/docs/solution-architecture.md#Epic 4: Payment Automation`)

```
API Routes (HTTP Layer)
  → PaymentService (Business Logic)
    → StripeService (Stripe Connect Integration)
    → PlaidService (Plaid Integration)
    → LoanService (Loan Data)
      → Drizzle ORM → PostgreSQL
```

**Key Principles:**
- **Service Layer**: PaymentService orchestrates payment processing
- **External Integration**: StripeService and PlaidService handle third-party APIs
- **Loan Integration**: PaymentService uses LoanService for loan data and balance updates
- **Webhook Processing**: Secure webhook handlers for real-time payment updates

**Pattern Reference:** Enhanced Modular Monolith with Service Layer (see `/docs/solution-architecture.md` lines 581-586)

### Integration Requirements

**Stripe Connect Integration:**
- **Lender Onboarding**: Create connected accounts for lenders
- **Payment Processing**: Process credit card and ACH payments
- **Fund Distribution**: Transfer funds to lender connected accounts
- **Webhook Handling**: Process payment.succeeded, payment.failed events

**Plaid Integration:**
- **Bank Account Linking**: Link borrower bank accounts securely
- **Account Verification**: Verify bank account ownership
- **ACH Transfers**: Initiate ACH payments from linked accounts
- **Balance Checks**: Verify sufficient funds before processing

**Payment Waterfall Logic:**
1. **Interest**: Apply payment to accrued interest first
2. **Principal**: Apply remaining payment to principal balance
3. **Fees**: Apply to any outstanding fees (late fees, processing fees)
4. **Escrow**: Apply to escrow account if applicable
5. **Overpayment**: Handle overpayments by applying to principal

### Database Schema Integration

**Existing Tables:**
- `payments` - Payment records (amount, type, status, processedAt)
- `loans` - Loan data with current balance tracking
- `lenderParticipations` - Multi-lender participation splits
- `borrowers` - Borrower information for payment processing

**Payment Status Flow:**
```
pending → processing → completed
                ↓
              failed → retry → completed
```

**Key Relationships:**
- `payments.loanId` → `loans.id`
- `loans.borrowerId` → `borrowers.id`
- `lenderParticipations.loanId` → `loans.id`

### External API Integration

**Stripe Connect API:**
- **Connected Accounts**: Create and manage lender accounts
- **Payment Intents**: Create and process payments
- **Transfers**: Distribute funds to connected accounts
- **Webhooks**: Real-time payment status updates

**Plaid API:**
- **Link Tokens**: Generate tokens for bank account linking
- **Public Tokens**: Exchange for access tokens
- **ACH Transfers**: Initiate and track ACH payments
- **Account Info**: Retrieve account details and balances

### Security Considerations

**Webhook Security:**
- Verify webhook signatures using Stripe/Plaid secret keys
- Implement idempotency keys to prevent duplicate processing
- Use HTTPS for all webhook endpoints
- Validate webhook payload structure

**Data Security:**
- Encrypt sensitive data (bank account tokens, payment info)
- Use environment variables for API keys
- Implement rate limiting on payment endpoints
- Log all payment operations for audit trails

### Testing Strategy

**Unit Testing:**
- Mock Stripe and Plaid SDKs using `vi.mock()`
- Test payment waterfall logic with various scenarios
- Test error handling and edge cases
- Verify payment allocation calculations

**Integration Testing:**
- Use PGlite for database testing
- Mock external APIs with realistic responses
- Test webhook processing with signature verification
- Test full payment lifecycle end-to-end

**Test Coverage Target:** ≥90% on PaymentService methods

### Environment Configuration

**Required Environment Variables:**
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Plaid Configuration
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENVIRONMENT=sandbox
```

### Error Handling Pattern

**Custom Error Classes:**
```typescript
export class PaymentFailedError extends Error {
  constructor(paymentId: string, reason: string) {
    super(`Payment ${paymentId} failed: ${reason}`);
    this.name = 'PaymentFailedError';
  }
}

export class WebhookVerificationError extends Error {
  constructor(service: string) {
    super(`Webhook verification failed for ${service}`);
    this.name = 'WebhookVerificationError';
  }
}
```

**Usage in Service:**
```typescript
async processPayment(loanId: number, amount: number, method: string) {
  try {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount);
    // Process payment...
  } catch (error) {
    if (error instanceof StripeError) {
      throw new PaymentFailedError(paymentId, error.message);
    }
    throw new DatabaseError('Failed to process payment', error);
  }
}
```

### Project Structure Notes

**New Directories Created:**
- `/src/services/` - Service layer (already exists from Story 1.0)
- `/tests/services/` - Unit tests for services
- `/tests/integration/` - Integration tests

**New Files Created:**
- `/src/services/PaymentService.ts` - Main payment service
- `/src/services/StripeService.ts` - Stripe Connect wrapper
- `/src/services/PlaidService.ts` - Plaid integration wrapper
- `/src/app/api/payments/` - Payment API routes
- `/src/app/api/webhooks/` - Webhook handlers

### References

- [Solution Architecture - Payment Processing] `/docs/solution-architecture.md` lines 565-586
- [Epic 4 - Payment Automation] `/docs/epics.md` lines 576-647
- [PRD - Payment Processing Requirements] `/docs/PRD.md` lines 220-240
- [Existing Drizzle Schema] `/src/models/Schema.ts`
- [LoanService Implementation] `/src/services/LoanService.ts`
- [Stripe Connect Documentation] https://stripe.com/docs/connect
- [Plaid Documentation] https://plaid.com/docs/

### Dependencies

**New Dependencies Required:**
- `stripe` - Stripe SDK for payment processing
- `plaid` - Plaid SDK for bank account integration
- `@stripe/stripe-js` - Stripe client-side SDK
- `react-plaid-link` - React component for Plaid Link

**Existing Dependencies:**
- `drizzle-orm` - Database ORM
- `zod` - Input validation
- `vitest` - Testing framework
- `@electric-sql/pglite-socket` - In-memory PostgreSQL for testing

### Constraints

1. **Security First**: All webhook endpoints must verify signatures
2. **Idempotency**: Payment processing must be idempotent to prevent duplicate charges
3. **Error Recovery**: Failed payments must be retryable with exponential backoff
4. **Audit Trail**: All payment operations must be logged for compliance
5. **Test Coverage**: ≥90% test coverage on all service methods

### Success Criteria

✅ **Definition of Done:**
- All 10 acceptance criteria met
- Tests pass: `pnpm test` (unit + integration)
- Type check passes: `pnpm type-check`
- Linting passes: `pnpm lint`
- Code coverage ≥90% on service methods: `pnpm test:coverage`
- API routes working: Manual smoke test or E2E test
- Webhook endpoints tested with signature verification
- Documentation complete and accurate

✅ **Verification Steps:**
1. Run `pnpm test` - all tests green
2. Run `pnpm type-check` - no TypeScript errors
3. Run `pnpm test:coverage` - ≥90% coverage on `/src/services/PaymentService.ts`
4. Test webhook endpoints with signature verification
5. Manual test payment processing flow
6. Review code: service methods are clean, well-documented, and follow patterns

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
**Story Points:** 8 (Estimated)
**Epic:** 2.0 (Payment Processing Platform Foundation)
**Priority:** P0 (Blocker for payment automation features)

