"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { renderRichText, getNotionColorClasses, type NotionBlock } from "@/lib/notion-block-mapper"

export function TodoListBlock({ block }: { block: NotionBlock }) {
  const text = block.to_do?.rich_text || []
  const color = block.to_do?.color
  const colorClass = getNotionColorClasses(color)
  const initialChecked = block.to_do?.checked || false
  const [checked, setChecked] = useState(initialChecked)

  return (
    <div className="flex items-center space-x-3 mb-2">
      <Checkbox id={`todo-${block.id}`} checked={checked} onCheckedChange={(value) => setChecked(!!value)} />
      <label
        htmlFor={`todo-${block.id}`}
        className={`text-sm cursor-pointer ${checked ? "line-through text-muted-foreground" : "text-foreground"} ${colorClass}`}
      >
        {renderRichText(text)}
      </label>
    </div>
  )
}
