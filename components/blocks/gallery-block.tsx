import Image from "next/image"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getNotionDatabasePages } from "@/lib/notion-api"
import type { NotionBlock } from "@/lib/notion-block-mapper"
import { AlertCircle, ExternalLink } from "lucide-react"

interface GalleryBlockProps {
  block: NotionBlock
}

export async function GalleryBlock({ block }: GalleryBlockProps) {
  let databaseId: string | undefined

  if (block.type === "child_database") {
    databaseId = block.id
  } else if (block.type === "link_to_page") {
    databaseId = block.link_to_page?.database_id
  }

  if (!databaseId) {
    return (
      <div className="border border-border rounded-lg p-8 text-center bg-muted/20">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Không thể tải Gallery</h3>
        <p className="text-muted-foreground mb-4">
          Không tìm thấy ID database cho khối Gallery này. Vui lòng kiểm tra lại cấu hình trong Notion.
        </p>
      </div>
    )
  }

  const items = await getNotionDatabasePages(databaseId)

  if (!items || items.length === 0) {
    return (
      <div className="border border-border rounded-lg p-8 text-center bg-muted/20">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Không có mục nào trong Gallery</h3>
        <p className="text-muted-foreground mb-4">Database này không có mục nào hoặc không thể truy cập được.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-medium text-foreground mt-10 mb-4">{block.child_database?.title || "Gallery"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link href={`/notion/${item.id}`} key={item.id} className="block">
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group">
              {item.cover && (
                <div className="relative w-full h-48 bg-muted overflow-hidden">
                  <Image
                    src={item.cover || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="truncate">{item.title}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-2" />
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
