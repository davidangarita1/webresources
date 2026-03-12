import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app/App"
import { STORAGE_KEYS } from "./constants/storageKeys"
import "./index.css"
import "./i18n"

if (localStorage.getItem(STORAGE_KEYS.DARK_MODE) === "true") {
  document.documentElement.classList.add("dark")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
