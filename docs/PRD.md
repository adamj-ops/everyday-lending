# Everyday Lending Platform - Product Requirements Document (PRD)

**Author:** adam
**Date:** October 11, 2025
**Project Level:** 4 (Full Platform)
**Project Type:** Lending Platform
**Target Scale:** 40+ user stories, 5+ epics, 3-4 month MVP

---

## Description, Context and Goals

### Project Description

Everyday Lending is a modern, production-ready **private real estate lending platform** that transforms how hard money lenders manage their loan portfolios, track borrower relationships, and optimize their lending operations. Built with **Attio-style UX principles**, the platform delivers an exceptional user experience through keyboard-first navigation, inline editing, real-time collaboration, and intelligent data relationships.

The platform serves **hard money lenders** and **loan servicers** managing portfolios of fix-and-flip loans, bridge loans, and construction loans secured by residential and commercial real estate. It provides complete lifecycle management from **application through payoff**, including sophisticated features for:

- **Multi-lender syndication** with automated participation tracking
- **Construction loan draw management** with inspection workflows
- **Automated payment processing** via Stripe Connect and Plaid
- **Real-time portfolio analytics** with performance dashboards
- **Borrower and property relationship management** with full audit trails

Unlike traditional loan servicing software that requires extensive training and offers clunky interfaces, Everyday Lending prioritizes **speed, clarity, and delight** in every interaction. The platform anticipates user needs, surfaces relevant information contextually, and makes complex workflows feel effortless.

### Deployment Intent

**Production SaaS/Application** targeting:

- **Phase 1 (MVP - Month 3-4):** Private beta with 5-10 hard money lenders managing $10-50M in loan volume
- **Phase 2 (Month 5-6):** Public launch with core loan lifecycle features and 25-50 active lenders
- **Phase 3 (Month 7-12):** Enterprise features including multi-entity support, advanced reporting, and integrations with title companies and escrow services

**Infrastructure:** Cloud-native deployment on Vercel with PostgreSQL (Neon), Clerk authentication, and Stripe/Plaid integrations. Designed for **99.9% uptime** with horizontal scalability to support hundreds of lenders managing billions in loan volume.

### Context

#### The Problem

Hard money lenders today manage their loan portfolios using a **fragmented patchwork of tools**:

- **Excel spreadsheets** for loan tracking (error-prone, no collaboration, manual calculations)
- **QuickBooks** for payment processing (not designed for loan servicing workflows)
- **Dropbox/Google Drive** for document storage (no structured data, difficult to search)
- **Email and text** for borrower communication (untracked, lost context)

This fragmentation creates **operational inefficiencies**, **compliance risks**, and **poor borrower experiences**:

- **Manual data entry** across multiple systems leads to errors and inconsistencies
- **Delayed payment tracking** results in late fees and borrower frustration
- **Limited portfolio visibility** prevents data-driven lending decisions
- **No audit trails** create compliance exposure
- **Inability to scale** operations beyond 20-30 active loans

Traditional loan servicing platforms (e.g., Nortridge, Black Knight) offer comprehensive features but are **enterprise-focused**, requiring:

- **6-12 month implementations** with extensive customization
- **$50K+ annual contracts** prohibitive for small-to-mid-sized lenders
- **Complex interfaces** requiring dedicated training
- **Limited modern integrations** (no API-first architecture)

#### Why Now

Three market trends create urgency for a modern lending platform:

1. **Real estate lending boom:** Private lending volume has grown 15-20% annually, with hard money lenders originating $50B+ in loans in 2024
2. **Fintech infrastructure maturity:** Stripe Connect, Plaid, and modern banking APIs now enable sophisticated payment workflows that were impossible 5 years ago
3. **UX expectations rising:** Lenders experienced Attio, Notion, and Linear expect the same **speed and elegance** in their business tools

#### Current Situation

The Everyday Lending platform has completed **foundational development**:

- ✅ **Core data model:** Full Drizzle schema with borrowers, lenders, properties, loans, participations, payments, and draw tracking
- ✅ **Authentication:** Clerk integration with secure user management
- ✅ **Basic CRUD APIs:** REST endpoints for all core entities with search and filtering
- ✅ **UI scaffolding:** Next.js 15 + Shadcn UI components with table views and creation dialogs
- ✅ **Modern tech stack:** TypeScript, Tailwind CSS 4, React Query, Zod validation

**However, the platform currently lacks:**

- ❌ **Production-ready loan workflows:** No application → underwriting → approval → disbursement → servicing pipeline
- ❌ **Payment automation:** No Stripe/Plaid integration for ACH, wire, or automated collection
- ❌ **Draw management:** Construction loan draw workflow is data-only, no UI or approval process
- ❌ **Advanced UX:** No keyboard shortcuts, inline editing, command palette, or real-time updates
- ❌ **Portfolio analytics:** No dashboard showing portfolio performance, delinquency rates, or yield metrics
- ❌ **Compliance features:** No audit logs, user permissions, or regulatory reporting

**Deep dive analysis findings** (see `/reports/deep-dive-analysis.md`):

- **Architecture Score: 78/100** - Solid foundation, needs service layer abstraction and error handling improvements
- **Database Score: 82/100** - Well-designed schema, missing indexes and migration strategy
- **Frontend Score: 71/100** - Good component structure, needs state management overhaul and loading states
- **UX Score: 65/100** - Basic UI implemented, missing Attio-style interactions and polish
- **Security Score: 74/100** - Good authentication, needs input sanitization and CSRF protection
- **Testing Score: 58/100** - Minimal test coverage, requires comprehensive unit/integration/E2E tests

### Goals

This PRD defines a **greenfield build plan** to transform Everyday Lending from a functional prototype into a **production-ready platform** with Attio-level UX quality. Goals are **measurable** and **outcome-focused**:

#### Goal 1: Complete Loan Lifecycle Management
**Metric:** 100% of loan statuses automated from application → closed
**Timeline:** Month 1-2
**Outcome:** Lenders can manage entire loan process without leaving platform

#### Goal 2: Attio-Style User Experience
**Metric:** Achieve <500ms average interaction time for all CRUD operations
**Timeline:** Month 1-3
**Outcome:** Users describe platform as "fast," "intuitive," and "delightful" in user testing

#### Goal 3: Automated Payment Processing
**Metric:** 90%+ of payments processed via Stripe/Plaid automation
**Timeline:** Month 2-3
**Outcome:** Eliminate manual payment entry, reduce errors by 95%

#### Goal 4: Real-Time Portfolio Analytics
**Metric:** Dashboard loads in <2s with live portfolio metrics
**Timeline:** Month 2-3
**Outcome:** Lenders make data-driven decisions using platform insights

#### Goal 5: Production-Ready Infrastructure
**Metric:** 99.9% uptime, <3s P95 API response time, comprehensive monitoring
**Timeline:** Month 1-3
**Outcome:** Platform handles 1000+ concurrent users with enterprise reliability

#### Goal 6: Regulatory Compliance Foundation
**Metric:** Complete audit trails, user permissions, export capabilities
**Timeline:** Month 3-4
**Outcome:** Platform meets basic compliance requirements for state-licensed lenders

#### Goal 7: Exceptional Developer Experience
**Metric:** 80%+ test coverage, full API documentation, E2E testing suite
**Timeline:** Month 1-4
**Outcome:** New developers can contribute productively within 1 week

---

## Requirements

### Functional Requirements

#### FR-1: Core Entity Management

**FR-1.1: Borrower Management**
- Create, read, update, delete borrower records with full contact details
- Track borrower credit profiles, income sources, and employment history
- Link multiple loans to single borrower with relationship view
- Maintain communication history and notes with timestamp tracking
- Support both individual and entity borrowers (LLC, Trust, Corporation)

**FR-1.2: Lender Management**
- Manage lender profiles with lending criteria and portfolio preferences
- Track available capital and deployment targets
- Configure automated lending rules and approval thresholds
- Monitor lender participation across syndicated loans
- Calculate and track lender-specific returns and servicing income

**FR-1.3: Property Management**
- Comprehensive property records with address, parcel, and valuation data
- Support residential and commercial property types
- Track property condition, improvements, and inspection history
- Maintain property document library (appraisals, inspections, insurance)
- Link properties to multiple loans over time with history preservation

#### FR-2: Loan Lifecycle Management

**FR-2.1: Loan Application & Origination**
- Digital loan application workflow with progressive disclosure
- Automated pre-qualification based on lender criteria
- Document upload and organization (application, financials, title)
- Application status tracking with automated borrower notifications
- Convert approved applications to active loans with single click

**FR-2.2: Loan Underwriting**
- Structured underwriting checklist with customizable criteria
- Automated LTV, DSCR, and debt-to-income calculations
- Risk scoring and recommendation engine
- Underwriter assignment and collaborative review
- Approval workflow with multi-level authorization

**FR-2.3: Loan Structuring & Terms**
- Flexible loan term configuration (principal, rate, term, amortization)
- Support for interest-only, fully-amortizing, and balloon structures
- Points and fee calculation (origination, processing, inspection)
- Multi-lender participation allocation with automated splits
- Automated payment schedule generation based on terms

**FR-2.4: Loan Disbursement**
- Disbursement checklist with conditions precedent tracking
- Integration with title company and escrow services
- Multi-party disbursement instructions (borrower, contractors, payoffs)
- Automated fund transfer via Stripe Connect or wire
- Disbursement confirmation and receipt generation

**FR-2.5: Loan Servicing & Payments**
- Automated payment scheduling with calendar integration
- Multiple payment methods: ACH (Plaid), wire, check, credit card (Stripe)
- Automated payment reminders and late notices
- Principal-only and additional principal payment handling
- Payment waterfall (interest → principal → fees → escrow)
- Automated late fee calculation and assessment

**FR-2.6: Construction Loan Draw Management**
- Inspection-based draw request workflow
- Contractor/borrower draw submission portal
- Inspector assignment and scheduling
- Draw approval workflow with lender authorization
- Automated lien waiver and AIA document tracking
- Budget vs. actual spend reporting with variance alerts

**FR-2.7: Loan Payoff & Closure**
- Automated payoff quote generation with per-diem interest
- Payoff instruction coordination with title/escrow
- Final payment processing and loan closure
- Post-close document generation (satisfaction, release)
- Archive closed loans with full audit trail preservation

#### FR-3: Payment Processing & Automation

**FR-3.1: Stripe Connect Integration**
- Lender onboarding to Stripe Connected Accounts
- Automated ACH and card payment collection
- Payment splits for multi-lender participations
- Automated servicing fee distribution
- Payment reconciliation and reporting

**FR-3.2: Plaid Integration**
- Borrower bank account linking and verification
- Automated recurring ACH payment setup
- Real-time payment status tracking
- Failed payment retry logic with notifications
- Bank balance verification for draw disbursements

**FR-3.3: Payment Reconciliation**
- Automated payment matching to loan schedules
- Exception handling for partial/overpayments
- Manual payment entry for checks and wires
- Payment reversal and refund workflows
- General ledger integration readiness (QuickBooks, Xero)

#### FR-4: Portfolio Management & Analytics

**FR-4.1: Portfolio Dashboard**
- Real-time portfolio metrics (total loans, volume, avg LTV, yield)
- Loan status distribution (active, delinquent, paid off, defaulted)
- Payment performance tracking (current, 30/60/90 days late)
- Geographic heat map of loan concentration
- Trend analysis (origination volume, delinquency rates over time)

**FR-4.2: Lender Performance Analytics**
- Individual lender portfolio view with ROI calculations
- Participation tracking across syndicated loans
- Servicing income attribution and distribution
- Lender-specific reporting (monthly statements, tax documents)

**FR-4.3: Risk Management**
- Delinquency monitoring with automated escalation
- Portfolio concentration analysis (geographic, property type, borrower)
- LTV monitoring with automated revaluation triggers
- Default prediction scoring using payment history patterns

#### FR-5: User Experience & Interface

**FR-5.1: Attio-Style Interactions**
- Global command palette (Cmd+K) for navigation and actions
- Keyboard shortcuts for all primary workflows
- Inline editing for all entity fields with auto-save
- Optimistic UI updates with real-time validation
- Smart search with fuzzy matching across all entities

**FR-5.2: Data Relationships & Context**
- Bidirectional relationship navigation (borrower → loans, loans → payments)
- Contextual sidepanels showing related data
- Activity feeds showing timeline of changes
- Smart suggestions based on context (e.g., suggest existing borrower when creating loan)

**FR-5.3: Collaboration & Communication**
- Internal notes and comments on all entities
- @mentions and task assignment
- Activity notifications with customizable preferences
- Email integration for borrower communication tracking

#### FR-6: Security & Compliance

**FR-6.1: Authentication & Authorization**
- Role-based access control (Admin, Lender, Servicer, Borrower, Read-Only)
- Organization-level data isolation (multi-tenancy)
- Session management with automatic timeout
- API key management for integrations

**FR-6.2: Audit & Compliance**
- Complete audit trail for all data modifications
- Compliance report generation (delinquency reports, payment histories)
- Data export in standard formats (CSV, PDF, JSON)
- GDPR-compliant data deletion workflows

#### FR-7: Administration & Configuration

**FR-7.1: System Configuration**
- Customizable loan fee types and calculation rules
- Configurable notification templates and triggers
- Integration credential management (Stripe, Plaid, email)
- User invitation and onboarding workflows

**FR-7.2: Data Management**
- Bulk import for borrowers, lenders, properties (CSV)
- Data validation and error handling during import
- Scheduled data backups with restoration capability
- Data migration tools for legacy system imports

### Non-Functional Requirements

**NFR-1: Performance**
- **Page Load Time:** All pages load in <2 seconds on 4G connection
- **API Response Time:** P95 response time <500ms for all CRUD operations
- **Search Performance:** Search results return in <300ms for datasets up to 10,000 records
- **Dashboard Rendering:** Portfolio dashboard renders in <3 seconds with up to 1,000 active loans
- **Concurrent Users:** Support 1,000+ concurrent users without degradation

**NFR-2: Reliability & Availability**
- **Uptime SLA:** 99.9% uptime (max 43 minutes downtime/month)
- **Data Durability:** 99.999999999% durability (11 nines) via PostgreSQL backups
- **Graceful Degradation:** Core CRUD operations remain available during payment provider outages
- **Automated Failover:** Database replication with <60 second failover time
- **Backup & Recovery:** Automated daily backups with 4-hour RPO, 1-hour RTO

**NFR-3: Scalability**
- **Horizontal Scaling:** Architecture supports horizontal scaling to 10,000+ concurrent users
- **Data Volume:** Efficiently handle 100,000+ loans with millions of payment records
- **Multi-Tenancy:** Support 1,000+ organizations with data isolation
- **API Rate Limiting:** Graceful throttling at 1,000 requests/minute per user

**NFR-4: Security**
- **Authentication:** Multi-factor authentication (MFA) support via Clerk
- **Authorization:** Row-level security (RLS) for multi-tenant data isolation
- **Encryption:** TLS 1.3 in transit, AES-256 encryption at rest
- **Input Validation:** Comprehensive sanitization preventing XSS, SQL injection, CSRF
- **API Security:** JWT-based authentication with automatic token refresh
- **PII Protection:** Sensitive data (SSN, bank accounts) encrypted with separate keys
- **Security Monitoring:** Real-time threat detection via Arcjet (rate limiting, bot protection)

**NFR-5: Compliance & Auditability**
- **Audit Logging:** Immutable audit trail for all data modifications with user, timestamp, change details
- **Data Retention:** Configurable retention policies meeting state lending regulations
- **GDPR Compliance:** Data export, deletion, and consent management workflows
- **SOC 2 Readiness:** Security controls aligned with SOC 2 Type II requirements
- **Financial Reporting:** Generate reports meeting GAAP and regulatory standards

**NFR-6: Usability**
- **Learnability:** New users complete first loan creation within 5 minutes without training
- **Efficiency:** Power users complete common workflows in <30 seconds via keyboard shortcuts
- **Accessibility:** WCAG 2.1 Level AA compliance for screen readers and keyboard navigation
- **Mobile Responsiveness:** Core workflows functional on tablets and mobile devices
- **Error Recovery:** Clear error messages with actionable recovery steps

**NFR-7: Maintainability**
- **Code Quality:** Maintain 80%+ test coverage (unit, integration, E2E)
- **API Documentation:** OpenAPI 3.0 spec auto-generated from codebase
- **Monitoring:** Comprehensive observability via Sentry, PostHog, Better Stack
- **Deployment:** Zero-downtime deployments via Vercel with automatic rollback
- **Technical Debt:** Dedicated 20% sprint capacity for refactoring and improvements

**NFR-8: Interoperability**
- **API-First Architecture:** RESTful APIs for all core functionality
- **Webhooks:** Event-driven webhooks for loan status changes, payment events
- **Data Export:** Batch export capabilities for accounting system integration
- **Payment Gateways:** Pluggable architecture supporting multiple payment providers
- **Email Integration:** SMTP/SendGrid integration for automated notifications

**NFR-9: Localization & Internationalization**
- **Multi-Language:** English (primary), with i18n architecture for future expansion
- **Currency Support:** USD primary, architecture supports multi-currency
- **Timezone Handling:** Accurate timezone handling for payment schedules and deadlines
- **Date Formats:** Locale-aware date/time formatting

**NFR-10: Cost Efficiency**
- **Infrastructure Cost:** Target <$500/month for first 100 active lenders
- **Payment Processing:** Optimize Stripe/Plaid costs through batching and caching
- **Database Optimization:** Efficient queries and indexing to minimize compute costs
- **CDN Usage:** Asset optimization and caching to reduce bandwidth costs

**NFR-11: Developer Experience**
- **Local Development:** One-command setup (npm install → npm run dev)
- **Hot Reload:** <3 second hot reload for code changes
- **Type Safety:** 100% TypeScript with strict mode enabled
- **Linting:** Pre-commit hooks enforcing ESLint, Prettier, Conventional Commits
- **CI/CD:** Automated testing and deployment on every PR

**NFR-12: Operational Excellence**
- **Health Checks:** /health endpoint exposing system status
- **Metrics:** Real-time metrics for error rates, response times, active users
- **Alerting:** Automated alerts for downtime, errors, performance degradation
- **Runbooks:** Documented procedures for common operational scenarios
- **Incident Response:** <15 minute response time for P1 incidents

## User Journeys

### Journey 1: Hard Money Lender - New Loan Origination

**Persona:** Sarah Martinez, Senior Loan Officer at Apex Capital
**Goal:** Originate a $250K fix-and-flip loan for a repeat borrower in 48 hours
**Context:** Borrower needs fast funding to close on distressed property auction

**Steps:**

1. **Receive Loan Inquiry** (Email/Phone)
   - Borrower (Mike Chen) emails loan request with property address and purchase details
   - Sarah uses Cmd+K command palette → "Create Loan"
   - Platform suggests existing borrower "Mike Chen" via smart search

2. **Pre-Qualify Borrower**
   - Sarah opens Mike's borrower profile (inline navigation)
   - Reviews past loan performance: 3 loans, all paid on time, avg ROI 18%
   - Checks current active loans: 1 loan with $180K outstanding, performing
   - Platform auto-calculates: Available borrowing capacity $400K ✅

3. **Create Loan Application**
   - Sarah clicks "New Loan" from Mike's profile
   - Platform pre-fills borrower details, suggests recent property search
   - Sarah enters: Property address, purchase price $200K, rehab budget $75K, ARV $350K
   - Platform auto-calculates: LTV 79% (against ARV), recommended loan $250K
   - Sarah uploads: Purchase agreement, contractor bid, comparable sales

4. **Run Automated Underwriting**
   - Platform triggers underwriting workflow
   - Auto-completes checklist: ✅ Credit check, ✅ Title search, ✅ Property valuation
   - Risk score: 72/100 (Good) - Flags: High neighborhood appreciation, borrower track record
   - Platform recommends: Approve at 10% rate, 6-month term, 2 points origination

5. **Structure Loan Terms**
   - Sarah adjusts terms: $250K principal, 10% rate, interest-only, 6-month balloon
   - Adds fees: 2 points ($5K), $500 processing, $350 inspection
   - Platform generates payment schedule: Monthly interest $2,083, payoff $255,850
   - Sarah assigns lender participation: Apex 60% ($150K), Partner Fund 40% ($100K)

6. **Submit for Approval**
   - Sarah clicks "Submit for Approval"
   - Platform notifies: Apex managing partner (James) via email + in-app notification
   - James receives notification, opens loan details in-app
   - Reviews underwriting report, payment schedule, borrower history
   - Clicks "Approve" → Loan status changes to "Approved - Pending Closing"

7. **Coordinate Closing**
   - Platform generates closing checklist: Insurance, title policy, signed note, disbursement instructions
   - Sarah uploads: Signed promissory note, title policy, insurance binder
   - Platform marks conditions complete ✅
   - Sarah clicks "Disburse Funds" → Platform generates wire instructions
   - $250K transferred via Stripe Connect to borrower's escrow account

8. **Loan Activated**
   - Platform updates loan status: "Active"
   - Generates first payment due date: 30 days from funding
   - Sends borrower welcome email: Payment portal link, schedule, contact info
   - Updates portfolio dashboard: +1 active loan, +$250K volume, portfolio LTV now 68%

**Outcome:** Loan originated in 36 hours from inquiry to funding
**Key UX Wins:** Smart suggestions, auto-calculations, inline approvals, automated notifications

---

### Journey 2: Borrower - Construction Draw Request

**Persona:** Mike Chen, Real Estate Investor
**Goal:** Request $25K draw for foundation and framing completion
**Context:** 45 days into 6-month fix-and-flip loan, contractor ready for next payment

**Steps:**

1. **Access Borrower Portal**
   - Mike receives email: "Your loan payment is current - request draw anytime"
   - Clicks link → Opens Everyday Lending borrower portal
   - Authenticates via Clerk (passwordless email link)
   - Dashboard shows: Active loan $250K, $200K disbursed, $50K available for draws

2. **Initiate Draw Request**
   - Mike clicks "Request Draw" button
   - Platform shows draw request form with progressive disclosure
   - Selects work category: "Foundation" ($15K) + "Framing" ($10K)
   - Total request: $25K (within available balance)

3. **Document Upload**
   - Mike uploads: Contractor invoice ($25K), progress photos (12 images), lien waiver
   - Platform validates: Invoice matches budget line items ✅
   - Platform flags: Inspector approval required (loan terms require inspection >$10K)

4. **Inspector Assignment**
   - Platform auto-assigns: Inspector (Lisa Torres) based on property location
   - Lisa receives notification: "New draw inspection - 123 Oak St, Fresno"
   - Platform suggests inspection times based on Lisa's calendar
   - Mike selects: "Thursday 2pm" → Lisa confirms

5. **Inspection Completed**
   - Lisa arrives Thursday, inspects work completion
   - Uses mobile app to: Upload photos, mark work items complete, recommend approval
   - Lisa's report: "Foundation and framing 100% complete per budget. Recommend full $25K approval."
   - Platform auto-submits draw for lender approval

6. **Lender Review & Approval**
   - Sarah (loan officer) receives notification: "Draw ready for review"
   - Opens draw request: Sees invoice, photos, inspector recommendation
   - Verifies: Budget remaining $50K, approved scope ✅
   - Clicks "Approve Draw" → Platform processes approval

7. **Draw Disbursement**
   - Platform checks: Mike's bank account verified via Plaid ✅
   - Initiates ACH transfer: $25K to Mike's linked account
   - Platform updates: Loan balance $225K → $250K (total), available draws $50K → $25K
   - Mike receives notification: "Draw approved - funds arriving in 1-2 business days"

8. **Payment Adjustment**
   - Platform recalculates monthly interest: $2,083 (unchanged - same principal)
   - Updates borrower dashboard: Loan progress 50% drawn, $25K remaining budget
   - Sends borrower report: Budget vs actual spend, project timeline

**Outcome:** Draw approved and funded in 3 days from request to bank transfer
**Key UX Wins:** Mobile-friendly inspector app, automated approval routing, real-time budget tracking

---

### Journey 3: Loan Servicer - Monthly Payment Processing

**Persona:** Jennifer Kim, Loan Servicer at Apex Capital
**Goal:** Process monthly payments for 50-loan portfolio with zero manual entry
**Context:** Beginning of month, payments due from 50 active borrowers

**Steps:**

1. **Automated Payment Collection**
   - Platform runs automated payment collection: 6am on 1st of month
   - 45 borrowers enrolled in autopay via Plaid ACH
   - Platform initiates ACH debits: $93,750 total across 45 loans
   - Real-time status tracking: 42 successful, 3 pending, 0 failed (7am update)

2. **Manual Payment Entry (5 loans)**
   - Jennifer logs in at 8am, opens "Payments Due" dashboard
   - Sees 5 loans pending: 3 in autopay processing, 2 not enrolled
   - Receives wire notification: $2,083 from borrower (Mike Chen)
   - Uses Cmd+K → "Record payment" → Enters Mike's loan ID, amount, wire reference
   - Platform auto-matches payment to loan, applies to interest, confirms receipt

3. **Payment Reconciliation**
   - Platform displays payment reconciliation dashboard
   - Shows: 46/50 payments received ($95,833), 4 pending (non-autopay borrowers)
   - Jennifer clicks "Export for QuickBooks" → Downloads CSV with GL codes
   - Imports to QuickBooks: 2-minute process (vs. 2 hours manual entry)

4. **Late Payment Management**
   - Next day (Day 2): 2 payments still missing
   - Platform auto-sends late notices: "Payment past due - pay now to avoid $50 late fee"
   - Borrower portal shows: "PAST DUE" banner with one-click pay button
   - One borrower pays immediately via credit card (Stripe)
   - Platform applies payment, removes late notice, sends confirmation

5. **Escalation for Delinquent Loan**
   - Day 5: 1 payment still outstanding (borrower John Davis)
   - Platform auto-applies $50 late fee to loan balance
   - Jennifer calls John: "Project delayed, need 2 weeks"
   - Jennifer clicks "Grant Extension" → Platform schedules new due date, waives late fee
   - Platform logs: Note "Extension granted - project delay", scheduled follow-up

6. **Participation Distribution**
   - After month-end close, Jennifer clicks "Distribute Participation Income"
   - Platform calculates: Total interest collected $93,750, Apex share 60% = $56,250, Partner Fund 40% = $37,500
   - Servicing fees: 0.5% ($469) to Apex
   - Platform initiates Stripe Connect transfers: $55,781 to Apex, $37,500 to Partner Fund
   - Partners receive: Email notification + monthly statement PDF

7. **Portfolio Dashboard Review**
   - Jennifer reviews monthly portfolio metrics
   - Dashboard shows: 50 active loans, $12.5M volume, 96% payment rate (48/50 on time)
   - Delinquency: 1 loan (2%), 0 loans 60+ days past due
   - Portfolio yield: 10.2% weighted average
   - Alerts: 3 loans approaching maturity (next 30 days), 2 loans eligible for payoff discount

**Outcome:** 50 payments processed with 5 minutes of manual work (96% automation)
**Key UX Wins:** Autopay enrollment, automated reconciliation, one-click distribution, proactive alerts

---

### Journey 4: Portfolio Manager - Risk Monitoring & Analysis

**Persona:** David Park, Portfolio Manager at Apex Capital
**Goal:** Identify portfolio risks and optimize lending strategy
**Context:** Weekly portfolio review to assess performance and adjust lending criteria

**Steps:**

1. **Dashboard Overview**
   - David opens portfolio dashboard: Real-time metrics load in 2 seconds
   - Overview: 127 active loans, $31.2M volume, avg LTV 72%, avg rate 10.4%
   - Status: 122 current (96%), 4 late (3%), 1 default (1%)
   - Trend: Origination volume +22% vs. prior month, delinquency rate stable at 3%

2. **Delinquency Deep Dive**
   - David clicks "Delinquency Drill-Down"
   - Platform shows: 4 loans 5-29 days late, 1 loan 60+ days (foreclosure track)
   - Filters by property type: 3 single-family, 1 commercial, 1 multi-family
   - Geographic pattern: All 5 loans in Fresno metro (out of 18 Fresno loans = 28% delinquency)
   - Alert: "Fresno concentration risk - 28% delinquency vs. 3% portfolio average"

3. **Risk Scenario Analysis**
   - David creates custom filter: "Fresno loans + LTV >75%"
   - Platform identifies: 12 loans meeting criteria, $3.1M exposure
   - David runs stress test: "What if Fresno property values drop 10%?"
   - Platform calculates: 8 loans would exceed 85% LTV, potential loss exposure $800K
   - Decision: Tighten Fresno lending criteria to max 70% LTV

4. **Lender Performance Analysis**
   - David switches to "Lender Analytics" tab
   - Reviews: Partner Fund performance (40% participation partner)
   - Metrics: $12.5M deployed, 10.8% yield, 2% delinquency (better than portfolio avg)
   - Platform highlights: Partner Fund loans have 1.2% lower delinquency (statistically significant)
   - Analysis: Partner Fund selects lower-LTV loans (avg 68% vs. 72%)

5. **Opportunity Identification**
   - David opens "Pipeline Analytics"
   - Platform shows: 23 loan applications pending, $5.8M requested
   - Approval rate: 68% (15/23 likely to close)
   - Bottleneck identified: 8 applications stuck in "Pending Title Search" (avg 7 days)
   - Action: David assigns additional title reviewer, creates alert for >5 day delays

6. **Automated Reporting**
   - David clicks "Generate Monthly Board Report"
   - Platform auto-generates: 15-page PDF with portfolio metrics, trends, risk analysis
   - Includes: Loan origination pipeline, delinquency trends, lender performance, geographic heat map
   - David reviews, adds executive summary, clicks "Share with Board"
   - Platform emails report to 5 board members with secure access links

**Outcome:** Portfolio risk assessment completed in 30 minutes (vs. 8 hours manual analysis)
**Key UX Wins:** Real-time dashboards, custom filters, automated stress testing, one-click reporting

---

### Journey 5: New User Onboarding - Lender Setup

**Persona:** Marcus Thompson, New Loan Officer (first day using platform)
**Goal:** Set up lender account and create first loan in <10 minutes
**Context:** Joining established Apex Capital team with existing platform deployment

**Steps:**

1. **Email Invitation**
   - Marcus receives email from Jennifer (admin): "You've been invited to Everyday Lending"
   - Clicks "Accept Invitation" → Opens platform onboarding
   - Creates account: Email + password via Clerk
   - MFA setup: Authenticator app for security

2. **Guided Tour (2 minutes)**
   - Platform launches interactive tutorial overlay
   - Highlights: Command palette (Cmd+K), keyboard shortcuts (J/K navigation), inline editing
   - Demonstrates: Create borrower, create loan, record payment
   - Marcus clicks "Start Using Platform" → Tutorial dismisses

3. **Explore Navigation**
   - Marcus presses Cmd+K: Command palette appears
   - Types "bor" → Platform suggests "Borrowers", "Create Borrower", "Borrower Reports"
   - Selects "Borrowers" → Opens borrower list (50 existing borrowers)
   - Marcus uses fuzzy search: Types "chen" → Finds "Mike Chen" instantly

4. **Create First Loan (Practice)**
   - Marcus presses Cmd+K → "Create Loan"
   - Platform opens loan creation form with helpful tooltips
   - Selects borrower: "Mike Chen" (from dropdown)
   - Platform pre-fills: Borrower details, suggests recent properties
   - Marcus enters: Loan amount $150K, rate 11%, term 12 months
   - Platform auto-calculates: Monthly payment $1,375, total repayment $166,500

5. **Discover Keyboard Shortcuts**
   - Marcus accidentally presses "?" key
   - Platform displays keyboard shortcut reference card
   - Learns: G+D (go to dashboard), G+L (go to loans), C+L (create loan)
   - Marcus practices shortcuts: G+D → Dashboard, G+L → Loans list

6. **First Real Loan Creation**
   - Marcus receives call from new borrower: "Maria Rodriguez, need $200K bridge loan"
   - Uses Cmd+K → "Create Borrower" → Enters Maria's info in form
   - Form validates in real-time: Email format ✅, phone format ✅, SSN format ✅
   - Clicks "Save" → Maria added to borrower list
   - Immediately clicks "Create Loan" from Maria's profile
   - Completes loan setup in 3 minutes with auto-calculations

7. **Get Help**
   - Marcus isn't sure how to add lender participation
   - Clicks "?" help icon in loan form → Contextual help panel appears
   - Shows: "Add Lender Participation" video tutorial (45 seconds)
   - Marcus follows tutorial, successfully adds Apex 70% + Partner Fund 30%

8. **Celebrate First Loan**
   - Marcus clicks "Create Loan" → Platform shows success animation
   - Dashboard updates: +1 loan in pipeline, Marcus visible in team activity feed
   - Jennifer (admin) receives notification: "Marcus created his first loan 🎉"
   - Jennifer sends Slack message: "Great job Marcus! Let me know if you need anything."

**Outcome:** Marcus productive within 10 minutes, created first loan without external help
**Key UX Wins:** Guided onboarding, contextual help, keyboard shortcuts, real-time validation, success feedback

## UX Design Principles

### Principle 1: Speed is a Feature

**Philosophy:** Every interaction should feel instantaneous. Latency is the enemy of user delight.

**Implementation:**
- **Optimistic UI updates:** Show changes immediately before server confirmation
- **Inline editing:** No modal dialogs for simple field changes
- **Smart caching:** Aggressive client-side caching with background revalidation
- **Lazy loading:** Progressive data loading to show critical information first
- **Real-time validation:** Instant feedback on form inputs without round-trips

**Success Metrics:** <500ms average interaction time, <2s page loads, <100ms UI response

---

### Principle 2: Keyboard-First Design

**Philosophy:** Power users should never need to touch the mouse. Keyboard navigation is faster, more predictable, and more accessible.

**Implementation:**
- **Global command palette (Cmd+K):** Access any feature or entity with keyboard
- **Vim-style navigation (J/K):** Scroll through lists and tables without arrows
- **Shortcuts for common actions:** G+D (dashboard), G+L (loans), C+L (create loan), /  (search)
- **Tab order optimization:** Logical tab flow through all interactive elements
- **Escape key affordance:** Always provide clear escape path from current context
- **? key for help:** Quick reference card for shortcuts available anywhere

**Success Metrics:** 80% of power users complete workflows without mouse, <30s average task time

---

### Principle 3: Contextual Intelligence

**Philosophy:** The platform should anticipate user needs and surface relevant information proactively.

**Implementation:**
- **Smart suggestions:** Suggest existing borrowers/properties when creating loans
- **Relationship navigation:** Show related entities (borrower → loans → payments) in sidepanels
- **Activity feeds:** Timeline of changes for audit and context
- **Contextual help:** Show relevant help content based on current task
- **Predictive search:** Fuzzy matching across all entities with ranking by relevance
- **Proactive alerts:** Surface risks, opportunities, and action items before users ask

**Success Metrics:** 70%+ of users use smart suggestions, 50% reduction in search time

---

### Principle 4: Progressive Disclosure

**Philosophy:** Show only what users need now. Advanced features should be available but not overwhelming.

**Implementation:**
- **Minimal forms:** Start with required fields, reveal optional fields on demand
- **Collapsible sections:** Hide advanced configuration behind "Show more" links
- **Tiered navigation:** Primary actions prominent, secondary actions in overflow menus
- **Staged workflows:** Break complex processes into digestible steps
- **Smart defaults:** Pre-fill sensible values based on context and past behavior

**Success Metrics:** New users complete first loan in <5 minutes, <3 clicks to common actions

---

### Principle 5: Feedback & Visibility

**Philosophy:** Users should always know what's happening, what happened, and what to do next.

**Implementation:**
- **Loading states:** Show skeleton screens and progress indicators for all async operations
- **Success feedback:** Animated confirmations for completed actions (loan created, payment received)
- **Error recovery:** Clear error messages with specific resolution steps
- **Status indicators:** Visual badges for loan status (Active, Delinquent, Paid Off)
- **Notifications:** Real-time in-app notifications for important events
- **Audit trails:** Complete history of who changed what, when

**Success Metrics:** <5% support tickets for "what happened" questions, 95% error self-resolution

---

### Principle 6: Data Relationships First

**Philosophy:** Data is interconnected. The interface should mirror these relationships naturally.

**Implementation:**
- **Bidirectional navigation:** Click borrower from loan, see all loans from borrower
- **Inline linked entities:** Hover over borrower name shows quick preview card
- **Relationship graphs:** Visual representation of lender participations and property chains
- **Unified search:** Find loans by borrower name, property address, or loan ID
- **Smart filtering:** Filter loans by related entity attributes (e.g., "loans in Fresno")

**Success Metrics:** 80% of users navigate via relationships, 40% reduction in search queries

---

### Principle 7: Consistency & Predictability

**Philosophy:** Learn once, apply everywhere. UI patterns should be consistent across all features.

**Implementation:**
- **Unified component library:** Shadcn UI components with custom lending-specific extensions
- **Standard layouts:** Consistent header, sidebar, content area, and action buttons
- **Predictable actions:** Primary action always top-right, destructive actions require confirmation
- **Color semantics:** Blue for primary, red for destructive, yellow for warnings, green for success
- **Icon standards:** Consistent iconography using Lucide icons

**Success Metrics:** 90% task completion rate without training, <2% misclick rate

---

### Principle 8: Mobile & Responsive

**Philosophy:** Core workflows must be functional on tablets and mobile devices, especially for field inspectors and borrowers.

**Implementation:**
- **Responsive layouts:** Fluid grids that adapt to viewport size
- **Touch-friendly targets:** Minimum 44x44px tap targets on mobile
- **Mobile-optimized workflows:** Draw inspection app with photo upload and signature capture
- **Offline capability:** Service workers cache critical data for offline access
- **Native-like interactions:** Swipe gestures for list actions (swipe to archive, delete)

**Success Metrics:** 60%+ mobile task completion rate, 95% mobile user satisfaction

---

### Principle 9: Accessibility & Inclusivity

**Philosophy:** The platform must be usable by everyone, regardless of ability or device.

**Implementation:**
- **WCAG 2.1 AA compliance:** Screen reader support, keyboard navigation, sufficient contrast
- **Semantic HTML:** Proper heading hierarchy, ARIA labels, focus indicators
- **Color-blind friendly:** Use patterns and labels in addition to color for status
- **Scalable text:** Support browser zoom up to 200% without breaking layout
- **Error accessibility:** Announce form validation errors to screen readers

**Success Metrics:** Pass WCAG automated and manual audits, zero accessibility-related support tickets

---

### Principle 10: Delight in the Details

**Philosophy:** Small moments of delight create emotional connection and brand loyalty.

**Implementation:**
- **Micro-animations:** Smooth transitions for state changes (loan status updates)
- **Success celebrations:** Confetti animation for first loan creation, payoff completion
- **Empty states:** Helpful, friendly messages with clear next steps (not blank screens)
- **Easter eggs:** Hidden shortcuts and features for power users to discover
- **Personalization:** Remember user preferences (table column order, filter defaults)
- **Humanized copy:** Conversational, helpful tone in all messaging

**Success Metrics:** 85%+ Net Promoter Score, "delightful" in 30%+ user feedback

## Epics

### Epic Overview

The platform will be delivered in **6 major epics** spanning 3-4 months, with each epic delivering significant standalone value. Epics are sequenced to establish foundation first, then layer on advanced capabilities.

---

### Epic 1: Foundation & Core Infrastructure (Weeks 1-2)

**Goal:** Establish production-ready infrastructure, authentication, database, and monitoring

**Value Delivered:** Secure, scalable platform foundation ready for feature development

**Story Count:** 8 stories

**Key Capabilities:**
- Production database setup with migrations and seeding
- Clerk authentication with MFA and role-based access control
- Comprehensive error monitoring (Sentry) and analytics (PostHog)
- API infrastructure with error handling and rate limiting (Arcjet)
- Health checks and operational runbooks

**Success Criteria:**
- ✅ 99.9% uptime SLA achievable
- ✅ Full authentication flow functional
- ✅ Monitoring dashboards operational
- ✅ API performance <500ms P95

**Dependencies:** None

---

### Epic 2: Attio-Style UX System (Weeks 2-3)

**Goal:** Implement keyboard-first navigation, command palette, and core interaction patterns

**Value Delivered:** Blazing-fast, delightful user experience matching Attio quality bar

**Story Count:** 10 stories

**Key Capabilities:**
- Global command palette (Cmd+K) with fuzzy search
- Keyboard shortcuts for all primary actions
- Inline editing with optimistic updates
- Smart suggestions and contextual intelligence
- Loading states, error handling, success feedback
- Responsive layouts for tablet/mobile

**Success Criteria:**
- ✅ <500ms interaction time for all CRUD operations
- ✅ Keyboard shortcuts functional for all workflows
- ✅ Command palette accessible from anywhere
- ✅ Mobile core workflows functional

**Dependencies:** Epic 1 (infrastructure)

---

### Epic 3: Complete Loan Lifecycle Management (Weeks 3-5)

**Goal:** Build end-to-end loan workflow from application → disbursement → servicing → payoff

**Value Delivered:** Lenders can manage entire loan process without leaving platform

**Story Count:** 15 stories

**Key Capabilities:**
- Digital loan application with document upload
- Automated underwriting with risk scoring
- Loan structuring and payment schedule generation
- Multi-lender participation allocation
- Disbursement workflow with checklist
- Loan status tracking and transitions
- Payoff quote generation and closure

**Success Criteria:**
- ✅ Complete loan origination in <48 hours
- ✅ Automated calculations for LTV, DSCR, payments
- ✅ Multi-lender support functional
- ✅ Zero manual calculation errors

**Dependencies:** Epic 2 (UX system)

---

### Epic 4: Payment Automation & Stripe/Plaid Integration (Weeks 5-7)

**Goal:** Automate payment collection, processing, and reconciliation via Stripe Connect and Plaid

**Value Delivered:** 90%+ of payments processed automatically with zero manual entry

**Story Count:** 12 stories

**Key Capabilities:**
- Stripe Connect lender onboarding and account linking
- Plaid borrower bank verification and ACH setup
- Automated recurring payment collection
- Payment reconciliation and waterfall application
- Late fee calculation and assessment
- Payment retry logic for failures
- Participation distribution automation
- QuickBooks/Xero export readiness

**Success Criteria:**
- ✅ 90%+ autopay enrollment rate
- ✅ <5 minutes manual work per 50 payments
- ✅ Zero payment posting errors
- ✅ Same-day participation distribution

**Dependencies:** Epic 3 (loan lifecycle)

---

### Epic 5: Construction Draw Management (Weeks 7-9)

**Goal:** Enable inspection-based draw workflows for construction loans

**Value Delivered:** Borrowers can request draws, inspectors approve, lenders disburse—all in-platform

**Story Count:** 10 stories

**Key Capabilities:**
- Borrower draw request portal with document upload
- Automated inspector assignment and scheduling
- Mobile inspector app with photo upload and reporting
- Draw approval workflow with lender authorization
- Lien waiver and AIA document tracking
- Budget vs actual spend reporting
- Draw disbursement via Plaid/Stripe

**Success Criteria:**
- ✅ Draw approved in <3 days from request
- ✅ Inspector mobile app functional
- ✅ Budget tracking accurate
- ✅ Automated disbursement

**Dependencies:** Epic 4 (payment automation)

---

### Epic 6: Portfolio Analytics & Risk Management (Weeks 9-12)

**Goal:** Provide real-time portfolio dashboards, risk analysis, and automated reporting

**Value Delivered:** Lenders make data-driven decisions using platform insights

**Story Count:** 11 stories

**Key Capabilities:**
- Real-time portfolio dashboard with key metrics
- Delinquency monitoring and escalation
- Geographic concentration analysis with heat maps
- Lender performance analytics and ROI tracking
- Custom filters and saved views
- Automated board report generation
- Risk scenario modeling (stress testing)
- Pipeline analytics and bottleneck identification

**Success Criteria:**
- ✅ Dashboard loads in <3 seconds
- ✅ Real-time metric updates
- ✅ Custom reporting functional
- ✅ Risk alerts automated

**Dependencies:** Epic 3 (loan data), Epic 4 (payment data)

---

### Epic 7: Testing, Documentation & Polish (Weeks 10-12, parallel with Epic 6)

**Goal:** Achieve production-ready quality with comprehensive testing and documentation

**Value Delivered:** 80%+ test coverage, full API docs, deployment confidence

**Story Count:** 8 stories

**Key Capabilities:**
- Comprehensive unit tests (80%+ coverage)
- Integration tests for API workflows
- E2E tests for critical user journeys (Playwright)
- API documentation (OpenAPI 3.0 auto-generated)
- User onboarding flow and tutorials
- Performance optimization and caching
- Security audit and penetration testing
- Deployment automation and rollback

**Success Criteria:**
- ✅ 80%+ test coverage
- ✅ All E2E tests passing
- ✅ API docs complete
- ✅ Zero critical security vulnerabilities

**Dependencies:** All other epics (testing/documentation layer)

---

### Epic Dependency Graph

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

### Epic Delivery Timeline

| Week | Epic | Deliverable |
|------|------|-------------|
| 1-2 | Epic 1 | Foundation complete, auth working |
| 2-3 | Epic 2 | UX system functional, command palette live |
| 3-5 | Epic 3 | Loan lifecycle end-to-end working |
| 5-7 | Epic 4 | Payment automation live, Stripe/Plaid integrated |
| 7-9 | Epic 5 | Draw management functional |
| 9-12 | Epic 6 | Portfolio analytics complete |
| 10-12 | Epic 7 | Full test suite + docs ready for production |

**MVP Readiness:** End of Week 12 (3 months)

---

> **Note:** Detailed epic breakdowns with full user stories, acceptance criteria, and technical notes are available in `/docs/epics.md`

## Out of Scope

The following features are intentionally deferred to **post-MVP phases** to maintain 3-4 month timeline:

### Deferred to Phase 2 (Month 5-6)

- **Borrower self-service portal:** Full borrower dashboard with payment history, document upload, support tickets
- **Document generation:** Auto-generation of promissory notes, mortgages, and closing documents
- **E-signature integration:** DocuSign/HelloSign integration for digital loan document signing
- **Advanced reporting:** Custom report builder with drag-and-drop interface
- **Email campaigns:** Automated email marketing for portfolio growth
- **Mobile native apps:** iOS/Android native applications (mobile web sufficient for MVP)

### Deferred to Phase 3 (Month 7-12)

- **Multi-entity support:** Management companies servicing multiple lender organizations
- **White-label capabilities:** Customizable branding for enterprise clients
- **Title company integration:** API integrations with title companies for automated title searches
- **Escrow service integration:** Direct integration with escrow services for closing coordination
- **Automated valuation models (AVM):** Integration with Zillow/CoreLogic for automated property valuations
- **Credit bureau integration:** Direct credit pull integration (Experian, TransUnion, Equifax)
- **Accounting system sync:** Real-time two-way sync with QuickBooks/Xero (CSV export sufficient for MVP)
- **Advanced AI features:** Predictive default modeling, automated underwriting recommendations
- **Blockchain/Web3:** Tokenized loan participations, smart contract execution

### Explicitly Out of Scope

- **Consumer lending:** Platform focused exclusively on commercial real estate lending
- **Regulatory compliance automation:** TILA-RESPA, HMDA reporting (lenders responsible for compliance)
- **Servicing for other lenders:** Platform designed for lenders servicing their own loans only
- **Loan sales/trading:** Secondary market functionality not included
- **International lending:** US-based lending only, no multi-currency or international compliance

## Assumptions and Dependencies

### Technical Assumptions

1. **Vercel infrastructure:** Platform will be deployed on Vercel with PostgreSQL (Neon) database
2. **Clerk authentication:** Clerk will provide sufficient authentication and user management capabilities
3. **Stripe Connect availability:** Stripe Connect is approved and available for lending use case
4. **Plaid reliability:** Plaid ACH integration is stable and meets payment processing requirements
5. **Third-party uptime:** External services (Clerk, Stripe, Plaid, Neon) maintain 99.9%+ uptime

### Business Assumptions

1. **Target users are tech-savvy:** Lenders comfortable with modern SaaS applications
2. **Lending volume sufficient:** Target lenders manage 20+ active loans to justify platform adoption
3. **Payment automation acceptable:** Borrowers willing to connect bank accounts for autopay
4. **MVP scope adequate:** Core workflows sufficient to attract 5-10 beta lenders
5. **3-4 month timeline achievable:** Development team capacity supports aggressive timeline

### User Research Assumptions

1. **Attio UX resonates:** Keyboard-first, fast interactions appeal to target users
2. **Portfolio analytics valued:** Lenders will use dashboards for decision-making
3. **Mobile sufficient for MVP:** Mobile web functional enough; native apps not required initially
4. **Draw management differentiator:** Construction loan draw workflow is competitive advantage

### External Dependencies

1. **Stripe Connect approval:** Stripe approves platform for Connect integration (typically 2-4 weeks)
2. **Plaid account setup:** Plaid approves lending use case and provides production access
3. **Design assets:** UI/UX assets (icons, illustrations) available or created during development
4. **Test lenders:** 2-3 friendly lenders available for beta testing starting Week 8
5. **Legal review:** Terms of service, privacy policy, and lending disclaimers reviewed by counsel

### Data Migration Dependencies

1. **Legacy data availability:** If migrating from existing systems, data provided in structured format
2. **Borrower/lender consent:** Existing users consent to migration to new platform
3. **Historical payment data:** Complete payment history available for accurate portfolio analytics

---

## Next Steps

### Immediate Actions

Since this is a **Level 4 platform project**, the next critical step is **architecture planning** before development begins.

**1. Architecture Workflow (REQUIRED - Week 0)**

Start a new context window with the **architect** and provide:
- This PRD: `/docs/PRD.md`
- Epic structure: `/docs/epics.md` (to be created)
- Deep dive analysis: `/reports/deep-dive-analysis.md`
- Project workflow analysis: `/docs/project-workflow-analysis.md`

**Ask architect to:**
- Run `architecture` workflow
- Design system architecture with service layers, API contracts, and data flow
- Generate solution-architecture.md with technical specifications
- Create database migration strategy and schema evolution plan
- Define API patterns and error handling conventions
- Specify caching strategy and performance optimizations

**2. UX Specification Workflow (HIGHLY RECOMMENDED - Week 0-1)**

Given the heavy emphasis on **Attio-style UX**, create detailed UX specification:
- Run `plan-project` workflow → Select "UX specification"
- Input: PRD, epics, solution-architecture (once available)
- Output: ux-specification.md with:
  - Information architecture and navigation patterns
  - Component library specifications (Shadcn extensions)
  - Interaction patterns for keyboard shortcuts and command palette
  - Responsive breakpoints and mobile adaptations
  - Animation and micro-interaction guidelines
  - Design tokens for consistency

**3. Detailed User Story Generation (Week 1)**

After architecture complete:
- Run `generate-stories` workflow
- Input: epics.md + solution-architecture.md
- Output: user-stories.md with:
  - All 74 stories with full acceptance criteria
  - Technical implementation notes for each story
  - API endpoints and database changes required
  - Testing requirements (unit, integration, E2E)

**4. Technical Design Documents (Week 1)**

Create detailed technical specs:
- **Database schema enhancements:** New tables, indexes, constraints for Epic 1-7 features
- **API specifications:** OpenAPI 3.0 spec for all new endpoints
- **Integration architecture:** Stripe Connect, Plaid, Clerk integration patterns
- **Testing strategy:** Unit, integration, E2E test approach with coverage targets

**5. Development Environment Setup (Week 1)**

Prepare repository for greenfield build:
- Set up feature branches for each epic
- Configure CI/CD pipeline for automated testing
- Establish code review process and PR templates
- Create sprint plan with epic sequencing
- Set up project management board (Linear, Jira, GitHub Projects)

**6. Stakeholder Review (Week 1)**

Before development begins:
- Review PRD with product stakeholders
- Validate epic priorities and timeline
- Confirm MVP scope and out-of-scope deferrals
- Align on success metrics and launch criteria
- Secure commitment from beta test lenders

### Complete Next Steps Checklist

#### Phase 1: Architecture and Design (Week 0-1)

- [ ] **Run architecture workflow** (REQUIRED)
  - Command: `workflow architecture`
  - Input: PRD.md, epics.md, deep-dive-analysis.md
  - Output: solution-architecture.md
  - Timeline: Week 0 (1-2 days)

- [ ] **Run UX specification workflow** (HIGHLY RECOMMENDED)
  - Command: `workflow plan-project` → "UX specification"
  - Input: PRD.md, epics.md, solution-architecture.md
  - Output: ux-specification.md
  - Timeline: Week 0-1 (2-3 days)
  - Optional: AI Frontend Prompt for rapid prototyping

- [ ] **Generate detailed user stories**
  - Command: `workflow generate-stories`
  - Input: epics.md + solution-architecture.md
  - Output: user-stories.md with full acceptance criteria
  - Timeline: Week 1 (1 day)

#### Phase 2: Technical Planning (Week 1)

- [ ] **Create database migration strategy**
  - Analyze existing schema (Schema.ts)
  - Design new tables for Epic 1-7 features
  - Plan migration rollout and rollback procedures

- [ ] **Design API specifications**
  - Define RESTful endpoints for all features
  - Create OpenAPI 3.0 spec
  - Document request/response schemas
  - Define error codes and handling patterns

- [ ] **Define integration architecture**
  - Stripe Connect: onboarding flow, payment processing, webhooks
  - Plaid: bank linking, ACH setup, balance verification
  - Clerk: MFA, RBAC, org management
  - Sentry/PostHog: error tracking, analytics events

- [ ] **Create testing strategy**
  - Unit test approach (Vitest) with 80%+ coverage target
  - Integration test patterns for API endpoints
  - E2E test suite (Playwright) for critical user journeys
  - Performance testing approach (load, stress)

#### Phase 3: Development Preparation (Week 1-2)

- [ ] **Set up development environment**
  - Configure feature branches for each epic
  - Set up CI/CD pipeline (GitHub Actions)
  - Establish pre-commit hooks (ESLint, Prettier, tests)
  - Create PR templates and review checklist

- [ ] **Create sprint plan**
  - Epic 1-7 sequencing with 2-week sprints
  - Story prioritization within each epic
  - Resource allocation (frontend, backend, fullstack)
  - Risk mitigation for dependencies (Stripe/Plaid approval)

- [ ] **Establish monitoring and metrics**
  - Configure Sentry for error tracking
  - Set up PostHog for user analytics
  - Define custom events for key user actions
  - Create Better Stack dashboards for operational metrics
  - Set up Checkly for uptime monitoring

- [ ] **Prepare beta testing program**
  - Recruit 2-3 friendly lenders for beta (Week 8 target)
  - Create beta feedback collection process
  - Define beta exit criteria and production launch gates

#### Phase 4: Stakeholder Alignment (Week 1)

- [ ] **Review PRD with stakeholders**
  - Walk through description, goals, requirements
  - Validate epic priorities and MVP scope
  - Confirm 3-4 month timeline achievability
  - Secure buy-in for out-of-scope deferrals

- [ ] **Align on success metrics**
  - Confirm Goal 1-7 metrics are measurable
  - Establish data collection approach
  - Define launch criteria (e.g., "80% test coverage + 2 beta lenders")

- [ ] **Legal and compliance review**
  - Terms of service and privacy policy draft
  - Lending disclaimers and risk disclosures
  - GDPR compliance checklist
  - Stripe/Plaid terms acceptance

---

## Document Status

- [x] Goals and context validated
- [x] All functional requirements defined (30+ FRs)
- [x] Non-functional requirements comprehensive (12 NFRs)
- [x] User journeys cover all major personas (5 journeys)
- [x] UX principles established (10 principles)
- [x] Epic structure approved for phased delivery (7 epics, 74 stories)
- [x] Out of scope documented
- [x] Assumptions and dependencies identified
- [x] Next steps checklist complete
- [x] Ready for architecture phase (`/docs/epics.md` complete with 74 stories)

---

_This PRD adapts to project level 4 - providing comprehensive detail for platform-scale development._

**PRD Version:** 1.0
**Last Updated:** October 11, 2025
**Status:** Complete - Ready for Architecture Phase
