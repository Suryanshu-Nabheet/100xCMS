export interface MyCoursesData {
  filters: Array<{
    id: string
    label: string
    count: number
  }>
  sortOptions: Array<{
    id: string
    label: string
  }>
  emptyState: {
    title: string
    description: string
    buttonText: string
  }
}

export const myCoursesData: MyCoursesData = {
  filters: [
    { id: 'all', label: 'All Courses', count: 0 },
    { id: 'in-progress', label: 'In Progress', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'new', label: 'New', count: 0 }
  ],
  sortOptions: [
    { id: 'recent', label: 'Recently Accessed' },
    { id: 'progress', label: 'Progress' },
    { id: 'title', label: 'Title' },
    { id: 'duration', label: 'Duration' }
  ],
  emptyState: {
    title: "No courses yet",
    description: "Start your learning journey by enrolling in courses that interest you.",
    buttonText: "Browse Courses"
  }
}
