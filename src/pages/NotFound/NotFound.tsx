import { Link } from "react-router-dom"
import { SearchOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

export function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <SearchOutlined style={{ fontSize: "80px" }} className="text-gray-300 dark:text-gray-600" />
      <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
        {t("notFound.title")}
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        {t("notFound.message")}
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        {t("notFound.backHome")}
      </Link>
    </div>
  )
}
