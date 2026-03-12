import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app/App"
import "./index.css"
import "./i18n"

const darkMode = localStorage.getItem("bookmark_dark_mode")
if (darkMode === "true") {
  document.documentElement.classList.add("dark")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
