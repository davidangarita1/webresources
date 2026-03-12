export type ResourceStatus = "pending" | "consumed" | "reference"

export interface Resource {
  id: string
  title: string
  url: string
  description?: string
  category: string
  tags: string[]
  createdAt: string
}
