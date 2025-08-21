import { renderRichText, getNotionColorClasses } from "@/lib/notion-block-mapper"

interface HeadingProps {
  block: any
}

export function HeadingOne({ block }: HeadingProps) {
  const text = block.heading_1?.rich_text || []
  const color = block.heading_1?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return <h1 className={`text-3xl font-bold mb-6 ${colorClass}`}>{renderRichText(text)}</h1>
}

export function HeadingTwo({ block }: HeadingProps) {
  const text = block.heading_2?.rich_text || []
  const color = block.heading_2?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return <h2 className={`text-2xl font-semibold mb-4 ${colorClass}`}>{renderRichText(text)}</h2>
}

export function HeadingThree({ block }: HeadingProps) {
  const text = block.heading_3?.rich_text || []
  const color = block.heading_3?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return <h3 className={`text-xl font-medium mb-3 ${colorClass}`}>{renderRichText(text)}</h3>
}
