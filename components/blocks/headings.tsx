import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"

interface HeadingProps {
  block: any
}

export function HeadingOne({ block }: HeadingProps) {
  const { heading_1 } = block
  const colorClass = getNotionColorClass(heading_1?.color)

  return <h1 className={`text-3xl font-bold mb-4 ${colorClass}`}>{renderRichText(heading_1?.rich_text || [])}</h1>
}

export function HeadingTwo({ block }: HeadingProps) {
  const { heading_2 } = block
  const colorClass = getNotionColorClass(heading_2?.color)

  return <h2 className={`text-2xl font-semibold mb-3 ${colorClass}`}>{renderRichText(heading_2?.rich_text || [])}</h2>
}

export function HeadingThree({ block }: HeadingProps) {
  const { heading_3 } = block
  const colorClass = getNotionColorClass(heading_3?.color)

  return <h3 className={`text-xl font-medium mb-2 ${colorClass}`}>{renderRichText(heading_3?.rich_text || [])}</h3>
}
