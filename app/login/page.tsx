"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, AlertTriangle } from "lucide-react" // Removed Shield, CheckCircle
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { userService } from "@/lib/supabase"

// Generate device fingerprint
const generateDeviceFingerprint = () => {
  if (typeof window === "undefined") return "server-side"

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  ctx?.fillText("Device fingerprint", 10, 10)

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    navigator.hardwareConcurrency || 0,
    navigator.deviceMemory || 0,
  ].join("|")

  return btoa(fingerprint).slice(0, 32)
}

const getDeviceInfo = () => {
  if (typeof window === "undefined") return "Server"

  const ua = navigator.userAgent
  let deviceType = "Desktop"
  let browser = "Unknown"

  if (/Mobile|Android|iPhone|iPad/.test(ua)) {
    deviceType = "Mobile"
  } else if (/Tablet/.test(ua)) {
    deviceType = "Tablet"
  }

  if (ua.includes("Chrome")) browser = "Chrome"
  else if (ua.includes("Firefox")) browser = "Firefox"
  else if (ua.includes("Safari")) browser = "Safari"
  else if (ua.includes("Edge")) browser = "Edge"

  return `${deviceType} - ${browser}`
}

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseConfigured, setSupabaseConfigured] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
      setSupabaseConfigured(false)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!supabaseConfigured) {
      setError("Supabase chưa được cấu hình. Vui lòng thêm environment variables.")
      setIsLoading(false)
      return
    }

    try {
      // Find user in Supabase
      const user = await userService.findUser(username, password)

      if (!user) {
        setError("Tên đăng nhập hoặc mật khẩu không đúng")
        setIsLoading(false)
        return
      }

      if (!user.is_active) {
        setError("Tài khoản đã bị khóa. Vui lòng liên hệ admin.")
        setIsLoading(false)
        return
      }

      // Generate device fingerprint
      const currentFingerprint = generateDeviceFingerprint()
      const currentDeviceInfo = getDeviceInfo()

      // Check device binding
      if (user.device_fingerprint && user.device_fingerprint !== currentFingerprint) {
        setError(
          `Tài khoản "${user.username}" đã được ràng buộc với thiết bị khác (${user.device_info || "Unknown"}). 
    
Có thể do:
• Admin đã test tài khoản này trước đó
• Bạn đã đăng nhập từ thiết bị khác

Vui lòng liên hệ admin để reset ràng buộc thiết bị.`,
        )
        setIsLoading(false)
        return
      }

      // Update device binding if first login
      if (!user.device_fingerprint) {
        await userService.updateDeviceBinding(user.id, currentFingerprint, currentDeviceInfo)
        console.log(`Tài khoản "${user.username}" đã được ràng buộc với thiết bị: ${currentDeviceInfo}`)
      } else {
        // Update last login
        await userService.updateLastLogin(user.id)
      }

      // Set authentication cookie with user info
      const authData = {
        authenticated: true,
        userId: user.id,
        username: user.username,
        isAdmin: user.is_admin,
        deviceFingerprint: currentFingerprint,
      }
      document.cookie = `auth=${JSON.stringify(authData)}; path=/; max-age=86400` // 24 hours

      // Redirect based on user type
      if (user.is_admin) {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Có lỗi xảy ra khi kết nối database. Vui lòng thử lại.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Đăng nhập</h1>
            <p className="text-muted-foreground mt-2">Vui lòng đăng nhập để truy cập website</p>
          </div>

          {/* Supabase Configuration Warning */}
          {!supabaseConfigured && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-red-800 dark:text-red-200 mb-1">Cấu hình thiếu</p>
                  <p className="text-red-700 dark:text-red-300">
                    Supabase chưa được cấu hình. Vui lòng thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY
                    vào environment variables.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive whitespace-pre-line">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !supabaseConfigured}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
