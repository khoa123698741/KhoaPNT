import { renderRichText, getNotionColorClasses } from "@/lib/notion-block-mapper"
import { Checkbox } from "@/components/ui/checkbox"

interface TodoListProps {
  block: any
}

export function TodoListBlock({ block }: TodoListProps) {
  const text = block.to_do?.rich_text || []
  const checked = block.to_do?.checked || false
  const color = block.to_do?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return (
    <div className={`flex items-start gap-2 mb-2 ${colorClass}`}>
      <Checkbox checked={checked} disabled className="mt-1" />
      <span className={checked ? "line-through opacity-60" : ""}>{renderRichText(text)}</span>
    </div>
  )
}
