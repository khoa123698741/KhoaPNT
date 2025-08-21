import { getNotionColorClass } from "@/lib/notion-block-mapper"

interface CodeBlockProps {
  block: any
}

export function CodeBlock({ block }: CodeBlockProps) {
  const { code } = block
  const colorClass = getNotionColorClass(code?.color)

  return (
    <pre className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 ${colorClass}`}>
      <code className="text-sm font-mono">{code?.rich_text?.map((text: any) => text.plain_text).join("") || ""}</code>
    </pre>
  )
}
