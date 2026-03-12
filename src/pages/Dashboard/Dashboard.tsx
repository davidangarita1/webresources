import { useState } from "react"
import { PushpinOutlined, MessageOutlined, PlusOutlined } from "@ant-design/icons"
import { useResources, useFavorites, useStatuses, useUserResources } from "../../hooks"
import { useResourceStore } from "../../store"
import { ResourceCard } from "../../components/ResourceCard"
import { ResourceFormModal } from "../../components/ResourceFormModal"
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal"
import type { UserResource } from "../../types"

const FILTER_LABELS: Record<string, string> = {
  community: "Recursos de la Comunidad",
  user: "Tus Recursos",
  favorites: "Favoritos",
  pending: "Pendientes",
  consumed: "Consumidos",
  category: "Categoría",
}

interface DashboardProps {
  isCreateOpen: boolean
  onOpenCreate: () => void
  onCreateClose: () => void
}

export function Dashboard({ isCreateOpen, onOpenCreate, onCreateClose }: DashboardProps) {
  const { filteredResources } = useResources()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getStatus, cycleStatus } = useStatuses()
  const { createUserResource, updateUserResource, deleteUserResource } = useUserResources()

  const activeFilter = useResourceStore((s) => s.activeFilter)
  const activeCategory = useResourceStore((s) => s.activeCategory)
  const categories = useResourceStore((s) => s.categories)

  const [editingResource, setEditingResource] = useState<UserResource | null>(null)
  const [deletingResource, setDeletingResource] = useState<UserResource | null>(null)

  const title =
    activeFilter === "category" && activeCategory
      ? `${FILTER_LABELS.category}: ${activeCategory}`
      : FILTER_LABELS[activeFilter] || "Recursos"

  function handleEdit(id: string) {
    const resource = filteredResources.find((r) => r.id === id) as UserResource | undefined
    if (resource) setEditingResource(resource)
  }

  function handleDelete(id: string) {
    const resource = filteredResources.find((r) => r.id === id) as UserResource | undefined
    if (resource) setDeletingResource(resource)
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredResources.length} recurso{filteredResources.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-gray-400 dark:text-gray-500">
          <span className="text-5xl">{activeFilter === "user" ? <PushpinOutlined /> : <MessageOutlined />}</span>
          <p className="mt-4 text-base sm:text-lg font-medium">
            {activeFilter === "user" ? "Aún no tienes recursos" : "No se encontraron recursos"}
          </p>
          <p className="text-xs sm:text-sm">
            {activeFilter === "user" ? "¡Crea tu primero!" : "Intenta cambiar los filtros o la búsqueda"}
          </p>
          {activeFilter === "user" && (
            <button
              onClick={onOpenCreate}
              className="mt-5 rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <PlusOutlined /> Crear recurso
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={isFavorite(resource.id)}
              status={getStatus(resource.id)}
              onToggleFavorite={toggleFavorite}
              onCycleStatus={cycleStatus}
              onEdit={"source" in resource && resource.source === "user" ? handleEdit : undefined}
              onDelete={"source" in resource && resource.source === "user" ? handleDelete : undefined}
            />
          ))}
        </div>
      )}

      {(isCreateOpen || editingResource) && (
        <ResourceFormModal
          initialData={editingResource ?? undefined}
          categories={categories}
          onSubmit={(data) => {
            if (editingResource) {
              updateUserResource(editingResource.id, data)
              setEditingResource(null)
            } else {
              createUserResource(data)
              onCreateClose()
            }
          }}
          onClose={() => {
            setEditingResource(null)
            onCreateClose()
          }}
        />
      )}

      {deletingResource && (
        <DeleteConfirmModal
          resourceTitle={deletingResource.title}
          onConfirm={() => deleteUserResource(deletingResource.id)}
          onClose={() => setDeletingResource(null)}
        />
      )}
    </div>
  )
}
