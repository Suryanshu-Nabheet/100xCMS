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

export const webDevCohortData: CourseDetail = {
  course: {
    id: 'web-dev-cohort',
    title: 'Cohort 3.0 | Web Dev',
    description: 'Complete web development cohort covering frontend, backend, and full-stack development.',
    instructor: '100xDevs',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop',
    price: 0,
    level: 'beginner',
    category: 'Web Development',
    duration: '16 weeks',
    students: 25680,
    rating: 4.7,
    lessons: 80,
    features: ['Complete web development', 'Real-world projects', 'Open source project setup', 'Industry mentorship', 'Job placement support'],
    requirements: ['Basic computer skills', 'Internet connection', 'Commitment to learn'],
    whatYouWillLearn: ['HTML, CSS, and JavaScript', 'React.js and modern frameworks', 'Backend development with Node.js', 'Database design and management', 'Deployment and DevOps basics'],
    discordLink: 'https://discord.gg/100xdevs'
  },
  content: [],
  modules: [
    {
      id: 'module-1',
      title: 'Frontend Fundamentals',
      description: 'HTML, CSS, and JavaScript basics',
      lessons: [
        {
          id: 'week1-orientation',
          title: 'Week 1 - Orientation, HTML/CSS/Basic JS',
          description: 'Course orientation and introduction to web development fundamentals',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          duration: '2 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 'cohort2-warmup',
          title: 'Cohort 2 Warmup Videos',
          description: 'Preparation videos from previous cohort to get you started',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
          duration: '1.5 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 'week2-async',
          title: 'Week 2 - Async JS',
          description: 'Understanding asynchronous JavaScript and promises',
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
          duration: '2.5 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 'week2-offline',
          title: 'Week 2 - Offline Videos',
          description: 'Additional offline content for Week 2 topics',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          duration: '1 hour',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 'week3-dom',
          title: 'Week 3 | DOM',
          description: 'Document Object Model manipulation and event handling',
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
          duration: '2 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        {
          id: 'week4-nodejs',
          title: 'Week 4 | Node.Js And HTTP',
          description: 'Introduction to Node.js and HTTP protocol',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          duration: '3 hours',
          type: 'video',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      ]
    }
  ]
}
