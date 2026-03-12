import type { UserResource } from "../types"

const USER_RESOURCES_KEY = "user-resources"

function getAll(): UserResource[] {
  const raw = localStorage.getItem(USER_RESOURCES_KEY)
  if (!raw) return []
  return JSON.parse(raw) as UserResource[]
}

function save(resources: UserResource[]): void {
  localStorage.setItem(USER_RESOURCES_KEY, JSON.stringify(resources))
}

export const userResourceService = { getAll, save }
