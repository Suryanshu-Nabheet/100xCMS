export const devopsCohortData = {
  id: 'devops-cohort',
  title: 'DevOps Engineering',
  banner: '/public/DEVOPS.png',
  discordLink: 'https://discord.gg/devops',
  lessons: [
    {
      id: 'lesson-1',
      title: 'Docker Fundamentals',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      duration: '90 min',
      completed: false
    },
    {
      id: 'lesson-2',
      title: 'Kubernetes Basics',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      duration: '120 min',
      completed: false
    },
    {
      id: 'lesson-3',
      title: 'GitHub Actions',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      duration: '75 min',
      completed: false
    }
  ],
  whatYouWillLearn: [
    'Master containerization',
    'Build CI/CD pipelines',
    'Deploy scalable applications',
    'Monitor production systems',
    'Implement infrastructure as code'
  ],
  requirements: [
    'Linux command line experience',
    'Basic programming knowledge',
    'Cloud platform familiarity',
    'System administration basics'
  ]
}
