import Header from "@/components/header"
import Footer from "@/components/footer"
import { getNotionPage, getNotionPageInfo } from "@/lib/notion-api"
import { renderNotionBlock, extractPlainText } from "@/lib/notion-block-mapper"
import { PageControls } from "@/components/page-controls"
import type { Metadata } from "next"

// Enable ISR - trang sẽ được rebuild mỗi 1 giờ
export const revalidate = 3600 // 1 giờ

interface NotionPageProps {
  params: {
    pageId: string
  }
}

// Dynamic metadata for each Notion page
export async function generateMetadata({ params }: NotionPageProps): Promise<Metadata> {
  const pageInfo = await getNotionPageInfo(params.pageId)
  const title = extractPlainText(pageInfo?.properties?.title?.title || []) || "Notion Page"
  const description = extractPlainText(pageInfo?.properties?.description?.rich_text || []) || "Content from Notion"

  return {
    title: title,
    description: description,
  }
}

export default async function NotionPage({ params }: NotionPageProps) {
  const { pageId } = params

  if (!pageId) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16 max-w-3xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Lỗi: Thiếu Page ID</h1>
            <p className="text-muted-foreground">Không tìm thấy Page ID để hiển thị nội dung.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  try {
    const blocks = await getNotionPage(pageId)

    if (!blocks || blocks.length === 0) {
      return (
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="pt-16 max-w-3xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-yellow-600 mb-4">Không có nội dung</h1>
              <p className="text-muted-foreground">Không thể tải nội dung từ Notion. Vui lòng kiểm tra:</p>
              <ul className="mt-4 text-left max-w-md mx-auto space-y-2">
                <li>• NOTION_TOKEN có đúng không</li>
                <li>• Page ID ({pageId}) có đúng không</li>
                <li>• Đã share trang với integration chưa</li>
                <li>• Trang Notion có nội dung không (thử thêm một đoạn văn bản đơn giản)</li>
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16">
          <PageControls /> {/* Giữ lại PageControls cho trang nội dung */}
          <div className="notion-content">
            {blocks.map((block: any, index: number) => (
              <div key={block.id || index}>{renderNotionBlock(block)}</div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error(`Error rendering Notion content for page ${pageId}:`, error)

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16 max-w-3xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Lỗi kết nối</h1>
            <p className="text-muted-foreground">Không thể kết nối với Notion API hoặc tải nội dung trang.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
