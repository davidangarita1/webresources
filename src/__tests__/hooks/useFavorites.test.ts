import { renderHook, act } from "@testing-library/react"
import { useFavorites } from "../../hooks/useFavorites"
import { useResourceStore } from "../../store"

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear()
    useResourceStore.setState({
      favorites: [],
      statuses: {},
      resources: [],
      searchQuery: "",
      searchResults: [],
      searchIndex: null,
      activeFilter: "all",
      activeCategory: null,
      categories: [],
    })
  })

  it("should return empty favorites initially", () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
  })

  it("should report resource as not favorite initially", () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.isFavorite("1")).toBe(false)
  })

  it("should toggle favorite on", () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite("1")
    })

    expect(result.current.isFavorite("1")).toBe(true)
  })

  it("should toggle favorite off", () => {
    useResourceStore.setState({ favorites: ["1"] })
    localStorage.setItem("bookmark_favorites", JSON.stringify(["1"]))

    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite("1")
    })

    expect(result.current.isFavorite("1")).toBe(false)
  })

  it("should handle multiple favorites", () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite("1")
    })
    act(() => {
      result.current.toggleFavorite("2")
    })
    act(() => {
      result.current.toggleFavorite("3")
    })

    expect(result.current.isFavorite("1")).toBe(true)
    expect(result.current.isFavorite("2")).toBe(true)
    expect(result.current.isFavorite("3")).toBe(true)

    act(() => {
      result.current.toggleFavorite("2")
    })

    expect(result.current.isFavorite("1")).toBe(true)
    expect(result.current.isFavorite("2")).toBe(false)
    expect(result.current.isFavorite("3")).toBe(true)
  })
})
