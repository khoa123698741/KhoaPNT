import { renderRichText, getNotionColorClass } from "@/lib/notion-block-mapper"
import { cn } from "@/lib/utils"

interface CalloutProps {
  block: any
}

export function CalloutBlock({ block }: CalloutProps) {
  const callout = block.callout || {}
  const text = callout.rich_text || []
  const icon = callout.icon?.emoji || "💡"
  const color = callout.color || "default"

  // Get background color class for callout
  const getCalloutColorClass = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      default: "bg-muted border-border",
      gray: "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700",
      brown: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
      orange: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      yellow: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      pink: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
      red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    }
    return colorMap[color] || colorMap["default"]
  }

  const backgroundColorClass = getCalloutColorClass(color)
  const textColorClass = getNotionColorClass(color)

  return (
    <div className={cn("flex items-start gap-3 p-4 rounded-lg border", backgroundColorClass)}>
      <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
      <div className={cn("flex-1", textColorClass)}>{renderRichText(text)}</div>
    </div>
  )
}
