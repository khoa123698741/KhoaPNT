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
import { ToggleBlock } from "@/components/blocks/toggle-block"

export interface NotionBlock {
  id: string
  type: string
  [key: string]: any
  children?: NotionBlock[]
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

    case "toggle":
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
 * Gets Notion color class for styling
 */
export function getNotionColorClass(color: string): string {
  if (!color || color === "default") return ""

  const colorMap: { [key: string]: string } = {
    // Text colors
    gray: "text-gray-600 dark:text-gray-400",
    brown: "text-amber-700 dark:text-amber-400",
    orange: "text-orange-600 dark:text-orange-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    pink: "text-pink-600 dark:text-pink-400",
    red: "text-red-600 dark:text-red-400",

    // Background colors
    gray_background: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded",
    brown_background: "bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-2 py-1 rounded",
    orange_background: "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 px-2 py-1 rounded",
    yellow_background: "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-2 py-1 rounded",
    green_background: "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded",
    blue_background: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded",
    purple_background: "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-2 py-1 rounded",
    pink_background: "bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 px-2 py-1 rounded",
    red_background: "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 px-2 py-1 rounded",
  }

  return colorMap[color] || ""
}

/**
 * Renders rich text with formatting (bold, italic, etc.) and colors
 */
export function renderRichText(richText: any[]): React.ReactNode {
  if (!richText || !Array.isArray(richText)) return null

  return richText.map((text, index) => {
    let element: React.ReactNode = text.plain_text || ""
    const colorClass = getNotionColorClass(text.annotations?.color)

    // Apply text formatting
    if (text.annotations?.bold) {
      element = <strong>{element}</strong>
    }
    if (text.annotations?.italic) {
      element = <em>{element}</em>
    }
    if (text.annotations?.strikethrough) {
      element = <del>{element}</del>
    }
    if (text.annotations?.underline) {
      element = <u>{element}</u>
    }
    if (text.annotations?.code) {
      element = <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{element}</code>
    }

    // Apply color styling
    if (colorClass) {
      element = (
        <span key={index} className={colorClass}>
          {element}
        </span>
      )
    }

    // Handle links
    if (text.href) {
      element = (
        <a
          key={index}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-blue-600 dark:text-blue-400 hover:underline ${colorClass}`}
        >
          {element}
        </a>
      )
    }

    return <span key={index}>{element}</span>
  })
}
