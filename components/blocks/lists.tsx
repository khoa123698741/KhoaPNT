import { renderRichText, getNotionColorClasses } from "@/lib/notion-block-mapper"

interface ListProps {
  block: any
}

export function BulletedListBlock({ block }: ListProps) {
  const text = block.bulleted_list_item?.rich_text || []
  const color = block.bulleted_list_item?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return (
    <ul className="mb-2">
      <li className={`ml-6 list-disc ${colorClass}`}>{renderRichText(text)}</li>
    </ul>
  )
}

export function NumberedListBlock({ block }: ListProps) {
  const text = block.numbered_list_item?.rich_text || []
  const color = block.numbered_list_item?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return (
    <ol className="mb-2">
      <li className={`ml-6 list-decimal ${colorClass}`}>{renderRichText(text)}</li>
    </ol>
  )
}
