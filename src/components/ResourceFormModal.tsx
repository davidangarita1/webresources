import { useState, type FormEvent } from "react"
import { EditOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons"
import type { UserResource } from "../types"

interface FormData {
  title: string
  url: string
  description: string
  category: string
  tags: string
}

interface ResourceFormModalProps {
  initialData?: UserResource
  categories: string[]
  onSubmit: (data: Omit<UserResource, "id" | "source" | "createdAt">) => void
  onClose: () => void
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}

export function ResourceFormModal({ initialData, categories, onSubmit, onClose }: ResourceFormModalProps) {
  const isEdit = Boolean(initialData)

  const [form, setForm] = useState<FormData>({
    title: initialData?.title ?? "",
    url: initialData?.url ?? "",
    description: initialData?.description ?? "",
    category: initialData?.category ?? "",
    tags: initialData?.tags?.join(", ") ?? "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  function validate(): boolean {
    const next: Partial<Record<keyof FormData, string>> = {}
    if (!form.title.trim()) next.title = "El título es obligatorio"
    if (!form.url.trim()) {
      next.url = "La URL es obligatoria"
    } else if (!isValidUrl(form.url.trim())) {
      next.url = "Ingresa una URL válida (ej. https://ejemplo.com)"
    }
    if (!form.category.trim()) next.category = "La categoría es obligatoria"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    onSubmit({
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim() || undefined,
      category: form.category.trim().toUpperCase(),
      tags,
      ...(initialData ? { updatedAt: new Date().toISOString() } : {}),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="form-modal-title"
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 id="form-modal-title" className="text-base font-semibold text-gray-900 dark:text-white">
            {isEdit ? <><EditOutlined /> Editar recurso</> : <><PlusOutlined /> Nuevo recurso</>}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            aria-label="Cerrar"
          >
            <CloseOutlined />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 px-6 py-5">
          {/* Title */}
          <div>
            <label htmlFor="rf-title" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="rf-title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Nombre del recurso"
              className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
                errors.title
                  ? "border-red-400 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:focus:border-indigo-400"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* URL */}
          <div>
            <label htmlFor="rf-url" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              id="rf-url"
              type="url"
              value={form.url}
              onChange={(e) => handleChange("url", e.target.value)}
              placeholder="https://ejemplo.com"
              className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
                errors.url
                  ? "border-red-400 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:focus:border-indigo-400"
              }`}
            />
            {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="rf-desc" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción <span className="text-xs font-normal text-gray-400">(opcional)</span>
            </label>
            <textarea
              id="rf-desc"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Breve descripción del recurso"
              rows={2}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="rf-category" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Categoría <span className="text-red-500">*</span>
            </label>
            <input
              id="rf-category"
              type="text"
              list="rf-category-list"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="Ej.: CSS, REACT, TOOLS"
              className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
                errors.category
                  ? "border-red-400 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:focus:border-indigo-400"
              }`}
            />
            <datalist id="rf-category-list">
              {categories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="rf-tags" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Etiquetas <span className="text-xs font-normal text-gray-400">(separadas por coma)</span>
            </label>
            <input
              id="rf-tags"
              type="text"
              value={form.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              placeholder="react, hooks, tutorial"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isEdit ? "Guardar cambios" : "Crear recurso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
