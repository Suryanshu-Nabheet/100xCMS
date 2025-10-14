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

export const devopsCohortData: CourseDetail = {
  course: {
    id: 'devops-cohort',
    title: 'Cohort 3.0 | DevOps',
    description: 'Complete DevOps cohort covering infrastructure, CI/CD, and cloud technologies.',
    instructor: '100xDevs',
    thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=400&fit=crop',
    price: 0,
    level: 'intermediate',
    category: 'DevOps',
    duration: '14 weeks',
    students: 8950,
    rating: 4.6,
    lessons: 70,
    features: ['Complete DevOps', 'Real-world projects', 'Open source project setup', 'Cloud platform expertise', 'Industry best practices'],
    requirements: ['Basic Linux knowledge', 'Programming experience', 'Cloud computing interest'],
    whatYouWillLearn: ['Containerization with Docker', 'Orchestration with Kubernetes', 'CI/CD pipeline setup', 'Infrastructure as Code', 'Monitoring and logging'],
    discordLink: 'https://discord.gg/100xdevs'
  },
  content: [],
  modules: [
    {
      id: 'module-1',
      title: 'Containerization',
      description: 'Docker and container technologies',
      lessons: [
        {
          id: 'docker-intro',
          title: 'Docker Fundamentals',
          description: 'Introduction to containerization with Docker',
          thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
          duration: '2 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      ]
    }
  ]
}
