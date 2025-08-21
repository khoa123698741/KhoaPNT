import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"

interface ParagraphProps {
  block: any
}

export function ParagraphBlock({ block }: ParagraphProps) {
  const { paragraph } = block
  const colorClass = getNotionColorClass(paragraph?.color)

  if (!paragraph?.rich_text || paragraph.rich_text.length === 0) {
    return <div className="mb-2"></div>
  }

  return <p className={`mb-2 leading-relaxed ${colorClass}`}>{renderRichText(paragraph.rich_text)}</p>
}
