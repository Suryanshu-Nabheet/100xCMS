export interface BrowseCoursesData {
  filters: Array<{
    id: string
    label: string
    count: number
  }>
  sortOptions: Array<{
    id: string
    label: string
  }>
  categories: Array<{
    id: string
    label: string
    count: number
  }>
  searchPlaceholder: string
  emptyState: {
    title: string
    description: string
  }
}

export const browseCoursesData: BrowseCoursesData = {
  filters: [
    { id: 'all', label: 'All Courses', count: 0 },
    { id: 'free', label: 'Free', count: 0 },
    { id: 'paid', label: 'Paid', count: 0 },
    { id: 'new', label: 'New', count: 0 }
  ],
  sortOptions: [
    { id: 'recent', label: 'Recently Added' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' }
  ],
  categories: [
    { id: 'all', label: 'All Categories', count: 0 },
    { id: 'web-development', label: 'Web Development', count: 0 },
    { id: 'mobile-development', label: 'Mobile Development', count: 0 },
    { id: 'data-science', label: 'Data Science', count: 0 },
    { id: 'machine-learning', label: 'Machine Learning', count: 0 },
    { id: 'cybersecurity', label: 'Cybersecurity', count: 0 },
    { id: 'cloud-computing', label: 'Cloud Computing', count: 0 }
  ],
  searchPlaceholder: "Search courses, instructors, or topics...",
  emptyState: {
    title: "No courses found",
    description: "Try adjusting your search or filter criteria."
  }
}
