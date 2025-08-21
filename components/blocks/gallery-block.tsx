"use client"

import Image from "next/image"
import { useState } from "react"

interface GalleryBlockProps {
  block: any
}

export function GalleryBlock({ block }: GalleryBlockProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { gallery, child_database } = block

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Gallery/Database block (ID: {child_database?.database_id || "Unknown"})
      </p>
      {gallery && (
        <div className="mt-4">
          {gallery.children && gallery.children.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.children
                .filter((child: any) => child.type === "image")
                .map((child: any, index: number) => {
                  const imageUrl = child.image?.file?.url || child.image?.external?.url
                  const caption = child.image?.caption?.[0]?.plain_text || ""
                  if (!imageUrl) return null

                  return (
                    <div
                      key={index}
                      className="relative aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={caption || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                })}
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">No images found in the gallery.</p>
          )}

          {/* Modal for full-size image */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Full size image"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
