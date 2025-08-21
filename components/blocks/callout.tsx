import { renderRichText, getNotionColorClasses } from "@/lib/notion-block-mapper"
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface CalloutProps {
  block: any
}

export function CalloutBlock({ block }: CalloutProps) {
  const text = block.callout?.rich_text || []
  const icon = block.callout?.icon
  const color = block.callout?.color
  const colorClass = getNotionColorClasses(color)

  if (!text.length) return null

  // Get icon component based on emoji or default
  const getIconComponent = () => {
    if (icon?.emoji) {
      return <span className="text-lg">{icon.emoji}</span>
    }

    // Default icons based on color
    switch (color) {
      case "red":
      case "red_background":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "yellow":
      case "yellow_background":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "green":
      case "green_background":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div
      className={`flex gap-3 p-4 rounded-lg mb-4 border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 ${colorClass}`}
    >
      <div className="flex-shrink-0 mt-0.5">{getIconComponent()}</div>
      <div className="flex-1">{renderRichText(text)}</div>
    </div>
  )
}
