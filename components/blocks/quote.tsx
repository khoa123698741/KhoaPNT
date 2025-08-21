import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"
import { cn } from "@/lib/utils"

interface QuoteProps {
  block: any
}

export function QuoteBlock({ block }: QuoteProps) {
  const text = block.quote?.rich_text || []
  const color = block.quote?.color || "default"
  const colorClass = getNotionColorClass(color)

  return (
    <blockquote className={cn("border-l-4 border-muted-foreground/30 pl-4 italic", colorClass)}>
      {renderRichText(text)}
    </blockquote>
  )
}
