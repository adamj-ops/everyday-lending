# Everyday OS — Design System Specification

**Version:** 1.0
**Last Updated:** October 2025
**Status:** Active Development

A comprehensive design system inspired by Attio's data-driven precision and interaction polish for the Everyday Lending Platform.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Visual Direction](#visual-direction)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Layout Architecture](#layout-architecture)
6. [Component Library](#component-library)
7. [Motion & Animation](#motion--animation)
8. [Patterns & Templates](#patterns--templates)
9. [Accessibility](#accessibility)
10. [Implementation Guide](#implementation-guide)

---

## Design Philosophy

### Core Principles

**Data Clarity First**
Information architecture prioritizes scanability and quick comprehension. Every pixel serves the user's decision-making process.

**Progressive Disclosure**
Show what's needed when it's needed. Use contextual panels, modals, and drawers to maintain focus while providing depth on demand.

**Delightful Efficiency**
Speed and polish aren't mutually exclusive. Micro-interactions and smooth transitions make frequent tasks feel effortless.

**Systematic Consistency**
Reusable patterns across all loan management workflows. Once learned, always familiar.

### Design DNA

- **Base Structure:** Attio's clean data-table layouts and navigation patterns
- **Polish Layer:** Smooth micro-interactions and onboarding excellence
- **Brand Identity:** Everyday Blue (#158CB6) as primary, balanced with professional neutrals
- **Accent Strategy:** Sky Blue (#3B9FC2) for key actions and highlights - a lighter shade in the same color family

---

## Visual Direction

### Style Goals

A data-driven workspace that feels:
- **Light & Intuitive:** Like Attio's effortless navigation
- **Professional & Polished:** Appropriate for financial services with smooth interactions
- **Cohesive:** Unified blue color palette across all touchpoints
- **Fast:** Sub-500ms perceived interactions

### Visual Hierarchy

```
Brand Color (Blue)    → Primary actions, navigation active states
Accent Color (Sky)    → CTAs, live statuses, highlights (lighter blue)
Neutral Spectrum      → Content, backgrounds, borders
Status Colors         → Success, warning, error, info states
```

### Reference Applications

**Attio Patterns (Structure):**
- Multi-column data tables with inline editing
- Right-side detail drawers
- Collapsible left navigation
- Tag-based filtering and categorization
- Avatar + status indicator combinations

**Interaction Patterns:**
- Metric card layouts with graphs
- Multi-step onboarding flows
- Smooth micro-animations and transitions
- Contextual help and assistance
- Subtle hover states and feedback

---

## Color System

### Tailwind Configuration

```typescript
// tailwind.config.ts - Color tokens
const colors = {
  // Brand Colors (Everyday Blue - Primary)
  brand: {
    DEFAULT: '#158CB6',      // Everyday Blue
    50: '#E5F5FA',
    100: '#CCE9F4',
    200: '#99D4E9',
    300: '#66BEDE',
    400: '#33A9D3',
    500: '#158CB6',           // Primary
    600: '#137CA0',
    700: '#0F5D78',
    800: '#0A3D50',
    900: '#051E28',
  },

  // Accent Colors (Sky Blue - Lighter, brighter blue for CTAs)
  accent: {
    DEFAULT: '#3B9FC2',
    50: '#EBF6FA',
    100: '#D6EDF5',
    200: '#ADDBEB',
    300: '#84C9E1',
    400: '#5BB7D7',
    500: '#3B9FC2',           // Primary Accent (lighter than brand)
    600: '#2E7F9B',
    700: '#225F74',
    800: '#17404D',
    900: '#0B2026',
  },

  // Neutral Palette (Attio-inspired slate/gray)
  neutral: {
    50: '#F8FAFC',           // Lightest backgrounds
    100: '#F1F5F9',          // Card backgrounds
    200: '#E2E8F0',          // Borders, dividers
    300: '#CBD5E1',          // Disabled states
    400: '#94A3B8',          // Placeholder text
    500: '#64748B',          // Secondary text
    600: '#475569',          // Body text
    700: '#334155',          // Headings
    800: '#1E293B',          // Dark headings
    900: '#0F172A',          // Darkest text
  },

  // Semantic Colors
  success: {
    DEFAULT: '#10B981',
    light: '#D1FAE5',
    dark: '#065F46',
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
    dark: '#92400E',
  },
  error: {
    DEFAULT: '#EF4444',
    light: '#FEE2E2',
    dark: '#991B1B',
  },
  info: {
    DEFAULT: '#3B82F6',
    light: '#DBEAFE',
    dark: '#1E3A8A',
  },
}
```

### Color Usage Guidelines

| Use Case | Color Token | Example |
|----------|-------------|---------|
| Primary CTA | `brand.500` | "Create Loan" button |
| Secondary CTA | `brand.100` bg + `brand.600` text | "View Details" |
| Urgent Action | `accent.500` | "Approve Now", Live status |
| Success State | `success.DEFAULT` | Payment received |
| Warning State | `warning.DEFAULT` | Pending approval |
| Error State | `error.DEFAULT` | Validation errors |
| Text Primary | `neutral.600` | Body copy |
| Text Secondary | `neutral.500` | Metadata, labels |
| Borders | `neutral.200` | Dividers, card borders |
| Backgrounds | `neutral.50` / `neutral.100` | Page, card backgrounds |

### Accessibility Requirements

- **WCAG AA Minimum:** All text meets 4.5:1 contrast ratio
- **Focus Indicators:** 3px solid ring using `brand.500` at 50% opacity
- **Color + Icon:** Never rely on color alone (always pair with icons/text)
- **Dark Mode Ready:** All tokens have dark mode equivalents (implementation Phase 2)

---

## Typography

### Font Stack

```css
/* Primary Font */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

/* Monospace (for codes, IDs, numbers) */
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code',
             'Courier New', monospace;
```

### Type Scale

```typescript
// Tailwind config
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px - Micro labels
  sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px - Secondary text
  base: ['1rem', { lineHeight: '1.5rem' }],       // 16px - Body text
  lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px - Large body
  xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px - H4
  '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px - H3
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px - H2
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px - H1
  '5xl': ['3rem', { lineHeight: '1' }],           // 48px - Display
}
```

### Font Weights

```typescript
fontWeight: {
  normal: '400',     // Body text, default
  medium: '500',     // Emphasized text, labels
  semibold: '600',   // Headings, buttons
  bold: '700',       // Reserved for strong emphasis (rare)
}
```

### Typography Patterns

```tsx
// Headings
<h1 className="text-4xl font-semibold text-neutral-800">Page Title</h1>
<h2 className="text-3xl font-semibold text-neutral-800">Section</h2>
<h3 className="text-2xl font-semibold text-neutral-700">Subsection</h3>
<h4 className="text-xl font-semibold text-neutral-700">Card Title</h4>

// Body Text
<p className="text-base text-neutral-600">Regular paragraph text</p>
<p className="text-sm text-neutral-500">Secondary metadata</p>

// Labels & UI Text
<label className="text-sm font-medium text-neutral-700">Form Label</label>
<span className="text-xs text-neutral-400">Helper text</span>

// Data Display (Monospace)
<span className="font-mono text-sm text-neutral-800">$1,234,567.89</span>
<code className="font-mono text-xs bg-neutral-100 px-2 py-1 rounded">ID: L-2024-001</code>
```

---

## Layout Architecture

### Zone System

The application uses a 5-zone layout inspired by Attio:

```
┌─────────────────────────────────────────────────────────────┐
│  Top Bar (Global Actions)                                    │
├──────┬──────────────────────────────────────────┬───────────┤
│      │                                          │           │
│ Left │  Main Content Area                       │  Right    │
│ Nav  │  (Tables / Kanban / Detail Views)        │  Drawer   │
│      │                                          │ (Context) │
│      │                                          │           │
└──────┴──────────────────────────────────────────┴───────────┘
                      │
                 Modal Layer
                      │
              Floating Helper (Bottom Right)
```

#### Top Bar (Height: 64px)
Global navigation and search

```tsx
<header className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between">
  {/* Logo, Search, Profile */}
</header>
```

#### Left Sidebar (Width: 240px / 64px collapsed)
Primary navigation - Attio pattern

```tsx
<aside className="w-60 border-r border-neutral-200 bg-neutral-50">
  {/* Navigation with collapsible sections */}
</aside>
```

#### Main Content (Fluid)
Data tables and views - Attio pattern

```tsx
<main className="flex-1 overflow-auto bg-white p-6">
  {/* Table/Kanban/Dashboard views */}
</main>
```

#### Right Drawer (Width: 400px)
Contextual detail panel - Attio pattern

```tsx
<aside className="w-96 border-l border-neutral-200 bg-white">
  {/* Contextual details, activity, notes */}
</aside>
```

#### Modal Layer
Forms and confirmations

```tsx
<Dialog className="fixed inset-0 z-50 bg-black/50">
  <DialogContent className="bg-white rounded-xl shadow-2xl max-w-2xl">
    {/* Forms, confirmations, onboarding */}
  </DialogContent>
</Dialog>
```

#### Floating Helper
Contextual assistance

```tsx
<div className="fixed bottom-6 right-6 z-40">
  <Button className="rounded-full shadow-lg bg-accent-500">
    {/* AI assistant */}
  </Button>
</div>
```

---

## Component Library

All components built on **Shadcn UI** with custom theming.

### Button

```tsx
// Primary
<Button className="bg-brand-500 hover:bg-brand-600">Create Loan</Button>

// Accent CTA
<Button className="bg-accent-500 hover:bg-accent-600">Approve Now</Button>

// Secondary
<Button variant="outline">Cancel</Button>

// Ghost
<Button variant="ghost">View Details</Button>
```

### Card

**Metric Card Pattern:**
```tsx
<Card className="p-6">
  <p className="text-sm text-neutral-500">Total Loans</p>
  <p className="text-3xl font-semibold text-neutral-800 mt-1">$24.8M</p>
  <div className="flex items-center gap-2 mt-2">
    <TrendingUp className="text-success" />
    <span className="text-sm text-success">+12.5%</span>
  </div>
</Card>
```

### Table (Attio Pattern)

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Borrower <SortIcon /></TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="hover:bg-neutral-50 cursor-pointer">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar src={avatar} />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-neutral-500">{email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="success">Active</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Detail Drawer (Attio Pattern)

```tsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent className="w-96">
    <div className="flex items-start gap-4 border-b pb-6">
      <Avatar size="lg" />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-neutral-500">{email}</p>
        <div className="flex gap-2 mt-2">
          <Badge variant="success">Active</Badge>
        </div>
      </div>
    </div>
    <Tabs defaultValue="details" className="mt-6">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="details">{/* Details */}</TabsContent>
    </Tabs>
  </SheetContent>
</Sheet>
```

### Status Badges

```tsx
<Badge variant="success">Approved</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Rejected</Badge>
<Badge className="bg-accent-50 text-accent-700">Live</Badge>
```

---

## Motion & Animation

### Principles

- **Purposeful:** Every animation serves feedback, transition, or attention
- **Performance:** 60fps minimum, use `transform` and `opacity` only
- **Subtle:** Professional polish without distraction

### Common Patterns

**Hover (Button):**
```tsx
className="transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
```

**Fade + Slide:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
/>
```

**Modal:**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
/>
```

**Reduced Motion:**
```tsx
const prefersReducedMotion = useReducedMotion()
<motion.div animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }} />
```

---

## Patterns & Templates

### Onboarding Flow

Multi-step modal with progress:

```tsx
<Dialog>
  <DialogContent>
    <Progress value={(step / total) * 100} />
    <AnimatePresence mode="wait">
      <motion.div key={step}>
        {step === 1 && <EmailVerification />}
        {step === 2 && <ProfileSetup />}
        {step === 3 && <IntegrationConnect />}
      </motion.div>
    </AnimatePresence>
    <DialogFooter>
      <Button onClick={handleNext}>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dashboard Template

```tsx
<div className="p-6 space-y-6">
  <h1 className="text-4xl font-semibold">Dashboard</h1>
  <div className="grid grid-cols-4 gap-4">
    <MetricCard label="Total Loans" value="$24.8M" trend={12.5} />
  </div>
  <div className="grid grid-cols-2 gap-6">
    <Card><LineChart /></Card>
    <Card><BarChart /></Card>
  </div>
</div>
```

### Data Table + Drawer (Attio)

```tsx
<div className="flex h-full">
  <div className="flex-1">
    <Table>
      <TableRow onClick={() => openDrawer(record)}>
        {/* Row */}
      </TableRow>
    </Table>
  </div>
  <Sheet open={drawerOpen}>
    <SheetContent>{/* Details */}</SheetContent>
  </Sheet>
</div>
```

---

## Accessibility

### WCAG 2.1 AA

- **Color Contrast:** 4.5:1 text, 3:1 UI components
- **Focus:** `focus:ring-4 focus:ring-brand-500/20`
- **Keyboard:** Tab order, Escape, Arrow keys, Enter/Space
- **Screen Readers:** ARIA labels, live regions, semantic HTML

```tsx
<Button aria-label="Close"><XIcon /></Button>
<div aria-live="polite">{status}</div>
```

---

## Implementation Guide

### Setup

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card table dialog sheet
npm install framer-motion
```

### Tailwind Config

Update with color tokens from [Color System](#color-system) section.

### Theme Provider

```tsx
// src/providers/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes'
export function ThemeProvider({ children }) {
  return <NextThemesProvider>{children}</NextThemesProvider>
}
```

### Migration Path

**Week 1:** Foundation (tokens, layout)
**Week 2:** Core components (button, input, card, table)
**Week 3:** Data components (metrics, drawer, forms)
**Week 4:** Advanced patterns (onboarding, dashboard, animations)

---

## Resources

**Design References:**
- [Attio](https://attio.com) - Structure, tables, navigation, interaction patterns

**Libraries:**
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)

**Accessibility:**
- [WCAG](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA](https://www.w3.org/WAI/ARIA/apg/)

---

**Version:** 1.0 (October 2025)
**Maintained by:** Product & Engineering
**Reference:** Link from [CLAUDE.md](../CLAUDE.md)
