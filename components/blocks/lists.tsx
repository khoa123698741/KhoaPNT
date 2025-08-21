import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"
import { cn } from "@/lib/utils"

interface ListItemProps {
  block: any
}

export function BulletedListBlock({ block }: ListItemProps) {
  const text = block.bulleted_list_item?.rich_text || []
  const color = block.bulleted_list_item?.color || "default"
  const colorClass = getNotionColorClass(color)

  return (
    <div className="flex items-start gap-2 bulleted-list-item">
      <span className="text-muted-foreground mt-1.5 text-sm">•</span>
      <div className={cn("flex-1", colorClass)}>{renderRichText(text)}</div>
    </div>
  )
}

export function NumberedListBlock({ block }: ListItemProps) {
  const text = block.numbered_list_item?.rich_text || []
  const color = block.numbered_list_item?.color || "default"
  const colorClass = getNotionColorClass(color)

  return (
    <div className="flex items-start gap-2 numbered-list-item">
      <span className="text-muted-foreground mt-1.5 text-sm min-w-[1.5rem]">1.</span>
      <div className={cn("flex-1", colorClass)}>{renderRichText(text)}</div>
    </div>
  )
}
