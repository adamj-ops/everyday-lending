# Figma Design Extraction & Implementation Plan

## Goal
Extract exact design specifications from Attio Figma file and rebuild components to match production-grade quality.

---

## Step 1: Figma File Access Setup ✅

**Status**: MCP server added to Claude Code

The Figma MCP server allows Claude to:
- Read component specifications
- Extract design tokens (colors, spacing, typography)
- Analyze layer structure
- Export component measurements

**Figma File**:
`https://www.figma.com/design/BlK331Wp1CJ9fUG1q98Gmt/Attio---Customer-Relationship-SaaS-UI--Community-?node-id=69-2984`

---

## Step 2: Design Token Extraction

### What to Extract from Figma

#### 1. **Color System**
Extract all color variables:
- Primary colors (blues)
- Neutral palette (grays with subtle variations)
- Semantic colors (success, error, warning, info)
- State colors (hover, active, disabled)
- Alpha variants (overlays, shadows)

Example format:
```json
{
  "colors": {
    "neutral": {
      "25": "#FAFBFC",
      "50": "#F5F7F9",
      "100": "#EDF0F2",
      "200": "#DFE3E6",
      "300": "#C9CED3",
      ...
    }
  }
}
```

#### 2. **Typography System**
Extract font specifications:
- Font families (Inter, JetBrains Mono)
- Font sizes (11px, 12px, 13px, 14px, 16px, 18px, 20px, 24px, 32px)
- Font weights (400, 500, 600, 700)
- Line heights (1.2, 1.4, 1.5)
- Letter spacing (-0.02em, -0.01em, 0, 0.01em)

#### 3. **Spacing System**
Extract spacing scale:
- Base unit: 2px or 4px
- Scale: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80

#### 4. **Border Radius**
- Small: 4px (buttons, badges)
- Medium: 6px (cards, inputs)
- Large: 8px (modals, panels)
- XLarge: 12px (feature cards)

#### 5. **Shadows**
Extract elevation system:
- xs: subtle border-like shadow
- sm: slight lift
- md: card hover
- lg: drawer/modal
- xl: popover/dropdown

#### 6. **Component Measurements**
For each component (Table, Card, Button, Input):
- Height variants (compact, default, comfortable)
- Padding (x and y)
- Icon sizes
- Gap between elements

---

## Step 3: Component-Specific Analysis

### A. Data Table (Records/List View)

**What to capture from Figma**:
1. **Table Structure**
   - Header height and styling
   - Row height (default, hover, selected states)
   - Column padding
   - Border styles (where and when)

2. **Cell Content**
   - Text alignment per data type
   - Icon placement and size
   - Avatar dimensions
   - Badge styling
   - Number formatting

3. **Interactive States**
   - Default row
   - Hover row (background, shadow)
   - Selected row
   - Focus state
   - Loading skeleton

4. **Column Types**
   - Text column
   - Number column (right-aligned, tabular nums)
   - Date column
   - Status column (badge)
   - User column (avatar + name)
   - Actions column

5. **Micro-interactions**
   - Sort indicator animation
   - Row hover lift duration/easing
   - Action button fade-in timing
   - Checkbox animation

**Screenshots needed**:
- Default table view
- Table with hover state
- Table with selection
- Table header with sort
- Empty state
- Loading state

### B. Detail Panel (Drawer/Sidebar)

**What to capture**:
1. **Panel Structure**
   - Width (mobile, tablet, desktop)
   - Header height and padding
   - Tab bar height
   - Content padding
   - Footer height

2. **Header Design**
   - Avatar size and placement
   - Title typography
   - Subtitle styling
   - Action buttons
   - Badge placement

3. **Content Sections**
   - Section spacing
   - Label/value pairs layout
   - Divider styling
   - Collapsible sections

4. **Tabs**
   - Active tab indicator (underline, background)
   - Tab spacing
   - Icon + label layout
   - Badge on tabs

**Screenshots needed**:
- Drawer header
- Details tab
- Activity tab
- Documents tab
- Drawer on mobile

### C. Forms & Inputs

**What to capture**:
1. **Input Fields**
   - Height variants
   - Padding (x and y)
   - Border styling (default, focus, error)
   - Label positioning (floating vs top)
   - Help text styling
   - Icon placement (prefix, suffix)

2. **Buttons**
   - Height variants
   - Padding calculations
   - Border radius
   - State colors (default, hover, active, disabled)
   - Icon + text spacing
   - Loading state

3. **Selects/Dropdowns**
   - Trigger styling
   - Dropdown panel design
   - Option height
   - Selected state
   - Search input styling

4. **Multi-Step Progress**
   - Step circle size
   - Connector line thickness
   - Active/complete/incomplete states
   - Animation timing

**Screenshots needed**:
- All input states (default, focus, error, disabled)
- Button variants (primary, secondary, ghost, danger)
- Select dropdown open
- Multi-step form progress

### D. Status Indicators

**What to capture**:
1. **Badges**
   - Size variants
   - Padding calculations
   - Background colors per status
   - Border (yes/no, color)
   - Icon placement

2. **Progress Bars**
   - Height
   - Border radius
   - Background color
   - Fill colors per state
   - Animation timing

3. **Sparklines/Mini Charts**
   - Dimensions
   - Stroke width
   - Colors
   - Padding

---

## Step 4: Implementation Strategy

### Phase 1: Design Tokens (Day 1)
1. Extract all tokens from Figma
2. Create comprehensive `design-tokens.json`
3. Update `global.css` with Tailwind v4 tokens
4. Create token documentation

### Phase 2: Base Components (Day 2-3)
Rebuild from scratch with production quality:

1. **Enhanced Table Component**
   - Skeleton loading
   - Hover states with lift
   - Inline actions on hover
   - Column resizing
   - Density controls
   - Keyboard navigation

2. **Rich Detail Drawer**
   - Smooth slide-in animation
   - Tabbed interface with badges
   - Collapsible sections
   - Action bar
   - Edit mode

3. **Production Form Components**
   - Floating labels
   - Inline validation
   - Auto-save indicators
   - Smart defaults
   - Keyboard shortcuts

### Phase 3: Data Visualization (Day 4)
Add visual richness:

1. **Inline Charts**
   - Sparklines
   - Progress bars
   - Trend indicators
   - Utilization gauges

2. **Metric Cards**
   - Large numbers
   - Trend comparison
   - Mini charts
   - Status indicators

### Phase 4: Micro-interactions (Day 5)
Polish everything:

1. **Animations**
   - Hover transitions
   - Loading states
   - Success feedback
   - Error shaking

2. **Contextual Actions**
   - Quick actions on hover
   - Bulk select mode
   - Command palette
   - Keyboard shortcuts

---

## Step 5: Quality Checklist

Before considering a component "production-grade":

### Visual Quality
- [ ] Matches Figma pixel-perfect (use overlay comparison)
- [ ] Proper visual hierarchy (clear primary/secondary/tertiary)
- [ ] Consistent spacing (measured with precision)
- [ ] Smooth animations (no jank, proper easing)
- [ ] Beautiful empty states
- [ ] Loading states for all async actions

### Interaction Quality
- [ ] Hover states feel responsive (<100ms)
- [ ] Focus states visible and consistent
- [ ] Keyboard navigation works perfectly
- [ ] Touch targets are 44px minimum
- [ ] Error states are helpful
- [ ] Success feedback is clear

### Code Quality
- [ ] TypeScript strict mode passes
- [ ] No console errors/warnings
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Performant (no unnecessary re-renders)
- [ ] Documented (Storybook + JSDoc)
- [ ] Tested (unit + integration)

### Data Quality
- [ ] Handles empty states gracefully
- [ ] Handles large datasets (virtualization if needed)
- [ ] Handles loading states
- [ ] Handles error states
- [ ] Handles edge cases (long text, special characters)

---

## Tools for Precision

### 1. Figma to Code Tools
- **Figma Dev Mode**: Inspect spacing, colors, typography
- **Figma MCP**: Automated extraction via Claude
- **Manual Screenshots**: Overlay comparison

### 2. Design QA Tools
- **PixelSnap** (macOS): Measure distances on screen
- **Sizzy**: Responsive testing
- **Perfection** (Figma plugin): Detect misalignments

### 3. Browser DevTools
- **Pixel Perfect Pro** (Chrome extension): Overlay Figma on browser
- **WhatFont**: Verify font rendering
- **Pesticide**: Visualize all elements

---

## Next Actions

### Option A: Manual Extraction (You drive)
1. Open Figma file
2. Take screenshots of key components
3. Share screenshots with me
4. I'll implement pixel-perfect

### Option B: Automated Extraction (I drive)
1. You duplicate the Figma file to your workspace
2. Grant me access via Figma MCP
3. I extract tokens and specs automatically
4. I implement components

### Option C: Hybrid Approach (Recommended)
1. I create a detailed "Design Specification Template"
2. You fill it out from Figma (10-15 minutes)
3. I implement based on your exact specs
4. We iterate until perfect

**Which approach would you prefer?**

If you can share screenshots of these specific components from Figma, I can start immediately:
1. A complete data table (list view)
2. A detail panel/drawer (open state)
3. A form input (all states if possible)
4. Status badges and indicators
5. Empty state design

Alternatively, if you can export design tokens from Figma as JSON, that would be ideal!
