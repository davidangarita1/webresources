import { renderHook, act } from "@testing-library/react"
import { useUserResources } from "../../hooks/useUserResources"
import { useResourceStore } from "../../store/resourceStore"

describe("useUserResources", () => {
  beforeEach(() => {
    localStorage.clear()
    useResourceStore.getState().initialize()
  })

  it("returns store user resource functions", () => {
    const { result } = renderHook(() => useUserResources())
    expect(result.current.createUserResource).toBeDefined()
    expect(result.current.updateUserResource).toBeDefined()
    expect(result.current.deleteUserResource).toBeDefined()
    expect(result.current.userResources).toBeDefined()
  })

  it("creates and returns a user resource", () => {
    const { result } = renderHook(() => useUserResources())
    act(() => {
      result.current.createUserResource({ title: "Test", url: "https://t.com", category: "A", tags: [] })
    })
    expect(result.current.userResources.length).toBeGreaterThanOrEqual(1)
  })
})
