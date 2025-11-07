import { CourseDetail } from '../coursesData'

export const completeWebDevDevOpsData: CourseDetail = {
  id: 'complete-web-dev-devops',
  title: 'Complete Web Development + DevOps Cohort',
  banner: '/Public/Complete Web Development + DevOps Cohort.png',
  discordLink: 'https://discord.gg/webdev-devops',
  modules: [
    {
      id: 'module-1',
      title: 'Web Development Fundamentals',
      description: 'Master frontend and backend web development',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Web Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:30',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn the fundamentals of web development including HTML, CSS, JavaScript, and modern frameworks.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Course Introduction' },
            { time: 15, title: 'HTML & CSS Basics' },
            { time: 30, title: 'JavaScript Fundamentals' }
          ],
          content: {
            notes: 'Web development is the foundation of modern applications.',
            links: [
              { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'DevOps Essentials',
      description: 'Learn DevOps practices and tools',
      lessons: [
        {
          id: 'lesson-2',
          title: 'Introduction to DevOps',
          thumbnail: '/public/Content-Cover.png',
          duration: '50:20',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Master DevOps practices including CI/CD, containerization, and cloud deployment.',
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
    }
  ],
  whatYouWillLearn: [
    'Master full-stack web development',
    'Learn DevOps practices and tools',
    'Deploy applications to production'
  ],
  requirements: [
    'Basic programming knowledge',
    'Willingness to learn',
    'Computer with internet connection'
  ]
}

