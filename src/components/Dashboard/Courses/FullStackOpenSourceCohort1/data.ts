import { CourseDetail } from '../coursesData'

export const fullStackOpenSourceCohort1Data: CourseDetail = {
  id: 'full-stack-open-source-cohort-1',
  title: 'Full Stack Open Source Cohort 1',
  banner: '/Public/Live Full Stack Open Source Cohort 1.jpg',
  discordLink: 'https://discord.gg/fullstack',
  modules: [
    {
      id: 'module-1',
      title: 'Frontend Fundamentals',
      description: 'Learn the foundation of frontend development',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Frontend Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:30',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn the basics of frontend development including HTML, CSS, and JavaScript fundamentals. This lesson covers everything you need to know to start building modern web applications.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Course Introduction' },
            { time: 15, title: 'HTML Basics' },
            { time: 30, title: 'CSS Fundamentals' },
            { time: 45, title: 'JavaScript Overview' }
          ],
          content: {
            notes: 'Frontend development is the foundation of web applications. Key concepts include semantic HTML, modern CSS, and JavaScript fundamentals.',
            links: [
              { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
              { title: 'HTML Validator', url: 'https://validator.w3.org/' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'Frontend Development Reference Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf' as const,
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive frontend development reference guide with HTML, CSS, and JavaScript best practices.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'React Fundamentals',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:20',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Master React fundamentals including components, props, state, and hooks.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'React Introduction' },
            { time: 20, title: 'Components & Props' },
            { time: 40, title: 'State Management' },
            { time: 60, title: 'React Hooks' }
          ],
          content: {
            notes: 'React is a powerful library for building user interfaces. Focus on understanding components and state management.',
            links: [
              { title: 'React Documentation', url: 'https://react.dev/' },
              { title: 'React Hooks Guide', url: 'https://react.dev/reference/react' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Backend Development',
      description: 'Master backend development with Node.js and databases',
      lessons: [
        {
          id: 'lesson-3',
          title: 'Node.js Fundamentals',
          thumbnail: '/public/Content-Cover.png',
          duration: '55:15',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Node.js fundamentals including modules, file system, and async programming.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Node.js Introduction' },
            { time: 20, title: 'Modules & NPM' },
            { time: 35, title: 'File System' },
            { time: 55, title: 'Async Programming' }
          ],
          content: {
            notes: 'Node.js enables JavaScript on the server. Master async programming and module system.',
            links: [
              { title: 'Node.js Documentation', url: 'https://nodejs.org/docs' },
              { title: 'NPM Guide', url: 'https://docs.npmjs.com/' }
            ]
          }
        },
        {
          id: 'lesson-4',
          title: 'Database Design & SQL',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:30',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn database design principles and SQL queries for efficient data management.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Database Basics' },
            { time: 20, title: 'SQL Queries' },
            { time: 40, title: 'Database Design' },
            { time: 65, title: 'Best Practices' }
          ],
          content: {
            notes: 'Understanding databases is crucial for backend development. Focus on normalization and query optimization.',
            links: [
              { title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/' },
              { title: 'Database Design', url: 'https://www.postgresql.org/docs/' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Full Stack Integration',
      description: 'Build complete full stack applications',
      lessons: [
        {
          id: 'lesson-5',
          title: 'API Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:45',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn to build RESTful APIs and integrate frontend with backend.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'API Basics' },
            { time: 25, title: 'REST Principles' },
            { time: 50, title: 'API Integration' },
            { time: 70, title: 'Error Handling' }
          ],
          content: {
            notes: 'APIs connect frontend and backend. Follow REST principles and implement proper error handling.',
            links: [
              { title: 'REST API Guide', url: 'https://restfulapi.net/' },
              { title: 'HTTP Status Codes', url: 'https://httpstatuses.com/' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'Open Source Contribution',
          thumbnail: '/public/Content-Cover.png',
          duration: '50:20',
          completed: false,
          contentType: 'video' as const,
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn how to contribute to open source projects and build your portfolio.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Open Source Basics' },
            { time: 20, title: 'Git & GitHub' },
            { time: 35, title: 'Contributing Workflow' },
            { time: 50, title: 'Building Portfolio' }
          ],
          content: {
            notes: 'Open source contribution is a great way to learn and build your reputation in the developer community.',
            links: [
              { title: 'GitHub Guides', url: 'https://guides.github.com/' },
              { title: 'Open Source Guide', url: 'https://opensource.guide/' }
            ]
          }
        }
      ]
    }
  ],
  whatYouWillLearn: [
    'Master frontend development with React',
    'Build robust backend APIs with Node.js',
    'Design and implement databases',
    'Integrate frontend and backend systems',
    'Contribute to open source projects',
    'Deploy full stack applications'
  ],
  requirements: [
    'Basic understanding of programming concepts',
    'Familiarity with JavaScript fundamentals',
    'Willingness to learn and practice',
    'Access to a computer with internet connection'
  ]
}

