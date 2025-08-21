import { Lightbulb, Info, AlertTriangle } from "lucide-react"
import { renderRichText, getNotionColorClasses, type NotionBlock } from "@/lib/notion-block-mapper"

export function CalloutBlock({ block }: { block: NotionBlock }) {
  const text = block.callout?.rich_text || []
  const emoji = block.callout?.icon?.emoji
  const color = block.callout?.color

  // Get background color for callout based on color
  const getCalloutBgClass = (color?: string) => {
    if (!color || color === "default") return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"

    const bgMap: { [key: string]: string } = {
      gray: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
      brown: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
      orange: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      yellow: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      pink: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
      red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    }

    return bgMap[color] || bgMap["blue"]
  }

  const textColorClass = getNotionColorClasses(color)
  const bgClass = getCalloutBgClass(color)

  // Default to lightbulb if no emoji provided
  const getIcon = () => {
    if (emoji === "💡") return <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
    if (emoji === "ℹ️") return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    if (emoji === "⚠️") return <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
    return <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
  }

  return (
    <div className={`${bgClass} rounded-lg p-4 flex items-start gap-3 mb-4`}>
      <div className="mt-0.5 flex-shrink-0">{emoji ? <span className="text-lg">{emoji}</span> : getIcon()}</div>
      <div className={`text-sm ${textColorClass || "text-yellow-700 dark:text-yellow-300"}`}>
        {renderRichText(text)}
      </div>
    </div>
  )
}
