# shadcn/ui Component Catalog

Complete inventory of shadcn/ui components organized by category and function. Each component includes dependencies, use cases, and relationships to other components.

**Total Components**: 60 UI Components + Utilities

---

## Navigation Components (8)

Components for navigation, menu systems, and browsing content.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **breadcrumb** | Shows the hierarchical path of the current page | Base styles | Site/app navigation structure |
| **pagination** | Navigate between pages of content | button | Data tables, search results |
| **tabs** | Organize content into selectable sections | Base styles | Multi-section content organization |
| **navigation-menu** | Hierarchical navigation structure | Base styles | Complex site navigation |
| **menubar** | Top-level menu bar (macOS-like) | dropdown-menu | Desktop applications |
| **dropdown-menu** | Context-sensitive menu options | Base styles | Action menus, settings |
| **sidebar** | Persistent side navigation panel | button, input, separator, sheet, skeleton, tooltip, use-mobile | App layouts, admin dashboards |

---

## Layout & Structure Components (7)

Components for structuring and organizing layout.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **card** | Container with elevation and styling | Base styles | Content cards, panels |
| **separator** | Visual divider line | Base styles | Visual separation of content |
| **scroll-area** | Scrollable container with custom scrollbar | Base styles | Constrained scrollable regions |
| **resizable** | Panels that can be resized by user | react-resizable-panels | Adjustable layouts, split panes |
| **aspect-ratio** | Maintains fixed aspect ratio | Base styles | Images, videos, embeds |
| **empty** | Empty state UI component | Base styles | No content scenarios |
| **field** | Form field wrapper with label and separator | label, separator | Consistent form layout |

---

## Form & Input Components (16)

Components for collecting user input and building forms.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **input** | Text input field | Base styles | Text entry, search |
| **textarea** | Multi-line text input | Base styles | Long-form text entry |
| **checkbox** | Boolean input (multiple selections) | Base styles | Multiple choice selection |
| **radio-group** | Mutually exclusive option selection | Base styles | Single choice selection |
| **select** | Dropdown select list | Base styles | Option selection |
| **native-select** | Native HTML select element | Base styles | Native browser selection |
| **combobox** | Searchable dropdown select | button, input-group, @base-ui/react | Filterable selection |
| **toggle** | On/off button state | Base styles | Binary toggle state |
| **toggle-group** | Multiple related toggle buttons | toggle | Related toggle options |
| **switch** | Toggle switch component | Base styles | On/off settings |
| **label** | Form label element | Base styles | Form field labeling |
| **input-group** | Input with prefix/suffix buttons or icons | button, input, textarea | Search bars, password toggles |
| **input-otp** | One-Time Password input | input-otp | 2FA, verification codes |
| **form** | Form wrapper (if using form library) | Base styles | Structured form handling |
| **slider** | Range input slider | Base styles | Numeric range selection |
| **attachment** | File attachment display | button | File uploads, attachments |

---

## Dialog & Modal Components (8)

Components for displaying modal or overlay content.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **dialog** | Modal dialog box | button | Confirmations, forms in modals |
| **alert-dialog** | Alert/confirmation dialog | button | Critical confirmations |
| **drawer** | Slide-out drawer panel | vaul | Mobile-friendly sidebars |
| **sheet** | Bottom sheet or side sheet | button | Mobile sheets, modals |
| **popover** | Floating content panel | Base styles | Tooltips with content |
| **hover-card** | Card that appears on hover | Base styles | Rich hover information |
| **command** | Command palette / search interface | cmdk, dialog, input-group | Command palettes, search |
| **context-menu** | Right-click context menu | Base styles | Context-sensitive actions |

---

## Display & Feedback Components (11)

Components for showing information and providing user feedback.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **badge** | Small label or status indicator | Base styles | Tags, status, labels |
| **alert** | Alert message box | Base styles | Notifications, warnings |
| **progress** | Progress bar | Base styles | Loading indication, progress |
| **skeleton** | Loading placeholder | Base styles | Content loading states |
| **spinner** | Loading spinner animation | Base styles | Loading indication |
| **tooltip** | Text tooltip on hover | Base styles | Help text, additional info |
| **avatar** | User avatar display | Base styles | User profiles, team members |
| **sonner** | Toast notification system | sonner, next-themes | User feedback, notifications |
| **button** | Action button | Base styles | Primary actions, CTAs |
| **marker** | Highlighting/marking component | Base styles | Highlight content |
| **kbd** | Keyboard key display | Base styles | Keyboard shortcuts documentation |

---

## Data Display Components (3)

Components for displaying tabular or structured data.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **table** | Data table component | Base styles | Displaying structured data |
| **chart** | Chart/graph visualization | recharts@3.8.0, card | Data visualization |
| **calendar** | Date picker calendar | react-day-picker, date-fns, button | Date selection |

---

## Chat & Messaging Components (4)

Components for building messaging and chat interfaces.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **message** | Chat message container | Base styles | Chat UI, message display |
| **bubble** | Chat message bubble | Base styles | Chat messages |
| **message-scroller** | Auto-scrolling message container | @shadcn/react, button | Chat history scrolling |
| **direction** | RTL/LTR direction provider | @base-ui/react | Internationalization support |

---

## Carousel & Media Components (1)

Components for displaying media and carousels.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **carousel** | Image/content carousel | embla-carousel-react, button | Image galleries, content sliders |

---

## Button & Action Components (3)

Components for triggering actions.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **button** | Versatile button component | Base styles | Actions, CTAs, forms |
| **button-group** | Related button groups | separator | Grouped related actions |
| **collapsible** | Collapsible/expandable content | Base styles | Accordion-like sections |

---

## Accordion Components (1)

Components for expandable content sections.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **accordion** | Expandable accordion sections | Base styles | FAQ, detailed content sections |

---

## Utility & Internal Components (2)

Internal components and utilities.

| Component | Purpose | Dependencies | Best For |
|-----------|---------|--------------|----------|
| **item** | Generic list item component | separator | Menu items, list items |
| **message-scroller** | Auto-scrolling container | @shadcn/react, button | Scrolling message lists |

---

## Component Dependencies Guide

### High-Dependency Components
These components are frequently used by other components:

- **button** - Used by: alert-dialog, dialog, sheet, sidebar, pagination, input-group, command, and 10+ more
- **separator** - Used by: button-group, field, item, and others
- **label** - Used by: field
- **input** - Used by: input-group, combobox, command

### Utility Dependencies
- **use-mobile** hook - Used by: sidebar (responsive detection)
- **utils** - CSS utility functions (classname merging, etc.)

### External Package Dependencies

| Package | Used By | Purpose |
|---------|---------|---------|
| **@base-ui/react** | Multiple components | Headless UI components |
| **class-variance-authority** | Global | Variant management |
| **lucide-react** | Global | Icon library |
| **embla-carousel-react** | carousel | Carousel functionality |
| **cmdk** | command | Command palette |
| **vaul** | drawer | Drawer animation |
| **react-day-picker** | calendar | Date picking |
| **date-fns** | calendar | Date utilities |
| **react-resizable-panels** | resizable | Panel resizing |
| **input-otp** | input-otp | OTP input |
| **recharts** | chart | Chart rendering |
| **sonner** | sonner | Toast notifications |
| **next-themes** | sonner | Theme management |

---

## Component Selection Guide

### Building a Dashboard
Start with these components:
- **sidebar** - Navigation
- **card** - Content containers
- **table** - Data display
- **chart** - Visualizations
- **button** - Actions

### Building a Form
Start with these components:
- **input** / **textarea** - Text fields
- **select** / **combobox** - Option selection
- **checkbox** / **radio-group** - Multiple/single choice
- **label** - Field labeling
- **button** - Submit/reset
- **alert** - Validation messages

### Building a Chat Interface
Start with these components:
- **message** - Message display
- **bubble** - Message styling
- **message-scroller** - Auto-scroll
- **input** / **input-group** - Message input
- **button** - Send action

### Building a Navigation UI
Start with these components:
- **sidebar** - Main navigation
- **breadcrumb** - Page path
- **tabs** - Section navigation
- **dropdown-menu** - Nested actions

### Mobile-First Development
Use these components:
- **drawer** - Mobile navigation
- **sheet** - Mobile modals
- **sidebar** (responsive) - Auto-adapts with use-mobile hook
- **input-group** - Compact input with actions

---

## Component Organization Patterns

### By Complexity

**Primitive/Simple** (no dependencies)
- button, badge, separator, label, kbd, empty, spinner, avatar, aspect-ratio, marker, bubble, message, attachment

**Composed** (depends on other UI components)
- sidebar, input-group, button-group, field, breadcrumb

**Complex/Feature-Rich** (external dependencies)
- calendar, carousel, chart, command, combobox, drawer, input-otp, resizable, sonner

### By HTML Hierarchy
- **Inline/Text-level**: badge, kbd, marker, label, separator
- **Block-level**: card, alert, progress, skeleton, spinner
- **Structured**: table, sidebar, navigation-menu, menubar
- **Modal/Overlay**: dialog, alert-dialog, drawer, sheet, popover, hover-card, context-menu

---

## Next Steps for Using Components

1. **Choose your components** based on your use case (see selection guide above)
2. **Check dependencies** using the dependency table
3. **Review examples** in the docs site
4. **Install via CLI** using `shadcn-ui add component-name`
5. **Customize** the component to your design system
6. **Combine** components to build features

---

## See Also

- [Base Component Overview](./bases/base/README.md) - Details on base implementation
- [Radix Component Overview](./bases/radix/README.md) - Radix-UI based implementation
- [Blocks & Patterns](./bases/base/blocks/README.md) - Pre-built page templates
- [Reuse Guide](./REUSE_GUIDE.md) - How to reuse components across projects
