// Clerk API Integration Service
// This service handles fetching student data from Clerk API

interface ClerkUser {
  id: string
  firstName: string | null
  lastName: string | null
  emailAddresses: Array<{ emailAddress: string }>
  createdAt: string
  lastSignInAt: string | null
  imageUrl: string
  publicMetadata: Record<string, unknown>
}

interface ClerkResponse {
  data: ClerkUser[]
  total_count: number
}

// Real Clerk API Integration
export class ClerkService {
  private static readonly CLERK_API_URL = 'https://api.clerk.com/v1/users'
  
  // Get Clerk secret key safely
  private static getClerkSecretKey(): string {
    if (typeof window !== 'undefined') {
      // Client-side: return empty string to avoid exposing secret key
      return ''
    }
    // Server-side: access environment variable
    return typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CLERK_SECRET_KEY || ''
  }

  // Fetch all users from Clerk API
  static async fetchAllUsers(): Promise<ClerkUser[]> {
    try {
      const secretKey = this.getClerkSecretKey()
      
      // If no secret key, return empty array (client-side or missing env var)
      if (!secretKey) {
        console.warn('Clerk secret key not available. Please set NEXT_PUBLIC_CLERK_SECRET_KEY environment variable.')
        return []
      }

      const response = await fetch(this.CLERK_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Clerk API error: ${response.status} ${response.statusText}`)
      }

      const data: ClerkResponse = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching users from Clerk:', error)
      // Return empty array instead of throwing error to prevent app crash
      return []
    }
  }

  // Fetch user by ID
  static async fetchUserById(userId: string): Promise<ClerkUser | null> {
    try {
      const secretKey = this.getClerkSecretKey()
      
      if (!secretKey) {
        console.warn('Clerk secret key not available.')
        return null
      }

      const response = await fetch(`${this.CLERK_API_URL}/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Clerk API error: ${response.status} ${response.statusText}`)
      }

      const user: ClerkUser = await response.json()
      return user
    } catch (error) {
      console.error('Error fetching user by ID:', error)
      return null
    }
  }

  // Get user statistics
  static async getUserStats(): Promise<{
    totalUsers: number
    activeUsers: number
    newUsersThisWeek: number
    averageSignIns: number
  }> {
    try {
      const users = await this.fetchAllUsers()
      const now = new Date()
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      
      const activeUsers = users.filter(user => {
        if (!user.lastSignInAt) return false
        const lastSignIn = new Date(user.lastSignInAt)
        return lastSignIn > oneWeekAgo
      }).length

      const newUsersThisWeek = users.filter(user => {
        const createdAt = new Date(user.createdAt)
        return createdAt > oneWeekAgo
      }).length

      return {
        totalUsers: users.length,
        activeUsers,
        newUsersThisWeek,
        averageSignIns: users.length > 0 ? Math.round(activeUsers / users.length * 100) : 0
      }
    } catch (error) {
      console.error('Error getting user stats:', error)
      return {
        totalUsers: 0,
        activeUsers: 0,
        newUsersThisWeek: 0,
        averageSignIns: 0
      }
    }
  }

  // Search users
  static async searchUsers(query: string): Promise<ClerkUser[]> {
    try {
      const users = await this.fetchAllUsers()
      const lowercaseQuery = query.toLowerCase()
      
      return users.filter(user => 
        user.firstName?.toLowerCase().includes(lowercaseQuery) ||
        user.lastName?.toLowerCase().includes(lowercaseQuery) ||
        user.emailAddresses[0]?.emailAddress.toLowerCase().includes(lowercaseQuery)
      )
    } catch (error) {
      console.error('Error searching users:', error)
      return []
    }
  }

  // Filter users by date range
  static async getUsersByDateRange(startDate: Date, endDate: Date): Promise<ClerkUser[]> {
    try {
      const users = await this.fetchAllUsers()
      
      return users.filter(user => {
        const createdAt = new Date(user.createdAt)
        return createdAt >= startDate && createdAt <= endDate
      })
    } catch (error) {
      console.error('Error filtering users by date range:', error)
      return []
    }
  }
}

// Export types for use in other components
export type { ClerkUser, ClerkResponse }
