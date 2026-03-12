import { DeleteOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

interface DeleteConfirmModalProps {
  resourceTitle: string
  onConfirm: () => void
  onClose: () => void
}

export function DeleteConfirmModal({ resourceTitle, onConfirm, onClose }: DeleteConfirmModalProps) {
  const { t } = useTranslation()
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 id="delete-modal-title" className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
          <DeleteOutlined /> {t("deleteConfirm.title")}
        </h2>
        <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
          {t("deleteConfirm.message")} <span className="font-medium text-gray-900 dark:text-white">"{resourceTitle}"</span>?
        </p>
        <p className="mb-6 text-xs text-gray-400 dark:text-gray-500">
          {t("deleteConfirm.warning")}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {t("actions.cancel")}
          </button>
          <button
            onClick={() => { onConfirm(); onClose() }}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            {t("deleteConfirm.confirm")}
          </button>
        </div>
      </div>
    </div>
  )
}
