"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { renderRichText, renderNotionBlock, getNotionColorClass } from "@/lib/notion-block-mapper"

interface ToggleBlockProps {
  block: any
}

export function ToggleBlock({ block }: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toggle } = block
  const colorClass = getNotionColorClass(toggle?.color)

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded ${colorClass}`}
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        )}
        <span>{renderRichText(toggle?.rich_text || [])}</span>
      </button>

      {isOpen && block.children && (
        <div className="ml-6 mt-2">
          {block.children.map((childBlock: any, index: number) => (
            <div key={childBlock.id || index}>{renderNotionBlock(childBlock)}</div>
          ))}
        </div>
      )}
    </div>
  )
}
