# Utility Functions

Shared utility functions used across components.

## Available Utilities

### utils.ts
Core utility functions for className merging and type helpers.

**Import**:
```tsx
import { cn } from "@/lib/utils"
```

**Functions**:

#### cn()
Merge and deduplicate CSS class names, handling Tailwind conflicts.

**Usage**:
```tsx
import { cn } from "@/lib/utils"

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md bg-blue-500 text-white",
        className
      )}
      {...props}
    />
  )
}
```

**Features**:
- Deduplicates class names
- Removes conflicting Tailwind classes
- Handles conditional classes
- Works with clsx patterns

**Conflicts Handled**:
```tsx
// These will be deduplicated correctly
cn("px-4", "px-6")           // → px-6
cn("text-blue-500", "text-red-500") // → text-red-500
cn("rounded-md", "rounded-lg")      // → rounded-lg
```

---

## Common Patterns

### Conditional Classes
```tsx
import { cn } from "@/lib/utils"

export function Card({ variant = "default" }) {
  return (
    <div className={cn(
      "p-4 rounded-lg",
      variant === "elevated" && "shadow-lg",
      variant === "outlined" && "border border-gray-200"
    )}>
      Content
    </div>
  )
}
```

### Responsive Classes
```tsx
import { cn } from "@/lib/utils"

export function Grid({ columns }) {
  return (
    <div className={cn(
      "grid gap-4",
      columns === 1 && "md:grid-cols-1",
      columns === 2 && "md:grid-cols-2",
      columns === 3 && "md:grid-cols-3",
    )}>
      {/* Items */}
    </div>
  )
}
```

### Component Variants
```tsx
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

export const buttonVariants = cva("px-4 py-2 rounded-md", {
  variants: {
    variant: {
      default: "bg-blue-500 text-white",
      outline: "border border-blue-500 text-blue-500",
    },
  },
})

export function Button({ variant = "default", ...props }) {
  return (
    <button className={buttonVariants({ variant })} {...props} />
  )
}
```

---

## Dependency Graph

**Used By**: All components that need:
- Dynamic class names
- Conditional styling
- Responsive variants
- Tailwind conflict resolution

---

## Best Practices

1. **Always use `cn()` for dynamic classes**
   ```tsx
   // ✅ Good
   className={cn("base-classes", isActive && "active-classes")}
   
   // ❌ Avoid
   className={`base-classes ${isActive ? "active-classes" : ""}`}
   ```

2. **Use className-variance-authority for variants**
   ```tsx
   // ✅ Good
   const variants = cva("base", { variants: { ... } })
   
   // ❌ Avoid
   const className = variant === "a" ? "..." : variant === "b" ? "..." : "..."
   ```

3. **Keep utility functions pure**
   ```tsx
   // ✅ Good
   const formatDate = (date) => date.toLocaleDateString()
   
   // ❌ Avoid
   const formatDate = (date) => console.log(date); ...
   ```

---

## Adding New Utilities

1. Add function to `utils.ts`
2. Export clearly
3. Document usage
4. Add examples in component files
5. Update this README

**Template**:
```tsx
/**
 * Utility description
 * @param input Parameter description
 * @returns Return value description
 */
export function myUtil(input: string): string {
  // Implementation
}
```

---

## See Also

- [Hooks Reference](../hooks/README.md) - Custom hooks
- [Component Reference](../ui/README.md) - Components using utils
