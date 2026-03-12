import { renderHook } from "@testing-library/react"
import { useResources } from "../../hooks/useResources"
import { useResourceStore } from "../../store"
import type { Resource, UserResource } from "../../types"

const communityResource: Resource = {
  id: "community-1",
  title: "Community Resource",
  url: "https://example.com/community",
  description: "A community resource",
  category: "Programming",
  tags: ["js"],
  createdAt: "2024-01-01",
}

const userResource: UserResource = {
  id: "user-1",
  title: "User Resource",
  url: "https://example.com/user",
  description: "A user-created resource",
  category: "Design",
  tags: ["css"],
  createdAt: "2024-06-01",
  source: "user",
}

describe("useResources", () => {
  beforeEach(() => {
    localStorage.clear()
    useResourceStore.setState({
      resources: [communityResource],
      userResources: [userResource],
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

  it("returns only community resources on 'community' filter", () => {
    const { result } = renderHook(() => useResources())
    // default filter is community — baseResources (no user resources)
    expect(result.current.filteredResources.map((r) => r.id)).toContain("community-1")
    expect(result.current.filteredResources.map((r) => r.id)).not.toContain("user-1")
  })

  it("returns only user resources on 'user' filter", () => {
    useResourceStore.setState({ activeFilter: "user" })
    const { result } = renderHook(() => useResources())
    expect(result.current.filteredResources.map((r) => r.id)).toContain("user-1")
    expect(result.current.filteredResources.map((r) => r.id)).not.toContain("community-1")
  })

  it("includes user resources in 'favorites' filter", () => {
    useResourceStore.setState({ activeFilter: "favorites", favorites: ["user-1"] })
    const { result } = renderHook(() => useResources())
    expect(result.current.filteredResources.map((r) => r.id)).toContain("user-1")
  })

  it("includes community resources in 'favorites' filter", () => {
    useResourceStore.setState({ activeFilter: "favorites", favorites: ["community-1"] })
    const { result } = renderHook(() => useResources())
    expect(result.current.filteredResources.map((r) => r.id)).toContain("community-1")
  })

  it("includes user resources in 'pending' filter", () => {
    useResourceStore.setState({ activeFilter: "pending", statuses: { "user-1": "pending" } })
    const { result } = renderHook(() => useResources())
    expect(result.current.filteredResources.map((r) => r.id)).toContain("user-1")
  })

  it("includes user resources in 'consumed' filter", () => {
    useResourceStore.setState({ activeFilter: "consumed", statuses: { "user-1": "consumed" } })
    const { result } = renderHook(() => useResources())
    expect(result.current.filteredResources.map((r) => r.id)).toContain("user-1")
  })

  it("includes user resources in 'category' filter matching user resource category", () => {
    useResourceStore.setState({ activeFilter: "category", activeCategory: "Design" })
    const { result } = renderHook(() => useResources())
    expect(result.current.filteredResources.map((r) => r.id)).toContain("user-1")
    expect(result.current.filteredResources.map((r) => r.id)).not.toContain("community-1")
  })

  it("includes community resources in 'category' filter matching community resource category", () => {
    useResourceStore.setState({ activeFilter: "category", activeCategory: "Programming" })
    const { result } = renderHook(() => useResources())
    expect(result.current.filteredResources.map((r) => r.id)).toContain("community-1")
    expect(result.current.filteredResources.map((r) => r.id)).not.toContain("user-1")
  })

  it("returns both resource types in 'category' filter when no category is set", () => {
    useResourceStore.setState({ activeFilter: "category", activeCategory: null })
    const { result } = renderHook(() => useResources())
    const ids = result.current.filteredResources.map((r) => r.id)
    expect(ids).toContain("community-1")
    expect(ids).toContain("user-1")
  })
})
