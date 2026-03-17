import { render, screen } from "../../test/utils"
import { ImportResourcesModal } from "../../components/ImportResourcesModal"
import userEvent from "@testing-library/user-event"
import { backupService } from "../../services/backupService"

describe("ImportResourcesModal", () => {
  const defaultProps = {
    onClose: vi.fn(),
    onImportComplete: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it("renders the title", () => {
    render(<ImportResourcesModal {...defaultProps} />)
    expect(screen.getByText("Cargar respaldo")).toBeInTheDocument()
  })

  it("renders the file upload label", () => {
    render(<ImportResourcesModal {...defaultProps} />)
    expect(screen.getByText(/seleccionar el archivo/)).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    await user.click(screen.getByLabelText("Cerrar"))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    const backdrop = document.querySelector(".fixed.inset-0")!
    await user.click(backdrop)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("shows error for invalid JSON file", async () => {
    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    const file = new File(["not-json"], "bad.json", { type: "application/json" })
    const input = document.querySelector("input[type='file']")!
    await user.upload(input as HTMLInputElement, file)
    expect(await screen.findByText(/Invalid JSON file/)).toBeInTheDocument()
  })

  it("shows validation errors for invalid backup structure", async () => {
    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    const file = new File([JSON.stringify({ foo: "bar" })], "bad.json", { type: "application/json" })
    const input = document.querySelector("input[type='file']")!
    await user.upload(input as HTMLInputElement, file)
    expect(await screen.findByText(/Archivo de respaldo inválido/)).toBeInTheDocument()
  })

  it("imports directly when no conflicts", async () => {
    vi.spyOn(backupService, "validateBackupFile").mockReturnValue({ valid: true, errors: [] })
    vi.spyOn(backupService, "detectURLConflicts").mockReturnValue(new Map())
    vi.spyOn(backupService, "importBackup").mockReturnValue({ addedCount: 1, updatedCount: 0, skippedCount: 0 })

    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    const backup = { version: "1.0", exportedAt: "2025-01-01", resources: [], favorites: [], statuses: {} }
    const file = new File([JSON.stringify(backup)], "ok.json", { type: "application/json" })
    const input = document.querySelector("input[type='file']")!
    await user.upload(input as HTMLInputElement, file)

    expect(defaultProps.onImportComplete).toHaveBeenCalledWith({ addedCount: 1, updatedCount: 0, skippedCount: 0 })
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it("shows conflict dialog when conflicts detected", async () => {
    const conflict = new Map([["url1", {
      importedResource: { id: "1", title: "A", url: "https://a.com", category: "X", tags: [], source: "user" as const, createdAt: "2025-01-01T00:00:00Z" },
      existingResource: { id: "e1", title: "A", url: "https://a.com", category: "X", tags: [], source: "user" as const, createdAt: "2025-01-01T00:00:00Z" },
    }]])

    vi.spyOn(backupService, "validateBackupFile").mockReturnValue({ valid: true, errors: [] })
    vi.spyOn(backupService, "detectURLConflicts").mockReturnValue(conflict)

    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    const backup = { version: "1.0", exportedAt: "2025-01-01", resources: [], favorites: [], statuses: {} }
    const file = new File([JSON.stringify(backup)], "ok.json", { type: "application/json" })
    const input = document.querySelector("input[type='file']")!
    await user.upload(input as HTMLInputElement, file)

    expect(await screen.findByText(/1 recurso ya existe/)).toBeInTheDocument()
  })

  it("resolves conflicts and completes import", async () => {
    const conflict = new Map([["url1", {
      importedResource: { id: "1", title: "A", url: "https://a.com", category: "X", tags: [], source: "user" as const, createdAt: "2025-01-01T00:00:00Z" },
      existingResource: { id: "e1", title: "A", url: "https://a.com", category: "X", tags: [], source: "user" as const, createdAt: "2025-01-01T00:00:00Z" },
    }]])

    vi.spyOn(backupService, "validateBackupFile").mockReturnValue({ valid: true, errors: [] })
    vi.spyOn(backupService, "detectURLConflicts").mockReturnValue(conflict)
    vi.spyOn(backupService, "importBackup").mockReturnValue({ addedCount: 0, updatedCount: 1, skippedCount: 0 })

    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    const backup = { version: "1.0", exportedAt: "2025-01-01", resources: [], favorites: [], statuses: {} }
    const file = new File([JSON.stringify(backup)], "ok.json", { type: "application/json" })
    const input = document.querySelector("input[type='file']")!
    await user.upload(input as HTMLInputElement, file)

    await screen.findByText(/1 recurso ya existe/)
    await user.click(screen.getByText("Confirmar e importar"))
    expect(defaultProps.onImportComplete).toHaveBeenCalledWith({ addedCount: 0, updatedCount: 1, skippedCount: 0 })
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it("resets file when cancel is clicked in conflict dialog", async () => {
    const conflict = new Map([["url1", {
      importedResource: { id: "1", title: "A", url: "https://a.com", category: "X", tags: [], source: "user" as const, createdAt: "2025-01-01T00:00:00Z" },
      existingResource: { id: "e1", title: "A", url: "https://a.com", category: "X", tags: [], source: "user" as const, createdAt: "2025-01-01T00:00:00Z" },
    }]])

    vi.spyOn(backupService, "validateBackupFile").mockReturnValue({ valid: true, errors: [] })
    vi.spyOn(backupService, "detectURLConflicts").mockReturnValue(conflict)

    const user = userEvent.setup()
    render(<ImportResourcesModal {...defaultProps} />)
    const backup = { version: "1.0", exportedAt: "2025-01-01", resources: [], favorites: [], statuses: {} }
    const file = new File([JSON.stringify(backup)], "ok.json", { type: "application/json" })
    const input = document.querySelector("input[type='file']")!
    await user.upload(input as HTMLInputElement, file)

    await screen.findByText(/1 recurso ya existe/)
    await user.click(screen.getByText("Cancelar importación"))
    expect(screen.getByText(/seleccionar el archivo/)).toBeInTheDocument()
  })

  it("does nothing when file change fires with no files", async () => {
    render(<ImportResourcesModal {...defaultProps} />)
    const input = document.querySelector("input[type='file']") as HTMLInputElement
    Object.defineProperty(input, "files", { value: [], writable: false })
    input.dispatchEvent(new Event("change", { bubbles: true }))
    expect(defaultProps.onImportComplete).not.toHaveBeenCalled()
    expect(screen.getByText(/seleccionar el archivo/)).toBeInTheDocument()
  })
})
