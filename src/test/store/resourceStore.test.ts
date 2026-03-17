import { useResourceStore } from "../../store/resourceStore"
import { userResourceService } from "../../services/userResourceService"

describe("resourceStore", () => {
  beforeEach(() => {
    localStorage.clear()
    useResourceStore.setState({
      resources: [],
      userResources: [],
      favorites: [],
      statuses: {},
      searchQuery: "",
      searchResults: [],
      searchIndex: null,
      activeFilter: "community",
      activeCategory: null,
      categories: [],
    })
  })

  describe("initialize", () => {
    it("loads resources, favorites, statuses, and categories", () => {
      useResourceStore.getState().initialize()
      const state = useResourceStore.getState()
      expect(state.resources.length).toBeGreaterThan(0)
      expect(state.categories.length).toBeGreaterThan(0)
      expect(state.searchIndex).not.toBeNull()
    })
  })

  describe("toggleFavorite", () => {
    it("adds and removes a favorite", () => {
      useResourceStore.getState().initialize()
      useResourceStore.getState().toggleFavorite("test-id")
      expect(useResourceStore.getState().favorites).toContain("test-id")

      useResourceStore.getState().toggleFavorite("test-id")
      expect(useResourceStore.getState().favorites).not.toContain("test-id")
    })
  })

  describe("setStatus / removeStatus", () => {
    it("sets a status", () => {
      useResourceStore.getState().setStatus("r1", "pending")
      expect(useResourceStore.getState().statuses["r1"]).toBe("pending")
    })

    it("removes a status", () => {
      useResourceStore.getState().setStatus("r1", "consumed")
      useResourceStore.getState().removeStatus("r1")
      expect(useResourceStore.getState().statuses["r1"]).toBeUndefined()
    })
  })

  describe("setSearchQuery", () => {
    it("clears searchResults when query is empty", () => {
      useResourceStore.getState().initialize()
      useResourceStore.getState().setSearchQuery("")
      expect(useResourceStore.getState().searchResults).toEqual([])
    })

    it("returns search results for a query", () => {
      useResourceStore.getState().initialize()
      useResourceStore.getState().setSearchQuery("react")
      const results = useResourceStore.getState().searchResults
      expect(results.length).toBeGreaterThan(0)
    })

    it("falls back to all resources when no searchIndex", () => {
      useResourceStore.getState().initialize()
      useResourceStore.setState({ searchIndex: null })
      useResourceStore.getState().setSearchQuery("something")
      const state = useResourceStore.getState()
      expect(state.searchResults).toEqual(state.resources)
    })
  })

  describe("setActiveFilter", () => {
    it("sets the filter and clears the category", () => {
      useResourceStore.getState().setActiveCategory("CSS")
      useResourceStore.getState().setActiveFilter("favorites")
      const state = useResourceStore.getState()
      expect(state.activeFilter).toBe("favorites")
      expect(state.activeCategory).toBeNull()
    })
  })

  describe("setActiveCategory", () => {
    it("sets both activeFilter to category and activeCategory", () => {
      useResourceStore.getState().setActiveCategory("CSS")
      const state = useResourceStore.getState()
      expect(state.activeFilter).toBe("category")
      expect(state.activeCategory).toBe("CSS")
    })
  })

  describe("getFilteredResources", () => {
    beforeEach(() => {
      useResourceStore.getState().initialize()
    })

    it("returns community resources by default", () => {
      const resources = useResourceStore.getState().getFilteredResources()
      expect(resources.length).toBeGreaterThan(0)
    })

    it("returns only user resources for 'user' filter", () => {
      const ur = userResourceService.create({ title: "Mine", url: "https://mine.com", category: "TEST", tags: [] })
      useResourceStore.getState().initialize()
      useResourceStore.getState().setActiveFilter("user")
      const resources = useResourceStore.getState().getFilteredResources()
      expect(resources).toEqual(expect.arrayContaining([expect.objectContaining({ id: ur.id })]))
    })

    it("filters favorites", () => {
      useResourceStore.getState().setActiveFilter("favorites")
      const resources = useResourceStore.getState().getFilteredResources()
      expect(resources).toEqual([])

      const firstId = useResourceStore.getState().resources[0].id
      useResourceStore.getState().toggleFavorite(firstId)
      useResourceStore.getState().setActiveFilter("favorites")
      const filtered = useResourceStore.getState().getFilteredResources()
      expect(filtered).toHaveLength(1)
      expect(filtered[0].id).toBe(firstId)
    })

    it("filters pending statuses", () => {
      const firstId = useResourceStore.getState().resources[0].id
      useResourceStore.getState().setStatus(firstId, "pending")
      useResourceStore.getState().setActiveFilter("pending")
      const filtered = useResourceStore.getState().getFilteredResources()
      expect(filtered).toHaveLength(1)
    })

    it("filters consumed statuses", () => {
      const firstId = useResourceStore.getState().resources[0].id
      useResourceStore.getState().setStatus(firstId, "consumed")
      useResourceStore.getState().setActiveFilter("consumed")
      const filtered = useResourceStore.getState().getFilteredResources()
      expect(filtered).toHaveLength(1)
    })

    it("filters by category", () => {
      const cat = useResourceStore.getState().categories[0]
      useResourceStore.getState().setActiveCategory(cat)
      const filtered = useResourceStore.getState().getFilteredResources()
      expect(filtered.every((r) => r.category === cat)).toBe(true)
    })

    it("returns all resources when category filter active but no category selected", () => {
      useResourceStore.setState({ activeFilter: "category", activeCategory: null })
      const filtered = useResourceStore.getState().getFilteredResources()
      expect(filtered.length).toBeGreaterThan(0)
    })

    it("combines search with filter", () => {
      useResourceStore.getState().setSearchQuery("react")
      useResourceStore.getState().setActiveFilter("community")
      const filtered = useResourceStore.getState().getFilteredResources()
      expect(filtered.length).toBeGreaterThan(0)
    })
  })

  describe("CRUD user resources", () => {
    it("creates a user resource", () => {
      useResourceStore.getState().createUserResource({ title: "New", url: "https://new.com", category: "A", tags: [] })
      expect(useResourceStore.getState().userResources).toHaveLength(1)
    })

    it("updates a user resource", () => {
      useResourceStore.getState().createUserResource({ title: "Old", url: "https://old.com", category: "A", tags: [] })
      const id = useResourceStore.getState().userResources[0].id
      useResourceStore.getState().updateUserResource(id, { title: "Updated" })
      expect(useResourceStore.getState().userResources[0].title).toBe("Updated")
    })

    it("deletes a user resource", () => {
      useResourceStore.getState().createUserResource({ title: "ToDelete", url: "https://del.com", category: "A", tags: [] })
      const id = useResourceStore.getState().userResources[0].id
      useResourceStore.getState().deleteUserResource(id)
      expect(useResourceStore.getState().userResources).toHaveLength(0)
    })
  })
})
