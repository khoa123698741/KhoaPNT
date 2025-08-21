"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Home, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { LogoutButton } from "@/components/logout-button"
import Link from "next/link"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setMounted(true)
    const authCookie = document.cookie.split("; ").find((row) => row.startsWith("auth="))
    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie.substring(5))
        setIsAuthenticated(authData.authenticated)
        setIsAdmin(authData.isAdmin)
      } catch (e) {
        console.error("Failed to parse auth cookie:", e)
        setIsAuthenticated(false)
        setIsAdmin(false)
      }
    } else {
      setIsAuthenticated(false)
      setIsAdmin(false)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-foreground hover:opacity-80 transition-opacity">
          ÔN THI NỘI TRÚ PHẠM NGỌC THẠCH 2026
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Trang chủ
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAdmin && (
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <Link href="/admin">
                <User className="h-4 w-4" />
                <span className="sr-only">Admin</span>
              </Link>
            </Button>
          )}

          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
    </header>
  )
}
