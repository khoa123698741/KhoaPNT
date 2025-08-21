"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { extractPlainText, type NotionBlock } from "@/lib/notion-block-mapper"

export function CodeBlock({ block }: { block: NotionBlock }) {
  const code = extractPlainText(block.code?.rich_text || [])
  const language = block.code?.language || "javascript"
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
        <span className="text-sm text-gray-300 capitalize">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="ml-1 text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
