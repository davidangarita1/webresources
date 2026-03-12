import { useState } from "react"
import { PushpinOutlined, MessageOutlined, PlusOutlined, DownloadOutlined, UploadOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { useTranslation, Trans } from "react-i18next"
import { useResources, useFavorites, useStatuses, useUserResources } from "../../hooks"
import { useResourceStore } from "../../store"
import { ResourceCard } from "../../components/ResourceCard"
import { ResourceFormModal } from "../../components/ResourceFormModal"
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal"
import type { UserResource } from "../../types"

const FILTER_TRANS_KEYS: Record<string, string> = {
  community: "filters.community",
  user: "filters.yourResources",
  favorites: "filters.favorites",
  pending: "filters.pending",
  consumed: "filters.consumed",
  category: "filters.category",
}

interface DashboardProps {
  isCreateOpen: boolean
  onOpenCreate: () => void
  onCreateClose: () => void
  onExportBackup: () => void
  onImportBackup: () => void
}

export function Dashboard({ isCreateOpen, onOpenCreate, onCreateClose, onExportBackup, onImportBackup }: DashboardProps) {
  const { t } = useTranslation()
  const { filteredResources } = useResources()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getStatus, cycleStatus } = useStatuses()
  const { createUserResource, updateUserResource, deleteUserResource } = useUserResources()
  const userResources = useResourceStore((s) => s.userResources)

  const activeFilter = useResourceStore((s) => s.activeFilter)
  const activeCategory = useResourceStore((s) => s.activeCategory)
  const categories = useResourceStore((s) => s.categories)

  const [editingResource, setEditingResource] = useState<UserResource | null>(null)
  const [deletingResource, setDeletingResource] = useState<UserResource | null>(null)

  const title =
    activeFilter === "category" && activeCategory
      ? `${t("filters.category")}: ${activeCategory}`
      : t(FILTER_TRANS_KEYS[activeFilter] ?? "filters.community")

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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
              {title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("dashboard.resourceCount", { count: filteredResources.length })}
            </p>
          </div>

          {/* Action buttons — only shown in "Tus Recursos" view */}
          {activeFilter === "user" && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenCreate}
                className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <PlusOutlined /> {t("actions.createResource")}
              </button>
              {userResources.length > 0 && (
                <button
                  onClick={onExportBackup}
                  className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <DownloadOutlined /> {t("actions.downloadBackup")}
                </button>
              )}
              <button
                onClick={onImportBackup}
                className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <UploadOutlined /> {t("actions.uploadBackup")}
              </button>
            </div>
          )}
        </div>

        {/* localStorage notice — only in Tus Recursos */}
        {activeFilter === "user" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-2.5 dark:bg-indigo-950/40 dark:border-indigo-900">
            <InfoCircleOutlined className="mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              <Trans
                i18nKey="dashboard.localStorageNotice"
                components={{ 1: <strong /> }}
              />
            </p>
          </div>
        )}
      </div>

      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-gray-400 dark:text-gray-500">
          <span className="text-5xl">{activeFilter === "user" ? <PushpinOutlined /> : <MessageOutlined />}</span>
          <p className="mt-4 text-base sm:text-lg font-medium">
            {activeFilter === "user" ? t("dashboard.emptyUser") : t("dashboard.emptyOther")}
          </p>
          <p className="text-xs sm:text-sm">
            {activeFilter === "user" ? t("dashboard.emptyUserHint") : t("dashboard.emptyOtherHint")}
          </p>
          {activeFilter === "user" && (
            <button
              onClick={onOpenCreate}
              className="mt-5 rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <PlusOutlined /> {t("actions.createResource")}
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
