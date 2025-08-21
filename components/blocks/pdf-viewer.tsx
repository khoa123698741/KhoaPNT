"use client"

import { useState } from "react"
import { ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  url: string
  caption?: string
}

export function PDFViewer({ url, caption }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleOpenInNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = url
    link.download = caption || "document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full my-4">
      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 border-b">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{caption || "PDF Document"}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              className="flex items-center gap-1 bg-transparent"
            >
              <ExternalLink className="h-4 w-4" />
              Mở trong tab mới
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-1 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Tải xuống
            </Button>
          </div>
        </div>

        <div className="relative" style={{ height: "600px" }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
          )}
          <iframe
            src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            title={caption || "PDF Document"}
          />
        </div>
      </div>

      {caption && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">{caption}</p>}
    </div>
  )
}
