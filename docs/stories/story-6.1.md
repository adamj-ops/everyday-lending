# Story 6.1: Servicing Dashboard Page

Status: Draft

## Story

As a loan servicer,
I want a dedicated servicing dashboard page,
so that I can efficiently manage servicing income, fee tracking, and loan servicing operations.

## Acceptance Criteria

1. **Dashboard Page Creation**
   - Create `/dashboard/servicing` page with proper routing
   - Implement responsive layout consistent with existing dashboard pages
   - Add servicing navigation item to sidebar (already exists)

2. **Servicing Overview Cards**
   - Display total servicing income this month
   - Show total fees collected
   - Display active loans being serviced
   - Show servicing efficiency metrics

3. **Servicing Income Table**
   - List all servicing income records with loan, fee type, amount, date
   - Support search functionality by loan number, fee type, amount
   - Include pagination for large datasets
   - Show recurring vs. one-time income

4. **Fee Management**
   - Display fee types and their configurations
   - Show fee collection status by loan
   - Track late fees and penalties
   - Manage fee waivers and adjustments

5. **Servicing Analytics**
   - Display servicing income trends
   - Show fee collection rates
   - Display loan servicing performance metrics
   - Export servicing data functionality

## Tasks / Subtasks

- [ ] Create servicing dashboard page (AC: 1)
  - [ ] Add page.tsx in `/src/app/[locale]/(auth)/dashboard/servicing/`
  - [ ] Implement responsive layout with motion animations
  - [ ] Add page header with title and description
- [ ] Implement servicing overview cards (AC: 2)
  - [ ] Create servicing stats hook (`use-servicing-stats.ts`)
  - [ ] Add KPI cards for monthly income, fees, active loans, efficiency
  - [ ] Style cards consistently with existing dashboard
- [ ] Build servicing income table (AC: 3)
  - [ ] Create `ServicingIncomeTable` component
  - [ ] Add search and filter functionality
  - [ ] Implement pagination
  - [ ] Add recurring vs. one-time income display
- [ ] Add fee management interface (AC: 4)
  - [ ] Create fee types management component
  - [ ] Add fee collection status tracking
  - [ ] Implement late fee tracking
  - [ ] Add fee waiver/adjustment interface
- [ ] Implement servicing analytics (AC: 5)
  - [ ] Add servicing income trends chart
  - [ ] Show fee collection rates
  - [ ] Display performance metrics
  - [ ] Add export functionality

## Dev Notes

- Follow existing dashboard page patterns from borrowers, lenders, loans pages
- Use existing UI components from `/src/components/ui/`
- Implement consistent motion animations with framer-motion
- Follow established API patterns for data fetching
- Ensure responsive design for mobile and desktop
- Integrate with existing fee types and servicing income tables

### Project Structure Notes

- Align with existing dashboard page structure in `/src/app/[locale]/(auth)/dashboard/`
- Use existing sidebar navigation structure
- Follow component organization in `/src/components/`
- Maintain consistency with existing hooks in `/src/hooks/`

### References

- [Source: src/app/[locale]/(auth)/dashboard/borrowers/page.tsx] - Dashboard page pattern
- [Source: src/components/borrowers/borrowers-table.tsx] - Table component pattern
- [Source: src/hooks/use-dashboard-stats.ts] - Stats hook pattern
- [Source: src/models/Schema.ts] - Fee types and servicing income tables
- [Source: docs/solution-architecture.md#Epic-6-Loan-Servicing] - Servicing domain architecture

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4

### Debug Log References

### Completion Notes List

### File List
