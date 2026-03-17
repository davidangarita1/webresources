import { useEffect } from "react"
import { useResourceStore } from "../store"

export function useResources() {
  const resources = useResourceStore((s) => s.resources)
  const initialize = useResourceStore((s) => s.initialize)
  const getFilteredResources = useResourceStore((s) => s.getFilteredResources)
  const searchQuery = useResourceStore((s) => s.searchQuery)
  const searchResults = useResourceStore((s) => s.searchResults)

  useEffect(() => {
    if (resources.length === 0) {
      initialize()
    }
  }, [resources.length, initialize])

  return {
    resources,
    filteredResources: getFilteredResources(),
    searchQuery,
    searchResults,
  }
}
