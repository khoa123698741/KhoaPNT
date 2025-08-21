"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download } from "lucide-react"

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
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      {caption && (
        <div className="px-4 py-2 bg-muted border-b">
          <p className="text-sm font-medium text-muted-foreground">{caption}</p>
        </div>
      )}

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        <iframe
          src={url}
          className="w-full h-[600px] border-0"
          title={caption || "PDF Document"}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="px-4 py-3 bg-muted/50 border-t flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenInNewTab}
          className="flex items-center gap-2 bg-transparent"
        >
          <ExternalLink className="h-4 w-4" />
          Mở trong tab mới
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Tải xuống
        </Button>
      </div>
    </div>
  )
}
