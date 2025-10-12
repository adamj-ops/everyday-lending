# Claude Code + Cursor AI Integration Guide

**Version:** 1.0
**Last Updated:** October 2025
**Project:** Everyday Lending Platform

A practical guide for leveraging Claude Code alongside Cursor AI with BMAD v6 methodology.

---

## Table of Contents

1. [Overview](#overview)
2. [Tool Division Strategy](#tool-division-strategy)
3. [Workflow Integration](#workflow-integration)
4. [Handoff Patterns](#handoff-patterns)
5. [Context Sharing](#context-sharing)
6. [Best Practices](#best-practices)
7. [Common Scenarios](#common-scenarios)

---

## Overview

### The Two-Tool Philosophy

**Cursor AI (Primary Development)**
- Core application development
- BMAD v6 agent orchestration
- Database/backend implementation
- Business logic and APIs

**Claude Code (Frontend & Advanced)**
- UI/UX implementation and design system
- Component architecture
- Complex problem-solving
- Design system documentation
- Code review and refactoring

### Why This Division Works

1. **Cursor's Strengths**:
   - Deep codebase context (your entire repo)
   - BMAD v6 agent integration
   - Familiar workflow for core dev
   - Fast iteration on existing patterns

2. **Claude Code's Strengths**:
   - Superior frontend/UI reasoning
   - Better at design system thinking
   - Excellent at complex architectural decisions
   - Strong at documentation and explanation
   - Fresh perspective on complex problems

---

## Tool Division Strategy

### Use Cursor AI For:

#### 1. Core Backend Development
```bash
# In Cursor, use BMAD agents
agent bmm/dev
> *implement-story

# For database work
agent bmm/architect
> *solution-architecture
```

**Tasks:**
- API endpoint implementation
- Database schema changes
- Drizzle ORM queries
- Business logic
- Service layer development

#### 2. BMAD Workflow Orchestration
```bash
# Analysis phase
agent bmm/analyst
> *brainstorm-project

# Planning phase
agent bmm/pm
> *plan-project

# Story creation
agent bmm/sm
> *create-story
```

**Tasks:**
- Running BMAD agent workflows
- Story context preparation
- Technical specifications
- Architecture planning

#### 3. Rapid Feature Implementation
**Tasks:**
- CRUD operations
- Following existing patterns
- Quick bug fixes
- Incremental improvements

---

### Use Claude Code For:

#### 1. Design System & UI Architecture

**Tasks:**
- Design system documentation (✅ Already created `docs/design-system.md`)
- Component library design
- Tailwind/Shadcn configuration
- Visual hierarchy decisions
- Color palette refinement
- Typography systems

**Example Prompts:**
```
"Help me implement the Attio-style data table pattern from our design system"

"Create a reusable metric card component following our design tokens"

"Review our button variants and suggest improvements"
```

#### 2. Complex Component Implementation

**Tasks:**
- Multi-step forms (loan application flow)
- Data tables with advanced features
- Dashboard layouts
- Onboarding flows
- Interactive visualizations
- Animation implementations

**Example Prompts:**
```
"Build a multi-step loan application form with validation and progress tracking"

"Implement the borrower detail drawer following Attio patterns"

"Create an animated dashboard with metric cards and charts"
```

#### 3. Frontend Architecture Decisions

**Tasks:**
- State management strategy
- Component composition patterns
- Performance optimization
- Hook architecture
- Client-side routing

**Example Prompts:**
```
"Help me design the state management for our loan application flow"

"What's the best pattern for sharing borrower data across components?"

"How should we structure our custom hooks for data fetching?"
```

#### 4. Code Review & Refactoring

**Tasks:**
- Component structure review
- Performance analysis
- Accessibility audit
- Code quality improvements

**Example Prompts:**
```
"Review this table component for performance issues"

"Audit our forms for accessibility compliance"

"Suggest refactoring for this complex component"
```

#### 5. Documentation & Knowledge Transfer

**Tasks:**
- Component documentation
- API documentation
- Pattern libraries
- Developer guides

**Example Prompts:**
```
"Document our custom hook patterns for the team"

"Create a guide for implementing new data tables"

"Write Storybook stories for our button variants"
```

---

## Workflow Integration

### Daily Development Flow

#### Morning: Planning & Setup (Cursor + BMAD)

```bash
# 1. Check BMAD analysis
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
npx bmad analyze --repo ../everyday-lending --mode quick

# 2. Review agent recommendations
cat ../reports/bmad_summary.md

# 3. Start your day with story context
agent bmm/sm
> *story-context
```

#### Midday: Core Development (Cursor)

Use Cursor for:
- API implementation
- Database operations
- Business logic
- Backend services

```bash
# In Cursor
agent bmm/dev
> *implement-story
```

#### Afternoon: UI Implementation (Claude Code)

Switch to Claude Code for:
- Component implementation
- Design system work
- Complex UI features
- Frontend architecture

**Key Files to Reference in Claude Code:**
- `docs/design-system.md` - Your design system spec
- `docs/solution-architecture.md` - Architecture context
- `CLAUDE.md` - Project instructions

#### Evening: Review & Documentation (Both)

**Cursor:**
- Commit core changes
- Update BMAD context
- Run tests

**Claude Code:**
- Document new components
- Update design system
- Create Storybook stories

---

## Handoff Patterns

### Pattern 1: Backend → Frontend Handoff

**Cursor (Backend):**
1. Implement API endpoint
2. Create TypeScript types
3. Document API contract

**Handoff:**
- Share the API types file
- Provide API endpoint documentation
- Note any special behaviors

**Claude Code (Frontend):**
1. Create custom hook for API
2. Build UI components
3. Implement loading/error states

**Example Handoff Message:**
```
Just finished the borrower API in Cursor:
- GET /api/borrowers (with search)
- POST /api/borrowers (with validation)
- Types in src/types/api.ts

Now need Claude Code to:
1. Create useBorrowers() hook
2. Build BorrowerTable component
3. Implement search/filter UI
```

### Pattern 2: Design → Implementation Handoff

**Claude Code (Design):**
1. Update design system
2. Define component patterns
3. Document usage

**Handoff:**
- Share design system updates
- Provide component specs
- Define variants needed

**Cursor (Implementation):**
1. Scaffold components
2. Apply to features
3. Integrate with backend

### Pattern 3: Problem → Solution Handoff

**Cursor (Problem Discovery):**
1. Identify complex frontend issue
2. Document requirements
3. Gather context

**Handoff:**
- Describe the problem
- Share relevant code
- Note constraints

**Claude Code (Solution):**
1. Analyze problem
2. Design solution
3. Provide implementation guide

**Cursor (Execution):**
1. Implement solution
2. Test and validate
3. Deploy

---

## Context Sharing

### Essential Files for Claude Code

Always reference these in Claude Code sessions:

1. **Project Context:**
   - `CLAUDE.md` - Project instructions
   - `docs/design-system.md` - Design system
   - `docs/solution-architecture.md` - Architecture

2. **Current State:**
   - `.cursor/notes/agentnotes.md` - Recent decisions
   - `docs/stories/` - Active stories
   - `package.json` - Dependencies

3. **Design Assets:**
   - Screenshots of Attio/reference apps
   - Figma links (if available)
   - Color palettes

### Essential Files for Cursor

Keep these updated in Cursor:

1. **BMAD Context:**
   - `bmad/_cfg/manifest.yaml` - Agent config
   - `reports/bmad_summary.md` - Recent analysis
   - `.cursor/notes/bmad-workflow.md` - Workflow guide

2. **Implementation Context:**
   - `src/models/Schema.ts` - Database schema
   - `src/libs/` - Core utilities
   - API route files

### Context Handoff Template

When switching tools, use this template:

```markdown
## Context for [Claude Code / Cursor]

**What I just did:**
- [Summary of work completed]

**Current state:**
- [Files modified]
- [Key decisions made]

**What's needed next:**
- [Task 1]
- [Task 2]

**Important context:**
- [Link to relevant docs]
- [Special considerations]
- [Dependencies or blockers]

**Files to reference:**
- [List key files]
```

---

## Best Practices

### 1. Clean Separation of Concerns

**DO:**
- Use Cursor for backend, Claude Code for frontend
- Keep design system work in Claude Code
- Use BMAD agents in Cursor for structured workflows
- Switch tools based on task type, not convenience

**DON'T:**
- Jump between tools for the same task
- Duplicate work across both tools
- Lose context during handoffs
- Mix BMAD workflows across tools

### 2. Maintain Context Continuity

**DO:**
- Keep `CLAUDE.md` updated with latest patterns
- Document decisions in `.cursor/notes/`
- Update design system after UI changes
- Share code snippets during handoffs

**DON'T:**
- Assume context carries over automatically
- Skip documentation steps
- Forget to sync design system changes
- Leave TODO comments without tracking

### 3. Optimize for Strengths

**DO:**
- Use Claude Code for "how should this look/work?" questions
- Use Cursor for "implement this pattern" tasks
- Leverage BMAD agents for structured planning
- Get Claude Code's opinion on complex designs

**DON'T:**
- Force Cursor to do design thinking
- Ask Claude Code to run BMAD workflows
- Use either tool outside their strengths
- Ignore tool-specific advantages

### 4. Documentation First

**DO:**
- Update design system before building
- Create component specs in Claude Code
- Document APIs before frontend work
- Keep CLAUDE.md as single source of truth

**DON'T:**
- Build UI without design system reference
- Skip API documentation
- Forget to update guides
- Leave outdated docs

---

## Common Scenarios

### Scenario 1: New Feature (Full Stack)

**Step 1: Planning (Cursor + BMAD)**
```bash
# Ideation
agent cis/brainstorming-coach
> *brainstorm

# Analysis
agent bmm/analyst
> *product-brief

# Planning
agent bmm/pm
> *plan-project

# Architecture
agent bmm/architect
> *solution-architecture
```

**Step 2: Design System (Claude Code)**
```
Prompt: "Based on the loan approval feature in our PRD (docs/PRD.md),
help me design the UI components following our design system. We need:
- Approval status cards
- Multi-step approval form
- Activity timeline
Include color usage, typography, and component patterns."
```

**Step 3: Backend Implementation (Cursor)**
```bash
# Create stories
agent bmm/sm
> *create-story

# Implement
agent bmm/dev
> *implement-story
```

**Step 4: Frontend Implementation (Claude Code)**
```
Prompt: "Now implement the loan approval UI components we designed.
API endpoints are ready at:
- GET /api/loans/:id/approval-status
- POST /api/loans/:id/approve

Types are in src/types/api.ts. Create:
1. useApprovalStatus() hook
2. ApprovalCard component
3. ApprovalForm component
4. ApprovalTimeline component"
```

**Step 5: Integration & Testing (Cursor)**
- Connect frontend to backend
- Write tests
- Review and commit

---

### Scenario 2: Complex UI Component

**Step 1: Design (Claude Code)**
```
Prompt: "I need a sophisticated data table for borrowers following Attio's
pattern from our design system. It should include:
- Inline editing
- Sortable columns
- Row selection
- Detail drawer on click
- Search and filters

Design the component architecture and provide implementation guidance."
```

**Step 2: Component Scaffolding (Claude Code)**
```
Prompt: "Now help me build the BorrowerTable component with:
1. Table structure with Shadcn UI
2. Inline edit functionality
3. Sort/filter logic
4. Detail drawer integration
5. Proper TypeScript types"
```

**Step 3: Data Integration (Cursor)**
- Connect to API endpoints
- Add loading/error states
- Implement pagination
- Write tests

**Step 4: Refinement (Claude Code)**
```
Prompt: "Review the BorrowerTable implementation for:
- Performance optimizations
- Accessibility compliance
- Design system consistency
Suggest improvements."
```

---

### Scenario 3: Design System Update

**Step 1: Research & Design (Claude Code)**
```
Prompt: "We need to add a new component pattern for loan calculators.
Research best practices and design a calculator component that fits
our Attio-inspired design system. Include:
- Visual design
- Interaction patterns
- Animation guidelines
- Usage examples"
```

**Step 2: Documentation (Claude Code)**
```
Prompt: "Update docs/design-system.md with:
1. Calculator component specifications
2. Code examples
3. Usage guidelines
4. Accessibility notes"
```

**Step 3: Implementation (Cursor)**
- Build calculator component
- Add to component library
- Create Storybook story
- Write tests

**Step 4: Validation (Claude Code)**
```
Prompt: "Review the implemented LoanCalculator component against our
design system spec. Check:
- Design token usage
- Animation implementation
- Accessibility
- Code quality"
```

---

### Scenario 4: Performance Optimization

**Step 1: Identify Issue (Cursor)**
```bash
# Run analysis
npx bmad analyze --repo . --mode performance
```

**Step 2: Deep Dive (Claude Code)**
```
Prompt: "Our dashboard page is loading slowly. Here's the component
[paste code]. Analyze:
1. Re-render issues
2. Data fetching patterns
3. Component composition
4. Potential optimizations

Suggest specific improvements with code examples."
```

**Step 3: Implement Fixes (Cursor)**
- Apply recommended optimizations
- Add memoization
- Optimize queries
- Test performance

**Step 4: Validate (Claude Code)**
```
Prompt: "Review the optimized dashboard code. Are there any remaining
performance concerns? Check for:
- Unnecessary re-renders
- Missing optimizations
- Best practice violations"
```

---

### Scenario 5: Accessibility Audit

**Step 1: Component Review (Claude Code)**
```
Prompt: "Audit these components for WCAG 2.1 AA compliance:
- BorrowerForm (src/components/borrowers/borrower-form.tsx)
- LoanTable (src/components/loans/loan-table.tsx)
- Dashboard (src/app/[locale]/(auth)/dashboard/page.tsx)

Provide specific fixes for each issue found."
```

**Step 2: Design System Check (Claude Code)**
```
Prompt: "Review our design system (docs/design-system.md) for
accessibility gaps. Ensure:
- Color contrast meets standards
- Focus indicators are defined
- ARIA patterns are documented
- Keyboard navigation is specified"
```

**Step 3: Implementation (Cursor)**
- Apply accessibility fixes
- Add ARIA labels
- Improve keyboard navigation
- Test with screen readers

**Step 4: Documentation (Claude Code)**
```
Prompt: "Create an accessibility guide for our component library.
Include:
- Common patterns
- Testing checklist
- ARIA examples
- Keyboard shortcuts"
```

---

## File Organization Strategy

### Files Managed in Cursor

```
src/
├── models/           # Database schemas (Drizzle)
├── libs/             # Core utilities, DB connection
├── app/api/          # API routes
└── hooks/            # Custom hooks (can handoff to Claude Code)

tests/
├── integration/      # API tests
└── e2e/             # E2E tests

bmad/                # BMAD configuration
.cursor/notes/       # Development notes
```

### Files Managed in Claude Code

```
docs/
├── design-system.md         # Design system spec
└── component-patterns.md    # UI patterns (create if needed)

src/components/
├── ui/                      # Shadcn components (customized)
├── borrowers/              # Borrower UI components
├── lenders/                # Lender UI components
├── loans/                  # Loan UI components
└── layout/                 # Layout components

*.stories.tsx               # Storybook stories
```

### Shared Files (Coordinate Changes)

```
CLAUDE.md                   # Update in Cursor, reference in Claude Code
package.json                # Install deps in Cursor, understand in Claude Code
tailwind.config.ts          # Design in Claude Code, apply in Cursor
src/types/                  # Define in Cursor, use in Claude Code
```

---

## Communication Templates

### Template 1: Cursor → Claude Code Handoff

```markdown
## Frontend Task for Claude Code

**Context:**
Backend work complete in Cursor. Need frontend implementation.

**What's Ready:**
- ✅ API endpoint: POST /api/loans
- ✅ Types: src/types/loan.ts
- ✅ Validation: Zod schema in place
- ✅ Tests: Integration tests passing

**What's Needed:**
1. Create loan submission form
2. Build multi-step wizard (4 steps)
3. Add validation feedback
4. Implement success/error states

**Design Reference:**
- Follow design system: docs/design-system.md
- Reference onboarding pattern (section 8)
- Use brand colors for CTA

**Files to Create:**
- src/components/loans/loan-application-wizard.tsx
- src/components/loans/use-loan-submission.ts
- src/components/loans/loan-application-wizard.stories.tsx

**Important Notes:**
- Form should match borrower profile style
- Include progress indicator
- Auto-save draft to localStorage
```

### Template 2: Claude Code → Cursor Handoff

```markdown
## Implementation Ready for Cursor

**What I Designed:**
Created loan approval UI components following design system.

**Components Built:**
- ✅ ApprovalCard component (src/components/loans/approval-card.tsx)
- ✅ ApprovalTimeline component (src/components/loans/approval-timeline.tsx)
- ✅ ApprovalForm component (src/components/loans/approval-form.tsx)
- ✅ Design system updated with approval patterns

**What's Needed in Cursor:**
1. Connect ApprovalForm to POST /api/loans/:id/approve
2. Add loading states during submission
3. Implement error handling
4. Wire up timeline to activity API
5. Add E2E tests for approval flow

**Integration Points:**
- Form data format: See src/types/approval.ts
- API expects: { approved: boolean, notes: string, conditions: string[] }
- Success: Redirect to /loans/:id
- Error: Show toast notification

**Testing Notes:**
- Test all approval states (pending, approved, rejected)
- Verify timeline updates in real-time
- Check form validation edge cases
```

---

## Quick Reference Commands

### In Cursor (BMAD Workflows)

```bash
# Morning startup
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
npx bmad analyze --repo ../everyday-lending --mode quick

# Ideation
agent cis/brainstorming-coach

# Planning
agent bmm/analyst → agent bmm/pm → agent bmm/architect

# Implementation
agent bmm/sm → agent bmm/dev

# Problem solving
agent cis/creative-problem-solver
```

### In Claude Code (Frontend Focus)

```
# Design System Work
"Update design system with [new pattern]"
"Review color palette for accessibility"
"Design [component] following Attio patterns"

# Component Implementation
"Build [component] using design system"
"Create custom hook for [feature]"
"Implement [complex UI] with animations"

# Review & Optimization
"Review [component] for performance"
"Audit [feature] for accessibility"
"Refactor [code] for better patterns"

# Documentation
"Document [pattern] for team"
"Create Storybook stories for [component]"
"Update component usage guide"
```

---

## Troubleshooting

### Issue: Context Lost Between Tools

**Solution:**
- Keep `CLAUDE.md` as single source of truth
- Use context handoff templates
- Reference specific files in both tools
- Maintain `.cursor/notes/` documentation

### Issue: Design System Drift

**Solution:**
- Always update `docs/design-system.md` in Claude Code before building
- Review components against design system regularly
- Keep Tailwind config in sync
- Use design system as source during code review

### Issue: Duplicate Effort

**Solution:**
- Clear task division: backend (Cursor) vs frontend (Claude Code)
- Use handoff templates
- Check what's already done before starting
- Maintain task list in `.cursor/notes/`

### Issue: BMAD Agents Not Available in Claude Code

**Solution:**
- BMAD agents only work in Cursor with proper setup
- Use Claude Code for implementation, not agent orchestration
- Plan with BMAD in Cursor, execute UI in Claude Code
- Keep agent outputs as reference docs for Claude Code

---

## Success Metrics

Track these to ensure effective integration:

- [ ] Clear task separation (no overlap)
- [ ] Design system stays updated
- [ ] Smooth handoffs (no confusion)
- [ ] Both tools used for strengths
- [ ] Context preserved across switches
- [ ] Documentation kept current
- [ ] No duplicate work
- [ ] Fast iteration cycles

---

## Next Steps

1. **Immediate:**
   - [ ] Bookmark this guide in both Cursor and Claude Code
   - [ ] Test first handoff with simple task
   - [ ] Set up context files for easy reference

2. **This Week:**
   - [ ] Complete one full feature using both tools
   - [ ] Update design system with learnings
   - [ ] Establish handoff rhythm

3. **Ongoing:**
   - [ ] Refine tool division based on experience
   - [ ] Document patterns that work
   - [ ] Share best practices with team

---

**Maintained by:** Development Team
**Tool Versions:**
- Cursor AI with BMAD v6.0.0-alpha.0
- Claude Code (claude.ai/code)
**Last Updated:** October 2025
