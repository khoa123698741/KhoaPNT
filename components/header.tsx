"use client"

import { useState } from "react"

import { useEffect } from "react"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { LogoutButton } from "@/components/logout-button"
import { SunIcon, MoonIcon } from "@/components/icons"

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

  if (!mounted) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 container flex h-14 items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors mr-6 flex items-center space-x-2"
          >
            ÔN THI NỘI TRÚ PHẠM NGỌC THẠCH 2026
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              Trang chủ
            </Button>
          </Link>
          {isAdmin && (
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}
          {isAuthenticated && <LogoutButton />}
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
