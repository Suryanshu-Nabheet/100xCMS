export const iosDevelopmentData = {
  id: 'ios-development',
  title: 'iOS Development',
  banner: '/public/IOS.png',
  discordLink: 'https://discord.gg/iosdev',
  modules: [
    {
      id: 'module-1',
      title: 'iOS Development Fundamentals',
      description: 'Learn iOS development basics, Swift programming, and Xcode environment',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to iOS Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '50:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Get started with iOS development using Swift and Xcode. Learn the fundamentals of iOS app development.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Course Introduction' },
            { time: 15, title: 'iOS Development Environment' },
            { time: 30, title: 'Xcode Overview' },
            { time: 45, title: 'iOS App Architecture' }
          ],
          content: {
            notes: 'iOS development requires Xcode, Swift knowledge, and understanding of iOS app lifecycle.',
            links: [
              { title: 'Apple Developer Guide', url: 'https://developer.apple.com/ios/' },
              { title: 'Swift Documentation', url: 'https://docs.swift.org/swift-book/' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'iOS Development Setup Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete setup guide for iOS development environment and tools.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'Swift Programming Fundamentals',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master Swift programming language fundamentals including syntax, data types, control flow, and functions.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Swift Syntax Basics' },
            { time: 20, title: 'Variables and Data Types' },
            { time: 40, title: 'Control Flow' },
            { time: 60, title: 'Functions and Closures' }
          ],
          content: {
            notes: 'Swift is Apple\'s modern programming language designed for iOS development.',
            links: [
              { title: 'Swift Playgrounds', url: 'https://developer.apple.com/swift-playgrounds/' },
              { title: 'Swift Language Guide', url: 'https://docs.swift.org/swift-book/LanguageGuide/' }
            ]
          }
        },
        {
          id: 'lesson-3',
          title: 'iOS App Lifecycle',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Understand iOS app lifecycle, view controllers, and app state management.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'App Lifecycle' },
            { time: 15, title: 'View Controllers' },
            { time: 30, title: 'App States' },
            { time: 45, title: 'Memory Management' }
          ],
          content: {
            notes: 'Understanding app lifecycle is crucial for proper resource management and user experience.',
            links: [
              { title: 'App Lifecycle Guide', url: 'https://developer.apple.com/documentation/uikit/app_and_environment/managing_your_app_s_life_cycle' },
              { title: 'View Controller Lifecycle', url: 'https://developer.apple.com/documentation/uikit/uiviewcontroller' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'UIKit Development',
      description: 'Master UIKit framework and Interface Builder for iOS user interfaces',
      lessons: [
        {
          id: 'lesson-4',
          title: 'UIKit and Interface Builder',
          thumbnail: '/public/Content-Cover.png',
          duration: '80:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn UIKit framework and Interface Builder for creating iOS user interfaces.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'UIKit Overview' },
            { time: 25, title: 'Interface Builder' },
            { time: 50, title: 'Views and View Controllers' },
            { time: 75, title: 'Auto Layout' }
          ],
          content: {
            notes: 'UIKit provides the fundamental infrastructure for iOS apps and user interfaces.',
            links: [
              { title: 'UIKit Documentation', url: 'https://developer.apple.com/documentation/uikit' },
              { title: 'Auto Layout Guide', url: 'https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/' }
            ]
          }
        },
        {
          id: 'lesson-4-pdf',
          title: 'UIKit Design Patterns',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive guide to UIKit design patterns and best practices.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-5',
          title: 'Navigation and Storyboards',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn navigation patterns, storyboards, and segues for iOS app navigation.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Navigation Controllers' },
            { time: 25, title: 'Storyboards' },
            { time: 50, title: 'Segues' },
            { time: 70, title: 'Navigation Patterns' }
          ],
          content: {
            notes: 'Proper navigation is essential for creating intuitive iOS user experiences.',
            links: [
              { title: 'Navigation Guide', url: 'https://developer.apple.com/design/human-interface-guidelines/navigation' },
              { title: 'Storyboards Guide', url: 'https://developer.apple.com/library/archive/documentation/General/Conceptual/Devpedia-CocoaApp/Storyboard.html' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'Table Views and Collection Views',
          thumbnail: '/public/Content-Cover.png',
          duration: '85:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master table views and collection views for displaying lists and grids of data.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Table View Basics' },
            { time: 30, title: 'Custom Cells' },
            { time: 60, title: 'Collection Views' },
            { time: 85, title: 'Performance Optimization' }
          ],
          content: {
            notes: 'Table views and collection views are fundamental for displaying data in iOS apps.',
            links: [
              { title: 'Table View Guide', url: 'https://developer.apple.com/documentation/uikit/views_and_controls/table_views' },
              { title: 'Collection View Guide', url: 'https://developer.apple.com/documentation/uikit/views_and_controls/collection_views' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-3',
      title: 'SwiftUI Modern Development',
      description: 'Explore SwiftUI for modern iOS app development with declarative programming',
      lessons: [
        {
          id: 'lesson-7',
          title: 'SwiftUI Modern UI Framework',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Explore SwiftUI, Apple\'s modern declarative UI framework for building iOS apps.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'SwiftUI Introduction' },
            { time: 25, title: 'Views and Modifiers' },
            { time: 50, title: 'State Management' },
            { time: 75, title: 'Navigation' }
          ],
          content: {
            notes: 'SwiftUI simplifies UI development with declarative syntax and automatic layout.',
            links: [
              { title: 'SwiftUI Tutorials', url: 'https://developer.apple.com/tutorials/swiftui' },
              { title: 'SwiftUI Documentation', url: 'https://developer.apple.com/documentation/swiftui' }
            ]
          }
        },
        {
          id: 'lesson-8',
          title: 'SwiftUI Data Flow',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn SwiftUI data flow patterns including @State, @Binding, @ObservedObject, and @EnvironmentObject.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: '@State and @Binding' },
            { time: 25, title: '@ObservedObject' },
            { time: 50, title: '@EnvironmentObject' },
            { time: 75, title: 'Data Flow Best Practices' }
          ],
          content: {
            notes: 'Understanding data flow is crucial for building maintainable SwiftUI applications.',
            links: [
              { title: 'SwiftUI Data Flow', url: 'https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app' },
              { title: 'State Management', url: 'https://developer.apple.com/documentation/swiftui/state-and-data-flow' }
            ]
          }
        },
        {
          id: 'lesson-9',
          title: 'SwiftUI Animation and Gestures',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Create smooth animations and handle user gestures in SwiftUI applications.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Basic Animations' },
            { time: 25, title: 'Custom Animations' },
            { time: 45, title: 'Gesture Recognition' },
            { time: 65, title: 'Animation Best Practices' }
          ],
          content: {
            notes: 'Animations and gestures make iOS apps feel responsive and engaging.',
            links: [
              { title: 'SwiftUI Animations', url: 'https://developer.apple.com/documentation/swiftui/animation' },
              { title: 'Gesture Recognition', url: 'https://developer.apple.com/documentation/swiftui/gestures' }
            ]
          }
        },
        {
          id: 'lesson-9-pdf',
          title: 'SwiftUI Complete Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete SwiftUI development guide with examples and best practices.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Data and Deployment',
      description: 'Handle data persistence and deploy your iOS apps to the App Store',
      lessons: [
        {
          id: 'lesson-10',
          title: 'Core Data and Persistence',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Core Data framework for data persistence and management in iOS apps.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Core Data Overview' },
            { time: 20, title: 'Data Model' },
            { time: 40, title: 'CRUD Operations' },
            { time: 60, title: 'Relationships' }
          ],
          content: {
            notes: 'Core Data provides object graph management and persistence for iOS applications.',
            links: [
              { title: 'Core Data Guide', url: 'https://developer.apple.com/documentation/coredata' },
              { title: 'Core Data Tutorial', url: 'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreData/' }
            ]
          }
        },
        {
          id: 'lesson-11',
          title: 'Networking and APIs',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn networking in iOS apps including URLSession, JSON parsing, and REST API integration.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'URLSession Basics' },
            { time: 25, title: 'JSON Parsing' },
            { time: 50, title: 'REST API Integration' },
            { time: 70, title: 'Error Handling' }
          ],
          content: {
            notes: 'Networking is essential for modern iOS apps that interact with web services.',
            links: [
              { title: 'URLSession Guide', url: 'https://developer.apple.com/documentation/foundation/urlsession' },
              { title: 'JSON Parsing', url: 'https://developer.apple.com/documentation/foundation/json' }
            ]
          }
        },
        {
          id: 'lesson-12',
          title: 'App Store Deployment',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Complete guide to preparing and deploying your iOS app to the App Store.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'App Store Guidelines' },
            { time: 20, title: 'App Store Connect' },
            { time: 40, title: 'Testing and Debugging' },
            { time: 60, title: 'Release Process' }
          ],
          content: {
            notes: 'App Store deployment requires proper app signing, testing, and following Apple guidelines.',
            links: [
              { title: 'App Store Connect Help', url: 'https://developer.apple.com/help/app-store-connect/' },
              { title: 'App Review Guidelines', url: 'https://developer.apple.com/app-store/review/guidelines/' }
            ]
          }
        },
        {
          id: 'lesson-12-pdf',
          title: 'iOS Deployment Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete guide to iOS app deployment and App Store optimization.',
          author: 'Suryanshu Nabheet'
        }
      ]
    }
  ]
}