import { render, screen } from "../../test/utils"
import { YouTubeSection } from "../../components/YouTubeSection"
import type { Resource } from "../../types"
import userEvent from "@testing-library/user-event"

const YOUTUBE_RESOURCE: Resource = {
  id: "yt1",
  title: "CSS Grid Tutorial",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  description: "A comprehensive CSS Grid tutorial",
  category: "CSS",
  tags: ["css", "layout"],
  createdAt: "2025-01-01T00:00:00Z",
}

const YOUTUBE_RESOURCE_2: Resource = {
  id: "yt2",
  title: "React Hooks Explained",
  url: "https://youtu.be/TNhaISOUy6Q",
  description: "Learn React hooks",
  category: "REACT",
  tags: ["react", "hooks"],
  createdAt: "2025-01-02T00:00:00Z",
}

describe("YouTubeSection", () => {
  const defaultProps = {
    resources: [YOUTUBE_RESOURCE],
    isFavorite: vi.fn().mockReturnValue(false),
    getStatus: vi.fn().mockReturnValue(undefined),
    onToggleFavorite: vi.fn(),
    onCycleStatus: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("rendering", () => {
    it("renders the section title", () => {
      render(<YouTubeSection {...defaultProps} />)
      expect(screen.getByText("Videos de YouTube")).toBeInTheDocument()
    })

    it("renders the video count badge for one video", () => {
      render(<YouTubeSection {...defaultProps} />)
      expect(screen.getByText("1 video")).toBeInTheDocument()
    })

    it("renders the video count badge for multiple videos", () => {
      render(
        <YouTubeSection
          {...defaultProps}
          resources={[YOUTUBE_RESOURCE, YOUTUBE_RESOURCE_2]}
        />
      )
      expect(screen.getByText("2 videos")).toBeInTheDocument()
    })

    it("renders a ResourceCard for each resource", () => {
      render(
        <YouTubeSection
          {...defaultProps}
          resources={[YOUTUBE_RESOURCE, YOUTUBE_RESOURCE_2]}
        />
      )
      expect(screen.getByText("CSS Grid Tutorial")).toBeInTheDocument()
      expect(screen.getByText("React Hooks Explained")).toBeInTheDocument()
    })

    it("renders nothing when resources is empty", () => {
      const { container } = render(
        <YouTubeSection {...defaultProps} resources={[]} />
      )
      expect(container.firstChild).toBeNull()
    })

    it("uses a semantic section element", () => {
      render(<YouTubeSection {...defaultProps} />)
      expect(document.querySelector("section")).toBeInTheDocument()
    })

    it("renders an h3 heading for accessibility", () => {
      render(<YouTubeSection {...defaultProps} />)
      const heading = screen.getByRole("heading", { level: 3, name: "Videos de YouTube" })
      expect(heading).toBeInTheDocument()
    })
  })

  describe("collapse / expand behavior", () => {
    it("renders the collapse button with aria-label", () => {
      render(<YouTubeSection {...defaultProps} />)
      expect(
        screen.getByLabelText("Colapsar videos")
      ).toBeInTheDocument()
    })

    it("hides resource cards when collapsed", async () => {
      const user = userEvent.setup()
      render(<YouTubeSection {...defaultProps} />)
      expect(screen.getByText("CSS Grid Tutorial")).toBeInTheDocument()

      await user.click(screen.getByLabelText("Colapsar videos"))
      expect(screen.queryByText("CSS Grid Tutorial")).not.toBeInTheDocument()
    })

    it("shows expand aria-label after collapsing", async () => {
      const user = userEvent.setup()
      render(<YouTubeSection {...defaultProps} />)
      await user.click(screen.getByLabelText("Colapsar videos"))
      expect(screen.getByLabelText("Expandir videos")).toBeInTheDocument()
    })

    it("restores resource cards when expanded again", async () => {
      const user = userEvent.setup()
      render(<YouTubeSection {...defaultProps} />)
      await user.click(screen.getByLabelText("Colapsar videos"))
      await user.click(screen.getByLabelText("Expandir videos"))
      expect(screen.getByText("CSS Grid Tutorial")).toBeInTheDocument()
    })
  })

  describe("interactions delegated to ResourceCard", () => {
    it("calls onToggleFavorite when favorite button is clicked", async () => {
      const user = userEvent.setup()
      render(<YouTubeSection {...defaultProps} />)
      await user.click(screen.getByLabelText("Agregar a favoritos"))
      expect(defaultProps.onToggleFavorite).toHaveBeenCalledWith("yt1")
    })

    it("calls onCycleStatus when status button is clicked", async () => {
      const user = userEvent.setup()
      render(<YouTubeSection {...defaultProps} />)
      await user.click(screen.getByText("Sin estado"))
      expect(defaultProps.onCycleStatus).toHaveBeenCalledWith("yt1")
    })

    it("renders edit button when onEdit is provided", () => {
      render(<YouTubeSection {...defaultProps} onEdit={vi.fn()} />)
      expect(screen.getByLabelText("Editar recurso")).toBeInTheDocument()
    })

    it("renders delete button when onDelete is provided", () => {
      render(<YouTubeSection {...defaultProps} onDelete={vi.fn()} />)
      expect(screen.getByLabelText("Eliminar recurso")).toBeInTheDocument()
    })

    it("calls onEdit when edit button is clicked", async () => {
      const onEdit = vi.fn()
      const user = userEvent.setup()
      render(<YouTubeSection {...defaultProps} onEdit={onEdit} />)
      await user.click(screen.getByLabelText("Editar recurso"))
      expect(onEdit).toHaveBeenCalledWith("yt1")
    })

    it("calls onDelete when delete button is clicked", async () => {
      const onDelete = vi.fn()
      const user = userEvent.setup()
      render(<YouTubeSection {...defaultProps} onDelete={onDelete} />)
      await user.click(screen.getByLabelText("Eliminar recurso"))
      expect(onDelete).toHaveBeenCalledWith("yt1")
    })
  })
})
