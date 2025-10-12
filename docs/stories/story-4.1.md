# Story 4.1: Payments Dashboard Page

Status: Draft

## Story

As a loan servicer,
I want a dedicated payments dashboard page,
so that I can efficiently manage and track all payment activities across my loan portfolio.

## Acceptance Criteria

1. **Dashboard Page Creation**
   - Create `/dashboard/payments` page with proper routing
   - Implement responsive layout consistent with existing dashboard pages
   - Add payments navigation item to sidebar (already exists)

2. **Payment Overview Cards**
   - Display total payments received this month
   - Show pending payments count
   - Display overdue payments count
   - Show successful payment rate percentage

3. **Payment Table**
   - List all payments with borrower, loan, amount, date, status
   - Support search functionality by borrower name, loan number, amount
   - Include pagination for large datasets
   - Show payment method (ACH, wire, check, card)

4. **Payment Actions**
   - "Record Payment" button for manual entry
   - "Process Payments" button for batch processing
   - Filter by payment status (successful, pending, failed, overdue)
   - Export payments data functionality

5. **Real-time Updates**
   - Display payment status updates in real-time
   - Show recent payment notifications
   - Update payment counts automatically

## Tasks / Subtasks

- [ ] Create payments dashboard page (AC: 1)
  - [ ] Add page.tsx in `/src/app/[locale]/(auth)/dashboard/payments/`
  - [ ] Implement responsive layout with motion animations
  - [ ] Add page header with title and description
- [ ] Implement payment overview cards (AC: 2)
  - [ ] Create payment stats hook (`use-payment-stats.ts`)
  - [ ] Add KPI cards for monthly totals, pending, overdue, success rate
  - [ ] Style cards consistently with existing dashboard
- [ ] Build payment table component (AC: 3)
  - [ ] Create `PaymentsTable` component
  - [ ] Add search and filter functionality
  - [ ] Implement pagination
  - [ ] Add payment method display
- [ ] Add payment actions (AC: 4)
  - [ ] Create "Record Payment" dialog
  - [ ] Add "Process Payments" batch action
  - [ ] Implement status filtering
  - [ ] Add export functionality
- [ ] Implement real-time updates (AC: 5)
  - [ ] Add real-time payment status updates
  - [ ] Show recent payment notifications
  - [ ] Auto-refresh payment counts

## Dev Notes

- Follow existing dashboard page patterns from borrowers, lenders, loans pages
- Use existing UI components from `/src/components/ui/`
- Implement consistent motion animations with framer-motion
- Follow established API patterns for data fetching
- Ensure responsive design for mobile and desktop

### Project Structure Notes

- Align with existing dashboard page structure in `/src/app/[locale]/(auth)/dashboard/`
- Use existing sidebar navigation structure
- Follow component organization in `/src/components/`
- Maintain consistency with existing hooks in `/src/hooks/`

### References

- [Source: src/app/[locale]/(auth)/dashboard/borrowers/page.tsx] - Dashboard page pattern
- [Source: src/components/borrowers/borrowers-table.tsx] - Table component pattern
- [Source: src/hooks/use-dashboard-stats.ts] - Stats hook pattern
- [Source: docs/solution-architecture.md#Epic-4-Payment-Processing] - Payment domain architecture

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4

### Debug Log References

### Completion Notes List

### File List
