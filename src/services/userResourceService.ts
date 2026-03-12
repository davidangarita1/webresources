import type { UserResource } from "../types"
import { STORAGE_KEYS } from "../constants/storageKeys"

function getAll(): UserResource[] {
  const raw = localStorage.getItem(STORAGE_KEYS.USER_RESOURCES)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      localStorage.removeItem(STORAGE_KEYS.USER_RESOURCES)
      return []
    }

    return parsed as UserResource[]
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USER_RESOURCES)
    return []
  }
}

function save(resources: UserResource[]): void {
  localStorage.setItem(STORAGE_KEYS.USER_RESOURCES, JSON.stringify(resources))
}

function create(data: Omit<UserResource, "id" | "source" | "createdAt">): UserResource {
  const newResource: UserResource = {
    ...data,
    id: crypto.randomUUID(),
    source: "user",
    createdAt: new Date().toISOString(),
  }
  const all = getAll()
  save([...all, newResource])
  return newResource
}

function update(id: string, data: Partial<Omit<UserResource, "id" | "source" | "createdAt">>): UserResource | null {
  const all = getAll()
  const index = all.findIndex((r) => r.id === id)
  if (index === -1) return null
  const updated: UserResource = {
    ...all[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  all[index] = updated
  save(all)
  return updated
}

function remove(id: string): void {
  const all = getAll()
  save(all.filter((r) => r.id !== id))
}

export const userResourceService = { getAll, save, create, update, remove }
