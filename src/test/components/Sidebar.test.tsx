import { render, screen } from "../../test/utils"
import { Sidebar } from "../../components/Sidebar"
import userEvent from "@testing-library/user-event"
import { useResourceStore } from "../../store/resourceStore"

describe("Sidebar", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreateResource: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    useResourceStore.getState().initialize()
  })

  it("renders the title", () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByText("Marcadores")).toBeInTheDocument()
  })

  it("renders navigation items", () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByText("Comunidad")).toBeInTheDocument()
    expect(screen.getByText("Tus Recursos")).toBeInTheDocument()
    expect(screen.getByText("Favoritos")).toBeInTheDocument()
    expect(screen.getByText("Pendientes")).toBeInTheDocument()
    expect(screen.getByText("Consumidos")).toBeInTheDocument()
    expect(screen.getByText("Videos")).toBeInTheDocument()
  })

  it("renders categories", () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByText("Categorías")).toBeInTheDocument()
    const categories = useResourceStore.getState().categories
    expect(categories.length).toBeGreaterThan(0)
    expect(screen.getByText(categories[0])).toBeInTheDocument()
  })

  it("activates videos filter when Videos nav item clicked", async () => {
    const user = userEvent.setup()
    render(<Sidebar {...defaultProps} />)
    await user.click(screen.getByText("Videos"))
    expect(defaultProps.onClose).toHaveBeenCalled()
    expect(useResourceStore.getState().activeFilter).toBe("videos")
  })

  it("calls onClose and sets filter when nav item clicked", async () => {
    const user = userEvent.setup()
    render(<Sidebar {...defaultProps} />)
    await user.click(screen.getByText("Favoritos"))
    expect(defaultProps.onClose).toHaveBeenCalled()
    expect(useResourceStore.getState().activeFilter).toBe("favorites")
  })

  it("calls onClose when a category clicked", async () => {
    const user = userEvent.setup()
    render(<Sidebar {...defaultProps} />)
    const cat = useResourceStore.getState().categories[0]
    await user.click(screen.getByText(cat))
    expect(defaultProps.onClose).toHaveBeenCalled()
    expect(useResourceStore.getState().activeFilter).toBe("category")
    expect(useResourceStore.getState().activeCategory).toBe(cat)
  })

  it("calls onCreateResource and onClose when create button is clicked", async () => {
    const user = userEvent.setup()
    render(<Sidebar {...defaultProps} />)
    await user.click(screen.getByText("Crear recurso"))
    expect(defaultProps.onCreateResource).toHaveBeenCalled()
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it("renders close button", () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByLabelText("Cerrar menú")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup()
    render(<Sidebar {...defaultProps} />)
    await user.click(screen.getByLabelText("Cerrar menú"))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it("renders backdrop when open and calls onClose on click", async () => {
    const user = userEvent.setup()
    render(<Sidebar {...defaultProps} />)
    const backdrop = document.querySelector("[aria-hidden='true']")
    expect(backdrop).toBeInTheDocument()
    await user.click(backdrop!)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it("does not render backdrop when closed", () => {
    render(<Sidebar {...defaultProps} isOpen={false} />)
    const backdrop = document.querySelector(".fixed.inset-0.z-20")
    expect(backdrop).not.toBeInTheDocument()
  })
})
