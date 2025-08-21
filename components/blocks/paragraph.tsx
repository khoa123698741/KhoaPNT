import { renderRichText, getNotionColorClasses, type NotionBlock } from "@/lib/notion-block-mapper"

export function ParagraphBlock({ block }: { block: NotionBlock }) {
  const text = block.paragraph?.rich_text || []
  const color = block.paragraph?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return <div className="h-4" />

  return <p className={`text-base leading-relaxed text-foreground mb-4 ${colorClass}`}>{renderRichText(text)}</p>
}
