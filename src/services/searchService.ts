import Fuse, { type IFuseOptions } from "fuse.js"
import type { Resource } from "../types"

const FUSE_OPTIONS: IFuseOptions<Resource> = {
  keys: [
    { name: "title", weight: 0.3 },
    { name: "description", weight: 0.2 },
    { name: "tags", weight: 0.2 },
    { name: "url", weight: 0.15 },
    { name: "category", weight: 0.15 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
}

function createSearchIndex(resources: Resource[]): Fuse<Resource> {
  return new Fuse(resources, FUSE_OPTIONS)
}

function search(index: Fuse<Resource>, query: string): Resource[] {
  if (!query.trim()) return []
  const results = index.search(query)
  return results.map((result) => result.item)
}

export const searchService = {
  createSearchIndex,
  search,
}
