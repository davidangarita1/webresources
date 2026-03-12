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
