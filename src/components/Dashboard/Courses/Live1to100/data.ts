import { CourseDetail } from '../coursesData'

export const live1to100Data: CourseDetail = {
  id: 'live-1-100',
  title: 'Live 1-100',
  banner: '/Public/Live 1-100.jpg',
  discordLink: 'https://discord.gg/live-1-100',
  modules: [
    {
      id: 'module-1',
      title: 'Advanced Development',
      description: 'Take your skills to the next level',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Advanced Concepts',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:30',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Advance from intermediate to expert level developer.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Advanced Topics' },
            { time: 30, title: 'Expert Techniques' }
          ],
          content: {
            notes: 'For developers ready to level up.',
            links: []
          }
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Advanced programming concepts',
    'Expert-level techniques',
    'Complex project development',
    'Industry best practices'
  ],
  requirements: [
    'Basic programming knowledge',
    'Understanding of fundamentals',
    'Computer with internet connection'
  ]
}

