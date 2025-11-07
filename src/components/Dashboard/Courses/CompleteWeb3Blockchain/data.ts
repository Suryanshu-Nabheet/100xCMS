import { CourseDetail } from '../coursesData'

export const completeWeb3BlockchainData: CourseDetail = {
  id: 'complete-web3-blockchain',
  title: 'Complete Web3/Blockchain Cohort',
  banner: '/Public/Complete Web3:Blockchain Cohort.png',
  discordLink: 'https://discord.gg/web3-blockchain',
  modules: [
    {
      id: 'module-1',
      title: 'Blockchain Fundamentals',
      description: 'Learn blockchain technology and cryptocurrency',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Blockchain',
          thumbnail: '/public/Content-Cover.png',
          duration: '50:20',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn blockchain fundamentals, consensus mechanisms, and cryptocurrency basics.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Blockchain Overview' },
            { time: 25, title: 'Consensus Mechanisms' }
          ],
          content: {
            notes: 'Blockchain is a distributed ledger technology.',
            links: []
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Smart Contracts & Web3',
      description: 'Build decentralized applications',
      lessons: [
        {
          id: 'lesson-2',
          title: 'Smart Contract Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '55:15',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Master smart contract development with Solidity and Web3 integration.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Solidity Basics' },
            { time: 30, title: 'Web3 Integration' }
          ],
          content: {
            notes: 'Smart contracts enable decentralized applications.',
            links: []
          }
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Understand blockchain technology',
    'Develop smart contracts',
    'Build Web3 applications',
    'Deploy to blockchain networks'
  ],
  requirements: [
    'Basic programming knowledge',
    'Understanding of JavaScript',
    'Computer with internet connection'
  ]
}

