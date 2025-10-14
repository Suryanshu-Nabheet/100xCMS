// Server-side API route for fetching students from Clerk
// This should be implemented in your backend/API routes

import type { NextApiRequest, NextApiResponse } from 'next'

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClerkUser[] | { error: string }>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get Clerk secret key from environment variables
    const clerkSecretKey = process.env.CLERK_SECRET_KEY
    
    if (!clerkSecretKey) {
      return res.status(500).json({ error: 'Clerk secret key not configured' })
    }

    // Fetch users from Clerk API
    const response = await fetch('https://api.clerk.com/v1/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${clerkSecretKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Clerk API error: ${response.status} ${response.statusText}`)
    }

    const data: ClerkResponse = await response.json()
    
    // Return the users data
    res.status(200).json(data.data || [])
  } catch (error) {
    console.error('Error fetching users from Clerk:', error)
    res.status(500).json({ error: 'Failed to fetch users from Clerk API' })
  }
}
