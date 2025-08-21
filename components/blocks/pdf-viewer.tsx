"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ExternalLink } from "lucide-react"

interface PDFViewerProps {
  url: string
  caption?: string
}

export function PDFViewer({ url, caption }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleViewPDF = () => {
    setIsLoading(true)
    // Mở PDF trong tab mới
    window.open(url, "_blank")
    setIsLoading(false)
  }

  return (
    <Card className="my-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-red-500" />
            <div>
              <p className="font-medium">{caption || "PDF Document"}</p>
              <p className="text-sm text-muted-foreground">Click để xem PDF</p>
            </div>
          </div>
          <Button onClick={handleViewPDF} disabled={isLoading} className="flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>{isLoading ? "Đang tải..." : "Xem PDF"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
