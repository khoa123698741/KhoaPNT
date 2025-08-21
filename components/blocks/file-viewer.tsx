"use client"

import { FileText, ExternalLink, File, ImageIcon, Video, Music, AlertCircle } from "lucide-react"
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
    alert(
      `Liên kết file "${fileName}" có thể đã hết hạn. Notion tạo ra các liên kết tạm thời chỉ có hiệu lực trong 1 giờ. Vui lòng refresh trang để tải lại nội dung mới.`,
    )
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

      {/* Cảnh báo về URL hết hạn */}
      <div className="px-6 pb-4">
        <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            File từ Notion có liên kết tạm thời (1 giờ). Nếu không truy cập được, refresh trang.
          </p>
        </div>
      </div>
    </div>
  )
}
