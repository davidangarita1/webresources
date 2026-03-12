import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Topbar } from "../components/Topbar"
import { ImportResourcesModal } from "../components/ImportResourcesModal"
import { Dashboard } from "../pages/Dashboard"
import { NotFound } from "../pages/NotFound"
import { backupService } from "../services/backupService"
import { useResourceStore } from "../store"

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [toast, setToast] = useState<string>("")
  const initialize = useResourceStore((s) => s.initialize)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(""), 5000)
  }

  function handleImportComplete(result: { addedCount: number; updatedCount: number; skippedCount: number }) {
    initialize()
    const parts: string[] = []
    if (result.addedCount > 0) parts.push(`${result.addedCount} added`)
    if (result.updatedCount > 0) parts.push(`${result.updatedCount} updated`)
    if (result.skippedCount > 0) parts.push(`${result.skippedCount} skipped`)
    showToast(`Import complete — ${parts.join(", ") || "no changes"}`)
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onCreateResource={() => setCreateOpen(true)}
          onExportBackup={() => backupService.exportResourcesToJSON()}
          onImportBackup={() => setImportOpen(true)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenuClick={() => setSidebarOpen((v) => !v)} />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  isCreateOpen={createOpen}
                  onOpenCreate={() => setCreateOpen(true)}
                  onCreateClose={() => setCreateOpen(false)}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      {importOpen && (
        <ImportResourcesModal
          onClose={() => setImportOpen(false)}
          onImportComplete={handleImportComplete}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-green-50 border border-green-200 shadow-lg px-4 py-3">
          <p className="text-sm font-medium text-green-800">{toast}</p>
        </div>
      )}
    </BrowserRouter>
  )
}
