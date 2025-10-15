import { ArrowLeft, Users, MessageCircle, Calendar, Award, Heart, Star, Zap } from 'lucide-react';

const Community = () => {
  const communityFeatures = [
    {
      title: "Discord Server",
      description: "Join our active Discord community for real-time discussions, help, and networking",
      icon: MessageCircle,
      color: "blue",
      members: "500+",
      activity: "Very Active"
    },
    {
      title: "Study Groups",
      description: "Form study groups with fellow learners working on similar projects",
      icon: Users,
      color: "green",
      members: "50+",
      activity: "Active"
    },
    {
      title: "Code Reviews",
      description: "Get your code reviewed by experienced developers and peers",
      icon: Star,
      color: "purple",
      members: "100+",
      activity: "Active"
    },
    {
      title: "Events & Workshops",
      description: "Participate in regular workshops, hackathons, and learning events",
      icon: Calendar,
      color: "orange",
      members: "200+",
      activity: "Monthly"
    },
    {
      title: "Mentorship Program",
      description: "Connect with mentors or become a mentor to help others grow",
      icon: Award,
      color: "red",
      members: "30+",
      activity: "Ongoing"
    },
    {
      title: "Open Source",
      description: "Contribute to open source projects and collaborate with developers worldwide",
      icon: Heart,
      color: "pink",
      members: "1000+",
      activity: "Very Active"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      red: "bg-red-500/10 text-red-400 border-red-500/20",
      pink: "bg-pink-500/10 text-pink-400 border-pink-500/20"
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
            <Users className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Community</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our vibrant community of learners, developers, and tech enthusiasts
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">2,000+</div>
            <div className="text-gray-400 text-sm">Active Members</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div className="text-gray-400 text-sm">Daily Messages</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">50+</div>
            <div className="text-gray-400 text-sm">Events This Year</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">100+</div>
            <div className="text-gray-400 text-sm">Projects Completed</div>
          </div>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {communityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorClasses = getColorClasses(feature.color);
            
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${colorClasses.split(' ')[0]} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">{feature.members}</div>
                    <div className="text-gray-400 text-xs">{feature.activity}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Code of Conduct */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Community Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Our Values</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Respect & Inclusion</div>
                    <div className="text-gray-400 text-sm">We welcome everyone regardless of background or experience level</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Collaboration</div>
                    <div className="text-gray-400 text-sm">We believe in learning together and helping each other grow</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="w-3 h-3 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Excellence</div>
                    <div className="text-gray-400 text-sm">We strive for high-quality contributions and continuous improvement</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">1. Join Discord</div>
                  <div className="text-gray-400 text-sm">Connect with the community and introduce yourself</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">2. Read Guidelines</div>
                  <div className="text-gray-400 text-sm">Familiarize yourself with our community standards</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">3. Start Contributing</div>
                  <div className="text-gray-400 text-sm">Share knowledge, ask questions, and help others</div>
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

export default Community;
