import { render, screen } from "../../test/utils"
import { Dashboard } from "../../pages/Dashboard/Dashboard"
import { useResourceStore } from "../../store/resourceStore"
import userEvent from "@testing-library/user-event"

describe("Dashboard", () => {
  const defaultProps = {
    isCreateOpen: false,
    onOpenCreate: vi.fn(),
    onCreateClose: vi.fn(),
    onExportBackup: vi.fn(),
    onImportBackup: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    useResourceStore.getState().initialize()
    useResourceStore.getState().setActiveFilter("community")
  })

  it("renders the community title by default", () => {
    render(<Dashboard {...defaultProps} />)
    expect(screen.getByText("Recursos de la Comunidad")).toBeInTheDocument()
  })

  it("renders resource count", () => {
    render(<Dashboard {...defaultProps} />)
    expect(screen.getByText(/recursos?$/)).toBeInTheDocument()
  })

  it("renders resource cards", () => {
    render(<Dashboard {...defaultProps} />)
    expect(screen.getAllByText("Abrir").length).toBeGreaterThan(0)
  })

  it("renders empty state for user filter with no resources", () => {
    useResourceStore.getState().setActiveFilter("user")
    render(<Dashboard {...defaultProps} />)
    expect(screen.getByText("Aún no tienes recursos")).toBeInTheDocument()
  })

  it("renders empty state for favorites with no favorites", () => {
    useResourceStore.getState().setActiveFilter("favorites")
    render(<Dashboard {...defaultProps} />)
    expect(screen.getByText("No se encontraron recursos")).toBeInTheDocument()
  })

  it("shows action buttons in user filter", () => {
    useResourceStore.getState().setActiveFilter("user")
    render(<Dashboard {...defaultProps} />)
    expect(screen.getAllByText("Crear recurso").length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText("Cargar respaldo")).toBeInTheDocument()
  })

  it("shows export button when user has resources", () => {
    useResourceStore.getState().createUserResource({ title: "Mine", url: "https://mine.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    render(<Dashboard {...defaultProps} />)
    const btns = screen.getAllByText("Descargar respaldo")
    expect(btns.length).toBeGreaterThanOrEqual(1)
  })

  it("calls onExportBackup when download button clicked", async () => {
    useResourceStore.getState().createUserResource({ title: "Mine", url: "https://mine.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    const btns = screen.getAllByText("Descargar respaldo")
    await user.click(btns[0])
    expect(defaultProps.onExportBackup).toHaveBeenCalledTimes(1)
  })

  it("calls onImportBackup when upload button clicked", async () => {
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    await user.click(screen.getByText("Cargar respaldo"))
    expect(defaultProps.onImportBackup).toHaveBeenCalledTimes(1)
  })

  it("calls onOpenCreate when empty state create button clicked", async () => {
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    const createBtns = screen.getAllByText("Crear recurso")
    await user.click(createBtns[createBtns.length - 1])
    expect(defaultProps.onOpenCreate).toHaveBeenCalled()
  })

  it("shows localStorage notice in user filter", () => {
    useResourceStore.getState().setActiveFilter("user")
    render(<Dashboard {...defaultProps} />)
    expect(screen.getByText(/guardan localmente/)).toBeInTheDocument()
  })

  it("renders category title when filtering by category", () => {
    const cat = useResourceStore.getState().categories[0]
    useResourceStore.getState().setActiveCategory(cat)
    render(<Dashboard {...defaultProps} />)
    expect(screen.getByText(`Categoría: ${cat}`)).toBeInTheDocument()
  })

  it("shows ResourceFormModal when isCreateOpen is true", () => {
    render(<Dashboard {...defaultProps} isCreateOpen={true} />)
    expect(screen.getByText("Nuevo recurso")).toBeInTheDocument()
  })

  it("opens edit modal when edit button is clicked on user resource", async () => {
    useResourceStore.getState().createUserResource({ title: "Editable", url: "https://editable.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    await user.click(screen.getByLabelText("Editar recurso"))
    expect(screen.getByText("Editar recurso")).toBeInTheDocument()
  })

  it("opens delete modal when delete button is clicked on user resource", async () => {
    useResourceStore.getState().createUserResource({ title: "Deletable", url: "https://deletable.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    await user.click(screen.getByLabelText("Eliminar recurso"))
    expect(screen.getByText(/¿Eliminar/)).toBeInTheDocument()
  })

  it("deletes a user resource via the delete confirm modal", async () => {
    useResourceStore.getState().createUserResource({ title: "Bye", url: "https://bye.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    await user.click(screen.getByLabelText("Eliminar recurso"))
    const deleteButtons = screen.getAllByText("Eliminar")
    await user.click(deleteButtons[deleteButtons.length - 1])
    expect(useResourceStore.getState().userResources).toHaveLength(0)
  })

  it("submits edit form and updates the user resource", async () => {
    useResourceStore.getState().createUserResource({ title: "Original", url: "https://original.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    await user.click(screen.getByLabelText("Editar recurso"))
    const titleInput = screen.getByDisplayValue("Original")
    await user.clear(titleInput)
    await user.type(titleInput, "Updated")
    await user.click(screen.getByText("Guardar cambios"))
    expect(useResourceStore.getState().userResources[0].title).toBe("Updated")
  })

  it("creates a resource via the create form modal", async () => {
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} isCreateOpen={true} />)
    await user.type(screen.getByLabelText(/Título/), "New Res")
    await user.type(screen.getByLabelText(/^URL/), "https://new.com")
    await user.type(screen.getByLabelText(/Categoría/), "CAT")
    const submitBtns = screen.getAllByText("Crear recurso")
    await user.click(submitBtns[submitBtns.length - 1])
    expect(defaultProps.onCreateClose).toHaveBeenCalled()
    expect(useResourceStore.getState().userResources.some((r) => r.title === "New Res")).toBe(true)
  })

  it("closes edit modal via cancel button", async () => {
    useResourceStore.getState().createUserResource({ title: "Closable", url: "https://closable.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<Dashboard {...defaultProps} />)
    await user.click(screen.getByLabelText("Editar recurso"))
    expect(screen.getByText("Editar recurso")).toBeInTheDocument()
    await user.click(screen.getByText("Cancelar"))
    expect(screen.queryByText("Editar recurso")).not.toBeInTheDocument()
  })

  describe("YouTube section split", () => {
    it("renders YouTube section when community resources contain YouTube URLs", () => {
      useResourceStore.getState().setActiveFilter("community")
      const allResources = useResourceStore.getState().resources
      const hasYouTube = allResources.some((r) => r.url.includes("youtube.com") || r.url.includes("youtu.be"))
      if (!hasYouTube) {
        useResourceStore.getState().createUserResource({ title: "YT Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "VIDEO", tags: [] })
        useResourceStore.getState().setActiveFilter("user")
      }
      render(<Dashboard {...defaultProps} />)
      const ytSection = screen.queryByText("Videos de YouTube")
      if (hasYouTube || useResourceStore.getState().userResources.length > 0) {
        expect(ytSection).toBeInTheDocument()
      }
    })

    it("shows YouTube section with YouTube user resource in user filter", () => {
      useResourceStore.getState().createUserResource({ title: "My YT Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "VIDEO", tags: [] })
      useResourceStore.getState().setActiveFilter("user")
      render(<Dashboard {...defaultProps} />)
      expect(screen.getByText("Videos de YouTube")).toBeInTheDocument()
      expect(screen.getByRole("heading", { name: "My YT Video" })).toBeInTheDocument()
    })

    it("shows Otros Recursos heading when both YouTube and regular resources are present", () => {
      useResourceStore.getState().createUserResource({ title: "My YT Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "VIDEO", tags: [] })
      useResourceStore.getState().createUserResource({ title: "Regular Resource", url: "https://example.com", category: "OTHER", tags: [] })
      useResourceStore.getState().setActiveFilter("user")
      render(<Dashboard {...defaultProps} />)
      expect(screen.getByText("Videos de YouTube")).toBeInTheDocument()
      expect(screen.getByText("Otros Recursos")).toBeInTheDocument()
      expect(screen.getByRole("heading", { name: "Regular Resource" })).toBeInTheDocument()
    })

    it("does not show Otros Recursos heading when only YouTube resources", () => {
      useResourceStore.getState().createUserResource({ title: "YT Only", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "VIDEO", tags: [] })
      useResourceStore.getState().setActiveFilter("user")
      render(<Dashboard {...defaultProps} />)
      expect(screen.getByText("Videos de YouTube")).toBeInTheDocument()
      expect(screen.queryByText("Otros Recursos")).not.toBeInTheDocument()
    })

    it("does not show YouTube section header when no YouTube resources", () => {
      useResourceStore.getState().createUserResource({ title: "Regular Only", url: "https://example.com", category: "OTHER", tags: [] })
      useResourceStore.getState().setActiveFilter("user")
      render(<Dashboard {...defaultProps} />)
      expect(screen.queryByText("Videos de YouTube")).not.toBeInTheDocument()
    })

    it("renders Videos filter title when videos filter is active", () => {
      useResourceStore.getState().setActiveFilter("videos")
      render(<Dashboard {...defaultProps} />)
      expect(screen.getByText("Videos de YouTube")).toBeInTheDocument()
    })
  })
})
