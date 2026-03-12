import { useEffect } from "react"
import { useResourceStore } from "../store"
import type { ResourceStatus } from "../types"

export function useResources() {
  const resources = useResourceStore((s) => s.resources)
  const userResources = useResourceStore((s) => s.userResources)
  const favorites = useResourceStore((s) => s.favorites)
  const statuses = useResourceStore((s) => s.statuses)
  const searchQuery = useResourceStore((s) => s.searchQuery)
  const searchResults = useResourceStore((s) => s.searchResults)
  const activeFilter = useResourceStore((s) => s.activeFilter)
  const activeCategory = useResourceStore((s) => s.activeCategory)
  const initialize = useResourceStore((s) => s.initialize)

  useEffect(() => {
    if (resources.length === 0) {
      initialize()
    }
  }, [resources.length, initialize])

  const baseResources = searchQuery.trim() ? searchResults : resources

  const filteredResources = (() => {
    switch (activeFilter) {
      case "user":
        return userResources
      case "favorites":
        return baseResources.filter((r) => favorites.includes(r.id))
      case "pending":
        return baseResources.filter((r) => (statuses as Record<string, ResourceStatus>)[r.id] === "pending")
      case "consumed":
        return baseResources.filter((r) => (statuses as Record<string, ResourceStatus>)[r.id] === "consumed")
      case "category":
        if (!activeCategory) return baseResources
        return baseResources.filter((r) => r.category === activeCategory)
      default:
        return baseResources
    }
  })()

  return {
    resources,
    filteredResources,
  }
}
