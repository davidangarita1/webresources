import { create } from "zustand"
import type { Resource, ResourceStatus, UserResource } from "../types"
import { resourceService } from "../services/resourceService"
import { storageService } from "../services/storageService"
import { searchService } from "../services/searchService"
import { userResourceService } from "../services/userResourceService"
import Fuse from "fuse.js"

type ViewFilter = "community" | "user" | "favorites" | "pending" | "consumed" | "category"

interface ResourceStore {
  resources: Resource[]
  userResources: UserResource[]
  favorites: string[]
  statuses: Record<string, ResourceStatus>
  searchQuery: string
  searchResults: Resource[]
  searchIndex: Fuse<Resource> | null
  activeFilter: ViewFilter
  activeCategory: string | null
  categories: string[]

  initialize: () => void
  toggleFavorite: (id: string) => void
  setStatus: (id: string, status: ResourceStatus) => void
  removeStatus: (id: string) => void
  setSearchQuery: (query: string) => void
  setActiveFilter: (filter: ViewFilter) => void
  setActiveCategory: (category: string | null) => void
  getFilteredResources: () => Resource[]
  createUserResource: (data: Omit<UserResource, "id" | "source" | "createdAt">) => void
  updateUserResource: (id: string, data: Partial<Omit<UserResource, "id" | "source" | "createdAt">>) => void
  deleteUserResource: (id: string) => void
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
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

  initialize: () => {
    const resources = resourceService.getAllResources()
    const userResources = userResourceService.getAll()
    const favorites = storageService.getFavorites()
    const statuses = storageService.getStatuses()
    const categories = resourceService.getCategories()
    const searchIndex = searchService.createSearchIndex(resources)

    set({ resources, userResources, favorites, statuses, categories, searchIndex })
  },

  toggleFavorite: (id: string) => {
    const updatedFavorites = storageService.toggleFavorite(id)
    set({ favorites: [...updatedFavorites] })
  },

  setStatus: (id: string, status: ResourceStatus) => {
    const updatedStatuses = storageService.setStatus(id, status)
    set({ statuses: { ...updatedStatuses } })
  },

  removeStatus: (id: string) => {
    const updatedStatuses = storageService.removeStatus(id)
    set({ statuses: { ...updatedStatuses } })
  },

  setSearchQuery: (query: string) => {
    const { searchIndex, resources } = get()
    if (!query.trim()) {
      set({ searchQuery: query, searchResults: [] })
      return
    }
    const results = searchIndex
      ? searchService.search(searchIndex, query)
      : resources
    set({ searchQuery: query, searchResults: results })
  },

  setActiveFilter: (filter: ViewFilter) => {
    set({ activeFilter: filter, activeCategory: null })
  },

  setActiveCategory: (category: string | null) => {
    set({ activeFilter: "category", activeCategory: category })
  },

  createUserResource: (data) => {
    userResourceService.create(data)
    set({ userResources: userResourceService.getAll() })
  },

  updateUserResource: (id, data) => {
    userResourceService.update(id, data)
    set({ userResources: userResourceService.getAll() })
  },

  deleteUserResource: (id) => {
    userResourceService.remove(id)
    set({ userResources: userResourceService.getAll() })
  },

  getFilteredResources: () => {
    const { resources, userResources, favorites, statuses, searchQuery, searchResults, activeFilter, activeCategory } = get()

    if (activeFilter === "user") return userResources

    const baseResources = searchQuery.trim() ? searchResults : resources

    switch (activeFilter) {
      case "favorites":
        return baseResources.filter((r) => favorites.includes(r.id))
      case "pending":
        return baseResources.filter((r) => statuses[r.id] === "pending")
      case "consumed":
        return baseResources.filter((r) => statuses[r.id] === "consumed")
      case "category":
        if (!activeCategory) return baseResources
        return baseResources.filter((r) => r.category === activeCategory)
      default:
        return baseResources
    }
  },
}))
