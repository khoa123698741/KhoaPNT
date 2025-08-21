// Mock data representing Notion API response structure
// TODO: Replace with actual Notion API calls
export const mockNotionBlocks = [
  {
    id: "1",
    type: "heading_1",
    heading_1: {
      rich_text: [{ plain_text: "Chào mừng đến với Blog Cá Nhân của Tôi" }],
    },
  },
  {
    id: "2",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          plain_text:
            "Đây là một đoạn văn mẫu bằng tiếng Việt để minh họa cách hiển thị nội dung trên trang web. Tôi hy vọng rằng thiết kế này sẽ mang lại trải nghiệm đọc thoải mái và dễ chịu cho người dùng.",
        },
      ],
    },
  },
  {
    id: "3",
    type: "image",
    image: {
      file: {
        url: "/placeholder.svg?height=400&width=800",
      },
      caption: [{ plain_text: "Một không gian làm việc tối giản và hiện đại" }],
    },
  },
  {
    id: "4",
    type: "heading_2",
    heading_2: {
      rich_text: [{ plain_text: "Tài liệu PDF Mẫu" }],
    },
  },
  {
    id: "5",
    type: "pdf",
    pdf: {
      file: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      caption: [{ plain_text: "Tài liệu PDF mẫu - có thể mở rộng full width" }],
    },
  },
  {
    id: "6",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          plain_text:
            "PDF ở trên có thể được mở rộng full width, tải xuống, hoặc mở trong tab mới. Trên mobile sẽ có các tùy chọn thay thế.",
        },
      ],
    },
  },
  {
    id: "7",
    type: "file",
    file: {
      file: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      name: "sample-document.pdf",
      caption: [{ plain_text: "File tài liệu mẫu" }],
    },
  },
  {
    id: "youtube-video-1", // ID mới cho video YouTube
    type: "video", // Notion block type for video embeds
    video: {
      external: {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Ví dụ video Rick Astley
      },
      caption: [{ plain_text: "Video giới thiệu từ YouTube" }],
    },
  },
  {
    id: "gallery-example-1", // Example for a child_database block (Gallery)
    type: "child_database",
    child_database: {
      title: "Dự án của tôi", // This title will be displayed
    },
    // Notion API will provide the actual database ID here when fetched
    // For mock data, we just need the type and a title for display
  },
  {
    id: "toggle-example-1", // NEW: Example for a toggle block
    type: "toggle",
    toggle: {
      rich_text: [{ plain_text: "Mở đầu - Tình huống (Toggle List)" }],
    },
    has_children: true, // Important: indicates it has nested content
    // In a real Notion API response, 'children' would be fetched separately
    // For mock, we can simulate nested blocks here if needed, but the recursive fetch handles it
    children: [
      {
        id: "toggle-child-1",
        type: "paragraph",
        paragraph: {
          rich_text: [{ plain_text: "Đây là nội dung bên trong Toggle List." }],
        },
      },
      {
        id: "toggle-child-2",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ plain_text: "Mục con 1" }],
        },
      },
      {
        id: "toggle-child-3",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ plain_text: "Mục con 2" }],
        },
      },
    ],
  },
  {
    id: "8",
    type: "callout",
    callout: {
      rich_text: [
        {
          plain_text:
            "💡 Mẹo: Bạn có thể upload PDF trực tiếp vào Notion và nó sẽ hiển thị đẹp trên website với đầy đủ chức năng xem, tải xuống và mở rộng.",
        },
      ],
      icon: { emoji: "💡" },
    },
  },
  {
    id: "9",
    type: "divider",
  },
]
