import { renderRichText, getNotionColorClasses } from "@/lib/notion-block-mapper"

interface ParagraphProps {
  block: any
}

export function ParagraphBlock({ block }: ParagraphProps) {
  const text = block.paragraph?.rich_text || []
  const color = block.paragraph?.color
  const colorClass = getNotionColorClasses(color)

  // Return empty div for empty paragraphs to maintain spacing
  if (!text.length) {
    return <div className="mb-4" />
  }

  return <p className={`mb-4 leading-relaxed ${colorClass}`}>{renderRichText(text)}</p>
}
