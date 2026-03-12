import { render, screen } from "../../test/utils"
import { Topbar } from "../../components/Topbar"
import userEvent from "@testing-library/user-event"
import { STORAGE_KEYS } from "../../constants/storageKeys"

describe("Topbar", () => {
  const onMenuClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    document.documentElement.classList.remove("dark")
  })

  it("renders the search bar", () => {
    render(<Topbar onMenuClick={onMenuClick} />)
    expect(screen.getByPlaceholderText("Buscar recursos...")).toBeInTheDocument()
  })

  it("renders the hamburger button", () => {
    render(<Topbar onMenuClick={onMenuClick} />)
    expect(screen.getByLabelText("Abrir menú")).toBeInTheDocument()
  })

  it("calls onMenuClick when hamburger is clicked", async () => {
    const user = userEvent.setup()
    render(<Topbar onMenuClick={onMenuClick} />)
    await user.click(screen.getByLabelText("Abrir menú"))
    expect(onMenuClick).toHaveBeenCalledTimes(1)
  })

  it("toggles dark mode and persists in localStorage", async () => {
    const user = userEvent.setup()
    render(<Topbar onMenuClick={onMenuClick} />)
    const darkBtn = screen.getByLabelText("Modo oscuro")
    await user.click(darkBtn)
    expect(localStorage.getItem(STORAGE_KEYS.DARK_MODE)).toBe("true")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

  it("reads initial dark mode from localStorage", () => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, "true")
    render(<Topbar onMenuClick={onMenuClick} />)
    expect(screen.getByLabelText("Modo claro")).toBeInTheDocument()
  })
})
