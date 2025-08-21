"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Shield, Smartphone, Monitor, AlertTriangle, Settings, Key, Database, Home } from "lucide-react" // Thêm Home icon
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { userService, type User } from "@/lib/supabase"
import Link from "next/link" // Thêm import Link

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newAdminUsername, setNewAdminUsername] = useState("")
  const [newAdminPassword, setNewAdminPassword] = useState("")
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editUsername, setEditUsername] = useState("")
  const [editPassword, setEditPassword] = useState("")
  const [supabaseConfigured, setSupabaseConfigured] = useState(true)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
      setSupabaseConfigured(false)
      setIsLoading(false)
      return
    }

    loadUsers()
  }, [])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const allUsers = await userService.getAllUsers()
      setUsers(allUsers)

      const admin = allUsers.find((u: User) => u.is_admin)
      setCurrentAdmin(admin)
      if (admin) {
        setNewAdminUsername(admin.username)
      }
    } catch (error) {
      console.error("Error loading users:", error)
      alert("Có lỗi khi tải danh sách người dùng. Vui lòng kiểm tra cấu hình Supabase.")
    }
    setIsLoading(false)
  }

  const createUser = async () => {
    if (!newUsername || !newPassword) {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (!supabaseConfigured) {
      alert("Supabase chưa được cấu hình. Không thể tạo tài khoản.")
      return
    }

    const exists = await userService.usernameExists(newUsername)
    if (exists) {
      alert("Tên đăng nhập đã tồn tại")
      return
    }

    setIsLoading(true)

    try {
      const newUser = await userService.createUser({
        username: newUsername,
        password: newPassword,
        is_active: true,
        is_admin: false,
      })

      if (newUser) {
        await loadUsers()
        setNewUsername("")
        setNewPassword("")
        alert(`Tạo tài khoản "${newUsername}" thành công! Tài khoản có thể sử dụng trên mọi thiết bị.`)
      } else {
        alert("Có lỗi khi tạo tài khoản")
      }
    } catch (error) {
      console.error("Error creating user:", error)
      alert("Có lỗi khi tạo tài khoản. Vui lòng kiểm tra cấu hình Supabase.")
    }

    setIsLoading(false)
  }

  const deleteUser = async (userId: string) => {
    if (!supabaseConfigured) {
      alert("Supabase chưa được cấu hình. Không thể xóa tài khoản.")
      return
    }
    const user = users.find((u) => u.id === userId)
    if (user?.is_admin) {
      alert("Không thể xóa tài khoản admin")
      return
    }

    if (confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      const success = await userService.deleteUser(userId)
      if (success) {
        await loadUsers()
      } else {
        alert("Có lỗi khi xóa tài khoản")
      }
    }
  }

  const editUser = (user: User) => {
    setEditingUser(user)
    setEditUsername(user.username)
    setEditPassword(user.password)
  }

  const saveUserEdit = async () => {
    if (!editingUser || !editUsername || !editPassword) {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (!supabaseConfigured) {
      alert("Supabase chưa được cấu hình. Không thể lưu thay đổi.")
      return
    }

    const exists = await userService.usernameExists(editUsername, editingUser.id)
    if (exists) {
      alert("Tên đăng nhập đã tồn tại")
      return
    }

    if (confirm("Bạn có chắc muốn thay đổi thông tin tài khoản này? Người dùng sẽ cần đăng nhập lại.")) {
      const updatedUser = await userService.updateUser(editingUser.id, {
        username: editUsername,
        password: editPassword,
        device_fingerprint: undefined,
        device_info: undefined,
      })

      if (updatedUser) {
        await loadUsers()
        setEditingUser(null)
        setEditUsername("")
        setEditPassword("")
        alert("Thay đổi thành công!")
      } else {
        alert("Có lỗi khi cập nhật thông tin")
      }
    }
  }

  const cancelEdit = () => {
    setEditingUser(null)
    setEditUsername("")
    setEditPassword("")
  }

  const toggleUserStatus = async (userId: string) => {
    if (!supabaseConfigured) {
      alert("Supabase chưa được cấu hình. Không thể thay đổi trạng thái.")
      return
    }
    const user = users.find((u) => u.id === userId)
    if (user?.is_admin) {
      alert("Không thể khóa tài khoản admin")
      return
    }

    if (user) {
      const updatedUser = await userService.updateUser(userId, {
        is_active: !user.is_active,
      })

      if (updatedUser) {
        await loadUsers()
      } else {
        alert("Có lỗi khi cập nhật trạng thái")
      }
    }
  }

  const resetDeviceBinding = async (userId: string) => {
    if (!supabaseConfigured) {
      alert("Supabase chưa được cấu hình. Không thể reset thiết bị.")
      return
    }
    if (confirm("Bạn có chắc muốn reset ràng buộc thiết bị? Người dùng sẽ có thể đăng nhập từ thiết bị mới.")) {
      const success = await userService.resetDeviceBinding(userId)
      if (success) {
        await loadUsers()
      } else {
        alert("Có lỗi khi reset ràng buộc thiết bị")
      }
    }
  }

  const changeAdminCredentials = async () => {
    if (!newAdminUsername || !newAdminPassword) {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (!supabaseConfigured) {
      alert("Supabase chưa được cấu hình. Không thể thay đổi thông tin admin.")
      return
    }

    if (currentAdmin) {
      const exists = await userService.usernameExists(newAdminUsername, currentAdmin.id)
      if (exists) {
        alert("Tên đăng nhập đã tồn tại")
        return
      }

      if (confirm("Bạn có chắc muốn thay đổi thông tin admin? Bạn sẽ cần đăng nhập lại.")) {
        const updatedAdmin = await userService.updateUser(currentAdmin.id, {
          username: newAdminUsername,
          password: newAdminPassword,
          device_fingerprint: undefined,
          device_info: undefined,
        })

        if (updatedAdmin) {
          document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          alert("Thay đổi thành công! Vui lòng đăng nhập lại.")
          window.location.href = "/login"
        } else {
          alert("Có lỗi khi cập nhật thông tin admin")
        }
      }
    }
  }

  const getDeviceIcon = (deviceInfo?: string) => {
    if (!deviceInfo) return <Shield className="h-4 w-4" />
    if (deviceInfo.toLowerCase().includes("mobile")) return <Smartphone className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          {" "}
          {/* Thêm flexbox */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quản lý tài khoản</h1>
            <p className="text-muted-foreground">Tạo và quản lý tài khoản truy cập website với Supabase</p>
          </div>
          <Link href="/" passHref>
            {" "}
            {/* Nút quay về trang chủ */}
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Home className="h-4 w-4" />
              Về trang chủ
            </Button>
          </Link>
        </div>

        {/* Supabase Configuration Warning */}
        {!supabaseConfigured && (
          <Card className="mb-8 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <AlertTriangle className="h-5 w-5" />
                Cấu hình Supabase thiếu
              </CardTitle>
              <CardDescription>
                Vui lòng thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào environment variables của
                Vercel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Database className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200 mb-2">Không thể kết nối Supabase</p>
                    <ul className="space-y-1 text-red-700 dark:text-red-300">
                      <li>• Kiểm tra lại các biến môi trường trên Vercel Dashboard.</li>
                      <li>• Đảm bảo chúng được thêm vào đúng phạm vi (Production, Preview).</li>
                      <li>• Thử redeploy lại project.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cài đặt Admin
            </CardTitle>
            <CardDescription>Thay đổi thông tin đăng nhập admin</CardDescription>
          </CardHeader>
          <CardContent>
            {!showChangePassword ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tài khoản admin hiện tại: {currentAdmin?.username}</p>
                  <p className="text-sm text-muted-foreground">Click để thay đổi thông tin đăng nhập</p>
                </div>
                <Button onClick={() => setShowChangePassword(true)} variant="outline" disabled={!supabaseConfigured}>
                  <Key className="h-4 w-4 mr-2" />
                  Đổi thông tin
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Tên đăng nhập mới</Label>
                    <Input
                      id="admin-username"
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      placeholder="Nhập tên đăng nhập mới"
                      disabled={!supabaseConfigured}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Mật khẩu mới</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới"
                      disabled={!supabaseConfigured}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={changeAdminCredentials} variant="default" disabled={!supabaseConfigured}>
                    Lưu thay đổi
                  </Button>
                  <Button onClick={() => setShowChangePassword(false)} variant="outline">
                    Hủy
                  </Button>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    ⚠️ Thay đổi thông tin admin sẽ reset ràng buộc thiết bị và yêu cầu đăng nhập lại.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create New User */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Tạo tài khoản mới
            </CardTitle>
            <CardDescription>Tài khoản sẽ có thể sử dụng trên mọi thiết bị</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  disabled={!supabaseConfigured}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  disabled={!supabaseConfigured}
                />
              </div>
            </div>
            <Button onClick={createUser} disabled={isLoading || !supabaseConfigured} className="w-full md:w-auto">
              {isLoading ? "Đang tạo..." : "Tạo tài khoản"}
            </Button>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài khoản ({users.length})</CardTitle>
            <CardDescription>Quản lý tất cả tài khoản đồng bộ trên cloud</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && supabaseConfigured ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Đang tải...</span>
              </div>
            ) : !supabaseConfigured ? (
              <div className="text-center py-8 text-muted-foreground">
                Vui lòng cấu hình Supabase để xem danh sách người dùng.
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20"
                  >
                    <div className="flex-1">
                      {editingUser?.id === user.id ? (
                        // Edit mode
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Tên đăng nhập</Label>
                              <Input
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                className="h-8"
                                disabled={!supabaseConfigured}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Mật khẩu</Label>
                              <Input
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                                className="h-8"
                                disabled={!supabaseConfigured}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={saveUserEdit} disabled={!supabaseConfigured}>
                              Lưu
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit}>
                              Hủy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // View mode
                        <>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-foreground">{user.username}</h3>
                            <Badge variant={user.is_active ? "default" : "secondary"}>
                              {user.is_active ? "Hoạt động" : "Tạm khóa"}
                            </Badge>
                            {user.is_admin && <Badge variant="outline">Admin</Badge>}
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Mật khẩu: {user.password}</p>
                            <p>Tạo lúc: {new Date(user.created_at).toLocaleString("vi-VN")}</p>
                            {user.last_login && (
                              <p>Đăng nhập cuối: {new Date(user.last_login).toLocaleString("vi-VN")}</p>
                            )}

                            {user.device_fingerprint && (
                              <div className="flex items-center gap-2 mt-2">
                                {getDeviceIcon(user.device_info)}
                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                                  Đã ràng buộc thiết bị
                                </span>
                                {user.device_info && (
                                  <span className="text-xs text-muted-foreground">{user.device_info}</span>
                                )}
                              </div>
                            )}

                            {!user.device_fingerprint && (
                              <div className="flex items-center gap-2 mt-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-xs text-yellow-600 dark:text-yellow-400">
                                  Chưa ràng buộc thiết bị - sẽ ràng buộc khi đăng nhập lần đầu
                                </span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {editingUser?.id !== user.id && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editUser(user)}
                            disabled={!supabaseConfigured}
                          >
                            Sửa
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleUserStatus(user.id)}
                            disabled={user.is_admin || !supabaseConfigured}
                          >
                            {user.is_active ? "Khóa" : "Mở khóa"}
                          </Button>

                          {user.device_fingerprint && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => resetDeviceBinding(user.id)}
                              disabled={!supabaseConfigured}
                            >
                              Reset thiết bị
                            </Button>
                          )}

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteUser(user.id)}
                            disabled={user.is_admin || !supabaseConfigured}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
