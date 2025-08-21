import { renderRichText, type NotionBlock } from "@/lib/notion-block-mapper"

export function ParagraphBlock({ block }: { block: NotionBlock }) {
  const text = block.paragraph?.rich_text || []

  if (!text.length) return null

  return <p className="text-base leading-relaxed text-foreground">{renderRichText(text)}</p>
}
