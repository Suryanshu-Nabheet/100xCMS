import { CourseDetail } from '../coursesData'

export const completeWebDevData: CourseDetail = {
  id: 'complete-web-dev',
  title: 'Complete Web Development Cohort',
  banner: '/Public/Complete Web Development Cohort.png',
  discordLink: 'https://discord.gg/webdev',
  modules: [
    {
      id: 'module-1',
      title: 'Frontend Development',
      description: 'Master frontend technologies',
      lessons: [
        {
          id: 'lesson-1',
          title: 'HTML, CSS & JavaScript',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:30',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn the fundamentals of web development.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Introduction' },
            { time: 20, title: 'HTML Basics' }
          ],
          content: {
            notes: 'Web development fundamentals.',
            links: []
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Backend Development',
      description: 'Build server-side applications',
      lessons: [
        {
          id: 'lesson-2',
          title: 'Node.js & Databases',
          thumbnail: '/public/Content-Cover.png',
          duration: '50:20',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Master backend development with Node.js.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Node.js Introduction' },
            { time: 25, title: 'Database Integration' }
          ],
          content: {
            notes: 'Backend development essentials.',
            links: []
          }
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Master frontend and backend development',
    'Build full-stack web applications',
    'Deploy applications to production'
  ],
  requirements: [
    'Basic programming knowledge',
    'Computer with internet connection'
  ]
}

