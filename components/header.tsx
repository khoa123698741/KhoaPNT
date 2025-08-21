"use client"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { LogoutButton } from "@/components/logout-button"
import { SunIcon, MoonIcon } from "@/components/icons"

export function Header() {
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="font-bold">Trang chủ</span>
            </Button>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Trang chủ
            </Link>
          </Button>
          {isAdmin && (
            <Button asChild variant="ghost" size="icon">
              <Link href="/admin">
                <Home className="h-5 w-5" />
                <span className="sr-only">Admin</span>
              </Link>
            </Button>
          )}
          {isAuthenticated && <LogoutButton />}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
