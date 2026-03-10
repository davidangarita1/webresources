import { render, type RenderOptions } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import type { ReactElement } from "react"

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    ...options,
  })
}

export * from "@testing-library/react"
export { customRender as render }
