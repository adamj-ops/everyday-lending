# Story 5.2: Construction Draws API Routes

Status: Draft

## Story

As a developer,
I want comprehensive construction draws API routes,
so that the frontend can perform all draw-related operations including CRUD, approval workflow, and disbursement.

## Acceptance Criteria

1. **Basic CRUD Operations**
   - `GET /api/draws` - List draws with search and pagination
   - `POST /api/draws` - Create new draw request
   - `GET /api/draws/[id]` - Get single draw details
   - `PATCH /api/draws/[id]` - Update draw request
   - `DELETE /api/draws/[id]` - Delete draw request

2. **Draw Workflow Operations**
   - `POST /api/draws/[id]/approve` - Approve draw request
   - `POST /api/draws/[id]/reject` - Reject draw request
   - `POST /api/draws/[id]/disburse` - Disburse approved draw
   - `POST /api/draws/[id]/inspect` - Schedule inspection

3. **Draw Management**
   - `GET /api/draws/pending` - Get pending draws requiring action
   - `GET /api/draws/approved` - Get approved draws awaiting disbursement
   - `GET /api/draws/by-loan/[loanId]` - Get draws for specific loan
   - `POST /api/draws/batch-approve` - Approve multiple draws

4. **Draw Analytics**
   - `GET /api/draws/stats` - Get draw statistics
   - `GET /api/draws/reports` - Generate draw reports
   - `GET /api/draws/export` - Export draw data
   - `GET /api/draws/budget-tracking` - Get budget vs. actual data

5. **Document Management**
   - `POST /api/draws/[id]/documents` - Upload draw documents
   - `GET /api/draws/[id]/documents` - Get draw documents
   - `DELETE /api/draws/[id]/documents/[docId]` - Delete document
   - `POST /api/draws/[id]/lien-waivers` - Upload lien waivers

## Tasks / Subtasks

- [ ] Create basic CRUD routes (AC: 1)
  - [ ] Implement `/api/draws/route.ts` with GET and POST
  - [ ] Implement `/api/draws/[id]/route.ts` with GET, PATCH, DELETE
  - [ ] Add Zod validation schemas for draw data
  - [ ] Implement search and pagination for GET /api/draws
- [ ] Implement draw workflow routes (AC: 2)
  - [ ] Create `/api/draws/[id]/approve/route.ts`
  - [ ] Create `/api/draws/[id]/reject/route.ts`
  - [ ] Create `/api/draws/[id]/disburse/route.ts`
  - [ ] Create `/api/draws/[id]/inspect/route.ts`
  - [ ] Integrate with DrawService for business logic
- [ ] Add draw management routes (AC: 3)
  - [ ] Create `/api/draws/pending/route.ts`
  - [ ] Create `/api/draws/approved/route.ts`
  - [ ] Create `/api/draws/by-loan/[loanId]/route.ts`
  - [ ] Create `/api/draws/batch-approve/route.ts`
  - [ ] Implement draw filtering logic
- [ ] Implement draw analytics routes (AC: 4)
  - [ ] Create `/api/draws/stats/route.ts`
  - [ ] Create `/api/draws/reports/route.ts`
  - [ ] Create `/api/draws/export/route.ts`
  - [ ] Create `/api/draws/budget-tracking/route.ts`
  - [ ] Add data aggregation and reporting logic
- [ ] Add document management routes (AC: 5)
  - [ ] Create `/api/draws/[id]/documents/route.ts`
  - [ ] Create `/api/draws/[id]/documents/[docId]/route.ts`
  - [ ] Create `/api/draws/[id]/lien-waivers/route.ts`
  - [ ] Implement file upload and storage logic

## Dev Notes

- Follow existing API route patterns from borrowers, lenders, loans routes
- Use DrawService for business logic, not direct database access
- Implement proper error handling with descriptive messages
- Add rate limiting for draw processing endpoints
- Ensure all routes are properly authenticated
- Use Drizzle ORM for database operations
- Implement proper logging for audit trails
- Integrate with Supabase Storage for document management

### Project Structure Notes

- Align with existing API structure in `/src/app/api/`
- Use existing validation patterns from `/src/validations/`
- Follow established error handling patterns
- Maintain consistency with existing service layer architecture

### References

- [Source: src/app/api/borrowers/route.ts] - Basic CRUD pattern
- [Source: src/app/api/loans/route.ts] - Search and pagination pattern
- [Source: src/services/DrawService.ts] - Business logic service
- [Source: src/validations/BorrowerValidation.ts] - Validation pattern
- [Source: docs/solution-architecture.md#Epic-5-Construction-Draw-Management] - Draw domain architecture

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4

### Debug Log References

### Completion Notes List

### File List
