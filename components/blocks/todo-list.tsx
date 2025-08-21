import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"

interface TodoListProps {
  block: any
}

export function TodoListBlock({ block }: TodoListProps) {
  const { to_do } = block
  const colorClass = getNotionColorClass(to_do?.color)

  return (
    <div className={`flex items-start gap-2 mb-2 ${colorClass}`}>
      <input type="checkbox" checked={to_do?.checked || false} readOnly className="mt-1 rounded" />
      <span className={to_do?.checked ? "line-through opacity-60" : ""}>{renderRichText(to_do?.rich_text || [])}</span>
    </div>
  )
}
