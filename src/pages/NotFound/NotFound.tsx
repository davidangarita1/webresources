import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <span className="text-7xl">🔍</span>
      <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
        404
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Página no encontrada
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
