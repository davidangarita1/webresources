import type { ResourceStatus } from "../types"
import { STORAGE_KEYS } from "../constants/storageKeys"

function getFavorites(): string[] {
  const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as string[]) : []
  } catch {
    return []
  }
}

function saveFavorites(favorites: string[]): void {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
}

function toggleFavorite(id: string): string[] {
  const favorites = getFavorites()
  const updated = favorites.includes(id)
    ? favorites.filter((f) => f !== id)
    : [...favorites, id]
  saveFavorites(updated)
  return updated
}

function isFavorite(id: string): boolean {
  return getFavorites().includes(id)
}

function getStatuses(): Record<string, ResourceStatus> {
  const raw = localStorage.getItem(STORAGE_KEYS.STATUSES)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {}
    return parsed as Record<string, ResourceStatus>
  } catch {
    return {}
  }
}

function saveStatuses(statuses: Record<string, ResourceStatus>): void {
  localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(statuses))
}

function setStatus(id: string, status: ResourceStatus): Record<string, ResourceStatus> {
  const updated = { ...getStatuses(), [id]: status }
  saveStatuses(updated)
  return updated
}

function removeStatus(id: string): Record<string, ResourceStatus> {
  const { [id]: _, ...rest } = getStatuses()
  saveStatuses(rest)
  return rest
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
