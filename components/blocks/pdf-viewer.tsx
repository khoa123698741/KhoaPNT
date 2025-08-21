import { FileText, ExternalLink } from "lucide-react"

interface PDFViewerProps {
  block: any
}

export function PDFViewer({ block }: PDFViewerProps) {
  const { pdf } = block
  const url = pdf?.external?.url || pdf?.file?.url
  const caption = pdf?.caption?.map((text: any) => text.plain_text).join("") || ""

  if (!url) return null

  return (
    <div className="mb-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            <span className="font-medium">PDF Document</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-4 h-4" />
            Open PDF
          </a>
        </div>
        <div className="h-96">
          <iframe src={url} className="w-full h-full" title="PDF Viewer" />
        </div>
      </div>
      {caption && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{caption}</p>}
    </div>
  )
}
