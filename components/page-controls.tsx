"use client"

import { useState, useEffect } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PageControls() {
  const [isFullWidth, setIsFullWidth] = useState(false)

  useEffect(() => {
    const notionContent = document.querySelector(".notion-content") as HTMLElement
    if (notionContent) {
      if (isFullWidth) {
        notionContent.className = "notion-content notion-full-width"
      } else {
        notionContent.className = "notion-content notion-normal-width"
      }
    }
  }, [isFullWidth])

  return (
    <div className="fixed top-20 right-4 z-40">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsFullWidth(!isFullWidth)}
        className="h-10 w-10 bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background/90"
        title={isFullWidth ? "Thu nhỏ trang" : "Mở rộng full width"}
      >
        {isFullWidth ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
