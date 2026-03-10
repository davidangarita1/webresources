import { render, screen } from "../test/utils"
import { ResourceCard } from "./ResourceCard"
import type { Resource } from "../types"
import userEvent from "@testing-library/user-event"

const MOCK_RESOURCE: Resource = {
  id: "1",
  title: "React Documentation",
  url: "https://react.dev",
  description: "Official React documentation",
  category: "REACT",
  tags: ["react", "javascript"],
  createdAt: "2025-01-01T00:00:00Z",
}

describe("ResourceCard", () => {
  const defaultProps = {
    resource: MOCK_RESOURCE,
    isFavorite: false,
    status: undefined,
    onToggleFavorite: vi.fn(),
    onCycleStatus: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render resource title", () => {
    render(<ResourceCard {...defaultProps} />)
    expect(screen.getByText("React Documentation")).toBeInTheDocument()
  })

  it("should render resource domain", () => {
    render(<ResourceCard {...defaultProps} />)
    expect(screen.getByText("react.dev")).toBeInTheDocument()
  })

  it("should render resource description", () => {
    render(<ResourceCard {...defaultProps} />)
    expect(
      screen.getByText("Official React documentation")
    ).toBeInTheDocument()
  })

  it("should render resource category", () => {
    render(<ResourceCard {...defaultProps} />)
    expect(screen.getByText("REACT")).toBeInTheDocument()
  })

  it("should render open link with correct URL", () => {
    render(<ResourceCard {...defaultProps} />)
    const link = screen.getByText("Abrir ↗")
    expect(link).toHaveAttribute("href", "https://react.dev")
    expect(link).toHaveAttribute("target", "_blank")
  })

  it("should show empty star when not favorite", () => {
    render(<ResourceCard {...defaultProps} />)
    expect(screen.getByLabelText("Agregar a favoritos")).toBeInTheDocument()
  })

  it("should show filled star when favorite", () => {
    render(<ResourceCard {...defaultProps} isFavorite={true} />)
    expect(screen.getByLabelText("Quitar de favoritos")).toBeInTheDocument()
  })

  it("should call onToggleFavorite when favorite button clicked", async () => {
    const user = userEvent.setup()
    render(<ResourceCard {...defaultProps} />)

    await user.click(screen.getByLabelText("Agregar a favoritos"))
    expect(defaultProps.onToggleFavorite).toHaveBeenCalledWith("1")
  })

  it("should call onCycleStatus when status button clicked", async () => {
    const user = userEvent.setup()
    render(<ResourceCard {...defaultProps} />)

    await user.click(screen.getByText("Sin estado"))
    expect(defaultProps.onCycleStatus).toHaveBeenCalledWith("1")
  })

  it("should show status label when status is set", () => {
    render(<ResourceCard {...defaultProps} status="pending" />)
    expect(screen.getByText("Pendiente")).toBeInTheDocument()
  })

  it("should show consumed status label", () => {
    render(<ResourceCard {...defaultProps} status="consumed" />)
    expect(screen.getByText("Consumido")).toBeInTheDocument()
  })

  it("should show reference status label", () => {
    render(<ResourceCard {...defaultProps} status="reference" />)
    expect(screen.getByText("Referencia")).toBeInTheDocument()
  })
})
