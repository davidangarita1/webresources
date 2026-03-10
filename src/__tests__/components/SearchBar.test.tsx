import { render, screen } from "../../test/utils"
import { SearchBar } from "../../components/SearchBar"
import userEvent from "@testing-library/user-event"
import { useResourceStore } from "../../store"

describe("SearchBar", () => {
  beforeEach(() => {
    useResourceStore.setState({
      searchQuery: "",
      searchResults: [],
      resources: [],
      favorites: [],
      statuses: {},
      searchIndex: null,
      activeFilter: "all",
      activeCategory: null,
      categories: [],
    })
  })

  it("should render search input", () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText("Buscar recursos...")).toBeInTheDocument()
  })

  it("should have correct aria label", () => {
    render(<SearchBar />)
    expect(screen.getByLabelText("Buscar recursos")).toBeInTheDocument()
  })

  it("should update search query on input", async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText("Buscar recursos...")
    await user.type(input, "React")

    expect(input).toHaveValue("React")
  })

  it("should show clear button when query is not empty", async () => {
    useResourceStore.setState({ searchQuery: "test" })
    render(<SearchBar />)

    expect(screen.getByLabelText("Limpiar búsqueda")).toBeInTheDocument()
  })

  it("should not show clear button when query is empty", () => {
    render(<SearchBar />)
    expect(screen.queryByLabelText("Limpiar búsqueda")).not.toBeInTheDocument()
  })

  it("should clear query when clear button is clicked", async () => {
    const user = userEvent.setup()
    useResourceStore.setState({ searchQuery: "test" })
    render(<SearchBar />)

    await user.click(screen.getByLabelText("Limpiar búsqueda"))

    expect(useResourceStore.getState().searchQuery).toBe("")
  })
})
