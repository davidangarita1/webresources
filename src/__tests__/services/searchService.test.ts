import { searchService } from "../../services/searchService"
import type { Resource } from "../../types"

const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "React Documentation",
    url: "https://react.dev",
    description: "Official React documentation",
    category: "REACT",
    tags: ["react", "javascript"],
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
    category: "CSS",
    tags: ["css", "tailwind"],
    createdAt: "2025-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    url: "https://typescriptlang.org",
    description: "Learn TypeScript from scratch",
    category: "PROGRAMMING",
    tags: ["typescript", "programming"],
    createdAt: "2025-01-03T00:00:00Z",
  },
]

describe("searchService", () => {
  it("should create a search index", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    expect(index).toBeDefined()
  })

  it("should find resources by title", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    const results = searchService.search(index, "React")
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].title).toBe("React Documentation")
  })

  it("should find resources by category", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    const results = searchService.search(index, "CSS")
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((r) => r.category === "CSS")).toBe(true)
  })

  it("should find resources by tags", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    const results = searchService.search(index, "typescript")
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].tags).toContain("typescript")
  })

  it("should find resources by description", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    const results = searchService.search(index, "utility-first")
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].id).toBe("2")
  })

  it("should return empty array for empty query", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    const results = searchService.search(index, "")
    expect(results).toEqual([])
  })

  it("should return empty array for whitespace-only query", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    const results = searchService.search(index, "   ")
    expect(results).toEqual([])
  })

  it("should handle fuzzy matching", () => {
    const index = searchService.createSearchIndex(MOCK_RESOURCES)
    const results = searchService.search(index, "Reac")
    expect(results.length).toBeGreaterThan(0)
  })
})
