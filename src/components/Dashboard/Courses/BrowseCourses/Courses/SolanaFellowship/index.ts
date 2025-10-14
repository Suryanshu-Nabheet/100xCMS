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

export const solanaFellowshipData: CourseDetail = {
  course: {
    id: 'solana-fellowship',
    title: 'Solana Fellowship',
    description: 'Advanced Solana blockchain development program focusing on high-performance decentralized applications.',
    instructor: '100xDevs',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop',
    price: 0,
    level: 'advanced',
    category: 'Blockchain',
    duration: '20 weeks',
    students: 3250,
    rating: 4.9,
    lessons: 100,
    features: ['Advanced Solana development', 'Rust programming', 'High-performance DApps', 'Ecosystem integration', 'Research opportunities'],
    requirements: ['Strong programming background', 'Blockchain knowledge', 'Commitment to advanced learning'],
    whatYouWillLearn: ['Solana architecture', 'Rust for blockchain', 'Program development', 'Performance optimization', 'Ecosystem tools'],
    discordLink: 'https://discord.gg/100xdevs'
  },
  content: [],
  modules: [
    {
      id: 'module-1',
      title: 'Solana Fundamentals',
      description: 'Core Solana blockchain concepts',
      lessons: [
        {
          id: 'solana-architecture',
          title: 'Solana Architecture Deep Dive',
          description: 'Understanding Solana\'s unique architecture and consensus mechanism',
          thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
          duration: '3 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      ]
    }
  ]
}
