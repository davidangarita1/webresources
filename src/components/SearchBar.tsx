import { SearchOutlined, CloseOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useSearch } from "../hooks"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch()
  const { t } = useTranslation()

  return (
    <div className="relative w-full max-w-md">
      <SearchOutlined className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t("search.placeholder")}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-indigo-800"
        aria-label={t("search.aria")}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          aria-label={t("search.clear")}
        >
          <CloseOutlined />
        </button>
      )}
    </div>
  )
}
