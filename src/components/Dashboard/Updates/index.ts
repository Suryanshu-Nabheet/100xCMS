import { Post } from './post'

// Import JSON files dynamically
import post1 from './posts/post-1.json'
import post2 from './posts/post-2.json'
import post3 from './posts/post-3.json'
import post4 from './posts/post-4.json'
import post5 from './posts/post-5.json'

// Load posts from JSON files
export const posts: Post[] = [
  post1,
  post2,
  post3,
  post4,
  post5
]

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
