// Client-side Clerk Service
// This service handles student data for the admin panel
// Note: Clerk API calls should be done server-side for security

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

// Client-side service that doesn't expose secret keys
export class ClerkServiceClient {
  // Fetch users directly from Clerk API
  static async fetchAllUsers(): Promise<ClerkUser[]> {
    try {
      const response = await fetch('https://api.clerk.com/v1/users', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer sk_test_Da5TLNMHCM7mMFoawvfYuiL5KoEUzeCN8P7xOIohhn',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      
      if (!response.ok) {
        throw new Error(`Clerk API error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Transform Clerk API response to our ClerkUser interface
      return data.map((user: {
        id: string
        first_name: string | null
        last_name: string | null
        email_addresses: Array<{ emailAddress: string }>
        image_url: string
        created_at: string
        last_sign_in_at: string | null
        public_metadata: Record<string, unknown>
      }) => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        emailAddresses: user.email_addresses || [],
        imageUrl: user.image_url || '/default-avatar.png',
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
        publicMetadata: user.public_metadata || {}
      }))
    } catch (error) {
      console.error('Error fetching users from Clerk:', error)
      return []
    }
  }

  // Fetch user by ID
  static async fetchUserById(userId: string): Promise<ClerkUser | null> {
    try {
      const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer sk_test_Da5TLNMHCM7mMFoawvfYuiL5KoEUzeCN8P7xOIohhn',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      
      if (!response.ok) {
        throw new Error(`Clerk API error: ${response.status} ${response.statusText}`)
      }
      
      const user = await response.json()
      
      return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        emailAddresses: user.email_addresses || [],
        imageUrl: user.image_url || '/default-avatar.png',
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
        publicMetadata: user.public_metadata || {}
      }
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
export type { ClerkUser }
