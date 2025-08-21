import { createClient } from "@supabase/supabase-js"

// Add fallback values and better error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Create client with fallback for build time
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
)

export interface User {
  id: string
  username: string
  password: string
  device_fingerprint?: string
  device_info?: string
  created_at: string
  last_login?: string
  is_active: boolean
  is_admin: boolean
}

// User management functions with error handling
export const userService = {
  // Get all users
  async getAllUsers(): Promise<User[]> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return []
    }

    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching users:", error)
      return []
    }

    return data || []
  },

  // Find user by username and password
  async findUser(username: string, password: string): Promise<User | null> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return null
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .limit(1)
      .maybeSingle() // ✅ returns `data = null` instead of throwing when 0 rows

    if (error) {
      console.error("Error finding user:", error)
      return null
    }

    return data // will be `null` if no user matched
  },

  // Create new user
  async createUser(userData: Omit<User, "id" | "created_at">): Promise<User | null> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return null
    }

    const { data, error } = await supabase.from("users").insert([userData]).select().single()

    if (error) {
      console.error("Error creating user:", error)
      return null
    }

    return data
  },

  // Update user
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return null
    }

    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Error updating user:", error)
      return null
    }

    return data
  },

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return false
    }

    const { error } = await supabase.from("users").delete().eq("id", id)

    if (error) {
      console.error("Error deleting user:", error)
      return false
    }

    return true
  },

  // Check if username exists
  async usernameExists(username: string, excludeId?: string): Promise<boolean> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return false
    }

    let query = supabase.from("users").select("id").eq("username", username)

    if (excludeId) {
      query = query.neq("id", excludeId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error checking username:", error)
      return false
    }

    return (data?.length || 0) > 0
  },

  // Update device binding
  async updateDeviceBinding(id: string, deviceFingerprint: string, deviceInfo: string): Promise<boolean> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return false
    }

    const { error } = await supabase
      .from("users")
      .update({
        device_fingerprint: deviceFingerprint,
        device_info: deviceInfo,
        last_login: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating device binding:", error)
      return false
    }

    return true
  },

  // Reset device binding
  async resetDeviceBinding(id: string): Promise<boolean> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return false
    }

    const { error } = await supabase
      .from("users")
      .update({
        device_fingerprint: null,
        device_info: null,
      })
      .eq("id", id)

    if (error) {
      console.error("Error resetting device binding:", error)
      return false
    }

    return true
  },

  // Update last login
  async updateLastLogin(id: string): Promise<boolean> {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase not configured")
      return false
    }

    const { error } = await supabase
      .from("users")
      .update({
        last_login: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating last login:", error)
      return false
    }

    return true
  },
}
