import type React from "react"
import { HeadingOne, HeadingTwo, HeadingThree } from "@/components/blocks/headings"
import { ParagraphBlock } from "@/components/blocks/paragraph"
import { BulletedListBlock, NumberedListBlock } from "@/components/blocks/lists"
import { TodoListBlock } from "@/components/blocks/todo-list"
import { QuoteBlock } from "@/components/blocks/quote"
import { CodeBlock } from "@/components/blocks/code-block"
import { ImageBlock } from "@/components/blocks/image"
import { DividerBlock } from "@/components/blocks/divider"
import { CalloutBlock } from "@/components/blocks/callout"
import { PDFViewer } from "@/components/blocks/pdf-viewer"
import { FileViewer } from "@/components/blocks/file-viewer"
import { YouTubeEmbedBlock } from "@/components/blocks/youtube-embed-block"
import { GalleryBlock } from "@/components/blocks/gallery-block"
import { ToggleBlock } from "@/components/blocks/toggle-block" // NEW: Import ToggleBlock

export interface NotionBlock {
  id: string
  type: string
  [key: string]: any
  children?: NotionBlock[] // NEW: Add children property for recursive blocks
}

/**
 * Maps Notion API block types to React components
 */
export function renderNotionBlock(block: NotionBlock): React.ReactNode {
  switch (block.type) {
    case "heading_1":
      return <HeadingOne key={block.id} block={block} />

    case "heading_2":
      return <HeadingTwo key={block.id} block={block} />

    case "heading_3":
      return <HeadingThree key={block.id} block={block} />

    case "paragraph":
      return <ParagraphBlock key={block.id} block={block} />

    case "bulleted_list_item":
      return <BulletedListBlock key={block.id} block={block} />

    case "numbered_list_item":
      return <NumberedListBlock key={block.id} block={block} />

    case "to_do":
      return <TodoListBlock key={block.id} block={block} />

    case "quote":
      return <QuoteBlock key={block.id} block={block} />

    case "code":
      return <CodeBlock key={block.id} block={block} />

    case "image":
      return <ImageBlock key={block.id} block={block} />

    case "pdf":
      return <PDFViewer key={block.id} block={block} />

    case "file":
      return <FileViewer key={block.id} block={block} />

    case "video":
      return <YouTubeEmbedBlock key={block.id} block={block} />

    case "divider":
      return <DividerBlock key={block.id} />

    case "callout":
      return <CalloutBlock key={block.id} block={block} />

    case "child_database":
      return <GalleryBlock key={block.id} block={block} />

    case "toggle": // NEW: Handle toggle blocks
      return <ToggleBlock key={block.id} block={block} />

    default:
      console.warn(`Unsupported block type: ${block.type}`)
      return null
  }
}

/**
 * Extracts plain text from Notion rich text array
 */
export function extractPlainText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return ""
  return richText.map((text) => text.plain_text || "").join("")
}

/**
 * Renders rich text with formatting (bold, italic, etc.)
 */
export function renderRichText(richText: any[]): React.ReactNode {
  if (!richText || !Array.isArray(richText)) return null

  return richText.map((text, index) => {
    let element = text.plain_text || ""

    if (text.annotations?.bold) {
      element = <strong key={index}>{element}</strong>
    }
    if (text.annotations?.italic) {
      element = <em key={index}>{element}</em>
    }
    if (text.annotations?.code) {
      element = (
        <code key={index} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
          {element}
        </code>
      )
    }

    return element
  })
}
