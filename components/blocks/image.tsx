import Image from "next/image"

interface ImageBlockProps {
  block: any
}

export function ImageBlock({ block }: ImageBlockProps) {
  const { image } = block
  const src = image?.external?.url || image?.file?.url
  const caption = image?.caption?.map((text: any) => text.plain_text).join("") || ""

  if (!src) return null

  return (
    <figure className="mb-4">
      <div className="relative w-full h-64">
        <Image src={src || "/placeholder.svg"} alt={caption || "Image"} fill className="object-contain rounded-lg" />
      </div>
      {caption && (
        <figcaption className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">{caption}</figcaption>
      )}
    </figure>
  )
}
