export const solanaFellowshipData = {
  id: 'solana-fellowship',
  title: 'Solana Fellowship',
  banner: '/public/SOLANA.png',
  discordLink: 'https://discord.gg/solana',
  lessons: [
    {
      id: 'lesson-1',
      title: 'Solana Architecture',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'Solana Overview' },
        { time: 25, title: 'Proof of History' },
        { time: 50, title: 'Validators' },
        { time: 75, title: 'Network Architecture' }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Rust Programming',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'Rust Basics' },
        { time: 30, title: 'Ownership' },
        { time: 60, title: 'Structs & Enums' },
        { time: 90, title: 'Error Handling' }
      ]
    },
    {
      id: 'lesson-3',
      title: 'Building Solana Programs',
      thumbnail: '/public/Content-Cover.png',
      videoUrl: '/CodeDemo.mp4',
      timestamps: [
        { time: 0, title: 'Program Structure' },
        { time: 30, title: 'Account Management' },
        { time: 60, title: 'Instruction Processing' },
        { time: 90, title: 'Testing & Deployment' }
      ]
    }
  ]
}
