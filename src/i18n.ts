import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { STORAGE_KEYS } from "./constants/storageKeys"
import en from "./locales/en/translation.json"
import es from "./locales/es/translation.json"

function getInitialLanguage(): string {
  const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
  if (stored === "en" || stored === "es") return stored
  const browser = navigator.language.split("-")[0]
  return browser === "es" ? "es" : "en"
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export default i18n
