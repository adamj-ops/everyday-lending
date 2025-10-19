# Story 1.2: Mobile Responsiveness Foundation

**Epic:** Epic 1 - Phase 5 Completion (Foundation Hardening)
**Priority:** HIGH
**Estimated Effort:** 1 day
**Status:** Ready for Development
**Assignee:** TBD

---

## User Story

**As a** mobile user (loan officer or inspector in the field)
**I want** the platform to work seamlessly on my mobile device
**So that** I can access critical loan information and perform tasks on-the-go without a laptop

---

## Business Value

- **Primary Value:** Enables mobile access for ~40% of users (field inspectors, loan officers on-site)
- **User Impact:** Reduces dependency on desktop, enables real-time decision-making in the field
- **Technical Value:** Establishes responsive patterns for Epic 5 (Construction Draw Inspector mobile app)
- **Strategic Alignment:** Mobile-first approach aligns with industry trend (60% of lenders want mobile access)

---

## Description

Establish comprehensive responsive design patterns that will be reused throughout the application, with special focus on Epic 5 (Construction Draw Inspector mobile app). Implement mobile navigation, table-to-card transformations, form stacking, and touch-friendly interactions.

### Context

Current application is desktop-only with no mobile optimization. This story establishes the foundation for mobile responsiveness across the entire platform by:
1. Converting sidebar navigation to hamburger menu on mobile
2. Transforming data tables to card views at <768px
3. Stacking form fields for single-column mobile layout
4. Ensuring all touch targets meet 44x44px minimum

---

## Acceptance Criteria

### AC-1.2.1: Mobile Navigation (Sidebar → Hamburger Menu)
**Given** I am on a mobile device (<768px)
**When** I open the application
**Then** I see:
- Hamburger menu button (top-left, 44x44px touch target)
- App logo/name in header (centered)
- User menu icon (top-right)

**And when** I tap the hamburger menu
**Then** a slide-in navigation drawer opens from the left showing:
- All nav items (Dashboard, Loans, Borrowers, Lenders, Properties, Payments, Draws, Analytics)
- Active route highlighted
- User profile section at bottom
- "Close" button or backdrop tap to dismiss

**Verification:**
- [ ] Hamburger menu visible at <768px, hidden at ≥768px
- [ ] Menu button is 44x44px (tap target)
- [ ] Sheet slides in from left with smooth animation (300ms)
- [ ] Backdrop darkens background (opacity 0.5)
- [ ] Tapping backdrop closes menu
- [ ] Navigating to route auto-closes menu
- [ ] Scroll position preserved when menu closes
- [ ] No horizontal scroll when menu is open
- [ ] Works on iPhone 14 (390px) and iPad (768px)

---

### AC-1.2.2: Table Overflow Strategy (Tables → Cards on Mobile)
**Given** I am viewing a data table on mobile (<768px)
**When** the page loads
**Then** the table automatically switches to card view showing:
- One card per table row
- Primary info at top (e.g., borrower name, loan number)
- Secondary info below (e.g., amount, status)
- Status badge visually prominent
- Tap card to navigate to detail page

**Verification:**
- [ ] Tables display as cards at <768px
- [ ] Tables display as tables at ≥768px
- [ ] Card layout is readable (no truncation)
- [ ] Cards have adequate spacing (16px between)
- [ ] Tapping card navigates to detail
- [ ] Loading states show skeleton cards
- [ ] Empty state shows "No results" card
- [ ] Sorting still works (dropdown selector)
- [ ] Filtering still works (drawer on mobile)
- [ ] Test on Loans, Borrowers, Lenders, Properties tables

---

### AC-1.2.3: Form Field Stacking (Multi-column → Single Column)
**Given** I am filling out a form on mobile (<768px)
**When** the form loads
**Then** I see:
- All fields stacked vertically (single column)
- Full-width inputs (no side-by-side)
- Labels above inputs (not inline)
- Adequate spacing between fields (12px)
- Submit button full-width at bottom

**Verification:**
- [ ] Forms display single column at <768px
- [ ] Forms display 2-3 columns at ≥768px (depending on field type)
- [ ] Inputs are full width on mobile (no wasted space)
- [ ] Labels are legible (14px minimum font size)
- [ ] Error messages display below fields (not overlapping)
- [ ] Submit button is 44px height (touch target)
- [ ] Test on Loan Application, Borrower Create, Payment Record forms
- [ ] Keyboard pushes form up (input visible when focused)

---

### AC-1.2.4: Touch Target Sizing (≥44x44px)
**Given** I am interacting with the app on mobile
**When** I tap any interactive element
**Then** it responds immediately without misclicks

**All interactive elements must meet 44x44px minimum:**
- Buttons (primary, secondary, icon buttons)
- Links (especially in dense lists)
- Checkboxes and radio buttons
- Table row tap areas
- Dropdown triggers
- Tab triggers

**Verification:**
- [ ] All buttons ≥44px height
- [ ] Icon-only buttons are 44x44px
- [ ] Checkboxes have 44x44px tap area (visible area can be smaller)
- [ ] Table rows have 44px height or tap area
- [ ] Links in paragraphs have adequate line-height (1.5)
- [ ] Tabs are 44px height
- [ ] No elements <44px that are interactive
- [ ] Test with "Show tap areas" Chrome DevTools feature

---

### AC-1.2.5: Cross-Device Testing
**Given** the responsive patterns are implemented
**When** I test on real devices
**Then** the application works correctly on:

| Device | Screen Size | Orientation | Key Tests |
|--------|-------------|-------------|-----------|
| iPhone 14 | 390x844 | Portrait | Nav, tables, forms |
| iPhone 14 | 844x390 | Landscape | Nav remains accessible |
| iPad | 768x1024 | Portrait | Tables visible, forms 2-col |
| iPad | 1024x768 | Landscape | Full desktop layout |
| Desktop | 1920x1080 | N/A | No mobile patterns active |

**Verification:**
- [ ] Test on iPhone 14 (or simulator): all features work
- [ ] Test on iPad (or simulator): hybrid mobile/desktop layout
- [ ] Test on desktop: no mobile patterns visible
- [ ] Landscape mode: nav stays accessible
- [ ] No horizontal scroll at any breakpoint
- [ ] Text is legible (minimum 14px body text on mobile)
- [ ] Images/logos scale appropriately
- [ ] Modals/dialogs fit on screen (no overflow)

---

### AC-1.2.6: No Horizontal Scroll at 375px
**Given** I am on the smallest supported mobile device (375px)
**When** I navigate to any page
**Then** there is no horizontal scroll:
- No content extends beyond viewport
- Images scale to fit
- Tables use card view
- Forms are single column
- No fixed-width elements overflow

**Verification:**
- [ ] Test all major pages at 375px width
- [ ] Chrome DevTools "Show Scrollbars" enabled
- [ ] No horizontal scrollbar appears
- [ ] All content visible without panning
- [ ] Images respect max-width: 100%
- [ ] No elements with hardcoded px widths >375px

---

### AC-1.2.7: Navigation Scroll Position Persistence
**Given** I have scrolled down a page on mobile
**When** I open the hamburger menu
**Then** my scroll position is preserved

**And when** I close the menu
**Then** I return to the same scroll position

**Verification:**
- [ ] Scroll position saved before menu opens
- [ ] Body scroll locked when menu is open (no background scroll)
- [ ] Scroll position restored after menu closes
- [ ] Works with browser back button
- [ ] Works on iOS Safari and Chrome Android

---

### AC-1.2.8: Pattern Documentation (for Epic 5 Reuse)
**Given** responsive patterns are implemented
**When** I review the documentation
**Then** I find:
- Storybook stories for all mobile components (MobileNav, ResponsiveTable, etc.)
- Code examples in Storybook docs
- Breakpoint guide (when to use which pattern)
- Touch target checklist
- Mobile testing checklist

**Verification:**
- [ ] Storybook has "Mobile Patterns" section
- [ ] Each pattern has 3+ examples (mobile, tablet, desktop)
- [ ] Code snippets are copy-paste ready
- [ ] Documentation includes "Do's and Don'ts"
- [ ] Links to relevant Tailwind utilities
- [ ] Accessible via `/storybook` route in dev

---

## Technical Specification

### Responsive Breakpoints

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      containers: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ]
};
```

### Mobile Navigation Pattern

```tsx
// src/components/layout/MobileNav.tsx
'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <nav className="flex flex-col gap-4">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

### Responsive Table Pattern

```tsx
// src/components/ui/DataTable.tsx (modify existing)
export function DataTable({ data, columns }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className="space-y-2">
        {data.map(row => (
          <Card key={row.id} className="p-4">
            <CardHeader>
              <CardTitle className="text-base">{row.primaryField}</CardTitle>
              <CardDescription>{row.secondaryField}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {columns.map(col => (
                <div key={col.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {col.header}
                    :
                  </span>
                  <span className="font-medium">{row[col.accessorKey]}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Desktop: render standard table
  return <Table>...</Table>;
}
```

---

## Implementation Tasks

### Task 1: Install Container Queries Plugin
**Estimated:** 15 minutes

- [ ] Install `@tailwindcss/container-queries` package
- [ ] Add plugin to `tailwind.config.ts`
- [ ] Configure container sizes
- [ ] Test container queries work in development

**Definition of Done:**
- Package installed and configured
- Container query classes available (`@md:`, `@lg:`, etc.)
- No build errors

---

### Task 2: Create Mobile Navigation Component
**File:** `src/components/layout/MobileNav.tsx`
**Estimated:** 2 hours

- [ ] Create MobileNav component with Sheet (drawer)
- [ ] Add hamburger menu button (44x44px)
- [ ] Implement slide-in animation (300ms ease)
- [ ] Add navigation links from existing sidebar
- [ ] Auto-close on navigation
- [ ] Add backdrop click handler
- [ ] Lock body scroll when open

**Definition of Done:**
- Component works on mobile (<768px)
- Hidden on desktop (≥768px)
- Smooth animations
- Accessible (keyboard navigation, ARIA labels)
- Storybook story created

---

### Task 3: Create Responsive Layout Wrapper
**File:** `src/components/layout/ResponsiveLayout.tsx`
**Estimated:** 1.5 hours

- [ ] Create ResponsiveLayout component
- [ ] Render desktop sidebar at ≥768px
- [ ] Render mobile nav at <768px
- [ ] Handle header layout differences
- [ ] Manage main content padding/margins
- [ ] Add skip-to-content link (accessibility)

**Definition of Done:**
- Layout switches correctly at breakpoint
- Content area adjusts padding
- No layout shift when resizing
- Works with existing pages

---

### Task 4: Implement Table Card View Mode
**File:** `src/components/ui/DataTable.tsx` (modify)
**Estimated:** 3 hours

- [ ] Add `useMediaQuery` hook for breakpoint detection
- [ ] Implement card view rendering for mobile
- [ ] Map table columns to card fields
- [ ] Preserve sorting functionality (dropdown)
- [ ] Preserve filtering functionality (drawer)
- [ ] Add card tap handler (navigate to detail)
- [ ] Style cards for readability

**Definition of Done:**
- Tables switch to cards at <768px
- All table features work in card mode
- Cards are touch-friendly (44px tap area)
- Loading/empty states work
- Tested on 3+ tables (Loans, Borrowers, Lenders)

---

### Task 5: Update Forms for Mobile Layout
**Files:** Multiple form components
**Estimated:** 2 hours

- [ ] Update grid classes: `grid-cols-1 md:grid-cols-2`
- [ ] Ensure labels are above inputs on mobile
- [ ] Make submit buttons full-width on mobile
- [ ] Add adequate spacing (12px between fields)
- [ ] Test keyboard behavior (input focuses correctly)
- [ ] Update form validation display

**Forms to Update:**
- Loan Application form
- Borrower create/edit form
- Payment record form
- Property create/edit form

**Definition of Done:**
- All forms single column at <768px
- Multi-column at ≥768px
- Submit buttons 44px height
- No horizontal scroll
- Keyboard works correctly

---

### Task 6: Touch Target Audit & Fixes
**Estimated:** 1.5 hours

- [ ] Audit all interactive elements for size
- [ ] Update button heights to min-h-11 (44px)
- [ ] Update icon buttons to 44x44px
- [ ] Add padding to checkboxes/radios for larger tap area
- [ ] Update table row min-height to 44px
- [ ] Test with Chrome DevTools "Show tap areas"

**Definition of Done:**
- All interactive elements ≥44x44px
- No failing audit items
- Visual testing on real device confirms easy tapping

---

### Task 7: Create Media Query Hook
**File:** `src/hooks/useMediaQuery.ts`
**Estimated:** 30 minutes

- [ ] Create reusable `useMediaQuery` hook
- [ ] Handle SSR (return false initially)
- [ ] Add debounce for performance
- [ ] Export common breakpoints (isMobile, isTablet, isDesktop)

```typescript
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

**Definition of Done:**
- Hook works reliably
- No memory leaks
- SSR-safe
- Unit tested

---

### Task 8: Mobile Testing & Fixes
**Estimated:** 2 hours

- [ ] Test on iPhone 14 (390px) - portrait and landscape
- [ ] Test on iPad (768px) - portrait and landscape
- [ ] Test on desktop (1920px)
- [ ] Fix any layout issues discovered
- [ ] Verify no horizontal scroll at 375px
- [ ] Verify all touch targets work
- [ ] Test on real devices (not just simulator)

**Definition of Done:**
- All ACs verified on real devices
- No critical bugs
- Smooth performance (no jank)

---

### Task 9: Storybook Documentation
**Estimated:** 1.5 hours

- [ ] Create "Mobile Patterns" section in Storybook
- [ ] Add stories for MobileNav (open/closed)
- [ ] Add stories for ResponsiveTable (mobile/desktop)
- [ ] Add stories for form layouts (mobile/desktop)
- [ ] Document breakpoints and when to use each pattern
- [ ] Add code snippets for copy-paste

**Definition of Done:**
- Storybook has comprehensive mobile documentation
- All patterns have visual examples
- Code is copy-paste ready
- Includes Do's and Don'ts

---

## Files to Create

1. `src/components/layout/MobileNav.tsx` (mobile navigation)
2. `src/components/layout/ResponsiveLayout.tsx` (layout wrapper)
3. `src/hooks/useMediaQuery.ts` (breakpoint hook)

**Total:** 3 new files, ~400 lines of code

---

## Files to Modify

1. `src/components/ui/DataTable.tsx` (add card view mode)
2. `src/app/[locale]/layout.tsx` (use ResponsiveLayout)
3. `tailwind.config.ts` (add container queries plugin)
4. Multiple form components (responsive grid classes)

---

## Dependencies

### External
- `@tailwindcss/container-queries` (new dependency)

### Internal
- Shadcn UI components: Sheet, Card, Button
- Existing table components
- Existing form components

---

## Testing Strategy

### Manual Testing
- Test on real devices: iPhone 14, iPad, desktop
- Test all major pages at 375px, 768px, 1024px, 1440px
- Verify no horizontal scroll
- Verify touch targets are easy to tap

**Target:** 100% of pages tested at all breakpoints

### Visual Regression Testing
- Capture screenshots at each breakpoint
- Compare before/after (if tooling available)

**Target:** No unintended layout changes

### Accessibility Testing
- Axe DevTools audit on mobile and desktop
- Keyboard navigation testing
- Screen reader testing (VoiceOver on iOS)

**Target:** Axe score ≥90, no keyboard traps

---

## Definition of Done

- [ ] All 8 acceptance criteria verified
- [ ] All 9 implementation tasks completed
- [ ] Manual testing on iPhone 14, iPad, desktop
- [ ] Axe DevTools score ≥90
- [ ] No horizontal scroll at 375px
- [ ] Storybook documentation complete
- [ ] Code review completed
- [ ] Merged to main

---

## Notes

### Design Decisions
- Hamburger menu chosen over bottom navigation (consistency with desktop sidebar)
- Card view for tables (better mobile UX than horizontal scroll)
- Single-column forms (cognitive load reduction)

### Future Enhancements (Out of Scope)
- Bottom sheet modals for mobile (Epic 5)
- Swipe gestures for list items (Epic 5)
- Camera upload patterns (Epic 5)
- Offline mode (Phase 4)

### Known Limitations
- Container queries require modern browsers (95%+ support)
- Some complex tables may still need horizontal scroll (edge case)
- Landscape mode on small phones (<414px) may be cramped

---

**Story Status:** Ready for Development
**Created:** October 19, 2025
**Last Updated:** October 19, 2025
**Estimated Completion:** 1 day
