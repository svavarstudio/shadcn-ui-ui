# Pre-built Blocks & Templates

Complete page templates and building blocks for rapid application development. Each block is a production-ready component combining multiple UI components and real-world patterns.

## Overview

- **30+ Pre-built Blocks** - Complete page templates
- **Composition Examples** - How components work together
- **Real Data Patterns** - Sample data and mock APIs
- **Copy & Customize** - Ready to modify and extend

## Block Structure

```
blocks/dashboard-01/
├── page.tsx              # Main block component
├── components/           # Sub-components
│   ├── app-sidebar.tsx
│   ├── chart-area.tsx
│   └── data-table.tsx
├── data.json            # Mock/sample data
└── README.md            # Block documentation
```

## Dashboard Blocks

Pre-built dashboard templates with data visualization and tables.

### Dashboard 01 - Analytics Dashboard
**Components Used**: card, chart, input, sidebar, table, button

**Features**:
- Sidebar navigation
- Analytics cards with metrics
- Charts with Recharts
- Data table with sorting
- Responsive layout

**Use When**: Building analytics dashboards, admin panels, metrics views

**Customization Points**:
- Chart data and configuration
- Table columns and data
- Card metrics
- Sidebar menu items

### Dashboard 02 - Sales Dashboard
**Components Used**: card, chart, table, badge, select

**Features**:
- Sales metrics overview
- Revenue charts
- Orders table
- Status badges
- Filter options

**Use When**: E-commerce dashboards, sales tracking, revenue reporting

---

## Sidebar Blocks

Navigation sidebar templates with different layouts and styles.

### Sidebar 01 - Vertical Menu
**Components Used**: sidebar, button, input, tooltip

**Features**:
- Vertical sidebar
- Menu items with icons
- Collapsible submenus
- Search functionality
- User profile section

**Use When**: Standard app layouts with vertical navigation

### Sidebar 02-16
Various sidebar styles including:
- Compact sidebar (Sidebar 02)
- Floating sidebar (Sidebar 03)
- Modern sidebar (Sidebar 04)
- Minimal sidebar (Sidebar 05)
- And more variations...

---

## Authentication Blocks

Login, signup, and authentication-related templates.

### Login 01 - Standard Login
**Components Used**: input, button, card, label

**Features**:
- Email/password input
- Remember me checkbox
- Forgot password link
- Sign up link
- Form validation

**Use When**: Standard login pages

### Login 02 - Social Login
**Components Used**: input, button, separator, card

**Features**:
- Email/password input
- Social login buttons (Google, GitHub)
- Divider
- Sign up redirect

**Use When**: Apps with social login options

### Login 03 - 05
Additional login variations including password reset, two-factor auth, etc.

---

## Data Display Blocks

Tables, lists, and data visualization blocks.

### Data Table
**Components Used**: table, button, badge, pagination

**Features**:
- Sortable columns
- Pagination
- Row selection
- Status badges
- Action buttons

**Use When**: Displaying lists of data items

### Chart Gallery
**Components Used**: card, chart

**Features**:
- Multiple chart types (line, bar, area, pie)
- Interactive legends
- Tooltips
- Responsive sizing

**Use When**: Data visualization needs

---

## Form Blocks

Complete form templates with validation and patterns.

### Contact Form
**Components Used**: input, textarea, button, label, select

**Features**:
- Multiple input types
- Validation messages
- Submit button
- Success/error states

**Use When**: Contact pages, feedback forms

### Settings Form
**Components Used**: input, select, switch, button, label

**Features**:
- Various field types
- Toggle switches
- Dropdown selects
- Save/cancel buttons

**Use When**: User settings, preferences pages

---

## How to Use Blocks

### 1. Copy the Block

```bash
npx shadcn-ui@latest add dashboard-01
# or
npx shadcn-ui@latest add sidebar-01
```

### 2. Customize

Edit the block components to match your design:

```tsx
// blocks/dashboard-01/page.tsx
export default function Dashboard() {
  // Customize the layout, colors, data, etc.
  return (
    <div>
      {/* Your customized dashboard */}
    </div>
  )
}
```

### 3. Integrate Data

Replace mock data with real API calls:

```tsx
// blocks/dashboard-01/page.tsx
const { data, isLoading } = useFetch('/api/analytics')

return (
  <Card>
    {isLoading ? <Skeleton /> : <AnalyticsContent data={data} />}
  </Card>
)
```

## Block Component Patterns

### Pattern 1: Responsive Layout

```tsx
import { Sidebar } from "@/components/ui/sidebar"

export function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
```

### Pattern 2: Data Loading

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function DataCard({ data, isLoading }) {
  if (isLoading) return <Skeleton className="h-40" />
  return <Card>{/* content */}</Card>
}
```

### Pattern 3: Modal Forms

```tsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function FormDialog() {
  return (
    <Dialog>
      <DialogTrigger>Add Item</DialogTrigger>
      <DialogContent>
        {/* Form content */}
      </DialogContent>
    </Dialog>
  )
}
```

## Creating Custom Blocks

### 1. Create Block Directory

```bash
mkdir blocks/my-block
cd blocks/my-block
```

### 2. Create Block Files

```
my-block/
├── page.tsx           # Main component
├── components/        # Sub-components
│   └── my-component.tsx
├── data.json         # Mock data
├── README.md         # Documentation
└── _registry.ts      # Metadata
```

### 3. Define in Registry

```typescript
// _registry.ts
export const blocks: Registry["items"] = [
  {
    name: "my-block",
    type: "registry:block",
    registryDependencies: ["card", "button", "input"],
    files: [
      { path: "blocks/my-block/page.tsx", type: "registry:block" },
      { path: "blocks/my-block/components/...", type: "registry:component" },
      { path: "blocks/my-block/data.json", type: "registry:json" }
    ]
  }
]
```

### 4. Document the Block

```markdown
# My Block

Description of what this block does.

## Features
- Feature 1
- Feature 2

## Customization
How to modify this block for your needs.

## Related Blocks
- Other block 1
- Other block 2
```

## Best Practices

### 1. Keep Components Flexible

Use props to make blocks customizable:

```tsx
interface DashboardProps {
  title?: string
  description?: string
  compact?: boolean
  onRefresh?: () => void
}

export function Dashboard({
  title = "Dashboard",
  description,
  compact = false,
  onRefresh
}: DashboardProps) {
  // Implementation
}
```

### 2. Extract Sub-Components

Keep blocks modular by extracting components:

```
blocks/dashboard-01/
├── page.tsx              # Main component
└── components/
    ├── header.tsx        # Dashboard header
    ├── sidebar.tsx       # Navigation
    ├── metrics.tsx       # Metrics cards
    ├── chart-section.tsx # Charts
    └── table-section.tsx # Data table
```

### 3. Use Sample Data

Provide realistic sample data in `data.json`:

```json
{
  "metrics": [
    { "label": "Total Users", "value": 12542, "change": "+2.1%" },
    { "label": "Revenue", "value": "$45,231", "change": "+12.5%" }
  ],
  "chartData": [
    { "month": "Jan", "users": 400, "revenue": 24000 }
  ]
}
```

### 4. Document Thoroughly

Each block should have clear documentation:

```markdown
# My Dashboard

## Overview
Brief description

## Features
- What it includes
- What it demonstrates

## Components Used
- card
- chart
- table

## Customization
How to customize colors, data, layout

## Related Examples
Links to similar blocks or examples
```

## Block Discovery

### By Category

**Dashboards**: dashboard-01, dashboard-02, ...

**Navigation**: sidebar-01 through sidebar-16

**Authentication**: login-01 through login-05

**Data Display**: data-table, chart-gallery

**Forms**: contact-form, settings-form

### By Use Case

**Admin Panels**: dashboard blocks, sidebar blocks, data table

**E-commerce**: sidebar, product table, checkout form

**SaaS**: dashboard, user settings, notifications

**Landing Pages**: hero section, features, pricing (coming)

---

## Tips & Tricks

### Customize Colors

Replace CSS variables in your blocks:

```tsx
<Card className="bg-gradient-to-r from-blue-500 to-purple-600">
  {/* content */}
</Card>
```

### Dark Mode Support

Use CSS variables for automatic dark mode:

```tsx
<div className="bg-background text-foreground">
  {/* content adapts to light/dark */}
</div>
```

### Responsive Breakpoints

Leverage Tailwind's responsive classes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
```

### Loading States

Use Skeleton component during loading:

```tsx
{isLoading ? (
  <Skeleton className="h-40" />
) : (
  <DataCard data={data} />
)}
```

---

## Troubleshooting

### Block Not Found
- Ensure it's installed: `npx shadcn-ui@latest add {block-name}`
- Check the directory structure

### Missing Dependencies
- Install all component dependencies
- Run `npm install` after adding block

### Styling Issues
- Verify Tailwind CSS is configured
- Check CSS variables are defined

### Data Not Showing
- Check mock data in data.json
- Verify API endpoints are correct
- Check console for errors

---

## See Also

- [Component Reference](../ui/README.md) - Components used in blocks
- [Full Component Catalog](../../COMPONENTS.md) - All available components
- [Reuse Guide](../../REUSE_GUIDE.md) - How to customize and extend
