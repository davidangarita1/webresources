import { useState } from "react"
import { StarFilled, StarOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import type { Resource, ResourceStatus } from "../types"
import { extractDomain, getFaviconUrl } from "../utils"

const STATUS_LABELS: Record<ResourceStatus, string> = {
  pending: "Pendiente",
  consumed: "Consumido",
  reference: "Referencia",
}

const STATUS_COLORS: Record<ResourceStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  consumed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  reference: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
}

interface ResourceCardProps {
  resource: Resource
  isFavorite: boolean
  status?: ResourceStatus
  onToggleFavorite: (id: string) => void
  onCycleStatus: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ResourceCard({
  resource,
  isFavorite,
  status,
  onToggleFavorite,
  onCycleStatus,
  onEdit,
  onDelete,
}: ResourceCardProps) {
  const [faviconError, setFaviconError] = useState(false)
  const domain = extractDomain(resource.url)
  const faviconUrl = getFaviconUrl(resource.url)

  return (
    <div className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {!faviconError && faviconUrl && (
            <img
              src={faviconUrl}
              alt=""
              className="h-4 w-4 shrink-0"
              onError={() => setFaviconError(true)}
              loading="lazy"
            />
          )}
          {(faviconError || !faviconUrl) && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-gray-200 text-[10px] font-bold text-gray-500 dark:bg-gray-600 dark:text-gray-300">
              {resource.title.charAt(0).toUpperCase()}
            </span>
          )}
          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
            {resource.title}
          </h3>
        </div>
        <button
          onClick={() => onToggleFavorite(resource.id)}
          className="ml-2 shrink-0 rounded-md p-1 text-lg transition-colors hover:scale-110 touch-manipulation"
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? <StarFilled className="text-yellow-400" /> : <StarOutlined />}
        </button>
        {(onEdit || onDelete) && (
          <div className="ml-1 flex shrink-0 items-center gap-0.5">
            {onEdit && (
              <button
                onClick={() => onEdit(resource.id)}
                className="rounded-md p-1 text-sm text-gray-400 transition-colors hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-700 dark:hover:text-indigo-400"
                aria-label="Editar recurso"
              >
                <EditOutlined />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(resource.id)}
                className="rounded-md p-1 text-sm text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400"
                aria-label="Eliminar recurso"
              >
                <DeleteOutlined />
              </button>
            )}
          </div>
        )}
      </div>

      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
        {domain}
      </p>

      {resource.description && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {resource.description}
        </p>
      )}

      <div className="mb-3 flex flex-wrap gap-1">
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
          {resource.category}
        </span>
        {resource.tags
          .filter((t) => t.toLowerCase() !== resource.category.toLowerCase())
          .map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <button
          onClick={() => onCycleStatus(resource.id)}
          className={`rounded-full cursor-pointer px-3 py-1.5 text-[11px] font-medium transition-colors touch-manipulation ${
            status
              ? STATUS_COLORS[status]
              : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          }`}
        >
          {status ? STATUS_LABELS[status] : "Sin estado"}
        </button>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 touch-manipulation"
        >
          Abrir
        </a>
      </div>
    </div>
  )
}
