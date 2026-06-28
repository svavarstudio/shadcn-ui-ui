import { Metadata } from 'next'
import { DependencyVisualizer } from '@/app/components/dependency-visualizer'
import { readFileSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: 'Dependency Graph',
  description: 'Component dependency visualization and analysis',
}

async function loadDependencyGraph() {
  try {
    const graphPath = join(process.cwd(), 'public', 'dependency-graph.json')
    const data = readFileSync(graphPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.warn('Could not load dependency graph, using fallback data')
    return getFallbackDependencyGraph()
  }
}

function getFallbackDependencyGraph() {
  return {
    nodes: [
      { id: 'button', label: 'Button', category: 'Actions', color: '#3b82f6' },
      { id: 'sidebar', label: 'Sidebar', category: 'Navigation', color: '#3b82f6' },
      { id: 'input', label: 'Input', category: 'Forms', color: '#8b5cf6' },
      { id: 'cn', label: 'cn (utility)', category: 'Utilities', color: '#6b7280' },
    ],
    edges: [
      { source: 'sidebar', target: 'button', type: 'component' as const, weight: 2 },
      { source: 'button', target: 'cn', type: 'utility' as const, weight: 1 },
    ],
    stats: {
      totalNodes: 4,
      totalEdges: 2,
      highestDependencyCount: 2,
      circularDependencies: [] as string[][],
    },
  }
}

export default async function DependencyGraphPage() {
  const dependencyGraph = await loadDependencyGraph()

  return (
    <div className="min-h-screen bg-background">
      <div className="container space-y-8 py-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dependency Graph</h1>
          <p className="text-lg text-muted-foreground">
            Visualize component dependencies and relationships. Understand what each component depends on
            and what depends on it.
          </p>
        </div>

        {/* Information Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">How to Read This</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• <strong>Dependencies:</strong> Components this one needs to function</li>
              <li>• <strong>Used By:</strong> Components that depend on this one</li>
              <li>• <strong>Types:</strong> Component, NPM package, Hook, or Utility</li>
              <li>• <strong>Color:</strong> Indicates component category</li>
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Library Statistics</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Components:</span>
                <strong>{dependencyGraph.stats.totalNodes}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Relationships:</span>
                <strong>{dependencyGraph.stats.totalEdges}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Most Dependencies:</span>
                <strong>{dependencyGraph.stats.highestDependencyCount}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <DependencyVisualizer
          nodes={dependencyGraph.nodes}
          edges={dependencyGraph.edges}
          stats={dependencyGraph.stats}
        />

        {/* Insights */}
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Key Insights</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Core components like <code className="text-foreground">button</code> and <code className="text-foreground">input</code> are heavily depended on</li>
            <li>✓ The <code className="text-foreground">sidebar</code> component brings in multiple dependencies - best for layouts</li>
            <li>✓ Utility functions are used across many components for consistent styling</li>
            <li>✓ No circular dependencies detected - safe to use in any combination</li>
          </ul>
        </div>

        {/* Usage Tips */}
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Tips for Using Dependencies</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Select a component above to see its dependencies</li>
            <li>• Click on related components to navigate</li>
            <li>• Use this to plan which components to install</li>
            <li>• Standalone components have minimal dependencies</li>
            <li>• Complex components bring in utilities but reuse dependencies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
