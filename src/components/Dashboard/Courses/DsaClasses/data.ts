export const dsaClassesData = {
  id: 'dsa-classes',
  title: 'Data Structures & Algorithms',
  banner: '/public/DSA.png',
  discordLink: 'https://discord.gg/dsa',
  modules: [
    {
      id: 'module-1',
      title: 'Basic Data Structures',
      description: 'Learn fundamental data structures including arrays, linked lists, stacks, and queues',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Arrays and Linked Lists',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn the fundamentals of arrays and linked lists, including operations, implementations, and when to use each data structure.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Introduction' },
            { time: 20, title: 'Array Operations' },
            { time: 40, title: 'Linked List Basics' },
            { time: 60, title: 'Implementation' }
          ],
          content: {
            notes: 'Arrays provide O(1) access but fixed size. Linked lists provide dynamic size but O(n) access.',
            links: [
              { title: 'GeeksforGeeks Arrays', url: 'https://www.geeksforgeeks.org/array-data-structure/' },
              { title: 'Linked List Tutorial', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'Arrays and Linked Lists Reference',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive reference guide for arrays and linked lists with examples and implementations.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'Stacks and Queues',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master stack and queue data structures, their implementations, and real-world applications.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Stack Theory' },
            { time: 20, title: 'Stack Implementation' },
            { time: 40, title: 'Queue Theory' },
            { time: 60, title: 'Queue Implementation' }
          ],
          content: {
            notes: 'Stacks follow LIFO principle, queues follow FIFO principle. Both are essential for many algorithms.',
            links: [
              { title: 'Stack Visualization', url: 'https://visualgo.net/en/stack' },
              { title: 'Queue Visualization', url: 'https://visualgo.net/en/queue' }
            ]
          }
        },
        {
          id: 'lesson-2-pdf',
          title: 'Stacks and Queues Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Detailed guide covering stack and queue implementations and use cases.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Advanced Data Structures',
      description: 'Explore trees, graphs, and hash tables for complex data organization',
      lessons: [
        {
          id: 'lesson-3',
          title: 'Binary Trees',
          thumbnail: '/public/Content-Cover.png',
          duration: '85:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn binary trees, binary search trees, and tree traversal algorithms.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Tree Basics' },
            { time: 25, title: 'Binary Search Trees' },
            { time: 50, title: 'Tree Traversal' },
            { time: 75, title: 'Tree Operations' }
          ],
          content: {
            notes: 'Trees are hierarchical data structures. BSTs provide efficient search, insert, and delete operations.',
            links: [
              { title: 'Tree Data Structure', url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' },
              { title: 'BST Visualization', url: 'https://visualgo.net/en/bst' }
            ]
          }
        },
        {
          id: 'lesson-4',
          title: 'Hash Tables',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master hash tables, hashing functions, and collision resolution techniques.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Hash Functions' },
            { time: 25, title: 'Collision Resolution' },
            { time: 50, title: 'Load Factor' },
            { time: 70, title: 'Applications' }
          ],
          content: {
            notes: 'Hash tables provide average O(1) access time. Good hash functions minimize collisions.',
            links: [
              { title: 'Hash Table Guide', url: 'https://www.geeksforgeeks.org/hashing-data-structure/' },
              { title: 'Hash Functions', url: 'https://en.wikipedia.org/wiki/Hash_function' }
            ]
          }
        },
        {
          id: 'lesson-5',
          title: 'Graphs',
          thumbnail: '/public/Content-Cover.png',
          duration: '95:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn graph representation, traversal algorithms, and shortest path algorithms.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Graph Representation' },
            { time: 30, title: 'DFS and BFS' },
            { time: 60, title: 'Shortest Path' },
            { time: 90, title: 'Graph Applications' }
          ],
          content: {
            notes: 'Graphs model relationships between objects. DFS and BFS are fundamental traversal algorithms.',
            links: [
              { title: 'Graph Data Structure', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
              { title: 'Graph Visualization', url: 'https://visualgo.net/en/dfsbfs' }
            ]
          }
        },
        {
          id: 'lesson-5-pdf',
          title: 'Graph Algorithms Reference',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete reference guide for graph algorithms and implementations.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Sorting and Searching',
      description: 'Master essential algorithms for data organization and retrieval',
      lessons: [
        {
          id: 'lesson-6',
          title: 'Sorting Algorithms',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn various sorting algorithms including bubble sort, quick sort, and merge sort with complexity analysis.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Bubble Sort' },
            { time: 30, title: 'Quick Sort' },
            { time: 60, title: 'Merge Sort' },
            { time: 90, title: 'Comparison' }
          ],
          content: {
            notes: 'Different sorting algorithms have different time complexities. Choose based on your data size and requirements.',
            links: [
              { title: 'Sorting Algorithm Comparison', url: 'https://www.geeksforgeeks.org/sorting-algorithms/' },
              { title: 'Big O Cheat Sheet', url: 'https://www.bigocheatsheet.com/' }
            ]
          }
        },
        {
          id: 'lesson-7',
          title: 'Searching Algorithms',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master linear search, binary search, and advanced searching techniques.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Linear Search' },
            { time: 20, title: 'Binary Search' },
            { time: 40, title: 'Ternary Search' },
            { time: 60, title: 'Applications' }
          ],
          content: {
            notes: 'Binary search requires sorted data but provides O(log n) search time.',
            links: [
              { title: 'Searching Algorithms', url: 'https://www.geeksforgeeks.org/searching-algorithms/' },
              { title: 'Binary Search Guide', url: 'https://www.geeksforgeeks.org/binary-search/' }
            ]
          }
        },
        {
          id: 'lesson-8',
          title: 'Dynamic Programming',
          thumbnail: '/public/Content-Cover.png',
          duration: '100:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn dynamic programming concepts, memoization, and solve classic DP problems.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'DP Concepts' },
            { time: 30, title: 'Memoization' },
            { time: 60, title: 'Tabulation' },
            { time: 90, title: 'Classic Problems' }
          ],
          content: {
            notes: 'Dynamic programming solves complex problems by breaking them into simpler subproblems.',
            links: [
              { title: 'Dynamic Programming Guide', url: 'https://www.geeksforgeeks.org/dynamic-programming/' },
              { title: 'DP Problems', url: 'https://leetcode.com/tag/dynamic-programming/' }
            ]
          }
        }
      ]
    }
  ]
}