'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, FileText, Link, Download, ChevronRight } from 'lucide-react'

// Post content type definitions
export interface PostContent {
  type: 'text' | 'image' | 'video' | 'link' | 'pdf' | 'doc'
  data: string
  caption?: string
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
    high: 'bg-red-500/20 text-red-400 border-red-500/30 backdrop-blur-sm',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 backdrop-blur-sm',
    low: 'bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm'
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
          <div key={index} className="mb-8">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {item.data}
              </p>
            </div>
          </div>
        )
      
      case 'image':
        return (
          <div key={index} className="mb-8">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={item.data}
                alt={item.caption || 'Post image'}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {item.caption && (
              <div className="mt-4 text-center">
                <p className="text-gray-600 italic text-lg font-medium bg-gray-50 px-4 py-2 rounded-lg inline-block">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        )
      
      case 'video':
        return (
          <div key={index} className="mb-8">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black">
              <video
                src={item.data}
                controls
                className="w-full h-auto"
                poster={item.caption ? undefined : undefined}
              />
            </div>
            {item.caption && (
              <div className="mt-4 text-center">
                <p className="text-gray-600 italic text-lg font-medium bg-gray-50 px-4 py-2 rounded-lg inline-block">
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
              className="group block p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl border border-blue-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Link className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-blue-700 text-lg group-hover:text-blue-800">
                    {item.caption || 'External Link'}
                  </span>
                  <p className="text-blue-600 text-sm mt-1 opacity-80">
                    Click to open in new tab
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-blue-500 group-hover:translate-x-2 transition-transform duration-300" />
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
              className="group block p-6 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-2xl border border-red-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-red-700 text-lg group-hover:text-red-800">
                    {item.caption || 'PDF Document'}
                  </span>
                  <p className="text-red-600 text-sm mt-1 opacity-80">
                    Click to download PDF
                  </p>
                </div>
                <Download className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
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
              className="group block p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl border border-green-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-green-700 text-lg group-hover:text-green-800">
                    {item.caption || 'Document'}
                  </span>
                  <p className="text-green-600 text-sm mt-1 opacity-80">
                    Click to download document
                  </p>
                </div>
                <Download className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </a>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
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
export const PostComponent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Fixed Header Image */}
      <div className="relative h-80 md:h-96 flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/80 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.time}</span>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium border border-white/30">
                {post.category}
              </span>
              <PriorityBadge priority={post.priority} />
            </div>

            {/* Title and Description */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          {/* Content Header */}
          <div className="mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Content</h2>
            <p className="text-gray-600">Scroll down to read the full content</p>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            <ContentRenderer content={post.content} />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Published on {post.date} at {post.time}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Category:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
