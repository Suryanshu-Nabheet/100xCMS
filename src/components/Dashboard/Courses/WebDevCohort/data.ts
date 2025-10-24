export const webDevCohortData = {
  id: 'web-dev-cohort',
  title: 'Web Development Cohort',
  banner: '/public/WEBDEV.png',
  discordLink: 'https://discord.gg/webdev',
  modules: [
    {
      id: 'module-1',
      title: 'HTML Fundamentals',
      description: 'Learn the foundation of web development with HTML',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to HTML',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn the basics of HTML structure, elements, and semantic markup. This lesson covers everything you need to know to start building web pages.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Course Introduction' },
            { time: 15, title: 'HTML Basics' },
            { time: 30, title: 'HTML Elements' },
            { time: 45, title: 'HTML Forms' }
          ],
          content: {
            notes: 'HTML is the foundation of web development. Key concepts include semantic elements, accessibility, and proper document structure.',
            links: [
              { title: 'MDN HTML Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
              { title: 'HTML Validator', url: 'https://validator.w3.org/' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'HTML Reference Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive HTML reference guide with all elements, attributes, and best practices.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'HTML Forms and Validation',
          thumbnail: '/public/Content-Cover.png',
          duration: '35:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master HTML forms, input types, and client-side validation techniques.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Form Elements' },
            { time: 15, title: 'Input Types' },
            { time: 25, title: 'Validation' },
            { time: 35, title: 'Best Practices' }
          ],
          content: {
            notes: 'Forms are essential for user interaction. Focus on accessibility and proper validation.',
            links: [
              { title: 'HTML Forms Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form' },
              { title: 'Form Validation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation' }
            ]
          }
        },
        {
          id: 'lesson-3',
          title: 'Semantic HTML and Accessibility',
          thumbnail: '/public/Content-Cover.png',
          duration: '40:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn semantic HTML elements and accessibility best practices for inclusive web design.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Semantic Elements' },
            { time: 15, title: 'ARIA Attributes' },
            { time: 30, title: 'Screen Readers' },
            { time: 40, title: 'Accessibility Testing' }
          ],
          content: {
            notes: 'Semantic HTML improves SEO and accessibility. Always consider users with disabilities.',
            links: [
              { title: 'Semantic HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' },
              { title: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'CSS Styling',
      description: 'Master CSS for beautiful and responsive web design',
      lessons: [
        {
          id: 'lesson-4',
          title: 'CSS Styling Basics',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master CSS fundamentals including selectors, properties, and layout techniques. Learn how to make your HTML beautiful.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'CSS Introduction' },
            { time: 20, title: 'Selectors' },
            { time: 40, title: 'Properties' },
            { time: 60, title: 'Layout' }
          ],
          content: {
            notes: 'CSS controls the visual presentation of HTML elements. Focus on understanding the box model and flexbox.',
            links: [
              { title: 'CSS Tricks', url: 'https://css-tricks.com/' },
              { title: 'Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
            ]
          }
        },
        {
          id: 'lesson-4-pdf',
          title: 'CSS Reference Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete CSS reference with properties, selectors, and layout techniques.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-5',
          title: 'Flexbox and Grid Layout',
          thumbnail: '/public/Content-Cover.png',
          duration: '55:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn modern CSS layout techniques with Flexbox and CSS Grid for responsive designs.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Flexbox Basics' },
            { time: 20, title: 'Flexbox Properties' },
            { time: 35, title: 'CSS Grid' },
            { time: 55, title: 'Combining Layouts' }
          ],
          content: {
            notes: 'Flexbox is for 1D layouts, Grid is for 2D layouts. Use them together for complex designs.',
            links: [
              { title: 'CSS Grid Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
              { title: 'Flexbox vs Grid', url: 'https://css-tricks.com/css-grid-replace-flexbox/' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'Responsive Design',
          thumbnail: '/public/Content-Cover.png',
          duration: '50:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Create responsive websites that work perfectly on all devices using media queries and responsive units.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Media Queries' },
            { time: 20, title: 'Responsive Units' },
            { time: 35, title: 'Mobile First' },
            { time: 50, title: 'Testing' }
          ],
          content: {
            notes: 'Mobile-first approach ensures better performance and user experience across devices.',
            links: [
              { title: 'Responsive Design Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design' },
              { title: 'Media Query Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-3',
      title: 'JavaScript Programming',
      description: 'Add interactivity and dynamic behavior to your websites',
      lessons: [
        {
          id: 'lesson-7',
          title: 'JavaScript Fundamentals',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Dive into JavaScript programming. Learn variables, functions, DOM manipulation, and modern ES6+ features.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'JS Basics' },
            { time: 30, title: 'Variables' },
            { time: 60, title: 'Functions' },
            { time: 90, title: 'DOM Manipulation' }
          ],
          content: {
            notes: 'JavaScript brings interactivity to web pages. Master the fundamentals before moving to frameworks.',
            links: [
              { title: 'JavaScript.info', url: 'https://javascript.info/' },
              { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }
            ]
          }
        },
        {
          id: 'lesson-8',
          title: 'ES6+ Modern JavaScript',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn modern JavaScript features including arrow functions, destructuring, modules, and async/await.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Arrow Functions' },
            { time: 20, title: 'Destructuring' },
            { time: 40, title: 'Modules' },
            { time: 60, title: 'Async/Await' }
          ],
          content: {
            notes: 'ES6+ features make JavaScript more powerful and easier to write.',
            links: [
              { title: 'ES6 Features', url: 'https://es6-features.org/' },
              { title: 'Modern JavaScript', url: 'https://javascript.info/modern-javascript' }
            ]
          }
        },
        {
          id: 'lesson-9',
          title: 'DOM Manipulation and Events',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master DOM manipulation, event handling, and creating interactive web applications.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'DOM Selection' },
            { time: 20, title: 'Element Manipulation' },
            { time: 40, title: 'Event Listeners' },
            { time: 65, title: 'Event Delegation' }
          ],
          content: {
            notes: 'DOM manipulation is key to creating interactive web applications.',
            links: [
              { title: 'DOM Manipulation Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model' },
              { title: 'Event Handling', url: 'https://developer.mozilla.org/en-US/docs/Web/Events' }
            ]
          }
        },
        {
          id: 'lesson-10',
          title: 'JavaScript Best Practices',
          thumbnail: '/public/Content-Cover.png',
          duration: '55:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn JavaScript best practices, debugging techniques, and performance optimization.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Code Organization' },
            { time: 20, title: 'Debugging' },
            { time: 35, title: 'Performance' },
            { time: 55, title: 'Testing' }
          ],
          content: {
            notes: 'Good practices lead to maintainable and efficient JavaScript code.',
            links: [
              { title: 'JavaScript Best Practices', url: 'https://github.com/airbnb/javascript' },
              { title: 'Debugging Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Debugging' }
            ]
          }
        }
      ]
    }
  ]
}