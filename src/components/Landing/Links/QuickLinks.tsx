import { ArrowLeft, ExternalLink, BookOpen, Users, Code, Zap } from 'lucide-react';

const QuickLinks = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-6">
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Quick Links</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Essential resources and shortcuts to help you navigate ClassX efficiently
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Getting Started */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Getting Started</h3>
            </div>
            <p className="text-gray-400 mb-4">Everything you need to begin your learning journey</p>
            <div className="space-y-2">
              <div className="text-blue-400 text-sm">• Browse available courses</div>
              <div className="text-blue-400 text-sm">• Create your account</div>
              <div className="text-blue-400 text-sm">• Start learning immediately</div>
            </div>
          </div>

          {/* Course Catalog */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mr-3">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Course Catalog</h3>
            </div>
            <p className="text-gray-400 mb-4">Explore our comprehensive course offerings</p>
            <div className="space-y-2">
              <div className="text-blue-400 text-sm">• Web Development</div>
              <div className="text-blue-400 text-sm">• Data Structures & Algorithms</div>
              <div className="text-blue-400 text-sm">• DevOps & Cloud Computing</div>
              <div className="text-blue-400 text-sm">• Web3 & Blockchain</div>
              <div className="text-blue-400 text-sm">• Mobile Development</div>
            </div>
          </div>
        </div>

        {/* Popular Resources */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Popular Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Documentation */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
              <p className="text-gray-400 text-sm mb-4">Complete guides and API references</p>
              <div className="text-blue-400 text-sm">Installation • Setup • Usage</div>
            </div>

            {/* Community */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-400 text-sm mb-4">Connect with fellow learners</p>
              <div className="text-blue-400 text-sm">Discord • Forums • Events</div>
            </div>

            {/* Support */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
              <p className="text-gray-400 text-sm mb-4">Get help when you need it</p>
              <div className="text-blue-400 text-sm">FAQ • Contact • Tickets</div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
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

export default QuickLinks;
