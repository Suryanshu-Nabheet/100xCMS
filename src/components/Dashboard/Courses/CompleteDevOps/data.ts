import { CourseDetail } from '../coursesData'

export const completeDevOpsData: CourseDetail = {
  id: 'complete-devops',
  title: 'Complete DevOps Cohort',
  banner: '/Public/Complete Devops Cohort.png',
  discordLink: 'https://discord.gg/devops',
  modules: [
    {
      id: 'module-1',
      title: 'DevOps Fundamentals',
      description: 'Learn DevOps practices and principles',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to DevOps',
          thumbnail: '/public/Content-Cover.png',
          duration: '50:20',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Master DevOps practices including CI/CD, containerization, and automation.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'DevOps Overview' },
            { time: 25, title: 'CI/CD Pipelines' }
          ],
          content: {
            notes: 'DevOps bridges development and operations.',
            links: []
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Containerization & Orchestration',
      description: 'Docker and Kubernetes',
      lessons: [
        {
          id: 'lesson-2',
          title: 'Docker & Kubernetes',
          thumbnail: '/public/Content-Cover.png',
          duration: '55:15',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn containerization with Docker and orchestration with Kubernetes.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Docker Basics' },
            { time: 30, title: 'Kubernetes Introduction' }
          ],
          content: {
            notes: 'Containerization enables scalable deployments.',
            links: []
          }
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Master DevOps practices',
    'Learn CI/CD pipelines',
    'Containerization with Docker',
    'Orchestration with Kubernetes'
  ],
  requirements: [
    'Basic Linux knowledge',
    'Understanding of software development',
    'Computer with internet connection'
  ]
}

