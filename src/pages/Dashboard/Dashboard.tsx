import { useResources, useFavorites, useStatuses } from "../../hooks"
import { useResourceStore } from "../../store"
import { ResourceCard } from "../../components/ResourceCard"

const FILTER_LABELS: Record<string, string> = {
  all: "Todos los recursos",
  favorites: "Favoritos",
  pending: "Pendientes",
  consumed: "Consumidos",
  category: "Categoría",
}

export function Dashboard() {
  const { filteredResources } = useResources()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getStatus, cycleStatus } = useStatuses()

  const activeFilter = useResourceStore((s) => s.activeFilter)
  const activeCategory = useResourceStore((s) => s.activeCategory)

  const title =
    activeFilter === "category" && activeCategory
      ? `${FILTER_LABELS.category}: ${activeCategory}`
      : FILTER_LABELS[activeFilter] || "Recursos"

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredResources.length} recurso{filteredResources.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
          <span className="text-5xl">📭</span>
          <p className="mt-4 text-lg font-medium">No se encontraron recursos</p>
          <p className="text-sm">Intenta cambiar los filtros o la búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={isFavorite(resource.id)}
              status={getStatus(resource.id)}
              onToggleFavorite={toggleFavorite}
              onCycleStatus={cycleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}
