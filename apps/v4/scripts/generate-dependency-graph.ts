/**
 * Generate Dependency Graph
 *
 * Creates a visual representation of component dependencies:
 * - Node/edge format for visualization libraries (D3, Cytoscape, etc)
 * - Mermaid diagram format for docs
 * - Dependency matrix for analysis
 * - Circular dependency detection
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { componentMetadata } from "../registry/component-metadata"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Node {
  id: string
  label: string
  category: string
  color?: string
}

interface Edge {
  source: string
  target: string
  type: "component" | "npm" | "hook" | "utility"
  weight: number
}

interface DependencyGraph {
  nodes: Node[]
  edges: Edge[]
  stats: {
    totalNodes: number
    totalEdges: number
    highestDependencyCount: number
    circularDependencies: string[][]
  }
}

const categoryColors: Record<string, string> = {
  Navigation: "#3b82f6",
  Forms: "#8b5cf6",
  Layout: "#06b6d4",
  Dialogs: "#ec4899",
  Feedback: "#f59e0b",
  "Data Display": "#10b981",
  Chat: "#6366f1",
  Display: "#f97316",
  Actions: "#6b7280",
}

function buildDependencyGraph(): DependencyGraph {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const nodeSet = new Set<string>()

  // Create nodes for each component
  Object.entries(componentMetadata).forEach(([name, metadata]) => {
    if (!nodeSet.has(name)) {
      nodes.push({
        id: name,
        label: name.replace(/-/g, " "),
        category: metadata.category,
        color: categoryColors[metadata.category] || "#6b7280",
      })
      nodeSet.add(name)
    }
  })

  // Create edges for dependencies
  Object.entries(componentMetadata).forEach(([name, metadata]) => {
    const deps = metadata.dependencies

    // Component dependencies
    deps.components?.forEach((comp) => {
      edges.push({
        source: name,
        target: comp,
        type: "component",
        weight: 2,
      })
    })

    // Hook dependencies
    deps.hooks?.forEach((hook) => {
      const hookName = hook.replace(/^use-/, "")
      edges.push({
        source: name,
        target: hookName,
        type: "hook",
        weight: 1,
      })
    })

    // Utility dependencies
    deps.utilities?.forEach((util) => {
      edges.push({
        source: name,
        target: util,
        type: "utility",
        weight: 1,
      })
    })
  })

  // Detect circular dependencies
  const circularDeps = detectCircularDependencies(
    Object.keys(componentMetadata)
  )

  const stats = {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    highestDependencyCount: Math.max(
      ...Object.values(componentMetadata).map(
        (c) =>
          (c.dependencies.components?.length || 0) +
          (c.dependencies.npm?.length || 0)
      )
    ),
    circularDependencies: circularDeps,
  }

  return {
    nodes,
    edges,
    stats,
  }
}

function detectCircularDependencies(components: string[]): string[][] {
  const dependencies: Record<string, string[]> = {}

  // Build dependency map
  components.forEach((comp) => {
    const metadata = componentMetadata[comp]
    if (metadata) {
      dependencies[comp] = metadata.dependencies.components || []
    }
  })

  const visited = new Set<string>()
  const recStack = new Set<string>()
  const cycles: string[][] = []

  function dfs(node: string, path: string[]): void {
    visited.add(node)
    recStack.add(node)
    path.push(node)

    const deps = dependencies[node] || []
    for (const dep of deps) {
      if (!visited.has(dep)) {
        dfs(dep, [...path])
      } else if (recStack.has(dep)) {
        const cycleStart = path.indexOf(dep)
        if (cycleStart !== -1) {
          const cycle = path.slice(cycleStart).concat([dep])
          cycles.push(cycle)
        }
      }
    }

    recStack.delete(node)
  }

  components.forEach((comp) => {
    if (!visited.has(comp)) {
      dfs(comp, [])
    }
  })

  return cycles
}

function generateMermaidDiagram(
  graph: DependencyGraph,
  maxDepth: number = 3
): string {
  const lines: string[] = ["graph TD"]

  // Add nodes with styling
  const categoryStyles = Object.entries(categoryColors).map(
    ([cat, color], i) =>
      `classDef ${cat.replace(/\s/g, "")} fill:${color},stroke:#333,stroke-width:2px,color:#fff`
  )

  // Add edges (limit to avoid complexity)
  const limitedEdges = graph.edges.slice(0, Math.min(graph.edges.length, 50))

  limitedEdges.forEach((edge) => {
    const label = edge.type === "component" ? "" : ` |${edge.type}|`
    lines.push(
      `    ${edge.source.replace(/-/g, "_")} -->${label} ${edge.target.replace(/-/g, "_")}`
    )
  })

  // Apply styles
  graph.nodes.slice(0, 20).forEach((node) => {
    const className = node.category.replace(/\s/g, "")
    lines.push(`    class ${node.id.replace(/-/g, "_")} ${className}`)
  })

  return lines.concat(categoryStyles).join("\n")
}

async function main() {
  console.log("🔗 Generating dependency graph...")

  const graph = buildDependencyGraph()

  // Output directory
  const outputDir = path.join(__dirname, "../public")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate graph data (node/edge format)
  const graphData = {
    generated: new Date().toISOString(),
    version: "1.0.0",
    ...graph,
  }

  fs.writeFileSync(
    path.join(outputDir, "dependency-graph.json"),
    JSON.stringify(graphData, null, 2)
  )
  console.log("✅ Generated dependency-graph.json")

  // Generate Mermaid diagram
  const mermaidDiagram = generateMermaidDiagram(graph)
  fs.writeFileSync(
    path.join(outputDir, "dependency-diagram.mmd"),
    mermaidDiagram
  )
  console.log("✅ Generated dependency-diagram.mmd")

  // Generate dependency list
  const depList: Record<string, string[]> = {}
  Object.entries(componentMetadata).forEach(([name, metadata]) => {
    depList[name] = [
      ...(metadata.dependencies.components || []),
      ...(metadata.dependencies.npm || []),
      ...(metadata.dependencies.hooks || []),
    ]
  })

  fs.writeFileSync(
    path.join(outputDir, "dependency-list.json"),
    JSON.stringify(depList, null, 2)
  )
  console.log("✅ Generated dependency-list.json")

  // Console output
  console.log("\n📊 Dependency Graph Statistics:")
  console.log(`   Total Nodes: ${graph.stats.totalNodes}`)
  console.log(`   Total Edges: ${graph.stats.totalEdges}`)
  console.log(
    `   Highest Dependency Count: ${graph.stats.highestDependencyCount}`
  )

  if (graph.stats.circularDependencies.length > 0) {
    console.log(
      `   ⚠️  Circular Dependencies Found: ${graph.stats.circularDependencies.length}`
    )
    graph.stats.circularDependencies.forEach((cycle) => {
      console.log(`      → ${cycle.join(" → ")}`)
    })
  } else {
    console.log(`   ✅ No circular dependencies detected`)
  }

  // Find most depended-on components
  const incomingEdges: Record<string, number> = {}
  graph.edges.forEach((edge) => {
    incomingEdges[edge.target] = (incomingEdges[edge.target] || 0) + 1
  })

  const mostDependedOn = Object.entries(incomingEdges)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  console.log(`   Most Depended-On Components:`)
  mostDependedOn.forEach(([comp, count]) => {
    console.log(`      • ${comp}: ${count} components depend on it`)
  })

  console.log("\n✨ Dependency graph generation complete!")
}

main().catch(console.error)
