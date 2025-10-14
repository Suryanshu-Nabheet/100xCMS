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

export const web3CohortData: CourseDetail = {
  course: {
    id: 'web3-cohort',
    title: 'Cohort 3.0 | Web3',
    description: 'Complete Web3 development cohort covering blockchain, smart contracts, and decentralized applications.',
    instructor: '100xDevs',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=400&fit=crop',
    price: 0,
    level: 'intermediate',
    category: 'Web3',
    duration: '18 weeks',
    students: 12450,
    rating: 4.8,
    lessons: 90,
    features: ['Web3 development', 'Rust/Solidity programming', 'Smart Contracts', 'Projects', 'Blockchain fundamentals'],
    requirements: ['Programming experience', 'Understanding of cryptography', 'Interest in blockchain technology'],
    whatYouWillLearn: ['Blockchain fundamentals', 'Smart contract development', 'DeFi protocols', 'NFT development', 'Web3 frontend integration'],
    discordLink: 'https://discord.gg/100xdevs'
  },
  content: [],
  modules: [
    {
      id: 'module-1',
      title: 'Blockchain Fundamentals',
      description: 'Core blockchain concepts and technology',
      lessons: [
        {
          id: 'blockchain-basics',
          title: 'Blockchain Fundamentals',
          description: 'Understanding blockchain technology and its applications',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
          duration: '2 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      ]
    }
  ]
}
