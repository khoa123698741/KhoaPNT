import Header from "@/components/header"
import Footer from "@/components/footer"
import NotionRenderer from "@/components/notion-renderer"

// Enable ISR - trang sẽ được rebuild mỗi 1 giờ
export const revalidate = 3600 // 1 giờ

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <NotionRenderer />
      </main>
      <Footer />
    </div>
  )
}
