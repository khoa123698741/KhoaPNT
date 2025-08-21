import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"

interface QuoteProps {
  block: any
}

export function QuoteBlock({ block }: QuoteProps) {
  const { quote } = block
  const colorClass = getNotionColorClass(quote?.color)

  return (
    <blockquote className={`border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-4 italic ${colorClass}`}>
      {renderRichText(quote?.rich_text || [])}
    </blockquote>
  )
}
