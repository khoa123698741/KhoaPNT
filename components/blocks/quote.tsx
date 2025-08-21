import { renderRichText, getNotionColorClasses } from "@/lib/notion-block-mapper"

interface QuoteProps {
  block: any
}

export function QuoteBlock({ block }: QuoteProps) {
  const text = block.quote?.rich_text || []
  const color = block.quote?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return (
    <blockquote className={`border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-4 italic ${colorClass}`}>
      {renderRichText(text)}
    </blockquote>
  )
}
