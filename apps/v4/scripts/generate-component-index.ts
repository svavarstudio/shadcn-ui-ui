/**
 * Generate Component Index
 *
 * Generates a machine-readable index of all components for use in:
 * - Search and filtering on docs site
 * - Component discovery tools
 * - CLI auto-completion
 * - Third-party integrations
 */

import fs from "fs"
import path from "path"
import { componentMetadata } from "../component-metadata"

interface ComponentIndex {
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
  searchKeywords: string[]
}

function generateSearchKeywords(component: typeof componentMetadata[string]): string[] {
  const keywords: string[] = []

  // Add component name
  keywords.push(component.name)
  keywords.push(component.name.replace(/-/g, ""))

  // Add category
  keywords.push(component.category.toLowerCase())

  // Add description terms
  const descriptionTerms = component.description
    .toLowerCase()
    .split(/\s+/)
    .filter(
      (term) =>
        term.length > 3 &&
        !["for", "the", "and", "with", "from", "that", "this"].includes(term)
    )
  keywords.push(...descriptionTerms)

  // Add purpose keywords
  keywords.push(...component.purpose.toLowerCase().split(/\s+/).slice(0, 5))

  // Add best for keywords
  component.bestFor.forEach((use) => {
    keywords.push(...use.toLowerCase().split(/\s+/))
  })

  // Add related components
  keywords.push(...component.relatedComponents)

  // Remove duplicates and sort
  return Array.from(new Set(keywords))
    .filter((k) => k.length > 2)
    .sort()
}

function generateComponentIndex(): ComponentIndex[] {
  return Object.entries(componentMetadata).map(([name, metadata]) => ({
    ...metadata,
    searchKeywords: generateSearchKeywords(metadata),
  }))
}

function groupByCategory(components: ComponentIndex[]) {
  const grouped: Record<string, ComponentIndex[]> = {}

  components.forEach((component) => {
    const category = component.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(component)
  })

  return grouped
}

function generateDependencyStats(components: ComponentIndex[]) {
  const stats = {
    totalComponents: components.length,
    categoriesCount: new Set(components.map((c) => c.category)).size,
    highDependencyComponents: components
      .filter(
        (c) =>
          (c.dependencies.components?.length || 0) +
            (c.dependencies.npm?.length || 0) >
          3
      )
      .map((c) => ({
        name: c.name,
        dependencyCount:
          (c.dependencies.components?.length || 0) +
          (c.dependencies.npm?.length || 0),
      }))
      .sort((a, b) => b.dependencyCount - a.dependencyCount),
    mostRelatedComponent: components.reduce((a, b) =>
      (b.relatedComponents?.length || 0) >
      (a.relatedComponents?.length || 0)
        ? b
        : a
    ),
  }

  return stats
}

async function main() {
  console.log("🔍 Generating component index...")

  const components = generateComponentIndex()
  const grouped = groupByCategory(components)
  const stats = generateDependencyStats(components)

  // Output directory
  const outputDir = path.join(__dirname, "../public")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate component index
  const indexData = {
    generated: new Date().toISOString(),
    version: "1.0.0",
    totalComponents: components.length,
    categories: Object.keys(grouped).sort(),
    components: components.sort((a, b) => a.name.localeCompare(b.name)),
  }

  fs.writeFileSync(
    path.join(outputDir, "component-index.json"),
    JSON.stringify(indexData, null, 2)
  )
  console.log("✅ Generated component-index.json")

  // Generate by-category index
  const byCategory = Object.fromEntries(
    Object.entries(grouped).map(([category, comps]) => [
      category,
      comps.map((c) => ({
        name: c.name,
        description: c.description,
        bestFor: c.bestFor,
      })),
    ])
  )

  fs.writeFileSync(
    path.join(outputDir, "components-by-category.json"),
    JSON.stringify(byCategory, null, 2)
  )
  console.log("✅ Generated components-by-category.json")

  // Generate search index (lightweight for client-side search)
  const searchIndex = components.map((c) => ({
    name: c.name,
    category: c.category,
    keywords: c.searchKeywords,
    description: c.description.substring(0, 100),
  }))

  fs.writeFileSync(
    path.join(outputDir, "component-search-index.json"),
    JSON.stringify(searchIndex, null, 2)
  )
  console.log("✅ Generated component-search-index.json")

  // Generate dependency matrix
  const dependencyMatrix: Record<
    string,
    { components: string[]; npm: string[] }
  > = {}

  components.forEach((c) => {
    dependencyMatrix[c.name] = {
      components: c.dependencies.components || [],
      npm: c.dependencies.npm || [],
    }
  })

  fs.writeFileSync(
    path.join(outputDir, "component-dependencies.json"),
    JSON.stringify(dependencyMatrix, null, 2)
  )
  console.log("✅ Generated component-dependencies.json")

  // Generate statistics
  const statsData = {
    generated: new Date().toISOString(),
    ...stats,
  }

  fs.writeFileSync(
    path.join(outputDir, "component-stats.json"),
    JSON.stringify(statsData, null, 2)
  )
  console.log("✅ Generated component-stats.json")

  // Console output
  console.log("\n📊 Component Statistics:")
  console.log(`   Total Components: ${stats.totalComponents}`)
  console.log(
    `   Categories: ${stats.categoriesCount} (${Object.keys(grouped)
      .sort()
      .join(", ")})`
  )
  console.log(
    `   High-Dependency Components (>3 deps):\n      ${stats.highDependencyComponents
      .slice(0, 5)
      .map((c) => `${c.name} (${c.dependencyCount})`)
      .join("\n      ")}`
  )

  console.log("\n✨ Component index generation complete!")
}

main().catch(console.error)
