import { useEffect, useState } from "react"
import { SearchBar } from "../components/SearchBar"

export function Topbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark")
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("bookmark_dark_mode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("bookmark_dark_mode", "false")
    }
  }, [darkMode])

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-900">
      <SearchBar />
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="ml-4 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  )
}
