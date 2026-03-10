import type { ResourceStatus } from "../types"

const FAVORITES_KEY = "bookmark_favorites"
const STATUSES_KEY = "bookmark_statuses"

function getFavorites(): string[] {
  const raw = localStorage.getItem(FAVORITES_KEY)
  if (!raw) return []
  return JSON.parse(raw) as string[]
}

function saveFavorites(favorites: string[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

function toggleFavorite(id: string): string[] {
  const favorites = getFavorites()
  const index = favorites.indexOf(id)
  if (index === -1) {
    favorites.push(id)
  } else {
    favorites.splice(index, 1)
  }
  saveFavorites(favorites)
  return favorites
}

function isFavorite(id: string): boolean {
  return getFavorites().includes(id)
}

function getStatuses(): Record<string, ResourceStatus> {
  const raw = localStorage.getItem(STATUSES_KEY)
  if (!raw) return {}
  return JSON.parse(raw) as Record<string, ResourceStatus>
}

function saveStatuses(statuses: Record<string, ResourceStatus>): void {
  localStorage.setItem(STATUSES_KEY, JSON.stringify(statuses))
}

function setStatus(id: string, status: ResourceStatus): Record<string, ResourceStatus> {
  const statuses = getStatuses()
  statuses[id] = status
  saveStatuses(statuses)
  return statuses
}

function removeStatus(id: string): Record<string, ResourceStatus> {
  const statuses = getStatuses()
  delete statuses[id]
  saveStatuses(statuses)
  return statuses
}

function getStatus(id: string): ResourceStatus | undefined {
  return getStatuses()[id]
}

export const storageService = {
  getFavorites,
  saveFavorites,
  toggleFavorite,
  isFavorite,
  getStatuses,
  saveStatuses,
  setStatus,
  removeStatus,
  getStatus,
}
