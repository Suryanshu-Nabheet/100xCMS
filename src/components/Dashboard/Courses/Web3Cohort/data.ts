export const web3CohortData = {
  id: 'web3-cohort',
  title: 'Web3 Development',
  banner: '/public/WEB3.png',
  discordLink: 'https://discord.gg/web3',
  modules: [
    {
      id: 'module-1',
      title: 'Blockchain and Smart Contracts',
      description: 'Learn blockchain fundamentals and smart contract development with Solidity',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Understanding Blockchain',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn the fundamentals of blockchain technology, consensus mechanisms, and cryptographic principles.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Blockchain Basics' },
            { time: 20, title: 'Consensus Mechanisms' },
            { time: 40, title: 'Cryptography' },
            { time: 60, title: 'Applications' }
          ],
          content: {
            notes: 'Blockchain is a distributed ledger technology that enables secure, transparent transactions.',
            links: [
              { title: 'Ethereum Documentation', url: 'https://ethereum.org/en/developers/docs/' },
              { title: 'Bitcoin Whitepaper', url: 'https://bitcoin.org/bitcoin.pdf' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'Blockchain Technology Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive guide to blockchain technology and its applications.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'Smart Contracts',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master smart contract development using Solidity, including deployment and testing.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Contract Basics' },
            { time: 30, title: 'Solidity' },
            { time: 60, title: 'Deployment' },
            { time: 90, title: 'Testing' }
          ],
          content: {
            notes: 'Smart contracts are self-executing contracts with terms directly written into code.',
            links: [
              { title: 'Solidity Documentation', url: 'https://docs.soliditylang.org/' },
              { title: 'Remix IDE', url: 'https://remix.ethereum.org/' }
            ]
          }
        },
        {
          id: 'lesson-2-pdf',
          title: 'Smart Contract Development',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete guide to smart contract development with Solidity.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'DApp Development',
      description: 'Build decentralized applications with frontend integration and Web3 libraries',
      lessons: [
        {
          id: 'lesson-3',
          title: 'Building DApps',
          thumbnail: '/public/Content-Cover.png',
          duration: '120:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn to build decentralized applications with frontend integration and backend services.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'DApp Architecture' },
            { time: 30, title: 'Frontend Integration' },
            { time: 60, title: 'Backend Services' },
            { time: 90, title: 'Deployment' }
          ],
          content: {
            notes: 'DApps combine smart contracts with user interfaces to create decentralized applications.',
            links: [
              { title: 'Web3.js Documentation', url: 'https://web3js.readthedocs.io/' },
              { title: 'MetaMask Integration', url: 'https://docs.metamask.io/' }
            ]
          }
        },
        {
          id: 'lesson-4',
          title: 'Web3 Frontend Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '85:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Web3 frontend development using React, ethers.js, and wallet integration.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Web3 Libraries' },
            { time: 25, title: 'Wallet Integration' },
            { time: 50, title: 'React Web3 Apps' },
            { time: 75, title: 'State Management' }
          ],
          content: {
            notes: 'Web3 frontend development requires understanding of wallet integration and blockchain interaction.',
            links: [
              { title: 'ethers.js Documentation', url: 'https://docs.ethers.io/' },
              { title: 'Web3 React', url: 'https://github.com/NoahZinsmeister/web3-react' }
            ]
          }
        },
        {
          id: 'lesson-4-pdf',
          title: 'DApp Development Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete guide to DApp development and Web3 integration.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'DeFi and NFT Development',
      description: 'Build DeFi protocols and NFT applications on Ethereum',
      lessons: [
        {
          id: 'lesson-5',
          title: 'DeFi Protocols',
          thumbnail: '/public/Content-Cover.png',
          duration: '85:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Explore decentralized finance protocols including DEXs, lending platforms, and yield farming.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'DeFi Overview' },
            { time: 25, title: 'Decentralized Exchanges' },
            { time: 50, title: 'Lending Protocols' },
            { time: 75, title: 'Yield Farming' }
          ],
          content: {
            notes: 'DeFi protocols enable financial services without traditional intermediaries.',
            links: [
              { title: 'DeFi Pulse', url: 'https://defipulse.com/' },
              { title: 'Uniswap Documentation', url: 'https://docs.uniswap.org/' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'NFT Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn to create and deploy NFT contracts and build NFT marketplaces.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'NFT Standards' },
            { time: 20, title: 'ERC-721 Contract' },
            { time: 40, title: 'Metadata and Images' },
            { time: 60, title: 'Marketplace Integration' }
          ],
          content: {
            notes: 'NFTs represent unique digital assets on the blockchain.',
            links: [
              { title: 'OpenZeppelin Contracts', url: 'https://docs.openzeppelin.com/contracts/' },
              { title: 'NFT Metadata Standards', url: 'https://docs.opensea.io/docs/metadata-standards' }
            ]
          }
        },
        {
          id: 'lesson-6-pdf',
          title: 'DeFi and NFT Reference',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete reference guide for DeFi and NFT development.',
          author: 'Suryanshu Nabheet'
        }
      ]
    }
  ]
}