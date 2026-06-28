# Component Structure & Architecture

How shadcn/ui is organized, the philosophy behind it, and how to navigate and extend the library.

---

## Philosophy

shadcn/ui is organized around these core principles:

1. **Copy, Don't Install** - Components are meant to be copied into your project, not installed as a package
2. **Customizable by Default** - All components use CSS and can be modified
3. **Unstyled Foundation** - Components are built on headless libraries (Base UI or Radix UI)
4. **Tailwind-First** - All styling uses Tailwind CSS and CSS variables
5. **Accessible** - Built with WCAG compliance and accessibility first
6. **Type-Safe** - Full TypeScript support out of the box

---

## Directory Structure

### Root Level

```
apps/v4/registry/
├── COMPONENTS.md              # Component catalog (you are here)
├── REUSE_GUIDE.md            # How to reuse across projects
├── STRUCTURE.md              # Architecture documentation
├── README.md                 # Registry overview
├── bases/                    # Authored component implementations
├── new-york-v4/              # Legacy registry (maintained)
├── styles/                   # Design token CSS files
├── config.ts                 # Registry configuration
├── directory.json            # Block metadata
├── __blocks__.json           # Block catalog
└── public/                   # Generated outputs
    └── component-index.json  # Searchable component index
```

### Base Implementation Structure

```
bases/base/
├── README.md                 # Base implementation guide
├── registry.ts               # Entry point, combines all registries
├── ui/                       # 60 UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   ├── _registry.ts          # Component metadata
│   └── README.md             # Component reference
├── examples/                 # 100+ usage examples
│   ├── button-example.tsx
│   ├── button-demo.tsx
│   ├── dialog-example.tsx
│   └── _registry.ts          # Example metadata
├── blocks/                   # 30+ pre-built page templates
│   ├── dashboard-01/
│   │   ├── page.tsx
│   │   ├── data.json
│   │   └── components/
│   ├── sidebar-01/
│   ├── login-01/
│   └── _registry.ts          # Block metadata
├── hooks/                    # Utility hooks
│   ├── use-mobile.ts
│   ├── README.md
│   └── _registry.ts
├── lib/                      # Utility functions
│   ├── utils.ts
│   ├── README.md
│   └── _registry.ts
├── components/               # Helper components
├── internal/                 # Internal-only components
└── _registry.ts              # Metadata (imports from subfolders)
```

### Radix Implementation

Same structure as Base, but using Radix UI as the foundation:

```
bases/radix/
├── README.md
├── registry.ts
├── ui/
├── examples/
├── blocks/
├── hooks/
├── lib/
└── ...
```

### Legacy Registry

```
new-york-v4/
├── ui/
├── examples/
├── blocks/
├── hooks/
├── lib/
└── ...
```

---

## How Components Are Organized

### By Category

Components are organized into logical categories:

#### Navigation (8)
- breadcrumb, dropdown-menu, menubar, navigation-menu, pagination, sidebar, tabs

#### Forms (16)
- button, checkbox, combobox, input, input-group, input-otp, label, native-select, radio-group, select, switch, textarea, toggle, toggle-group, field, form

#### Layout (7)
- card, separator, scroll-area, resizable, aspect-ratio, empty, field

#### Dialogs (8)
- alert-dialog, command, context-menu, dialog, drawer, hover-card, popover, sheet

#### Data Display (3+)
- badge, progress, skeleton, spinner, table, chart, calendar, alert

#### Chat (4)
- attachment, bubble, message, message-scroller

### By File Type

```
{component}.tsx          # Main component export
_registry.ts            # Metadata and registry configuration
examples/               # Usage examples
blocks/                 # Pre-built templates
```

---

## Registry System

The registry system is the heart of shadcn/ui. It describes each component and its dependencies.

### Component Registry Entry

Each component has a registry entry defining its structure:

```typescript
{
  name: "button",
  type: "registry:ui",
  files: [
    {
      path: "ui/button.tsx",
      type: "registry:ui"
    }
  ],
  dependencies: ["class-variance-authority", "lucide-react"],
  registryDependencies: [],  // Other UI components
  meta: {
    links: {
      docs: "https://ui.shadcn.com/docs/components/base/button",
      examples: "https://ui.shadcn.com/code/...",
      api: "https://base-ui.com/react/components/button"
    }
  }
}
```

### Registry Entry Properties

| Property | Type | Purpose |
|----------|------|---------|
| **name** | string | Unique component identifier |
| **type** | enum | Component type (registry:ui, registry:example, registry:block, etc) |
| **files** | array | Files to copy/install |
| **dependencies** | array | NPM package dependencies |
| **registryDependencies** | array | Other UI components needed |
| **meta** | object | Additional metadata (links, descriptions) |
| **docs** | string | Installation instructions (optional) |

### How Registry Works

1. **Discovery** - CLI reads `_registry.ts` files
2. **Resolution** - Resolves all dependencies (npm + registry)
3. **Generation** - Creates `__index__.tsx` and `__components__.tsx` files
4. **Installation** - Copies files to user's project

### Building the Registry

```bash
# Generate registry outputs
npm run build-registry
```

This creates:
- `__index__.tsx` - Component index with all imports
- `__components__.tsx` - Component metadata
- `directory.json` - Block metadata
- Generated outputs per style (base-nova/, radix-sera/, etc.)

---

## File Naming Conventions

### Component Files

| Pattern | Example | Purpose |
|---------|---------|---------|
| `{name}.tsx` | `button.tsx` | Main component |
| `{name}-{variant}.tsx` | `button-destructive.tsx` | Component variant (in examples) |
| `{name}-demo.tsx` | `button-demo.tsx` | Usage demo (in examples) |
| `{name}-example.tsx` | `button-example.tsx` | Full example (in examples) |
| `_registry.ts` | `ui/_registry.ts` | Component metadata |

### Directory Names

| Directory | Contains |
|-----------|----------|
| `ui/` | UI components (60 files) |
| `examples/` | Usage examples (100+ files) |
| `blocks/` | Pre-built templates (30+ folders) |
| `hooks/` | React hooks (use-mobile.ts, etc) |
| `lib/` | Utilities (utils.ts, etc) |
| `components/` | Helper components |
| `internal/` | Internal-only components |

---

## CSS Variables System

### How Styling Works

All components use CSS custom properties (variables) for styling:

```css
/* Color System */
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--primary: 240 5.9% 10%;
--primary-foreground: 0 0% 100%;
--secondary: 240 4.8% 95.9%;
--secondary-foreground: 240 5.9% 10%;
--muted: 240 4.8% 95.9%;
--muted-foreground: 240 3.8% 45.9%;
--accent: 240 4.8% 95.9%;
--accent-foreground: 240 5.9% 10%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 0 0% 98%;
--border: 240 5.9% 90%;
--input: 240 5.9% 90%;
--ring: 240 5.9% 10%;
```

### Style Variants

8 different design styles provided:

1. **nova** - Clean, modern
2. **sera** - Elegant, minimalist
3. **luma** - Bright, vibrant
4. **midnight** - Dark, sophisticated
5. **slate** - Neutral, professional
6. **zinc** - Cool, minimal
7. **neutral** - Balanced, versatile
8. **stone** - Warm, natural

### How Styles Work

Each style has a CSS file in `styles/style-{name}.css`:

```css
/* style-nova.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    /* ... all variables ... */
  }
}
```

When you initialize shadcn/ui, it copies the CSS variables for your chosen style to your project.

---

## Component Dependencies

### Dependency Types

1. **No dependencies** (Standalone)
   - button, badge, card, alert, separator, etc.
   - Can use completely independently

2. **Registry Dependencies** (Other UI components)
   - sidebar → button, input, separator, sheet, etc.
   - input-group → button, input, textarea
   - Installing auto-installs dependencies

3. **NPM Dependencies** (External packages)
   - calendar → react-day-picker, date-fns
   - carousel → embla-carousel-react
   - sonner → sonner, next-themes
   - User must install after CLI

### Dependency Resolution

When installing a component:

```bash
npx shadcn-ui@latest add sidebar
```

The CLI:
1. ✅ Copies sidebar.tsx
2. ✅ Copies button.tsx (dependency)
3. ✅ Copies input.tsx (dependency)
4. ✅ Copies separator.tsx (dependency)
5. ✅ And so on...
6. ✅ Prompts to install npm dependencies

### High-Dependency Components

These pull in many other components:

| Component | Dependencies | Count |
|-----------|--------------|-------|
| sidebar | button, input, separator, sheet, skeleton, tooltip, use-mobile | 7 |
| input-group | button, input, textarea | 3 |
| menubar | dropdown-menu | 1 |
| breadcrumb | None | 0 |
| button | None | 0 |

---

## Blocks System

Pre-built page templates composed of multiple components and utilities.

### Block Structure

```
blocks/dashboard-01/
├── page.tsx              # Main block component
├── data.json            # Mock data
├── README.md            # Description
└── components/
    ├── app-sidebar.tsx
    ├── chart-area.tsx
    ├── data-table.tsx
    └── ...
```

### Block Registry Entry

```typescript
{
  name: "dashboard-01",
  type: "registry:block",
  dependencies: ["recharts"],
  registryDependencies: [
    "button", "card", "chart", "input", "sidebar", "table"
  ],
  files: [
    { path: "blocks/dashboard-01/page.tsx", type: "registry:block" },
    { path: "blocks/dashboard-01/components/...", type: "registry:component" },
    { path: "blocks/dashboard-01/data.json", type: "registry:json" }
  ]
}
```

### Available Blocks

- Dashboard templates (8+)
- Sidebar templates (16)
- Login/Auth templates (5)
- Landing page sections
- Chart examples
- Data table examples

---

## Building Custom Components

### Component Template

```tsx
// components/ui/my-component.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary"
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
)
MyComponent.displayName = "MyComponent"

export { MyComponent }
```

### Adding to Registry

```typescript
// components/ui/_registry.ts
import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
  {
    name: "my-component",
    type: "registry:ui",
    files: [
      {
        path: "ui/my-component.tsx",
        type: "registry:ui"
      }
    ]
  }
]
```

### Adding Documentation

Create `my-component-example.tsx` in examples folder:

```tsx
import { MyComponent } from "@/components/ui/my-component"

export default function Example() {
  return (
    <div className="flex gap-4">
      <MyComponent variant="default">Default</MyComponent>
      <MyComponent variant="secondary">Secondary</MyComponent>
    </div>
  )
}
```

---

## Build & Generation Process

### Source to Output

```
Source Components (bases/*/ui/)
        ↓
Registry Metadata (_registry.ts)
        ↓
Build Process (build-registry.mts)
        ↓
Generated Outputs
├── __index__.tsx (imports all)
├── __components__.tsx (metadata)
├── directory.json (block index)
└── base-{style}/ (all combinations)
    └── ui/ (styled components)
```

### Generated Outputs

```
registry/
├── __index__.tsx          # All components indexed
├── __components__.tsx     # Component metadata
├── directory.json         # Block metadata
└── base-nova/            # Output for base + nova style
    ├── ui/               # All 60 components
    ├── examples/         # All examples
    └── blocks/           # All blocks
```

---

## Package.json Configuration

### Scripts

```json
{
  "scripts": {
    "build-registry": "tsx scripts/build-registry.mts",
    "dev": "next dev",
    "build": "next build"
  }
}
```

### Dependencies

```json
{
  "dependencies": {
    "@base-ui/react": "latest",
    "class-variance-authority": "latest",
    "lucide-react": "latest",
    "tailwindcss": "^3.0.0"
  }
}
```

---

## Best Practices for Organization

1. **One component per file** - Easy to find and maintain
2. **Consistent naming** - Use kebab-case for files
3. **TypeScript everywhere** - Full type safety
4. **Document examples** - Every component should have usage examples
5. **Test dependencies** - Ensure registry dependencies are correct
6. **Update registry** - Keep _registry.ts entries current

---

## Advanced Topics

### Custom Build Process

```bash
# Build specific base
npm run build-registry -- --base radix

# Build specific style
npm run build-registry -- --style nova
```

### Adding New Styles

1. Create `styles/style-custom.css` with CSS variables
2. Add to `styles.tsx` configuration
3. Rebuild registry to generate all combinations

### Component Inheritance

Components can extend other components:

```tsx
import { Button, buttonVariants } from "@/components/ui/button"

export function SubmitButton(props) {
  return <Button variant="default" {...props} />
}
```

---

## File Size & Performance

### Component Sizes

Most components are:
- **Typical**: 1-3 KB (uncompressed)
- **Complex** (sidebar, command): 5-15 KB
- **Total library**: 60KB+ (uncompressed)

### Tree-Shaking

- Components are designed to tree-shake
- Only imported components are included in build
- No global side effects

### CSS Impact

- CSS variables: ~2 KB
- Tailwind classes: Depends on PurgeCSS configuration
- Per-component: Minimal additional CSS

---

## See Also

- **[Component Catalog](./COMPONENTS.md)** - All components documented
- **[Reuse Guide](./REUSE_GUIDE.md)** - How to reuse across projects
- **[Base Documentation](./bases/base/README.md)** - Base implementation details
- **[Radix Documentation](./bases/radix/README.md)** - Radix implementation details
