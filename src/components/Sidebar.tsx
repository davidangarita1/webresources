import { useResourceStore } from "../store"

const NAV_ITEMS = [
  { key: "all" as const, label: "Todos", icon: "📋" },
  { key: "favorites" as const, label: "Favoritos", icon: "⭐" },
  { key: "pending" as const, label: "Pendientes", icon: "⏳" },
  { key: "consumed" as const, label: "Consumidos", icon: "✅" },
] as const

export function Sidebar() {
  const activeFilter = useResourceStore((s) => s.activeFilter)
  const activeCategory = useResourceStore((s) => s.activeCategory)
  const categories = useResourceStore((s) => s.categories)
  const setActiveFilter = useResourceStore((s) => s.setActiveFilter)
  const setActiveCategory = useResourceStore((s) => s.setActiveCategory)

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          📚 Marcadores
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveFilter(item.key)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeFilter === item.key
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Categorías
          </h2>
          <ul className="space-y-0.5">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                    activeFilter === "category" && activeCategory === category
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xs">📁</span>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
