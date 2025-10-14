export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: Array<{
    id: string
    title: string
    description: string
    videoUrl: string
    duration: string
    order: number
  }>
  status: 'published' | 'draft'
  createdAt: string
  enrolledStudents: number
}

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Complete React Development Course',
    description: 'Learn React from scratch with hands-on projects and real-world applications. Perfect for beginners who want to become React developers.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    price: 0,
    category: 'Web Development',
    level: 'beginner',
    duration: '8 hours',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to React',
        description: 'Understanding React basics and setup',
        videoUrl: 'https://example.com/video1',
        duration: '30 minutes',
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'Components and Props',
        description: 'Creating and using React components',
        videoUrl: 'https://example.com/video2',
        duration: '45 minutes',
        order: 2
      }
    ],
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    enrolledStudents: 0
  },
  {
    id: 'course-2',
    title: 'Advanced JavaScript Concepts',
    description: 'Master advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-194b291561e5?w=400&h=225&fit=crop',
    price: 0,
    category: 'Web Development',
    level: 'intermediate',
    duration: '12 hours',
    lessons: [
      {
        id: 'lesson-3',
        title: 'Closures and Scope',
        description: 'Understanding JavaScript closures',
        videoUrl: 'https://example.com/video3',
        duration: '40 minutes',
        order: 1
      },
      {
        id: 'lesson-4',
        title: 'Async/Await Patterns',
        description: 'Modern asynchronous programming',
        videoUrl: 'https://example.com/video4',
        duration: '50 minutes',
        order: 2
      }
    ],
    status: 'published',
    createdAt: '2024-01-20T14:30:00Z',
    enrolledStudents: 0
  },
  {
    id: 'course-3',
    title: 'Full-Stack Development with Node.js',
    description: 'Build complete web applications using Node.js, Express, and MongoDB. Learn backend development from scratch.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    price: 0,
    category: 'Web Development',
    level: 'advanced',
    duration: '20 hours',
    lessons: [
      {
        id: 'lesson-5',
        title: 'Node.js Fundamentals',
        description: 'Introduction to Node.js runtime',
        videoUrl: 'https://example.com/video5',
        duration: '60 minutes',
        order: 1
      },
      {
        id: 'lesson-6',
        title: 'Express.js Framework',
        description: 'Building REST APIs with Express',
        videoUrl: 'https://example.com/video6',
        duration: '75 minutes',
        order: 2
      }
    ],
    status: 'draft',
    createdAt: '2024-02-01T09:15:00Z',
    enrolledStudents: 0
  }
]
