import {
  GlobalOutlined,
  PushpinOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  BookOutlined,
  CloseOutlined,
  FolderOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useResourceStore } from "../store"

type NavKey = "community" | "user" | "favorites" | "pending" | "consumed"

const NAV_ICONS: Record<NavKey, ReactNode> = {
  community: <GlobalOutlined />,
  user: <PushpinOutlined />,
  favorites: <StarOutlined />,
  pending: <ClockCircleOutlined />,
  consumed: <CheckCircleOutlined />,
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onCreateResource: () => void
}

export function Sidebar({ isOpen, onClose, onCreateResource }: SidebarProps) {
  const { t } = useTranslation()
  const activeFilter = useResourceStore((s) => s.activeFilter)
  const activeCategory = useResourceStore((s) => s.activeCategory)
  const categories = useResourceStore((s) => s.categories)
  const setActiveFilter = useResourceStore((s) => s.setActiveFilter)
  const setActiveCategory = useResourceStore((s) => s.setActiveCategory)

  function handleNavClick(action: () => void) {
    action()
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-gray-200
          bg-white transition-transform duration-300 ease-in-out
          dark:border-gray-700 dark:bg-gray-900
          md:static md:z-auto md:w-64 md:translate-x-0 md:transition-none
          ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h1 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <BookOutlined /> {t("nav.title")}
          </h1>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            aria-label={t("nav.closeMenu")}
          >
            <CloseOutlined />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {(Object.keys(NAV_ICONS) as NavKey[]).map((key) => (
              <li key={key}>
                <button
                  onClick={() => handleNavClick(() => setActiveFilter(key))}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeFilter === key
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-base">{NAV_ICONS[key]}</span>
                  {t(`nav.${key === "user" ? "yourResources" : key}`)}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {t("nav.categories")}
            </h2>
            <ul className="space-y-0.5">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleNavClick(() => setActiveCategory(category))}
                    className={`flex cursor-pointer w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      activeFilter === "category" && activeCategory === category
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FolderOutlined className="text-xs" />
                    <span className="truncate">{category}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="border-t border-gray-200 p-3 dark:border-gray-700">
          <button
            onClick={() => { onCreateResource(); onClose() }}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <PlusOutlined />
            {t("actions.createResource")}
          </button>
        </div>
      </aside>
    </>
  )
}
