import type { Resource } from "../types"
import resourcesData from "../data/resources.json"

function getAllResources(): Resource[] {
  return resourcesData as Resource[]
}

function getResourceById(id: string): Resource | undefined {
  return getAllResources().find((r) => r.id === id)
}

function getCategories(): string[] {
  const categories = new Set<string>()
  getAllResources().forEach((r) => categories.add(r.category))
  return Array.from(categories).sort()
}

function getResourcesByCategory(category: string): Resource[] {
  return getAllResources().filter((r) => r.category === category)
}

function getResourcesByIds(ids: string[]): Resource[] {
  const idSet = new Set(ids)
  return getAllResources().filter((r) => idSet.has(r.id))
}

export const resourceService = {
  getAllResources,
  getResourceById,
  getCategories,
  getResourcesByCategory,
  getResourcesByIds,
}
