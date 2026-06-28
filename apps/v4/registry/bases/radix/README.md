# Radix UI Component Library

The **Radix** implementation of shadcn/ui components built on [Radix UI](https://www.radix-ui.com), a popular headless component library maintained by WorkOS. This is an alternative implementation with Radix UI's design philosophy.

## Overview

- **60 UI Components** - Complete component set matching the base library
- **Radix UI Foundation** - Built on Radix UI's proven component primitives
- **Unstyled & Customizable** - Fully styled with Tailwind but easily customizable
- **Production Ready** - Used in production by thousands of projects

## Key Differences from Base

| Aspect | Base | Radix |
|--------|------|-------|
| **Foundation** | @base-ui/react | Radix UI |
| **Architecture** | Headless from MUI | Community-driven, WorkOS-backed |
| **API Style** | Base UI API | Radix UI API |
| **Component Set** | Same components, different implementation | Same components, different implementation |
| **Styling** | Tailwind + CSS vars | Tailwind + CSS vars |

## Component Structure

```
radix/
├── ui/                    # 60 UI components (Radix-based)
├── examples/             # 100+ usage examples
├── blocks/               # 30+ pre-built page templates
├── hooks/                # Utility hooks (use-mobile, etc)
├── lib/                  # Shared utilities
├── components/           # Additional helper components
├── internal/             # Internal-only components
└── registry.ts           # Component registry metadata
```

## Quick Start

### 1. Install Components

Using the shadcn CLI:

```bash
npx shadcn-ui@latest add --base radix button
npx shadcn-ui@latest add --base radix input
npx shadcn-ui@latest add --base radix dialog
```

Or add multiple at once:

```bash
npx shadcn-ui@latest add --base radix button input dialog card alert
```

### 2. Use in Your App

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

### 3. Customize

All components use Tailwind CSS and can be customized:

```tsx
// components/ui/button.tsx
export const buttonVariants = cva(
  // Change base styles here
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
    },
  }
)
```

## Core Dependencies

### Required
- **@radix-ui/react-**** - Radix UI component primitives (multiple packages)
- **class-variance-authority** - CSS-in-JS variant management
- **lucide-react** - Icon library
- **tailwindcss** - CSS framework

### Radix UI Packages Used

| Component | Radix Package |
|-----------|---------------|
| accordion | @radix-ui/react-accordion |
| alert-dialog | @radix-ui/react-alert-dialog |
| checkbox | @radix-ui/react-checkbox |
| collapsible | @radix-ui/react-collapsible |
| combobox | @radix-ui/react-select |
| context-menu | @radix-ui/react-context-menu |
| dialog | @radix-ui/react-dialog |
| dropdown-menu | @radix-ui/react-dropdown-menu |
| hover-card | @radix-ui/react-hover-card |
| label | @radix-ui/react-label |
| menubar | @radix-ui/react-menubar |
| pagination | N/A (custom) |
| popover | @radix-ui/react-popover |
| radio-group | @radix-ui/react-radio-group |
| scroll-area | @radix-ui/react-scroll-area |
| select | @radix-ui/react-select |
| slider | @radix-ui/react-slider |
| switch | @radix-ui/react-switch |
| tabs | @radix-ui/react-tabs |
| toggle | @radix-ui/react-toggle |
| toggle-group | @radix-ui/react-toggle-group |
| tooltip | @radix-ui/react-tooltip |

### Optional (for specific components)
| Component | Package | Version |
|-----------|---------|---------|
| calendar | react-day-picker | latest |
| calendar | date-fns | latest |
| carousel | embla-carousel-react | - |
| chart | recharts | 3.8.0 |
| command | cmdk | - |
| drawer | vaul | - |
| input-otp | input-otp | - |
| resizable | react-resizable-panels | - |
| sonner | sonner | - |

## Component Categories

### Navigation (8 components)
breadcrumb, dropdown-menu, menubar, navigation-menu, pagination, sidebar, tabs

### Forms (16 components)
button, checkbox, combobox, input, input-group, input-otp, label, native-select, radio-group, select, switch, textarea, toggle, toggle-group, field, form

### Layout (7 components)
card, separator, scroll-area, resizable, aspect-ratio, empty, field

### Dialogs (8 components)
alert-dialog, command, context-menu, dialog, drawer, hover-card, popover, sheet

### Data Display (3+ components)
badge, progress, skeleton, spinner, table, chart, calendar, alert

### Chat & Messaging (4 components)
attachment, bubble, message, message-scroller

See [Full Component Catalog](../COMPONENTS.md) for complete descriptions.

## Component Usage Patterns

All usage patterns are identical to the Base implementation. Swap `@base-ui/react` for `@radix-ui/*` imports automatically via the CLI.

### Form Pattern
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function MyForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### Dialog Pattern
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        {/* Content here */}
      </DialogContent>
    </Dialog>
  )
}
```

## Why Choose Radix?

1. **Well-Established** - Radix UI is battle-tested in production
2. **Great Documentation** - Radix provides excellent component documentation
3. **Community** - Larger community and ecosystem
4. **Accessibility** - Strong focus on accessible component primitives
5. **Composability** - Highly composable primitive components

## Why Choose Base?

1. **MUI Backing** - Maintained by Material-UI team
2. **Features** - Includes some additional features vs Radix
3. **Consistency** - Part of the larger MUI ecosystem
4. **Documentation** - Detailed Base UI documentation

## Dependency Map

### High-Dependency Components (used by multiple others)
- **button** - Used by: alert-dialog, dialog, sheet, sidebar, pagination, input-group, and 10+ more
- **separator** - Used by: button-group, field, item, and others

### Utility Hooks
- **use-mobile** - Responsive mobile detection (used by sidebar)

### Utility Functions
- **utils** - CSS class merging, type utilities

## Design System

All components use CSS variables for theming:

```css
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--primary: 240 5.9% 10%;
--primary-foreground: 0 0% 100%;
--secondary: 240 4.8% 95.9%;
--secondary-foreground: 240 5.9% 10%;
/* ... and more */
```

## Best Practices

1. **Use CLI for installation** - Ensures correct Radix dependencies
   ```bash
   npx shadcn-ui@latest add --base radix button
   ```

2. **Follow Radix UI patterns** - Use slot props and composition
   ```tsx
   <Select>
     <SelectTrigger>
       <SelectValue placeholder="Select..." />
     </SelectTrigger>
     <SelectContent>
       <SelectItem value="option1">Option 1</SelectItem>
     </SelectContent>
   </Select>
   ```

3. **Import Radix utilities** - For advanced component composition
   ```tsx
   import * as Select from "@radix-ui/react-select"
   ```

4. **Reference Radix docs** - For primitive API details
   - [Radix UI Documentation](https://www.radix-ui.com)

## Migration from Base to Radix

Components have the same API, so migration is straightforward:

1. Use the CLI with `--base radix` flag
2. Component imports stay the same (from `@/components/ui/`)
3. Styling and usage patterns are identical
4. Some internal APIs may differ slightly (check Radix docs)

## Further Reading

- **Full Component Catalog**: [COMPONENTS.md](../COMPONENTS.md)
- **Pre-built Blocks**: [blocks/README.md](./blocks/README.md) - Page templates
- **Reuse Guide**: [REUSE_GUIDE.md](../REUSE_GUIDE.md) - Using across projects
- **Radix UI Docs**: [radix-ui.com](https://www.radix-ui.com) - Component APIs
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com) - Styling reference
