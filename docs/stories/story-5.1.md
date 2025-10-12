# Story 5.1: Construction Draws Dashboard Page

Status: Draft

## Story

As a loan servicer,
I want a dedicated construction draws dashboard page,
so that I can efficiently manage draw requests, approvals, and disbursements for construction loans.

## Acceptance Criteria

1. **Dashboard Page Creation**
   - Create `/dashboard/draws` page with proper routing
   - Implement responsive layout consistent with existing dashboard pages
   - Add draws navigation item to sidebar (already exists)

2. **Draw Overview Cards**
   - Display total draws requested this month
   - Show pending draws count requiring approval
   - Display approved draws awaiting disbursement
   - Show completed draws count

3. **Draw Table**
   - List all draws with borrower, loan, amount, status, request date
   - Support search functionality by borrower name, loan number, amount
   - Include pagination for large datasets
   - Show draw number and approval status

4. **Draw Actions**
   - "Request Draw" button for new draw requests
   - "Approve Draw" button for pending approvals
   - "Disburse Draw" button for approved draws
   - Filter by draw status (pending, approved, disbursed, rejected)
   - Export draws data functionality

5. **Draw Workflow Management**
   - Display draw approval workflow status
   - Show inspector assignment and scheduling
   - Display budget vs. actual spend tracking
   - Show lien waiver and document tracking

## Tasks / Subtasks

- [ ] Create draws dashboard page (AC: 1)
  - [ ] Add page.tsx in `/src/app/[locale]/(auth)/dashboard/draws/`
  - [ ] Implement responsive layout with motion animations
  - [ ] Add page header with title and description
- [ ] Implement draw overview cards (AC: 2)
  - [ ] Create draw stats hook (`use-draw-stats.ts`)
  - [ ] Add KPI cards for monthly totals, pending, approved, completed
  - [ ] Style cards consistently with existing dashboard
- [ ] Build draw table component (AC: 3)
  - [ ] Create `DrawsTable` component
  - [ ] Add search and filter functionality
  - [ ] Implement pagination
  - [ ] Add draw number and status display
- [ ] Add draw actions (AC: 4)
  - [ ] Create "Request Draw" dialog
  - [ ] Add "Approve Draw" workflow
  - [ ] Add "Disburse Draw" workflow
  - [ ] Implement status filtering
  - [ ] Add export functionality
- [ ] Implement draw workflow management (AC: 5)
  - [ ] Add draw approval workflow UI
  - [ ] Show inspector assignment interface
  - [ ] Display budget vs. actual tracking
  - [ ] Add document tracking interface

## Dev Notes

- Follow existing dashboard page patterns from borrowers, lenders, loans pages
- Use existing UI components from `/src/components/ui/`
- Implement consistent motion animations with framer-motion
- Follow established API patterns for data fetching
- Ensure responsive design for mobile and desktop
- Integrate with DrawService for business logic

### Project Structure Notes

- Align with existing dashboard page structure in `/src/app/[locale]/(auth)/dashboard/`
- Use existing sidebar navigation structure
- Follow component organization in `/src/components/`
- Maintain consistency with existing hooks in `/src/hooks/`

### References

- [Source: src/app/[locale]/(auth)/dashboard/borrowers/page.tsx] - Dashboard page pattern
- [Source: src/components/borrowers/borrowers-table.tsx] - Table component pattern
- [Source: src/hooks/use-dashboard-stats.ts] - Stats hook pattern
- [Source: src/services/DrawService.ts] - Draw business logic
- [Source: docs/solution-architecture.md#Epic-5-Construction-Draw-Management] - Draw domain architecture

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4

### Debug Log References

### Completion Notes List

### File List
