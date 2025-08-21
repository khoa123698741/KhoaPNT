"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear authentication cookie
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleLogout} className="h-9 w-9" title="Đăng xuất">
      <LogOut className="h-4 w-4" />
    </Button>
  )
}
