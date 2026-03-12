import { userResourceService } from "../../services/userResourceService"
import { STORAGE_KEYS } from "../../constants/storageKeys"
import type { UserResource } from "../../types"

describe("userResourceService", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("getAll", () => {
    it("returns empty array when nothing stored", () => {
      expect(userResourceService.getAll()).toEqual([])
    })

    it("returns stored resources", () => {
      const resources: UserResource[] = [
        { id: "1", title: "Test", url: "https://example.com", category: "TEST", tags: [], source: "user", createdAt: "2025-01-01T00:00:00Z" },
      ]
      localStorage.setItem(STORAGE_KEYS.USER_RESOURCES, JSON.stringify(resources))
      expect(userResourceService.getAll()).toEqual(resources)
    })

    it("returns empty array and clears storage when data is not an array", () => {
      localStorage.setItem(STORAGE_KEYS.USER_RESOURCES, JSON.stringify({ foo: "bar" }))
      expect(userResourceService.getAll()).toEqual([])
      expect(localStorage.getItem(STORAGE_KEYS.USER_RESOURCES)).toBeNull()
    })

    it("returns empty array and clears storage on malformed JSON", () => {
      localStorage.setItem(STORAGE_KEYS.USER_RESOURCES, "not-json{{{")
      expect(userResourceService.getAll()).toEqual([])
      expect(localStorage.getItem(STORAGE_KEYS.USER_RESOURCES)).toBeNull()
    })
  })

  describe("save", () => {
    it("saves resources to localStorage", () => {
      const resources: UserResource[] = [
        { id: "1", title: "Test", url: "https://example.com", category: "TEST", tags: [], source: "user", createdAt: "2025-01-01T00:00:00Z" },
      ]
      userResourceService.save(resources)
      expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_RESOURCES)!)).toEqual(resources)
    })
  })

  describe("create", () => {
    it("creates a new resource with generated id, source, and createdAt", () => {
      const data = { title: "New", url: "https://new.com", category: "CAT", tags: ["a"] }
      const result = userResourceService.create(data)

      expect(result.id).toBeDefined()
      expect(result.source).toBe("user")
      expect(result.createdAt).toBeDefined()
      expect(result.title).toBe("New")

      const stored = userResourceService.getAll()
      expect(stored).toHaveLength(1)
      expect(stored[0].id).toBe(result.id)
    })

    it("appends to existing resources", () => {
      userResourceService.create({ title: "First", url: "https://first.com", category: "A", tags: [] })
      userResourceService.create({ title: "Second", url: "https://second.com", category: "B", tags: [] })
      expect(userResourceService.getAll()).toHaveLength(2)
    })
  })

  describe("update", () => {
    it("updates an existing resource and sets updatedAt", () => {
      const created = userResourceService.create({ title: "Old", url: "https://old.com", category: "A", tags: [] })
      const updated = userResourceService.update(created.id, { title: "New Title" })

      expect(updated).not.toBeNull()
      expect(updated!.title).toBe("New Title")
      expect(updated!.updatedAt).toBeDefined()
      expect(updated!.url).toBe("https://old.com")
    })

    it("returns null when resource not found", () => {
      expect(userResourceService.update("nonexistent", { title: "X" })).toBeNull()
    })
  })

  describe("remove", () => {
    it("removes an existing resource", () => {
      const created = userResourceService.create({ title: "Bye", url: "https://bye.com", category: "A", tags: [] })
      userResourceService.remove(created.id)
      expect(userResourceService.getAll()).toHaveLength(0)
    })

    it("does nothing when id not found", () => {
      userResourceService.create({ title: "Keep", url: "https://keep.com", category: "A", tags: [] })
      userResourceService.remove("nonexistent")
      expect(userResourceService.getAll()).toHaveLength(1)
    })
  })
})
