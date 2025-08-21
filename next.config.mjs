/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg', 'prod-files-secure.s3.us-west-2.amazonaws.com'], // NEW domain for Notion images
    unoptimized: true
  },
  // Add environment variables validation
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // experimental cấu hình thêm ở đây (để trống vì hiện chưa dùng option nào)
}

export default nextConfig
