# Component Reuse Guide

How to effectively use and reuse shadcn/ui components across different projects and frameworks.

## Quick Navigation

- **[Choosing Base vs Radix](#choosing-base-vs-radix)** - Which implementation to use
- **[Installation Patterns](#installation-patterns)** - How to install components
- **[Project Setup](#project-setup)** - Setting up in your project
- **[Component Reuse](#component-reuse)** - Using components across projects
- **[Customization](#customization)** - Adapting components to your design
- **[Dependencies](#managing-dependencies)** - Managing component dependencies
- **[Best Practices](#best-practices)** - Tips for effective reuse

---

## Choosing Base vs Radix

Both implementations provide the same component API with the same features. Choose based on your preferences:

### Choose **Base** if:
- ✅ You prefer MUI's component library (@base-ui/react)
- ✅ You want additional features from the Base UI ecosystem
- ✅ You're part of a team already using @base-ui/react

### Choose **Radix** if:
- ✅ You prefer Radix UI's well-established component library
- ✅ You want access to the large Radix UI ecosystem
- ✅ You want the battle-tested Radix UI primitives
- ✅ You prefer Radix's documentation and community

### Key Differences

| Aspect | Base | Radix |
|--------|------|-------|
| **Package** | @base-ui/react | Multiple @radix-ui packages |
| **Community** | Growing (MUI-backed) | Mature (WorkOS-backed) |
| **Ecosystem** | Expanding | Extensive plugins |
| **Documentation** | Base UI docs | Radix UI docs |
| **Components** | Same API | Same API |
| **Styling** | Identical | Identical |

**Migration**: Components have the same API in both, so switching is straightforward.

---

## Installation Patterns

### Pattern 1: CLI Installation (Recommended)

**Fastest way to add components**:

```bash
# Install single component
npx shadcn-ui@latest add button

# Install multiple components
npx shadcn-ui@latest add button input dialog card

# Install with specific base
npx shadcn-ui@latest add --base radix button

# Install all components
npx shadcn-ui@latest add --all
```

**Advantages**:
- Automatic dependency resolution
- Correct file placement
- Handles imports
- One command

### Pattern 2: Manual Copy (Custom Projects)

**For projects without npm/shadcn-ui support**:

1. Copy component file from GitHub
2. Copy component dependencies
3. Copy CSS variables from your chosen style
4. Update imports

**Example**:
```bash
# Copy button component
cp components/ui/button.tsx your-project/

# Copy dependencies (check _registry.ts)
# If button depends on utils:
cp lib/utils.ts your-project/lib/
```

### Pattern 3: Monorepo Reuse

**For monorepo projects**:

```typescript
// packages/ui/package.json
{
  "name": "@myorg/ui",
  "exports": {
    "./button": "./components/ui/button.tsx",
    "./input": "./components/ui/input.tsx"
  }
}

// apps/app1 / apps/app2
import { Button } from "@myorg/ui/button"
```

---

## Project Setup

### Prerequisites

- Node.js 16.x or higher
- React 18.x or higher
- Tailwind CSS 3.x configured
- TypeScript (recommended)

### Initial Setup

1. **Initialize shadcn/ui** in your Next.js project:
```bash
npx shadcn-ui@latest init
# Choose your preferred style (nova, sera, luma, etc)
# Choose your CSS framework
# Choose color
```

2. **Verify setup**:
```bash
# Try adding a component
npx shadcn-ui@latest add button
```

3. **Test usage**:
```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return <Button>Click me</Button>
}
```

### Non-Next.js Projects

For Vite, Remix, Nuxt, etc.:

1. **Setup Tailwind CSS** according to its documentation
2. **Create components directory**: `src/components/ui/`
3. **Manually add components** or use CLI with path configuration

**Vite example**:
```bash
# Initialize
npx shadcn-ui@latest init --project-directory src

# Add components
npx shadcn-ui@latest add --project-directory src button
```

---

## Component Reuse

### Reuse Strategy 1: Copy Components

**Good for**: Single projects, quick prototyping

```bash
npx shadcn-ui@latest add button input dialog
# Components copied to your project
# Fully customizable
# No dependency on shadcn/ui
```

**Workflow**:
1. Copy components into your project
2. Customize as needed
3. Maintain your own versions
4. No upstream dependency

### Reuse Strategy 2: Package Components

**Good for**: Multiple projects, design system

```typescript
// packages/ui/components/ui/button.tsx
export { Button } from "./button"

// package.json exports
{
  "exports": {
    "./button": "./components/ui/button.tsx",
    "./input": "./components/ui/input.tsx",
    "./dialog": "./components/ui/dialog.tsx"
  }
}
```

**Install in other projects**:
```bash
npm install @myorg/ui

import { Button } from "@myorg/ui"
```

**Advantages**:
- Shared component versions
- Centralized updates
- TypeScript support
- Clean versioning

### Reuse Strategy 3: Monorepo Pattern

**Good for**: Multiple apps, shared design system

```
monorepo/
├── packages/
│   └── ui/
│       └── src/
│           └── components/
│               └── ui/
├── apps/
│   ├── app1/
│   ├── app2/
│   └── app3/
```

**Setup workspace**:
```bash
# Install
npm install @myorg/ui

# Use in apps/app1
import { Button } from "@myorg/ui"
```

### Reuse Strategy 4: CLI Projects

**Good for**: Different projects, versions independent

```bash
# Each project installs independently
cd project1
npx shadcn-ui@latest add button

cd project2
npx shadcn-ui@latest add button
# Installs separate copy, can customize differently
```

---

## Customization

### Quick Customization

**Edit component files directly**:

```tsx
// components/ui/button.tsx
export const buttonVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        // Customize variants here
        default: "bg-primary text-primary-foreground",
        custom: "bg-custom-color text-custom-text",
      },
    },
  }
)
```

### CSS Variable Customization

**Update colors in globals.css**:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 100%;
  /* ... more variables */
}
```

### Theme Customization

**Create dark mode**:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 100%;
    /* ... inverted colors */
  }
}

/* Or with Tailwind */
@layer base {
  @supports (color: oklch(0 0 0)) {
    :root[data-theme="dark"] {
      color-scheme: dark;
      --background: ...;
    }
  }
}
```

### Component Variants

**Create custom button variant**:

```tsx
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MyCustomButton({ className, ...props }) {
  return (
    <Button
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}
```

---

## Managing Dependencies

### Understanding Dependencies

Each component lists its dependencies in the registry. For example:

```typescript
{
  name: "sidebar",
  dependencies: [],
  registryDependencies: [
    "button", "input", "separator", "sheet", "skeleton", "tooltip", "use-mobile"
  ]
}
```

**registryDependencies**: Other UI components this component needs
**dependencies**: External npm packages required

### Dependency Resolution

**When you install a component**, the CLI automatically:
1. ✅ Installs external dependencies (npm packages)
2. ✅ Copies registry dependencies (other UI components)
3. ✅ Copies shared utilities (hooks, lib functions)

### Checking Dependencies

**View component dependencies**:

```bash
# Check a component's needs
npx shadcn-ui@latest add sidebar --dry-run
# Shows what will be installed
```

### High-Dependency Components

These components depend on multiple others:

- **sidebar** - Depends on 7 other components
- **input-group** - Depends on input, button, textarea
- **dialog** - Depends on button
- **breadcrumb** - Mostly standalone

**Tip**: Installing a component might also install its dependencies automatically.

### External Package Dependencies

Some components require external packages:

| Component | Package | Install |
|-----------|---------|---------|
| calendar | react-day-picker, date-fns | `npm install` |
| carousel | embla-carousel-react | `npm install` |
| chart | recharts | `npm install` |
| command | cmdk | `npm install` |
| drawer | vaul | `npm install` |
| input-otp | input-otp | `npm install` |
| resizable | react-resizable-panels | `npm install` |
| sonner | sonner | `npm install` |

---

## Best Practices

### 1. Selective Installation

**Install only what you need**:
```bash
# ✅ Good: Install specific components
npx shadcn-ui@latest add button input

# ❌ Avoid: Installing everything
npx shadcn-ui@latest add --all
```

### 2. Document Component Usage

**In your project**:
```tsx
/**
 * Primary action button for forms
 * 
 * @param disabled - Disable the button
 * @param loading - Show loading state
 * @example
 * <SubmitButton>Save</SubmitButton>
 */
export function SubmitButton({ disabled, loading, ...props }) {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading ? "Saving..." : "Save"}
    </Button>
  )
}
```

### 3. Create Component Wrappers

**For frequently used patterns**:

```tsx
// components/form-field.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  error?: string
  // ... other props
}

export function FormField({ label, error, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
```

### 4. Maintain Component Stories

**For each component**:

```tsx
// Button.stories.tsx
export default {
  component: Button,
  tags: ["autodocs"],
}

export const Default = () => <Button>Click me</Button>
export const Disabled = () => <Button disabled>Disabled</Button>
export const Loading = () => <Button disabled>Loading...</Button>
```

### 5. Version Management

**When using as a package**:

```json
{
  "dependencies": {
    "@myorg/ui": "^1.0.0"
  }
}
```

**Semantic versioning**:
- `^1.0.0` - Allow minor/patch updates
- `~1.0.0` - Allow patch updates only
- `1.0.0` - Exact version

### 6. Update Strategy

**Keep components updated**:

```bash
# Check for updates
npx shadcn-ui@latest update

# Update specific component
npx shadcn-ui@latest update button

# Update all components
npx shadcn-ui@latest update --all
```

### 7. Test Compatibility

**Before reusing**:
- ✅ Test in target project
- ✅ Verify Tailwind CSS configured
- ✅ Check dependencies installed
- ✅ Verify TypeScript config (if using TS)

---

## Troubleshooting

### Components not styled correctly
- **Check**: Tailwind CSS is configured and active
- **Check**: CSS variables are defined in globals.css
- **Solution**: Run `npx shadcn-ui@latest init` to reconfigure

### TypeScript errors
- **Check**: `tsconfig.json` has correct paths
- **Check**: Component types are exported
- **Solution**: Regenerate components or check path aliases

### Missing dependencies
- **Check**: Run `npm install` after adding components
- **Check**: Check component's registry for external dependencies
- **Solution**: Install missing packages manually

### Import path errors
- **Check**: Path alias `@/` is configured in `tsconfig.json`
- **Check**: Components are in the correct directory
- **Solution**: Update path configuration

---

## Advanced Reuse

### Sharing Across Frameworks

**Create agnostic design tokens**:

```json
{
  "colors": {
    "primary": "hsl(240, 5.9%, 10%)",
    "secondary": "hsl(240, 4.8%, 95.9%)"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px"
  }
}
```

**Use in different frameworks**:
- React: CSS variables + Tailwind
- Vue: CSS variables + your CSS framework
- Svelte: CSS variables + component styling

### Publishing to npm

**Create scoped package**:

```bash
npm init --scope=@myorg
npm publish --access public
```

**Version management**:
```bash
npm version minor
npm publish
```

### CI/CD Integration

**Automated updates**:

```yaml
# .github/workflows/update.yml
- name: Update components
  run: npx shadcn-ui@latest update --all
```

---

## See Also

- **[Full Component Catalog](./COMPONENTS.md)** - All available components
- **[Architecture Documentation](./STRUCTURE.md)** - How components are organized
- **[Base Implementation](./bases/base/README.md)** - Base UI details
- **[Radix Implementation](./bases/radix/README.md)** - Radix UI details
