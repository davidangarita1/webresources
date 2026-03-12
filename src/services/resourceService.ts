import type { Resource } from "../types"
import resourcesData from "../data/resources.json"

function getAllResources(): Resource[] {
  return resourcesData as Resource[]
}

function getCategories(): string[] {
  const categories = new Set<string>()
  getAllResources().forEach((r) => categories.add(r.category))
  return Array.from(categories).sort()
}

export const resourceService = {
  getAllResources,
  getCategories,
}
