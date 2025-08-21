import { renderRichText, getNotionColorClasses, type NotionBlock } from "@/lib/notion-block-mapper"

export function HeadingOne({ block }: { block: NotionBlock }) {
  const text = block.heading_1?.rich_text || []
  const color = block.heading_1?.color
  const colorClass = getNotionColorClasses(color)

  return <h1 className={`text-4xl font-bold text-foreground mb-6 ${colorClass}`}>{renderRichText(text)}</h1>
}

export function HeadingTwo({ block }: { block: NotionBlock }) {
  const text = block.heading_2?.rich_text || []
  const color = block.heading_2?.color
  const colorClass = getNotionColorClasses(color)

  return <h2 className={`text-3xl font-semibold text-foreground mt-12 mb-6 ${colorClass}`}>{renderRichText(text)}</h2>
}

export function HeadingThree({ block }: { block: NotionBlock }) {
  const text = block.heading_3?.rich_text || []
  const color = block.heading_3?.color
  const colorClass = getNotionColorClasses(color)

  return <h3 className={`text-2xl font-medium text-foreground mt-10 mb-4 ${colorClass}`}>{renderRichText(text)}</h3>
}
