import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"

interface ListProps {
  block: any
}

export function BulletedListBlock({ block }: ListProps) {
  const { bulleted_list_item } = block
  const colorClass = getNotionColorClass(bulleted_list_item?.color)

  return <li className={`mb-1 ${colorClass}`}>{renderRichText(bulleted_list_item?.rich_text || [])}</li>
}

export function NumberedListBlock({ block }: ListProps) {
  const { numbered_list_item } = block
  const colorClass = getNotionColorClass(numbered_list_item?.color)

  return <li className={`mb-1 ${colorClass}`}>{renderRichText(numbered_list_item?.rich_text || [])}</li>
}
