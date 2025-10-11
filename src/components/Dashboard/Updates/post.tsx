'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, FileText, Link, Download, ChevronRight } from 'lucide-react'
import { CodeBlock } from './components/code-block'

// Post content type definitions
export interface PostContent {
  type: 'text' | 'image' | 'video' | 'link' | 'pdf' | 'doc' | 'code'
  data: string
  caption?: string
  language?: string
  filename?: string
  highlightLines?: number[]
}

export interface Post {
  id: string
  title: string
  description: string
  date: string
  time: string
  image: string
  category: string
  priority: 'high' | 'medium' | 'low'
  content: PostContent[]
}

// Priority Badge Component
export const PriorityBadge: React.FC<{ priority: Post['priority'] }> = ({ priority }) => {
  const colors = {
    high: 'bg-blue-500/20 text-blue-200 border-blue-400/40 backdrop-blur-sm',
    medium: 'bg-blue-600/20 text-blue-200 border-blue-500/40 backdrop-blur-sm',
    low: 'bg-blue-700/20 text-blue-200 border-blue-600/40 backdrop-blur-sm'
  }
  
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${colors[priority]} shadow-sm`}>
      {priority.toUpperCase()}
    </span>
  )
}

// Content Renderer Component
export const ContentRenderer: React.FC<{ content: PostContent[] }> = ({ content }) => {
  const renderContentItem = (item: PostContent, index: number) => {
    switch (item.type) {
      case 'text':
        return (
          <div key={index} className="mb-10">
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-blue-500/30 shadow-2xl">
              <p className="text-white leading-relaxed text-xl whitespace-pre-wrap font-light">
                {item.data}
              </p>
            </div>
          </div>
        )
      
      case 'image':
        return (
          <div key={index} className="mb-8">
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-blue-900/10 backdrop-blur-sm border border-blue-500/20">
              <img
                src={item.data}
                alt={item.caption || 'Post image'}
                className="w-full h-auto object-cover"
              />
            </div>
            {item.caption && (
              <div className="mt-4 text-center">
                <p className="text-blue-200 italic text-base font-medium bg-blue-900/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block border border-blue-500/30">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        )
      
      case 'video':
        return (
          <div key={index} className="mb-8">
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-black border border-blue-500/20">
              <video
                src={item.data}
                controls
                className="w-full h-auto"
                poster={item.caption ? undefined : undefined}
              />
            </div>
            {item.caption && (
              <div className="mt-4 text-center">
                <p className="text-blue-200 italic text-base font-medium bg-blue-900/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block border border-blue-500/30">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        )
      
      case 'link':
        return (
          <div key={index} className="mb-6">
            <a
              href={item.data}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl border border-blue-400/40"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Link className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-blue-200 text-lg">
                    {item.caption || 'External Link'}
                  </span>
                  <p className="text-blue-300 text-sm mt-1 opacity-80">
                    Click to open in new tab
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-300" />
              </div>
            </a>
          </div>
        )
      
      case 'pdf':
        return (
          <div key={index} className="mb-6">
            <a
              href={item.data}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gradient-to-r from-blue-500/10 to-blue-700/10 rounded-2xl border border-blue-400/40"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-blue-200 text-lg">
                    {item.caption || 'PDF Document'}
                  </span>
                  <p className="text-blue-300 text-sm mt-1 opacity-80">
                    Click to download PDF
                  </p>
                </div>
                <Download className="w-5 h-5 text-blue-300" />
              </div>
            </a>
          </div>
        )
      
      case 'doc':
        return (
          <div key={index} className="mb-6">
            <a
              href={item.data}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl border border-blue-400/40"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-blue-200 text-lg">
                    {item.caption || 'Document'}
                  </span>
                  <p className="text-blue-300 text-sm mt-1 opacity-80">
                    Click to download document
                  </p>
                </div>
                <Download className="w-5 h-5 text-blue-300" />
              </div>
            </a>
          </div>
        )
      
      case 'code':
        return (
          <div key={index} className="mb-8">
            <div className="bg-blue-900/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20">
              <CodeBlock
                language={item.language || 'javascript'}
                filename={item.filename}
                highlightLines={item.highlightLines || []}
                code={item.data}
                className="bg-transparent"
              />
              {item.caption && (
                <div className="px-6 pb-4">
                  <p className="text-blue-200 text-sm italic text-center bg-blue-900/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                    {item.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {content.map((item, index) => renderContentItem(item, index))}
    </div>
  )
}

// Post Header Component
export const PostHeader: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="mb-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
        {post.description}
      </p>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{post.time}</span>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
          {post.category}
        </span>
        <PriorityBadge priority={post.priority} />
      </div>

      {/* Featured Image */}
      <div className="relative group">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-80 rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
      </div>
    </div>
  )
}

// Complete Post Component
export const PostComponent: React.FC<{ post: Post; onClose?: () => void; layoutId?: string }> = ({ post, onClose, layoutId }) => {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 grid place-items-center z-[100] p-4">
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
        className="absolute top-4 right-4 z-[101] flex items-center justify-center bg-blue-900/50 backdrop-blur-sm rounded-full h-10 w-10 hover:bg-blue-800/50 transition-colors border border-blue-500/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Modal Container */}
      <motion.div
        layoutId={layoutId ? `card-${layoutId}` : undefined}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-4xl max-h-[90vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-blue-500/30"
      >
        {/* Scrollable Content */}
        <div className="max-h-[90vh] overflow-y-auto bg-black">
          {/* Header Image - Scrollable */}
          <motion.div 
            layoutId={layoutId ? `image-${layoutId}` : undefined}
            className="relative h-64 md:h-80 overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-blue-900/20 to-transparent" />
            
            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-white mb-4">
                  <div className="flex items-center gap-2 bg-blue-900/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-500/30">
                    <Calendar className="w-4 h-4 text-blue-300" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-900/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-500/30">
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span>{post.time}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-200 rounded-lg font-medium border border-blue-400/40">
                    {post.category}
                  </span>
                  <PriorityBadge priority={post.priority} />
                </div>

              {/* Title and Description */}
              <motion.h1 
                layoutId={layoutId ? `title-${layoutId}` : undefined}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
              >
                {post.title}
              </motion.h1>
                <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl font-light">
                  {post.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            {/* Content Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Content</h2>
              </div>
              <p className="text-blue-200">Explore the detailed information below</p>
            </div>

            {/* Post Content */}
            <div className="space-y-6">
              <ContentRenderer content={post.content} />
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-blue-800/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-blue-200 text-sm">
                  <span className="text-blue-300">Published on</span> {post.date} at {post.time}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-300 text-sm">Category:</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-lg text-xs font-medium border border-blue-400/40">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Post Card Component (for lists)
export const PostCard: React.FC<{ 
  post: Post
  onClick: () => void
  layoutId: string
}> = ({ post, onClick, layoutId }) => {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 group"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Image */}
        <motion.div layoutId={`image-${layoutId}`} className="flex-shrink-0">
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
              layoutId={`title-${layoutId}`}
              className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors"
            >
              {post.title}
            </motion.h3>
            <PriorityBadge priority={post.priority} />
          </div>

          <motion.p
            layoutId={`description-${layoutId}`}
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
          layoutId={`button-${layoutId}`}
          className="flex-shrink-0"
        >
          <div className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PostComponent
