'use client'
import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Clock, ChevronRight } from 'lucide-react'

// Import post data and types
import { posts, Post } from './index'

// Outside click hook
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}

// Close Icon Component
const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: Post['priority'] }) => {
  const colors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30'
  }
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full border ${colors[priority]}`}>
      {priority.toUpperCase()}
    </span>
  )
}

// Main Updates Component
export const UpdatesMain: React.FC = () => {
  const [activePost, setActivePost] = useState<Post | null>(null)
  const ref = useRef<HTMLDivElement>(null)
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

  useOutsideClick(ref, () => setActivePost(null))

  const renderContent = (content: Post['content']) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'text':
          return (
            <p key={index} className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {item.data}
            </p>
          )
        case 'image':
          return (
            <div key={index} className="mb-4">
              <img
                src={item.data}
                alt={item.caption || 'Update image'}
                className="w-full rounded-lg object-cover"
              />
              {item.caption && (
                <p className="text-sm text-gray-500 mt-2 italic">{item.caption}</p>
              )}
            </div>
          )
        case 'video':
          return (
            <div key={index} className="mb-4">
              <video
                src={item.data}
                controls
                className="w-full rounded-lg"
              />
              {item.caption && (
                <p className="text-sm text-gray-500 mt-2 italic">{item.caption}</p>
              )}
            </div>
          )
        case 'link':
          return (
            <div key={index} className="mb-4">
              <a
                href={item.data}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline break-all"
              >
                {item.caption || item.data}
              </a>
            </div>
          )
        case 'pdf':
        case 'doc':
          return (
            <div key={index} className="mb-4">
              <a
                href={item.data}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4 mr-2" />
                {item.caption || `Download ${item.type.toUpperCase()}`}
              </a>
            </div>
          )
        default:
          return null
      }
    })
  }

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
          {posts.map((post) => (
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
                    <PriorityBadge priority={post.priority} />
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
          ))}
        </div>
      </div>

      {/* Expanded Post Modal */}
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

      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`close-${activePost.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-4 right-4 z-[101] flex items-center justify-center bg-white rounded-full h-10 w-10 hover:bg-gray-100 transition-colors"
              onClick={() => setActivePost(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${activePost.id}-${id}`}
              ref={ref}
              className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header Image */}
              <motion.div layoutId={`image-${activePost.id}-${id}`}>
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Title and Meta */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <motion.h2
                        layoutId={`title-${activePost.id}-${id}`}
                        className="text-2xl md:text-3xl font-bold text-gray-900"
                      >
                        {activePost.title}
                      </motion.h2>
                      <PriorityBadge priority={activePost.priority} />
                    </div>

                    <motion.p
                      layoutId={`description-${activePost.id}-${id}`}
                      className="text-gray-600 text-lg mb-4"
                    >
                      {activePost.description}
                    </motion.p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{activePost.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{activePost.time}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {activePost.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="border-t border-gray-200 pt-6">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="prose prose-gray max-w-none"
                    >
                      {renderContent(activePost.content)}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UpdatesMain
