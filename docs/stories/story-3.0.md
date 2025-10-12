# Story 3.0: Construction Draw Management Foundation

Status: Draft

## Story

As a **borrower**,
I want a **DrawService with workflow orchestration and Supabase Storage integration** that manages construction draw requests through inspection and disbursement,
so that I can request draws, track inspection progress, and receive disbursements efficiently with proper documentation and photo evidence.

## Acceptance Criteria

**AC-1: DrawService Architecture Created**
- `/src/services/DrawService.ts` class created with clear method signatures
- Service integrates with existing `LoanService` and `PaymentService` for loan data and disbursements
- Service follows single responsibility principle (draw operations only)
- Service is instantiable and injectable for testing

**AC-2: Draw Workflow State Machine Implemented**
- Draw state machine: `Requested → Reviewed → Approved → Inspected → Disbursed`
- State transition validation and business rules enforcement
- State history tracking with audit trail
- Integration with existing Drizzle schema `rehabDraws` table
- Support for state rollback and error handling

**AC-3: Supabase Storage Integration**
- `SupabaseStorageService.ts` wrapper class created for file operations
- Photo upload to `draw-photos/` bucket with presigned URLs
- Document upload to `draw-documents/` bucket (invoices, lien waivers)
- RLS policies for inspector-only write access
- File metadata tracking and organization

**AC-4: Inspector Assignment and Scheduling**
- `InspectionService.ts` wrapper class created for inspector management
- Inspector assignment based on property location and availability
- Inspection scheduling with calendar integration
- Email notifications to inspectors with mobile upload links
- Inspection status tracking and updates

**AC-5: Draw Processing Core Logic**
- `createDrawRequest(loanId, amount, purpose, category)` method implemented
- Budget validation against remaining construction budget
- Draw approval workflow with lender authorization
- Integration with `PaymentService` for disbursement processing
- Support for partial draws and budget line item tracking

**AC-6: Draw API Routes Created**
- `/src/app/api/draws/route.ts` - GET (list draws), POST (create draw request)
- `/src/app/api/draws/[id]/route.ts` - GET, PATCH, DELETE individual draws
- `/src/app/api/draws/[id]/approve/route.ts` - RPC endpoint for draw approval
- `/src/app/api/draws/[id]/disburse/route.ts` - RPC endpoint for draw disbursement
- `/src/app/api/draws/[id]/inspect/route.ts` - RPC endpoint for inspection completion

**AC-7: Mobile Inspector App Foundation**
- `/src/components/draws/MobileInspectorApp.tsx` - Mobile-optimized inspection interface
- Photo capture and upload functionality
- Inspection checklist and notes
- Work completion verification
- Responsive design for mobile browsers

**AC-8: Document and Photo Management**
- Photo upload with annotations and categorization
- Document upload (invoices, receipts, lien waivers)
- File organization by draw ID and category
- Image thumbnails and preview generation
- File download and sharing capabilities

**AC-9: Comprehensive Unit Tests**
- `tests/services/DrawService.test.ts` created with Vitest
- Unit tests for all draw workflow methods with mocked dependencies
- Unit tests for state machine transitions and validation
- Test coverage ≥90% on DrawService methods
- Tests include edge cases: budget overruns, invalid transitions, file upload failures

**AC-10: Integration Tests**
- `tests/integration/DrawService.integration.test.ts` created
- Integration tests with real database (PGlite) and mocked Supabase Storage
- Test full draw lifecycle: request → approve → inspect → disburse
- Test file upload/download with Supabase Storage
- Test state machine transitions with real database

**AC-11: Error Handling & Validation**
- Custom error classes: `DrawNotFoundError`, `BudgetExceededError`, `InvalidTransitionError`
- All Supabase Storage operations wrapped in try-catch with appropriate error transformation
- Input validation with Zod schemas for draw requests and file uploads
- State transition validation with clear error messages

**AC-12: Documentation & Configuration**
- README.md in `/src/services/` explaining draw management architecture
- Supabase Storage configuration documentation
- JSDoc comments on all public service methods
- Example usage code snippets and workflow patterns
- Mobile inspector app usage guidelines

## Tasks / Subtasks

- [ ] **Task 1: DrawService Architecture** (AC-1)
  - [ ] Create `/src/services/DrawService.ts` with class skeleton
  - [ ] Add constructor with LoanService and PaymentService dependency injection
  - [ ] Define method signatures for all draw operations
  - [ ] Add TypeScript interfaces for draw data types

- [ ] **Task 2: Draw Workflow State Machine** (AC-2)
  - [ ] Implement draw state machine: Requested → Reviewed → Approved → Inspected → Disbursed
  - [ ] Add state transition validation and business rules
  - [ ] Implement state history tracking with audit trail
  - [ ] Integrate with existing `rehabDraws` table from Drizzle schema
  - [ ] Add support for state rollback and error handling

- [ ] **Task 3: Supabase Storage Integration** (AC-3)
  - [ ] Create `/src/services/SupabaseStorageService.ts` wrapper class
  - [ ] Implement photo upload to `draw-photos/` bucket with presigned URLs
  - [ ] Implement document upload to `draw-documents/` bucket
  - [ ] Configure RLS policies for inspector-only write access
  - [ ] Add file metadata tracking and organization

- [ ] **Task 4: Inspector Assignment and Scheduling** (AC-4)
  - [ ] Create `/src/services/InspectionService.ts` wrapper class
  - [ ] Implement inspector assignment based on property location
  - [ ] Add inspection scheduling with calendar integration
  - [ ] Implement email notifications to inspectors
  - [ ] Add inspection status tracking and updates

- [ ] **Task 5: Draw Processing Logic** (AC-5)
  - [ ] Implement `createDrawRequest(loanId, amount, purpose, category)` method
  - [ ] Add budget validation against remaining construction budget
  - [ ] Implement draw approval workflow with lender authorization
  - [ ] Integrate with PaymentService for disbursement processing
  - [ ] Add support for partial draws and budget line item tracking

- [ ] **Task 6: API Routes Implementation** (AC-6)
  - [ ] Create `/src/app/api/draws/route.ts` with GET and POST handlers
  - [ ] Create `/src/app/api/draws/[id]/route.ts` with GET, PATCH, DELETE
  - [ ] Create `/src/app/api/draws/[id]/approve/route.ts` RPC endpoint
  - [ ] Create `/src/app/api/draws/[id]/disburse/route.ts` RPC endpoint
  - [ ] Create `/src/app/api/draws/[id]/inspect/route.ts` RPC endpoint

- [ ] **Task 7: Mobile Inspector App** (AC-7)
  - [ ] Create `/src/components/draws/MobileInspectorApp.tsx`
  - [ ] Implement photo capture and upload functionality
  - [ ] Add inspection checklist and notes
  - [ ] Implement work completion verification
  - [ ] Ensure responsive design for mobile browsers

- [ ] **Task 8: Document and Photo Management** (AC-8)
  - [ ] Implement photo upload with annotations and categorization
  - [ ] Add document upload (invoices, receipts, lien waivers)
  - [ ] Implement file organization by draw ID and category
  - [ ] Add image thumbnails and preview generation
  - [ ] Implement file download and sharing capabilities

- [ ] **Task 9: Unit Tests** (AC-9)
  - [ ] Create `tests/services/DrawService.test.ts` with Vitest
  - [ ] Mock LoanService, PaymentService, and SupabaseStorageService
  - [ ] Test all draw workflow methods
  - [ ] Test state machine transitions and validation
  - [ ] Test edge cases: budget overruns, invalid transitions, file upload failures
  - [ ] Achieve ≥90% code coverage

- [ ] **Task 10: Integration Tests** (AC-10)
  - [ ] Create `tests/integration/DrawService.integration.test.ts`
  - [ ] Set up PGlite test database with Drizzle schema
  - [ ] Mock Supabase Storage for integration testing
  - [ ] Test full draw lifecycle with real database
  - [ ] Test file upload/download with Supabase Storage
  - [ ] Test state machine transitions with real database

- [ ] **Task 11: Error Handling & Validation** (AC-11)
  - [ ] Create custom error classes for draw failures
  - [ ] Implement input validation with Zod schemas
  - [ ] Add state transition validation with clear error messages
  - [ ] Wrap all external operations in try-catch blocks
  - [ ] Add comprehensive error logging

- [ ] **Task 12: Documentation** (AC-12)
  - [ ] Create `/src/services/README.md` with draw management architecture
  - [ ] Document Supabase Storage configuration
  - [ ] Add JSDoc comments to all public methods
  - [ ] Document workflow patterns and state transitions
  - [ ] Add mobile inspector app usage guidelines

## Dev Notes

### Architecture Context

**Draw Management Pattern** (Source: `/docs/solution-architecture.md#Epic 5: Construction Draw Management`)

```
API Routes (HTTP Layer)
  → DrawService (Business Logic)
    → InspectionService (Inspector Assignment)
    → SupabaseStorageService (File Management)
    → LoanService (Loan Data)
    → PaymentService (Disbursement)
      → Drizzle ORM → PostgreSQL
```

**Key Principles:**
- **Service Layer**: DrawService orchestrates draw workflow
- **State Machine**: Draw states: Requested → Reviewed → Approved → Inspected → Disbursed
- **File Management**: Supabase Storage for photos and documents
- **Integration**: DrawService uses LoanService and PaymentService for data and disbursements

**Pattern Reference:** Enhanced Modular Monolith with Service Layer (see `/docs/solution-architecture.md` lines 621-639)

### Draw Workflow State Machine

**State Transitions:**
```
Requested → Reviewed → Approved → Inspected → Disbursed
    ↓         ↓         ↓         ↓
  Rejected  Rejected  Rejected  Failed
```

**State Definitions:**
- **Requested**: Borrower submits draw request
- **Reviewed**: Lender reviews request and assigns inspector
- **Approved**: Lender approves request after review
- **Inspected**: Inspector completes inspection and uploads photos
- **Disbursed**: Funds disbursed to borrower

**Business Rules:**
- Budget validation: Draw amount cannot exceed remaining budget
- Inspector assignment: Required before approval
- Photo requirements: Minimum photos required before disbursement
- Lien waivers: Required for contractor payments

### Supabase Storage Integration

**Bucket Structure:**
- `draw-photos/` - Inspection photos organized by draw ID
- `draw-documents/` - Invoices, receipts, lien waivers
- `draw-thumbnails/` - Generated thumbnails for photos

**File Organization:**
```
draw-photos/
  ├── draw-{drawId}/
  │   ├── inspection-{inspectionId}/
  │   │   ├── photo-{timestamp}.jpg
  │   │   └── photo-{timestamp}-thumbnail.jpg
  │   └── metadata.json
```

**RLS Policies:**
- **Inspectors**: Write access to photos for assigned draws
- **Lenders**: Read access to all draw files
- **Borrowers**: Read access to their draw files
- **Admins**: Full access to all files

### Database Schema Integration

**Existing Tables:**
- `rehabDraws` - Draw records (amount, status, requestedAt, approvedAt, disbursedAt)
- `loans` - Loan data with construction budget tracking
- `properties` - Property information for inspector assignment
- `borrowers` - Borrower information for draw requests

**Draw Status Flow:**
```
requested → reviewed → approved → inspected → disbursed
    ↓         ↓         ↓         ↓
  rejected  rejected  rejected  failed
```

**Key Relationships:**
- `rehabDraws.loanId` → `loans.id`
- `loans.borrowerId` → `borrowers.id`
- `loans.propertyId` → `properties.id`

### Mobile Inspector App Requirements

**Core Features:**
- Photo capture with camera integration
- Photo upload to Supabase Storage
- Inspection checklist and notes
- Work completion verification
- Offline capability for poor connectivity

**Technical Requirements:**
- Responsive design for mobile browsers
- Progressive Web App (PWA) capabilities
- Camera API integration
- File upload with progress indicators
- Offline data synchronization

### Integration Points

**LoanService Integration:**
- **Budget Validation**: DrawService uses LoanService for construction budget data
- **Loan Updates**: Draw disbursements update loan balance through LoanService
- **Status Tracking**: Draw status changes may trigger loan status updates

**PaymentService Integration:**
- **Disbursement Processing**: DrawService uses PaymentService for fund disbursement
- **Payment Tracking**: Draw disbursements create payment records
- **Multi-Lender Support**: Draw disbursements respect lender participation splits

**Supabase Storage Integration:**
- **File Upload**: Photos and documents uploaded to Supabase Storage
- **Presigned URLs**: Secure file access with time-limited URLs
- **RLS Policies**: Row-level security for file access control

### Testing Strategy

**Unit Testing:**
- Mock LoanService, PaymentService, and SupabaseStorageService
- Test draw workflow logic with various scenarios
- Test state machine transitions and validation
- Test error handling and edge cases

**Integration Testing:**
- Use PGlite for database testing
- Mock Supabase Storage with realistic responses
- Test full draw lifecycle with real database
- Test file upload/download functionality

**Test Coverage Target:** ≥90% on DrawService methods

### Environment Configuration

**Required Environment Variables:**
```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Storage Buckets
SUPABASE_DRAW_PHOTOS_BUCKET=draw-photos
SUPABASE_DRAW_DOCUMENTS_BUCKET=draw-documents
```

### Error Handling Pattern

**Custom Error Classes:**
```typescript
export class DrawNotFoundError extends Error {
  constructor(drawId: string) {
    super(`Draw ${drawId} not found`);
    this.name = 'DrawNotFoundError';
  }
}

export class BudgetExceededError extends Error {
  constructor(requestedAmount: number, remainingBudget: number) {
    super(`Draw amount ${requestedAmount} exceeds remaining budget ${remainingBudget}`);
    this.name = 'BudgetExceededError';
  }
}

export class InvalidTransitionError extends Error {
  constructor(currentState: string, targetState: string) {
    super(`Invalid transition from ${currentState} to ${targetState}`);
    this.name = 'InvalidTransitionError';
  }
}
```

**Usage in Service:**
```typescript
async approveDraw(drawId: number, approverId: number) {
  try {
    const draw = await this.getDrawById(drawId);
    if (draw.status !== 'reviewed') {
      throw new InvalidTransitionError(draw.status, 'approved');
    }
    // Process approval...
  } catch (error) {
    if (error instanceof InvalidTransitionError) throw error;
    throw new DatabaseError('Failed to approve draw', error);
  }
}
```

### Project Structure Notes

**New Directories Created:**
- `/src/services/` - Service layer (already exists)
- `/src/components/draws/` - Draw UI components
- `/tests/services/` - Unit tests for services
- `/tests/integration/` - Integration tests

**New Files Created:**
- `/src/services/DrawService.ts` - Main draw service
- `/src/services/InspectionService.ts` - Inspector assignment wrapper
- `/src/services/SupabaseStorageService.ts` - File management wrapper
- `/src/components/draws/MobileInspectorApp.tsx` - Mobile inspector interface
- `/src/app/api/draws/` - Draw API routes

### References

- [Solution Architecture - Draw Management] `/docs/solution-architecture.md` lines 608-639
- [Epic 5 - Construction Draw Management] `/docs/epics.md` lines 651-712
- [PRD - Draw Management Requirements] `/docs/PRD.md` lines 205-212
- [Existing Drizzle Schema] `/src/models/Schema.ts`
- [LoanService Implementation] `/src/services/LoanService.ts`
- [PaymentService Implementation] `/src/services/PaymentService.ts`
- [Supabase Storage Documentation] https://supabase.com/docs/guides/storage

### Dependencies

**New Dependencies Required:**
- `@supabase/supabase-js` - Supabase client for storage operations
- `@supabase/storage-js` - Supabase Storage utilities
- `react-dropzone` - File upload component
- `react-image-crop` - Image cropping functionality

**Existing Dependencies:**
- `drizzle-orm` - Database ORM
- `zod` - Input validation
- `vitest` - Testing framework
- `@electric-sql/pglite-socket` - In-memory PostgreSQL for testing

### Constraints

1. **State Machine Integrity**: Draw state transitions must be validated and audited
2. **File Security**: All file uploads must go through Supabase Storage with RLS
3. **Budget Validation**: Draw amounts cannot exceed remaining construction budget
4. **Inspector Assignment**: Draws require inspector assignment before approval
5. **Photo Requirements**: Minimum photos required before disbursement

### Success Criteria

✅ **Definition of Done:**
- All 12 acceptance criteria met
- Tests pass: `pnpm test` (unit + integration)
- Type check passes: `pnpm type-check`
- Linting passes: `pnpm lint`
- Code coverage ≥90% on service methods: `pnpm test:coverage`
- API routes working: Manual smoke test or E2E test
- Supabase Storage integration tested
- Mobile inspector app functional
- Documentation complete and accurate

✅ **Verification Steps:**
1. Run `pnpm test` - all tests green
2. Run `pnpm type-check` - no TypeScript errors
3. Run `pnpm test:coverage` - ≥90% coverage on `/src/services/DrawService.ts`
4. Test Supabase Storage upload/download functionality
5. Test mobile inspector app on mobile device
6. Manual test draw workflow: request → approve → inspect → disburse
7. Review code: service methods are clean, well-documented, and follow patterns

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
**Epic:** 3.0 (Construction Draw Management Foundation)
**Priority:** P0 (Blocker for construction loan management features)
