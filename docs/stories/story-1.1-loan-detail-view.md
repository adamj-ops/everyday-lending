# Story 1.1: Loan Detail View Enhancement

**Epic:** Epic 1 - Phase 5 Completion (Foundation Hardening)
**Priority:** HIGH
**Estimated Effort:** 1 day
**Status:** Ready for Development
**Assignee:** TBD

---

## User Story

**As a** loan officer
**I want** a comprehensive loan detail page with all loan information in one place
**So that** I can quickly understand loan status, payment history, and next actions without navigating multiple screens

---

## Business Value

- **Primary Value:** Completes user-facing loan management workflow
- **User Impact:** Reduces time-to-information from ~5 minutes (multiple screens) to <30 seconds (single dashboard)
- **Technical Value:** Demonstrates component composition patterns for future dashboards
- **Strategic Alignment:** Supports Epic 6 (Analytics) by establishing dashboard layout patterns

---

## Description

Create a comprehensive loan detail page by composing existing Phase 5 components (PaymentSchedule, AmortizationTable, StatusTimeline, etc.) into a unified dashboard experience. The page should provide all critical loan information through a tabbed interface with responsive design.

### Context

Phase 5 delivered individual components for loan data display, but they are not yet composed into a cohesive detail view. This story completes the user-facing experience by:
1. Creating a container layout (LoanDetailDashboard)
2. Implementing tabbed navigation (Overview, Payments, Documents, Activity)
3. Composing existing components into each tab
4. Ensuring mobile responsiveness at 375px, 768px, 1024px breakpoints

---

## Acceptance Criteria

### AC-1.1.1: Data Loading
**Given** a valid loan ID
**When** I navigate to `/loans/:id`
**Then** the page loads loan data with all relationships (borrower, property, participations, payments, draws, status_history) in a single query
**And** loading states use TableSkeleton/CardSkeleton from Phase 5

**Verification:**
- [ ] Network tab shows single query to `/api/v1/loans/:id?expand=borrower,property,participations,payments,draws,status_history`
- [ ] Query completes in <500ms (P95)
- [ ] Skeleton components display during loading
- [ ] Data populates all tabs correctly

---

### AC-1.1.2: Overview Tab
**Given** loan data is loaded
**When** I view the Overview tab (default)
**Then** I see:
- Loan summary section (borrower name, property address, loan amount, rate, term, status badge)
- Payment schedule component (monthly payment, next due date, payoff date)
- Participation breakdown (lenders, amounts, percentages)

**Verification:**
- [ ] LoanOverview component displays 8+ key metrics
- [ ] PaymentSchedule shows next 3 upcoming payments
- [ ] ParticipationBreakdown shows all lenders with percentages summing to 100%
- [ ] All currency values formatted with $ and commas
- [ ] Percentages formatted with % symbol and 2 decimals

---

### AC-1.1.3: Payments Tab
**Given** I am on the loan detail page
**When** I click the "Payments" tab
**Then** I see:
- Full amortization table (all months, principal/interest breakdown)
- Payment timeline (visual history of posted payments)

**Verification:**
- [ ] AmortizationTable displays all rows (12 months for standard loan)
- [ ] Table shows columns: Payment #, Due Date, Payment Amount, Principal, Interest, Ending Balance
- [ ] PaymentTimeline displays posted payments with dates and amounts
- [ ] Timeline highlights late payments in red
- [ ] Export to CSV button present and functional

---

### AC-1.1.4: Documents Tab
**Given** I am on the loan detail page
**When** I click the "Documents" tab
**Then** I see a placeholder "Coming Soon" message with:
- Illustration or icon
- Message: "Document management coming in Q2 2025"
- Return to Overview button

**Verification:**
- [ ] Placeholder component renders centered
- [ ] Message is clear and friendly
- [ ] No errors in console
- [ ] Tab is clickable and accessible

---

### AC-1.1.5: Activity Tab
**Given** I am on the loan detail page
**When** I click the "Activity" tab
**Then** I see:
- LoanStatusTimeline (status changes with dates and actors)
- Activity feed placeholder ("Coming Soon")

**Verification:**
- [ ] StatusTimeline shows all status changes chronologically (newest first)
- [ ] Each status change shows: date, old status, new status, changed by user
- [ ] Activity feed placeholder similar to Documents tab
- [ ] Timeline is scrollable if >10 entries

---

### AC-1.1.6: Responsive Design
**Given** I am viewing the loan detail page
**When** I resize the browser to different widths
**Then** the layout adapts appropriately:

| Breakpoint | Layout | Tabs | Behavior |
|------------|--------|------|----------|
| 375px (Mobile) | Single column, full width | Horizontal scroll | Sidepanel hidden |
| 768px (Tablet) | Single column, padded | Full width | Sidepanel hidden |
| 1024px (Desktop) | Two column (8:4 grid) | Left column | Right sidepanel visible |
| 1440px (Wide) | Two column (9:3 grid) | Left column | Right sidepanel visible |

**Verification:**
- [ ] Test at 375px (iPhone 14): No horizontal scroll, readable text
- [ ] Test at 768px (iPad): Comfortable spacing, no truncation
- [ ] Test at 1024px: Two-column layout, sidepanel shows related info
- [ ] Test at 1440px: Optimal spacing, no wasted whitespace
- [ ] TabsList scrolls horizontally on mobile (no wrapping)

---

### AC-1.1.7: Accessibility
**Given** I am using assistive technology
**When** I navigate the loan detail page
**Then** the page meets accessibility standards:

**Verification:**
- [ ] Axe DevTools score ≥90 (run on all tabs)
- [ ] Keyboard navigation: Tab through header → tabs → tab content
- [ ] ARIA labels: `role="tabpanel"` on content, `aria-labelledby` on sections
- [ ] Focus management: Focus shifts to tab content on tab change
- [ ] Screen reader: Announces tab selection (tested with VoiceOver/NVDA)
- [ ] Color contrast: All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Touch targets: All buttons ≥44x44px

---

### AC-1.1.8: Loading States
**Given** the loan data is being fetched
**When** I navigate to the loan detail page
**Then** I see appropriate loading states:

**Verification:**
- [ ] TableSkeleton displays in Payments tab during load
- [ ] CardSkeleton displays in Overview tab during load
- [ ] Skeleton animation (shimmer effect) is smooth
- [ ] No "flash of unstyled content" (FOUC)
- [ ] Loading states dismiss immediately when data arrives

---

### AC-1.1.9: Error Handling
**Given** an error occurs during data loading
**When** I navigate to a loan with invalid ID
**Then** I see an appropriate error state:

**Verification:**
- [ ] ErrorBoundary catches errors gracefully
- [ ] Error message: "Loan not found" for 404
- [ ] Error message: "Failed to load loan" for 500
- [ ] "Try Again" button refetches data
- [ ] "Go Back" button navigates to loans list
- [ ] Error includes trace ID for debugging
- [ ] No crash, page remains interactive

---

## Technical Specification

### Component Composition

```tsx
// /src/app/[locale]/loans/[id]/page.tsx
<LoanDetailDashboard loanId={params.id}>
  <Tabs defaultValue="overview">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="payments">Payments</TabsTrigger>
      <TabsTrigger value="documents">Documents</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
    </TabsList>

    <TabsContent value="overview">
      <LoanOverview loan={loan} />
      <PaymentSchedule loan={loan} />
      <ParticipationBreakdown loan={loan} />
    </TabsContent>

    <TabsContent value="payments">
      <AmortizationTable loan={loan} schedule={schedule} />
      <PaymentTimeline loan={loan} />
    </TabsContent>

    <TabsContent value="documents">
      <DocumentLibrary loanId={loan.id} />
    </TabsContent>

    <TabsContent value="activity">
      <LoanStatusTimeline loan={loan} />
      <ActivityFeed loanId={loan.id} />
    </TabsContent>
  </Tabs>
</LoanDetailDashboard>;
```

### Data Flow

```typescript
// 1. Fetch loan with relationships
const { data: loan } = await supabase
  .from('loans')
  .select(`
    *,
    borrower:borrowers(*),
    property:properties(*),
    participations:loan_participations(*, lender:lenders(*)),
    payments:payments(*),
    draws:draws(*),
    status_history:loan_status_audit(*)
  `)
  .eq('id', loanId)
  .single();

// 2. Calculate amortization schedule (client-side)
const schedule = generateAmortizationSchedule(loan);

// 3. Pass to composed components
<LoanOverview loan={loan} schedule={schedule} />
```

---

## Implementation Tasks

### Task 1: Create Container Component
**File:** `src/components/loans/LoanDetailDashboard.tsx`
**Estimated:** 2 hours

- [ ] Create LoanDetailDashboard component with two-column layout
- [ ] Implement responsive grid (single column <1024px, two column ≥1024px)
- [ ] Add header section (loan number, status badge, actions dropdown)
- [ ] Add main content area (tabs container)
- [ ] Add right sidepanel (related entities, quick actions)
- [ ] Handle loading/error states via props

**Definition of Done:**
- Component renders with mock data
- Responsive at all breakpoints
- Storybook story created with loading/error states
- TypeScript interfaces exported

---

### Task 2: Create Loan Overview Component
**File:** `src/components/loans/LoanOverview.tsx`
**Estimated:** 3 hours

- [ ] Create LoanOverview component with metrics grid
- [ ] Display 8 key metrics in Card components:
  - Borrower name (link to borrower detail)
  - Property address (link to property detail)
  - Loan amount (formatted currency)
  - Interest rate (formatted percentage)
  - Term (months)
  - Monthly payment (calculated)
  - Next payment due (date + amount)
  - Current status (badge)
- [ ] Add "Quick Actions" section (Edit, Make Payment, Download)
- [ ] Implement responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop)

**Definition of Done:**
- All metrics display correctly from loan object
- Links navigate to correct routes
- Quick actions trigger correct handlers
- Component is unit tested

---

### Task 3: Create Participation Breakdown Component
**File:** `src/components/loans/ParticipationBreakdown.tsx`
**Estimated:** 2 hours

- [ ] Create ParticipationBreakdown component with table display
- [ ] Table columns: Lender Name, Amount, Percentage, Priority, Actions
- [ ] Calculate percentages from loan.amount and participation.amount
- [ ] Add progress bar visualization for each participation
- [ ] Add "Total" row at bottom (sum to 100%)
- [ ] Handle single lender (100%) and multiple lenders

**Definition of Done:**
- Table displays all participations
- Percentages sum to 100%
- Progress bars visually accurate
- Sorting by amount/percentage works
- Empty state for loans without participations

---

### Task 4: Create Payment Timeline Component
**File:** `src/components/loans/PaymentTimeline.tsx`
**Estimated:** 2 hours

- [ ] Create PaymentTimeline component with vertical timeline layout
- [ ] Display posted payments chronologically (newest first)
- [ ] Each payment shows: date, amount, principal/interest split, method
- [ ] Color code: green (on-time), yellow (late), red (very late)
- [ ] Add "View All Payments" link to full payment list
- [ ] Limit to 10 most recent (with "Show More" pagination)

**Definition of Done:**
- Timeline displays payments correctly
- Color coding matches business rules
- Scrollable if >10 payments
- Clicking payment opens detail modal
- Mobile-friendly (card layout)

---

### Task 5: Create Page Route Handler
**File:** `src/app/[locale]/loans/[id]/page.tsx`
**Estimated:** 2 hours

- [ ] Create Next.js page component
- [ ] Implement data fetching with React Query
- [ ] Handle loading state (show skeletons)
- [ ] Handle error state (show ErrorBoundary)
- [ ] Pass data to LoanDetailDashboard
- [ ] Implement tab state management (URL sync)
- [ ] Add metadata (page title, description)

**Definition of Done:**
- Page loads loan data correctly
- URL updates on tab change (e.g., `/loans/123?tab=payments`)
- Back button navigates to loans list
- Page is server-rendered (SSR) for SEO
- Metadata includes loan number and borrower name

---

### Task 6: Integration & Testing
**Estimated:** 2 hours

- [ ] Manual testing at all breakpoints (375, 768, 1024, 1440)
- [ ] Accessibility audit with Axe DevTools
- [ ] Performance testing (Lighthouse score ≥90)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Write integration test (Vitest + React Testing Library)
- [ ] Create Storybook stories for all new components

**Definition of Done:**
- All ACs verified
- Axe score ≥90
- Lighthouse performance ≥90
- No console errors
- Integration test covers happy path + error state

---

## Files to Create

1. `src/components/loans/LoanDetailDashboard.tsx` (container)
2. `src/components/loans/LoanOverview.tsx` (summary metrics)
3. `src/components/loans/ParticipationBreakdown.tsx` (lender table)
4. `src/components/loans/PaymentTimeline.tsx` (visual timeline)
5. `src/app/[locale]/loans/[id]/page.tsx` (route handler)

**Total:** 5 new files, ~600 lines of code

---

## Files to Modify

None (pure composition, no changes to existing components)

---

## Dependencies

### External
- None (all existing dependencies from Phase 5)

### Internal
- Phase 5 components:
  - `PaymentSchedule` (src/components/loans/PaymentSchedule.tsx)
  - `AmortizationTable` (src/components/loans/AmortizationTable.tsx)
  - `LoanStatusBadge` (src/components/loans/LoanStatusBadge.tsx)
  - `LoanStatusTimeline` (src/components/loans/LoanStatusTimeline.tsx)
- Shadcn UI components:
  - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
  - `Card`, `CardHeader`, `CardTitle`, `CardContent`
  - `Table`, `TableHeader`, `TableRow`, `TableCell`
- Hooks:
  - `useLoan` (data fetching)
  - `useMediaQuery` (responsive)

---

## Testing Strategy

### Unit Tests
- LoanOverview: metric calculations, formatting
- ParticipationBreakdown: percentage calculations, sorting
- PaymentTimeline: color coding logic, date formatting

**Target:** 85% coverage on new components

### Integration Tests
- Page loads with valid loan ID
- Page handles 404 error (invalid loan ID)
- Tabs switch correctly and update URL
- Data flows from API to components

**Target:** 3 integration tests

### E2E Tests
- Navigate to loan detail from loans list
- Switch tabs and verify content
- Mobile responsiveness test

**Target:** Covered in Story 1.5 (Playwright E2E Setup)

---

## Definition of Done

- [ ] All 9 acceptance criteria verified
- [ ] All 6 implementation tasks completed
- [ ] Unit tests written (≥85% coverage)
- [ ] Integration tests written (3 tests)
- [ ] Storybook stories created for all components
- [ ] Axe DevTools score ≥90
- [ ] Lighthouse performance ≥90
- [ ] Manual testing at 375px, 768px, 1024px, 1440px
- [ ] Code review completed
- [ ] Merged to main

---

## Notes

### Design Decisions
- Tabbed layout chosen over accordion to reduce cognitive load
- Right sidepanel only on desktop (space constraints on mobile)
- Payment timeline limited to 10 most recent (performance)

### Future Enhancements (Out of Scope)
- Document library (Epic 6)
- Activity feed with filters (Epic 6)
- Real-time updates via WebSocket (Epic 7)
- Loan modification workflow (Epic 8)

### Known Limitations
- Placeholder sections for Documents and Activity feed
- No inline editing (deferred to Epic 9)
- No document upload (Epic 6)

---

**Story Status:** Ready for Development
**Created:** October 19, 2025
**Last Updated:** October 19, 2025
**Estimated Completion:** 1 day
