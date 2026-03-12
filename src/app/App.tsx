import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Topbar } from "../components/Topbar"
import { Dashboard } from "../pages/Dashboard"
import { NotFound } from "../pages/NotFound"

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onCreateResource={() => setCreateOpen(true)}
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
    </BrowserRouter>
  )
}
