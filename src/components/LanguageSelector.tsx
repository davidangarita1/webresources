import { useTranslation } from "react-i18next"
import i18n from "../i18n"
import { STORAGE_KEYS } from "../constants/storageKeys"

export function LanguageSelector() {
  const { i18n: i18nInstance } = useTranslation()
  const current = i18nInstance.language === "es" ? "es" : "en"

  function toggle() {
    const next = current === "es" ? "en" : "es"
    i18n.changeLanguage(next)
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, next)
  }

  return (
    <button
      onClick={toggle}
      className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      aria-label={current === "es" ? "Switch to English" : "Cambiar a Español"}
      title={current === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {current === "es" ? "EN" : "ES"}
    </button>
  )
}
