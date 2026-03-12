import { CloseOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

interface YouTubePlayerModalProps {
  videoId: string
  title: string
  onClose: () => void
}

export function YouTubePlayerModal({ videoId, title, onClose }: YouTubePlayerModalProps) {
  const { t } = useTranslation()
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      <div className="w-full max-w-3xl rounded-xl bg-black shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between bg-gray-900 px-4 py-3">
          <p className="truncate text-sm font-medium text-white max-w-[calc(100%-2rem)]">{title}</p>
          <button
            onClick={onClose}
            className="shrink-0 ml-2 rounded-md p-1 text-gray-400 hover:text-white transition-colors"
            aria-label={t("youtubePlayer.closePlayer")}
          >
            <CloseOutlined />
          </button>
        </div>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
