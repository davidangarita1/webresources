import { useCallback } from "react"
import { useResourceStore } from "../store"

export function useFavorites() {
  const favorites = useResourceStore((s) => s.favorites)
  const toggleFavorite = useResourceStore((s) => s.toggleFavorite)

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  )

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
}
