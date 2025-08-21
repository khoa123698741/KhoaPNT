interface YouTubeEmbedProps {
  block: any
}

export function YouTubeEmbedBlock({ block }: YouTubeEmbedProps) {
  const { video } = block
  const url = video?.external?.url

  if (!url) return null

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeId(url)

  if (!videoId) {
    return (
      <div className="mb-4">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {url}
        </a>
      </div>
    )
  }

  return (
    <div className="mb-4">
      <div className="relative w-full h-0 pb-[56.25%]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allowFullScreen
        />
      </div>
    </div>
  )
}
