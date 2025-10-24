export const devopsCohortData = {
  id: 'devops-cohort',
  title: 'DevOps Engineering',
  banner: '/public/DEVOPS.png',
  discordLink: 'https://discord.gg/devops',
  modules: [
    {
      id: 'module-1',
      title: 'Containerization and Orchestration',
      description: 'Master Docker containerization and Kubernetes orchestration for scalable deployments',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Docker Fundamentals',
          thumbnail: '/public/Content-Cover.png',
          duration: '90:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Master Docker containerization including images, containers, Dockerfile, and Docker Compose.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Docker Introduction' },
            { time: 30, title: 'Images & Containers' },
            { time: 60, title: 'Dockerfile' },
            { time: 90, title: 'Docker Compose' }
          ],
          content: {
            notes: 'Docker enables consistent deployment across different environments.',
            links: [
              { title: 'Docker Documentation', url: 'https://docs.docker.com/' },
              { title: 'Docker Hub', url: 'https://hub.docker.com/' }
            ]
          }
        },
        {
          id: 'lesson-1-pdf',
          title: 'Docker Complete Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Comprehensive Docker guide with examples and best practices.',
          author: 'Suryanshu Nabheet'
        },
        {
          id: 'lesson-2',
          title: 'Kubernetes Orchestration',
          thumbnail: '/public/Content-Cover.png',
          duration: '105:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Learn Kubernetes for container orchestration, scaling, and management.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Kubernetes Basics' },
            { time: 30, title: 'Pods & Services' },
            { time: 60, title: 'Deployments' },
            { time: 90, title: 'Scaling & Management' }
          ],
          content: {
            notes: 'Kubernetes automates container deployment, scaling, and management.',
            links: [
              { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/' },
              { title: 'Kubernetes Playground', url: 'https://www.katacoda.com/courses/kubernetes' }
            ]
          }
        },
        {
          id: 'lesson-2-pdf',
          title: 'Kubernetes Operations Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete Kubernetes operations and management guide.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'CI/CD and Automation',
      description: 'Build automated pipelines and infrastructure as code for efficient DevOps workflows',
      lessons: [
        {
          id: 'lesson-3',
          title: 'CI/CD Pipeline Development',
          thumbnail: '/public/Content-Cover.png',
          duration: '80:45',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Build continuous integration and deployment pipelines using GitHub Actions and Jenkins.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'CI/CD Concepts' },
            { time: 25, title: 'GitHub Actions' },
            { time: 50, title: 'Jenkins Pipeline' },
            { time: 75, title: 'Best Practices' }
          ],
          content: {
            notes: 'CI/CD pipelines automate testing, building, and deployment processes.',
            links: [
              { title: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' },
              { title: 'Jenkins Documentation', url: 'https://www.jenkins.io/doc/' }
            ]
          }
        },
        {
          id: 'lesson-4',
          title: 'Infrastructure as Code',
          thumbnail: '/public/Content-Cover.png',
          duration: '85:20',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Manage infrastructure using Terraform and Ansible for automation and consistency.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'IaC Concepts' },
            { time: 25, title: 'Terraform Basics' },
            { time: 50, title: 'Ansible Automation' },
            { time: 75, title: 'State Management' }
          ],
          content: {
            notes: 'Infrastructure as Code enables version control and automation of infrastructure.',
            links: [
              { title: 'Terraform Documentation', url: 'https://www.terraform.io/docs' },
              { title: 'Ansible Documentation', url: 'https://docs.ansible.com/' }
            ]
          }
        },
        {
          id: 'lesson-4-pdf',
          title: 'DevOps Automation Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete guide to DevOps automation and infrastructure as code.',
          author: 'Suryanshu Nabheet'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Monitoring and Cloud Platforms',
      description: 'Implement monitoring solutions and deploy applications on cloud platforms',
      lessons: [
        {
          id: 'lesson-5',
          title: 'Monitoring and Logging',
          thumbnail: '/public/Content-Cover.png',
          duration: '75:30',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Implement monitoring and logging solutions using Prometheus, Grafana, and ELK stack.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Monitoring Concepts' },
            { time: 25, title: 'Prometheus & Grafana' },
            { time: 50, title: 'ELK Stack' },
            { time: 75, title: 'Alerting Systems' }
          ],
          content: {
            notes: 'Effective monitoring and logging are essential for production systems.',
            links: [
              { title: 'Prometheus Documentation', url: 'https://prometheus.io/docs/' },
              { title: 'Grafana Documentation', url: 'https://grafana.com/docs/' }
            ]
          }
        },
        {
          id: 'lesson-6',
          title: 'Cloud Platforms and Services',
          thumbnail: '/public/Content-Cover.png',
          duration: '95:15',
          completed: false,
          contentType: 'video',
          videoUrl: '/CodeDemo.mp4',
          description: 'Deploy and manage applications on AWS, Azure, and Google Cloud Platform.',
          author: 'Suryanshu Nabheet',
          timestamps: [
            { time: 0, title: 'Cloud Overview' },
            { time: 30, title: 'AWS Services' },
            { time: 60, title: 'Azure Platform' },
            { time: 90, title: 'Google Cloud' }
          ],
          content: {
            notes: 'Cloud platforms provide scalable infrastructure and managed services.',
            links: [
              { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/' },
              { title: 'Azure Documentation', url: 'https://docs.microsoft.com/en-us/azure/' }
            ]
          }
        },
        {
          id: 'lesson-6-pdf',
          title: 'Cloud Deployment Guide',
          thumbnail: '/public/Content-Cover.png',
          duration: 'PDF Document',
          completed: false,
          contentType: 'pdf',
          pdfUrl: '/Public/Pdf_Demo.pdf',
          description: 'Complete guide to cloud deployment and monitoring strategies.',
          author: 'Suryanshu Nabheet'
        }
      ]
    }
  ]
}