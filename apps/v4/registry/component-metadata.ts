/**
 * Enhanced Component Metadata
 *
 * This file provides additional metadata for components beyond the basic registry.
 * It includes descriptions, categories, detailed dependencies, related components,
 * accessibility notes, and CSS variables used.
 *
 * Use this to populate discovery tools, search, and documentation generation.
 */

export interface ComponentMetadata {
  name: string
  category: string
  description: string
  purpose: string
  bestFor: string[]
  dependencies: {
    npm?: string[]
    components?: string[]
    hooks?: string[]
    utilities?: string[]
  }
  relatedComponents: string[]
  accessibility: string
  cssVariables?: string[]
  examples?: string[]
  blocks?: string[]
}

export const componentMetadata: Record<string, ComponentMetadata> = {
  // Navigation Components
  accordion: {
    name: "accordion",
    category: "Navigation",
    description: "Expandable accordion sections for organizing collapsible content",
    purpose: "Show/hide content in sections with header controls",
    bestFor: ["FAQ sections", "Detailed content areas", "Settings panels"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["collapsible", "tabs"],
    accessibility:
      "Full keyboard navigation (Arrow keys, Enter). ARIA roles and attributes for screen readers.",
    cssVariables: [
      "--background",
      "--foreground",
      "--primary",
      "--border",
    ],
  },

  alert: {
    name: "alert",
    category: "Feedback",
    description: "Alert message box for displaying important information",
    purpose: "Display notifications, warnings, or errors to users",
    bestFor: ["Error messages", "Warnings", "Important info", "Success messages"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["sonner", "progress"],
    accessibility:
      "ARIA role='alert' for screen reader announcement. Semantic HTML.",
    cssVariables: [
      "--background",
      "--foreground",
      "--destructive",
      "--primary",
    ],
  },

  button: {
    name: "button",
    category: "Actions",
    description: "Versatile button component for triggering actions",
    purpose: "Primary interactive element for user actions",
    bestFor: ["Form submission", "Navigation", "Actions", "CTAs"],
    dependencies: {
      npm: ["class-variance-authority", "lucide-react"],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["toggle", "button-group"],
    accessibility:
      "Semantic button element. Supports disabled state. Focus indicators. Proper ARIA labels.",
    cssVariables: [
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--destructive",
    ],
  },

  card: {
    name: "card",
    category: "Layout",
    description: "Container component with elevation and styling",
    purpose: "Group related content with visual separation",
    bestFor: ["Content panels", "Product cards", "Data cards", "Statistics"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["separator", "container"],
    accessibility: "Semantic HTML structure. Proper heading hierarchy inside.",
    cssVariables: ["--background", "--border", "--foreground"],
  },

  dialog: {
    name: "dialog",
    category: "Dialogs",
    description: "Modal dialog box for focused user interaction",
    purpose: "Display modal content that requires user attention",
    bestFor: ["Forms in modals", "Confirmations", "Details", "Selections"],
    dependencies: {
      npm: [],
      components: ["button"],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["alert-dialog", "drawer", "sheet", "popover"],
    accessibility:
      "ARIA modal, trap focus, close on Escape, manage scroll. Full WCAG compliance.",
    cssVariables: [
      "--background",
      "--foreground",
      "--border",
      "--ring",
    ],
  },

  input: {
    name: "input",
    category: "Forms",
    description: "Text input field for various data types",
    purpose: "Collect text data from users",
    bestFor: ["Login", "Search", "Forms", "Filters"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["textarea", "input-group", "input-otp"],
    accessibility:
      "Proper label association. Clear focus indicators. Error states. Disabled state support.",
    cssVariables: ["--background", "--foreground", "--border", "--ring"],
  },

  sidebar: {
    name: "sidebar",
    category: "Navigation",
    description: "Persistent side navigation panel with mobile responsiveness",
    purpose: "Main navigation for multi-page applications",
    bestFor: ["App layouts", "Admin dashboards", "Multi-page apps"],
    dependencies: {
      npm: [],
      components: [
        "button",
        "input",
        "separator",
        "sheet",
        "skeleton",
        "tooltip",
      ],
      hooks: ["use-mobile"],
      utilities: ["cn"],
    },
    relatedComponents: ["navigation-menu", "breadcrumb"],
    accessibility:
      "ARIA landmarks. Keyboard navigation. Proper focus management. Mobile accessible.",
    cssVariables: [
      "--background",
      "--foreground",
      "--primary",
      "--border",
    ],
  },

  table: {
    name: "table",
    category: "Data Display",
    description: "Data table component for displaying structured data",
    purpose: "Present tabular data in organized rows and columns",
    bestFor: ["Data display", "Reports", "Listings", "Analytics"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["pagination", "badge"],
    accessibility:
      "Semantic table elements. Proper header scope. ARIA attributes for sorting.",
    cssVariables: ["--background", "--foreground", "--border"],
  },

  tabs: {
    name: "tabs",
    category: "Navigation",
    description: "Organize content into selectable sections",
    purpose: "Switch between different views or sections",
    bestFor: ["Settings panels", "Documentation", "Multi-section content"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["accordion", "navigation-menu"],
    accessibility:
      "Full keyboard navigation. ARIA roles and attributes. Focus management.",
    cssVariables: ["--background", "--foreground", "--primary", "--border"],
  },

  tooltip: {
    name: "tooltip",
    category: "Feedback",
    description: "Text tooltip on hover for contextual help",
    purpose: "Display additional information on hover",
    bestFor: ["Help text", "Keyboard shortcuts", "Additional info"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["popover", "hover-card"],
    accessibility:
      "Requires TooltipProvider. Keyboard accessible. Screen reader support.",
    cssVariables: ["--background", "--foreground", "--border"],
  },

  // Form Components
  checkbox: {
    name: "checkbox",
    category: "Forms",
    description: "Boolean input for multiple selections",
    purpose: "Allow users to select multiple options",
    bestFor: ["Multiple choice", "Preferences", "Agreements"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["radio-group", "toggle", "switch"],
    accessibility:
      "Native input element with proper labeling. Indeterminate state support.",
    cssVariables: ["--primary", "--background", "--border"],
  },

  label: {
    name: "label",
    category: "Forms",
    description: "Form label element for input association",
    purpose: "Label form inputs for accessibility",
    bestFor: ["Form fields", "Accessibility", "Usability"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["input", "textarea"],
    accessibility:
      "Proper htmlFor attribute. Semantic HTML. Screen reader support.",
    cssVariables: ["--foreground"],
  },

  select: {
    name: "select",
    category: "Forms",
    description: "Dropdown select list (custom styled)",
    purpose: "Select one option from many",
    bestFor: ["Option selection", "Filters", "Form fields"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["combobox", "native-select", "radio-group"],
    accessibility:
      "Full keyboard navigation. Screen reader support. ARIA attributes.",
    cssVariables: ["--background", "--foreground", "--border", "--ring"],
  },

  textarea: {
    name: "textarea",
    category: "Forms",
    description: "Multi-line text input",
    purpose: "Collect multi-line text from users",
    bestFor: ["Comments", "Descriptions", "Long-form text"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["input", "input-group"],
    accessibility:
      "Proper labeling. Clear focus indicators. Resize controls accessible.",
    cssVariables: ["--background", "--foreground", "--border", "--ring"],
  },

  // Chat Components
  bubble: {
    name: "bubble",
    category: "Chat",
    description: "Chat message bubble for conversational UI",
    purpose: "Display chat messages with visual styling",
    bestFor: ["Chat interfaces", "Messaging apps", "Conversations"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["message", "message-scroller"],
    accessibility: "Semantic HTML. Proper text contrast. Screen reader support.",
    cssVariables: ["--background", "--foreground", "--primary"],
  },

  message: {
    name: "message",
    category: "Chat",
    description: "Chat message container",
    purpose: "Container for chat message content",
    bestFor: ["Chat UI", "Messaging", "Conversations"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["bubble", "message-scroller", "attachment"],
    accessibility: "Semantic structure. Clear hierarchy. Screen reader support.",
    cssVariables: ["--background", "--foreground"],
  },

  // Layout Components
  separator: {
    name: "separator",
    category: "Layout",
    description: "Visual divider line",
    purpose: "Visually separate content sections",
    bestFor: ["Visual separation", "Section dividers", "Layout structure"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["card"],
    accessibility: "Semantic separator. No content announcement needed.",
    cssVariables: ["--border"],
  },

  // Navigation Components
  pagination: {
    name: "pagination",
    category: "Navigation",
    description: "Navigate between pages of content",
    purpose: "Control pagination of large datasets",
    bestFor: ["Data tables", "Search results", "Content lists"],
    dependencies: {
      npm: [],
      components: ["button"],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["table", "breadcrumb"],
    accessibility:
      "Semantic button elements. Proper aria-labels. Keyboard navigation.",
    cssVariables: ["--primary", "--background", "--border"],
  },

  // Display Components
  progress: {
    name: "progress",
    category: "Feedback",
    description: "Progress bar component",
    purpose: "Show progress from 0-100",
    bestFor: ["Loading progress", "File uploads", "Long operations"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["skeleton", "spinner"],
    accessibility:
      "ARIA role and aria-valuenow. Screen reader announcements. Semantic HTML.",
    cssVariables: ["--primary", "--background"],
  },

  skeleton: {
    name: "skeleton",
    category: "Feedback",
    description: "Loading placeholder component",
    purpose: "Show placeholder while content loads",
    bestFor: ["Skeleton screens", "Loading states", "Content loaders"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["progress", "spinner"],
    accessibility:
      "Hidden from screen readers. aria-busy indicator on parent.",
    cssVariables: ["--background", "--border"],
  },

  spinner: {
    name: "spinner",
    category: "Feedback",
    description: "Loading spinner animation",
    purpose: "Indicate loading state",
    bestFor: ["Async operations", "Loading indicators"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["progress", "skeleton"],
    accessibility:
      "aria-busy, aria-live region. Hidden from screen readers if decorative.",
    cssVariables: ["--primary"],
  },

  badge: {
    name: "badge",
    category: "Display",
    description: "Small label or status indicator",
    purpose: "Display tags, status, or labels",
    bestFor: ["Tags", "Status indicators", "Labels", "Badges"],
    dependencies: {
      npm: ["class-variance-authority"],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["table", "card"],
    accessibility: "Semantic span. Proper contrast ratio. Text content clear.",
    cssVariables: [
      "--primary",
      "--secondary",
      "--destructive",
      "--foreground",
    ],
  },

  // Dialog Components
  popover: {
    name: "popover",
    category: "Dialogs",
    description: "Floating content panel",
    purpose: "Display floating content near trigger element",
    bestFor: ["Popovers with content", "Date pickers", "Rich tooltips"],
    dependencies: {
      npm: [],
      components: [],
      hooks: [],
      utilities: ["cn"],
    },
    relatedComponents: ["hover-card", "dialog", "sheet"],
    accessibility:
      "Proper focus management. Close on outside click. Escape key support.",
    cssVariables: ["--background", "--foreground", "--border"],
  },
}

/**
 * Helper functions for working with metadata
 */

export function getComponentMetadata(
  name: string
): ComponentMetadata | undefined {
  return componentMetadata[name]
}

export function getComponentsByCategory(category: string): ComponentMetadata[] {
  return Object.values(componentMetadata).filter((c) => c.category === category)
}

export function getComponentDependencies(name: string): {
  npm: string[]
  components: string[]
  hooks: string[]
  utilities: string[]
} {
  const metadata = getComponentMetadata(name)
  return metadata?.dependencies || {
    npm: [],
    components: [],
    hooks: [],
    utilities: [],
  }
}

export function getRelatedComponents(name: string): string[] {
  const metadata = getComponentMetadata(name)
  return metadata?.relatedComponents || []
}

export function getAllCategories(): string[] {
  const categories = new Set(
    Object.values(componentMetadata).map((c) => c.category)
  )
  return Array.from(categories).sort()
}
