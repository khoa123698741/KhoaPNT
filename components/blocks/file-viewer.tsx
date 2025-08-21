"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { File, ExternalLink, Download } from "lucide-react"

interface FileViewerProps {
  url: string
  name?: string
  size?: string
}

export function FileViewer({ url, name, size }: FileViewerProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleViewFile = () => {
    setIsLoading(true)
    // Mở file trong tab mới
    window.open(url, "_blank")
    setIsLoading(false)
  }

  const handleDownloadFile = () => {
    // Tạo link download
    const link = document.createElement("a")
    link.href = url
    link.download = name || "file"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="my-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <File className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-medium">{name || "File"}</p>
              {size && <p className="text-sm text-muted-foreground">{size}</p>}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleViewFile}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-transparent"
            >
              <ExternalLink className="h-4 w-4" />
              <span>{isLoading ? "Đang tải..." : "Xem file"}</span>
            </Button>
            <Button
              onClick={handleDownloadFile}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              <span>Tải về</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
