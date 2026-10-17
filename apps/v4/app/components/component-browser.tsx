'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ComponentInfo {
  name: string
  category: string
  description: string
  bestFor: string[]
  dependencies: {
    npm?: string[]
    components?: string[]
    hooks?: string[]
    utilities?: string[]
  }
  relatedComponents: string[]
  accessibility: string
}

interface ComponentBrowserProps {
  components: ComponentInfo[]
  dependencies?: Record<string, { components: string[]; npm: string[] }>
}

export function ComponentBrowser({ components, dependencies = {} }: ComponentBrowserProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  // Get unique categories
  const categories = useMemo(
    () => Array.from(new Set(components.map(c => c.category))).sort(),
    [components]
  )

  // Filter components
  const filteredComponents = useMemo(() => {
    return components.filter(comp => {
      const matchesSearch =
        comp.name.toLowerCase().includes(search.toLowerCase()) ||
        comp.description.toLowerCase().includes(search.toLowerCase()) ||
        comp.bestFor.some(use => use.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory = !selectedCategory || comp.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [components, search, selectedCategory])

  const selectedComponentData = useMemo(
    () => components.find(c => c.name === selectedComponent),
    [components, selectedComponent]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Component Browser</h1>
        <p className="text-lg text-muted-foreground">
          Explore {components.length} UI components with detailed information and dependencies
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Search & Filter */}
        <div className="space-y-4 lg:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Categories</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All ({components.length})
              </Badge>
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} ({components.filter(c => c.category === cat).length})
                </Badge>
              ))}
            </div>
          </div>

          {/* Component List */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Components ({filteredComponents.length})</p>
            <div className="max-h-96 space-y-1 overflow-y-auto rounded-lg border p-2">
              {filteredComponents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No components found</p>
              ) : (
                filteredComponents.map(comp => (
                  <div
                    key={comp.name}
                    onClick={() => setSelectedComponent(comp.name)}
                    className={`cursor-pointer rounded px-2 py-1.5 text-sm transition-colors ${
                      selectedComponent === comp.name
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {comp.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          {selectedComponentData ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedComponentData.name}</CardTitle>
                    <CardDescription>{selectedComponentData.description}</CardDescription>
                  </div>
                  <Badge>{selectedComponentData.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
                    <TabsTrigger value="related">Related</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold">Purpose</h3>
                      <p className="text-sm text-muted-foreground">{selectedComponentData.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Best For</h3>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedComponentData.bestFor.map(use => (
                          <Badge key={use} variant="secondary">{use}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold">Accessibility</h3>
                      <p className="text-sm text-muted-foreground">{selectedComponentData.accessibility}</p>
                    </div>

                    {selectedComponentData.dependencies.utilities && selectedComponentData.dependencies.utilities.length > 0 && (
                      <div>
                        <h3 className="font-semibold">CSS Variables</h3>
                        <div className="flex flex-wrap gap-1 pt-2">
                          {selectedComponentData.dependencies.utilities.map(util => (
                            <Badge key={util} variant="outline" className="font-mono text-xs">
                              {util}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Dependencies Tab */}
                  <TabsContent value="dependencies" className="space-y-4 pt-4">
                    {selectedComponentData.dependencies.components && selectedComponentData.dependencies.components.length > 0 && (
                      <div>
                        <h3 className="font-semibold">UI Component Dependencies</h3>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {selectedComponentData.dependencies.components.map(dep => (
                            <Badge
                              key={dep}
                              variant="outline"
                              className="cursor-pointer hover:bg-muted"
                              onClick={() => setSelectedComponent(dep)}
                            >
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedComponentData.dependencies.npm && selectedComponentData.dependencies.npm.length > 0 && (
                      <div>
                        <h3 className="font-semibold">NPM Package Dependencies</h3>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {selectedComponentData.dependencies.npm.map(pkg => (
                            <Badge key={pkg} variant="secondary" className="font-mono text-xs">
                              {pkg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedComponentData.dependencies.hooks && selectedComponentData.dependencies.hooks.length > 0 && (
                      <div>
                        <h3 className="font-semibold">Hook Dependencies</h3>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {selectedComponentData.dependencies.hooks.map(hook => (
                            <Badge key={hook} variant="outline" className="font-mono text-xs">
                              {hook}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {!selectedComponentData.dependencies.components?.length &&
                      !selectedComponentData.dependencies.npm?.length &&
                      !selectedComponentData.dependencies.hooks?.length && (
                      <p className="text-sm text-muted-foreground">No external dependencies</p>
                    )}
                  </TabsContent>

                  {/* Related Tab */}
                  <TabsContent value="related" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold">Related Components</h3>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedComponentData.relatedComponents.length > 0 ? (
                          selectedComponentData.relatedComponents.map(related => (
                            <Badge
                              key={related}
                              variant="outline"
                              className="cursor-pointer hover:bg-muted"
                              onClick={() => setSelectedComponent(related)}
                            >
                              {related}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No related components</p>
                        )}
                      </div>
                    </div>

                    {/* Components that depend on this one */}
                    {dependencies[selectedComponentData.name] && dependencies[selectedComponentData.name].components.length > 0 && (
                      <div>
                        <h3 className="font-semibold">Used By</h3>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {dependencies[selectedComponentData.name].components.map(dependent => (
                            <Badge
                              key={dependent}
                              variant="outline"
                              className="cursor-pointer hover:bg-muted"
                              onClick={() => setSelectedComponent(dependent)}
                            >
                              {dependent}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Select a component to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
