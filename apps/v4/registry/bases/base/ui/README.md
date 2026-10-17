# Base UI Components Reference

Complete reference guide for the 60 UI components in the Base implementation. Organized by component type, dependencies, and use cases.

## Overview

- **60 Production-Ready Components** - From simple primitives to complex layouts
- **Zero Dependencies** - Most components depend only on Base Styles
- **Fully Typed** - Complete TypeScript support
- **Thoroughly Tested** - Each component has multiple examples

**📂 File Structure**: Each component has:
- `{component}.tsx` - Main component file
- Usage examples in `../examples/`
- Metadata in registry configuration

---

## Navigation Components (8)

### breadcrumb
Hierarchical navigation path component.

- **Import**: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"`
- **Dependencies**: None (Base Styles only)
- **Used By**: Navigation layouts
- **Examples**: Navigation patterns, file paths
- **MDN Reference**: [breadcrumb ARIA pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

### pagination
Navigate between pages of content.

- **Import**: `import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"`
- **Dependencies**: button component
- **Used By**: Data tables, search results, content lists
- **Examples**: Paginated data, infinite scroll controls
- **Best For**: Large datasets, search results

### tabs
Organize content into selectable sections.

- **Import**: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`
- **Dependencies**: None (Base Styles only)
- **Used By**: Multi-section interfaces
- **Examples**: Settings panels, documentation sections
- **Accessibility**: Full keyboard navigation support

### navigation-menu
Hierarchical navigation structure.

- **Import**: `import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu"`
- **Dependencies**: None (Base Styles only)
- **Used By**: Site headers, mega menus
- **Examples**: Main navigation systems
- **Best For**: Complex navigation with sub-menus

### menubar
Top-level menu bar (macOS-like).

- **Import**: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"`
- **Dependencies**: dropdown-menu
- **Used By**: Desktop applications
- **Examples**: Application menus
- **Best For**: Desktop-style menu bars

### dropdown-menu
Context-sensitive menu options.

- **Import**: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu"`
- **Dependencies**: None (Base Styles only)
- **Used By**: Action menus, navigation, settings
- **Examples**: User menus, options menus
- **Best For**: Contextual actions

### sidebar
Persistent side navigation panel.

- **Import**: `import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"`
- **Dependencies**: button, input, separator, sheet, skeleton, tooltip, use-mobile
- **Used By**: App layouts, admin dashboards
- **Examples**: App navigation, collapsible sidebar
- **Best For**: Multi-page applications, dashboards

---

## Form & Input Components (16)

### input
Text input field for various data types.

- **Import**: `import { Input } from "@/components/ui/input"`
- **Dependencies**: None
- **Supports**: text, email, password, number, date, etc.
- **Used By**: input-group, combobox, command
- **Examples**: Login forms, search bars, filters

### textarea
Multi-line text input.

- **Import**: `import { Textarea } from "@/components/ui/textarea"`
- **Dependencies**: None
- **Used By**: input-group, forms
- **Examples**: Comments, descriptions, long-form text
- **Resizable**: Yes (user can resize)

### checkbox
Boolean input for multiple selections.

- **Import**: `import { Checkbox } from "@/components/ui/checkbox"`
- **Dependencies**: None
- **States**: checked, unchecked, indeterminate
- **Used By**: Form validation, preferences
- **Examples**: Multi-select lists, terms acceptance

### radio-group
Mutually exclusive option selection.

- **Import**: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`
- **Dependencies**: None
- **Usage**: Select ONE option from many
- **Examples**: Survey options, mode selection
- **Best For**: Exclusive option choice

### select
Dropdown select list (custom styled).

- **Import**: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`
- **Dependencies**: None (Base Styles only)
- **States**: open, closed, disabled
- **Examples**: Choose options, form fields
- **Better than**: Native select for consistent styling

### native-select
Native HTML select element (unstyled).

- **Import**: `import { NativeSelect } from "@/components/ui/native-select"`
- **Dependencies**: None
- **Usage**: Native browser selection
- **Best For**: Quick implementation, accessibility first

### combobox
Searchable dropdown select.

- **Import**: `import { Combobox } from "@/components/ui/combobox"`
- **Dependencies**: button, input-group, @base-ui/react
- **Features**: Searchable, filterable
- **Used By**: Form fields, search
- **Examples**: User selection, tag input
- **Packages**: Requires @base-ui/react combobox

### toggle
On/off button state.

- **Import**: `import { Toggle } from "@/components/ui/toggle"`
- **Dependencies**: None
- **States**: pressed, unpressed
- **Used By**: toggle-group, toolbars
- **Examples**: Bold/italic buttons, feature toggles
- **Icons**: Works great with lucide-react icons

### toggle-group
Multiple related toggle buttons.

- **Import**: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`
- **Dependencies**: toggle
- **Types**: single, multiple
- **Examples**: Text formatting toolbars, view modes
- **Best For**: Multiple independent toggles

### switch
Toggle switch component.

- **Import**: `import { Switch } from "@/components/ui/switch"`
- **Dependencies**: None
- **States**: on, off, disabled
- **Used By**: Settings, preferences
- **Examples**: Dark mode toggle, feature flags
- **Accessibility**: Full keyboard control

### label
Form label element.

- **Import**: `import { Label } from "@/components/ui/label"`
- **Dependencies**: None
- **Usage**: Label form inputs
- **Best For**: Accessibility, associating with inputs
- **Links To**: Input elements via htmlFor prop

### input-group
Input with prefix/suffix buttons or icons.

- **Import**: `import { InputGroup, InputGroupItem, InputGroupText } from "@/components/ui/input-group"`
- **Dependencies**: button, input, textarea
- **Features**: Icon prefix, action suffix
- **Examples**: Search bar with icon, password toggle
- **Best For**: Enhanced input fields

### input-otp
One-Time Password input.

- **Import**: `import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"`
- **Dependencies**: input-otp package
- **Usage**: 2FA, verification codes
- **Features**: Auto-focus, paste handling
- **Examples**: MFA workflows, code entry

### field
Form field wrapper with label and separator.

- **Import**: `import { Field } from "@/components/ui/field"`
- **Dependencies**: label, separator
- **Includes**: Label, input, error message, helper text
- **Best For**: Consistent form styling
- **Pattern**: label + input + hint/error layout

### form
Form wrapper (for form libraries).

- **Import**: `import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"`
- **Dependencies**: label (implicit)
- **Usage**: With react-hook-form or similar
- **Provides**: Integrated label, error, description components
- **Examples**: Validated form handling

### slider
Range input slider.

- **Import**: `import { Slider } from "@/components/ui/slider"`
- **Dependencies**: None (Base Styles only)
- **Features**: Single/range, step, min/max
- **Examples**: Volume control, price range, brightness
- **Accessibility**: Full keyboard control

---

## Layout & Structure Components (7)

### card
Container with elevation and styling.

- **Import**: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"`
- **Dependencies**: None
- **Sections**: Header, Content, Footer
- **Used By**: Almost every layout
- **Examples**: Content panels, product cards, statistics
- **Best For**: Content grouping

### separator
Visual divider line.

- **Import**: `import { Separator } from "@/components/ui/separator"`
- **Dependencies**: None
- **Orientations**: horizontal, vertical
- **Used By**: button-group, field, item
- **Examples**: Visual dividers, section breaks
- **Best For**: Visual separation

### scroll-area
Scrollable container with custom scrollbar.

- **Import**: `import { ScrollArea } from "@/components/ui/scroll-area"`
- **Dependencies**: None (Base Styles only)
- **Features**: Custom scrollbar styling
- **Examples**: Long lists, scrollable content
- **Best For**: Constrained scrollable regions

### resizable
Panels that can be resized by user.

- **Import**: `import { Resizable, ResizableHandle, ResizablePanel } from "@/components/ui/resizable"`
- **Dependencies**: react-resizable-panels
- **Features**: Draggable resize handles, persistence
- **Examples**: Split panes, adjustable layouts
- **Best For**: Code editors, dashboard panels

### aspect-ratio
Maintains fixed aspect ratio.

- **Import**: `import { AspectRatio } from "@/components/ui/aspect-ratio"`
- **Dependencies**: None
- **Usage**: Maintain 16:9, 4:3, square, etc.
- **Examples**: Images, videos, embeds
- **Best For**: Responsive image/video containers

### empty
Empty state UI component.

- **Import**: `import { Empty, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from "@/components/ui/empty"`
- **Dependencies**: None
- **Usage**: No data/results state
- **Examples**: Empty search results, no items
- **Best For**: Better user experience with empty states

---

## Dialog & Modal Components (8)

### dialog
Modal dialog box.

- **Import**: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"`
- **Dependencies**: button (for trigger)
- **Features**: Modal overlay, keyboard navigation
- **Examples**: Forms in modals, confirmations, details
- **Best For**: Important user interactions

### alert-dialog
Alert/confirmation dialog.

- **Import**: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"`
- **Dependencies**: button
- **Usage**: Destructive actions, confirmations
- **Examples**: Delete confirmation, important warnings
- **Best For**: Critical actions that need confirmation

### drawer
Slide-out drawer panel.

- **Import**: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"`
- **Dependencies**: vaul package
- **Behavior**: Slides from side, mobile-optimized
- **Examples**: Mobile navigation, filter panels
- **Best For**: Mobile-first applications

### sheet
Bottom sheet or side sheet.

- **Import**: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"`
- **Dependencies**: button
- **Positions**: left, right, top, bottom
- **Examples**: Mobile sidebars, action sheets
- **Best For**: Mobile and desktop modals

### popover
Floating content panel.

- **Import**: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`
- **Dependencies**: None (Base Styles only)
- **Features**: Positioning, click outside to close
- **Examples**: Popovers with content, date pickers
- **Best For**: Light floating content

### hover-card
Card that appears on hover.

- **Import**: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"`
- **Dependencies**: None (Base Styles only)
- **Usage**: Show on hover, hide on leave
- **Examples**: User profiles, rich previews
- **Best For**: Additional info on hover

### command
Command palette / search interface.

- **Import**: `import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"`
- **Dependencies**: cmdk, dialog, input-group
- **Features**: Searchable, keyboard navigation
- **Examples**: Command palettes, fuzzy search
- **Best For**: Advanced search, command input

### context-menu
Right-click context menu.

- **Import**: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from "@/components/ui/context-menu"`
- **Dependencies**: None (Base Styles only)
- **Trigger**: Right-click (contextmenu event)
- **Examples**: File context menus, image menus
- **Best For**: Desktop-like interactions

---

## Display & Feedback Components (11)

### badge
Small label or status indicator.

- **Import**: `import { Badge } from "@/components/ui/badge"`
- **Dependencies**: None
- **Variants**: default, secondary, destructive, outline
- **Examples**: Tags, status labels, badges
- **Best For**: Labels, categories, status indicators

### alert
Alert message box.

- **Import**: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"`
- **Dependencies**: None
- **Variants**: default, destructive
- **Examples**: Info messages, warnings, errors
- **Best For**: Prominent notifications

### progress
Progress bar component.

- **Import**: `import { Progress } from "@/components/ui/progress"`
- **Dependencies**: None
- **Usage**: Show progress from 0-100
- **Examples**: File uploads, loading progress
- **Best For**: Long-running operations

### skeleton
Loading placeholder.

- **Import**: `import { Skeleton } from "@/components/ui/skeleton"`
- **Dependencies**: None
- **Usage**: Placeholder while loading content
- **Examples**: Skeleton screens, content loaders
- **Best For**: Better UX during loading

### spinner
Loading spinner animation.

- **Import**: `import { Spinner } from "@/components/ui/spinner"`
- **Dependencies**: None
- **Animation**: Rotating spinner
- **Examples**: Loading indicators, async operations
- **Best For**: Loading states

### tooltip
Text tooltip on hover.

- **Import**: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`
- **Dependencies**: None (Base Styles only)
- **Setup**: Wrap app with TooltipProvider
- **Examples**: Help text, keyboard shortcuts
- **Best For**: Contextual hints

### avatar
User avatar display.

- **Import**: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`
- **Dependencies**: None
- **Features**: Image, fallback text, status badge
- **Examples**: User profiles, team members
- **Best For**: User representations

### sonner
Toast notification system.

- **Import**: `import { Toaster, toast } from "@/components/ui/sonner"`
- **Dependencies**: sonner, next-themes
- **Types**: success, error, loading, warning, info, promise
- **Examples**: Success/error notifications
- **Best For**: Non-blocking user feedback

### button
Action button.

- **Import**: `import { Button } from "@/components/ui/button"`
- **Dependencies**: None
- **Variants**: default, secondary, destructive, outline, ghost, link
- **Sizes**: sm, md, lg, icon
- **Examples**: Primary actions, CTAs, form buttons

### marker
Highlighting/marking component.

- **Import**: `import { Marker } from "@/components/ui/marker"`
- **Dependencies**: None
- **Usage**: Highlight content, mark text
- **Examples**: Search result highlighting
- **Best For**: Visual highlighting

### kbd
Keyboard key display.

- **Import**: `import { Kbd } from "@/components/ui/kbd"`
- **Dependencies**: None
- **Usage**: Show keyboard shortcuts
- **Examples**: Help text, documentation
- **Best For**: Keyboard shortcut documentation

---

## Data Display Components (3)

### table
Data table component.

- **Import**: `import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow, TableCaption, TableFooter } from "@/components/ui/table"`
- **Dependencies**: None
- **Usage**: Display structured data
- **Examples**: Data tables, reports
- **Best For**: Tabular data display

### chart
Chart/graph visualization.

- **Import**: `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"`
- **Dependencies**: recharts@3.8.0, card
- **Types**: Line, bar, area, pie, scatter, etc.
- **Examples**: Analytics, metrics visualization
- **Best For**: Data visualization

### calendar
Date picker calendar.

- **Import**: `import { Calendar } from "@/components/ui/calendar"`
- **Dependencies**: react-day-picker, date-fns, button
- **Features**: Date selection, multiple modes
- **Examples**: Date selection, date ranges
- **Best For**: Date input, calendar views

---

## Chat & Messaging Components (4)

### message
Chat message container.

- **Import**: `import { Message, MessageContent, MessageUser } from "@/components/ui/message"`
- **Dependencies**: None
- **Usage**: Container for chat messages
- **Examples**: Chat UI, messaging apps
- **Best For**: Chat/messaging interfaces

### bubble
Chat message bubble.

- **Import**: `import { Bubble, BubbleContent } from "@/components/ui/bubble"`
- **Dependencies**: None
- **Styles**: User/assistant styling
- **Examples**: Chat messages
- **Best For**: Conversational UI

### attachment
File attachment display.

- **Import**: `import { Attachment, AttachmentDescription, AttachmentIcon, AttachmentName, AttachmentSize } from "@/components/ui/attachment"`
- **Dependencies**: button
- **Usage**: Show file attachments
- **Examples**: File uploads, attachments
- **Best For**: File display

### message-scroller
Auto-scrolling message container.

- **Import**: `import { MessageScroller } from "@/components/ui/message-scroller"`
- **Dependencies**: @shadcn/react, button
- **Features**: Auto-scroll to bottom on new messages
- **Examples**: Chat history, message lists
- **Best For**: Chat/messaging apps

---

## Additional Components

### button-group
Related button groups.

- **Import**: `import { ButtonGroup } from "@/components/ui/button-group"`
- **Dependencies**: separator
- **Usage**: Group related buttons
- **Examples**: Text formatting toolbar, mode selection
- **Best For**: Grouped actions

### collapsible
Collapsible/expandable content.

- **Import**: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"`
- **Dependencies**: None (Base Styles only)
- **Usage**: Show/hide content
- **Examples**: Expandable sections, FAQs
- **Best For**: Space-saving layouts

### item
Generic list item component.

- **Import**: `import { Item } from "@/components/ui/item"`
- **Dependencies**: separator
- **Usage**: Menu/list items
- **Examples**: Menu items, list items
- **Best For**: List-based UIs

### direction
RTL/LTR direction provider.

- **Import**: `import { Direction } from "@/components/ui/direction"`
- **Dependencies**: @base-ui/react
- **Usage**: Set text direction
- **Examples**: Arabic, Hebrew, Persian
- **Best For**: Internationalization support

---

## Component Selection Matrix

**Need a button-like action?** → button, toggle, button-group

**Need to select something?** → checkbox, radio-group, select, combobox, toggle-group

**Need to input text?** → input, textarea, input-group, input-otp

**Need to show a list?** → table, scroll-area, empty (for no data)

**Need a modal?** → dialog, alert-dialog, drawer, sheet, popover

**Need navigation?** → sidebar, breadcrumb, tabs, navigation-menu

**Need feedback?** → alert, sonner, skeleton, progress, spinner

**Need to display data?** → table, card, badge, chart, calendar

---

## File Organization

```
base/
├── ui/
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── alert-dialog.tsx
│   └── ... (56 more)
├── examples/
│   ├── accordion-example.tsx
│   ├── accordion-demo.tsx
│   └── ... (100+)
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts
└── _registry.ts (component metadata)
```

## Getting Help

- **Component documentation**: Check examples/ directory
- **Component source**: Check the .tsx file
- **Base UI API**: https://base-ui.com
- **TypeScript types**: Hover over imports in VS Code
- **Issues**: GitHub issues for shadcn/ui

---

## See Also

- [Base Implementation Overview](../README.md)
- [Full Component Catalog](../../COMPONENTS.md)
- [Pre-built Blocks](../blocks/README.md)
- [Reuse Guide](../../REUSE_GUIDE.md)
