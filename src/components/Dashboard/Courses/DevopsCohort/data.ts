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
      timestamps: [
        { time: 0, title: 'Docker Introduction' },
        { time: 30, title: 'Images & Containers' },
        { time: 60, title: 'Dockerfile' },
        { time: 90, title: 'Docker Compose' }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Kubernetes Basics',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'K8s Overview' },
        { time: 30, title: 'Pods & Services' },
        { time: 60, title: 'Deployments' },
        { time: 90, title: 'Ingress' }
      ]
    },
    {
      id: 'lesson-3',
      title: 'GitHub Actions',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'CI/CD Basics' },
        { time: 25, title: 'Workflows' },
        { time: 50, title: 'Actions' },
        { time: 75, title: 'Deployment' }
      ]
    }
  ]
}
