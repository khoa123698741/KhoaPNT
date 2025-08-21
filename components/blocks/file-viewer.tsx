"use client"

import { FileText, ExternalLink, File, ImageIcon, Video, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { extractPlainText, type NotionBlock } from "@/lib/notion-block-mapper"

interface FileViewerProps {
  block: NotionBlock
}

export function FileViewer({ block }: FileViewerProps) {
  const fileUrl = block.file?.file?.url || block.file?.external?.url || ""
  const caption = extractPlainText(block.file?.caption || [])
  const fileName = block.file?.name || caption || "File"

  // Xác định loại file từ extension
  const getFileType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (!extension) return "file"

    if (["pdf"].includes(extension)) return "pdf"
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) return "image"
    if (["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(extension)) return "video"
    if (["mp3", "wav", "ogg", "m4a", "flac"].includes(extension)) return "audio"
    if (["doc", "docx", "txt", "rtf"].includes(extension)) return "document"
    if (["xls", "xlsx", "csv"].includes(extension)) return "spreadsheet"
    if (["ppt", "pptx"].includes(extension)) return "presentation"
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) return "archive"

    return "file"
  }

  const fileType = getFileType(fileName)

  const getFileIcon = () => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "image":
        return <ImageIcon className="h-8 w-8 text-green-500" />
      case "video":
        return <Video className="h-8 w-8 text-blue-500" />
      case "audio":
        return <Music className="h-8 w-8 text-purple-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const handleFileAccess = () => {
    window.open(fileUrl, "_blank")
  }

  if (!fileUrl) {
    return (
      <div className="border border-border rounded-lg p-8 text-center">
        <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Không thể tải file</p>
      </div>
    )
  }

  return (
    <div className="border border-border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">{getFileIcon()}</div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{fileName}</h4>
            {caption && caption !== fileName && <p className="text-sm text-muted-foreground mt-1">{caption}</p>}
          </div>

          <div className="flex items-center">
            <Button size="sm" onClick={handleFileAccess}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Xem file
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
