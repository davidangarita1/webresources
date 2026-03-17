import { useState } from "react"
import { YoutubeOutlined, UpOutlined, DownOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import type { Resource, ResourceStatus } from "../types"
import { ResourceCard } from "./ResourceCard"

interface YouTubeSectionProps {
  resources: Resource[]
  isFavorite: (id: string) => boolean
  getStatus: (id: string) => ResourceStatus | undefined
  onToggleFavorite: (id: string) => void
  onCycleStatus: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function YouTubeSection({
  resources,
  isFavorite,
  getStatus,
  onToggleFavorite,
  onCycleStatus,
  onEdit,
  onDelete,
}: YouTubeSectionProps) {
  const { t } = useTranslation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (resources.length === 0) return null

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <YoutubeOutlined
            className="text-xl"
            style={{ color: "#ef4444" }}
            aria-hidden="true"
          />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t("youtubeSection.title")}
          </h3>
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
            {t("youtubeSection.resourceCount", { count: resources.length })}
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? t("youtubeSection.expand") : t("youtubeSection.collapse")}
          className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
        >
          {isCollapsed ? <DownOutlined /> : <UpOutlined />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={isFavorite(resource.id)}
              status={getStatus(resource.id)}
              onToggleFavorite={onToggleFavorite}
              onCycleStatus={onCycleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
