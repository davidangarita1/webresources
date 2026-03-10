import { useResourceStore } from "../store"

export function CategoryList() {
  const categories = useResourceStore((s) => s.categories)
  const activeCategory = useResourceStore((s) => s.activeCategory)
  const setActiveCategory = useResourceStore((s) => s.setActiveCategory)

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            activeCategory === category
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
