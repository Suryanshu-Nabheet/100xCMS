'use client'
import React, { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Clock, ChevronRight } from 'lucide-react'

// Import post data and types
import { posts, Post } from './index'
import { PostComponent } from './post'

// Main Updates Component
export const UpdatesMain: React.FC = () => {
  const [activePost, setActivePost] = useState<Post | null>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActivePost(null)
      }
    }

    if (activePost) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activePost])

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-blue-400">Updates</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay informed with the latest news, announcements, and important information from ClassX
          </p>
        </div>

        {/* Updates List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Updates Available</h3>
                <p className="text-gray-400 mb-6">
                  There are currently no updates to display. Check back later for the latest news and announcements.
                </p>
                <div className="text-sm text-blue-400">
                  Updates will appear here when they are published.
                </div>
              </div>
            </div>
          ) : (
            posts.map((post) => (
            <motion.div
              key={post.id}
              layoutId={`card-${post.id}-${id}`}
              onClick={() => setActivePost(post)}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex flex-col md:flex-row gap-4 items-start">
                {/* Image */}
                <motion.div layoutId={`image-${post.id}-${id}`} className="flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full md:w-24 h-24 rounded-lg object-cover"
                  />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <motion.h3
                      layoutId={`title-${post.id}-${id}`}
                      className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </motion.h3>
                    <span className={`px-2 py-1 text-xs rounded-full border ${
                      post.priority === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      post.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}>
                      {post.priority.toUpperCase()}
                    </span>
                  </div>

                  <motion.p
                    layoutId={`description-${post.id}-${id}`}
                    className="text-gray-300 mb-3 line-clamp-2"
                  >
                    {post.description}
                  </motion.p>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.time}</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  layoutId={`button-${post.id}-${id}`}
                  className="flex-shrink-0"
                >
                  <div className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Post Component */}
      <AnimatePresence>
        {activePost && (
          <PostComponent 
            post={activePost} 
            onClose={() => setActivePost(null)} 
            layoutId={activePost.id}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default UpdatesMain