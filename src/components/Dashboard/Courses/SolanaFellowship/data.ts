export const solanaFellowshipData = {
  id: 'solana-fellowship',
  title: 'Solana Fellowship',
  banner: '/public/SOLANA.png',
  discordLink: 'https://discord.gg/solana',
  modules: [
    {
      id: 'module-1',
      title: 'Solana Fundamentals',
      description: 'Learn Solana blockchain architecture and Rust programming for Solana development',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Solana Architecture',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Solana blockchain architecture, including Proof of History and validator network.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Solana Overview' },
            { time: 25, title: 'Proof of History' },
            { time: 50, title: 'Validators' },
            { time: 75, title: 'Network Architecture' }
          ],
          content: {
            notes: 'Solana uses Proof of History for high-speed consensus and scalability.',
            links: [
              { title: 'Solana Documentation', url: 'https://docs.solana.com/' },
              { title: 'Solana Whitepaper', url: 'https://solana.com/solana-whitepaper.pdf' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'Solana Architecture Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive guide to Solana blockchain architecture and design.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'Rust Programming for Solana',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master Rust programming language for Solana smart contract development.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Rust Basics' },
            { time: 30, title: 'Ownership & Borrowing' },
            { time: 60, title: 'Error Handling' },
            { time: 90, title: 'Solana Integration' }
          ],
          content: {
            notes: 'Rust is the primary language for Solana program development.',
            links: [
              { title: 'Rust Book', url: 'https://doc.rust-lang.org/book/' },
              { title: 'Solana Program Library', url: 'https://spl.solana.com/' }
            ]
          }
        },
        {
          id: 'lesson-2-pdf',
          title: 'Rust for Solana Development',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete Rust programming guide for Solana developers.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Solana Program Development',
      description: 'Build and deploy Solana programs using Anchor framework and native Rust',
      lessons: [
        {
          id: 'lesson-3',
          title: 'Solana Program Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '105:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Build and deploy Solana programs using Anchor framework and native Rust.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Program Structure' },
            { time: 30, title: 'Anchor Framework' },
            { time: 60, title: 'Testing Programs' },
            { time: 90, title: 'Deployment' }
          ],
          content: {
            notes: 'Solana programs are smart contracts that run on the Solana blockchain.',
            links: [
              { title: 'Anchor Framework', url: 'https://www.anchor-lang.com/' },
              { title: 'Solana Program Examples', url: 'https://github.com/solana-labs/solana-program-library' }
            ]
          }
        },
        {
          id: 'lesson-4',
          title: 'Advanced Solana Programming',
          thumbnail: '/public/Content-Cover.png',
          duration: '85:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn advanced Solana programming concepts including PDAs, cross-program invocations, and optimization.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Program Derived Addresses' },
            { time: 25, title: 'Cross-Program Invocation' },
            { time: 50, title: 'Program Optimization' },
            { time: 75, title: 'Security Best Practices' }
          ],
          content: {
            notes: 'Advanced Solana programming requires understanding of PDAs and cross-program interactions.',
            links: [
              { title: 'PDA Documentation', url: 'https://docs.solana.com/developing/programming-model/accounts#program-derived-addresses' },
              { title: 'CPI Guide', url: 'https://docs.solana.com/developing/programming-model/calling-between-programs' }
            ]
          }
        },
        {
          id: 'lesson-4-pdf',
          title: 'Solana Programming Reference',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete reference guide for Solana program development.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'DeFi and NFT Development',
      description: 'Build DeFi protocols and NFT applications on Solana',
      lessons: [
        {
          id: 'lesson-5',
          title: 'DeFi on Solana',
          thumbnail: '/public/Content-Cover.png',
          duration: '80:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Explore decentralized finance protocols and applications on Solana.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'DeFi Overview' },
            { time: 25, title: 'DEX Protocols' },
            { time: 50, title: 'Lending Platforms' },
            { time: 75, title: 'Yield Farming' }
          ],
          content: {
            notes: 'Solana DeFi offers high-speed, low-cost financial applications.',
            links: [
              { title: 'Serum DEX', url: 'https://projectserum.com/' },
              { title: 'Raydium Protocol', url: 'https://raydium.io/' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'Solana NFT Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Create and deploy NFT collections on Solana using Metaplex standards.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'NFT Standards' },
            { time: 20, title: 'Metaplex Protocol' },
            { time: 40, title: 'Metadata Standards' },
            { time: 60, title: 'Marketplace Integration' }
          ],
          content: {
            notes: 'Solana NFTs use Metaplex standards for metadata and program integration.',
            links: [
              { title: 'Metaplex Documentation', url: 'https://docs.metaplex.com/' },
              { title: 'Solana NFT Examples', url: 'https://github.com/metaplex-foundation/metaplex' }
            ]
          }
        },
        {
          id: 'lesson-6-pdf',
          title: 'Solana DeFi and NFT Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete guide to building DeFi and NFT applications on Solana.',
          author: 'Suryanshu Nabheet'
        }
      ]
    }
  ]
}