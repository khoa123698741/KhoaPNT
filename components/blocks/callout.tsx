import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"

interface CalloutProps {
  block: any
}

export function CalloutBlock({ block }: CalloutProps) {
  const { callout } = block
  const colorClass = getNotionColorClass(callout?.color)
  const icon = callout?.icon?.emoji || "💡"

  return (
    <div className={`flex gap-3 p-4 rounded-lg border bg-gray-50 dark:bg-gray-800 mb-4 ${colorClass}`}>
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div className="flex-1">{renderRichText(callout?.rich_text || [])}</div>
    </div>
  )
}
