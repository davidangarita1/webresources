import { useCallback } from "react"
import { useResourceStore } from "../store"
import type { ResourceStatus } from "../types"

const STATUS_CYCLE: ResourceStatus[] = ["pending", "consumed", "reference"]

export function useStatuses() {
  const statuses = useResourceStore((s) => s.statuses)
  const setStatus = useResourceStore((s) => s.setStatus)
  const removeStatus = useResourceStore((s) => s.removeStatus)

  const getStatus = useCallback(
    (id: string): ResourceStatus | undefined => statuses[id],
    [statuses]
  )

  const cycleStatus = useCallback(
    (id: string) => {
      const current = statuses[id]
      if (!current) {
        setStatus(id, "pending")
        return
      }
      const currentIndex = STATUS_CYCLE.indexOf(current)
      const nextIndex = (currentIndex + 1) % STATUS_CYCLE.length
      if (nextIndex === 0) {
        removeStatus(id)
      } else {
        setStatus(id, STATUS_CYCLE[nextIndex])
      }
    },
    [statuses, setStatus, removeStatus]
  )

  return {
    statuses,
    getStatus,
    setStatus,
    removeStatus,
    cycleStatus,
  }
}
