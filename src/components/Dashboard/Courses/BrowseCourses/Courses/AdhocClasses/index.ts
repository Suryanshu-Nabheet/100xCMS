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

export const adhocClassesData: CourseDetail = {
  course: {
    id: 'adhoc-classes',
    title: 'Ad hoc classes',
    description: 'Flexible learning sessions covering various programming topics and technologies as they emerge.',
    instructor: '100xDevs',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop',
    price: 0,
    level: 'intermediate',
    category: 'Programming',
    duration: 'Self-paced',
    students: 15420,
    rating: 4.8,
    lessons: 45,
    features: ['Live coding sessions', 'Real-world projects', 'Community support', 'Flexible schedule', 'Industry insights'],
    requirements: ['Basic programming knowledge', 'Computer with internet connection', 'Willingness to learn'],
    whatYouWillLearn: ['Latest programming trends', 'Best practices', 'Problem-solving techniques', 'Industry standards', 'Collaborative development'],
    discordLink: 'https://discord.gg/100xdevs'
  },
  content: [],
  modules: [
    {
      id: 'module-1',
      title: 'Foundation Concepts',
      description: 'Core programming concepts and fundamentals',
      lessons: [
        {
          id: 'intro-session',
          title: 'Introduction to Ad hoc Classes',
          description: 'Welcome session and overview of the flexible learning approach',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
          duration: '15 min',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 'setup-environment',
          title: 'Environment Setup',
          description: 'Setting up your development environment for various technologies',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          duration: '25 min',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      ]
    }
  ]
}
