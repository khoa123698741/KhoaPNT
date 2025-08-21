import { getNotionPage } from "@/lib/notion-api"
import { renderNotionBlock } from "@/lib/notion-block-mapper"
import { PageControls } from "@/components/page-controls"

export default async function NotionRenderer() {
  // Sửa từ NOTION_PAGE_ID thành NEXT_PUBLIC_NOTION_PAGE_ID
  const pageId = process.env.NEXT_PUBLIC_NOTION_PAGE_ID

  console.log("NotionRenderer - pageId:", pageId) // Debug log

  if (!pageId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Cấu hình thiếu</h1>
          <p className="text-muted-foreground">Vui lòng thêm NEXT_PUBLIC_NOTION_PAGE_ID vào environment variables</p>
          <p className="text-sm text-gray-500 mt-2">Current pageId: {pageId || "undefined"}</p>
        </div>
      </div>
    )
  }

  try {
    console.log("Fetching blocks for pageId:", pageId) // Debug log
    const blocks = await getNotionPage(pageId)
    console.log("Blocks received:", blocks?.length || 0) // Debug log

    if (!blocks || blocks.length === 0) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-yellow-600 mb-4">Không có nội dung</h1>
            <p className="text-muted-foreground">Không thể tải nội dung từ Notion. Vui lòng kiểm tra:</p>
            <ul className="mt-4 text-left max-w-md mx-auto space-y-2">
              <li>• NOTION_TOKEN có đúng không</li>
              <li>• NEXT_PUBLIC_NOTION_PAGE_ID có đúng không</li>
              <li>• Đã share trang với integration chưa</li>
              <li>• Trang Notion có nội dung không (thử thêm một đoạn văn bản đơn giản)</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              <p>
                <strong>Debug Info:</strong>
              </p>
              <p>Page ID: {pageId}</p>
              <p>Blocks length: {blocks?.length || 0}</p>
              <p>NOTION_TOKEN exists: {process.env.NOTION_TOKEN ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )
    }

    console.log("Rendering blocks:", blocks.length) // Debug log

    return (
      <>
        <PageControls />
        <div className="notion-content max-w-3xl mx-auto px-4 py-8">
          {blocks.map((block: any, index: number) => {
            console.log(`Rendering block ${index}:`, block.type, block.id) // Debug log
            return <div key={block.id || index}>{renderNotionBlock(block)}</div>
          })}
        </div>
      </>
    )
  } catch (error) {
    console.error("Error rendering Notion content:", error)

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Lỗi kết nối</h1>
          <p className="text-muted-foreground">Không thể kết nối với Notion API. Vui lòng kiểm tra cấu hình.</p>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm">
            <p>
              <strong>Error Details:</strong>
            </p>
            <p>{error instanceof Error ? error.message : "Unknown error"}</p>
            <p>Page ID: {pageId}</p>
          </div>
        </div>
      </div>
    )
  }
}
