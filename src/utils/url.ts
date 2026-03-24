export function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname
    return hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export function getFaviconUrl(url: string): string {
  try {
    const origin = new URL(url).origin
    const secureOrigin = origin.replace(/^http:\/\//, "https://")
    return `${secureOrigin}/favicon.ico`
  } catch {
    return ""
  }
}

export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}
