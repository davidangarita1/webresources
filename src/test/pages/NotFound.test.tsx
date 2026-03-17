import { render, screen } from "../../test/utils"
import { NotFound } from "../../pages/NotFound/NotFound"

describe("NotFound", () => {
  it("renders the 404 title", () => {
    render(<NotFound />)
    expect(screen.getByText("404")).toBeInTheDocument()
  })

  it("renders the message", () => {
    render(<NotFound />)
    expect(screen.getByText("Página no encontrada")).toBeInTheDocument()
  })

  it("renders a link back to home", () => {
    render(<NotFound />)
    const link = screen.getByText("Volver al inicio")
    expect(link).toBeInTheDocument()
    expect(link.closest("a")).toHaveAttribute("href", "/")
  })
})
