# Base UI Component Library

The **Base** implementation of shadcn/ui components built on [@base-ui/react](https://base-ui.com), a headless component library maintained by MUI. This is a full-featured, unstyled component library with built-in accessibility.

## Overview

- **60 UI Components** - Complete component set from primitives to complex layouts
- **Headless Design** - Fully styled but customizable with Tailwind CSS
- **Accessibility First** - Built with WCAG compliance in mind
- **Base UI Foundation** - Leverages battle-tested @base-ui/react components

## Component Structure

```
base/
├── ui/                    # 60 UI components
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
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

Or add multiple at once:

```bash
npx shadcn-ui@latest add button input dialog card alert
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

All components use Tailwind CSS and can be customized by editing the component files:

```tsx
// components/ui/button.tsx
export const buttonVariants = cva(
  // Change base styles here
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium",
  {
    variants: {
      variant: {
        // Add or modify variants
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
    },
  }
)
```

## Core Dependencies

### Required
- **@base-ui/react** - Headless UI components
- **class-variance-authority** - CSS-in-JS variant management
- **lucide-react** - Icon library
- **tailwindcss** - CSS framework

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

### [Navigation (8 components)](./ui/README.md#navigation)
breadcrumb, dropdown-menu, menubar, navigation-menu, pagination, sidebar, tabs

### [Forms (16 components)](./ui/README.md#forms)
button, checkbox, combobox, input, input-group, input-otp, label, native-select, radio-group, select, switch, textarea, toggle, toggle-group, field, form

### [Layout (7 components)](./ui/README.md#layout)
card, separator, scroll-area, resizable, aspect-ratio, empty, field

### [Dialogs (8 components)](./ui/README.md#dialogs)
alert-dialog, command, context-menu, dialog, drawer, hover-card, popover, sheet

### [Data Display (3 components)](./ui/README.md#data)
badge, progress, skeleton, spinner, table, chart, calendar, alert

### [Chat & Messaging (4 components)](./ui/README.md#chat)
attachment, bubble, message, message-scroller

See [Full Component Catalog](../COMPONENTS.md) for complete descriptions.

## Component Usage Patterns

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

### Data Display Pattern
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DataTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* rows here */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
```

### Modal Pattern
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
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        {/* Content here */}
      </DialogContent>
    </Dialog>
  )
}
```

## Dependency Map

### High-Dependency Components (used by multiple others)
- **button** - Used by: alert-dialog, dialog, sheet, sidebar, pagination, input-group, and 10+ more
- **separator** - Used by: button-group, field, item, and others

### Utility Hooks
- **use-mobile** - Responsive mobile detection (used by sidebar)

### Utility Functions
- **utils** - CSS class merging, type utilities

## Design System

All components use CSS variables for theming. The default theme includes:

```css
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--primary: 240 5.9% 10%;
--primary-foreground: 0 0% 100%;
--secondary: 240 4.8% 95.9%;
--secondary-foreground: 240 5.9% 10%;
/* ... and more */
```

Customize by editing `app/globals.css` or your CSS framework configuration.

## Best Practices

1. **Import from components/ui** - All components are in the ui folder
   ```tsx
   import { Button } from "@/components/ui/button"
   ```

2. **Use Tailwind for styling** - Avoid adding additional CSS
   ```tsx
   <Button className="w-full md:w-auto">Click me</Button>
   ```

3. **Compose components** - Build complex UIs from primitives
   ```tsx
   <Card>
     <CardHeader>
       <CardTitle>Title</CardTitle>
     </CardHeader>
     <CardContent>
       {/* Content */}
     </CardContent>
   </Card>
   ```

4. **Leverage examples** - Check examples/ directory for patterns
   ```bash
   # Examples are available in the examples/ directory
   ls examples/
   ```

5. **Use the sidebar hook** - For responsive mobile/desktop
   ```tsx
   import { useSidebar } from "@/components/ui/sidebar"
   
   export function MyComponent() {
     const { open } = useSidebar()
     return <>{open ? 'Open' : 'Closed'}</>
   }
   ```

## Advanced

### Custom Components
You can extend the library by creating your own components that follow the same patterns:

1. Create a new file in `components/ui/`
2. Use the same component structure with exports
3. Apply the same CSS variable theming
4. Document with examples in `components/ui/examples/`

### Theming
Switch themes by changing CSS variables:

```css
/* Light theme (default) */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
}

/* Dark theme */
[data-theme="dark"] {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 100%;
}
```

### TypeScript Support
All components are fully typed with TypeScript. Use type inference for better DX:

```tsx
import { Button, type ButtonProps } from "@/components/ui/button"

interface MyButtonProps extends ButtonProps {
  customProp?: string
}
```

## Troubleshooting

### Component not rendering
- Ensure the component folder structure matches: `components/ui/{component-name}.tsx`
- Check imports use `@/components/ui/` path alias

### Styling issues
- Verify Tailwind CSS is configured correctly
- Check CSS variables are defined in global CSS
- Use browser DevTools to inspect applied classes

### Dependency conflicts
- Some components require peer dependencies (see Core Dependencies above)
- Install with: `npm install package-name`
- Check package.json for current versions

## Further Reading

- **Full Component Catalog**: [COMPONENTS.md](../COMPONENTS.md)
- **Pre-built Blocks**: [blocks/README.md](./blocks/README.md) - Page templates
- **Reuse Guide**: [REUSE_GUIDE.md](../REUSE_GUIDE.md) - Using across projects
- **Base UI Docs**: [base-ui.com](https://base-ui.com) - Component APIs
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com) - Styling reference
