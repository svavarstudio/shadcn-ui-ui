import { ComponentBrowser } from '@/app/components/component-browser'
import { componentMetadata } from '@/registry/component-metadata'

export const metadata = {
  title: 'Component Browser',
  description: 'Interactive component catalog with search, filtering, and dependency visualization',
}

// Build dependency reverse map (what depends on what)
function buildDependencyMap(metadata: typeof componentMetadata) {
  const dependsOn: Record<string, { components: string[]; npm: string[] }> = {}

  Object.entries(metadata).forEach(([name, meta]) => {
    const deps = meta.dependencies.components || []
    deps.forEach(dep => {
      if (!dependsOn[dep]) {
        dependsOn[dep] = { components: [], npm: [] }
      }
      dependsOn[dep].components.push(name)
    })
  })

  return dependsOn
}

export default function ComponentsBrowserPage() {
  const components = Object.entries(componentMetadata).map(([, meta]) => ({
    name: meta.name,
    category: meta.category,
    description: meta.description,
    purpose: meta.purpose,
    bestFor: meta.bestFor,
    dependencies: meta.dependencies,
    relatedComponents: meta.relatedComponents,
    accessibility: meta.accessibility,
    cssVariables: meta.cssVariables,
  }))

  const dependencyMap = buildDependencyMap(componentMetadata)

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <ComponentBrowser components={components} dependencies={dependencyMap} />
      </div>
    </div>
  )
}
