import { render, screen } from "../../test/utils"
import { LanguageSelector } from "../../components/LanguageSelector"
import userEvent from "@testing-library/user-event"
import i18n, { STORAGE_KEY } from "../../i18n"

describe("LanguageSelector", () => {
  beforeEach(() => {
    localStorage.clear()
    i18n.changeLanguage("es")
  })

  it('shows "EN" button when current language is Spanish', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole("button", { name: "Switch to English" })).toHaveTextContent("EN")
  })

  it('shows "ES" button when current language is English', async () => {
    await i18n.changeLanguage("en")
    render(<LanguageSelector />)
    expect(screen.getByRole("button", { name: "Cambiar a Español" })).toHaveTextContent("ES")
  })

  it("toggles from Spanish to English on click", async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)

    await user.click(screen.getByRole("button"))

    expect(i18n.language).toBe("en")
  })

  it("toggles from English to Spanish on click", async () => {
    await i18n.changeLanguage("en")
    const user = userEvent.setup()
    render(<LanguageSelector />)

    await user.click(screen.getByRole("button"))

    expect(i18n.language).toBe("es")
  })

  it("persists language choice to localStorage on toggle", async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)

    await user.click(screen.getByRole("button"))

    expect(localStorage.getItem(STORAGE_KEY)).toBe("en")
  })

  it("stores Spanish in localStorage when toggling back from English", async () => {
    await i18n.changeLanguage("en")
    const user = userEvent.setup()
    render(<LanguageSelector />)

    await user.click(screen.getByRole("button"))

    expect(localStorage.getItem(STORAGE_KEY)).toBe("es")
  })
})
