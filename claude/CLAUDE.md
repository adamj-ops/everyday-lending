# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Everyday Lending Platform** - A comprehensive loan management system for lenders, borrowers, and properties. Built with Next.js 15+, TypeScript, Tailwind CSS 4, Drizzle ORM, and PostgreSQL. Includes BMAD v6 multi-agent methodology for development orchestration.

## Essential Development Commands

### Development
```bash
npm run dev                 # Start dev server with PGlite and Spotlight (http://localhost:3000)
npm run build               # Production build (runs type checking)
npm run start               # Start production server
```

### Testing
```bash
npm run test                # Unit tests with Vitest
npm run test:e2e           # E2E tests with Playwright (auto-starts server)
npx playwright install     # Install browsers (first time only)
npm run storybook          # Start Storybook on port 6006
npm run storybook:test     # Run Storybook tests
```

### Database
```bash
npm run db:generate        # Generate migration from schema changes
npm run db:migrate         # Run migrations manually (auto-runs in dev via instrumentation.ts)
npm run db:studio          # Open Drizzle Studio (https://local.drizzle.studio)
```

### Code Quality
```bash
npm run lint               # Check linting issues
npm run lint:fix           # Auto-fix linting issues
npm run check:types        # TypeScript type checking
npm run check:deps         # Check for unused dependencies (Knip)
npm run check:i18n         # Validate i18n translations
npm run commit             # Interactive commit message (Commitizen)
```

### Single Test Execution
```bash
# Unit test
npx vitest run path/to/file.test.ts

# E2E test
npx playwright test path/to/file.e2e.ts
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15+ with App Router and React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with Shadcn UI components
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Clerk (sign-in, sign-up, MFA, social auth)
- **Monitoring**: Sentry (errors), PostHog (analytics), Better Stack (logs), Checkly (uptime)
- **Security**: Arcjet (bot detection, WAF, rate limiting)
- **Testing**: Vitest (unit), Playwright (E2E), Storybook (components)
- **i18n**: next-intl with Crowdin integration

### Database Architecture

**Primary Schema**: `src/models/Schema.ts`

**Core Entities**:
- `borrowers` - Loan applicants with credit scores and employment data
- `lenders` - Capital providers with investment capacity
- `loans` - Loan agreements linking borrowers, lenders, and properties
- `properties` - Real estate collateral with valuation data
- `payments` - Payment history and breakdowns
- `rehab_draws` - Construction loan draw requests
- `lender_participations` - Many-to-many loan syndication
- `fee_types` - Configurable fee definitions
- `servicing_income` - Fee income tracking

**Connection**: Singleton pattern in `src/libs/DB.ts` prevents multiple instances during hot reload.

**Migrations**:
- Generated via `npm run db:generate` from schema changes
- Auto-applied on Next.js startup via `src/instrumentation.ts` (currently disabled in dev)
- Manual application via `npm run db:migrate`

### API Routes

**Pattern**: REST-style with App Router conventions

```
/api/{entity}         # GET (list with search), POST (create)
/api/{entity}/[id]    # GET (single), PATCH (update), DELETE (delete)
```

**Implemented Routes**:
- `/api/borrowers`, `/api/borrowers/[id]`
- `/api/lenders`, `/api/lenders/[id]`
- `/api/loans`, `/api/loans/[id]`
- `/api/properties`, `/api/properties/[id]`

**Common Features**:
- Zod validation for request bodies
- Search via `?search=term` query parameter
- Error handling with descriptive messages
- Type-safe with Drizzle's inferred types

### Frontend Structure

**App Router Layout**:
```
src/app/[locale]/
├── (auth)/               # Protected routes requiring authentication
│   ├── dashboard/        # Main app pages (borrowers, lenders, loans, properties)
│   └── (center)/         # Centered layouts (sign-in, sign-up)
├── (marketing)/          # Public marketing pages
└── api/                  # API route handlers (not in [locale])
```

**Component Organization**:
```
src/components/
├── ui/                   # Shadcn UI components (button, form, table, etc.)
├── borrowers/            # Borrower-specific components
├── lenders/              # Lender-specific components
├── loans/                # Loan-specific components
├── properties/           # Property-specific components
└── layout/               # Layout components (header, footer, sidebar)
```

**Custom Hooks** (`src/hooks/`):
- `use-borrowers-client.ts` - Borrower CRUD operations
- `use-lenders-client.ts` - Lender CRUD operations
- `use-loans-client.ts` - Loan CRUD operations
- `use-properties-client.ts` - Property CRUD operations
- `use-dashboard-stats.ts` - Dashboard statistics

### BMAD Integration

**BMAD v6** (Business Model Automation Development) is integrated for multi-agent development workflows.

**Location**: `/BMAD-METHOD/` (framework source), `/bmad/` (project config)

**Key Agents**:
- **Analyst** - Research and product briefs (`@bmad/bmm/agents/analyst`)
- **PM** - Product planning and PRDs (`@bmad/bmm/agents/pm`)
- **Architect** - Solution architecture (`@bmad/bmm/agents/architect`)
- **SM** - Sprint management and story creation (`@bmad/bmm/agents/sm`)
- **Dev** - Implementation (`@bmad/bmm/agents/dev`)
- **UX Expert** - UX design (`@bmad/bmm/agents/ux-expert`)
- **CIS Agents** - Creative Intelligence Suite (brainstorming, design thinking, problem solving)

**Documentation**:
- `.cursor/notes/bmad-workflow.md` - Daily usage guide
- `.cursor/notes/agent-interaction-guide.md` - Agent selection guide
- `.cursor/notes/bmad-quick-reference.md` - Command reference

**Reference in Cursor**: Use `@bmad/{module}/agents/{agent-name}` syntax to invoke agents.

## Development Patterns

### Database Queries
Always use Drizzle ORM, never raw SQL:

```typescript
import { eq } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { borrowers, loans } from '@/models/Schema';

// Select with join
const result = await db
  .select()
  .from(loans)
  .leftJoin(borrowers, eq(loans.borrowerId, borrowers.id))
  .where(eq(loans.id, loanId));
```

### API Route Structure
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { entity } from '@/models/Schema';

const createSchema = z.object({ /* fields */ });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search');
  // Query with optional search
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = createSchema.parse(body);
  // Insert with validated data
}
```

### Component Patterns
- Use Server Components by default
- Add `'use client'` only when needed (hooks, events, state)
- Colocate tests with components (`*.test.tsx`)
- Use Shadcn UI components from `@/components/ui/`
- Forms use React Hook Form + Zod validation

### Error Handling
- API routes return `NextResponse.json({ error })` with proper status codes
- Frontend uses try/catch with user-friendly toast messages
- Sentry automatically captures unhandled errors
- Use LogTape for structured logging (`src/libs/Logger.ts`)

## Environment Variables

### Required
```bash
DATABASE_URL="postgresql://..."              # PostgreSQL connection string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."  # Clerk public key
CLERK_SECRET_KEY="sk_..."                   # Clerk secret key
ARCJET_KEY="ajkey_..."                      # Arcjet security key
```

### Optional (Development)
```bash
NEXT_PUBLIC_SENTRY_DISABLED="true"          # Disable Sentry in dev
NEXT_PUBLIC_SENTRY_DSN="..."                # Sentry error tracking
NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN="..." # Better Stack logging
SENTRY_ORGANIZATION="..."                   # Sentry org for source maps
SENTRY_PROJECT="..."                        # Sentry project name
```

### Database Configuration
- **Local Dev**: Uses PGlite (file-based PostgreSQL) - no setup required
- **Production**: Supports any PostgreSQL provider (Prisma Postgres, Supabase, etc.)
- **Connection Pooling**: Use pooled connection URLs in production

## Testing Strategy

### Unit Tests
- Located next to source files (`*.test.ts`, `*.test.tsx`)
- Run with `npm run test`
- Vitest projects: `unit` (Node) and `ui` (Playwright browser mode)
- Hooks and React components use browser mode

### E2E Tests
- Located in `tests/e2e/` with `*.e2e.ts` extension
- Integration tests in `tests/integration/` with `*.spec.ts` extension
- Playwright auto-starts dev server with PGlite
- Monitoring tests (`*.check.e2e.ts`) run in production via Checkly

### Storybook
- Stories located with components (`*.stories.tsx`)
- Run `npm run storybook` for component development
- Includes accessibility testing via `@storybook/addon-a11y`

## Git Workflow

### Commit Messages
Follows Conventional Commits:
- Use `npm run commit` for interactive commit creation
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Lefthook validates commit messages via Commitlint

### Pre-commit Hooks
Lefthook runs:
1. ESLint auto-fix on all files
2. TypeScript type checking on `.ts`/`.tsx` files
3. Stages fixed files automatically

## Security & Compliance

### Arcjet Configuration
Located in `src/libs/Arcjet.ts`:
- Bot detection allows search engines, preview generators, uptime monitors
- Shield WAF blocks OWASP Top 10 vulnerabilities
- Additional rules in `middleware.ts`

### Authentication
Clerk provides:
- Sign-up, sign-in, sign-out
- MFA, social auth, passkeys
- User profile management
- Organization support (for multi-tenancy)

### Data Protection
- Row Level Security (RLS) planned for Supabase migration
- PII fields (SSN, tax ID) should be encrypted at rest
- Audit logging via `servicing_income` table for fee income

## Internationalization

- Primary language: English (`en`)
- Translations in `src/locales/{locale}/`
- Crowdin integration for automated translations
- Use `next-intl` for all user-facing text
- i18n validation via `npm run check:i18n`

## Performance Targets

From solution architecture and PRD:
- **API Response Time**: <500ms P95
- **Page Load Time**: <2s
- **Search Response**: <300ms
- **Hot Reload**: <3s in development

## Common Troubleshooting

### Database Migrations
If schema changes aren't applying:
1. Generate migration: `npm run db:generate`
2. Apply manually: `npm run db:migrate`
3. Restart dev server: `npm run dev`

### Type Errors After Schema Changes
1. Restart TypeScript server in IDE
2. Run `npm run check:types` to verify
3. Check Drizzle schema exports in `src/models/Schema.ts`

### Clerk Authentication Issues
1. Verify `.env.local` has both Clerk keys
2. Check Clerk Dashboard settings (allowed domains, redirect URLs)
3. Sign out and clear cookies if behavior is inconsistent

### Hot Reload Not Working
1. Check for syntax errors in recent changes
2. Restart dev server with `npm run dev`
3. Clear `.next` folder: `npm run clean && npm run dev`

## Key Files Reference

- `src/models/Schema.ts` - Database schema (single source of truth)
- `src/libs/DB.ts` - Database connection singleton
- `src/libs/Env.ts` - Type-safe environment variables (T3 Env)
- `next.config.ts` - Next.js configuration
- `drizzle.config.ts` - Drizzle ORM configuration
- `middleware.ts` - Arcjet security rules
- `instrumentation.ts` - Sentry and DB migration setup
- `.cursor/notes/agentnotes.md` - Project context and decisions
- `docs/solution-architecture.md` - Full architecture specification (2,332 lines)
- `docs/PRD.md` - Product requirements (1,345 lines)
- `docs/epics.md` - User stories and acceptance criteria (872 lines)

## Project Goals

Building a comprehensive lending platform with:
- **Speed**: Attio-style UX with <500ms interactions
- **Scalability**: Support 10,000+ concurrent users, 100,000+ loans
- **Security**: MFA, RLS, encryption, bot protection
- **Compliance**: Audit trails, GDPR readiness, SOC 2 preparation
- **Developer Experience**: Type-safe, tested, documented, fast feedback loops

Current phase: Architecture complete, implementing core features (Week 1-4 of 16-week roadmap).
