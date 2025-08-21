import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"
import { cn } from "@/lib/utils"

interface ParagraphProps {
  block: any
}

export function ParagraphBlock({ block }: ParagraphProps) {
  const text = block.paragraph?.rich_text || []
  const color = block.paragraph?.color || "default"
  const colorClass = getNotionColorClass(color)

  if (text.length === 0) {
    return <div className="h-4" />
  }

  return <p className={cn("leading-relaxed", colorClass)}>{renderRichText(text)}</p>
}
