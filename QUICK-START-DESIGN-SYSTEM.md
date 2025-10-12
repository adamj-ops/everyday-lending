# Quick Start: Using the Attio Design System

## 🎨 Color Reference

### Primary Colors
```tsx
// Attio Blue - Use for primary actions
bg-primary text-primary-foreground      // #276bf0
bg-primary-100                          // Light blue #dcedff
bg-primary-300                          // Medium #5081e0

// Cyan Accent - Use for avatars
bg-[#19bbe8]                            // Cyan accent
```

### Neutrals & Text
```tsx
// Backgrounds
bg-white                                // #ffffff
bg-[#fbfbfb]                           // Subtle hover
bg-[#f4f5f7]                           // Light gray

// Borders
border-[#eeeff1]                       // Primary border (Attio gray)
border-[#dcdbdd]                       // Secondary border

// Text
text-foreground                         // Black #000000
text-[#696a6c]                         // Muted gray
text-[#b8b9bb]                         // Placeholder
```

## 🔘 Button Usage

```tsx
import { Button } from '@/components/ui/button';

// Primary action
<Button variant="default" size="md">
  Save Changes
</Button>

// Secondary action
<Button variant="outline" size="md">
  Cancel
</Button>

// Subtle action
<Button variant="ghost" size="sm">
  <MoreHorizontal className="h-4 w-4" />
</Button>

// Sizes: sm (20px), md (28px), lg (32px), xl (35px)
// Variants: default, outline, ghost, secondary, destructive, link
```

## 🏷️ Badge/Tag Usage

```tsx
import { Badge } from '@/components/ui/badge';

// Category tags (like B2B, B2C in Figma)
<Badge variant="category">B2B</Badge>
<Badge variant="category">E-commerce</Badge>

// Status indicators
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">New</Badge>

// Variants: default, category, success, warning, info, outline
```

## 👤 Avatar Usage

```tsx
import { Avatar } from '@/components/ui/avatar';

// With image
<Avatar
  src="/avatar.jpg"
  alt="John Doe"
  fallback="JD"
  size="md"
/>

// With initials only (cyan background, white text)
<Avatar
  fallback="JD"
  size="md"
/>

// Sizes: sm (20px), md (24px), lg (32px), xl (40px)
```

## 📝 Input Usage

```tsx
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Basic input
<Input
  type="text"
  placeholder="Enter name..."
/>

// With icon
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b8b9bb]" />
  <Input
    placeholder="Search..."
    className="pl-10 h-7"
  />
</div>
```

## 📊 Table Styling

### Attio Table Pattern
```tsx
<Table>
  <TableHeader className="sticky top-0 bg-white z-10">
    <TableRow className="border-b border-[#eeeff1] h-[37px]">
      <TableHead className="px-4">
        <button className="flex items-center gap-2 font-medium text-sm">
          Column Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    <TableRow className="cursor-pointer hover:bg-[#fbfbfb] border-b border-[#eeeff1] h-[37px]">
      <TableCell className="px-4">
        <span className="text-sm text-foreground">
          Cell content
        </span>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Key Table Specs
- **Row Height**: `h-[37px]` (exactly 37px)
- **Border**: `border-[#eeeff1]` (Attio gray)
- **Hover**: `hover:bg-[#fbfbfb]` (subtle off-white)
- **Padding**: `px-4` (16px horizontal)
- **Text Size**: `text-sm` (13px) for content

## 🎯 Common Patterns

### Search Bar
```tsx
<div className="px-4 py-3 border-b border-[#eeeff1]">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b8b9bb]" />
    <Input
      type="search"
      placeholder="Search..."
      className="pl-10 h-7"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
</div>
```

### User Info with Avatar
```tsx
<div className="flex items-center gap-3">
  <Avatar
    src={user.avatar}
    fallback={user.name.split(' ').map(n => n[0]).join('')}
    size="md"
  />
  <div>
    <p className="font-medium text-sm text-foreground">
      {user.name}
    </p>
    <p className="text-xs text-[#696a6c] font-semibold">
      {user.email}
    </p>
  </div>
</div>
```

### Footer Count
```tsx
<div className="px-4 py-3 border-t border-[#eeeff1]">
  <p className="text-sm text-[#696a6c]">
    Showing {filtered.length} of {total.length} items
  </p>
</div>
```

## 📏 Spacing System

Use consistent 4px-based spacing:
```tsx
gap-1   // 4px
gap-2   // 8px
gap-3   // 12px
gap-4   // 16px (most common)
gap-6   // 24px

px-4    // 16px horizontal padding (tables, cards)
py-3    // 12px vertical padding (search, footer)
py-4    // 16px vertical padding (content)
```

## 🔤 Typography

### Font Families
- **Manrope**: UI elements, buttons, navigation (primary)
- **Inter**: Table content, body text (secondary)

### Common Text Styles
```tsx
// Headers
className="font-medium text-sm"          // Table headers
className="font-semibold text-lg"        // Section titles

// Content
className="text-sm text-foreground"      // Primary content
className="text-xs text-[#696a6c]"       // Secondary/muted
className="text-xs font-semibold"        // Small labels

// Bold Actions
className="text-xs font-bold"            // Buttons, badges
```

## ✅ Do's and Don'ts

### ✅ Do:
- Use `border-[#eeeff1]` for all table and card borders
- Use `h-[37px]` for table rows
- Use `hover:bg-[#fbfbfb]` for table row hovers
- Use cyan `#19bbe8` for avatars
- Use `text-[#696a6c]` for muted text
- Use `Badge variant="category"` for tags

### ❌ Don't:
- Don't use `border-neutral-200` (use `border-[#eeeff1]`)
- Don't use `hover:bg-neutral-50` (use `hover:bg-[#fbfbfb]`)
- Don't use random row heights (stick to 37px)
- Don't mix neutral colors with Attio colors
- Don't use standard avatars (use cyan version)

## 🚀 Quick Component Examples

### Action Buttons Row
```tsx
<div className="flex items-center gap-2">
  <Button variant="default" size="md">
    Save
  </Button>
  <Button variant="outline" size="md">
    Cancel
  </Button>
  <Button variant="ghost" size="md">
    More Options
  </Button>
</div>
```

### Category Tags
```tsx
<div className="flex gap-2">
  <Badge variant="category">B2B</Badge>
  <Badge variant="category">E-commerce</Badge>
  <Badge variant="category">Finance</Badge>
</div>
```

### Status Indicator
```tsx
{status === 'active' && <Badge variant="success">Active</Badge>}
{status === 'pending' && <Badge variant="warning">Pending</Badge>}
{status === 'inactive' && <Badge variant="category">Inactive</Badge>}
```

---

## 📚 More Resources

- **Full Documentation**: See `DESIGN-SYSTEM-IMPLEMENTATION.md`
- **Design Tokens**: `src/styles/design-tokens.ts`
- **Figma Source**: 🎨 Replicated UI (channel: t8d2rka6)
- **Examples**: Check `borrower-table.tsx`, `lender-table.tsx`, `loan-table.tsx`

**Questions?** All components follow the Attio design pattern extracted from Figma!
