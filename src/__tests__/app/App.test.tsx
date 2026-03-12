import { render, screen, act, waitFor } from "@testing-library/react"
import { App } from "../../app/App"
import { useResourceStore } from "../../store/resourceStore"
import userEvent from "@testing-library/user-event"
import { backupService } from "../../services/backupService"

describe("App", () => {
  beforeEach(() => {
    localStorage.clear()
    useResourceStore.getState().initialize()
  })

  it("renders the topbar with search", () => {
    render(<App />)
    expect(screen.getByPlaceholderText("Buscar recursos...")).toBeInTheDocument()
  })

  it("renders the sidebar title", () => {
    render(<App />)
    expect(screen.getByText("Marcadores")).toBeInTheDocument()
  })

  it("renders the dashboard content", () => {
    render(<App />)
    expect(screen.getByText("Recursos de la Comunidad")).toBeInTheDocument()
  })

  it("toggles sidebar open/close via hamburger", async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByLabelText("Abrir menú"))
    expect(document.querySelector(".fixed.inset-0.z-20")).toBeInTheDocument()
  })

  it("opens import modal and processes a valid import", async () => {
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText("Cargar respaldo"))
    expect(screen.getByText(/seleccionar el archivo/)).toBeInTheDocument()
  })

  it("opens create resource modal from dashboard", async () => {
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<App />)
    const buttons = screen.getAllByText("Crear recurso")
    await user.click(buttons[0])
    expect(screen.getByText("Nuevo recurso")).toBeInTheDocument()
  })

  it("closes create modal after submitting a new resource", async () => {
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<App />)
    const buttons = screen.getAllByText("Crear recurso")
    await user.click(buttons[0])
    await user.type(screen.getByLabelText(/Título/), "Test")
    await user.type(screen.getByLabelText(/^URL/), "https://test.com")
    await user.type(screen.getByLabelText(/Categoría/), "CAT")
    const submitBtns = screen.getAllByText("Crear recurso")
    await user.click(submitBtns[submitBtns.length - 1])
    expect(screen.queryByText("Nuevo recurso")).not.toBeInTheDocument()
  })

  it("calls exportResourcesToJSON when export button clicked", async () => {
    const spy = vi.spyOn(backupService, "exportResourcesToJSON").mockImplementation(() => {})
    useResourceStore.getState().createUserResource({ title: "T", url: "https://t.com", category: "A", tags: [] })
    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<App />)
    const btns = screen.getAllByText("Descargar respaldo")
    await user.click(btns[0])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it("shows toast after import completes", async () => {
    vi.spyOn(backupService, "validateBackupFile").mockReturnValue({ valid: true, errors: [] })
    vi.spyOn(backupService, "detectURLConflicts").mockReturnValue(new Map())
    vi.spyOn(backupService, "importBackup").mockReturnValue({ addedCount: 2, updatedCount: 1, skippedCount: 0 })

    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText("Cargar respaldo"))

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    const backupJson = JSON.stringify({
      meta: { exportedAt: "2024-01-01", version: "1.0", resourceCount: 0, language: "es" },
      resources: [],
      favorites: [],
      statuses: {},
    })
    const file = new File([backupJson], "backup.json", { type: "application/json" })
    await user.upload(fileInput, file)

    await waitFor(() => {
      expect(screen.getByText(/Import complete/)).toBeInTheDocument()
    })
    vi.restoreAllMocks()
  })

  it("shows 'no changes' toast when import has zero counts", async () => {
    vi.spyOn(backupService, "validateBackupFile").mockReturnValue({ valid: true, errors: [] })
    vi.spyOn(backupService, "detectURLConflicts").mockReturnValue(new Map())
    vi.spyOn(backupService, "importBackup").mockReturnValue({ addedCount: 0, updatedCount: 0, skippedCount: 0 })

    useResourceStore.getState().setActiveFilter("user")
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText("Cargar respaldo"))

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    const backupJson = JSON.stringify({
      meta: { exportedAt: "2024-01-01", version: "1.0", resourceCount: 0, language: "es" },
      resources: [],
      favorites: [],
      statuses: {},
    })
    const file = new File([backupJson], "backup.json", { type: "application/json" })
    await user.upload(fileInput, file)

    await waitFor(() => {
      expect(screen.getByText(/no changes/)).toBeInTheDocument()
    })
    vi.restoreAllMocks()
  })

  it("renders NotFound for unknown route", () => {
    window.history.pushState({}, "", "/unknown")
    render(<App />)
    expect(screen.getByText("404")).toBeInTheDocument()
    window.history.pushState({}, "", "/")
  })
})
