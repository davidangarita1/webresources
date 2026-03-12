import { useState, useRef } from "react"
import { CloseOutlined, UploadOutlined } from "@ant-design/icons"
import { backupService, type BackupData } from "../services/backupService"
import { ConflictResolutionDialog } from "./ConflictResolutionDialog"

interface ImportResourcesModalProps {
  onClose: () => void
  onImportComplete: (result: { addedCount: number; updatedCount: number; skippedCount: number }) => void
}

type Step = "select" | "conflicts" | "done"

export function ImportResourcesModal({ onClose, onImportComplete }: ImportResourcesModalProps) {
  const [step, setStep] = useState<Step>("select")
  const [errors, setErrors] = useState<string[]>([])
  const [backup, setBackup] = useState<BackupData | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    let parsed: unknown
    try {
      parsed = JSON.parse(await file.text())
    } catch {
      setErrors(["Invalid JSON file. Please select a valid backup file."])
      return
    }

    const validation = backupService.validateBackupFile(parsed)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setErrors([])
    const data = parsed as BackupData
    setBackup(data)

    const conflicts = backupService.detectURLConflicts(data.resources)
    if (conflicts.size > 0) {
      setStep("conflicts")
    } else {
      finish(data, new Map())
    }
  }

  function finish(data: BackupData, actions: Map<string, "update" | "skip">) {
    const result = backupService.importBackup(data, actions)
    onImportComplete(result)
    onClose()
  }

  function handleResolve(actions: Map<string, "update" | "skip">) {
    if (backup) finish(backup, actions)
  }

  function resetFile() {
    setBackup(null)
    setErrors([])
    setStep("select")
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Import Resources</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Close"
          >
            <CloseOutlined />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {step === "select" && (
            <div className="flex flex-col gap-4">
              <label
                htmlFor="backup-file"
                className="flex flex-col items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
              >
                <UploadOutlined className="text-3xl text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Click to select JSON backup file</span>
                <span className="text-xs text-gray-400">Only .json files exported from this application</span>
                <input
                  ref={fileRef}
                  id="backup-file"
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {errors.length > 0 && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-medium text-red-800 mb-1">Invalid backup file:</p>
                  <ul className="list-disc list-inside text-xs text-red-700 space-y-0.5">
                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Importing will restore your resources, favorites, and statuses. Existing data will not be removed unless you choose to update conflicting resources.
              </p>
            </div>
          )}

          {step === "conflicts" && backup && (
            <ConflictResolutionDialog
              conflicts={Array.from(backupService.detectURLConflicts(backup.resources).values())}
              onResolve={handleResolve}
              onCancel={resetFile}
            />
          )}
        </div>

        {/* Footer (select step only — conflicts step has its own buttons) */}
        {step === "select" && (
          <div className="flex justify-end gap-3 p-5 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
