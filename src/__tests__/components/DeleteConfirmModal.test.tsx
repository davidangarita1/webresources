import { render, screen } from "../../test/utils"
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal"
import userEvent from "@testing-library/user-event"

describe("DeleteConfirmModal", () => {
  const defaultProps = {
    resourceTitle: "My Resource",
    onConfirm: vi.fn(),
    onClose: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the resource title", () => {
    render(<DeleteConfirmModal {...defaultProps} />)
    expect(screen.getByText(/"My Resource"/)).toBeInTheDocument()
  })

  it("renders the delete title", () => {
    render(<DeleteConfirmModal {...defaultProps} />)
    expect(screen.getByText(/Eliminar recurso/)).toBeInTheDocument()
  })

  it("calls onClose when cancel is clicked", async () => {
    const user = userEvent.setup()
    render(<DeleteConfirmModal {...defaultProps} />)
    await user.click(screen.getByText("Cancelar"))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onConfirm and onClose when delete button is clicked", async () => {
    const user = userEvent.setup()
    render(<DeleteConfirmModal {...defaultProps} />)
    const buttons = screen.getAllByText("Eliminar")
    const deleteBtn = buttons.find((b) => b.closest("button[type]") || b.tagName === "BUTTON")!
    await user.click(deleteBtn)
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup()
    render(<DeleteConfirmModal {...defaultProps} />)
    const backdrop = screen.getByRole("dialog")
    await user.click(backdrop)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })
})
