import { useResourceStore } from "../store"

export function useUserResources() {
  const userResources = useResourceStore((s) => s.userResources)
  const createUserResource = useResourceStore((s) => s.createUserResource)
  const updateUserResource = useResourceStore((s) => s.updateUserResource)
  const deleteUserResource = useResourceStore((s) => s.deleteUserResource)
  return { userResources, createUserResource, updateUserResource, deleteUserResource }
}
