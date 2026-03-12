import { extractDomain, getFaviconUrl } from "../../utils/url"

describe("url utils", () => {
  describe("extractDomain", () => {
    it("extracts domain from valid URL", () => {
      expect(extractDomain("https://www.example.com/page")).toBe("example.com")
    })

    it("strips www prefix", () => {
      expect(extractDomain("https://www.google.com")).toBe("google.com")
    })

    it("preserves subdomain that is not www", () => {
      expect(extractDomain("https://docs.google.com")).toBe("docs.google.com")
    })

    it("returns original string for invalid URL", () => {
      expect(extractDomain("not-a-url")).toBe("not-a-url")
    })
  })

  describe("getFaviconUrl", () => {
    it("returns favicon URL for valid URL", () => {
      expect(getFaviconUrl("https://example.com/path")).toBe("https://example.com/favicon.ico")
    })

    it("returns empty string for invalid URL", () => {
      expect(getFaviconUrl("not-a-url")).toBe("")
    })
  })
})
