"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { renderRichText, renderNotionBlock, getNotionColorClasses, type NotionBlock } from "@/lib/notion-block-mapper"

interface ToggleBlockProps {
  block: NotionBlock
}

export function ToggleBlock({ block }: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const text = block.toggle?.rich_text || []
  const color = block.toggle?.color
  const colorClass = getNotionColorClasses(color)
  const childrenBlocks = block.children || []

  return (
    <div className="space-y-1 mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-start w-full text-left py-1 px-1 rounded-sm hover:bg-muted/30 transition-colors group min-h-[28px] ${colorClass}`}
        aria-expanded={isOpen}
        aria-controls={`toggle-content-${block.id}`}
      >
        <span className="flex-shrink-0 mr-1 text-muted-foreground group-hover:text-foreground transition-colors mt-0.5">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
        <span className="text-foreground leading-relaxed flex-1">{renderRichText(text)}</span>
      </button>

      {isOpen && childrenBlocks.length > 0 && (
        <div id={`toggle-content-${block.id}`} className="ml-5 space-y-2 border-l border-border/30 pl-4 py-1">
          {childrenBlocks.map((childBlock: NotionBlock) => (
            <div key={childBlock.id} className="notion-nested-content">
              {renderNotionBlock(childBlock)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
