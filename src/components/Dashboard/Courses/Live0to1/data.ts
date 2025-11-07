import { CourseDetail } from '../coursesData'

export const live0to1Data: CourseDetail = {
  id: 'live-0-1',
  title: 'Live 0-1',
  banner: '/Public/Live 0-1.jpg',
  discordLink: 'https://discord.gg/live-0-1',
  modules: [
    {
      id: 'module-1',
      title: 'Beginner Foundations',
      description: 'Learn the basics from scratch',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Programming',
          thumbnail: '/public/Content-Cover.png',
          duration: '40:20',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Start your programming journey from absolute zero.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'What is Programming?' },
            { time: 20, title: 'First Steps' }
          ],
          content: {
            notes: 'Perfect for absolute beginners.',
            links: []
          }
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Programming fundamentals',
    'Basic concepts and syntax',
    'Problem-solving skills',
    'Building your first projects'
  ],
  requirements: [
    'No prior experience needed',
    'Computer with internet connection'
  ]
}

