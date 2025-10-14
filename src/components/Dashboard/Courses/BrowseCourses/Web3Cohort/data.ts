export const web3CohortData = {
  id: 'web3-cohort',
  title: 'Web3 Development',
  banner: '/public/WEB3.png',
  discordLink: 'https://discord.gg/web3',
  lessons: [
    {
      id: 'lesson-1',
      title: 'Understanding Blockchain',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'Blockchain Basics' },
        { time: 20, title: 'Consensus Mechanisms' },
        { time: 40, title: 'Cryptography' },
        { time: 60, title: 'Applications' }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Smart Contracts',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'Contract Basics' },
        { time: 30, title: 'Solidity' },
        { time: 60, title: 'Deployment' },
        { time: 90, title: 'Testing' }
      ]
    },
    {
      id: 'lesson-3',
      title: 'Building DApps',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'DApp Architecture' },
        { time: 30, title: 'Frontend Integration' },
        { time: 60, title: 'Backend Services' },
        { time: 90, title: 'Deployment' }
      ]
    }
  ]
}
