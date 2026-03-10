import { renderHook, act } from "@testing-library/react"
import { useStatuses } from "./useStatuses"
import { useResourceStore } from "../store"

describe("useStatuses", () => {
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

  it("should return undefined status for unknown resource", () => {
    const { result } = renderHook(() => useStatuses())
    expect(result.current.getStatus("999")).toBeUndefined()
  })

  it("should set status", () => {
    const { result } = renderHook(() => useStatuses())

    act(() => {
      result.current.setStatus("1", "pending")
    })

    expect(result.current.getStatus("1")).toBe("pending")
  })

  it("should remove status", () => {
    useResourceStore.setState({ statuses: { "1": "pending" } })
    localStorage.setItem(
      "bookmark_statuses",
      JSON.stringify({ "1": "pending" })
    )

    const { result } = renderHook(() => useStatuses())

    act(() => {
      result.current.removeStatus("1")
    })

    expect(result.current.getStatus("1")).toBeUndefined()
  })

  it("should cycle status: none -> pending", () => {
    const { result } = renderHook(() => useStatuses())

    act(() => {
      result.current.cycleStatus("1")
    })

    expect(result.current.getStatus("1")).toBe("pending")
  })

  it("should cycle status: pending -> consumed", () => {
    useResourceStore.setState({ statuses: { "1": "pending" } })
    localStorage.setItem(
      "bookmark_statuses",
      JSON.stringify({ "1": "pending" })
    )

    const { result } = renderHook(() => useStatuses())

    act(() => {
      result.current.cycleStatus("1")
    })

    expect(result.current.getStatus("1")).toBe("consumed")
  })

  it("should cycle status: consumed -> reference", () => {
    useResourceStore.setState({ statuses: { "1": "consumed" } })
    localStorage.setItem(
      "bookmark_statuses",
      JSON.stringify({ "1": "consumed" })
    )

    const { result } = renderHook(() => useStatuses())

    act(() => {
      result.current.cycleStatus("1")
    })

    expect(result.current.getStatus("1")).toBe("reference")
  })

  it("should cycle status: reference -> none (removed)", () => {
    useResourceStore.setState({ statuses: { "1": "reference" } })
    localStorage.setItem(
      "bookmark_statuses",
      JSON.stringify({ "1": "reference" })
    )

    const { result } = renderHook(() => useStatuses())

    act(() => {
      result.current.cycleStatus("1")
    })

    expect(result.current.getStatus("1")).toBeUndefined()
  })
})
