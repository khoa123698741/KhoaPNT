import Image from "next/image"
import { Lightbulb } from "lucide-react"
import TodoList from "@/components/todo-list"
import CodeBlock from "@/components/code-block"

export default function ContentBlocks() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* H1 Heading */}
      <h1 className="text-4xl font-bold text-foreground mb-6">Chào mừng đến với Blog Cá Nhân của Tôi</h1>

      {/* Paragraph */}
      <p className="text-base leading-relaxed text-foreground">
        Đây là một đoạn văn mẫu bằng tiếng Việt để minh họa cách hiển thị nội dung trên trang web. Tôi hy vọng rằng
        thiết kế này sẽ mang lại trải nghiệm đọc thoải mái và dễ chịu cho người dùng. Phong cách tối giản này được lấy
        cảm hứng từ Notion, tập trung vào nội dung và khả năng đọc.
      </p>

      {/* Image with Caption */}
      <div className="space-y-2">
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Minimalist workspace"
          width={800}
          height={400}
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted-foreground text-center">Một không gian làm việc tối giản và hiện đại</p>
      </div>

      {/* H2 Heading */}
      <h2 className="text-3xl font-semibold text-foreground mt-12 mb-6">Các Tính Năng Chính</h2>

      {/* Bulleted List */}
      <ul className="space-y-2 ml-4">
        <li className="flex items-start">
          <span className="w-2 h-2 bg-foreground rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Thiết kế responsive hoàn toàn tương thích với mọi thiết bị</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-foreground rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Chế độ sáng/tối có thể chuyển đổi dễ dàng</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-foreground rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Tích hợp liên kết mạng xã hội</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-foreground rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Hỗ trợ nhiều loại khối nội dung khác nhau</span>
        </li>
      </ul>

      {/* Todo List */}
      <TodoList />

      {/* Quote Block */}
      <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground bg-muted/30 rounded-r-lg">
        "Thiết kế không chỉ là cách nó trông như thế nào và cảm giác như thế nào. Thiết kế là cách nó hoạt động." -
        Steve Jobs
      </blockquote>

      {/* H3 Heading */}
      <h3 className="text-2xl font-medium text-foreground mt-10 mb-4">Ví Dụ Code Block</h3>

      {/* Code Block */}
      <CodeBlock />

      {/* Callout Block */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
        <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Mẹo hữu ích</p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Bạn có thể tùy chỉnh các khối nội dung này để phù hợp với nhu cầu cụ thể của mình. Mỗi khối được thiết kế để
            dễ đọc và có thể tái sử dụng.
          </p>
        </div>
      </div>

      {/* Numbered List */}
      <ol className="space-y-2 ml-4">
        <li className="flex items-start">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
            1
          </span>
          <span>Bước đầu tiên: Lập kế hoạch và thiết kế</span>
        </li>
        <li className="flex items-start">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
            2
          </span>
          <span>Bước thứ hai: Phát triển và kiểm thử</span>
        </li>
        <li className="flex items-start">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
            3
          </span>
          <span>Bước cuối cùng: Triển khai và bảo trì</span>
        </li>
      </ol>

      {/* Divider */}
      <hr className="border-border my-12" />

      <p className="text-base leading-relaxed text-muted-foreground">
        Cảm ơn bạn đã ghé thăm blog của tôi. Hy vọng bạn thích thiết kế tối giản này!
      </p>
    </div>
  )
}
