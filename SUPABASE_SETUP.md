# Hướng dẫn cài đặt Supabase

## Bước 1: Tạo project Supabase

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng ký/Đăng nhập tài khoản
3. Tạo project mới:
   - Project name: `notion-portfolio`
   - Database password: Tạo password mạnh
   - Region: Chọn gần nhất (Singapore cho VN)

## Bước 2: Lấy thông tin kết nối

1. Vào project dashboard
2. Vào **Settings** → **API**
3. Copy các thông tin:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Bước 3: Cấu hình Environment Variables

Tạo file `.env.local`:

\`\`\`env
# Notion (giữ nguyên)
NOTION_TOKEN=secret_your_notion_integration_token_here
NEXT_PUBLIC_NOTION_PAGE_ID=your_notion_page_id_here

# Supabase (thêm mới)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
\`\`\`

## Bước 4: Tạo bảng users

1. Vào **SQL Editor** trong Supabase dashboard
2. Chạy script SQL từ file `scripts/create-users-table.sql`
3. Hoặc copy-paste code này:

\`\`\`sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  device_fingerprint TEXT,
  device_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false
);

-- Insert default admin user
INSERT INTO users (username, password, is_admin, is_active) 
VALUES ('khoa123456', '123456', true, true)
ON CONFLICT (username) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on users" ON users
FOR ALL USING (true);
\`\`\`

## Bước 5: Cài đặt dependencies

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

## Bước 6: Deploy lên Vercel

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm Environment Variables trong Vercel:
   - `NOTION_TOKEN`
   - `NEXT_PUBLIC_NOTION_PAGE_ID`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Bước 7: Test

1. Truy cập website
2. Đăng nhập: `khoa123456` / `123456`
3. Tạo tài khoản mới
4. Test đăng nhập từ thiết bị khác

## Lưu ý bảo mật

- **Row Level Security**: Đã bật để bảo vệ dữ liệu
- **Anon key**: Chỉ cho phép truy cập theo policy
- **Password**: Hiện tại lưu plain text, nên hash trong production
- **Device binding**: Vẫn hoạt động như cũ

## Troubleshooting

### Lỗi kết nối Supabase:
- Kiểm tra URL và API key
- Đảm bảo project Supabase đang chạy
- Kiểm tra network/firewall

### Lỗi SQL:
- Kiểm tra bảng `users` đã tạo chưa
- Kiểm tra RLS policy
- Xem logs trong Supabase dashboard

### Lỗi CORS:
- Supabase tự động handle CORS
- Nếu vẫn lỗi, check domain trong Supabase settings
