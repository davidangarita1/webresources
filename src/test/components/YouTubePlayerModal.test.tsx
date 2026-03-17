import { render, screen } from "../../test/utils"
import { YouTubePlayerModal } from "../../components/YouTubePlayerModal"
import userEvent from "@testing-library/user-event"

describe("YouTubePlayerModal", () => {
  const defaultProps = {
    videoId: "dQw4w9WgXcQ",
    title: "Test Video",
    onClose: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the video title", () => {
    render(<YouTubePlayerModal {...defaultProps} />)
    expect(screen.getByText("Test Video")).toBeInTheDocument()
  })

  it("renders an iframe with correct src", () => {
    render(<YouTubePlayerModal {...defaultProps} />)
    const iframe = document.querySelector("iframe")
    expect(iframe).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1")
  })

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup()
    render(<YouTubePlayerModal {...defaultProps} />)
    await user.click(screen.getByLabelText("Cerrar reproductor"))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup()
    render(<YouTubePlayerModal {...defaultProps} />)
    const backdrop = screen.getByRole("dialog")
    await user.click(backdrop)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })
})
