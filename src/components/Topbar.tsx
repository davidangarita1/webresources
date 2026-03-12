import { useState } from "react"
import { SunOutlined, MoonOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { SearchBar } from "./SearchBar"
import { LanguageSelector } from "./LanguageSelector"

function getInitialDarkMode(): boolean {
  const stored = localStorage.getItem("bookmark_dark_mode")
  if (stored !== null) return stored === "true"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function applyDarkMode(enabled: boolean): void {
  if (enabled) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
  localStorage.setItem("bookmark_dark_mode", String(enabled))
}

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode)
  const { t } = useTranslation()

  function toggleDarkMode() {
    const next = !darkMode
    setDarkMode(next)
    applyDarkMode(next)
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900 md:px-6">
      {/* Hamburger — only on mobile */}
      <button
        onClick={onMenuClick}
        className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
        aria-label={t("nav.openMenu")}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <SearchBar />
      </div>

      <LanguageSelector />

      <button
        onClick={toggleDarkMode}
        className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label={darkMode ? t("topbar.lightMode") : t("topbar.darkMode")}
      >
        {darkMode ? <SunOutlined /> : <MoonOutlined />}
      </button>
    </header>
  )
}
