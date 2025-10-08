# Everyday Lending - Agent Notes

## Project Context
**Everyday Lending** is a private-lending & loan-servicing SaaS for internal operations. The goal is to create a single source of truth with an Attio-style UI for loan management.

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **ORM:** Drizzle ORM (Postgres/Supabase)
- **UI:** Shadcn UI + Tailwind + Lucide Icons
- **State:** TanStack Query (React Query)
- **Validation:** Zod
- **Motion:** Framer Motion
- **DB Host:** Supabase (Postgres)
- **Deployment:** Vercel

## Design System (Attio-inspired)
- **Colors:** neutral grays (50–900) + accent blue 600/700
- **Typography:** Inter/Geist Sans, text-sm base, 1.4 line-height
- **Radius:** rounded-2xl
- **Shadows:** shadow-sm on cards, shadow-lg on drawers
- **Layout:** two-panel (Left Sidebar + Main Content)
- **Padding:** p-4 → p-6
- **Motion:** Framer Motion ease 0.2 for drawers & modals

## Core Modules
1. Dashboard (KPIs & charts)
2. Loans
3. Borrowers
4. Lenders/Investors
5. Properties
6. Payments (Borrower + Investor)
7. Rehab Draws
8. Servicing Income + Fee Types
9. Settings (future)

## User Roles
- **Admin:** all modules + configuration
- **Ops Manager:** loans, borrowers, payments, draws
- **Finance:** servicing income + reports
- **Viewer:** read-only dashboard + loans

## Key Files
- Schema: `src/models/Schema.ts`
- Layout: `src/app/[locale]/(auth)/dashboard/layout.tsx`
- Components: `src/components/ui/`
- Utils: `src/lib/utils.ts`

## Development Approach
- Use Shadcn UI primitives
- Follow Attio's density and motion principles
- Keep code modular and typed
- Favor readability and maintainability
- Build composable, reusable React components
