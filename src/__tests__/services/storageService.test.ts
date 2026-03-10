import { storageService } from "../../services/storageService"
import type { ResourceStatus } from "../../types"

describe("storageService", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("favorites", () => {
    it("should return empty array when no favorites stored", () => {
      expect(storageService.getFavorites()).toEqual([])
    })

    it("should save and retrieve favorites", () => {
      storageService.saveFavorites(["1", "2", "3"])
      expect(storageService.getFavorites()).toEqual(["1", "2", "3"])
    })

    it("should toggle favorite on when not present", () => {
      const result = storageService.toggleFavorite("1")
      expect(result).toContain("1")
      expect(storageService.isFavorite("1")).toBe(true)
    })

    it("should toggle favorite off when already present", () => {
      storageService.saveFavorites(["1", "2"])
      const result = storageService.toggleFavorite("1")
      expect(result).not.toContain("1")
      expect(result).toContain("2")
      expect(storageService.isFavorite("1")).toBe(false)
    })

    it("should check if resource is favorite", () => {
      storageService.saveFavorites(["5"])
      expect(storageService.isFavorite("5")).toBe(true)
      expect(storageService.isFavorite("999")).toBe(false)
    })
  })

  describe("statuses", () => {
    it("should return empty object when no statuses stored", () => {
      expect(storageService.getStatuses()).toEqual({})
    })

    it("should set and retrieve a status", () => {
      storageService.setStatus("1", "pending")
      expect(storageService.getStatus("1")).toBe("pending")
    })

    it("should update existing status", () => {
      storageService.setStatus("1", "pending")
      storageService.setStatus("1", "consumed")
      expect(storageService.getStatus("1")).toBe("consumed")
    })

    it("should remove a status", () => {
      storageService.setStatus("1", "pending")
      storageService.removeStatus("1")
      expect(storageService.getStatus("1")).toBeUndefined()
    })

    it("should save and retrieve all statuses", () => {
      const statuses: Record<string, ResourceStatus> = {
        "1": "pending",
        "2": "consumed",
        "3": "reference",
      }
      storageService.saveStatuses(statuses)
      expect(storageService.getStatuses()).toEqual(statuses)
    })

    it("should handle multiple status operations", () => {
      storageService.setStatus("1", "pending")
      storageService.setStatus("2", "consumed")
      storageService.setStatus("3", "reference")
      storageService.removeStatus("2")

      const result = storageService.getStatuses()
      expect(result["1"]).toBe("pending")
      expect(result["2"]).toBeUndefined()
      expect(result["3"]).toBe("reference")
    })
  })
})
