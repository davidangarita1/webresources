import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  validateBackupFile,
  detectURLConflicts,
  importBackup,
  exportResourcesToJSON,
  type BackupData,
} from "../../services/backupService"
import type { UserResource } from "../../types"

// ── helpers ──────────────────────────────────────────────────────────────────
function makeResource(overrides: Partial<UserResource> = {}): UserResource {
  return {
    id: "r1",
    title: "React Docs",
    url: "https://react.dev",
    category: "JavaScript",
    tags: ["react"],
    createdAt: "2026-01-01T00:00:00.000Z",
    source: "user",
    ...overrides,
  }
}

function makeBackup(resources: UserResource[] = [], overrides: Partial<BackupData> = {}): BackupData {
  return {
    meta: { exportedAt: "2026-03-12T00:00:00.000Z", version: "1.0", resourceCount: resources.length, language: "es" },
    resources,
    favorites: [],
    statuses: {},
    ...overrides,
  }
}

// ── validateBackupFile ────────────────────────────────────────────────────────
describe("validateBackupFile", () => {
  it("rejects null", () => {
    const r = validateBackupFile(null)
    expect(r.valid).toBe(false)
    expect(r.errors.length).toBeGreaterThan(0)
  })

  it("rejects a plain array", () => {
    expect(validateBackupFile([])).toMatchObject({ valid: false })
  })

  it("rejects object missing required keys", () => {
    const r = validateBackupFile({ meta: {} })
    expect(r.valid).toBe(false)
    expect(r.errors.some((e) => e.includes("resources"))).toBe(true)
    expect(r.errors.some((e) => e.includes("favorites"))).toBe(true)
    expect(r.errors.some((e) => e.includes("statuses"))).toBe(true)
  })

  it("rejects resources missing required fields", () => {
    const data = makeBackup([{ id: "", title: "", url: "", category: "", tags: [], createdAt: "", source: "user" }])
    const r = validateBackupFile(data)
    expect(r.valid).toBe(false)
    expect(r.errors.some((e) => e.includes("id"))).toBe(true)
    expect(r.errors.some((e) => e.includes("title"))).toBe(true)
    expect(r.errors.some((e) => e.includes("url"))).toBe(true)
    expect(r.errors.some((e) => e.includes("category"))).toBe(true)
  })

  it("rejects resources with javascript: protocol URLs", () => {
    const data = makeBackup([makeResource({ url: "javascript:alert(1)" })])
    const r = validateBackupFile(data)
    expect(r.valid).toBe(false)
    expect(r.errors.some((e) => e.includes("http or https protocol"))).toBe(true)
  })

  it("rejects resources with data: protocol URLs", () => {
    const data = makeBackup([makeResource({ url: "data:text/html,<script>alert(1)</script>" })])
    const r = validateBackupFile(data)
    expect(r.valid).toBe(false)
    expect(r.errors.some((e) => e.includes("http or https protocol"))).toBe(true)
  })

  it("rejects resources with invalid URL format", () => {
    const data = makeBackup([makeResource({ url: "not-a-valid-url" })])
    const r = validateBackupFile(data)
    expect(r.valid).toBe(false)
    expect(r.errors.some((e) => e.includes("invalid URL format"))).toBe(true)
  })

  it("accepts a valid backup", () => {
    expect(validateBackupFile(makeBackup([makeResource()]))).toMatchObject({ valid: true, errors: [] })
  })

  it("accepts a backup with no resources", () => {
    expect(validateBackupFile(makeBackup([]))).toMatchObject({ valid: true })
  })
})

// ── detectURLConflicts ────────────────────────────────────────────────────────
describe("detectURLConflicts", () => {
  beforeEach(() => { localStorage.clear() })

  it("detects URL match (case-insensitive, ignores query params)", () => {
    // Seed an existing resource in localStorage
    localStorage.setItem("user-resources", JSON.stringify([makeResource({ id: "existing-1", url: "https://react.dev" })]))
    const conflicts = detectURLConflicts([makeResource({ id: "imported-1", url: "https://REACT.DEV?ref=test" })])
    expect(conflicts.size).toBe(1)
    expect(conflicts.get("imported-1")).toBeDefined()
    expect(conflicts.get("imported-1")?.existingResource.id).toBe("existing-1")
  })

  it("returns empty map when no conflicts", () => {
    localStorage.setItem("user-resources", JSON.stringify([makeResource({ id: "existing-1", url: "https://react.dev" })]))
    const conflicts = detectURLConflicts([makeResource({ id: "new-1", url: "https://vuejs.org" })])
    expect(conflicts.size).toBe(0)
  })
})

// ── importBackup ──────────────────────────────────────────────────────────────
describe("importBackup", () => {
  beforeEach(() => { localStorage.clear() })

  it("adds new resources and returns correct addedCount", () => {
    const backup = makeBackup([makeResource({ id: "r-new", url: "https://vuejs.org", title: "Vue" })])
    const result = importBackup(backup, new Map())
    expect(result.addedCount).toBe(1)
    expect(result.updatedCount).toBe(0)
    expect(result.skippedCount).toBe(0)
    const stored = JSON.parse(localStorage.getItem("user-resources") ?? "[]") as unknown[]
    expect(stored).toHaveLength(1)
  })

  it("skips conflicting resource when action is skip", () => {
    // Pre-seed existing resource
    localStorage.setItem("user-resources", JSON.stringify([makeResource({ id: "e1", url: "https://react.dev" })]))
    const backup = makeBackup([makeResource({ id: "i1", url: "https://react.dev", title: "Updated" })])
    const actions = new Map<string, "update" | "skip">([["i1", "skip"]])
    const result = importBackup(backup, actions)
    expect(result.skippedCount).toBe(1)
    expect(result.updatedCount).toBe(0)
    expect(result.addedCount).toBe(0)
  })

  it("updates conflicting resource when action is update", () => {
    localStorage.setItem("user-resources", JSON.stringify([makeResource({ id: "e1", url: "https://react.dev", title: "Old title" })]))
    const backup = makeBackup([makeResource({ id: "i1", url: "https://react.dev", title: "New title" })])
    const actions = new Map<string, "update" | "skip">([["i1", "update"]])
    const result = importBackup(backup, actions)
    expect(result.updatedCount).toBe(1)
    expect(result.addedCount).toBe(0)
    const stored = JSON.parse(localStorage.getItem("user-resources") ?? "[]") as Array<{ title: string }>
    expect(stored[0].title).toBe("New title")
  })

  it("restores favorites from backup (additive)", () => {
    const backup = makeBackup([], { favorites: ["fav-1", "fav-2"], statuses: {} })
    importBackup(backup, new Map())
    const favorites = JSON.parse(localStorage.getItem("bookmark_favorites") ?? "[]") as string[]
    expect(favorites).toContain("fav-1")
    expect(favorites).toContain("fav-2")
  })

  it("restores statuses from backup", () => {
    const backup = makeBackup([], { favorites: [], statuses: { "r1": "consumed" } })
    importBackup(backup, new Map())
    const statuses = JSON.parse(localStorage.getItem("bookmark_statuses") ?? "{}") as Record<string, string>
    expect(statuses["r1"]).toBe("consumed")
  })
})

// ── exportResourcesToJSON ─────────────────────────────────────────────────────
describe("exportResourcesToJSON", () => {
  it("triggers a download anchor click", () => {
    // Mock localStorage
    localStorage.setItem("language", "en")

    const mockLink = {
      href: "",
      download: "",
      click: vi.fn(),
    }
    const appendSpy = vi.spyOn(document.body, "appendChild").mockImplementation((node) => node)
    const removeSpy = vi.spyOn(document.body, "removeChild").mockImplementation((node) => node)
    const createElementSpy = vi.spyOn(document, "createElement").mockReturnValue(mockLink as unknown as HTMLElement)
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock")
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {})

    exportResourcesToJSON()

    expect(mockLink.click).toHaveBeenCalled()
    expect(mockLink.download).toMatch(/^user-resources-backup-\d{4}-\d{2}-\d{2}\.json$/)

    createElementSpy.mockRestore()
    appendSpy.mockRestore()
    removeSpy.mockRestore()
    localStorage.clear()
  })

  it("detects conflicts with invalid URLs (normalizeUrl catch branch)", () => {
    localStorage.setItem("user-resources", JSON.stringify([makeResource({ id: "e1", url: "not-a-valid-url", title: "Existing" })]))
    const imported = [makeResource({ id: "i1", url: "not-a-valid-url", title: "Imported" })]
    const conflicts = detectURLConflicts(imported)
    expect(conflicts.size).toBe(1)
  })
})
