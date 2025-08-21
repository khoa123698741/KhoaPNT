import { renderRichText, renderNotionBlock, getNotionColorClasses, type NotionBlock } from "@/lib/notion-block-mapper"

export function BulletedListBlock({ block }: { block: NotionBlock }) {
  const text = block.bulleted_list_item?.rich_text || []
  const color = block.bulleted_list_item?.color
  const colorClass = getNotionColorClasses(color)
  const childrenBlocks = block.children || []

  return (
    <div className="space-y-1 mb-2">
      <div className="flex items-start">
        <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
        <div className={`flex-1 ${colorClass}`}>
          <span className="leading-relaxed">{renderRichText(text)}</span>
        </div>
      </div>

      {childrenBlocks.length > 0 && (
        <div className="ml-6 space-y-2">
          {childrenBlocks.map((childBlock: NotionBlock) => (
            <div key={childBlock.id}>{renderNotionBlock(childBlock)}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export function NumberedListBlock({ block, index = 1 }: { block: NotionBlock; index?: number }) {
  const text = block.numbered_list_item?.rich_text || []
  const color = block.numbered_list_item?.color
  const colorClass = getNotionColorClasses(color)
  const childrenBlocks = block.children || []

  return (
    <div className="space-y-1 mb-2">
      <div className="flex items-start">
        <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-1 flex-shrink-0">
          {index}
        </span>
        <div className={`flex-1 ${colorClass}`}>
          <span className="leading-relaxed">{renderRichText(text)}</span>
        </div>
      </div>

      {childrenBlocks.length > 0 && (
        <div className="ml-8 space-y-2">
          {childrenBlocks.map((childBlock: NotionBlock) => (
            <div key={childBlock.id}>{renderNotionBlock(childBlock)}</div>
          ))}
        </div>
      )}
    </div>
  )
}
