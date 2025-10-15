import { ArrowLeft, Github, ExternalLink, Code, Database, Globe, Smartphone, Shield } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "ClassX Learning Platform",
      description: "A comprehensive online learning management system built with React, TypeScript, and modern web technologies.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Clerk Auth"],
      category: "Web Development",
      icon: Globe,
      color: "blue"
    },
    {
      title: "MMBS Quantum Interface",
      description: "Multi-Model Booking System engineered with advanced temporal-spatial algorithms for cross-category resource allocation.",
      tech: ["Node.js", "MongoDB", "React", "Express"],
      category: "Full Stack",
      icon: Database,
      color: "green"
    },
    {
      title: "Groww Financial Matrix",
      description: "Hyper-connected stock market and SIP investment neural network providing quantum-speed financial data processing.",
      tech: ["React", "Node.js", "PostgreSQL", "Redis"],
      category: "FinTech",
      icon: Code,
      color: "purple"
    },
    {
      title: "Mobile Development Suite",
      description: "iOS and Android development tools and frameworks for cross-platform mobile application development.",
      tech: ["React Native", "Swift", "Kotlin", "Flutter"],
      category: "Mobile",
      icon: Smartphone,
      color: "orange"
    },
    {
      title: "Security Protocols",
      description: "Advanced cybersecurity solutions and ethical hacking tools for modern web applications.",
      tech: ["Python", "JavaScript", "Security Tools", "Penetration Testing"],
      category: "Cybersecurity",
      icon: Shield,
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      red: "bg-red-500/10 text-red-400 border-red-500/20"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-6">
            <Code className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the innovative projects and solutions developed by Suryanshu Nabheet
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            const colorClasses = getColorClasses(project.color);
            
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${colorClasses.split(' ')[0]} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/5 text-white/80 text-xs rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Github className="w-4 h-4" />
                    <span>Private Repository</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* About Developer */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">About the Developer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Suryanshu Nabheet</h3>
              <p className="text-gray-400 mb-4">
                Full Stack Developer specializing in modern web technologies, mobile development, 
                and cybersecurity. Passionate about creating innovative solutions that solve real-world problems.
              </p>
              <div className="space-y-2">
                <div className="text-blue-400 text-sm">• 10+ Completed Projects</div>
                <div className="text-blue-400 text-sm">• Full Stack Development Expert</div>
                <div className="text-blue-400 text-sm">• Mobile Development Specialist</div>
                <div className="text-blue-400 text-sm">• Cybersecurity Enthusiast</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technical Expertise</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-semibold">Frontend</div>
                  <div className="text-gray-400 text-sm">React, TypeScript, Next.js</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-green-400 font-semibold">Backend</div>
                  <div className="text-gray-400 text-sm">Node.js, Python, Express</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-semibold">Mobile</div>
                  <div className="text-gray-400 text-sm">React Native, Swift, Kotlin</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-orange-400 font-semibold">DevOps</div>
                  <div className="text-gray-400 text-sm">Docker, AWS, Kubernetes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
