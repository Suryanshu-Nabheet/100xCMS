export const androidDevelopmentData = {
  id: 'android-development',
  title: 'Android Development',
  banner: '/public/ANDROID.png',
  discordLink: 'https://discord.gg/androiddev',
  modules: [
    {
      id: 'module-1',
      title: 'Android Fundamentals',
      description: 'Learn the basics of Android development and environment setup',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Android Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Get started with Android development. Learn about the Android ecosystem, development environment setup, and basic app architecture.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Course Introduction' },
            { time: 15, title: 'Android Development Environment' },
            { time: 30, title: 'Android Studio Overview' },
            { time: 45, title: 'Android App Architecture' }
          ],
          content: {
            notes: 'Android development requires Android Studio, Java/Kotlin knowledge, and understanding of mobile app lifecycle.',
            links: [
              { title: 'Android Developer Guide', url: 'https://developer.android.com/guide' },
              { title: 'Android Studio Download', url: 'https://developer.android.com/studio' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'Android Development Setup Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Step-by-step guide for setting up Android development environment and tools.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'Android App Lifecycle',
          thumbnail: '/public/Content-Cover.png',
          duration: '35:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Understand Android app lifecycle, activities, and how Android manages app states.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Activity Lifecycle' },
            { time: 15, title: 'Lifecycle Methods' },
            { time: 25, title: 'State Management' },
            { time: 35, title: 'Best Practices' }
          ],
          content: {
            notes: 'Understanding app lifecycle is crucial for proper resource management and user experience.',
            links: [
              { title: 'Activity Lifecycle Guide', url: 'https://developer.android.com/guide/components/activities/activity-lifecycle' },
              { title: 'Lifecycle Components', url: 'https://developer.android.com/topic/libraries/architecture/lifecycle' }
            ]
          }
        },
        {
          id: 'lesson-3',
          title: 'Android Project Structure',
          thumbnail: '/public/Content-Cover.png',
          duration: '40:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Android project structure, manifest files, and resource organization.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Project Folders' },
            { time: 15, title: 'Manifest File' },
            { time: 30, title: 'Resources' },
            { time: 40, title: 'Build Configuration' }
          ],
          content: {
            notes: 'Proper project structure makes development easier and more maintainable.',
            links: [
              { title: 'Project Structure Guide', url: 'https://developer.android.com/studio/projects' },
              { title: 'Android Manifest', url: 'https://developer.android.com/guide/topics/manifest/manifest-intro' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Kotlin Programming',
      description: 'Master Kotlin programming language for Android development',
      lessons: [
        {
          id: 'lesson-4',
          title: 'Kotlin Programming Fundamentals',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master Kotlin programming language fundamentals including syntax, data types, control flow, and functions.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Kotlin Syntax Basics' },
            { time: 20, title: 'Variables and Data Types' },
            { time: 40, title: 'Control Flow' },
            { time: 60, title: 'Functions and Lambdas' }
          ],
          content: {
            notes: 'Kotlin is the preferred language for Android development. It offers concise syntax and null safety.',
            links: [
              { title: 'Kotlin Official Docs', url: 'https://kotlinlang.org/docs/' },
              { title: 'Kotlin Playground', url: 'https://play.kotlinlang.org/' }
            ]
          }
        },
        {
          id: 'lesson-5',
          title: 'Kotlin Object-Oriented Programming',
          thumbnail: '/public/Content-Cover.png',
          duration: '55:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Kotlin OOP concepts including classes, inheritance, interfaces, and data classes.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Classes and Objects' },
            { time: 20, title: 'Inheritance' },
            { time: 35, title: 'Interfaces' },
            { time: 55, title: 'Data Classes' }
          ],
          content: {
            notes: 'Kotlin OOP features make code more concise and maintainable.',
            links: [
              { title: 'Kotlin Classes', url: 'https://kotlinlang.org/docs/classes.html' },
              { title: 'Data Classes', url: 'https://kotlinlang.org/docs/data-classes.html' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'Kotlin Coroutines',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master Kotlin coroutines for asynchronous programming and background tasks.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Coroutines Basics' },
            { time: 25, title: 'Suspend Functions' },
            { time: 50, title: 'Coroutine Scopes' },
            { time: 70, title: 'Error Handling' }
          ],
          content: {
            notes: 'Coroutines provide efficient asynchronous programming without blocking the main thread.',
            links: [
              { title: 'Kotlin Coroutines Guide', url: 'https://kotlinlang.org/docs/coroutines-overview.html' },
              { title: 'Coroutines Best Practices', url: 'https://developer.android.com/kotlin/coroutines' }
            ]
          }
        },
        {
          id: 'lesson-6-pdf',
          title: 'Kotlin Reference Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete Kotlin programming reference with examples and best practices.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Android UI Development',
      description: 'Create beautiful and responsive Android user interfaces',
      lessons: [
        {
          id: 'lesson-7',
          title: 'Android UI and Layouts',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Android UI development using XML layouts, views, and Material Design principles.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'XML Layouts' },
            { time: 30, title: 'Views and ViewGroups' },
            { time: 60, title: 'ConstraintLayout' },
            { time: 90, title: 'Material Design' }
          ],
          content: {
            notes: 'Android UI is built using XML layouts and views. ConstraintLayout is the most flexible layout manager.',
            links: [
              { title: 'Android UI Guide', url: 'https://developer.android.com/guide/topics/ui' },
              { title: 'Material Design', url: 'https://material.io/design' }
            ]
          }
        },
        {
          id: 'lesson-7-pdf',
          title: 'Android UI Design Patterns',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive guide to Android UI design patterns and best practices.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-8',
          title: 'Jetpack Compose Modern UI',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Explore Jetpack Compose, the modern toolkit for building native Android UIs with declarative programming.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Compose Introduction' },
            { time: 25, title: 'Composable Functions' },
            { time: 50, title: 'State Management' },
            { time: 75, title: 'Navigation' }
          ],
          content: {
            notes: 'Jetpack Compose simplifies UI development with declarative syntax and reactive programming.',
            links: [
              { title: 'Jetpack Compose Docs', url: 'https://developer.android.com/jetpack/compose' },
              { title: 'Compose Samples', url: 'https://github.com/android/compose-samples' }
            ]
          }
        },
        {
          id: 'lesson-9',
          title: 'Responsive Design and Themes',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Create responsive Android apps that work across different screen sizes and implement theming.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Screen Densities' },
            { time: 20, title: 'Responsive Layouts' },
            { time: 40, title: 'Material Theming' },
            { time: 65, title: 'Dark Mode' }
          ],
          content: {
            notes: 'Responsive design ensures your app looks great on all Android devices.',
            links: [
              { title: 'Responsive Design Guide', url: 'https://developer.android.com/guide/practices/screens_support' },
              { title: 'Material Theming', url: 'https://material.io/design/material-theming' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Data and Deployment',
      description: 'Handle data persistence and deploy your Android apps',
      lessons: [
        {
          id: 'lesson-10',
          title: 'Data Management and Networking',
          thumbnail: '/public/Content-Cover.png',
          duration: '80:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn data persistence with Room database and networking with Retrofit for REST API integration.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Room Database' },
            { time: 20, title: 'Retrofit' },
            { time: 40, title: 'JSON Parsing' },
            { time: 60, title: 'REST API Integration' }
          ],
          content: {
            notes: 'Room provides an abstraction layer over SQLite. Retrofit simplifies HTTP client implementation.',
            links: [
              { title: 'Room Database Guide', url: 'https://developer.android.com/training/data-storage/room' },
              { title: 'Retrofit Documentation', url: 'https://square.github.io/retrofit/' }
            ]
          }
        },
        {
          id: 'lesson-11',
          title: 'Google Play Store Deployment',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:10',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Complete guide to preparing, testing, and deploying your Android app to Google Play Store.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Play Store Guidelines' },
            { time: 25, title: 'Google Play Console' },
            { time: 50, title: 'Testing and Debugging' },
            { time: 75, title: 'Release Management' }
          ],
          content: {
            notes: 'Play Store deployment requires proper app signing, testing, and following Google Play policies.',
            links: [
              { title: 'Play Console Help', url: 'https://support.google.com/googleplay/android-developer/' },
              { title: 'App Release Checklist', url: 'https://developer.android.com/distribute/best-practices/launch/launch-checklist' }
            ]
          }
        },
        {
          id: 'lesson-11-pdf',
          title: 'Android Deployment Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete guide to Android app deployment and Play Store optimization.',
          author: 'Suryanshu Nabheet'
        }
      ]
    }
  ]
}