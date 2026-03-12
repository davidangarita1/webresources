import { isYouTubeUrl, extractYouTubeId, getYouTubeThumbnail } from "../../utils/youtube"

describe("youtube utils", () => {
  describe("isYouTubeUrl", () => {
    it("detects youtube.com/watch URLs", () => {
      expect(isYouTubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(true)
    })

    it("detects youtu.be short URLs", () => {
      expect(isYouTubeUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(true)
    })

    it("detects youtube.com/embed URLs", () => {
      expect(isYouTubeUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe(true)
    })

    it("returns false for non-YouTube URLs", () => {
      expect(isYouTubeUrl("https://example.com")).toBe(false)
    })
  })

  describe("extractYouTubeId", () => {
    it("extracts ID from youtube.com/watch", () => {
      expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ")
    })

    it("extracts ID from youtu.be", () => {
      expect(extractYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ")
    })

    it("extracts ID from embed URL", () => {
      expect(extractYouTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ")
    })

    it("returns null for non-YouTube URL", () => {
      expect(extractYouTubeId("https://example.com")).toBeNull()
    })
  })

  describe("getYouTubeThumbnail", () => {
    it("returns thumbnail URL", () => {
      expect(getYouTubeThumbnail("dQw4w9WgXcQ")).toBe("https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg")
    })
  })
})
