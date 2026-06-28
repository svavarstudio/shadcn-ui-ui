'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface DependencyNode {
  id: string
  label: string
  category: string
  color?: string
}

interface DependencyEdge {
  source: string
  target: string
  type: 'component' | 'npm' | 'hook' | 'utility'
  weight: number
}

interface DependencyVisualizerProps {
  nodes: DependencyNode[]
  edges: DependencyEdge[]
  selectedComponent?: string
  stats?: {
    totalNodes: number
    totalEdges: number
    highestDependencyCount: number
    circularDependencies: string[][]
  }
}

export function DependencyVisualizer({
  nodes,
  edges,
  selectedComponent,
  stats,
}: DependencyVisualizerProps) {
  // Get dependencies for selected component
  const componentDeps = useMemo(() => {
    if (!selectedComponent) return { outgoing: [], incoming: [] }

    const outgoing = edges
      .filter(e => e.source === selectedComponent)
      .map(e => ({
        ...e,
        label: nodes.find(n => n.id === e.target)?.label || e.target,
      }))

    const incoming = edges
      .filter(e => e.target === selectedComponent)
      .map(e => ({
        ...e,
        label: nodes.find(n => n.id === e.source)?.label || e.source,
      }))

    return { outgoing, incoming }
  }, [selectedComponent, edges, nodes])

  // Get dependency statistics
  const depStats = useMemo(() => {
    const outgoingByType = componentDeps.outgoing.reduce(
      (acc, e) => {
        acc[e.type] = (acc[e.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const incomingCount = componentDeps.incoming.length

    return {
      outgoingTotal: componentDeps.outgoing.length,
      outgoingByType,
      incomingCount,
    }
  }, [componentDeps])

  const typeColors: Record<string, string> = {
    component: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
    npm: 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100',
    hook: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
    utility: 'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100',
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Components</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalNodes}</p>
              <p className="text-xs text-muted-foreground">in the library</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dependency Edges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalEdges}</p>
              <p className="text-xs text-muted-foreground">component relationships</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Max Dependencies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.highestDependencyCount}</p>
              <p className="text-xs text-muted-foreground">single component</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Circular Dependencies Warning */}
      {stats && stats.circularDependencies.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Circular Dependencies Detected:</p>
            <ul className="mt-2 space-y-1">
              {stats.circularDependencies.slice(0, 3).map((cycle, i) => (
                <li key={i} className="text-xs">
                  {cycle.join(' → ')}
                </li>
              ))}
            </ul>
            {stats.circularDependencies.length > 3 && (
              <p className="text-xs">
                +{stats.circularDependencies.length - 3} more cycles
              </p>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Component Dependencies */}
      {selectedComponent && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Outgoing Dependencies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Dependencies ({depStats.outgoingTotal})
              </CardTitle>
              <CardDescription>What {selectedComponent} depends on</CardDescription>
            </CardHeader>
            <CardContent>
              {depStats.outgoingTotal === 0 ? (
                <p className="text-sm text-muted-foreground">No dependencies</p>
              ) : (
                <div className="space-y-3">
                  {/* By type summary */}
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(depStats.outgoingByType).map(([type, count]) => (
                      <Badge
                        key={type}
                        className={`${typeColors[type]} cursor-default`}
                      >
                        {type}: {count}
                      </Badge>
                    ))}
                  </div>

                  {/* Detailed list */}
                  <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border p-3">
                    {componentDeps.outgoing.map(dep => (
                      <div
                        key={`${dep.source}-${dep.target}`}
                        className="flex items-center justify-between rounded-sm bg-muted p-2 text-sm"
                      >
                        <span>{dep.label}</span>
                        <Badge
                          className={`${typeColors[dep.type]} cursor-default`}
                          variant="outline"
                        >
                          {dep.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Incoming Dependencies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Used By ({depStats.incomingCount})
              </CardTitle>
              <CardDescription>Components that depend on {selectedComponent}</CardDescription>
            </CardHeader>
            <CardContent>
              {depStats.incomingCount === 0 ? (
                <p className="text-sm text-muted-foreground">Not used by other components</p>
              ) : (
                <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border p-3">
                  {componentDeps.incoming.map(dep => (
                    <div
                      key={`${dep.source}-${dep.target}`}
                      className="flex items-center justify-between rounded-sm bg-muted p-2 text-sm"
                    >
                      <span>{dep.label}</span>
                      <Badge variant="secondary" className="cursor-default">
                        component
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(typeColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded ${colors}`} />
                <span className="text-sm capitalize">{type} dependency</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
