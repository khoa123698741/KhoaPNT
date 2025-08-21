import { FileText, Download } from "lucide-react"

interface FileViewerProps {
  block: any
}

export function FileViewer({ block }: FileViewerProps) {
  const { file } = block
  const url = file?.external?.url || file?.file?.url
  const name = file?.name || "File"

  if (!url) return null

  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg mb-4 hover:bg-gray-50 dark:hover:bg-gray-800">
      <FileText className="w-6 h-6 text-blue-600" />
      <div className="flex-1">
        <p className="font-medium">{name}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <Download className="w-4 h-4" />
        Download
      </a>
    </div>
  )
}
