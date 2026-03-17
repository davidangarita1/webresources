import { render, screen } from "../../test/utils"
import { ConflictResolutionDialog } from "../../components/ConflictResolutionDialog"
import userEvent from "@testing-library/user-event"
import type { ConflictInfo } from "../../services/backupService"

const CONFLICTS: ConflictInfo[] = [
  {
    importedResource: { id: "1", title: "Imported Title", url: "https://a.com", category: "A", tags: [], source: "user", createdAt: "2025-01-01T00:00:00Z" },
    existingResource: { id: "e1", title: "Existing Title", url: "https://a.com", category: "A", tags: [], source: "user", createdAt: "2025-01-01T00:00:00Z" },
  },
  {
    importedResource: { id: "2", title: "Same Title", url: "https://b.com", category: "B", tags: [], source: "user", createdAt: "2025-01-01T00:00:00Z" },
    existingResource: { id: "e2", title: "Same Title", url: "https://b.com", category: "B", tags: [], source: "user", createdAt: "2025-01-01T00:00:00Z" },
  },
]

describe("ConflictResolutionDialog", () => {
  const defaultProps = {
    conflicts: CONFLICTS,
    onResolve: vi.fn(),
    onCancel: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders conflict count message", () => {
    render(<ConflictResolutionDialog {...defaultProps} />)
    expect(screen.getByText(/2 recursos ya existen/)).toBeInTheDocument()
  })

  it("renders existing resource titles", () => {
    render(<ConflictResolutionDialog {...defaultProps} />)
    expect(screen.getByText("Existing Title")).toBeInTheDocument()
    expect(screen.getByText("Same Title")).toBeInTheDocument()
  })

  it("shows imported title when different from existing", () => {
    render(<ConflictResolutionDialog {...defaultProps} />)
    expect(screen.getByText("Imported Title")).toBeInTheDocument()
  })

  it("does not show imported title when same as existing", () => {
    render(<ConflictResolutionDialog {...defaultProps} />)
    const importLabels = screen.queryAllByText(/Título importado:/)
    expect(importLabels).toHaveLength(1)
  })

  it("defaults all actions to skip", () => {
    render(<ConflictResolutionDialog {...defaultProps} />)
    expect(screen.getByText(/0 se actualizará/)).toBeInTheDocument()
  })

  it("updates all to update when 'Actualizar todo' is clicked", async () => {
    const user = userEvent.setup()
    render(<ConflictResolutionDialog {...defaultProps} />)
    await user.click(screen.getByText("Actualizar todo"))
    expect(screen.getByText(/2 se actualizará/)).toBeInTheDocument()
  })

  it("skips all when 'Omitir todo' is clicked", async () => {
    const user = userEvent.setup()
    render(<ConflictResolutionDialog {...defaultProps} />)
    await user.click(screen.getByText("Actualizar todo"))
    await user.click(screen.getByText("Omitir todo"))
    expect(screen.getByText(/0 se actualizará/)).toBeInTheDocument()
  })

  it("toggles individual action to update", async () => {
    const user = userEvent.setup()
    render(<ConflictResolutionDialog {...defaultProps} />)
    const updateBtns = screen.getAllByText("Actualizar").filter((el) => el.closest("div.border"))
    await user.click(updateBtns[0])
    expect(screen.getByText(/1 se actualizará/)).toBeInTheDocument()
  })

  it("toggles individual action to skip", async () => {
    const user = userEvent.setup()
    render(<ConflictResolutionDialog {...defaultProps} />)
    await user.click(screen.getByText("Actualizar todo"))
    const skipBtns = screen.getAllByText("Omitir").filter((el) => el.closest("div.border"))
    await user.click(skipBtns[0])
    expect(screen.getByText(/1 se actualizará/)).toBeInTheDocument()
  })

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup()
    render(<ConflictResolutionDialog {...defaultProps} />)
    await user.click(screen.getByText("Cancelar importación"))
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
  })

  it("calls onResolve with actions map when confirm is clicked", async () => {
    const user = userEvent.setup()
    render(<ConflictResolutionDialog {...defaultProps} />)
    await user.click(screen.getByText("Confirmar e importar"))
    expect(defaultProps.onResolve).toHaveBeenCalledTimes(1)
    const actions: Map<string, string> = defaultProps.onResolve.mock.calls[0][0]
    expect(actions.get("1")).toBe("skip")
    expect(actions.get("2")).toBe("skip")
  })
})
