export type ResourceStatus = "pending" | "consumed" | "reference"

export interface UserState {
  favorites: string[]
  statuses: Record<string, ResourceStatus>
}
