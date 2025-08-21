import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Improved recursive function to fetch all children blocks with better error handling
async function getBlocksWithChildren(blockId: string, depth = 0): Promise<any[]> {
  // Prevent infinite recursion
  if (depth > 10) {
    console.warn(`Max depth reached for block ${blockId}`)
    return []
  }

  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    })

    const blocksWithChildren = await Promise.all(
      response.results.map(async (block: any) => {
        if (block.has_children) {
          try {
            // Recursively fetch children for blocks that have them
            block.children = await getBlocksWithChildren(block.id, depth + 1)
          } catch (error) {
            console.error(`Error fetching children for block ${block.id}:`, error)
            block.children = []
          }
        }
        return block
      }),
    )

    return blocksWithChildren
  } catch (error) {
    console.error(`Error fetching blocks for ${blockId}:`, error)
    return []
  }
}

export async function getNotionPage(pageId: string) {
  try {
    // Use the improved recursive function to get all blocks including children
    const blocks = await getBlocksWithChildren(pageId)
    return blocks
  } catch (error) {
    console.error("Error fetching Notion page:", error)
    return []
  }
}

export async function getNotionPageInfo(pageId: string) {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    })

    return response
  } catch (error) {
    console.error("Error fetching page info:", error)
    return null
  }
}

export async function getNotionDatabasePages(databaseId: string) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
    })

    return response.results.map((page: any) => {
      // Extract title (assuming a 'title' property exists)
      const titleProperty = Object.values(page.properties).find((prop: any) => prop.type === "title") as any
      const title = titleProperty?.title?.[0]?.plain_text || "Untitled"

      // Extract cover image URL
      const cover = page.cover?.file?.url || page.cover?.external?.url || null

      return {
        id: page.id,
        title: title,
        cover: cover,
        url: `/notion/${page.id}`, // Add explicit URL for debugging
      }
    })
  } catch (error) {
    console.error("Error fetching Notion database pages:", error)
    return []
  }
}
