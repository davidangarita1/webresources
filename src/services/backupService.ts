import type { UserResource, ResourceStatus } from "../types"
import { userResourceService } from "./userResourceService"
import { storageService } from "./storageService"

export interface BackupMeta {
  exportedAt: string
  version: string
  resourceCount: number
  language: string
}

export interface BackupData {
  meta: BackupMeta
  resources: UserResource[]
  favorites: string[]
  statuses: Record<string, ResourceStatus>
}

export interface ConflictInfo {
  importedResource: UserResource
  existingResource: UserResource
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url)
    return `${u.protocol}//${u.host}${u.pathname}`.toLowerCase().replace(/\/$/, "")
  } catch {
    return url.toLowerCase()
  }
}

export function buildBackupData(): BackupData {
  const resources = userResourceService.getAll()
  const favorites = storageService.getFavorites()
  const statuses = storageService.getStatuses()
  const language = localStorage.getItem("language") ?? "es"

  return {
    meta: {
      exportedAt: new Date().toISOString(),
      version: "1.0",
      resourceCount: resources.length,
      language,
    },
    resources,
    favorites,
    statuses,
  }
}

export function downloadJSON(data: BackupData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `user-resources-backup-${new Date().toISOString().split("T")[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportResourcesToJSON(): void {
  downloadJSON(buildBackupData())
}

export function validateBackupFile(data: unknown): ValidationResult {
  const errors: string[] = []

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    errors.push("Invalid file format: root must be a JSON object")
    return { valid: false, errors }
  }

  const obj = data as Record<string, unknown>

  if (!obj.meta || typeof obj.meta !== "object") errors.push("Missing or invalid 'meta' section")
  if (!Array.isArray(obj.resources)) errors.push("Missing or invalid 'resources' array")
  if (!Array.isArray(obj.favorites)) errors.push("Missing or invalid 'favorites' array")
  if (typeof obj.statuses !== "object" || obj.statuses === null || Array.isArray(obj.statuses)) {
    errors.push("Missing or invalid 'statuses' object")
  }

  if (errors.length > 0) return { valid: false, errors }

  const resources = obj.resources as unknown[]
  resources.forEach((r, i) => {
    const res = r as Record<string, unknown>
    if (!res.id || typeof res.id !== "string") errors.push(`resources[${i}]: missing required field 'id'`)
    if (!res.title || typeof res.title !== "string") errors.push(`resources[${i}]: missing required field 'title'`)
    if (!res.url || typeof res.url !== "string") {
      errors.push(`resources[${i}]: missing required field 'url'`)
    } else {
      try {
        const parsed = new URL(res.url)
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
          errors.push(`resources[${i}]: URL must use http or https protocol`)
        }
      } catch {
        errors.push(`resources[${i}]: invalid URL format`)
      }
    }
    if (!res.category || typeof res.category !== "string") errors.push(`resources[${i}]: missing required field 'category'`)
  })

  return { valid: errors.length === 0, errors }
}

export function detectURLConflicts(importedResources: UserResource[]): Map<string, ConflictInfo> {
  const existing = userResourceService.getAll()
  const existingByUrl = new Map(existing.map((r) => [normalizeUrl(r.url), r]))
  const conflicts = new Map<string, ConflictInfo>()

  for (const imported of importedResources) {
    const existing = existingByUrl.get(normalizeUrl(imported.url))
    if (existing) {
      conflicts.set(imported.id, { importedResource: imported, existingResource: existing })
    }
  }

  return conflicts
}

export function importBackup(
  backup: BackupData,
  conflictActions: Map<string, "update" | "skip">
): { addedCount: number; updatedCount: number; skippedCount: number } {
  const existing = userResourceService.getAll()
  const existingByUrl = new Map(existing.map((r) => [normalizeUrl(r.url), r]))

  let addedCount = 0
  let updatedCount = 0
  let skippedCount = 0

  for (const imported of backup.resources) {
    const existingResource = existingByUrl.get(normalizeUrl(imported.url))

    if (existingResource) {
      const action = conflictActions.get(imported.id) ?? "skip"
      if (action === "update") {
        userResourceService.update(existingResource.id, {
          title: imported.title,
          description: imported.description,
          category: imported.category,
          tags: imported.tags,
        })
        updatedCount++
      } else {
        skippedCount++
      }
    } else {
      userResourceService.create({
        title: imported.title,
        url: imported.url,
        description: imported.description,
        category: imported.category,
        tags: imported.tags ?? [],
      })
      addedCount++
    }
  }

  // Restore favorites from backup (additive — don't remove existing favorites)
  const currentFavorites = new Set(storageService.getFavorites())
  for (const favId of backup.favorites) {
    if (!currentFavorites.has(favId)) {
      storageService.toggleFavorite(favId)
    }
  }

  // Restore statuses from backup (additive)
  for (const [id, status] of Object.entries(backup.statuses)) {
    storageService.setStatus(id, status)
  }

  return { addedCount, updatedCount, skippedCount }
}

export const backupService = {
  buildBackupData,
  downloadJSON,
  exportResourcesToJSON,
  validateBackupFile,
  detectURLConflicts,
  importBackup,
}
