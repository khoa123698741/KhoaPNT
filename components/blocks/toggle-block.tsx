"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { renderRichText, renderNotionBlock, getNotionColorClasses } from "@/lib/notion-block-mapper"

interface ToggleBlockProps {
  block: any
}

export function ToggleBlock({ block }: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const text = block.toggle?.rich_text || []
  const children = block.children || []
  const color = block.toggle?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors ${colorClass}`}
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        )}
        <span>{renderRichText(text)}</span>
      </button>

      {isOpen && children.length > 0 && (
        <div className="ml-6 mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          {children.map((child: any, index: number) => (
            <div key={child.id || index}>{renderNotionBlock(child)}</div>
          ))}
        </div>
      )}
    </div>
  )
}
