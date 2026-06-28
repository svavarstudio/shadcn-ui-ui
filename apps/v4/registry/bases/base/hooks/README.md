# Utility Hooks

Essential React hooks for building responsive, functional components.

## Available Hooks

### use-mobile
Responsive mobile detection hook. Returns boolean indicating if viewport is mobile size.

**Import**:
```tsx
import { useMobile } from "@/hooks/use-mobile"
```

**Usage**:
```tsx
export function MyComponent() {
  const isMobile = useMobile()
  
  return isMobile ? <MobileView /> : <DesktopView />
}
```

**Used By**:
- sidebar component (auto-collapse on mobile)
- responsive layouts

**Breakpoint**: 768px (matches Tailwind `md:` breakpoint)

**Notes**:
- Works only on client-side (use in useEffect or mark as 'use client')
- Listens to window resize events
- Returns false initially on SSR

---

## Hook Patterns

### Mobile-Responsive UI
```tsx
import { useMobile } from "@/hooks/use-mobile"
import { Drawer } from "@/components/ui/drawer"
import { Dialog } from "@/components/ui/dialog"

export function ResponsiveModal({ children }) {
  const isMobile = useMobile()
  
  if (isMobile) {
    return <Drawer>{children}</Drawer>
  }
  return <Dialog>{children}</Dialog>
}
```

### Responsive Layout
```tsx
import { useMobile } from "@/hooks/use-mobile"

export function SidebarLayout() {
  const isMobile = useMobile()
  
  return (
    <div className="flex gap-4">
      {!isMobile && <Sidebar />}
      <MainContent />
    </div>
  )
}
```

---

## Creating Custom Hooks

Add hooks to `hooks/` directory following the existing pattern:

1. Create file: `hooks/use-my-hook.ts`
2. Implement hook with TypeScript
3. Document in this README
4. Add examples in `../examples/`

---

## See Also

- [Library Utilities](../lib/README.md) - Non-hook utility functions
- [Component Reference](../ui/README.md) - Components using these hooks
