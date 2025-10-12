# Agent Notes - Everyday Lending

## Project Overview

**Project**: Everyday Lending Platform
**Type**: Next.js 15+ SaaS Application
**Purpose**: Loan management system for lenders, borrowers, and properties
**Tech Stack**: Next.js, TypeScript, Tailwind CSS, Shadcn UI, Drizzle ORM, PostgreSQL

## Critical Information for Future Sessions

### BMAD Integration (October 11, 2025)

The Everyday Lending project is now a **BMAD-enabled development workspace**. BMAD v6's multi-agent ecosystem orchestrates development across Frontend, Backend, Database, and UX streams.

**BMAD Status**: Phase 1 Complete ✅
- **Installation**: `/Users/adamjudeh/everyday-lending/bmad/`
- **Modules**: Core, BMM, BMB, CIS
- **User**: adam
- **Language**: English

**Key Documentation**:
- `bmad-workflow.md` - How to use BMAD commands
- `agent-interaction-guide.md` - Which agents to use when
- `cis-usage-guide.md` - Creative Intelligence Suite guide
- `bmad-integration-summary.md` - Complete integration status

**Next Steps**:
- Run deep dive analysis (`npx bmad analyze --mode deep`)
- Execute greenfield build mode
- Activate continuous improvement cluster
- Integrate CIS workflows

### Project Structure

```
everyday-lending/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/    # Internationalized routes
│   │   └── api/         # API route handlers
│   ├── components/       # React components
│   │   ├── borrowers/
│   │   ├── lenders/
│   │   ├── loans/
│   │   ├── properties/
│   │   ├── ui/          # Shadcn components
│   │   └── layout/
│   ├── hooks/           # Custom React hooks
│   ├── libs/            # Library configurations
│   ├── models/          # Database models (Drizzle)
│   ├── validations/     # Zod schemas
│   └── utils/
├── bmad/                # BMAD v6 installation
├── BMAD-METHOD/         # BMAD framework source
├── migrations/          # Database migrations
├── public/              # Static assets
├── tests/
│   ├── e2e/            # Playwright tests
│   └── integration/     # Integration tests
└── .cursor/
    ├── notes/          # This file and other docs
    ├── rules/          # Agent behavior rules
    ├── tools/          # Development tools
    └── docs/           # Technical specifications
```

### User Preferences

- **Name**: Adam
- **Preferred Tools**: Cursor IDE, BMAD Method, Shadcn UI (not emojis for agent icons)
- **Development Style**: Methodical, plan-ahead, test-driven
- **Documentation**: Comprehensive, maintained in `.cursor/notes/`

### Technology Decisions

#### Frontend
- **Framework**: Next.js 15+ with App Router
- **UI Library**: Shadcn UI components
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks, custom hooks
- **Forms**: React Hook Form
- **Validation**: Zod
- **i18n**: next-intl with Crowdin integration

#### Backend
- **Runtime**: Node.js 22+
- **API**: Next.js API routes (App Router style)
- **Authentication**: Clerk
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Local DB**: PGlite
- **Production DB**: Prisma Postgres

#### Testing
- **Unit Tests**: Vitest
- **E2E Tests**: Playwright
- **Component Tests**: Storybook
- **Coverage**: Codecov

#### DevOps
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Lefthook
- **Commits**: Conventional Commits with Commitizen
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry, PostHog, Better Stack
- **Security**: Arcjet

### Domain Model

#### Core Entities
1. **Borrowers** - Loan applicants
2. **Lenders** - Capital providers
3. **Loans** - Loan agreements between borrowers and lenders
4. **Properties** - Collateral for loans

#### Database Schema
Located at: `src/models/Schema.ts`

Key tables:
- `borrowers` - Borrower information
- `lenders` - Lender information
- `loans` - Loan details and terms
- `properties` - Property information
- `counter` - Demo/example table

### Development Workflow

#### With BMAD (Recommended)
1. **Ideation**: Use CIS agents (Carson, Maya, Victor)
2. **Analysis**: BMM Analyst (brainstorm-project, research)
3. **Planning**: BMM PM (plan-project)
4. **Architecture**: BMM Architect (solution-architecture, tech-spec)
5. **Implementation**: BMM SM (create-story) → BMM Dev (implement-story)

#### Without BMAD (Traditional)
1. Requirements gathering
2. Design mockups
3. Technical specification
4. Implementation
5. Testing
6. Review

### Important Patterns

#### File Organization
- Keep files under 500 lines
- Single Responsibility Principle
- Separate concerns (logic, presentation, data)
- Clear naming conventions

#### API Routes
Located in: `src/app/api/`
Pattern:
```
api/
├── borrowers/
│   ├── route.ts        # GET (list), POST (create)
│   └── [id]/
│       └── route.ts    # GET, PATCH, DELETE
```

#### Components
Pattern: Feature-based organization
- `components/borrowers/` - Borrower-specific components
- `components/ui/` - Reusable UI components (Shadcn)
- `components/layout/` - Layout components

#### Hooks
Custom hooks in `src/hooks/`:
- `use-borrowers-client.ts`
- `use-lenders-client.ts`
- `use-loans-client.ts`
- `use-properties-client.ts`
- `use-dashboard-stats.ts`

### Testing Strategy

#### Unit Tests
- Colocated with source files (`*.test.ts`, `*.test.tsx`)
- Run with: `npm run test`
- Framework: Vitest

#### Integration Tests
- Located in: `tests/integration/`
- Pattern: `*.spec.ts`
- Framework: Playwright

#### E2E Tests
- Located in: `tests/e2e/`
- Pattern: `*.e2e.ts`
- Framework: Playwright
- Run with: `npm run test:e2e`

#### Monitoring Tests
- Pattern: `*.check.e2e.ts`
- Service: Checkly
- Runs in production at regular intervals

### Environment Variables

#### Required
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication
- `CLERK_SECRET_KEY` - Clerk server-side
- `DATABASE_URL` - PostgreSQL connection string
- `ARCJET_KEY` - Security and bot protection

#### Optional
- `NEXT_PUBLIC_SENTRY_DSN` - Error monitoring
- `NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN` - Logging
- `CODECOV_TOKEN` - Code coverage
- `CHECKLY_API_KEY` - Monitoring

### Known Issues / Considerations

1. **Authentication**: Using Clerk for full auth system
2. **i18n**: English and French currently supported
3. **Database**: PGlite for local dev, Prisma Postgres for production
4. **Migrations**: Auto-run on Next.js initialization via instrumentation.ts

### Development Commands

```bash
# Development
npm run dev                 # Start dev server (localhost:3000)

# Testing
npm run test               # Unit tests
npm run test:e2e          # E2E tests
npm run storybook         # Component development

# Building
npm run build             # Production build
npm run start             # Production server

# Database
npm run db:generate       # Generate migrations
npm run db:migrate        # Run migrations
npm run db:studio         # Open Drizzle Studio

# Code Quality
npm run lint              # Check linting
npm run lint:fix          # Fix linting issues
npm run check:types       # TypeScript check
npm run check:deps        # Check unused dependencies
npm run check:i18n        # Validate translations

# BMAD (from BMAD-METHOD directory)
cd BMAD-METHOD
npx bmad analyze --mode deep        # Deep analysis
npx bmad dev --mode greenfield      # Greenfield proposals
npx bmad start --cluster everyday-lending  # Continuous improvement
agent [module]/[agent-name]         # Invoke agent
```

### Pointers to Other Documentation

#### BMAD Documentation
- **Workflow Guide**: `.cursor/notes/bmad-workflow.md`
- **Agent Guide**: `.cursor/notes/agent-interaction-guide.md`
- **CIS Guide**: `.cursor/notes/cis-usage-guide.md`
- **Integration Summary**: `.cursor/notes/bmad-integration-summary.md`
- **Analysis Results**: `.cursor/notes/bmad-analysis-results.md`
- **Greenfield Decisions**: `.cursor/notes/greenfield-decisions.md`

#### Project Documentation
- **Project Checklist**: `.cursor/notes/project_checklist.md` (to be created)
- **Notebook**: `.cursor/notes/notebook.md` (to be created)
- **README**: `/README.md` - Main project documentation

#### BMAD Framework
- **BMM Workflows**: `/bmad/bmm/workflows/README.md`
- **CIS Module**: `/bmad/cis/readme.md`
- **BMad Method**: `/BMAD-METHOD/README.md`

### Quick Start for New Agent Sessions

1. **Read this file** to understand project state
2. **Check BMAD status** in `bmad-integration-summary.md`
3. **Review project checklist** (when created) for current tasks
4. **Check notebook** (when created) for recent findings
5. **Understand the phase**: Are we analyzing, planning, architecting, or implementing?

### Project Goals

**Primary Goal**: Build a comprehensive lending management platform

**Key Features**:
- Borrower management and profiles
- Lender portfolio management
- Loan origination and tracking
- Property valuation and collateral tracking
- Credit checks and risk assessment
- Payment processing
- Reporting and analytics

**Non-Functional Requirements**:
- Secure (Arcjet protection)
- Performant (optimized queries)
- Accessible (WCAG compliance)
- International (multi-language)
- Tested (comprehensive test coverage)
- Monitored (error tracking, logging)

### Current Phase

**Status**: BMAD Integration Complete (Phase 1)
**Next**: Deep Dive Analysis (Phase 2)

The project is in a transitional phase where we're setting up BMAD's multi-agent orchestration system to analyze the existing codebase and propose improvements through greenfield architecture proposals.

### Communication Preferences

- Be methodical and plan ahead
- Think through second-order effects
- Document decisions thoroughly
- Test incrementally
- Update documentation frequently
- Use BMAD agents for complex decisions
- Consult CIS agents for creative challenges

---

*Last Updated: October 11, 2025*
*Session: BMAD v6 Integration*
*Agent: Assistant*
