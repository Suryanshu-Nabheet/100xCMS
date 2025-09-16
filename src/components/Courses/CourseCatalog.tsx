import React, { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { CourseCard } from './CourseCard'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'

export function CourseCatalog() {
  const { user } = useAuth()
  const { courses, enrollments, enrollInCourse } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['all', 'Web Development', 'Backend Development', 'Full Stack', 'Mobile Development', 'Data Science', 'DevOps']
  const levels = ['all', 'beginner', 'intermediate', 'advanced']

  const enrolledCourseIds = useMemo(() => {
    if (!user) return new Set()
    return new Set(enrollments.filter(e => e.userId === user.id).map(e => e.courseId))
  }, [user, enrollments])

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = !searchTerm || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
      const matchesPrice = priceFilter === 'all' || 
        (priceFilter === 'free' && course.price === 0) ||
        (priceFilter === 'paid' && course.price > 0)

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.students - a.students
        case 'rating':
          return b.rating - a.rating
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [courses, searchTerm, selectedCategory, selectedLevel, priceFilter, sortBy])

  const handleEnroll = (courseId: string) => {
    if (!user) return
    enrollInCourse(courseId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Course Catalog</h1>
          <p className="text-gray-400 mt-1">Discover and enroll in our comprehensive courses</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Basic Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses, instructors, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-200"
          />
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400">
          Showing {filteredAndSortedCourses.length} of {courses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
          : 'grid-cols-1'
      }`}>
        {filteredAndSortedCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={handleEnroll}
            enrolled={enrolledCourseIds.has(course.id)}
          />
        ))}
      </div>

      {filteredAndSortedCourses.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedLevel('all')
              setPriceFilter('all')
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}