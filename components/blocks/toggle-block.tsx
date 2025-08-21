"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { renderRichText, renderNotionBlock, getNotionColorClass } from "@/lib/notion-block-mapper"
import { cn } from "@/lib/utils"

interface ToggleBlockProps {
  block: any
}

export function ToggleBlock({ block }: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = block.toggle || {}
  const text = toggle.rich_text || []
  const children = block.children || []
  const color = toggle.color || "default"
  const colorClass = getNotionColorClass(color)

  return (
    <div className="toggle-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("flex items-center gap-2 w-full text-left hover:bg-muted/50 rounded p-1 -ml-1", colorClass)}
      >
        <ChevronRight className={cn("h-4 w-4 transition-transform flex-shrink-0", isOpen && "rotate-90")} />
        <div className="flex-1">{renderRichText(text)}</div>
      </button>

      {isOpen && children.length > 0 && (
        <div className="toggle-content">
          <div className="notion-nested-content">
            {children.map((child: any, index: number) => (
              <div key={child.id || index}>{renderNotionBlock(child)}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
