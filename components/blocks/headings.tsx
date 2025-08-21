import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"
import { cn } from "@/lib/utils"

interface HeadingProps {
  block: any
}

export function HeadingOne({ block }: HeadingProps) {
  const text = block.heading_1?.rich_text || []
  const color = block.heading_1?.color || "default"
  const colorClass = getNotionColorClass(color)

  return <h1 className={cn("text-3xl font-bold mb-4", colorClass)}>{renderRichText(text)}</h1>
}

export function HeadingTwo({ block }: HeadingProps) {
  const text = block.heading_2?.rich_text || []
  const color = block.heading_2?.color || "default"
  const colorClass = getNotionColorClass(color)

  return <h2 className={cn("text-2xl font-semibold mb-3", colorClass)}>{renderRichText(text)}</h2>
}

export function HeadingThree({ block }: HeadingProps) {
  const text = block.heading_3?.rich_text || []
  const color = block.heading_3?.color || "default"
  const colorClass = getNotionColorClass(color)

  return <h3 className={cn("text-xl font-medium mb-2", colorClass)}>{renderRichText(text)}</h3>
}
