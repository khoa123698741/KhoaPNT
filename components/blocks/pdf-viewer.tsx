"use client"

import { useState } from "react"
import { FileText, Maximize2, Minimize2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { extractPlainText, type NotionBlock } from "@/lib/notion-block-mapper"

interface PDFViewerProps {
  block: NotionBlock
}

export function PDFViewer({ block }: PDFViewerProps) {
  const [isPDFFullWidth, setIsPDFFullWidth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const pdfUrl = block.pdf?.file?.url || block.pdf?.external?.url || ""
  const caption = extractPlainText(block.pdf?.caption || [])
  const fileName = caption || "Document.pdf"

  if (!pdfUrl) {
    return (
      <div className="border border-border rounded-lg p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Không thể tải PDF</p>
      </div>
    )
  }

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank")
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className="border border-border rounded-lg p-8 text-center bg-muted/20">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">PDF không thể tải</h3>
        <p className="text-muted-foreground mb-4">Không thể hiển thị PDF. Thử mở trong tab mới.</p>
        <Button onClick={handleOpenInNewTab} variant="outline" className="mb-2 bg-transparent">
          Mở PDF trong tab mới
        </Button>
        {caption && <p className="text-sm text-muted-foreground mt-4">{caption}</p>}
      </div>
    )
  }

  return (
    <div className={`transition-all duration-300 ${isPDFFullWidth ? "pdf-full-width" : ""}`}>
      {/* PDF Controls - chỉ hiển thị khi hover */}
      <div className="group relative">
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPDFFullWidth(!isPDFFullWidth)}
            className="h-8 px-2"
            title={isPDFFullWidth ? "Thu nhỏ PDF" : "Mở rộng PDF"}
          >
            {isPDFFullWidth ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" size="sm" onClick={handleOpenInNewTab} className="h-8 px-2" title="Mở trong tab mới">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* PDF Embed - ẩn toolbar */}
        <div className="relative rounded-lg overflow-hidden bg-white border border-border">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-sm text-muted-foreground">Đang tải PDF...</span>
              </div>
            </div>
          )}

          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0`}
            className={`w-full border-0 ${isPDFFullWidth ? "h-[85vh]" : "h-[600px]"}`}
            title={fileName}
            onLoad={() => setIsLoading(false)}
            onError={handleIframeError}
            style={{
              border: "none",
              outline: "none",
            }}
          />
        </div>
      </div>

      {caption && <p className="text-sm text-muted-foreground text-center mt-2 px-4">{caption}</p>}
    </div>
  )
}
