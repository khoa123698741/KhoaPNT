import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"
import { cn } from "@/lib/utils"

interface TodoListProps {
  block: any
}

export function TodoListBlock({ block }: TodoListProps) {
  const todo = block.to_do || {}
  const text = todo.rich_text || []
  const checked = todo.checked || false
  const color = todo.color || "default"
  const colorClass = getNotionColorClass(color)

  return (
    <div className="flex items-start gap-2">
      <input type="checkbox" checked={checked} readOnly className="mt-1.5 rounded border-border" />
      <div className={cn("flex-1", checked && "line-through opacity-60", colorClass)}>{renderRichText(text)}</div>
    </div>
  )
}
