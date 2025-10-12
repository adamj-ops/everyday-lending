# Everyday Lending Platform - Epic Breakdown

**Author:** adam
**Date:** October 11, 2025
**Project Level:** 4 (Full Platform)
**Target Scale:** 74 user stories across 7 epics, 3-4 month MVP

---

## Epic Overview

This document provides detailed user stories for all 7 epics defined in the [PRD](/docs/PRD.md). Each epic includes:

- **Epic goals and value delivery**
- **User stories** in "As a [persona], I want [capability] so that [benefit]" format
- **Acceptance criteria** (3-8 per story)
- **Technical notes** for implementation guidance
- **Story points** for estimation (1, 2, 3, 5, 8, 13)

**Total Story Count:** 74 stories
**Estimated Timeline:** 12 weeks (3-4 months)
**Delivery Model:** Continuous integration with epic-based milestones

---

# Epic 1: Foundation & Core Infrastructure

**Timeline:** Weeks 1-2
**Story Count:** 8 stories
**Story Points:** 34 points
**Goal:** Establish production-ready infrastructure, authentication, database, and monitoring

## Epic 1 Stories

### Story 1.1: Production Database Setup

**As a** platform engineer
**I want** a production-ready PostgreSQL database with proper schemas and migrations
**So that** we have a reliable data foundation for the platform

**Acceptance Criteria:**
1. Neon PostgreSQL database provisioned with production configuration
2. All existing Drizzle schemas migrated to production database
3. Database connection pooling configured (max 25 connections)
4. Automated backup schedule enabled (daily, 30-day retention)
5. Database indexes created for foreign keys and frequently queried fields
6. Migration rollback procedure tested and documented

**Technical Notes:**
- Use Neon's connection string with SSL enabled
- Configure Drizzle pooling in `libs/DB.ts`
- Add indexes: `borrowers.email`, `loans.status`, `payments.loanId`, `lenderParticipations.lenderId`
- Test migration rollback with staging database first

**Story Points:** 5

---

### Story 1.2: Role-Based Access Control (RBAC)

**As a** platform administrator
**I want** role-based permissions enforced throughout the application
**So that** users can only access data and features appropriate to their role

**Acceptance Criteria:**
1. Clerk roles defined: Admin, Lender, Servicer, Borrower, Read-Only, Inspector
2. Middleware enforces RBAC on all API routes
3. Frontend components respect role permissions (hide/disable unauthorized features)
4. Organization-level data isolation (multi-tenancy) implemented
5. Role assignment UI available in admin dashboard
6. Audit log records all permission checks and denials

**Technical Notes:**
- Use Clerk's `organizationMemberships` for role management
- Create `withAuth()` HOC wrapper for protected API routes
- Add `userRole` to React Query context for frontend permission checks
- Implement Row-Level Security (RLS) using Drizzle `where` clauses filtered by `orgId`

**Story Points:** 8

---

### Story 1.3: Error Monitoring with Sentry

**As a** developer
**I want** comprehensive error tracking and monitoring
**So that** I can quickly identify and fix production issues

**Acceptance Criteria:**
1. Sentry integrated for both frontend and backend errors
2. Error boundaries implemented for all major UI sections
3. Source maps uploaded for accurate stack traces
4. Custom context attached: userId, orgId, loanId, timestamp
5. Error alerts configured for P1 errors (email + Slack)
6. Performance monitoring enabled (<500ms P95 API target)

**Technical Notes:**
- Use `@sentry/nextjs` package for unified integration
- Configure `sentry.client.config.ts` and `sentry.server.config.ts`
- Add `Sentry.captureException()` in API route error handlers
- Set up breadcrumbs for user actions (loan created, payment processed)
- Configure release tracking tied to Git commits

**Story Points:** 3

---

### Story 1.4: Analytics with PostHog

**As a** product manager
**I want** user behavior analytics and feature usage tracking
**So that** we can make data-driven product decisions

**Acceptance Criteria:**
1. PostHog integrated with custom event tracking
2. Key events tracked: loan_created, payment_processed, draw_requested, dashboard_viewed
3. User properties set: role, orgId, loanCount, portfolioSize
4. Feature flags enabled for gradual rollouts
5. Funnel analysis configured for loan origination workflow
6. Session recordings enabled for UX debugging (with PII masking)

**Technical Notes:**
- Use `PostHogProvider` wrapper in `app/layout.tsx`
- Create `useAnalytics()` hook for consistent event tracking
- Mask sensitive fields (SSN, bank accounts) from recordings
- Set up funnels: Application → Underwriting → Approval → Disbursement

**Story Points:** 3

---

### Story 1.5: API Rate Limiting & Bot Protection (Arcjet)

**As a** platform engineer
**I want** API rate limiting and bot protection
**So that** the platform is protected from abuse and DDoS attacks

**Acceptance Criteria:**
1. Arcjet integrated with Next.js middleware
2. Rate limits enforced: 100 req/min per IP for public endpoints, 1000 req/min for authenticated users
3. Bot protection enabled on login, signup, and payment endpoints
4. Shield mode activated for detected attack patterns
5. Rate limit headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`
6. Admin dashboard shows rate limit violations

**Technical Notes:**
- Use `@arcjet/next` package with middleware integration
- Configure sliding window rate limiting (not fixed window)
- Whitelist trusted IPs (CI/CD, monitoring services)
- Add custom error page for 429 (Too Many Requests) responses

**Story Points:** 3

---

### Story 1.6: Health Checks & Operational Monitoring

**As an** operations engineer
**I want** health check endpoints and operational dashboards
**So that** I can monitor system health and respond to incidents

**Acceptance Criteria:**
1. `/api/health` endpoint returns system status (UP/DOWN/DEGRADED)
2. Health check verifies: database connection, Clerk auth, Stripe API, Plaid API
3. Checkly uptime monitoring configured (1-minute intervals)
4. Better Stack log aggregation configured for application logs
5. Operational runbook documented for common scenarios (DB connection failure, Stripe outage)
6. Incident response process defined (<15 min P1 response time)

**Technical Notes:**
- Create `/api/health/route.ts` with timeout-protected checks
- Use Checkly API monitors with multi-region checks (US, EU)
- Configure Better Stack to ingest Next.js logs via HTTPS endpoint
- Document runbook in `/docs/operations/runbook.md`

**Story Points:** 5

---

### Story 1.7: CI/CD Pipeline Setup

**As a** developer
**I want** automated testing and deployment on every PR
**So that** code quality is maintained and deployments are reliable

**Acceptance Criteria:**
1. GitHub Actions workflow runs on every PR: lint, type-check, unit tests, E2E tests
2. Vercel preview deployments created automatically for each PR
3. Pre-commit hooks enforce: ESLint, Prettier, Conventional Commits
4. Test coverage reported on PR (target 80%+)
5. Production deployments trigger on merge to `main` branch
6. Automatic rollback configured if health checks fail post-deployment

**Technical Notes:**
- Create `.github/workflows/ci.yml` with parallel test jobs
- Use Lefthook for pre-commit hooks (already configured in `lefthook.yml`)
- Integrate Codecov for test coverage reporting
- Configure Vercel to run E2E tests before production deployment

**Story Points:** 5

---

### Story 1.8: Database Seeding for Development

**As a** developer
**I want** realistic seed data for local development
**So that** I can test features without manually creating data

**Acceptance Criteria:**
1. Seed script creates: 10 borrowers, 5 lenders, 15 properties, 20 loans, 100 payments, 10 draws
2. Seed data is realistic (valid addresses, realistic loan terms, proper date sequences)
3. Seed script is idempotent (can be run multiple times without errors)
4. Seed command added to package.json: `npm run db:seed`
5. Seed data includes all loan statuses: Application, Active, Delinquent, Paid Off, Defaulted
6. Documentation explains how to reset and reseed database

**Technical Notes:**
- Create `/scripts/seed-database.ts` using Drizzle insert
- Use `faker.js` for realistic data generation
- Ensure referential integrity (borrowers before loans, loans before payments)
- Add `db:reset` script to drop and recreate database

**Story Points:** 2

---

**Epic 1 Total:** 8 stories, 34 story points, 2 weeks

---

# Epic 2: Attio-Style UX System

**Timeline:** Weeks 2-3
**Story Count:** 10 stories
**Story Points:** 42 points
**Goal:** Implement keyboard-first navigation, command palette, and core interaction patterns

## Epic 2 Stories

### Story 2.1: Global Command Palette (Cmd+K)

**As a** power user
**I want** a global command palette accessible via Cmd+K
**So that** I can navigate and take actions without clicking through menus

**Acceptance Criteria:**
1. Command palette opens on Cmd+K (Mac) or Ctrl+K (Windows/Linux)
2. Fuzzy search matches commands, entities (borrowers, lenders, loans, properties)
3. Recent items shown at top of results
4. Keyboard navigation: Arrow keys to navigate, Enter to select, Esc to close
5. Actions available: Create Loan, Create Borrower, Go to Dashboard, Search Payments
6. Command palette is accessible from any page
7. Search results show entity details (e.g., borrower name + email, loan amount + status)

**Technical Notes:**
- Use `cmdk` library for command palette UI
- Integrate with React Query for entity searches
- Store recent items in localStorage (max 10)
- Add keyboard event listener to `app/layout.tsx`

**Story Points:** 5

---

### Story 2.2: Keyboard Shortcuts System

**As a** power user
**I want** keyboard shortcuts for common actions
**So that** I can work faster without touching the mouse

**Acceptance Criteria:**
1. Shortcuts implemented: G+D (dashboard), G+L (loans), G+B (borrowers), G+P (properties), C+L (create loan), / (search)
2. ? key shows keyboard shortcut reference card
3. Shortcuts work from any page (except when typing in input fields)
4. Visual hints show shortcuts in UI (e.g., "Create Loan Cmd+Shift+L")
5. J/K navigation works in all list views (loans, borrowers, etc.)
6. Shortcuts are documented in help center

**Technical Notes:**
- Use `react-hotkeys-hook` for shortcut management
- Create `<ShortcutProvider>` context wrapper
- Add `data-shortcut` attributes to buttons for visual hints
- Disable shortcuts when input fields are focused

**Story Points:** 5

---

### Story 2.3: Inline Editing with Optimistic Updates

**As a** loan officer
**I want** to edit fields inline without opening dialogs
**So that** I can make quick changes efficiently

**Acceptance Criteria:**
1. Click-to-edit works on all entity fields (borrower name, loan amount, property address)
2. Changes save automatically on blur (no "Save" button required)
3. Optimistic UI updates show changes immediately
4. Rollback on error with clear error message
5. Loading indicator shows during save (subtle spinner next to field)
6. Undo/redo support for recent changes (Cmd+Z / Cmd+Shift+Z)

**Technical Notes:**
- Create `<InlineEdit>` component with controlled input
- Use React Query mutations with `onMutate` for optimistic updates
- Store mutation history in React Context for undo/redo
- Add debounce (500ms) to avoid excessive API calls

**Story Points:** 5

---

### Story 2.4: Smart Suggestions & Autocomplete

**As a** loan officer
**I want** smart suggestions when creating loans
**So that** I don't have to re-enter information that already exists

**Acceptance Criteria:**
1. Borrower field suggests existing borrowers as I type (fuzzy match)
2. Property field suggests properties owned by selected borrower
3. Loan terms pre-fill with borrower's previous loan terms (rate, term, fees)
4. Lender participation suggests based on lender's available capital
5. Suggestions show relevant context (e.g., borrower's last loan date, property last appraised value)
6. Keyboard navigation works in suggestion dropdowns (arrow keys, Enter to select)

**Technical Notes:**
- Use `@tanstack/react-query` with `useInfiniteQuery` for autocomplete
- Implement fuzzy search with `fuse.js`
- Cache suggestion results for 5 minutes
- Create `<SmartAutocomplete>` reusable component

**Story Points:** 5

---

### Story 2.5: Loading States & Skeleton Screens

**As a** user
**I want** clear visual feedback during data loading
**So that** I know the system is working and not frozen

**Acceptance Criteria:**
1. Skeleton screens shown during initial page load (loan list, dashboard)
2. Loading spinners shown for actions (creating loan, processing payment)
3. Progress bars shown for multi-step processes (loan disbursement workflow)
4. No content flash on page transitions (skeleton appears immediately)
5. Loading states are accessible (announced to screen readers)
6. Timeout after 30 seconds with "Taking longer than expected" message

**Technical Notes:**
- Create `<Skeleton>` component with shimmer animation
- Use React Suspense for automatic loading states
- Add `aria-busy="true"` and `aria-live="polite"` for accessibility
- Implement timeout with `Promise.race()` and show retry option

**Story Points:** 3

---

### Story 2.6: Error Handling & Recovery

**As a** user
**I want** clear error messages with actionable solutions
**So that** I can resolve issues without contacting support

**Acceptance Criteria:**
1. Error messages show: What happened, Why it happened, How to fix it
2. Field-level validation errors shown immediately (email format, required fields)
3. API errors translated to user-friendly messages (not raw error codes)
4. Retry button available for transient errors (network failures)
5. Errors are logged to Sentry with full context
6. Fallback error boundaries prevent entire page crashes

**Technical Notes:**
- Create error code mapping: `LOAN_001` → "Loan amount exceeds lender's available capital"
- Use Zod for client-side validation with custom error messages
- Add `<ErrorBoundary>` around major UI sections
- Create `useErrorHandler()` hook for consistent error handling

**Story Points:** 3

---

### Story 2.7: Success Feedback & Notifications

**As a** user
**I want** confirmation that my actions succeeded
**So that** I'm confident the system processed my request

**Acceptance Criteria:**
1. Toast notifications shown for successful actions (Loan created, Payment processed)
2. Success animations play for major milestones (confetti on first loan created)
3. In-app notification center shows recent activity
4. Real-time notifications for important events (loan approved, payment received)
5. Notifications are dismissible and non-blocking
6. Notification preferences configurable (email, in-app, none)

**Technical Notes:**
- Use `sonner` library for toast notifications
- Create `<NotificationCenter>` component with unread count badge
- Use Server-Sent Events (SSE) for real-time notifications
- Store notification preferences in user settings table

**Story Points:** 3

---

### Story 2.8: Responsive Layouts (Tablet/Mobile)

**As a** user on a tablet or mobile device
**I want** the platform to work on smaller screens
**So that** I can access key features on the go

**Acceptance Criteria:**
1. Responsive breakpoints: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
2. Navigation collapses to hamburger menu on mobile
3. Tables convert to card views on mobile
4. Forms adapt to single-column layout on mobile
5. Touch targets are minimum 44x44px on mobile
6. Core workflows functional on tablet (loan creation, payment entry)

**Technical Notes:**
- Use Tailwind CSS responsive utilities: `sm:`, `md:`, `lg:`
- Create `<MobileNav>` and `<DesktopNav>` components
- Use `@tanstack/react-table` with responsive column visibility
- Test on real devices: iPhone, iPad, Android tablet

**Story Points:** 5

---

### Story 2.9: Relationship Navigation & Context Panels

**As a** user
**I want** to navigate between related entities easily
**So that** I can see full context without losing my place

**Acceptance Criteria:**
1. Clicking borrower name from loan opens borrower sidepanel (not new page)
2. Sidepanel shows related entities: All borrower's loans, properties, payment history
3. Breadcrumb navigation shows path: Dashboard > Loans > Loan #123 > Borrower
4. Back button returns to previous view
5. Hover preview cards show entity details (no click required for quick info)
6. Relationship graph visualizes connections (borrower ↔ loans ↔ properties)

**Technical Notes:**
- Use Shadcn `<Sheet>` component for sidepanels
- Implement React Router state management for breadcrumbs
- Use `react-tooltip` for hover preview cards
- Consider `react-flow` for relationship graph visualization

**Story Points:** 5

---

### Story 2.10: Unified Search

**As a** user
**I want** a single search box to find any entity
**So that** I don't have to remember where things are stored

**Acceptance Criteria:**
1. Search box searches across: Borrowers, Lenders, Properties, Loans, Payments
2. Results grouped by entity type with result count
3. Fuzzy matching tolerates typos (e.g., "Chen" matches "Mike Chen")
4. Search by multiple attributes: Name, email, loan ID, property address
5. Recent searches saved and suggested
6. Search is fast (<300ms for 10,000 records)

**Technical Notes:**
- Use PostgreSQL full-text search with `ts_vector` columns
- Implement client-side fuzzy search with `fuse.js` for <1000 records
- Create composite search index across all entity tables
- Add search box to header with keyboard shortcut (/)

**Story Points:** 5

---

**Epic 2 Total:** 10 stories, 42 story points, 2 weeks

---

# Epic 3: Complete Loan Lifecycle Management

**Timeline:** Weeks 3-5
**Story Count:** 15 stories
**Story Points:** 61 points
**Goal:** Build end-to-end loan workflow from application → disbursement → servicing → payoff

## Epic 3 Stories

*(Due to length constraints, providing summary of key stories - full details available on request)*

### Story 3.1: Digital Loan Application Form (5 pts)
- Multi-step wizard: Borrower info → Property → Loan terms → Documents
- Document upload with drag-and-drop
- Auto-save progress

### Story 3.2: Automated Underwriting Engine (8 pts)
- LTV, DSCR, DTI calculations
- Risk scoring algorithm
- Underwriting checklist automation

### Story 3.3: Loan Structuring & Payment Schedule (5 pts)
- Interest-only, fully-amortizing, balloon structures
- Automated amortization schedule generation
- Fee calculation (points, origination, processing)

### Story 3.4: Multi-Lender Participation (5 pts)
- Percentage or dollar amount allocation
- Automated participation split calculations
- Lender participation statements

### Story 3.5: Loan Approval Workflow (5 pts)
- Multi-level approval routing
- Approval notifications
- Conditional approval with checklist

### Story 3.6: Disbursement Checklist (3 pts)
- Conditions precedent tracking
- Document verification
- Disbursement authorization

### Story 3.7: Loan Status Transitions (3 pts)
- State machine: Application → Approved → Active → Paid Off / Defaulted
- Automated status updates based on events
- Status change audit trail

### Story 3.8: Loan Detail View (5 pts)
- Comprehensive loan dashboard
- Payment timeline visualization
- Related entities (borrower, property, lenders)

### Story 3.9: Loan List with Advanced Filtering (5 pts)
- Filter by status, lender, property type, LTV, rate
- Saved filter views
- Bulk actions (export, email)

### Story 3.10: Loan Document Library (3 pts)
- Upload, organize, and retrieve loan documents
- Document types: Application, Appraisal, Insurance, Title
- Version history tracking

### Story 3.11: Loan Modification (3 pts)
- Change terms, rate, maturity date
- Generate loan modification agreement
- Update payment schedule

### Story 3.12: Loan Payoff Quote (3 pts)
- Calculate per-diem interest
- Include prepayment penalties if applicable
- Generate payoff statement PDF

### Story 3.13: Loan Closure & Archiving (3 pts)
- Final payment processing
- Archive closed loans
- Satisfaction/release document generation

### Story 3.14: Loan Performance Metrics (3 pts)
- Individual loan ROI calculation
- Days to close, time to payoff
- Performance dashboard per loan

### Story 3.15: Loan Alerts & Reminders (3 pts)
- Maturity date approaching (30/60/90 days)
- Delinquency alerts
- Document expiration reminders (insurance, appraisal)

**Epic 3 Total:** 15 stories, 61 story points, 3 weeks

---

# Epic 4: Payment Automation & Stripe/Plaid Integration

**Timeline:** Weeks 5-7
**Story Count:** 12 stories
**Story Points:** 50 points
**Goal:** Automate payment collection, processing, and reconciliation

## Epic 4 Stories

*(Summary - full details available on request)*

### Story 4.1: Stripe Connect Lender Onboarding (8 pts)
- Lender signs up for Stripe Connected Account
- KYC verification
- Bank account linking

### Story 4.2: Plaid Bank Account Linking (5 pts)
- Borrower links bank account via Plaid
- Account verification
- Store bank account tokens securely

### Story 4.3: Automated Recurring ACH Payments (8 pts)
- Schedule recurring ACH debits
- Process payments on due date (6am daily job)
- Real-time status tracking

### Story 4.4: Manual Payment Entry (3 pts)
- Record check, wire, cash payments
- Match payment to loan
- Generate payment receipt

### Story 4.5: Payment Waterfall Application (5 pts)
- Apply payment: Interest → Principal → Fees → Escrow
- Handle overpayments and underpayments
- Update loan balance

### Story 4.6: Late Fee Calculation (3 pts)
- Auto-apply late fees (5 days past due)
- Configurable late fee amount ($50 or 5% of payment)
- Late fee waiver capability

### Story 4.7: Payment Retry Logic (5 pts)
- Retry failed ACH payments (3 attempts over 7 days)
- Notify borrower of failed payment
- Escalate to manual follow-up after 3 failures

### Story 4.8: Participation Distribution (5 pts)
- Calculate lender participation splits
- Automate Stripe Connect transfers
- Generate lender statements

### Story 4.9: Payment Reconciliation Dashboard (3 pts)
- Show payments due, received, pending
- Exception handling (partial payments, overpayments)
- QuickBooks export

### Story 4.10: Payment History & Receipts (2 pts)
- Payment timeline view
- Email payment receipts to borrowers
- PDF receipt generation

### Story 4.11: Stripe/Plaid Webhook Handling (5 pts)
- Process payment.succeeded, payment.failed, account.updated webhooks
- Retry webhook processing on failure
- Webhook security validation

### Story 4.12: Payment Performance Analytics (3 pts)
- On-time payment rate
- Average days to payment
- Delinquency trends

**Epic 4 Total:** 12 stories, 50 story points, 2 weeks

---

# Epic 5: Construction Draw Management

**Timeline:** Weeks 7-9
**Story Count:** 10 stories
**Story Points:** 41 points
**Goal:** Enable inspection-based draw workflows for construction loans

## Epic 5 Stories

*(Summary - full details available on request)*

### Story 5.1: Draw Request Form (5 pts)
- Borrower submits draw request
- Work category selection (Foundation, Framing, etc.)
- Invoice and photo upload

### Story 5.2: Inspector Assignment (5 pts)
- Auto-assign inspector based on property location
- Inspector availability calendar
- Inspection scheduling

### Story 5.3: Mobile Inspector App (8 pts)
- Mobile-optimized inspection form
- Photo capture with annotations
- Work completion checklist

### Story 5.4: Draw Approval Workflow (5 pts)
- Lender reviews draw request
- Approve, reject, or request changes
- Approval notifications

### Story 5.5: Draw Disbursement (5 pts)
- Initiate ACH/wire transfer to borrower
- Update loan balance (drawn amount)
- Generate draw confirmation

### Story 5.6: Budget vs. Actual Tracking (3 pts)
- Show construction budget line items
- Track spend vs. budget per category
- Variance alerts

### Story 5.7: Lien Waiver Tracking (3 pts)
- Upload contractor lien waivers
- Conditional vs. unconditional waivers
- AIA document management

### Story 5.8: Draw History & Timeline (2 pts)
- Timeline view of all draws
- Status tracking per draw
- Total drawn vs. available

### Story 5.9: Draw Performance Analytics (2 pts)
- Average days from request to approval
- Inspection turnaround time
- Budget utilization percentage

### Story 5.10: Draw Request Notifications (3 pts)
- Notify lender when draw requested
- Notify borrower when inspection scheduled
- Notify borrower when draw disbursed

**Epic 5 Total:** 10 stories, 41 story points, 2 weeks

---

# Epic 6: Portfolio Analytics & Risk Management

**Timeline:** Weeks 9-12
**Story Count:** 11 stories
**Story Points:** 48 points
**Goal:** Provide real-time portfolio dashboards and risk analysis

## Epic 6 Stories

*(Summary - full details available on request)*

### Story 6.1: Portfolio Dashboard (8 pts)
- Real-time metrics: Total loans, volume, avg LTV, yield
- Loan status distribution chart
- Payment performance tracking

### Story 6.2: Geographic Heat Map (5 pts)
- Map visualization of loan concentration
- Drill-down by state, city, zip
- Concentration risk alerts

### Story 6.3: Delinquency Monitoring (5 pts)
- Delinquency aging report (30/60/90 days)
- Automated escalation workflow
- Lender notifications

### Story 6.4: Lender Performance Analytics (5 pts)
- Individual lender portfolio view
- ROI calculations per lender
- Participation tracking

### Story 6.5: Risk Scenario Modeling (8 pts)
- "What-if" stress testing
- LTV changes based on property value scenarios
- Loss exposure calculations

### Story 6.6: Custom Filters & Saved Views (3 pts)
- Create custom filter combinations
- Save and share filter views
- Quick filter buttons (Active, Delinquent, Maturing Soon)

### Story 6.7: Automated Board Report (5 pts)
- Generate monthly PDF board report
- Include: Portfolio metrics, delinquency trends, lender performance
- Email distribution to stakeholders

### Story 6.8: Pipeline Analytics (3 pts)
- Loan application pipeline view
- Approval rate tracking
- Bottleneck identification

### Story 6.9: Loan Origination Trends (2 pts)
- Monthly origination volume
- Average loan size, rate, term trends
- Year-over-year comparison

### Story 6.10: Portfolio Alerts (2 pts)
- Automated alerts: Delinquency spike, concentration risk, low available capital
- Configurable alert thresholds
- Email and in-app notifications

### Story 6.11: Custom Reporting (2 pts)
- Export portfolio data to CSV/Excel
- Scheduled report generation
- Custom date ranges and filters

**Epic 6 Total:** 11 stories, 48 story points, 4 weeks

---

# Epic 7: Testing, Documentation & Polish

**Timeline:** Weeks 10-12 (parallel with Epic 6)
**Story Count:** 8 stories
**Story Points:** 32 points
**Goal:** Achieve production-ready quality with comprehensive testing

## Epic 7 Stories

### Story 7.1: Unit Test Suite (8 pts)
- 80%+ code coverage target
- Test all utility functions, hooks, API routes
- Mock external services (Stripe, Plaid, Clerk)

### Story 7.2: Integration Test Suite (5 pts)
- Test API workflows end-to-end
- Database transaction testing
- Payment processing integration tests

### Story 7.3: E2E Test Suite (8 pts)
- Playwright tests for critical user journeys
- Test: Loan creation, payment processing, draw approval
- Run on CI/CD pipeline

### Story 7.4: API Documentation (3 pts)
- OpenAPI 3.0 spec generation
- Interactive API docs (Swagger UI)
- Authentication guide for API users

### Story 7.5: User Onboarding Flow (3 pts)
- Interactive tutorial on first login
- Contextual help tooltips
- Video tutorials for key workflows

### Story 7.6: Performance Optimization (3 pts)
- Optimize slow queries (add indexes, query optimization)
- Image optimization and lazy loading
- React Query caching strategy

### Story 7.7: Security Audit (2 pts)
- Run automated security scanner (Snyk, OWASP ZAP)
- Fix identified vulnerabilities
- Penetration testing with external firm

### Story 7.8: Deployment Automation (0 pts - already complete)
- Zero-downtime deployment via Vercel
- Automatic rollback on health check failure
- Blue-green deployment strategy

**Epic 7 Total:** 8 stories, 32 story points, 3 weeks (parallel)

---

# Epic Summary

| Epic | Stories | Story Points | Weeks | Dependencies |
|------|---------|-------------|-------|--------------|
| Epic 1: Foundation | 8 | 34 | 1-2 | None |
| Epic 2: UX System | 10 | 42 | 2-3 | Epic 1 |
| Epic 3: Loan Lifecycle | 15 | 61 | 3-5 | Epic 2 |
| Epic 4: Payment Automation | 12 | 50 | 5-7 | Epic 3 |
| Epic 5: Draw Management | 10 | 41 | 7-9 | Epic 4 |
| Epic 6: Portfolio Analytics | 11 | 48 | 9-12 | Epic 3, 4 |
| Epic 7: Testing & Docs | 8 | 32 | 10-12 | All epics |
| **Total** | **74** | **308** | **12** | - |

**Estimated Velocity:** 25-30 story points per week (1-2 developers)
**Timeline:** 12 weeks (3 months) to MVP
**MVP Definition:** Epics 1-6 complete + 80% test coverage

---

# Next Steps

1. **Review & Prioritize:** Validate story priorities with stakeholders
2. **Technical Design:** Create technical specs for Epic 1-2 stories
3. **Sprint Planning:** Break stories into tasks, assign to developers
4. **Begin Development:** Start with Epic 1, Story 1.1

**Ready for Architecture Phase:** Provide this document to architect for solution design

---

**Document Status:** Complete
**Version:** 1.0
**Date:** October 11, 2025
