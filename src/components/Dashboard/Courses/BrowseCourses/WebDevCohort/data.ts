export const webDevCohortData = {
  id: 'web-dev-cohort',
  title: 'Web Development Cohort',
  banner: '/public/WEBDEV.png',
  discordLink: 'https://discord.gg/webdev',
  lessons: [
    {
      id: 'lesson-1',
      title: 'Introduction to HTML',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'Course Introduction' },
        { time: 15, title: 'HTML Basics' },
        { time: 30, title: 'HTML Elements' },
        { time: 45, title: 'HTML Forms' }
      ]
    },
    {
      id: 'lesson-2',
      title: 'CSS Styling Basics',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'CSS Introduction' },
        { time: 20, title: 'Selectors' },
        { time: 40, title: 'Properties' },
        { time: 60, title: 'Layout' }
      ]
    },
    {
      id: 'lesson-3',
      title: 'JavaScript Fundamentals',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'JS Basics' },
        { time: 30, title: 'Variables' },
        { time: 60, title: 'Functions' },
        { time: 90, title: 'DOM Manipulation' }
      ]
    }
  ]
}
