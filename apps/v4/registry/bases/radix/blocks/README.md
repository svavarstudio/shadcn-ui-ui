# Pre-built Blocks & Templates (Radix Version)

Complete page templates and building blocks for rapid application development using Radix UI components.

## Overview

- **30+ Pre-built Blocks** - Complete page templates
- **Radix-Based Components** - Built on Radix UI primitives
- **Composition Examples** - How components work together
- **Ready to Customize** - Production-ready templates

## What's Different from Base?

The Radix blocks use the same structure and patterns as the Base blocks but are implemented using Radix UI components instead of @base-ui/react.

**Component API**: Identical between Base and Radix implementations
**Styling**: Identical CSS and Tailwind styling
**Customization**: Same process for both versions
**Data Patterns**: Shared mock data and structure

## Block Categories

### Dashboards
Analytics dashboards, metrics, and data visualization

- Dashboard 01 - Analytics Dashboard
- Dashboard 02 - Sales Dashboard
- Additional dashboards for specific domains

### Navigation
Sidebar and menu navigation patterns

- Sidebar 01-16 - Various sidebar styles
- Different layouts and interaction patterns

### Authentication
Login, signup, and auth-related templates

- Login 01 - Standard login form
- Login 02 - Social login
- Login 03-05 - Additional auth patterns

### Data Display
Tables, lists, and charts

- Data tables with sorting/pagination
- Chart galleries with multiple visualizations
- List views with various patterns

### Forms
Reusable form templates

- Contact forms
- Settings/preferences forms
- Multi-step forms

## Quick Start

### Install a Block

```bash
# Install with Radix base
npx shadcn-ui@latest add --base radix dashboard-01

# Or without base flag (if Radix is your default)
npx shadcn-ui@latest add dashboard-01
```

### Customize

Edit files in the copied block directory to customize:

```tsx
// blocks/dashboard-01/page.tsx
export default function Dashboard() {
  return (
    <div>
      {/* Customize here */}
    </div>
  )
}
```

### Integrate Data

Connect to your API instead of mock data:

```tsx
const { data } = useFetch('/api/dashboard')
```

## Block Components

All blocks are composed from UI components. See the corresponding component documentation for detailed API information.

## Creating Custom Blocks

### 1. Copy a Block Template

Use an existing block as a starting point:

```bash
cp -r blocks/dashboard-01 blocks/my-dashboard
```

### 2. Modify Components

Edit the sub-components to match your needs:

```
blocks/my-dashboard/
├── page.tsx
└── components/
    └── custom-component.tsx
```

### 3. Update Data

Replace mock data with real data:

```json
{
  "items": [
    { "id": 1, "name": "Item 1" }
  ]
}
```

### 4. Register Block

Update the registry to include your new block.

## Best Practices

### Keep Modular
Extract components into the `components/` subfolder to keep blocks maintainable.

### Use Props
Make blocks configurable through props:

```tsx
interface DashboardProps {
  title?: string
  compact?: boolean
}
```

### Leverage Radix APIs
Use Radix's composition patterns for flexibility:

```tsx
import * as Dialog from "@radix-ui/react-dialog"

export function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        {/* Content */}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### Document Thoroughly
Include README files with:
- Purpose and use cases
- Components used
- Customization points
- Related blocks

## Common Patterns

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Grid items */}
</div>
```

### Data Loading

```tsx
{isLoading ? <Skeleton /> : <Content data={data} />}
```

### Modal Forms

```tsx
<Dialog>
  <DialogTrigger>Add</DialogTrigger>
  <DialogContent>
    <Form />
  </DialogContent>
</Dialog>
```

### Tabs for Sections

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>
```

## Troubleshooting

### Components Not Found
Ensure all dependencies are installed: `npm install`

### Styling Not Applied
Check that Tailwind CSS and CSS variables are configured correctly

### Data Not Loading
Verify API endpoints and mock data structure

### Build Errors
Check that all component imports are correct and paths are valid

## Migration from Base to Radix

If migrating a block from Base to Radix:

1. Copy the block structure
2. Replace @base-ui imports with @radix-ui imports
3. Update component APIs to match Radix patterns
4. Test all functionality
5. Update documentation

Both versions have the same feature set, so migration is straightforward.

---

## See Also

- [Component Reference](../ui/README.md) - Radix UI components
- [Full Component Catalog](../../COMPONENTS.md) - All available components
- [Base Blocks](../base/blocks/README.md) - Base implementation blocks
- [Reuse Guide](../../REUSE_GUIDE.md) - Customization patterns
