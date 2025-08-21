import { type NextRequest, NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pageId = searchParams.get("pageId")

  if (!pageId) {
    return NextResponse.json({ error: "Page ID is required" }, { status: 400 })
  }

  if (!process.env.NOTION_TOKEN) {
    return NextResponse.json({ error: "NOTION_TOKEN không được cấu hình" }, { status: 500 })
  }

  try {
    // Kiểm tra quyền truy cập page trước
    const pageInfo = await notion.pages.retrieve({
      page_id: pageId,
    })

    // Lấy nội dung blocks
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    })

    return NextResponse.json({
      blocks: response.results,
      pageInfo: pageInfo,
    })
  } catch (error: any) {
    console.error("Notion API Error:", error)

    // Xử lý các loại lỗi khác nhau
    if (error.code === "unauthorized") {
      return NextResponse.json(
        {
          error: "Không có quyền truy cập. Vui lòng kiểm tra NOTION_TOKEN hoặc share page với integration.",
        },
        { status: 401 },
      )
    }

    if (error.code === "object_not_found") {
      return NextResponse.json(
        {
          error: "Không tìm thấy page. Kiểm tra NOTION_PAGE_ID hoặc quyền truy cập.",
        },
        { status: 404 },
      )
    }

    if (error.code === "restricted_resource") {
      return NextResponse.json(
        {
          error: "Page bị hạn chế truy cập. Vui lòng yêu cầu admin workspace share page với integration.",
        },
        { status: 403 },
      )
    }

    return NextResponse.json(
      {
        error: `Lỗi Notion API: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
