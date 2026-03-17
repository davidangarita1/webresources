import { resourceService } from "../../services/resourceService"

describe("resourceService", () => {
  describe("getAllResources", () => {
    it("returns an array of resources", () => {
      const resources = resourceService.getAllResources()
      expect(Array.isArray(resources)).toBe(true)
      expect(resources.length).toBeGreaterThan(0)
    })

    it("each resource has required fields", () => {
      const resources = resourceService.getAllResources()
      for (const r of resources) {
        expect(r).toHaveProperty("id")
        expect(r).toHaveProperty("title")
        expect(r).toHaveProperty("url")
        expect(r).toHaveProperty("category")
        expect(r).toHaveProperty("tags")
      }
    })
  })

  describe("getCategories", () => {
    it("returns a sorted array of unique categories", () => {
      const categories = resourceService.getCategories()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
      expect(categories).toEqual([...categories].sort())
    })

    it("contains no duplicates", () => {
      const categories = resourceService.getCategories()
      expect(new Set(categories).size).toBe(categories.length)
    })
  })
})
