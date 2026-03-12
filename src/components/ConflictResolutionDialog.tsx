import { useState } from "react"
import { CheckCircleOutlined } from "@ant-design/icons"
import type { ConflictInfo } from "../services/backupService"

interface ConflictResolutionDialogProps {
  conflicts: ConflictInfo[]
  onResolve: (actions: Map<string, "update" | "skip">) => void
  onCancel: () => void
}

export function ConflictResolutionDialog({ conflicts, onResolve, onCancel }: ConflictResolutionDialogProps) {
  const [actions, setActions] = useState<Map<string, "update" | "skip">>(
    () => new Map(conflicts.map((c) => [c.importedResource.id, "skip"]))
  )

  function setAction(id: string, action: "update" | "skip") {
    setActions((prev) => new Map(prev).set(id, action))
  }

  function setAll(action: "update" | "skip") {
    setActions(new Map(conflicts.map((c) => [c.importedResource.id, action])))
  }

  const updateCount = Array.from(actions.values()).filter((a) => a === "update").length

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
        <p className="text-sm font-medium text-amber-900">
          {conflicts.length} resource{conflicts.length !== 1 ? "s" : ""} already exist in your collection.
        </p>
        <p className="text-sm text-amber-800 mt-1">
          Choose whether to update each one with imported data or keep your current version.
        </p>
      </div>

      {/* Bulk actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setAll("update")}
          className="px-3 py-1.5 text-xs font-medium rounded border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Update all
        </button>
        <button
          onClick={() => setAll("skip")}
          className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Skip all
        </button>
      </div>

      {/* Conflict list */}
      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
        {conflicts.map(({ importedResource, existingResource }) => {
          const action = actions.get(importedResource.id) ?? "skip"
          return (
            <div key={importedResource.id} className="border rounded-lg p-3 bg-gray-50 text-sm">
              <p className="font-medium text-gray-900 truncate">{existingResource.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{existingResource.url}</p>
              {importedResource.title !== existingResource.title && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Import title: <span className="italic">{importedResource.title}</span>
                </p>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setAction(importedResource.id, "update")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    action === "update"
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Update
                </button>
                <button
                  onClick={() => setAction(importedResource.id, "skip")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    action === "skip"
                      ? "bg-gray-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Skip
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <p className="text-xs text-gray-500">
        {updateCount} will be updated · {conflicts.length - updateCount} will be skipped
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel import
        </button>
        <button
          onClick={() => onResolve(actions)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          <CheckCircleOutlined />
          Confirm &amp; import
        </button>
      </div>
    </div>
  )
}
