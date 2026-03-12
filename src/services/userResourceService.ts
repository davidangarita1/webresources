import type { UserResource } from "../types"

const USER_RESOURCES_KEY = "user-resources"

function getAll(): UserResource[] {
  const raw = localStorage.getItem(USER_RESOURCES_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      // Reset invalid data and return a safe default
      localStorage.removeItem(USER_RESOURCES_KEY)
      return []
    }

    return parsed as UserResource[]
  } catch {
    // Malformed JSON: clear corrupted data and return a safe default
    localStorage.removeItem(USER_RESOURCES_KEY)
    return []
  }
}

function save(resources: UserResource[]): void {
  localStorage.setItem(USER_RESOURCES_KEY, JSON.stringify(resources))
}

export const userResourceService = { getAll, save }
