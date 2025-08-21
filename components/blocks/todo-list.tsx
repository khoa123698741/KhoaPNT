"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { renderRichText, type NotionBlock } from "@/lib/notion-block-mapper"

export function TodoListBlock({ block }: { block: NotionBlock }) {
  const text = block.to_do?.rich_text || []
  const initialChecked = block.to_do?.checked || false
  const [checked, setChecked] = useState(initialChecked)

  return (
    <div className="flex items-center space-x-3">
      <Checkbox id={`todo-${block.id}`} checked={checked} onCheckedChange={(value) => setChecked(!!value)} />
      <label
        htmlFor={`todo-${block.id}`}
        className={`text-sm cursor-pointer ${checked ? "line-through text-muted-foreground" : "text-foreground"}`}
      >
        {renderRichText(text)}
      </label>
    </div>
  )
}
