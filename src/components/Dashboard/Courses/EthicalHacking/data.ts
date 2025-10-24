export const ethicalHackingData = {
  id: 'ethical-hacking',
  title: 'Ethical Hacking',
  banner: '/public/HACKING.png',
  discordLink: 'https://discord.gg/ethicalhacking',
  modules: [
    {
      id: 'module-1',
      title: 'Ethical Hacking Fundamentals',
      description: 'Learn the basics of ethical hacking, legal considerations, and methodology',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Ethical Hacking',
          thumbnail: '/public/Content-Cover.png',
          duration: '45:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn the fundamentals of ethical hacking, including legal considerations, hacker types, and ethical guidelines.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Course Introduction' },
            { time: 15, title: 'What is Ethical Hacking?' },
            { time: 30, title: 'Legal and Ethical Considerations' },
            { time: 45, title: 'Hacker Types and Motivations' }
          ],
          content: {
            notes: 'Ethical hacking involves authorized penetration testing to identify vulnerabilities and improve security.',
            links: [
              { title: 'EC-Council CEH', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' },
              { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'Ethical Hacking Legal Framework',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive guide to legal frameworks and ethical guidelines in cybersecurity.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'Penetration Testing Methodology',
          thumbnail: '/public/Content-Cover.png',
          duration: '60:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn structured penetration testing methodology including planning, execution, and reporting.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'PTES Framework' },
            { time: 20, title: 'Planning Phase' },
            { time: 40, title: 'Execution Phase' },
            { time: 60, title: 'Reporting Phase' }
          ],
          content: {
            notes: 'Following a structured methodology ensures comprehensive and legal penetration testing.',
            links: [
              { title: 'PTES Framework', url: 'http://www.pentest-standard.org/' },
              { title: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' }
            ]
          }
        },
        {
          id: 'lesson-3',
          title: 'Information Gathering',
          thumbnail: '/public/Content-Cover.png',
          duration: '55:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master reconnaissance techniques including OSINT, social engineering, and passive information gathering.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'OSINT Techniques' },
            { time: 20, title: 'Social Engineering' },
            { time: 40, title: 'Passive Reconnaissance' },
            { time: 55, title: 'Information Analysis' }
          ],
          content: {
            notes: 'Information gathering is the foundation of successful penetration testing.',
            links: [
              { title: 'OSINT Framework', url: 'https://osintframework.com/' },
              { title: 'Social Engineering Toolkit', url: 'https://github.com/trustedsec/social-engineer-toolkit' }
            ]
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Network Security Testing',
      description: 'Learn network penetration testing, scanning, and vulnerability assessment',
      lessons: [
        {
          id: 'lesson-4',
          title: 'Network Scanning and Enumeration',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn network scanning techniques using Nmap, port scanning, and service enumeration.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Nmap Basics' },
            { time: 25, title: 'Port Scanning' },
            { time: 50, title: 'Service Enumeration' },
            { time: 75, title: 'Stealth Scanning' }
          ],
          content: {
            notes: 'Network scanning helps identify open ports, services, and potential vulnerabilities.',
            links: [
              { title: 'Nmap Documentation', url: 'https://nmap.org/book/' },
              { title: 'Nmap Cheat Sheet', url: 'https://nmap.org/book/man-briefoptions.html' }
            ]
          }
        },
        {
          id: 'lesson-5',
          title: 'Vulnerability Assessment',
          thumbnail: '/public/Content-Cover.png',
          duration: '80:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Conduct vulnerability assessments using automated tools and manual techniques.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Vulnerability Scanners' },
            { time: 30, title: 'Manual Testing' },
            { time: 60, title: 'Risk Assessment' },
            { time: 80, title: 'Remediation' }
          ],
          content: {
            notes: 'Vulnerability assessment identifies security weaknesses before they can be exploited.',
            links: [
              { title: 'Nessus Scanner', url: 'https://www.tenable.com/products/nessus' },
              { title: 'OpenVAS', url: 'https://www.openvas.org/' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'Wireless Security Testing',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Test wireless network security including WEP, WPA, and WPA2 vulnerabilities.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Wireless Protocols' },
            { time: 25, title: 'WEP Vulnerabilities' },
            { time: 50, title: 'WPA/WPA2 Testing' },
            { time: 70, title: 'Wireless Attacks' }
          ],
          content: {
            notes: 'Wireless networks often have unique vulnerabilities that require specialized testing.',
            links: [
              { title: 'Aircrack-ng Suite', url: 'https://www.aircrack-ng.org/' },
              { title: 'WiFi Security Guide', url: 'https://www.wi-fi.org/security' }
            ]
          }
        },
        {
          id: 'lesson-6-pdf',
          title: 'Network Security Testing Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive guide to network security testing methodologies and tools.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Web Application Security',
      description: 'Focus on web application penetration testing and OWASP vulnerabilities',
      lessons: [
        {
          id: 'lesson-7',
          title: 'Web Application Security Testing',
          thumbnail: '/public/Content-Cover.png',
          duration: '85:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn web application penetration testing including OWASP Top 10 vulnerabilities and testing techniques.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'OWASP Top 10' },
            { time: 25, title: 'SQL Injection' },
            { time: 50, title: 'XSS Attacks' },
            { time: 75, title: 'CSRF Protection' }
          ],
          content: {
            notes: 'Web applications are common targets for attacks. Understanding OWASP Top 10 is essential.',
            links: [
              { title: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
              { title: 'Burp Suite', url: 'https://portswigger.net/burp' }
            ]
          }
        },
        {
          id: 'lesson-8',
          title: 'Authentication and Session Management',
          thumbnail: '/public/Content-Cover.png',
          duration: '65:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Test authentication mechanisms, session management, and access control vulnerabilities.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Authentication Testing' },
            { time: 20, title: 'Session Management' },
            { time: 40, title: 'Access Control' },
            { time: 65, title: 'Privilege Escalation' }
          ],
          content: {
            notes: 'Authentication and session management are critical security components that need thorough testing.',
            links: [
              { title: 'Authentication Testing', url: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/' },
              { title: 'Session Management', url: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/' }
            ]
          }
        },
        {
          id: 'lesson-9',
          title: 'API Security Testing',
          thumbnail: '/public/Content-Cover.png',
          duration: '70:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Test REST APIs and GraphQL endpoints for security vulnerabilities and misconfigurations.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'API Security Basics' },
            { time: 25, title: 'REST API Testing' },
            { time: 50, title: 'GraphQL Security' },
            { time: 70, title: 'API Authentication' }
          ],
          content: {
            notes: 'APIs are increasingly targeted by attackers and require specialized security testing.',
            links: [
              { title: 'OWASP API Security', url: 'https://owasp.org/www-project-api-security/' },
              { title: 'Postman Security Testing', url: 'https://learning.postman.com/docs/writing-scripts/test-scripts/' }
            ]
          }
        },
        {
          id: 'lesson-9-pdf',
          title: 'Web Application Security Reference',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete reference guide for web application security testing.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Advanced Techniques',
      description: 'Master advanced penetration testing techniques and post-exploitation',
      lessons: [
        {
          id: 'lesson-10',
          title: 'Exploitation Techniques',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn exploitation techniques using Metasploit, custom exploits, and manual exploitation.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Metasploit Framework' },
            { time: 30, title: 'Custom Exploits' },
            { time: 60, title: 'Manual Exploitation' },
            { time: 90, title: 'Exploit Development' }
          ],
          content: {
            notes: 'Exploitation is the process of taking advantage of vulnerabilities to gain unauthorized access.',
            links: [
              { title: 'Metasploit Documentation', url: 'https://docs.rapid7.com/metasploit/' },
              { title: 'Exploit Database', url: 'https://www.exploit-db.com/' }
            ]
          }
        },
        {
          id: 'lesson-11',
          title: 'Post-Exploitation and Persistence',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn post-exploitation techniques, privilege escalation, and maintaining access.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Post-Exploitation Basics' },
            { time: 25, title: 'Privilege Escalation' },
            { time: 50, title: 'Persistence Mechanisms' },
            { time: 75, title: 'Lateral Movement' }
          ],
          content: {
            notes: 'Post-exploitation activities help maintain access and gather additional information.',
            links: [
              { title: 'Post-Exploitation Guide', url: 'https://www.offensive-security.com/metasploit-unleashed/' },
              { title: 'Privilege Escalation', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings' }
            ]
          }
        },
        {
          id: 'lesson-12',
          title: 'Cryptography and Steganography',
          thumbnail: '/public/Content-Cover.png',
          duration: '80:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Understand cryptographic concepts, encryption algorithms, and steganography techniques.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Cryptographic Concepts' },
            { time: 25, title: 'Symmetric Encryption' },
            { time: 50, title: 'Asymmetric Encryption' },
            { time: 75, title: 'Steganography' }
          ],
          content: {
            notes: 'Cryptography is fundamental to modern security. Understanding encryption is crucial for ethical hackers.',
            links: [
              { title: 'Cryptography Course', url: 'https://www.coursera.org/learn/crypto' },
              { title: 'OpenSSL Documentation', url: 'https://www.openssl.org/docs/' }
            ]
          }
        }
      ]
    }
  ]
}