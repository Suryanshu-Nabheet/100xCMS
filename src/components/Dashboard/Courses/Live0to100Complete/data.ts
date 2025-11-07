import { CourseDetail } from '../coursesData'

export const live0to100CompleteData: CourseDetail = {
  id: 'live-0-100-complete',
  title: 'Live 0-100 Complete',
  banner: '/Public/Live 0-100 Complete.jpg',
  discordLink: 'https://discord.gg/live-0-100',
  modules: [
    {
      id: 'module-1',
      title: 'From Zero to Hero',
      description: 'Complete journey from beginner to advanced',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Getting Started',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:30',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Start your journey from absolute zero to becoming a complete developer.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Course Introduction' },
            { time: 20, title: 'Setting Up Environment' }
          ],
          content: {
            notes: 'Complete learning path from beginner to advanced.',
            links: []
          }
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Complete development journey',
    'From beginner to advanced',
    'Real-world projects',
    'Industry best practices'
  ],
  requirements: [
    'No prior experience needed',
    'Willingness to learn',
    'Computer with internet connection'
  ]
}

