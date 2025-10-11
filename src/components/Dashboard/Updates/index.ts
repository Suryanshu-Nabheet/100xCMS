import { Post } from './post'

// Load posts from JSON files
export const posts: Post[] = []

// Helper function to get post by ID
export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id)
}

// Helper function to get posts by category
export const getPostsByCategory = (category: string): Post[] => {
  return posts.filter(post => post.category === category)
}

// Helper function to get posts by priority
export const getPostsByPriority = (priority: Post['priority']): Post[] => {
  return posts.filter(post => post.priority === priority)
}

// Helper function to search posts
export const searchPosts = (query: string): Post[] => {
  const lowercaseQuery = query.toLowerCase()
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  )
}

// Export main components
export { default as UpdatesMain } from './main'
export { default as PostComponent, PostHeader, ContentRenderer, PriorityBadge, PostCard } from './post'

// Export types
export type { Post, PostContent } from './post'
