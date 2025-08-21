import Image from "next/image"
import { extractPlainText, type NotionBlock } from "@/lib/notion-block-mapper"

export function ImageBlock({ block }: { block: NotionBlock }) {
  const imageUrl = block.image?.file?.url || block.image?.external?.url || ""
  const caption = extractPlainText(block.image?.caption || [])

  if (!imageUrl) return null

  return (
    <div className="space-y-2 mb-4">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={caption || "Image"}
        width={800}
        height={400}
        className="w-full rounded-lg border border-border"
      />
      {caption && <p className="text-sm text-muted-foreground text-center">{caption}</p>}
    </div>
  )
}
