import { render, screen } from "../../test/utils"
import { ResourceFormModal } from "../../components/ResourceFormModal"
import userEvent from "@testing-library/user-event"
import type { UserResource } from "../../types"

describe("ResourceFormModal", () => {
  const defaultProps = {
    categories: ["CSS", "REACT"],
    onSubmit: vi.fn(),
    onClose: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the new resource title when no initialData", () => {
    render(<ResourceFormModal {...defaultProps} />)
    expect(screen.getByText("Nuevo recurso")).toBeInTheDocument()
  })

  it("renders the edit title when initialData is provided", () => {
    const initial: UserResource = {
      id: "1", title: "Old", url: "https://old.com", category: "CSS",
      tags: ["a"], source: "user", createdAt: "2025-01-01T00:00:00Z",
    }
    render(<ResourceFormModal {...defaultProps} initialData={initial} />)
    expect(screen.getByText("Editar recurso")).toBeInTheDocument()
  })

  it("pre-fills form fields from initialData", () => {
    const initial: UserResource = {
      id: "1", title: "My Title", url: "https://test.com", description: "Desc",
      category: "REACT", tags: ["x", "y"], source: "user", createdAt: "2025-01-01T00:00:00Z",
    }
    render(<ResourceFormModal {...defaultProps} initialData={initial} />)
    expect(screen.getByDisplayValue("My Title")).toBeInTheDocument()
    expect(screen.getByDisplayValue("https://test.com")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Desc")).toBeInTheDocument()
    expect(screen.getByDisplayValue("REACT")).toBeInTheDocument()
    expect(screen.getByDisplayValue("x, y")).toBeInTheDocument()
  })

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    await user.click(screen.getByText("Crear recurso"))
    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument()
    expect(screen.getByText("La URL es obligatoria")).toBeInTheDocument()
    expect(screen.getByText("La categoría es obligatoria")).toBeInTheDocument()
    expect(defaultProps.onSubmit).not.toHaveBeenCalled()
  })

  it("shows invalid URL error", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    await user.type(screen.getByLabelText(/^Título/), "Test")
    await user.type(screen.getByLabelText(/^URL/), "not-a-url")
    await user.type(screen.getByLabelText(/^Categoría/), "CSS")
    await user.click(screen.getByText("Crear recurso"))
    expect(screen.getByText(/Ingresa una URL válida/)).toBeInTheDocument()
  })

  it("submits valid form data and calls onClose", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    await user.type(screen.getByLabelText(/^Título/), "New Resource")
    await user.type(screen.getByLabelText(/^URL/), "https://example.com")
    await user.type(screen.getByLabelText(/^Categoría/), "CSS")
    await user.type(screen.getByLabelText(/^Etiquetas/), "tag1, tag2")
    await user.click(screen.getByText("Crear recurso"))

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1)
    const arg = defaultProps.onSubmit.mock.calls[0][0]
    expect(arg.title).toBe("New Resource")
    expect(arg.url).toBe("https://example.com")
    expect(arg.category).toBe("CSS")
    expect(arg.tags).toEqual(["tag1", "tag2"])
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it("calls onClose when cancel is clicked", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    await user.click(screen.getByText("Cancelar"))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    const backdrop = screen.getByRole("dialog")
    await user.click(backdrop)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("clears field error when user types", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    await user.click(screen.getByText("Crear recurso"))
    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument()
    await user.type(screen.getByLabelText(/^Título/), "x")
    expect(screen.queryByText("El título es obligatorio")).not.toBeInTheDocument()
  })

  it("uppercases category on submit", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    await user.type(screen.getByLabelText(/^Título/), "Test")
    await user.type(screen.getByLabelText(/^URL/), "https://example.com")
    await user.type(screen.getByLabelText(/^Categoría/), "css")
    await user.click(screen.getByText("Crear recurso"))
    expect(defaultProps.onSubmit.mock.calls[0][0].category).toBe("CSS")
  })

  it("includes updatedAt when editing an existing resource", async () => {
    const initial: UserResource = {
      id: "1", title: "Old", url: "https://old.com", category: "CSS",
      tags: [], source: "user", createdAt: "2025-01-01T00:00:00Z",
    }
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} initialData={initial} />)
    await user.click(screen.getByText("Guardar cambios"))
    const arg = defaultProps.onSubmit.mock.calls[0][0]
    expect(arg.updatedAt).toBeDefined()
  })

  it("handles description field change", async () => {
    const user = userEvent.setup()
    render(<ResourceFormModal {...defaultProps} />)
    const desc = screen.getByPlaceholderText("Breve descripción del recurso")
    await user.type(desc, "My description")
    expect(desc).toHaveValue("My description")
  })
})
