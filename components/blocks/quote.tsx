import { renderRichText, getNotionColorClasses, type NotionBlock } from "@/lib/notion-block-mapper"

export function QuoteBlock({ block }: { block: NotionBlock }) {
  const text = block.quote?.rich_text || []
  const color = block.quote?.color
  const colorClass = getNotionColorClasses(color)

  return (
    <blockquote
      className={`border-l-4 border-primary pl-6 py-2 italic text-muted-foreground bg-muted/30 rounded-r-lg mb-4 ${colorClass}`}
    >
      {renderRichText(text)}
    </blockquote>
  )
}
