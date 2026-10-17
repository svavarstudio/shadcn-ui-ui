# Contributing to shadcn/ui Component Library

Thank you for contributing to shadcn/ui! This guide will help you add new components, blocks, or improve existing ones.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Adding Components](#adding-components)
- [Adding Blocks](#adding-blocks)
- [Updating Documentation](#updating-documentation)
- [Style Guide](#style-guide)
- [Testing](#testing)
- [Pull Requests](#pull-requests)

---

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- Git
- Understanding of React, TypeScript, and Tailwind CSS

### Setup

```bash
# Clone the repository
git clone https://github.com/svavarstudio/shadcn-ui-ui.git
cd shadcn-ui-ui

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Project Structure

```
apps/v4/registry/
├── bases/
│   ├── base/              # Base UI components
│   └── radix/             # Radix UI components
├── COMPONENTS.md          # Component catalog
├── REUSE_GUIDE.md        # Reuse patterns
├── STRUCTURE.md          # Architecture
├── CONTRIBUTING.md       # This file
└── component-metadata.ts # Enhanced metadata
```

---

## Adding Components

### 1. Create Component File

**Location**: `bases/base/ui/{component-name}.tsx`

**Template**:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary"
  size?: "sm" | "md" | "lg"
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        size === "sm" && "px-2 py-1 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    />
  )
)
Component.displayName = "Component"

export { Component }
```

### 2. Add to Registry

**Location**: `bases/base/ui/_registry.ts`

```typescript
{
  name: "component-name",
  type: "registry:ui",
  registryDependencies: ["button", "separator"],  // If applicable
  dependencies: ["some-package"],                   // If applicable
  files: [
    {
      path: "ui/component-name.tsx",
      type: "registry:ui"
    }
  ],
  meta: {
    links: {
      docs: "https://ui.shadcn.com/docs/components/base/component-name",
      examples: "https://ui.shadcn.com/code/.../component-name-example.tsx",
      api: "https://docs.package.com/component"  // If applicable
    }
  }
}
```

### 3. Create Examples

**Location**: `bases/base/examples/{component-name}-example.tsx`

```tsx
import { Component } from "@/components/ui/component-name"

export default function ComponentExample() {
  return (
    <div className="space-y-4">
      <Component>Default</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  )
}
```

**Location**: `bases/base/examples/_registry.ts`

```typescript
{
  name: "component-name-example",
  type: "registry:example",
  registryDependencies: ["component-name"],
  files: [
    {
      path: "examples/component-name-example.tsx",
      type: "registry:example"
    }
  ]
}
```

### 4. Add Metadata

**Location**: `component-metadata.ts`

```typescript
"component-name": {
  name: "component-name",
  category: "Category",
  description: "Short description",
  purpose: "What it does",
  bestFor: ["Use case 1", "Use case 2"],
  dependencies: {
    npm: [],
    components: ["button"],
    hooks: [],
    utilities: ["cn"]
  },
  relatedComponents: ["similar-component"],
  accessibility: "WCAG compliance notes",
  cssVariables: ["--primary", "--background"]
}
```

### 5. Update Documentation

- Update `/apps/v4/registry/COMPONENTS.md` with new component
- Update `/apps/v4/registry/bases/base/ui/README.md` with details
- Add to appropriate category table

### 6. Radix Version (if applicable)

Repeat steps 1-4 in `bases/radix/` directory using Radix UI components instead of Base UI.

---

## Adding Blocks

### 1. Create Block Directory

```bash
mkdir -p apps/v4/registry/bases/base/blocks/{block-name}/components
```

### 2. Create Block Structure

```
blocks/block-name/
├── page.tsx              # Main block component
├── components/
│   └── sub-component.tsx # Reusable sub-components
├── data.json            # Mock/sample data
├── README.md            # Block documentation
└── _registry.ts         # Registry entry
```

### 3. Implement Block

**Location**: `blocks/{block-name}/page.tsx`

```tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BlockName() {
  return (
    <div className="space-y-6">
      <Card>
        {/* Block content */}
      </Card>
    </div>
  )
}
```

### 4. Create Mock Data

**Location**: `blocks/{block-name}/data.json`

```json
{
  "title": "Block Title",
  "items": [
    { "id": 1, "name": "Item 1" }
  ]
}
```

### 5. Register Block

**Location**: `blocks/_registry.ts`

```typescript
{
  name: "block-name",
  type: "registry:block",
  registryDependencies: ["card", "button"],
  dependencies: ["package-name"],
  files: [
    {
      path: "blocks/block-name/page.tsx",
      type: "registry:block"
    },
    {
      path: "blocks/block-name/components/sub-component.tsx",
      type: "registry:component"
    },
    {
      path: "blocks/block-name/data.json",
      type: "registry:json"
    }
  ]
}
```

### 6. Document Block

**Location**: `blocks/{block-name}/README.md`

```markdown
# Block Name

## Overview
Brief description of the block

## Features
- Feature 1
- Feature 2

## Components Used
- card
- button
- input

## Customization
How to modify this block for your needs

## Related Blocks
- Related block 1
- Related block 2
```

---

## Updating Documentation

### Adding Component Details

1. **COMPONENTS.md**: Add to appropriate category table
2. **ui/README.md**: Add detailed section with:
   - Purpose and use cases
   - Import statement
   - Props/API
   - Dependencies
   - Related components
   - Accessibility notes
   - CSS variables
   - Examples

### Example Format

```markdown
### button
Button component for user actions.

- **Import**: `import { Button } from "@/components/ui/button"`
- **Dependencies**: None
- **Used By**: dialog, alert-dialog, sidebar, and 10+ more
- **Examples**: Forms, navigation, CTAs
- **Best For**: Primary actions, form submission

**Variants**: default, secondary, destructive, outline, ghost, link
**Sizes**: sm, md, lg, icon
```

### Update Related Files

- Update dependency references in other component docs
- Add to component catalog cross-references
- Update reuse guide if new patterns introduced

---

## Style Guide

### Component Files

**Naming**:
- File names: kebab-case (`button.tsx`, `input-group.tsx`)
- Component names: PascalCase (`Button`, `InputGroup`)
- Props interfaces: `{ComponentName}Props`

**Structure**:
```tsx
// 1. Imports
import * as React from "react"
import { cn } from "@/lib/utils"

// 2. Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary"
}

// 3. Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    // Implementation
  )
)

// 4. Display name
Button.displayName = "Button"

// 5. Export
export { Button }
```

### TypeScript

- Use strict mode
- Export interfaces for props
- Use React.forwardRef for components accepting refs
- Proper type annotations throughout

### Styling

- Use Tailwind CSS classes
- Use `cn()` utility for conditional classes
- Use CSS variables for colors
- Support dark mode via CSS variables

### Accessibility

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus indicators
- Proper color contrast
- Screen reader compatibility

### Code Quality

- No console.log statements
- No unused variables
- No TODO comments (implement or remove)
- Clean, readable code
- DRY principles

---

## Testing

### Manual Testing

1. **Install Component**:
```bash
npx shadcn-ui@latest add component-name
```

2. **Test in App**:
```tsx
import { Component } from "@/components/ui/component-name"

export default function Test() {
  return <Component />
}
```

3. **Verify**:
- Visual appearance correct
- All props work as expected
- Responsive on different sizes
- Works in light/dark modes
- Keyboard navigation works
- Screen reader accessible

### Testing Checklist

- [ ] Component renders without errors
- [ ] All props work correctly
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Documentation is accurate
- [ ] Examples work as intended
- [ ] Dependencies are correct
- [ ] No TypeScript errors

---

## Pull Requests

### Before Creating PR

1. **Update Documentation**
   - Component catalog
   - Category README
   - Related component docs
   - Metadata file

2. **Test Thoroughly**
   - Component works correctly
   - Examples are accurate
   - Registry entries are valid
   - No TypeScript errors

3. **Follow Code Style**
   - Consistent with existing code
   - Accessibility standards met
   - Tailwind best practices
   - TypeScript strict mode

### PR Title Format

```
docs: Add component-name component
chore: Update component metadata
feat: Add new block-name block
fix: Fix component-name accessibility issue
```

### PR Description Template

```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] New component
- [ ] New block
- [ ] Bug fix
- [ ] Documentation update
- [ ] Metadata enhancement

## Changes Made
- Detail 1
- Detail 2

## Related Issues
Fixes #123

## Testing
How to test these changes

## Checklist
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] Examples provided
- [ ] Accessibility verified
- [ ] No TypeScript errors
```

---

## Common Patterns

### Component with Variants

```tsx
import { cva } from "class-variance-authority"

const buttonVariants = cva("base styles", {
  variants: {
    variant: {
      default: "default styles",
      secondary: "secondary styles"
    }
  }
})

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", ...props }, ref) => (
    <button className={buttonVariants({ variant })} ref={ref} {...props} />
  )
)
```

### Component with Composition

```tsx
export function Dialog() {
  return (
    <DialogProvider>
      {/* Composed components */}
    </DialogProvider>
  )
}

export function DialogTrigger() { /* ... */ }
export function DialogContent() { /* ... */ }
```

### Component with Hooks

```tsx
import { useCallback, useState } from "react"

const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const [state, setState] = useState(false)
    
    const handleClick = useCallback(() => {
      setState(!state)
    }, [state])
    
    return <div ref={ref} onClick={handleClick} />
  }
)
```

---

## Questions?

- Check existing components for patterns
- Review component examples
- Read TypeScript/React documentation
- Ask in issues or discussions

Thank you for contributing! 🎉

---

## See Also

- [Component Catalog](./COMPONENTS.md) - All components
- [Architecture Guide](./STRUCTURE.md) - System design
- [Reuse Guide](./REUSE_GUIDE.md) - Usage patterns
- [Base Components](./bases/base/README.md) - Base implementation
- [Radix Components](./bases/radix/README.md) - Radix implementation
