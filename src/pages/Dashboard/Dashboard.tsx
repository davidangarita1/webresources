import { useResources, useFavorites, useStatuses } from "../../hooks"
import { useResourceStore } from "../../store"
import { ResourceCard } from "../../components/ResourceCard"

const FILTER_LABELS: Record<string, string> = {
  community: "Recursos de la Comunidad",
  user: "Tus Recursos",
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
          <span className="text-5xl">{activeFilter === "user" ? "📌" : "💭"}</span>
          <p className="mt-4 text-base sm:text-lg font-medium">
            {activeFilter === "user" ? "Aún no tienes recursos" : "No se encontraron recursos"}
          </p>
          <p className="text-xs sm:text-sm">
            {activeFilter === "user" ? "¡Crea tu primero!" : "Intenta cambiar los filtros o la búsqueda"}
          </p>
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
            />
          ))}
        </div>
      )}
    </div>
  )
}
