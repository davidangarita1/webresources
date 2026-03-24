import { extractDomain, getFaviconUrl, isSafeUrl } from "../../utils/url"

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

    it("returns empty string for invalid URL", () => {
      expect(extractDomain("not-a-url")).toBe("")
    })
  })

  describe("getFaviconUrl", () => {
    it("returns favicon URL for valid https URL", () => {
      expect(getFaviconUrl("https://example.com/path")).toBe("https://example.com/favicon.ico")
    })

    it("upgrades http origin to https for favicon URL", () => {
      expect(getFaviconUrl("http://example.com/path")).toBe("https://example.com/favicon.ico")
    })

    it("returns empty string for invalid URL", () => {
      expect(getFaviconUrl("not-a-url")).toBe("")
    })
  })

  describe("isSafeUrl", () => {
    it("returns true for https URLs", () => {
      expect(isSafeUrl("https://example.com")).toBe(true)
    })

    it("returns true for http URLs", () => {
      expect(isSafeUrl("http://example.com")).toBe(true)
    })

    it("returns false for javascript: URLs", () => {
      expect(isSafeUrl("javascript:alert(1)")).toBe(false)
    })

    it("returns false for data: URLs", () => {
      expect(isSafeUrl("data:text/html,<script>alert(1)</script>")).toBe(false)
    })

    it("returns false for invalid URLs", () => {
      expect(isSafeUrl("not-a-url")).toBe(false)
    })
  })
})
