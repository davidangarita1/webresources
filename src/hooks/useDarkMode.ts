import { useState } from 'react'
import { STORAGE_KEYS } from '../constants/storageKeys'

function getInitialDarkMode(): boolean {
  const stored = localStorage.getItem(STORAGE_KEYS.DARK_MODE)
  if (stored !== null) return stored === 'true'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyDarkMode(enabled: boolean): void {
  document.documentElement.classList.toggle('dark', enabled)
  localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(enabled))
}

interface DarkModeState {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export function useDarkMode(): DarkModeState {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const initial = getInitialDarkMode()
    applyDarkMode(initial)
    return initial
  })

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev
      applyDarkMode(next)
      return next
    })
  }

  return { isDarkMode, toggleDarkMode }
}
