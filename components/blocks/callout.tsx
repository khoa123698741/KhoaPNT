import { Lightbulb, Info, AlertTriangle } from "lucide-react"
import { renderRichText, type NotionBlock } from "@/lib/notion-block-mapper"

export function CalloutBlock({ block }: { block: NotionBlock }) {
  const text = block.callout?.rich_text || []
  const emoji = block.callout?.icon?.emoji

  // Default to lightbulb if no emoji provided
  const getIcon = () => {
    if (emoji === "💡") return <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
    if (emoji === "ℹ️") return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    if (emoji === "⚠️") return <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
    return <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
  }

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{emoji ? <span className="text-lg">{emoji}</span> : getIcon()}</div>
      <div className="text-sm text-yellow-700 dark:text-yellow-300">{renderRichText(text)}</div>
    </div>
  )
}
