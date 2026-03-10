import { useResourceStore } from "../store"

export function useSearch() {
  const searchQuery = useResourceStore((s) => s.searchQuery)
  const setSearchQuery = useResourceStore((s) => s.setSearchQuery)

  return {
    searchQuery,
    setSearchQuery,
  }
}
