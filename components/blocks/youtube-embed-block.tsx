"use client"

import { YouTubeEmbed } from "@next/third-parties/google"
import { extractPlainText, type NotionBlock } from "@/lib/notion-block-mapper"
import { AlertCircle } from "lucide-react"

interface YouTubeEmbedBlockProps {
  block: NotionBlock
}

// Function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[1].length === 11 ? match[1] : null
}

export function YouTubeEmbedBlock({ block }: YouTubeEmbedBlockProps) {
  const videoUrl = block.video?.external?.url || ""
  const caption = extractPlainText(block.video?.caption || [])
  const videoId = getYouTubeVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className="border border-border rounded-lg p-8 text-center bg-muted/20">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Không thể tải video YouTube</h3>
        <p className="text-muted-foreground mb-4">
          URL video không hợp lệ hoặc không phải là video YouTube. Vui lòng kiểm tra lại URL trong Notion.
        </p>
        {caption && <p className="text-sm text-muted-foreground mt-4">{caption}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="relative w-full overflow-hidden rounded-lg border border-border bg-black">
        <YouTubeEmbed
          videoid={videoId}
          height={400} // Chiều cao mặc định
          width="100%" // Chiều rộng full
          params="controls=1&modestbranding=1&rel=0" // Tùy chỉnh params
          style={{ borderRadius: "0.5rem" }}
          playlabel={caption || "Play video"}
        />
      </div>
      {caption && <p className="text-sm text-muted-foreground text-center">{caption}</p>}
    </div>
  )
}
