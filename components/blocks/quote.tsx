import { renderRichText, type NotionBlock } from "@/lib/notion-block-mapper"

export function QuoteBlock({ block }: { block: NotionBlock }) {
  const text = block.quote?.rich_text || []

  return (
    <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground bg-muted/30 rounded-r-lg">
      {renderRichText(text)}
    </blockquote>
  )
}
