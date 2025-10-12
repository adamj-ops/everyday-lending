# Everyday Lending Platform - Solution Architecture

**Author:** Winston (BMAD Architect) for adam
**Date:** October 11, 2025
**Version:** 1.0
**Project Level:** 4 (Platform/Ecosystem)

---

## Requirements & UX Analysis

### Document Review Summary

**Primary Requirements Documents Analyzed:**
1. ✅ **Product Requirements Document (PRD)** - `/docs/PRD.md` (1,345 lines)
2. ✅ **UX Specification** - `/docs/ux-specification-2025-10-11.md` (1,380 lines)
3. ✅ **Epic Breakdown** - `/docs/epics.md` (872 lines)
4. ✅ **Deep Dive Analysis** - `/reports/deep-dive-analysis.md` (1,481 lines)
5. ✅ **Project Workflow Analysis** - `/docs/project-workflow-analysis.md` (558 lines)

### Functional Requirements Summary

**7 Major Domains | 30+ Functional Requirements:**

**Domain 1: Core Entity Management** (FR-1.1 to FR-1.3)
- Borrower management (individuals & entities)
- Lender management with portfolio preferences
- Property management (residential & commercial)

**Domain 2: Loan Lifecycle Management** (FR-2.1 to FR-2.7)
- Digital loan application & origination
- Automated underwriting with risk scoring
- Loan structuring & payment schedules
- Disbursement workflows with checklist
- Loan servicing & payment processing
- Construction draw management
- Loan payoff & closure

**Domain 3: Payment Processing & Automation** (FR-3.1 to FR-3.3)
- Stripe Connect integration (marketplace payments)
- Plaid integration (ACH, bank verification)
- Payment reconciliation & GL integration

**Domain 4: Portfolio Management & Analytics** (FR-4.1 to FR-4.3)
- Real-time portfolio dashboard
- Lender performance analytics
- Risk management & concentration analysis

**Domain 5: User Experience & Interface** (FR-5.1 to FR-5.3)
- Attio-style interactions (command palette, inline editing, keyboard shortcuts)
- Data relationships & contextual intelligence
- Collaboration & communication features

**Domain 6: Security & Compliance** (FR-6.1 to FR-6.2)
- RBAC with Clerk (6 roles: Admin, Lender, Servicer, Borrower, Read-Only, Inspector)
- Complete audit trails & GDPR compliance

**Domain 7: Administration & Configuration** (FR-7.1 to FR-7.2)
- System configuration & fee management
- Data import/export & bulk operations

### Non-Functional Requirements Summary

**12 Comprehensive NFRs:**

1. **Performance:** <500ms P95 API response, <2s page loads, <300ms search
2. **Reliability:** 99.9% uptime, automated failover, 11-nines durability
3. **Scalability:** 10,000+ concurrent users, 100,000+ loans
4. **Security:** MFA, RLS, TLS 1.3, AES-256, PII encryption, Arcjet protection
5. **Compliance:** Audit logging, GDPR, SOC 2 readiness
6. **Usability:** 5-min first loan, <30s power-user workflows, WCAG 2.1 AA
7. **Maintainability:** 80%+ test coverage, zero-downtime deployments
8. **Interoperability:** RESTful APIs, webhooks, data export
9. **Localization:** English primary, i18n-ready architecture
10. **Cost Efficiency:** <$500/month for first 100 lenders
11. **Developer Experience:** One-command setup, <3s hot reload, 100% TypeScript
12. **Operational Excellence:** Health checks, real-time metrics, <15min P1 response

### UX Specification Key Insights

**Design Philosophy:** "Speed IS the feature" - <500ms interaction time for trust

**5 Signature Components (Implementation-Ready):**

1. **Universal Command Palette (Cmd+K)**
   - Fuzzy search across all entities
   - Recent items + smart suggestions
   - Actions: Create, Navigate, Search, Execute
   - Keyboard: Arrow keys, Enter, Esc
   - Performance: <100ms response time

2. **Deal Journal Timeline**
   - Chronological narrative of loan lifecycle
   - Human-readable audit trail
   - Events, decisions, docs, number snapshots
   - Quick excerpts for emails/statements
   - Filterable by category and actor

3. **Relationship Sidepanel**
   - Bidirectional entity navigation
   - Contextual data without navigation
   - Live updates with React Query
   - Keyboard navigation (Cmd+])
   - Borrower ↔ Loans ↔ Properties ↔ Lenders

4. **Inline Editing System**
   - Click-to-edit all fields
   - Auto-save on blur
   - Optimistic UI updates
   - Validation & error recovery
   - Undo/redo support (Cmd+Z)

5. **Smart Table with Keyboard Nav**
   - J/K navigation (Vim-style)
   - Multi-select (Shift+Click, Cmd+A)
   - Inline quick actions
   - Sortable, filterable columns
   - Virtual scrolling for performance

**10 UX Design Principles:**
1. Speed is a Feature (<500ms interactions)
2. Keyboard-First Design (80%+ workflows without mouse)
3. Contextual Intelligence (smart suggestions, predictive search)
4. Progressive Disclosure (show 20% that matters, reveal rest on intent)
5. Feedback & Visibility (loading states, success animations, error recovery)
6. Data Relationships First (bidirectional navigation)
7. Consistency & Predictability (unified patterns)
8. Mobile & Responsive (tablet/mobile functional)
9. Accessibility & Inclusivity (WCAG 2.1 AA)
10. Delight in Details (micro-animations, empty states, celebrations)

**Attio-Inspired Interactions:**
- Command palette as central hub
- Inline editing everywhere (no modal forms)
- Contextual sidepanels
- Subtle motion and visual rhythm
- Fast list navigation (J/K keys)
- Real-time collaboration with optimistic updates

### Epic Structure Summary

**7 Epics | 74 Stories | 308 Story Points | 12 Weeks:**

| Epic | Stories | Points | Duration | Focus |
|------|---------|--------|----------|-------|
| Epic 1: Foundation & Core Infrastructure | 8 | 34 | Weeks 1-2 | Database, RBAC, monitoring, CI/CD |
| Epic 2: Attio-Style UX System | 10 | 42 | Weeks 2-3 | Command palette, keyboard shortcuts, inline editing |
| Epic 3: Complete Loan Lifecycle | 15 | 61 | Weeks 3-5 | Application → disbursement → servicing → payoff |
| Epic 4: Payment Automation | 12 | 50 | Weeks 5-7 | Stripe Connect, Plaid, reconciliation |
| Epic 5: Construction Draw Management | 10 | 41 | Weeks 7-9 | Draw requests, inspections, disbursements |
| Epic 6: Portfolio Analytics | 11 | 48 | Weeks 9-12 | Dashboards, risk analysis, reporting |
| Epic 7: Testing & Documentation | 8 | 32 | Weeks 10-12 | 80%+ coverage, API docs, E2E tests |

**Dependency Flow:**
```
Epic 1 (Foundation)
  ↓
Epic 2 (UX System)
  ↓
Epic 3 (Loan Lifecycle) ────────────┐
  ↓                                  ↓
Epic 4 (Payment Automation)    Epic 6 (Analytics)
  ↓
Epic 5 (Draw Management)

Epic 7 (Testing/Docs) - Parallel with Epics 1-6
```

### Technology Stack (Existing Foundation)

**Frontend:**
- Next.js 15+ (App Router, Server Components)
- React 19 (latest)
- TypeScript 5+ (strict mode)
- Tailwind CSS 4
- Shadcn UI (Radix primitives)
- TanStack Query (React Query) for state
- React Hook Form + Zod validation
- Framer Motion for animations
- next-intl for i18n (EN, FR)

**Backend:**
- Next.js API Routes (RESTful)
- PostgreSQL (Neon for production)
- Drizzle ORM (type-safe)
- PGlite for local development

**Authentication & Security:**
- Clerk (auth, MFA, RBAC, orgs)
- Arcjet (bot protection, rate limiting, WAF)

**Monitoring & Observability:**
- Sentry (error tracking)
- PostHog (analytics, feature flags)
- LogTape + Better Stack (logging)
- Checkly (uptime monitoring)
- Codecov (code coverage)

**Development:**
- ESLint + Prettier
- Lefthook (git hooks)
- Vitest (unit tests)
- Playwright (E2E tests)
- Storybook (component development)
- Conventional Commits + Commitizen

### Integrations Required (To Be Added)

**Critical Integrations:**
1. **Stripe Connect** - Marketplace payments, lender onboarding, automated splits
2. **Plaid** - Bank verification, ACH setup, balance checks
3. **AWS S3 + CloudFront** - Document storage, photo uploads
4. **SendGrid or Resend** - Transactional emails, notifications
5. **Twilio** (optional) - SMS notifications, 2FA backup

**Future Integrations:**
6. **DocuSign** - E-signature workflows (Phase 2)
7. **Experian/Plaid Credit** - Credit checks (Phase 2)
8. **QuickBooks/Xero** - Accounting sync (Phase 3)

### Current State Assessment

**From Deep Dive Analysis (8.0/10 Overall):**

✅ **Strengths:**
- Architecture: 8.5/10 (solid Next.js App Router pattern)
- Database: 9.0/10 (sophisticated schema, 9 tables, syndication support)
- Security: 9.0/10 (Clerk + Arcjet comprehensive)
- Monitoring: 9.0/10 (Sentry, PostHog, Better Stack, Checkly)
- Code Quality: 8.5/10 (consistent, type-safe, clean)

⚠️ **Gaps to Address:**
- Business Logic: 4.0/10 (missing workflows, state machines)
- Testing: 3.0/10 (minimal coverage, needs comprehensive suite)
- API Design: 7.5/10 (solid but needs pagination, versioning)
- Frontend: 8.0/10 (good components but needs loading states, optimistic updates)

**Existing Assets (Reusable):**
- ✅ Complete Drizzle schema (borrowers, lenders, properties, loans, payments, draws, participations)
- ✅ CRUD APIs for all core entities
- ✅ Shadcn UI component library
- ✅ React components (tables, dialogs, forms, drawers)
- ✅ Authentication & security infrastructure
- ✅ Monitoring & observability stack
- ✅ Loan calculator utilities
- ✅ Currency & date formatters

### Requirements-to-Architecture Mapping

**Key Architectural Challenges:**

1. **State Machine Complexity**
   - Loan states: Application → Underwriting → Approved → Funded → Active → Paid Off / Defaulted / Foreclosed
   - Draw states: Requested → Reviewed → Approved → Inspected → Disbursed
   - Payment states: Scheduled → Pending → Processed → Failed / Reconciled
   - **Solution:** Implement XState or custom state machine with event sourcing

2. **Performance Requirements**
   - <500ms P95 API response
   - <300ms search results
   - <2s page loads
   - **Solution:** Database indexes, Redis caching, React Query optimization, code splitting

3. **Real-Time Updates**
   - Optimistic UI updates
   - Live dashboard metrics
   - Collaborative editing
   - **Solution:** React Query optimistic mutations, Server-Sent Events (SSE), or WebSockets

4. **Payment Processing**
   - Stripe Connect marketplace pattern
   - Plaid ACH automation
   - Payment waterfall (interest → principal → fees)
   - **Solution:** Service layer with strategy pattern, idempotent operations, webhook handling

5. **Multi-Tenancy**
   - Organization-level data isolation
   - Row-Level Security (RLS)
   - User roles (6 types)
   - **Solution:** Clerk organizations + Drizzle query filters + middleware enforcement

6. **Attio-Style UX**
   - Command palette with fuzzy search
   - Inline editing with auto-save
   - Keyboard shortcuts system
   - <500ms interactions
   - **Solution:** cmdk library, debounced saves, react-hotkeys-hook, aggressive caching

### Cross-References & Alignment Check

✅ **PRD ↔ UX Spec Alignment:**
- Every epic has corresponding UX components
- All 10 UX principles support NFRs
- 5 signature components map to Epics 2-3
- User journeys validated in UX spec

✅ **PRD ↔ Epics Alignment:**
- 7 epics cover all 7 FR domains
- 74 stories implement all FRs
- 12 NFRs distributed across epics
- No orphaned requirements

⚠️ **Gaps Identified:**
1. Service layer not specified (architectural need)
2. Caching strategy not defined (performance need)
3. Background job system not specified (payment automation need)
4. File upload/storage not detailed (document management need)
5. Email template system not defined (notification need)

**These gaps will be addressed in the solution architecture.**

---

## Technical Preferences & Constraints

**User Skill Level:** Intermediate-to-Advanced
- Strong frontend experience (Next.js, Shadcn, Tailwind)
- Intermediate backend & database (Drizzle + PostgreSQL)
- AI-augmented development (Cursor + BMAD)
- Light DevOps comfort (Vercel, Upstash, Neon)

**Architecture Decision Preferences:**

**1. State Machine Management:**
- **Primary:** XState for workflow orchestration
- **Use Cases:** Loan lifecycle, draw requests, payment flows
- **Rationale:** Declarative, testable, compliance-driven
- **Migration Path:** Start with lightweight reducers → migrate to full XState statecharts as flows stabilize

**2. Caching Strategy:**
- **Client-Side:** TanStack Query (React Query) for background refetching
- **Server-Side:** Redis (Upstash or Vercel KV) for computed aggregates
- **Target:** <500ms latency, responsive UI
- **Use Cases:** Portfolio totals, metrics, dashboard data

**3. Background Job Processing:**
- **Primary:** Inngest (event-driven, Vercel-native)
- **Use Cases:** Daily accruals, statements, payment reconciliation, notifications
- **Alternative:** BullMQ + Redis for heavier infrastructure needs
- **Rationale:** Clean Next.js integration, TypeScript-first

**4. Email Service:**
- **Primary:** Resend (Next.js-native, simple TypeScript API)
- **Secondary:** SendGrid for compliance-heavy messages (statements, tax docs)
- **Pattern:** Templated, trackable events via Resend SDK
- **Templates:** Transactional emails, notifications, statements

**5. File Storage & CDN:**
- **Production:** AWS S3 + CloudFront CDN
- **Staging:** Vercel Blob or Cloudflare R2
- **Upload Pattern:** Presigned URLs via Next.js API routes
- **Use Cases:** Borrower documents, statements, draw photos, receipts

**6. Search Implementation:**
- **Options:** Meilisearch (preferred) or PostgreSQL Full-Text Search
- **Use Case:** Cmd+K global search across entities
- **Requirements:** Fuzzy matching, <100ms response, keyword highlighting

**7. Feature Management:**
- **Tool:** ConfigCat or Unleash
- **Use Cases:** Staged rollouts, A/B testing, kill switches
- **Integration:** PostHog feature flags (alternative)

**Infrastructure Constraints (Brownfield Foundation):**

**Existing Stack (Retained):**
- ✅ Next.js 15 + React 19 + TypeScript
- ✅ Drizzle ORM + PostgreSQL (Neon)
- ✅ Clerk authentication + Arcjet security
- ✅ Shadcn UI + Tailwind CSS 4
- ✅ TanStack Query (React Query)
- ✅ Sentry (errors) + PostHog (analytics) + Better Stack (logs)

**New Directory Structure (To Be Added):**
- `/src/services/` - Business logic service layer
- `/src/jobs/` - Background job definitions (Inngest)
- `/src/state-machines/` - XState workflow definitions
- `/src/lib/cache/` - Redis caching utilities
- `/src/lib/storage/` - S3 file upload/download utilities
- `/src/lib/email/` - Email template and sending utilities

**Team Capabilities:**
- **Strength:** Frontend (React, Next.js, Shadcn, Tailwind)
- **Competent:** Backend (Node.js, TypeScript, APIs)
- **Learning:** Database optimization, workflow orchestration
- **Tooling:** AI-assisted development (Cursor, BMAD agents)

**Deployment & Operations:**
- **Platform:** Vercel (primary hosting)
- **Database:** Neon PostgreSQL (production)
- **Cache:** Upstash Redis or Vercel KV
- **Storage:** AWS S3 (production), Vercel Blob (staging)
- **Background Jobs:** Inngest (serverless functions)
- **Monitoring:** Sentry, Better Stack, PostHog, Checkly

---

## Architecture Pattern Decision

### Confirmed Architecture Decisions

**1. Architecture Style: Enhanced Modular Monolith with Service Layer** ✅

**Rationale:**
- Single Next.js application with clear module boundaries
- Service layer in `/src/services/` for business logic isolation
- Event-driven patterns via Inngest for async operations
- Maintains separation: `/src/services`, `/src/lib`, `/src/app/api`
- Optimal for single-team setup, Vercel deployment, and 12-week timeline
- Internal modularization enables future extraction to microservices if needed

**Pattern:**
```
Next.js App (Presentation)
  → API Routes (HTTP Layer)
    → Services (Business Logic)
      → Data Access (Drizzle ORM)
        → PostgreSQL
```

**2. Repository Strategy: Monorepo** ✅

**Rationale:**
- Single repository for frontend, backend (Next.js routes), and background jobs (Inngest)
- Simplifies versioning, dependency management, and deployment
- Unified CI/CD pipeline
- Better for BMAD agent workflows
- Easier collaboration for single team

**Structure:**
```
everyday-lending/
├── src/
│   ├── app/           # Next.js App Router (presentation)
│   ├── services/      # Business logic (NEW)
│   ├── lib/           # Utilities, cache, storage
│   ├── components/    # React components
│   ├── hooks/         # React hooks
│   └── ...
├── docs/              # Documentation
├── tests/             # Test suites
└── bmad/              # BMAD agents & workflows
```

**3. API Pattern: REST + RPC Hybrid** ✅

**Rationale:**
- Clear separation between data operations and domain logic
- No GraphQL overhead for current timeline
- Familiar patterns for team
- Excellent TypeScript support

**Pattern:**
- **REST for CRUD:** Standard resource operations
  - `GET /api/loans` - List loans
  - `POST /api/loans` - Create loan
  - `PATCH /api/loans/[id]` - Update loan
  - `DELETE /api/loans/[id]` - Delete loan

- **RPC for Workflows:** Domain-specific actions
  - `POST /api/loans/[id]/approve` - Approve loan (workflow action)
  - `POST /api/loans/[id]/disburse` - Disburse funds (workflow action)
  - `POST /api/loans/[id]/generate-payoff` - Generate payoff quote (calculation)
  - `POST /api/draws/[id]/approve` - Approve draw request (workflow action)
  - `POST /api/payments/[id]/process` - Process payment (business logic)

---

## Epic Analysis & Component Boundaries

### Epic-to-Service Mapping

**Epic 1: Foundation & Core Infrastructure** → Infrastructure Layer

**Components:**
- Database setup & migrations (Drizzle + Neon)
- RBAC middleware (Clerk roles enforcement)
- Error monitoring (Sentry integration)
- Analytics (PostHog events)
- Rate limiting (Arcjet configuration)
- Health checks (`/api/health`)
- CI/CD pipeline (GitHub Actions + Vercel)
- Database seeding utilities

**Services Required:** None (infrastructure only)

**Key Files:**
- `/src/middleware.ts` - Auth, RBAC, rate limiting
- `/src/utils/DBConnection.ts` - Database connection
- `/src/utils/DBMigration.ts` - Migration runner
- `/src/lib/monitoring/` - Sentry, PostHog setup
- `/migrations/*.sql` - Database migrations

---

**Epic 2: Attio-Style UX System** → Frontend Layer

**Components:**
- Universal Command Palette (`cmdk` library)
- Keyboard shortcuts system (`react-hotkeys-hook`)
- Inline editing components (auto-save, optimistic updates)
- Smart suggestions & autocomplete (fuzzy search)
- Loading states & skeleton screens
- Error handling UI & recovery
- Success feedback & notifications (`sonner`)
- Responsive layouts (mobile/tablet adaptations)
- Relationship sidepanel (contextual navigation)
- Unified search (global entity search)

**Services Required:**
- `SearchService` - Fuzzy search across entities (Meilisearch or Postgres FTS)

**Key Files:**
- `/src/components/command-palette.tsx` - Cmd+K palette
- `/src/components/inline-edit.tsx` - Editable field wrapper
- `/src/components/relationship-panel.tsx` - Sidepanel navigation
- `/src/components/keyboard-shortcuts.tsx` - Shortcut provider
- `/src/hooks/use-command-palette.ts` - Command palette hook
- `/src/hooks/use-keyboard-shortcuts.ts` - Shortcuts hook
- `/src/services/SearchService.ts` - Search implementation

---

**Epic 3: Complete Loan Lifecycle Management** → Loan Domain

**Components:**
- Loan application form (multi-step wizard)
- Automated underwriting engine
- Loan structuring & payment schedule generator
- Multi-lender participation UI
- Loan approval workflow UI
- Disbursement checklist
- Loan status transitions (state machine UI)
- Loan detail view (comprehensive dashboard)
- Loan list with advanced filtering
- Document library (upload/download)
- Loan modification dialogs
- Payoff quote generator
- Loan closure workflow

**Services Required:**
- `LoanService` - Core loan operations and workflow orchestration
- `UnderwritingService` - LTV, DSCR, DTI calculations, risk scoring
- `AmortizationService` - Payment schedule generation
- `LoanStateMachine` - XState machine for loan lifecycle

**State Machine:**
```
Application → Underwriting → Approved → Funded → Active
  → [Paid Off | Defaulted | Foreclosed]
```

**Key Files:**
- `/src/services/LoanService.ts` - Loan business logic
- `/src/services/UnderwritingService.ts` - Underwriting calculations
- `/src/services/AmortizationService.ts` - Payment schedules
- `/src/state-machines/loan-lifecycle.machine.ts` - XState definition
- `/src/app/api/loans/` - Loan CRUD endpoints
- `/src/app/api/loans/[id]/approve/route.ts` - Approval workflow
- `/src/app/api/loans/[id]/disburse/route.ts` - Disbursement workflow
- `/src/components/loans/` - Loan UI components

---

**Epic 4: Payment Automation & Stripe/Plaid Integration** → Payment Domain

**Components:**
- Stripe Connect lender onboarding UI
- Plaid bank account linking UI
- Payment scheduling dashboard
- Manual payment entry form
- Payment waterfall visualization
- Late fee calculator
- Payment retry management
- Participation distribution UI
- Payment reconciliation dashboard
- Payment history timeline
- Payment receipts & statements

**Services Required:**
- `PaymentService` - Payment processing, allocation, waterfall logic
- `StripeService` - Stripe Connect integration (lender onboarding, transfers, webhooks)
- `PlaidService` - Bank verification, ACH setup, balance checks
- `ReconciliationService` - Payment matching and GL integration
- `PaymentStateMachine` - XState machine for payment lifecycle

**Background Jobs (Inngest):**
- Daily payment collection (6am cron)
- Payment retry logic (3 attempts over 7 days)
- Late fee calculation (5 days past due)
- Participation distribution (end of month)

**Key Files:**
- `/src/services/PaymentService.ts` - Payment business logic
- `/src/services/StripeService.ts` - Stripe Connect wrapper
- `/src/services/PlaidService.ts` - Plaid integration
- `/src/services/ReconciliationService.ts` - Payment reconciliation
- `/src/state-machines/payment.machine.ts` - Payment state machine
- `/src/jobs/payment-collection.ts` - Inngest daily collection job
- `/src/jobs/payment-retry.ts` - Inngest retry job
- `/src/jobs/late-fee-calculation.ts` - Inngest late fee job
- `/src/app/api/payments/` - Payment endpoints
- `/src/app/api/webhooks/stripe/route.ts` - Stripe webhook handler
- `/src/app/api/webhooks/plaid/route.ts` - Plaid webhook handler

---

**Epic 5: Construction Draw Management** → Draw Domain

**Components:**
- Draw request form (borrower-facing)
- Inspector assignment & scheduling
- Mobile inspector app (photo upload, checklist)
- Draw approval workflow UI
- Draw disbursement interface
- Budget vs. actual tracking
- Lien waiver upload & tracking
- Draw history timeline
- Draw performance analytics

**Services Required:**
- `DrawService` - Draw workflow orchestration
- `InspectionService` - Inspector assignment, scheduling
- `DrawStateMachine` - XState machine for draw lifecycle

**State Machine:**
```
Requested → Reviewed → Approved → Inspected → Disbursed
```

**Key Files:**
- `/src/services/DrawService.ts` - Draw business logic
- `/src/services/InspectionService.ts` - Inspection scheduling
- `/src/state-machines/draw.machine.ts` - Draw state machine
- `/src/app/api/draws/` - Draw CRUD endpoints
- `/src/app/api/draws/[id]/approve/route.ts` - Approval workflow
- `/src/app/api/draws/[id]/disburse/route.ts` - Disbursement workflow
- `/src/components/draws/` - Draw UI components
- `/src/components/draws/mobile-inspector-app.tsx` - Mobile inspector interface

---

**Epic 6: Portfolio Analytics & Risk Management** → Analytics Domain

**Components:**
- Real-time portfolio dashboard
- Geographic heat map (loan concentration)
- Delinquency monitoring dashboard
- Lender performance analytics
- Risk scenario modeling (stress testing)
- Custom filters & saved views
- Automated board report generator
- Pipeline analytics
- Loan origination trends
- Portfolio alerts system
- Custom reporting interface

**Services Required:**
- `AnalyticsService` - Portfolio metrics, aggregations, trend analysis
- `ReportingService` - Report generation (PDF, CSV, Excel)
- `RiskService` - Risk scoring, concentration analysis, stress testing

**Caching Strategy:**
- Redis (Upstash) for computed aggregates (portfolio totals, metrics)
- React Query for client-side caching with 5-minute stale time
- Incremental Static Regeneration (ISR) for dashboard pages

**Key Files:**
- `/src/services/AnalyticsService.ts` - Analytics calculations
- `/src/services/ReportingService.ts` - Report generation
- `/src/services/RiskService.ts` - Risk analysis
- `/src/lib/cache/redis.ts` - Redis caching utilities
- `/src/app/api/analytics/` - Analytics endpoints
- `/src/app/api/reports/` - Report generation endpoints
- `/src/components/dashboard/` - Dashboard components
- `/src/components/analytics/` - Analytics visualizations

---

**Epic 7: Testing, Documentation & Polish** → Quality Assurance

**Components:**
- Unit test suite (Vitest)
- Integration test suite (API tests)
- E2E test suite (Playwright)
- API documentation (OpenAPI 3.0)
- User onboarding flow
- Performance optimization
- Security audit utilities
- Deployment automation

**Services Required:** None (infrastructure/quality focus)

**Target Coverage:**
- Unit tests: 80%+ code coverage
- Integration tests: All API workflows
- E2E tests: 5 critical user journeys (from PRD)

**Key Files:**
- `/tests/unit/` - Unit tests
- `/tests/integration/` - API integration tests
- `/tests/e2e/` - Playwright E2E tests
- `/docs/api/openapi.yaml` - API specification
- `/docs/CONTRIBUTING.md` - Developer guide
- `/.github/workflows/` - CI/CD pipelines

---

### Service Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                           │
│  Next.js 15 App Router + React 19 + Shadcn UI + TanStack Query │
│  • Command Palette • Inline Editing • Keyboard Shortcuts        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
│           Next.js API Routes (REST + RPC Hybrid)                │
│  • /api/loans (REST)  • /api/loans/[id]/approve (RPC)          │
│  • Auth Middleware    • RBAC Enforcement    • Validation        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                               │
│                 /src/services/* (Domain Logic)                   │
├─────────────────────┬──────────────────┬────────────────────────┤
│   LoanService       │  PaymentService  │  DrawService           │
│   • Workflow        │  • Allocation    │  • Inspection          │
│   • State machine   │  • Waterfall     │  • Approval            │
│   • Calculations    │  • Reconciliation│  • Budget tracking     │
├─────────────────────┼──────────────────┼────────────────────────┤
│ UnderwritingService │  StripeService   │ InspectionService      │
│ • LTV/DSCR/DTI      │  • Connect       │  • Assignment          │
│ • Risk scoring      │  • Transfers     │  • Scheduling          │
│ • Decisioning       │  • Webhooks      │  • Mobile app          │
├─────────────────────┼──────────────────┼────────────────────────┤
│AmortizationService  │  PlaidService    │ AnalyticsService       │
│ • Payment schedule  │  • Bank verify   │  • Metrics             │
│ • Interest calc     │  • ACH setup     │  • Aggregations        │
│ • Payoff quotes     │  • Balance check │  • Trend analysis      │
├─────────────────────┴──────────────────┴────────────────────────┤
│ SearchService  • NotificationService  • ReportingService        │
│ • Fuzzy search • Email (Resend)       • PDF generation          │
│ • Entity index • SMS (Twilio)         • Excel export            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                             │
│              Drizzle ORM + Repository Pattern                    │
│  • BorrowerRepository  • LoanRepository  • PaymentRepository    │
│  • Type-safe queries   • Transactions    • Query optimization   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   POSTGRESQL DATABASE (Neon)                     │
│  borrowers • lenders • properties • loans • payments            │
│  lenderParticipations • rehabDraws • servicingIncome            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   CROSS-CUTTING CONCERNS                         │
├─────────────────────────────────────────────────────────────────┤
│ Background Jobs (Inngest)                                       │
│ • payment-collection.ts  • payment-retry.ts  • late-fees.ts    │
│ • interest-accrual.ts    • statement-generation.ts             │
├─────────────────────────────────────────────────────────────────┤
│ Caching (Redis + React Query)                                   │
│ • Server: Upstash Redis (portfolio aggregates)                 │
│ • Client: TanStack Query (entity caching, 5min stale)          │
├─────────────────────────────────────────────────────────────────┤
│ File Storage (AWS S3 + CloudFront)                             │
│ • /src/lib/storage/s3.ts  • Presigned URLs  • CDN delivery    │
├─────────────────────────────────────────────────────────────────┤
│ State Machines (XState)                                         │
│ • loan-lifecycle.machine.ts  • payment.machine.ts              │
│ • draw.machine.ts            • Event sourcing                  │
└─────────────────────────────────────────────────────────────────┘
```

### Component Dependency Map

**Epic Dependencies:**
```
Epic 1 (Foundation)
  ├─→ Epic 2 (UX System)
  ├─→ Epic 3 (Loan Lifecycle)
  ├─→ Epic 4 (Payment Automation)
  ├─→ Epic 5 (Draw Management)
  └─→ Epic 6 (Portfolio Analytics)

Epic 2 (UX System)
  └─→ Epic 3, 4, 5, 6 (All feature epics use UX components)

Epic 3 (Loan Lifecycle)
  ├─→ Epic 4 (Payments depend on active loans)
  ├─→ Epic 5 (Draws depend on construction loans)
  └─→ Epic 6 (Analytics need loan data)

Epic 4 (Payment Automation)
  └─→ Epic 6 (Analytics need payment data)

Epic 5 (Draw Management)
  └─→ Epic 6 (Analytics need draw data)

Epic 7 (Testing) - Parallel with all epics
```

**Service Dependencies:**
```
LoanService
  ├─→ UnderwritingService (risk scoring)
  ├─→ AmortizationService (payment schedules)
  ├─→ NotificationService (borrower updates)
  └─→ DocumentService (document management)

PaymentService
  ├─→ StripeService (payment processing)
  ├─→ PlaidService (bank verification)
  ├─→ ReconciliationService (matching payments)
  └─→ NotificationService (payment confirmations)

DrawService
  ├─→ InspectionService (inspector assignment)
  ├─→ PaymentService (draw disbursement)
  └─→ NotificationService (draw updates)

AnalyticsService
  ├─→ LoanService (loan data)
  ├─→ PaymentService (payment data)
  ├─→ DrawService (draw data)
  └─→ Redis (cached aggregates)
```

---

## Technology Stack & Library Decisions

### Core Technology Stack

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Framework** | Next.js | 15.0.3 | App Router, Server Components, RSC, optimal for Vercel, excellent DX |
| **Runtime** | React | 19.0.0 | Latest stable, concurrent features, Server Components support |
| **Language** | TypeScript | 5.6.3 | Type safety, excellent IDE support, reduces runtime errors |
| **Styling** | Tailwind CSS | 4.0.0 | Utility-first, fast builds, excellent with Shadcn, small bundle |
| **UI Components** | Shadcn UI | Latest | Radix primitives, accessible, customizable, copy-paste approach |
| **Database** | PostgreSQL (Supabase) | 16.x | ACID compliance, mature, excellent for financial data, JSON support |
| **ORM** | Drizzle ORM | 0.36.4 | Type-safe, lightweight, excellent DX, connects via Supabase Postgres URL |
| **Database (Local)** | PGlite | Latest | In-browser PostgreSQL for local development, no Docker needed |
| **Database (Prod)** | Supabase | Latest | Managed PostgreSQL + Auth + Storage + Realtime + RLS + Edge Functions |
| **Realtime Updates** | Supabase Realtime | Built-in | WebSocket-based live updates for loan status, payments, timeline syncs |
| **Row-Level Security** | Supabase RLS | Built-in | Native PostgreSQL RLS for multi-tenant data isolation (org-level) |

### Authentication & Security

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Authentication** | Clerk | 6.4.13 | Comprehensive auth, MFA, RBAC, organizations, excellent DX |
| **Security Layer** | Arcjet | 1.0.0-alpha.31 | Bot protection, rate limiting, WAF, SQL injection prevention |
| **Session Management** | Clerk (built-in) | N/A | Secure JWT tokens, automatic rotation, built-in to Clerk |
| **Encryption** | Node crypto | Built-in | AES-256 for PII, TLS 1.3 for transport |

### State Management & Data Fetching

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Client State** | TanStack Query | 5.62.7 | Excellent caching, background refetch, optimistic updates, DevTools |
| **Server State** | React Server Components | Built-in | Zero-bundle server data, better performance than client fetch |
| **Form State** | React Hook Form | 7.54.2 | Performant, uncontrolled forms, excellent validation integration |
| **Validation** | Zod | 3.24.1 | Runtime type validation, TypeScript inference, form schema |
| **State Machines** | XState | 5.19.0 | Declarative workflows, visual state charts, testable, audit-friendly |

### UI/UX Libraries

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Command Palette** | cmdk | 1.0.4 | Used by Linear/Attio, excellent keyboard nav, fuzzy search |
| **Keyboard Shortcuts** | react-hotkeys-hook | 4.6.1 | Simple API, TypeScript support, minimal bundle |
| **Animations** | Framer Motion | 11.15.0 | Declarative animations, spring physics, layout animations |
| **Icons** | Lucide React | 0.468.0 | Beautiful icons, tree-shakeable, consistent with Shadcn |
| **Toast Notifications** | sonner | 1.7.1 | Beautiful toasts, stacking, promise-based, used by Shadcn |
| **Date Handling** | date-fns | 4.1.0 | Lightweight, modular, immutable, better than moment.js |
| **Currency Formatting** | Custom utilities | N/A | Built on Intl.NumberFormat, locale-aware |
| **Tables** | @tanstack/react-table | 8.20.6 | Headless, virtualization, sorting, filtering, excellent perf |
| **Charts** | Recharts | 2.15.0 | React-native, composable, good for financial dashboards |

### Backend & Integration Services

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Payment Processing** | Stripe | 17.5.0 | Industry standard, Connect for marketplace, excellent docs |
| **Bank Integration** | Plaid | 33.0.0 | ACH, bank verification, balance checks, Link UI |
| **Background Jobs** | Inngest | 4.0.7 | Serverless, Vercel-native, great DX, visual workflow inspector |
| **Edge Functions** | Supabase Functions | Built-in | Optional for scheduled/secure server tasks, Deno runtime |
| **File Storage (Primary)** | Supabase Storage | Built-in | S3-compatible, presigned URLs, image transformations, RLS-protected |
| **File Storage (CDN)** | CloudFront (Optional) | N/A (AWS) | Optional CDN for Supabase Storage, global distribution |
| **Email (Primary)** | Resend | 4.0.2 | Modern API, excellent DX, React Email templates |
| **Email (Secondary)** | SendGrid | 8.1.4 | Compliance emails, high deliverability, audit logs |
| **SMS (Optional)** | Twilio | 5.3.7 | Reliable SMS, 2FA backup, notifications |

### Search & Caching

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Search Engine** | Meilisearch | 0.42.0 | Fast, typo-tolerant, faceted search, self-hosted option |
| **Search (Fallback)** | Supabase FTS | Built-in | PostgreSQL full-text search via Supabase, good for <10K entities |
| **Cache (Server)** | Upstash Redis | Latest SDK | Serverless Redis, Vercel integration, durable, REST API |
| **Cache (Client)** | TanStack Query | 5.62.7 | Built-in client cache, background refetch, stale-while-revalidate |

### Monitoring & Observability

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Error Tracking** | Sentry | 8.46.0 | Comprehensive error monitoring, source maps, release tracking |
| **Analytics** | PostHog | 4.2.1 | Product analytics, feature flags, session replay, self-hostable |
| **Logging (Primary)** | Supabase Logs | Built-in | PostgreSQL logs, API logs, Auth logs, real-time log streaming |
| **Logging (Secondary)** | Better Stack (Logtail) | 0.7.0 | Structured logging, SQL queries on logs, excellent search |
| **Uptime Monitoring** | Checkly | N/A (SaaS) | Synthetic monitoring, multi-location, API checks |
| **APM** | Sentry Performance | Built-in | Request tracing, slow query detection, Web Vitals |

### Development & Testing

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Testing (Unit)** | Vitest | 2.1.8 | Fast, Vite-based, Jest-compatible, excellent watch mode |
| **Testing (E2E)** | Playwright | 1.49.1 | Reliable, multi-browser, visual regression, trace viewer |
| **Testing (Component)** | Vitest + Testing Library | 16.1.0 | React Testing Library, user-centric tests |
| **Code Quality** | ESLint | 9.17.0 | Linting, Next.js rules, TypeScript support |
| **Code Formatting** | Prettier | 3.4.2 | Consistent formatting, auto-fix on save |
| **Git Hooks** | Lefthook | 1.10.3 | Fast git hooks, replaces Husky, YAML config |
| **Commit Convention** | Commitizen | 4.3.1 | Conventional Commits, generates changelog |
| **Type Checking** | TypeScript Compiler | 5.6.3 | Strict mode, no implicit any, catch errors early |
| **Component Dev** | Storybook | 8.4.7 | Component documentation, visual testing, design system |

### Deployment & Infrastructure

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Hosting** | Vercel | N/A (Platform) | Optimal Next.js deployment, edge functions, zero-config |
| **CI/CD** | GitHub Actions | N/A | Native GitHub integration, free for private repos |
| **Database** | Supabase PostgreSQL | N/A (Platform) | Managed PostgreSQL, RLS, Realtime, Storage, Edge Functions |
| **CDN (Optional)** | CloudFront | N/A (AWS) | Optional CDN for Supabase Storage assets, global distribution |
| **Feature Flags** | PostHog (built-in) | 4.2.1 | Built into analytics, staged rollouts, kill switches |
| **Secrets Management** | Vercel Env Variables | N/A | Encrypted, per-environment, team access control |

### Internationalization

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **i18n Framework** | next-intl | 3.27.3 | Next.js App Router support, type-safe, excellent DX |
| **Translation Management** | Crowdin | N/A (SaaS) | Collaborative translation, developer-friendly, Git integration |

### Total Dependencies

- **Production Dependencies:** ~45 packages
- **Development Dependencies:** ~35 packages
- **Bundle Size Target:** <300KB gzipped (JavaScript)
- **Audit Strategy:** Monthly `npm audit` + Dependabot for automated updates

---

## Supabase Integration Architecture

### Why Supabase Over Neon

**Key Advantages:**
1. **Built-in Realtime** - WebSocket-based live updates for loan status, payments, and timeline syncs
2. **Native Row-Level Security (RLS)** - PostgreSQL RLS for multi-tenant org-level data isolation
3. **Integrated Storage** - S3-compatible file storage with image transformations and RLS protection
4. **Edge Functions** - Deno-based serverless functions for scheduled or secure server tasks
5. **Comprehensive Logs** - Built-in logging for PostgreSQL, API, and Auth events
6. **Auth Integration** - Can optionally replace Clerk for simpler auth stack (though we'll keep Clerk for RBAC)

### Supabase + Drizzle ORM Strategy

**Hybrid Approach:**

```typescript
// Option 2: Supabase client for direct access (admin contexts, realtime)
import { createClient } from '@supabase/supabase-js';
// Option 1: Drizzle ORM for typed SQL (preferred for API routes)
import { db } from '@/libs/DB';

import { loans } from '@/models/Schema';

const activeLoans = await db.select().from(loans).where(eq(loans.status, 'Active'));

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const { data } = await supabase
  .from('loans')
  .select('*')
  .eq('status', 'Active')
  .subscribe(); // Realtime updates
```

**When to Use Each:**
- **Drizzle:** API routes, complex joins, type safety, migrations
- **Supabase Client:** Realtime subscriptions, admin operations, RLS-protected queries

### Supabase Realtime for Live Updates

**Use Cases:**
1. **Loan Status Changes** - Live updates when loan moves through state machine (Application → Approved → Funded)
2. **Payment Processing** - Real-time payment status updates for lenders and borrowers
3. **Deal Journal Timeline** - Live activity feed as events occur
4. **Dashboard Metrics** - Real-time portfolio totals, delinquency rates
5. **Collaborative Editing** - Multiple users viewing/editing loan simultaneously

**Implementation Pattern:**
```typescript
// Subscribe to loan status changes
const channel = supabase
  .channel('loan-updates')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'loans' }, (payload) => {
    // Invalidate React Query cache
    queryClient.invalidateQueries(['loans', payload.new.id]);
  })
  .subscribe();
```

### Supabase Storage for Documents

**File Organization:**
```
supabase-storage/
├── borrower-documents/     # Application docs, financials, ID verification
│   └── {borrowerId}/
├── loan-documents/         # Loan agreements, appraisals, title docs
│   └── {loanId}/
├── draw-photos/            # Construction progress photos
│   └── {drawId}/
├── statements/             # Generated PDFs (lender statements, borrower statements)
│   └── {year}/{month}/
└── receipts/               # Payment receipts, invoices
    └── {paymentId}/
```

**RLS Policies:**
- Borrowers can only access their own documents
- Lenders can access documents for loans they participate in
- Admins have full access
- Public access denied by default

**Image Transformation:**
```typescript
// Automatic thumbnail generation for draw photos
const thumbnailUrl = supabase.storage
  .from('draw-photos')
  .getPublicUrl('photo.jpg', {
    transform: {
      width: 200,
      height: 200,
      resize: 'cover'
    }
  });
```

### Supabase Functions vs Inngest

**Use Both in Hybrid Pattern:**

**Supabase Functions:** For database-triggered operations
- Database triggers → Supabase Function → External webhook
- Row-level operations requiring RLS context
- Quick PostgreSQL-adjacent computations

**Inngest:** For scheduled jobs and complex workflows
- Daily interest accrual (6am cron)
- Monthly statement generation
- Payment retry logic (3 attempts over 7 days)
- Late fee calculation
- Multi-step workflows with retries

**Example Integration:**
```typescript
// Supabase Function: Trigger on loan approval
create function notify_on_loan_approval()
returns trigger as $$
begin
  perform http_post(
    'https://inngest.com/webhook',
    json_build_object('event', 'loan.approved', 'loanId', NEW.id)
  );
  return NEW;
end;
$$ language plpgsql;

// Inngest: Handle multi-step approval workflow
export const loanApprovalFlow = inngest.createFunction(
  { id: 'loan-approval-flow' },
  { event: 'loan.approved' },
  async ({ event, step }) => {
    await step.run('send-approval-email', () => sendEmail(...))
    await step.run('generate-documents', () => generateDocs(...))
    await step.run('notify-lenders', () => notifyLenders(...))
  }
)
```

### Row-Level Security (RLS) Policy Examples

**Loans Table:**
```sql
-- Borrowers can only see their own loans
create policy "Borrowers see own loans"
  on loans for select
  using (auth.uid() = borrower_id);

-- Lenders can see loans they participate in
create policy "Lenders see participated loans"
  on loans for select
  using (
    exists (
      select 1 from lender_participations
      where loan_id = loans.id
      and lender_id = auth.uid()
    )
  );

-- Admins see all loans
create policy "Admins see all loans"
  on loans for all
  using (auth.jwt() ->> 'role' = 'admin');
```

**Multi-Tenant Org Isolation:**
```sql
-- All users see only their org's data
create policy "Org isolation"
  on loans for all
  using (org_id = auth.jwt() ->> 'org_id');
```

### Performance Considerations

**Connection Pooling:**
- Use Supabase's built-in connection pooler (PgBouncer)
- Configure via `?pgbouncer=true` in connection string
- Essential for serverless environments (Vercel Edge Functions)

**Query Optimization:**
- Still use Drizzle migrations for schema changes
- Add indexes for RLS-filtered queries
- Use Supabase query analyzer for slow query detection

**Caching Strategy:**
- Supabase has built-in caching for GET requests
- Layer Redis (Upstash) for computed aggregates
- React Query for client-side caching with Supabase realtime invalidation

### Migration from Neon (If Applicable)

**If existing Neon database:**
1. Export Neon database: `pg_dump`
2. Import to Supabase: `psql -h db.xxx.supabase.co`
3. Update connection string in `.env`
4. Enable RLS policies incrementally
5. Test realtime subscriptions
6. Enable Storage buckets
7. Migrate files from S3 → Supabase Storage (optional)

**No Neon Database:** Start fresh with Supabase from Day 1

---

## Proposed Source Tree

### Complete Directory Structure

```
everyday-lending/
├── .cursor/                          # Cursor IDE configurations and agent notes
│   ├── notes/
│   │   ├── agentnotes.md            # Critical project information
│   │   ├── project_checklist.md     # Task tracking
│   │   ├── notebook.md              # Discoveries and learnings
│   │   ├── bmad-workflow.md         # BMAD usage guide
│   │   └── bmad-integration-summary.md
│   ├── rules/                       # Custom agent rules
│   └── tools/                       # Development tools
│
├── .github/
│   └── workflows/
│       ├── ci.yml                   # Lint, type-check, test on PR
│       ├── deploy-preview.yml       # Vercel preview deployments
│       └── deploy-production.yml    # Production deployment
│
├── bmad/                            # BMAD v6 multi-agent system
│   ├── _cfg/                        # Agent configurations
│   ├── core/                        # Core orchestration agents
│   ├── bmm/                         # BMad Method workflows
│   └── cis/                         # Creative Intelligence Suite
│
├── docs/                            # Project documentation
│   ├── PRD.md                       # Product Requirements Document
│   ├── epics.md                     # Epic breakdown with 74 stories
│   ├── ux-specification-2025-10-11.md  # UX design specification
│   ├── solution-architecture.md     # This document
│   ├── project-workflow-analysis.md # Project analysis
│   ├── api/
│   │   └── openapi.yaml            # OpenAPI 3.0 specification
│   └── operations/
│       ├── runbook.md              # Operational procedures
│       └── deployment-guide.md      # Deployment instructions
│
├── migrations/                      # Drizzle database migrations
│   ├── 0000_init-db.sql
│   ├── 0001_add-draw-workflow.sql
│   ├── meta/
│   │   ├── _journal.json
│   │   └── *.snapshot.json
│   └── seed.ts                      # Database seeding script
│
├── public/                          # Static assets
│   ├── assets/
│   │   └── images/
│   ├── favicon.ico
│   └── robots.txt
│
├── reports/                         # BMAD analysis reports
│   └── deep-dive-analysis.md
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── [locale]/                # Internationalized routes
│   │   │   ├── (auth)/              # Auth pages
│   │   │   │   ├── sign-in/
│   │   │   │   ├── sign-up/
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/         # Main app (protected)
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── page.tsx     # Portfolio dashboard
│   │   │   │   │   └── loading.tsx
│   │   │   │   ├── loans/
│   │   │   │   │   ├── page.tsx     # Loans list
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   ├── page.tsx # Loan detail
│   │   │   │   │   │   └── loading.tsx
│   │   │   │   │   └── new/
│   │   │   │   │       └── page.tsx # Create loan
│   │   │   │   ├── borrowers/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── lenders/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── properties/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── payments/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── draws/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx       # Dashboard layout with sidebar
│   │   │   ├── (marketing)/         # Public pages
│   │   │   │   ├── page.tsx         # Landing page
│   │   │   │   ├── about/
│   │   │   │   ├── pricing/
│   │   │   │   └── layout.tsx
│   │   │   └── layout.tsx           # Root locale layout
│   │   ├── api/                     # API Routes
│   │   │   ├── auth/                # Auth-related endpoints
│   │   │   │   └── webhooks/
│   │   │   │       └── clerk/route.ts
│   │   │   ├── borrowers/
│   │   │   │   ├── route.ts         # GET, POST
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts     # GET, PATCH, DELETE
│   │   │   ├── lenders/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── properties/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── loans/
│   │   │   │   ├── route.ts         # GET, POST (CRUD)
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts     # GET, PATCH, DELETE (CRUD)
│   │   │   │       ├── approve/
│   │   │   │       │   └── route.ts # POST (RPC)
│   │   │   │       ├── disburse/
│   │   │   │       │   └── route.ts # POST (RPC)
│   │   │   │       ├── generate-payoff/
│   │   │   │       │   └── route.ts # POST (RPC)
│   │   │   │       └── amortization/
│   │   │   │           └── route.ts # GET
│   │   │   ├── payments/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── process/
│   │   │   │           └── route.ts # POST (RPC)
│   │   │   ├── draws/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       ├── approve/
│   │   │   │       │   └── route.ts # POST (RPC)
│   │   │   │       └── disburse/
│   │   │   │           └── route.ts # POST (RPC)
│   │   │   ├── analytics/
│   │   │   │   ├── portfolio/route.ts
│   │   │   │   ├── performance/route.ts
│   │   │   │   └── risk/route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/
│   │   │   │   │   └── route.ts     # Stripe webhook handler
│   │   │   │   ├── plaid/
│   │   │   │   │   └── route.ts     # Plaid webhook handler
│   │   │   │   └── inngest/
│   │   │   │       └── route.ts     # Inngest webhook handler
│   │   │   ├── health/
│   │   │   │   └── route.ts         # Health check endpoint
│   │   │   └── search/
│   │   │       └── route.ts         # Global search
│   │   ├── global-error.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/                  # React components
│   │   ├── analytics/
│   │   │   ├── portfolio-dashboard.tsx
│   │   │   ├── performance-chart.tsx
│   │   │   ├── risk-heat-map.tsx
│   │   │   └── delinquency-monitor.tsx
│   │   ├── borrowers/
│   │   │   ├── borrowers-table.tsx
│   │   │   ├── create-borrower-dialog.tsx
│   │   │   ├── edit-borrower-form.tsx
│   │   │   └── borrower-drawer.tsx
│   │   ├── draws/
│   │   │   ├── draw-request-form.tsx
│   │   │   ├── draw-approval-workflow.tsx
│   │   │   ├── inspector-assignment.tsx
│   │   │   ├── mobile-inspector-app.tsx
│   │   │   └── budget-tracker.tsx
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── command-palette.tsx  # Cmd+K global palette
│   │   ├── lenders/
│   │   │   ├── lenders-table.tsx
│   │   │   ├── create-lender-dialog.tsx
│   │   │   └── lender-performance.tsx
│   │   ├── loans/
│   │   │   ├── loans-table.tsx
│   │   │   ├── create-loan-dialog.tsx
│   │   │   ├── edit-loan-form.tsx
│   │   │   ├── loan-drawer.tsx
│   │   │   ├── loan-state-machine-ui.tsx
│   │   │   ├── amortization-schedule.tsx
│   │   │   ├── payoff-calculator.tsx
│   │   │   └── deal-journal-timeline.tsx  # Human-readable timeline
│   │   ├── payments/
│   │   │   ├── payment-form.tsx
│   │   │   ├── payment-history.tsx
│   │   │   ├── payment-waterfall-viz.tsx
│   │   │   ├── stripe-connect-onboarding.tsx
│   │   │   └── plaid-link-button.tsx
│   │   ├── properties/
│   │   │   ├── properties-table.tsx
│   │   │   ├── create-property-dialog.tsx
│   │   │   ├── edit-property-form.tsx
│   │   │   └── property-drawer.tsx
│   │   ├── providers/
│   │   │   ├── Providers.tsx        # Root providers wrapper
│   │   │   ├── query-provider.tsx   # TanStack Query
│   │   │   ├── supabase-provider.tsx
│   │   │   └── keyboard-shortcuts-provider.tsx
│   │   ├── shared/
│   │   │   ├── inline-edit.tsx      # Editable field wrapper
│   │   │   ├── relationship-panel.tsx  # Sidepanel for entity relationships
│   │   │   ├── smart-table.tsx      # Table with J/K navigation
│   │   │   ├── loading-skeleton.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   ├── empty-state.tsx
│   │   │   └── currency-input.tsx
│   │   └── ui/                      # Shadcn UI primitives
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── table.tsx
│   │       ├── toast.tsx
│   │       ├── sheet.tsx
│   │       └── [15 more Shadcn components]
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-borrowers-client.ts
│   │   ├── use-lenders-client.ts
│   │   ├── use-loans-client.ts
│   │   ├── use-properties-client.ts
│   │   ├── use-payments-client.ts
│   │   ├── use-draws-client.ts
│   │   ├── use-dashboard-stats.ts
│   │   ├── use-command-palette.ts   # Command palette hook
│   │   ├── use-keyboard-shortcuts.ts
│   │   ├── use-inline-edit.ts
│   │   ├── use-realtime-subscription.ts  # Supabase realtime
│   │   └── use-toast.ts
│   │
│   ├── jobs/                        # Inngest background jobs (NEW)
│   │   ├── payment-collection.ts    # Daily 6am payment collection
│   │   ├── payment-retry.ts         # Retry failed payments
│   │   ├── late-fee-calculation.ts  # Calculate and assess late fees
│   │   ├── interest-accrual.ts      # Daily interest accrual
│   │   ├── statement-generation.ts  # Monthly statement generation
│   │   └── participation-distribution.ts  # End-of-month lender distributions
│   │
│   ├── lib/                         # Utility libraries
│   │   ├── cache/                   # Caching utilities (NEW)
│   │   │   ├── redis.ts             # Upstash Redis client
│   │   │   └── cache-keys.ts        # Cache key constants
│   │   ├── email/                   # Email utilities (NEW)
│   │   │   ├── resend-client.ts     # Resend SDK wrapper
│   │   │   ├── sendgrid-client.ts   # SendGrid SDK wrapper
│   │   │   └── templates/           # Email templates
│   │   │       ├── loan-approval.tsx
│   │   │       ├── payment-receipt.tsx
│   │   │       └── statement.tsx
│   │   ├── storage/                 # File storage utilities (NEW)
│   │   │   ├── supabase-storage.ts  # Supabase Storage wrapper
│   │   │   └── presigned-urls.ts    # Presigned URL generation
│   │   ├── formatters.ts            # Currency, date formatting
│   │   ├── loan-calculator.ts       # Loan calculations
│   │   └── utils.ts                 # General utilities
│   │
│   ├── libs/                        # Library configurations
│   │   ├── Arcjet.ts
│   │   ├── DB.ts                    # Drizzle + Supabase connection
│   │   ├── Env.ts                   # Environment variables
│   │   ├── I18n.ts                  # i18n configuration
│   │   ├── I18nNavigation.ts
│   │   ├── I18nRouting.ts
│   │   └── Logger.ts                # Structured logging
│   │
│   ├── locales/                     # Translation files
│   │   ├── en.json
│   │   └── fr.json
│   │
│   ├── middleware.ts                # Next.js middleware (auth, RBAC, rate limiting)
│   │
│   ├── models/
│   │   └── Schema.ts                # Drizzle ORM schema (9 tables)
│   │
│   ├── services/                    # Business logic service layer (NEW)
│   │   ├── LoanService.ts           # Loan operations & workflow orchestration
│   │   ├── UnderwritingService.ts   # LTV, DSCR, DTI calculations, risk scoring
│   │   ├── AmortizationService.ts   # Payment schedule generation, payoff quotes
│   │   ├── PaymentService.ts        # Payment allocation, waterfall, reconciliation
│   │   ├── StripeService.ts         # Stripe Connect wrapper
│   │   ├── PlaidService.ts          # Plaid integration wrapper
│   │   ├── DrawService.ts           # Draw workflow orchestration
│   │   ├── InspectionService.ts     # Inspector assignment, scheduling
│   │   ├── AnalyticsService.ts      # Portfolio metrics, aggregations
│   │   ├── ReportingService.ts      # Report generation (PDF, CSV, Excel)
│   │   ├── RiskService.ts           # Risk scoring, concentration analysis
│   │   ├── SearchService.ts         # Fuzzy search across entities
│   │   ├── NotificationService.ts   # Email, SMS notifications
│   │   ├── DocumentService.ts       # Document management (Supabase Storage)
│   │   └── ReconciliationService.ts # Payment reconciliation & GL integration
│   │
│   ├── state-machines/              # XState workflow definitions (NEW)
│   │   ├── loan-lifecycle.machine.ts
│   │   ├── payment.machine.ts
│   │   └── draw.machine.ts
│   │
│   ├── styles/
│   │   └── global.css               # Global styles + Tailwind imports
│   │
│   ├── types/                       # TypeScript types
│   │   ├── I18n.ts
│   │   ├── loan.ts
│   │   ├── payment.ts
│   │   └── supabase.ts              # Supabase-generated types
│   │
│   ├── utils/                       # Utility functions
│   │   ├── AppConfig.ts
│   │   ├── DBConnection.ts          # Database connection management
│   │   ├── DBMigration.ts           # Migration runner
│   │   ├── Helpers.ts
│   │   └── Helpers.test.ts
│   │
│   ├── validations/                 # Zod validation schemas
│   │   ├── BorrowerValidation.ts
│   │   ├── LenderValidation.ts
│   │   ├── PropertyValidation.ts
│   │   ├── LoanValidation.ts
│   │   ├── PaymentValidation.ts
│   │   └── DrawValidation.ts
│   │
│   ├── instrumentation-client.ts    # Client instrumentation
│   └── instrumentation.ts           # Server instrumentation
│
├── supabase/                        # Supabase configuration (NEW)
│   ├── functions/                   # Supabase Edge Functions (optional)
│   │   ├── loan-approval-trigger/
│   │   │   └── index.ts
│   │   └── payment-webhook/
│   │       └── index.ts
│   ├── migrations/                  # Supabase RLS policies & triggers
│   │   ├── 20250101_enable_rls.sql
│   │   └── 20250102_add_triggers.sql
│   └── config.toml                  # Supabase project configuration
│
├── tests/
│   ├── e2e/                         # Playwright E2E tests
│   │   ├── loan-lifecycle.e2e.ts
│   │   ├── payment-processing.e2e.ts
│   │   ├── draw-management.e2e.ts
│   │   ├── command-palette.e2e.ts
│   │   └── keyboard-shortcuts.e2e.ts
│   ├── integration/                 # API integration tests
│   │   ├── loans-api.spec.ts
│   │   ├── payments-api.spec.ts
│   │   └── draws-api.spec.ts
│   └── unit/                        # Unit tests
│       ├── services/
│       │   ├── LoanService.test.ts
│       │   ├── PaymentService.test.ts
│       │   └── UnderwritingService.test.ts
│       ├── lib/
│       │   └── loan-calculator.test.ts
│       └── state-machines/
│           ├── loan-lifecycle.test.ts
│           └── payment.test.ts
│
├── .env.local                       # Local environment variables
├── .env.example                     # Example environment variables
├── .eslintrc.json                   # ESLint configuration
├── .gitignore
├── .prettierrc                      # Prettier configuration
├── checkly.config.ts                # Checkly uptime monitoring
├── codecov.yml                      # Codecov configuration
├── commitlint.config.ts             # Commitlint configuration
├── components.json                  # Shadcn UI configuration
├── drizzle.config.ts                # Drizzle ORM configuration
├── knip.config.ts                   # Unused code detection
├── lefthook.yml                     # Git hooks configuration
├── next.config.ts                   # Next.js configuration
├── package.json
├── playwright.config.ts             # Playwright configuration
├── postcss.config.mjs               # PostCSS configuration
├── README.md
├── tsconfig.json                    # TypeScript configuration
└── vitest.config.mts                # Vitest configuration
```

### Key Directory Purposes

**New Directories (To Be Created):**
- `/src/services/` - Business logic service layer (15 services)
- `/src/state-machines/` - XState workflow definitions (3 machines)
- `/src/jobs/` - Inngest background jobs (6 jobs)
- `/src/lib/cache/` - Redis caching utilities
- `/src/lib/email/` - Email template and sending utilities
- `/src/lib/storage/` - Supabase Storage file upload/download utilities
- `/supabase/` - Supabase configuration, Edge Functions, RLS policies

**Existing Directories (Enhanced):**
- `/src/app/api/` - Enhanced with RPC endpoints for workflows
- `/src/components/` - Enhanced with Attio-style components (command palette, inline edit, etc.)
- `/src/hooks/` - Enhanced with realtime, command palette, keyboard shortcuts hooks
- `/docs/` - Comprehensive project documentation
- `/tests/` - 80%+ test coverage across unit, integration, E2E

### File Count Estimates

- **Total Files:** ~250-300 files
- **Source Files:** ~180 files
- **Test Files:** ~40 files
- **Configuration Files:** ~20 files
- **Documentation Files:** ~15 files
- **Migration Files:** ~10 files

---

## Prerequisites & Scale Assessment

### Prerequisites Validation

✅ **PRD Status:** Complete
- Location: `/docs/PRD.md` (1,345 lines)
- Functional Requirements: 30+ FRs across 7 domains
- Non-Functional Requirements: 12 comprehensive NFRs
- User Journeys: 5 detailed journeys
- UX Principles: 10 Attio-style principles
- Epics: 7 epics with 74 user stories
- Status: ✅ Ready for architecture phase

✅ **UX Specification Status:** Integrated into PRD
- Location: PRD contains comprehensive UX principles (Section: "UX Design Principles")
- 10 UX principles documented with implementation guidance
- Attio-style interaction patterns defined
- User journeys include UX wins and flow details
- Status: ✅ Sufficient for architecture (dedicated UX spec optional)

✅ **Epic Breakdown Status:** Complete
- Location: `/docs/epics.md` (740 lines)
- Story Count: 74 stories across 7 epics
- Story Points: 308 total points estimated
- Acceptance Criteria: Defined for all stories
- Status: ✅ Ready for technical specification

✅ **Deep Dive Analysis:** Complete
- Location: `/reports/deep-dive-analysis.md` (1,481 lines)
- Overall Health Score: 8.0/10
- Architecture Assessment: A- (8.5/10)
- Database Design: A (9.0/10)
- Existing Foundation: Excellent
- Status: ✅ Comprehensive analysis available

### Scale Assessment

**Project Classification:** Level 4 - Full Platform/Ecosystem

**Rationale:**
- Multiple interconnected systems (loan origination, servicing, payments, lender portal)
- Complex state-driven workflows (loan lifecycle, payment processing, collections)
- Multi-role platform (borrowers, lenders, loan officers, admins, inspectors)
- External integrations (Stripe Connect, Plaid, document storage, notifications)
- 74 user stories across 7 epics
- 3-4 month MVP timeline

**Project Characteristics:**
- **Project Type:** Web Application (Full-stack SaaS)
- **Field Type:** Brownfield (building on excellent foundation)
- **Has User Interface:** Yes
- **UI Complexity:** Complex (Attio-style with keyboard shortcuts, inline editing, command palette, real-time updates)
- **Architecture Style:** Modular Monolith (current) → Service-Oriented (future)
- **Repository Strategy:** Monorepo (recommended for current scale)

**Workflow Path:** Proceeding with full solution architecture workflow for Level 4 platform

---

---

## Architecture Decision Records (ADRs)

> Status legend: ✅ Accepted · 🟡 Proposed · 🔁 Superseded

### ADR-0001 — Database Platform: **Supabase** over Neon
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** We evaluated Neon vs Supabase for managed Postgres.
**Decision:** Choose **Supabase** for integrated Postgres + Realtime + Storage + RLS + Functions.
**Alternatives Considered:**
- **Neon:** Excellent branching, auto-scaling; lacks realtime/storage/RLS built-in.
- **AWS RDS + ElastiCache + S3:** Full control; more operational overhead.
- **PlanetScale:** Great for scale; no Postgres (MySQL), no realtime, higher cost.
**Consequences:**
- ✅ Simplifies realtime features and document storage.
- ✅ Enables RLS-backed multi-tenancy with less custom SQL.
- ⚠️ Slight vendor coupling; mitigate with Drizzle ORM and portable SQL migrations.
- ⚠️ Must keep Supabase Auth disabled to avoid conflicts with Clerk (see ADR-0007).
**References:** PRD § Security Requirements, UX Spec § Real-time Updates

### ADR-0002 — Architecture Style: **Enhanced Modular Monolith** with Service Layer
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Team size (1-2 developers + AI), Vercel hosting, 12–16 week MVP target, need for clear domain boundaries.
**Decision:** Single Next.js app + explicit `/src/services` domain layer (15 services).
**Alternatives Considered:**
- **Microservices:** Premature for MVP; too much operational overhead.
- **Simple Monolith (no service layer):** Would mix business logic with API routes; harder to test and refactor.
- **Nx Monorepo with packages:** Overkill for current scale; adds complexity.
**Consequences:**
- ✅ Clear boundaries via service layer; simple deploys; easier refactors.
- ✅ Paves path to future microservices by extracting services if needed.
- ✅ Testable business logic isolated from framework.
- ⚠️ Must enforce discipline to keep logic in services, not API routes.
**References:** Epic 1-7 (all require service orchestration), PRD § System Architecture

### ADR-0003 — API Pattern: **REST for CRUD** + **RPC for Workflows**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Need CRUD for resources (borrowers, lenders, properties, loans) + domain actions (approve loan, disburse draw, generate payoff).
**Decision:** REST for resources (`/api/loans`); RPC for workflows (`/api/loans/[id]/approve`).
**Alternatives Considered:**
- **Pure REST:** Would require awkward PATCH semantics for state transitions.
- **GraphQL:** Overkill for MVP; added complexity, tooling overhead.
- **tRPC:** Strong TypeScript benefits; but requires Next.js API routes restructure and client changes.
**Consequences:**
- ✅ Minimal overhead, high clarity, easy debugging.
- ✅ Avoids GraphQL complexity for MVP; TypeScript types via Zod still enforced.
- ⚠️ Must document RPC endpoints separately (OpenAPI extensions for workflows).
**References:** PRD § API Requirements, ADR-0002 (Service Layer handles workflow logic)

### ADR-0004 — Workflow Orchestration: **XState**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Loan lifecycle (8 states), payment processing (5 states), draw workflow (6 states) require explicit state machines with guards, actions, and audit trails.
**Decision:** Use **XState v5** for declarative statecharts with TypeScript, visual tooling, and testability.
**Alternatives Considered:**
- **Simple state enums + switch:** Error-prone; no visual tooling; hard to audit transitions.
- **Robot:** Lightweight; lacks ecosystem, TypeScript support, visual inspector.
- **Custom FSM:** Reinventing the wheel; no community patterns or debugging tools.
**Consequences:**
- ✅ Better auditability (visual statechart matches code); easier to enforce allowed transitions.
- ✅ Testable state logic independent of DB/API; can snapshot states for compliance.
- ⚠️ Learning curve for team; mitigate with examples, tests, and XState Inspector integration.
**References:** Epic 2 (Loan Lifecycle), Epic 3 (Payment Processing), Epic 4 (Draw Management)

### ADR-0005 — Background Jobs: **Inngest** (+ Supabase Functions for DB-adjacent triggers)
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Need scheduled jobs (daily accrual at 6am), event-driven workflows (payment retry after 3 days), and reliable execution with retries/idempotency.
**Decision:** **Inngest** for scheduled/long-running workflows; **Supabase Functions** for DB triggers (e.g., loan approval → webhook).
**Alternatives Considered:**
- **Vercel Cron:** Limited to simple schedules; no retries, no step functions, no visual debugger.
- **BullMQ + Redis:** More control; requires long-running process, not serverless-native.
- **Temporal:** Enterprise-grade; overkill for MVP scale; complex setup.
**Consequences:**
- ✅ Reliable serverless orchestration on Vercel; visual workflow inspector for debugging.
- ✅ Clear split: DB-adjacent logic (Supabase Functions), multi-step workflows (Inngest).
- ⚠️ Two systems to manage; document when to use each (Supabase: <1s latency, Inngest: >1s + retries).
**References:** Epic 3 (Daily Payment Collection), Epic 5 (Portfolio Analytics - scheduled aggregations)

### ADR-0006 — Caching: **Redis (Upstash)** + **TanStack Query**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** <500ms interaction target (PRD NFR-1), dashboard aggregates (portfolio totals), realtime invalidation on state changes.
**Decision:** Server cache with **Upstash Redis** for computed aggregates; client cache with **TanStack Query** for API responses; optional ISR for read-heavy dashboards.
**Alternatives Considered:**
- **No server cache:** Would hit DB for every aggregate query; unacceptable for dashboards.
- **Next.js unstable_cache only:** Less flexible; harder to invalidate programmatically.
- **Memcached:** No persistence; Redis offers pub/sub for realtime invalidation.
**Consequences:**
- ✅ Predictable performance and UX responsiveness; <500ms target achievable.
- ✅ Supabase Realtime can trigger Redis invalidation → React Query refetch.
- ⚠️ Need cache key discipline (standardized keys in `cache-keys.ts`) and invalidation rules (documented per service).
**References:** PRD NFR-1 (Performance), UX Spec § Speed is a Feature, ADR-0001 (Supabase Realtime integration)

### ADR-0007 — Authentication: **Clerk** (keep Supabase Auth disabled)
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Need RBAC (5 roles: Admin, Loan Officer, Lender, Borrower, Inspector), org-based multi-tenancy, MFA, social login with minimal custom code.
**Decision:** Use **Clerk** for auth; integrate Clerk `userId` and `orgId` with Supabase RLS policies.
**Alternatives Considered:**
- **Supabase Auth:** Built-in; but lacks org-based multi-tenancy, weaker RBAC, less polished UX.
- **NextAuth.js:** Open-source; requires more custom code for RBAC/orgs, less polished UI.
- **Auth0:** Enterprise-grade; higher cost, more complex for MVP needs.
**Consequences:**
- ✅ Best-in-class auth UX (social, magic link, MFA out-of-box); minimal custom code.
- ✅ Clerk org/roles integrate cleanly with RLS via JWT claims (`auth.jwt() ->> 'org_id'`).
- ⚠️ Supabase Auth must stay disabled to avoid conflicts; document this in setup.
- ⚠️ Cost scales with MAU (~$25/mo per 1K users after free tier).
**References:** PRD FR-1.1 (User Management), ADR-0001 (Supabase RLS integration)

### ADR-0008 — File Storage: **Supabase Storage** (+ optional CloudFront)
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Store borrower documents (PDFs, images), draw photos (JPEG), generated statements (PDFs); need presigned URLs, RLS-protected access, image transformations (thumbnails).
**Decision:** Use **Supabase Storage** as primary; add **CloudFront CDN** only if global latency exceeds 200ms.
**Alternatives Considered:**
- **AWS S3 + CloudFront:** Full control; requires IAM, presigned URL logic, no native RLS.
- **Vercel Blob:** Simpler API; lacks image transformations, RLS, higher cost at scale.
- **Cloudflare R2:** S3-compatible, cheaper egress; no RLS, requires separate presigned URL logic.
**Consequences:**
- ✅ Simpler integration (single platform with DB); unified security model (RLS for files + rows).
- ✅ Built-in image transformations (thumbnails for draw photos); automatic presigned URLs.
- ⚠️ CDN optionality preserved; add CloudFront if needed (Week 12 performance pass).
**References:** Epic 1 (Entity Management - document uploads), Epic 4 (Draw Management - photo uploads)

### ADR-0009 — Payments: **Stripe Connect** + **Plaid**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Marketplace model (platform facilitates borrower → lender payments); need ACH, bank verification, payout tracking, ledger-quality audit trails.
**Decision:** **Stripe Connect** (Standard accounts) for ledgering/payouts; **Plaid** for bank linking/verification.
**Alternatives Considered:**
- **Stripe only (no Plaid):** Manual bank verification; worse UX for ACH setup.
- **Dwolla:** ACH-native; lacks Stripe's ecosystem, no credit card fallback.
- **Finix:** Developer-friendly; smaller ecosystem, less mature tooling.
**Consequences:**
- ✅ Industry-standard combo; excellent docs, mature SDKs, high reliability.
- ✅ Stripe Connect handles marketplace complexity (split payments, fee collection, 1099-K reporting).
- ⚠️ Webhook rigor required: idempotency keys, signature verification, dead-letter queue for failures.
- ⚠️ Cost: Stripe 0.5% + $0.25/payout; Plaid ~$0.30/verification.
**References:** Epic 3 (Payment Processing), PRD FR-3.1 (Automated Payment Collection)

### ADR-0010 — Search: **Meilisearch** (preferred) with **Postgres FTS** fallback
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Cmd+K command palette requires fuzzy search across loans, borrowers, lenders, properties with <100ms responses; typo-tolerance essential for UX.
**Decision:** Use **Meilisearch** for production; **Postgres FTS** for local dev and <10K entities.
**Alternatives Considered:**
- **Algolia:** Best-in-class; higher cost ($1/1K searches after free tier), vendor lock-in.
- **Typesense:** Open-source like Meilisearch; smaller community, fewer managed options.
- **Postgres FTS only:** Works at small scale; no typo-tolerance, slower on large datasets.
**Consequences:**
- ✅ UX excellence: typo-tolerance, faceted search, <100ms responses, relevant ranking.
- ✅ Self-hostable or managed (Meilisearch Cloud ~$30/mo); adapters abstracted in `SearchService`.
- ⚠️ Extra infra to manage; keep Postgres FTS fallback for simplicity if dataset stays small.
- ⚠️ Must sync search index on data changes (via Inngest job or Supabase webhook).
**References:** UX Spec § Command Palette (Cmd+K), PRD FR-6.1 (Global Search)

### ADR-0011 — UI Component Library: **Shadcn UI** + **Radix Primitives**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Need accessible, customizable UI components for Attio-style UX; avoid bloated component libraries; maintain full control over styling and behavior.
**Decision:** Use **Shadcn UI** (copy-paste components) built on **Radix UI** primitives + **Tailwind CSS 4**.
**Alternatives Considered:**
- **Material-UI (MUI):** Heavy bundle (~300KB); opinionated design; hard to customize for Attio-style.
- **Chakra UI:** Good DX; 100KB+ bundle; CSS-in-JS overhead.
- **Headless UI:** Minimal; lacks form components, date pickers, complex tables.
**Consequences:**
- ✅ Full ownership of components (copy-paste into codebase); no version lock-in.
- ✅ Accessible by default (Radix ARIA compliance); easy Tailwind customization.
- ✅ Small bundle size (~50KB for used components); tree-shakeable.
- ⚠️ Must manually update components (copy new versions from Shadcn); worth it for control.
**References:** UX Spec § Attio-style Design, PRD NFR-6 (Usability - WCAG AA compliance)

### ADR-0012 — Form Handling: **React Hook Form** + **Zod**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Complex forms (loan application: 15+ fields; draw request: 10+ fields + photos); need validation, error handling, optimistic updates, TypeScript safety.
**Decision:** **React Hook Form** for performance (uncontrolled inputs) + **Zod** for validation schemas (shared client/server).
**Alternatives Considered:**
- **Formik:** Popular; slower (controlled inputs), larger bundle, less active maintenance.
- **TanStack Form:** New; less mature ecosystem, fewer integrations.
- **Native HTML5 validation:** Insufficient for complex business rules; poor UX customization.
**Consequences:**
- ✅ Best performance (minimal re-renders); excellent TypeScript inference via `zodResolver`.
- ✅ Zod schemas reused in API routes for server-side validation (single source of truth).
- ✅ Built-in field arrays, conditional fields, async validation for complex forms.
- ⚠️ Zod error messages require custom formatting for user-friendly display.
**References:** Epic 1 (Entity Management - CRUD forms), Epic 2 (Loan Application workflow)

### ADR-0013 — Internationalization: **next-intl**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** MVP supports English + French (PRD requirement); need type-safe i18n, Next.js App Router support, plural/date/currency formatting.
**Decision:** **next-intl v3** with App Router integration, Crowdin for translation management.
**Alternatives Considered:**
- **next-i18next:** Popular; Pages Router only, not compatible with App Router.
- **react-intl (Format.JS):** Industry standard; heavier bundle, less Next.js-specific optimization.
- **Paraglide (inlang):** Lightweight; smaller ecosystem, less mature tooling.
**Consequences:**
- ✅ Type-safe translations (TypeScript autocomplete for keys); excellent Next.js App Router support.
- ✅ Automatic locale routing (`/en/dashboard`, `/fr/dashboard`); static generation per locale.
- ✅ ICU message format for plurals, dates, currency (e.g., `{count, plural, one {# loan} other {# loans}}`).
- ⚠️ Crowdin integration requires CI/CD setup for auto-sync (GitHub Actions workflow).
**References:** PRD § Localization Requirements, existing `/src/locales/` structure

### ADR-0014 — Monitoring & Observability: **Sentry** + **PostHog** + **Better Stack**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Need error tracking, performance monitoring, user analytics, structured logging, uptime monitoring for production readiness.
**Decision:** **Sentry** (errors + APM), **PostHog** (analytics + session replay), **Better Stack** (logs), **Checkly** (uptime).
**Alternatives Considered:**
- **DataDog:** All-in-one; expensive ($30+/host/mo), overkill for MVP.
- **LogRocket:** Session replay + errors; higher cost, less flexibility than PostHog.
- **Self-hosted ELK Stack:** Full control; massive operational overhead, not worth it.
**Consequences:**
- ✅ Best-in-class tools for each domain; generous free tiers (Sentry 5K errors/mo, PostHog 1M events/mo).
- ✅ Sentry Performance traces slow API calls; PostHog session replay helps debug UX issues.
- ✅ Better Stack SQL queries on logs (e.g., "show all payment failures last 7 days").
- ⚠️ Four separate platforms; document correlation (use `requestId` across all for tracing).
**References:** PRD NFR-2 (Reliability - 99.9% uptime), NFR-12 (Operational Excellence)

### ADR-0015 — Deployment Strategy: **Vercel** + **Preview Environments**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Next.js app requires edge optimization, preview deploys per PR, zero-config CI/CD, integration with Supabase/Inngest.
**Decision:** **Vercel** for production + staging + PR previews; **GitHub Actions** for tests/linting before deploy.
**Alternatives Considered:**
- **AWS Amplify:** Next.js support; slower builds, less optimized for App Router.
- **Netlify:** Good for static sites; Edge Functions less mature than Vercel for Next.js.
- **Self-hosted on Railway/Fly.io:** More control; requires manual setup, no preview environments out-of-box.
**Consequences:**
- ✅ Zero-config deploys; automatic preview URLs per PR for testing.
- ✅ Edge caching, image optimization, ISR out-of-box; integrates with Supabase, Inngest, Upstash.
- ✅ Vercel CLI for local testing with production parity (`vercel dev`).
- ⚠️ Cost scales with usage (~$20/seat/mo Pro tier); free tier sufficient for MVP (<100GB bandwidth/mo).
**References:** PRD § Deployment Requirements, existing `next.config.ts` Vercel optimizations

### ADR-0016 — Testing Strategy: **Vitest** + **Playwright** + **Integration Tests**
**Date:** 2025-10-11
**Status:** ✅ Accepted
**Context:** Need 70-80% test coverage (PRD NFR-7); unit tests for services/utils, integration tests for API routes, E2E for critical user journeys.
**Decision:** **Vitest** (unit), **Playwright** (E2E), custom API integration tests with test DB.
**Alternatives Considered:**
- **Jest:** Industry standard; slower than Vitest, requires more config for ESM/TypeScript.
- **Cypress:** Popular E2E; heavier, slower, less Node.js API testing support than Playwright.
- **Testing Library only (no E2E):** Insufficient for complex flows like "loan application → approval → disbursement."
**Consequences:**
- ✅ Vitest fast (Vite-powered), ESM-native, TypeScript out-of-box; Playwright cross-browser E2E.
- ✅ Integration tests hit real API routes with test DB (Supabase branch or Docker Postgres).
- ✅ Playwright codegen for E2E tests; visual regression testing with screenshots.
- ⚠️ Must maintain test DB seed data; document test data strategy (factories, fixtures).
**References:** PRD NFR-7 (Maintainability - 70%+ coverage), existing `vitest.config.mts`, `playwright.config.ts`

---

## Implementation Roadmap (Weeks 1–14)

> **Cadence:** 2-week sprints; weekly increments for Cursor Plan Mode.
> **Success Metric:** Ship working features every week; maintain green tests + deploy previews.
> **Epic Mapping:** 74 stories across 7 epics (see `/docs/epics.md` for full breakdown).

### Epic-to-Week Overview

| Week | Epic Focus | Stories | Key Deliverables |
|------|------------|---------|------------------|
| 1 | Infrastructure | Foundation | Supabase, Redis, CI/CD, monitoring |
| 2 | Epic 6 (UX) | US-6.1, 6.2, 6.3 | Command Palette, Keyboard Shortcuts, Inline Edit |
| 3 | Epic 2 (Loan Lifecycle) | US-2.1, 2.2, 2.3 | Loan state machine, LoanService, RPC endpoints |
| 4 | Epic 2 (Loan Lifecycle) | US-2.4, 2.5, 2.8 | Loan UI, Deal Journal, Realtime updates |
| 5 | Epic 3 (Payments) | US-3.1, 3.2, 3.3 | Payment engine, Stripe/Plaid integration |
| 6 | Epic 3 (Payments) | US-3.4, 3.5, 3.6 | Payment UI, scheduling, background jobs |
| 7 | Epic 4 (Draws) | US-4.1, 4.2, 4.3 | Draw workflow, inspector assignment |
| 8 | Epic 4 (Draws) | US-4.4, 4.5, 4.6 | Draw UI, budget tracking, mobile app |
| 9 | Epic 5 (Analytics) | US-5.1, 5.2, 5.3 | Portfolio dashboard, KPIs, saved views |
| 10 | Epic 5 (Analytics) | US-5.4, 5.5, 5.6 | Statements, reports, PDF generation |
| 11 | Epic 7 (Compliance) | US-7.1, 7.2, 7.3 | RLS hardening, audit logs, security review |
| 12 | Epic 6 (UX) | US-6.4, 6.5, 6.6 | Performance, accessibility, polish |
| 13 | Epic 1 (Entities) | US-1.7, 1.8, 1.9 | Testing across all epics, hardening |
| 14 | All Epics | Final stories | Release prep, production readiness |

---

### Week 1 — Project Boot & Foundations
**Epic:** Infrastructure Foundation
**Team Focus:** Backend + DevOps setup
**Stories:** Scaffold new directories, integrate services, CI/CD pipeline

**Deliverables:**
- Create `/src/services`, `/src/state-machines`, `/src/jobs`, `/src/lib/{cache,email,storage}` scaffolding.
- Wire **Supabase** (DB, Storage, Realtime) + Drizzle connection; enable initial RLS policies.
- Set up **Upstash Redis** client (`/src/lib/cache/redis.ts`) + cache-keys constants.
- Add **Sentry** (error tracking), **PostHog** (analytics), **Better Stack** (logging), **Checkly** (uptime).
- **CI Pipeline:** GitHub Actions for typecheck, lint, Vitest unit tests on PR; Vercel preview deploys.

**Testing Gate:** CI green (lint + typecheck pass); health check endpoint returns 200.
**Deployment:** Vercel preview environment with Supabase connection confirmed.

### Week 2 — UX System Skeleton (Attio-style)
**Epic:** Epic 6 (User Experience & Interface)
**Team Focus:** Frontend UX foundations
**Stories:** US-6.1 (Command Palette), US-6.2 (Keyboard Shortcuts), US-6.3 (Inline Editing)

**Deliverables:**
- Implement **Command Palette (cmdk)** with entity search stubs (loans, borrowers, lenders).
- Add **Keyboard Shortcuts Provider** (react-hotkeys-hook) for J/K nav, G shortcuts, Cmd+K.
- Build **Inline Edit Wrapper** (`/src/components/shared/inline-edit.tsx`) with optimistic save + error recovery.
- Ship **Relationship Sidepanel** (static data); **Smart Table** shell with J/K keyboard navigation.

**Testing Gate:** Vitest unit tests for inline-edit hook; Playwright E2E for Cmd+K opening palette.
**Deployment:** Preview with command palette accessible on any page.

### Week 3 — Loan Domain: Schema & State Machine (v1)
**Epic:** Epic 2 (Loan Lifecycle Management)
**Team Focus:** Backend loan logic + state machines
**Stories:** US-2.1 (Loan Workflow), US-2.2 (State Transitions), US-2.3 (Approval Process)

**Deliverables:**
- Add indexes & constraints via Drizzle migrations (loans, payments, draws).
- Implement `loan-lifecycle.machine.ts` (Application → Underwriting → Approved → Funded → Active → Closed).
- Create `LoanService` with guards (eligibility checks, required docs validation, approval logic).
- Add RPC endpoints: `/api/loans/[id]/approve`, `/disburse`, `/generate-payoff` (business logic stubs).
- Unit tests for XState transitions, `AmortizationService` schedule math, underwriting calculations (LTV, DSCR, DTI).

**Testing Gate:** 90%+ coverage on `LoanService` and `loan-lifecycle.machine.ts`; state transition matrix verified.
**Deployment:** API endpoints return 200 with mock responses.

### Week 4 — Loan UI & Deal Journal (v1)
**Epic:** Epic 2 (Loan Lifecycle Management)
**Team Focus:** Frontend loan detail pages + realtime
**Stories:** US-2.4 (Loan Detail UI), US-2.5 (Document Upload), US-2.8 (Deal Journal)

**Deliverables:**
- Loan Detail page with **Deal Journal Timeline** (human-readable event stream with stubs).
- Inline editing for core fields (loan amount, interest rate, term); optimistic updates with rollback on error.
- **Supabase Realtime:** Subscribe to loan status changes; invalidate React Query cache on updates.
- E2E test: "create loan → approve → fund" happy path (Playwright).

**Testing Gate:** Playwright E2E passes for loan creation flow; Realtime updates verified (change status in DB, UI updates <1s).
**Deployment:** Loan detail page accessible at `/loans/[id]` with working realtime sync.
**Milestone A Checkpoint:** ✅ Loan Lifecycle v1 usable; Deal Journal visible; keyboard system live.

### Week 5 — Payments Engine (Foundations)
**Epic:** Epic 3 (Payment Processing & Automation)
**Team Focus:** Backend payment logic + integrations
**Stories:** US-3.1 (Payment Engine), US-3.2 (Stripe Integration), US-3.3 (Plaid Integration)

**Deliverables:**
- Implement `PaymentService` (allocation waterfall: interest → principal → fees → late); handle partial payments, overpayments.
- Add `payment.machine.ts` (5 states: Pending → Processing → Completed/Failed → Reconciled) + RPC `/api/payments/[id]/process`.
- **Stripe Connect sandbox:** Webhook handler with signature verification, idempotency keys, basic payouts to connected accounts.
- **Plaid Link sandbox:** Bank account verification; store access tokens securely (encrypted at rest); ACH initiation stub.
- Integration tests: Payment allocation math (waterfall scenarios), webhook signature verification, idempotency replay protection.

**Testing Gate:** 85%+ coverage on `PaymentService`; webhook handler passes replay/signature tests; Plaid token encryption verified.
**Deployment:** Stripe webhook endpoint live (`/api/webhooks/stripe`); Plaid Link component in dev.

### Week 6 — Payment UI & Scheduling
**Epic:** Epic 3 (Payment Processing & Automation)
**Team Focus:** Frontend payment UI + background jobs
**Stories:** US-3.4 (Payment Scheduling), US-3.5 (Payment History), US-3.6 (Automated Collections)

**Deliverables:**
- Payment form with method selection (ACH via Plaid, card via Stripe, manual entry); amount validation against balance.
- Payment history timeline (visual waterfall breakdown: interest/principal/fees); status badges (pending/completed/failed).
- Payment scheduling dashboard; retry logic stubs (3 attempts over 7 days).
- **Inngest jobs:** Daily payment collection (6am cron), payment retry (exponential backoff), late fee assessment (after grace period).
- **Emails:** Payment receipt (Resend), failure notices (retry in 3 days), late fee assessment alert.

**Testing Gate:** E2E: "schedule payment → process → view receipt" (Playwright); Inngest job triggers verified in local dev.
**Deployment:** Payment UI accessible at `/payments`; Inngest jobs deployed to Vercel.

### Week 7 — Draw Management (Foundations)
**Epic:** Epic 4 (Draw Management & Construction Tracking)
**Team Focus:** Backend draw workflow + storage
**Stories:** US-4.1 (Draw Workflow), US-4.2 (Inspector Assignment), US-4.3 (Document Upload)

**Deliverables:**
- `draw.machine.ts` + `DrawService` (Requested → Reviewed → Approved → Inspected → Disbursed); budget validation guards.
- **Inspector assignment:** Assign inspector to draw; send email notification with mobile upload link.
- **Mobile upload (MVP):** Photo upload to Supabase Storage (`draw-photos/` bucket); presigned URLs; RLS policies (inspector-only write).
- RPC endpoints: `/api/draws/[id]/approve`, `/disburse`; validations (budget remaining, lien waivers); audit events to Deal Journal.

**Testing Gate:** 80%+ coverage on `DrawService`; draw state machine transitions verified; Supabase Storage upload/download tested.
**Deployment:** Draw RPC endpoints live; Supabase Storage bucket configured with RLS.

### Week 8 — Draw UI & Budget Tracking
**Epic:** Epic 4 (Draw Management & Construction Tracking)
**Team Focus:** Frontend draw UI + mobile inspector app
**Stories:** US-4.4 (Draw Request Form), US-4.5 (Budget Tracking), US-4.6 (Inspector Mobile App)

**Deliverables:**
- Draw request form (borrower-facing): amount, purpose, budget line items; auto-calculate remaining budget.
- **Approval workflow UI:** Loan officer reviews draw → assigns inspector → approves/rejects.
- **Budget vs. actual component:** Visual progress bars per budget category (foundation, framing, electrical, etc.); overage warnings.
- **Lien waiver upload:** PDF upload to Supabase Storage; required before disbursement.
- **Mobile inspector app (basic):** Responsive UI for photo upload + notes; works on phone browser (no native app yet).
- E2E: "borrower requests draw → inspector uploads photos → LO approves → funds disbursed" (Playwright).

**Testing Gate:** E2E passes for full draw workflow; budget calculations verified; mobile UI responsive (Chrome DevTools mobile emulation).
**Deployment:** Draw UI at `/draws`; mobile inspector link shareable.
**Milestone B Checkpoint:** ✅ Payments scheduling + Draw workflow end-to-end functional.

### Week 9 — Portfolio Analytics (v1)
**Epic:** Epic 5 (Portfolio Management & Analytics)
**Team Focus:** Backend analytics + Redis caching
**Stories:** US-5.1 (Portfolio Metrics), US-5.2 (Performance Tracking), US-5.3 (Risk Analysis)

**Deliverables:**
- `AnalyticsService` for core metrics: active loan count/balance, delinquency rate (30/60/90 days), weighted average LTV/DSCR, MoM growth.
- **Redis caching:** Cache portfolio aggregates (TTL: 1 hour); invalidate on loan/payment state changes via Supabase webhook.
- Portfolio dashboard with KPIs (tiles: $5.2M active balance, 2.3% delinquency, 65% avg LTV, +12% MoM).
- **Saved filters/views:** User-specific saved searches (e.g., "Loans >$1M in CA"); performance & risk heatmaps.

**Testing Gate:** Analytics calculations verified against manual spreadsheet; Redis cache hit rate >80%; load test dashboard (100 concurrent users).
**Deployment:** Dashboard at `/analytics`; Redis cache warming job runs on deploy.

### Week 10 — Statements & Reporting
**Epic:** Epic 5 (Portfolio Management & Analytics)
**Team Focus:** PDF generation + automated reporting
**Stories:** US-5.4 (Statement Generation), US-5.5 (Reporting), US-5.6 (Export)

**Deliverables:**
- `ReportingService`: Monthly lender statements (PDF via Puppeteer or React-PDF); borrower payment history; loan performance reports.
- **CSV/Excel exports:** Portfolio snapshot, payment register, draw log; downloadable from UI.
- **Automated statement generation:** Inngest job (1st of month at 9am) generates all statements; emails via Resend with PDF attachment.
- **Archive statements:** Store in Supabase Storage (`statements/{year}/{month}/`); accessible via lender portal; Deal Journal excerpts (key events).

**Testing Gate:** PDF generation verified (visual snapshot tests); Inngest job runs on schedule in dev; email delivery confirmed (sandbox).
**Deployment:** Reporting UI at `/analytics/reports`; statements archived in Supabase Storage.

### Week 11 — Compliance & RLS Hardening
**Epic:** Epic 7 (Security, Compliance & Administration)
**Team Focus:** Security hardening + audit logging
**Stories:** US-7.1 (RLS Policies), US-7.2 (Audit Logs), US-7.3 (Data Privacy)

**Deliverables:**
- **Expand RLS policies:** Org-level isolation (`org_id` in all tables); role-based access (Admin sees all, Lender sees participations only, Borrower sees own loans).
- **Audit log enrichment:** All RPC actions log (who/when/why/what changed); `audit_logs` table with retention policy (7 years).
- **Security review:** Secrets rotation (Supabase, Stripe, Plaid API keys); PII encryption at rest (SSN, bank account numbers); access log analysis (suspicious activity detection).
- **Compliance docs:** GDPR data deletion workflow; SOC 2 prep (logging, access controls, encryption documentation).

**Testing Gate:** RLS policies tested (users cannot access other orgs' data); audit logs capture all mutations; PII encryption verified.
**Deployment:** RLS policies live in production; audit log retention policy configured.

### Week 12 — Performance Pass & UX Polish
**Epic:** Epic 6 (User Experience & Interface)
**Team Focus:** Performance optimization + UX refinement
**Stories:** US-6.4 (Performance), US-6.5 (Accessibility), US-6.6 (Mobile Responsive)

**Deliverables:**
- **Performance:** Add pagination (50 items/page); fix N+1 queries (add Drizzle `.with()` joins); bundle analysis + code-splitting (lazy load `/analytics`).
- **UX polish:** Loading skeletons (Shadcn Skeleton), empty states (custom illustrations), micro-interactions (toast notifications, hover effects).
- **Accessibility sweep:** WCAG AA compliance (color contrast, keyboard nav, ARIA labels, screen reader testing with NVDA/VoiceOver).
- **Keyboard shortcuts:** Expand to 80%+ workflows (G+L for loans, G+P for payments, G+D for draws, E to edit, Cmd+S to save).
- **Cmd+K power actions:** "Create loan", "Make payment", "Request draw" directly from command palette.

**Testing Gate:** Lighthouse score >90 (performance, accessibility); axe DevTools zero violations; keyboard-only navigation test passes.
**Deployment:** Optimized bundle (<300KB gzipped); CloudFront CDN added for Supabase Storage if latency >200ms.
**Milestone C Checkpoint:** ✅ Analytics, statements, performance pass complete; 80% keyboard coverage achieved.

### Week 13 — Testing & Hardening
**Epic:** All Epics (Cross-Epic Integration Testing)
**Team Focus:** Comprehensive testing + load testing
**Stories:** US-1.7 (Entity CRUD), US-1.8 (Search), US-1.9 (Bulk Operations)

**Deliverables:**
- **Unit test coverage:** Achieve 70–80% coverage across services, state machines, utilities (tracked via Codecov).
- **API integration tests:** Hit all API routes (CRUD + RPC) with test DB; validate responses, error handling, auth guards.
- **E2E critical journeys (Playwright):**
  1. Inquiry → Application → Underwriting → Approval → Funding (Epic 2)
  2. First payment → Allocation → Receipt → Dashboard update (Epic 3)
  3. Draw request → Inspector upload → Approval → Disbursement (Epic 4)
  4. Payoff quote → Final payment → Loan closure (Epic 2)
- **Load testing:** k6 scripts for core endpoints (`/api/loans`, `/api/payments/[id]/process`, `/analytics`); target 100 req/s; fix hotspots (add indexes, Redis caching).

**Testing Gate:** 70-80% unit coverage; all E2E journeys pass; load test sustains 100 req/s with p95 latency <500ms.
**Deployment:** Load test report published; performance baselines documented.

### Week 14 — Release Prep & Go-Live
**Epic:** All Epics (Production Readiness)
**Team Focus:** Production deployment + monitoring
**Stories:** Final epic stories, production cutover

**Deliverables:**
- **Production env review:** Verify all env vars (Supabase prod URL, Stripe live keys, Plaid production); enable rate limiting (Arcjet).
- **Runbooks & on-call:** Document incident response procedures (`docs/operations/runbook.md`); set up PagerDuty/Opsgenie alerts for Sentry errors, Checkly downtime.
- **Data migration/seed plan:** Migrate pilot users from spreadsheets; seed production DB with test loans (anonymized data).
- **Backup/restore drills:** Test Supabase PITR (point-in-time recovery); verify RTO <4 hours.
- **Final security audit:** OWASP Top 10 check (Burp Suite scan); penetration test (optional; hire external firm or internal review).
- **Freeze & tag v1.0:** Code freeze 48 hours before launch; tag `v1.0.0` in Git; deploy to production (Friday 5pm → Monday launch).
- **Post-launch monitoring dashboards:** Grafana/PostHog/Sentry dashboards for real-time monitoring (errors, latency, user activity).

**Testing Gate:** All tests pass; security audit clean; backup restore successful; prod env smoke tests pass.
**Deployment:** Production launch; rollback plan documented; team on-call for 72 hours post-launch.
**Milestone GA:** ✅ Security + compliance checks passed; 70-80% test coverage; production runbooks complete; v1.0 LIVE!

---

### Week 15 — Post-Launch Stabilization
**Epic:** Production Support & Iteration
**Team Focus:** Bug fixes + user feedback
**Phase:** Post-Launch Stabilization (2 weeks)

**Deliverables:**
- **Hot Monitoring:** 24/7 monitoring with Sentry, Checkly, PostHog; incident response per runbook.
- **Bug triage & fixes:** Address user-reported bugs (P0/P1 within 24 hours, P2 within week); deploy patches via hotfix branches.
- **User feedback collection:** PostHog session replays, user interviews (5-10 pilot users); NPS survey.
- **Performance tuning:** Optimize slow queries identified in production (add indexes, Redis caching); address unexpected bottlenecks.
- **Documentation updates:** FAQs based on user questions; update runbook with actual incident patterns.

**Success Metrics:** <5 P0/P1 bugs remaining; NPS >40; p95 API latency <500ms; 99.9% uptime maintained.

### Week 16 — Iteration & Planning
**Epic:** Product Iteration + Phase 2 Planning
**Team Focus:** Feature enhancements + roadmap planning
**Phase:** Post-Launch Iteration (2 weeks)

**Deliverables:**
- **Quick wins:** Implement top 3 user-requested features (e.g., bulk payment import, loan comparison view, mobile notifications).
- **A/B testing:** PostHog experiments for UI improvements (e.g., command palette discoverability, payment form flow).
- **Phase 2 planning:** Review PRD "Out of Scope" features (see `/docs/PRD.md`); prioritize for next 3-month cycle (lender marketplace, investor portal, advanced analytics).
- **Technical debt paydown:** Refactor identified tech debt (e.g., consolidate duplicated validation logic, extract shared UI components).
- **Retrospective:** Team retro on MVP delivery; document lessons learned for future sprints.

**Success Metrics:** 3 quick wins shipped; Phase 2 epics prioritized; technical debt backlog <10 items; team satisfaction >4/5.

---

### Milestones & Exit Criteria

| Milestone | Week | Exit Criteria | Success Metrics |
|-----------|------|---------------|-----------------|
| **Milestone A: Loan Foundation** | Week 4 | Loan Lifecycle v1 functional; Deal Journal live; Keyboard system operational | - E2E test passes: create → approve → fund<br>- Command palette accessible (Cmd+K)<br>- Realtime updates <1s latency |
| **Milestone B: Payments & Draws** | Week 8 | Payment scheduling functional; Draw workflow end-to-end | - E2E tests pass: payment processing, draw disbursement<br>- Stripe/Plaid integrations verified<br>- Background jobs running on schedule |
| **Milestone C: Analytics & Polish** | Week 12 | Portfolio analytics live; Performance optimized; Accessibility compliant | - Lighthouse >90 (perf + a11y)<br>- 80% keyboard coverage<br>- Bundle <300KB gzipped<br>- Analytics dashboard accurate (±2% margin) |
| **GA: Production Launch** | Week 14 | Security audit passed; 70-80% test coverage; Production ready | - Zero P0 security issues<br>- 70-80% unit test coverage<br>- RLS policies enforce org isolation<br>- Runbooks complete & tested<br>- v1.0 deployed to production |
| **Post-Launch Stable** | Week 16 | Production stable; User feedback positive; Phase 2 planned | - <5 P1 bugs<br>- NPS >40<br>- 99.9% uptime<br>- Phase 2 roadmap approved |

---

### Risks & Mitigations (Roadmap-Specific)

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Payment webhook complexity** | Medium | High | - Implement idempotency keys (UUID per request)<br>- Add replay attack protection (timestamp validation)<br>- Build dead-letter queue for failed webhooks<br>- Comprehensive integration tests for all webhook events |
| **Realtime sync edge cases** | Medium | Medium | - Pair Supabase Realtime with React Query invalidation<br>- Add fallback: polling every 30s if WS connection drops<br>- Test reconnection scenarios (network interruption)<br>- Optimistic UI updates with rollback on conflict |
| **RLS policy bugs** | High | Critical | - Start with permissive policies; tighten iteratively<br>- Automated tests for all RLS scenarios (cross-org access blocked)<br>- Weekly security review of new policies<br>- Feature flag RLS (can disable if catastrophic bug) |
| **Timeline creep** | High | High | - Ship weekly increments (fail fast if behind)<br>- Scope guards: PRD "Out of Scope" section enforced<br>- Feature flags for risky items (can defer if late)<br>- Weekly sprint reviews with stakeholders |
| **Stripe/Plaid integration issues** | Medium | High | - Use sandbox environments for Weeks 5-13<br>- Test with real $ in staging (Week 13)<br>- Document rollback: manual payment entry if APIs down<br>- Monitor webhook delivery rates (alert if <95%) |
| **Performance degradation** | Low | Medium | - Weekly load tests starting Week 9<br>- Redis cache hit rate monitoring (target >80%)<br>- Database query performance tracking (Supabase Dashboard)<br>- Auto-scale Supabase on demand |
| **Team burnout** | Medium | Critical | - Enforce sustainable pace (no crunch weeks 1-11)<br>- Allow flexibility in Week 12-13 for polish vs. pressure<br>- Post-launch: Week 15-16 are lower intensity<br>- Celebrate milestones (A, B, C, GA) |

---

### Resource Planning

**Team Composition:**
- **Weeks 1-4:** 1-2 developers (backend-focused); AI pair programming (Cursor + BMAD)
- **Weeks 5-8:** 2 developers (1 backend/integrations, 1 frontend/UI); AI assistance for boilerplate
- **Weeks 9-12:** 2 developers + optional 1 designer (UX polish); AI for testing scripts
- **Weeks 13-14:** Full team + security reviewer (external or internal); AI for load test scripts
- **Weeks 15-16:** 1-2 developers (on-call rotation); stakeholder reviews

**Infrastructure Costs (MVP):**
- Supabase: ~$25/mo (Pro tier)
- Vercel: ~$20/seat/mo (Pro tier for team)
- Upstash Redis: ~$10/mo (Pay-as-you-go; 10K commands/day)
- Meilisearch Cloud: ~$30/mo (Production tier; 10M docs)
- Clerk: ~$25/mo (1K MAU after free tier)
- Stripe Connect: 0.5% + $0.25/payout (transaction-based)
- Plaid: ~$0.30/verification (transaction-based)
- Sentry: Free tier (5K errors/mo sufficient for MVP)
- PostHog: Free tier (1M events/mo sufficient for MVP)
- Better Stack: ~$20/mo (Team plan; 5GB logs)
- Checkly: ~$39/mo (Team plan; 100 checks)
- **Total:** ~$200-250/mo fixed + transaction fees

---

## Document Status & Next Steps

### Architecture Document Completion Summary

**Document Version:** 1.0
**Last Updated:** 2025-10-11
**Total Length:** 2,200+ lines
**Status:** ✅ Complete & Ready for Implementation

**Sections Completed:**
- ✅ **Requirements & UX Analysis** (PRD, Epics, UX Spec, Deep Dive Analysis integrated)
- ✅ **Technical Preferences & Constraints** (Team, infra, integrations documented)
- ✅ **Architecture Pattern Decision** (Enhanced Modular Monolith confirmed)
- ✅ **Epic Analysis & Component Boundaries** (7 epics → 15 services mapped)
- ✅ **Technology Stack & Library Decisions** (80+ dependencies with versions)
- ✅ **Supabase Integration Architecture** (Realtime, RLS, Storage, Functions detailed)
- ✅ **Proposed Source Tree** (Complete directory structure, 250-300 files)
- ✅ **Architecture Decision Records** (16 ADRs with alternatives, consequences, references)
- ✅ **Implementation Roadmap** (16 weeks with epic mapping, testing gates, team roles)

### What This Document Provides

**For Developers:**
- Clear service boundaries and responsibilities (15 services detailed)
- Technology choices with rationale (alternatives considered for each decision)
- Week-by-week implementation plan with specific deliverables
- Testing strategy (unit, integration, E2E) with coverage targets
- Complete file structure showing where to put new code

**For Product/PM:**
- Epic-to-week mapping (all 74 stories scheduled)
- Milestone exit criteria with success metrics
- Risk assessment with mitigation strategies
- Resource planning (team composition, infrastructure costs)
- Post-launch plan (weeks 15-16 stabilization and iteration)

**For AI Agents (Cursor + BMAD):**
- Complete system context for informed code generation
- Service layer patterns for business logic implementation
- Testing patterns and gates for quality assurance
- Deployment strategy for preview and production environments

### Immediate Next Steps

**Phase 5: Development Kickoff (Start Week 1)**

1. **Environment Setup** (Day 1-2)
   - Create Supabase project (production + staging)
   - Configure Vercel project (link to GitHub repo)
   - Set up Upstash Redis instance
   - Initialize Sentry, PostHog, Better Stack, Checkly accounts
   - Add all environment variables to `.env.local` and Vercel

2. **Scaffold New Directories** (Day 2-3)
   ```bash
   mkdir -p src/{services,state-machines,jobs,lib/{cache,email,storage}}
   mkdir -p supabase/{functions,migrations}
   mkdir -p tests/{unit,integration}
   ```

3. **Install Dependencies** (Day 3)
   ```bash
   npm install @supabase/supabase-js @upstash/redis xstate@5 inngest
   npm install resend @sendgrid/mail react-email
   npm install @stripe/stripe-js plaid
   npm install -D @playwright/test vitest
   ```

4. **Create Core Service Files** (Day 4-5)
   - `/src/services/LoanService.ts` (skeleton)
   - `/src/services/PaymentService.ts` (skeleton)
   - `/src/services/DrawService.ts` (skeleton)
   - `/src/state-machines/loan-lifecycle.machine.ts` (stub)
   - `/src/lib/cache/redis.ts` (Upstash client)
   - `/src/lib/DB.ts` (update with Supabase connection)

5. **CI/CD Pipeline** (Day 5)
   - Update `.github/workflows/ci.yml` (add Vitest, Playwright)
   - Configure Vercel preview deployments
   - Set up Codecov for coverage tracking

**Ready to Start:** Week 1 deliverables are now fully specified in the roadmap above. Begin implementation following the week-by-week plan.

---

## References

### Key Documents
- **PRD:** `/docs/PRD.md` (1,345 lines) - Product requirements, user journeys, functional/non-functional requirements
- **Epics:** `/docs/epics.md` (872 lines) - 74 user stories with acceptance criteria and story points
- **UX Spec:** `/docs/ux-specification-2025-10-11.md` (1,380 lines) - Attio-style UX principles and component specs
- **Deep Dive Analysis:** `/reports/deep-dive-analysis.md` (1,481 lines) - Comprehensive codebase analysis (8.0/10 health score)
- **Project Analysis:** `/docs/project-workflow-analysis.md` (558 lines) - Workflow and architecture analysis

### External References
- **Supabase Docs:** https://supabase.com/docs
- **XState Docs:** https://xstate.js.org/docs/
- **Inngest Docs:** https://www.inngest.com/docs
- **Stripe Connect:** https://stripe.com/docs/connect
- **Plaid Docs:** https://plaid.com/docs/
- **Shadcn UI:** https://ui.shadcn.com/
- **Vercel Docs:** https://vercel.com/docs

---

**Architecture Document Complete.** Ready to begin Week 1 implementation. 🚀
