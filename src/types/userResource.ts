import type { Resource } from "./resource"

export interface UserResource extends Resource {
  source: "user"
  updatedAt?: string
}
