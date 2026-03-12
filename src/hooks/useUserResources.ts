import { useResourceStore } from "../store"

export function useUserResources() {
  const userResources = useResourceStore((s) => s.userResources)
  return { userResources }
}
