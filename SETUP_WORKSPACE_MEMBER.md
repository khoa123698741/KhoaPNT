# Hướng dẫn kết nối Notion khi bạn chỉ là thành viên workspace

## Bước 1: Yêu cầu Admin tạo Integration

Vì bạn không phải admin workspace, bạn cần yêu cầu admin:

1. Truy cập [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Tạo "New integration" 
3. Đặt tên: "Portfolio Website Integration"
4. Chọn workspace chứa page bạn muốn kết nối
5. Cấp quyền: "Read content"
6. Chia sẻ **Integration Token** với bạn

## Bước 2: Share page với Integration

Bạn có thể tự làm bước này nếu bạn có quyền edit page:

1. Mở page Notion bạn muốn hiển thị
2. Click "Share" ở góc trên phải
3. Click "Invite" 
4. Tìm và chọn integration vừa tạo
5. Click "Invite"

**Lưu ý**: Nếu không thấy integration, yêu cầu admin share page với integration.

## Bước 3: Lấy Page ID

Từ URL page Notion:
\`\`\`
https://www.notion.so/workspace/Page-Title-abc123def456ghi789
\`\`\`

Page ID là: `abc123def456ghi789`

## Bước 4: Cấu hình Environment Variables

Trong Vercel Dashboard:

\`\`\`env
NOTION_TOKEN=secret_abc123... (từ admin)
NEXT_PUBLIC_NOTION_PAGE_ID=abc123def456ghi789 (từ URL)
\`\`\`

## Bước 5: Test kết nối

Website sẽ hiển thị thông báo lỗi cụ thể nếu:
- Token không đúng
- Page không được share
- Không có quyền truy cập

## Các trường hợp lỗi thường gặp:

### "unauthorized" 
- Token sai hoặc integration không có quyền
- **Giải pháp**: Kiểm tra token với admin

### "object_not_found"
- Page ID sai hoặc page không tồn tại
- **Giải pháp**: Kiểm tra lại URL page

### "restricted_resource"
- Page chưa được share với integration
- **Giải pháp**: Share page với integration hoặc yêu cầu admin

## Quyền hạn cần thiết:

- **Admin workspace**: Tạo integration
- **Page owner/editor**: Share page với integration  
- **Thành viên**: Có thể sử dụng sau khi được cấu hình

## Tips:

1. **Public pages**: Dễ truy cập hơn
2. **Private pages**: Cần share cẩn thận
3. **Database pages**: Cần quyền database access
4. **Nested pages**: Integration cần quyền parent page
\`\`\`

Hãy kiểm tra lại các bước này, đặc biệt là các biến môi trường trên Vercel và việc chia sẻ trang Notion. Nếu bạn thấy bất kỳ thông báo lỗi nào trên console, hãy chia sẻ nó với tôi để tôi có thể giúp bạn gỡ lỗi chính xác hơn.
