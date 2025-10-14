import { Course } from '../coursesData'

export interface CourseContent {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  type: 'video' | 'reading' | 'quiz' | 'assignment'
  completed?: boolean
  locked?: boolean
  videoUrl?: string
  content?: string
  resources?: string[]
}

export interface CourseDetail {
  course: Course
  content: CourseContent[]
  modules: {
    id: string
    title: string
    description: string
    lessons: CourseContent[]
  }[]
}

export const dsaClassesData: CourseDetail = {
  course: {
    id: 'dsa-classes',
    title: 'DSA Classes',
    description: 'Master Data Structures and Algorithms with comprehensive theory and practical implementation.',
    instructor: '100xDevs',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop',
    price: 0,
    level: 'intermediate',
    category: 'Computer Science',
    duration: '12 weeks',
    students: 12850,
    rating: 4.9,
    lessons: 60,
    features: ['Comprehensive DSA coverage', 'Coding challenges', 'Interview preparation', 'Algorithm visualization', 'Practice problems'],
    requirements: ['Basic programming knowledge', 'Understanding of basic math', 'Problem-solving mindset'],
    whatYouWillLearn: ['Data structures fundamentals', 'Algorithm design patterns', 'Time and space complexity', 'Problem-solving strategies', 'Interview techniques'],
    discordLink: 'https://discord.gg/100xdevs'
  },
  content: [],
  modules: [
    {
      id: 'module-1',
      title: 'Basic Data Structures',
      description: 'Introduction to fundamental data structures',
      lessons: [
        {
          id: 'arrays-intro',
          title: 'Arrays and Strings',
          description: 'Introduction to arrays, string manipulation, and basic operations',
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
          duration: '45 min',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 'linked-lists',
          title: 'Linked Lists',
          description: 'Understanding linked lists, operations, and implementations',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          duration: '50 min',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      ]
    }
  ]
}
