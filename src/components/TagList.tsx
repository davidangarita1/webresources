interface TagListProps {
  tags: string[]
  onTagClick?: (tag: string) => void
}

export function TagList({ tags, onTagClick }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick?.(tag)}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
