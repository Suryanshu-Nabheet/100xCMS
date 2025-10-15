import { ArrowLeft, BookOpen, FileText, Code, Settings, Shield, Users, Download } from 'lucide-react';

const Documentation = () => {
  const docs = [
    {
      title: "Installation Guide",
      description: "Step-by-step instructions to get ClassX up and running on your system",
      icon: Download,
      category: "Getting Started",
      color: "blue"
    },
    {
      title: "API Reference",
      description: "Complete API documentation with endpoints, parameters, and examples",
      icon: Code,
      category: "Development",
      color: "green"
    },
    {
      title: "User Guide",
      description: "Comprehensive guide for students and instructors using the platform",
      icon: Users,
      category: "User Manual",
      color: "purple"
    },
    {
      title: "Admin System",
      description: "Administrative features and user management documentation",
      icon: Settings,
      category: "Administration",
      color: "orange"
    },
    {
      title: "Security Policy",
      description: "Security guidelines, best practices, and vulnerability reporting",
      icon: Shield,
      category: "Security",
      color: "red"
    },
    {
      title: "Contributing Guide",
      description: "How to contribute to the project and development guidelines",
      icon: FileText,
      category: "Development",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      red: "bg-red-500/10 text-red-400 border-red-500/20",
      indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
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
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive guides and references for ClassX platform
          </p>
        </div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {docs.map((doc, index) => {
            const IconComponent = doc.icon;
            const colorClasses = getColorClasses(doc.color);
            
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${colorClasses.split(' ')[0]} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                    {doc.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {doc.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {doc.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Start Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Start</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Installation</h3>
              <p className="text-gray-400 text-sm">Clone the repository and install dependencies</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Configuration</h3>
              <p className="text-gray-400 text-sm">Set up environment variables and database</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Development</h3>
              <p className="text-gray-400 text-sm">Start the development server and begin coding</p>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Technical Stack</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Code className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Frontend</h3>
              <div className="text-gray-400 text-sm">React • TypeScript • Tailwind CSS</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Settings className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Backend</h3>
              <div className="text-gray-400 text-sm">Node.js • Express • MongoDB</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Authentication</h3>
              <div className="text-gray-400 text-sm">Clerk • JWT • OAuth</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Tools</h3>
              <div className="text-gray-400 text-sm">Vite • ESLint • Prettier</div>
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

export default Documentation;
