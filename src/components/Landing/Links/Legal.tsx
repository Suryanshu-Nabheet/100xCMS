import { ArrowLeft, Scale, FileText, Shield, Users, Globe, AlertCircle } from 'lucide-react';

const Legal = () => {
  const legalDocs = [
    {
      title: "Terms & Conditions",
      description: "Terms of service and usage guidelines for the 100xDevs platform",
      icon: FileText,
      color: "blue",
      lastUpdated: "January 2025"
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      icon: Shield,
      color: "green",
      lastUpdated: "January 2025"
    },
    {
      title: "Refund Policy",
      description: "Our policy regarding refunds and cancellations",
      icon: AlertCircle,
      color: "orange",
      lastUpdated: "January 2025"
    },
    {
      title: "Code of Conduct",
      description: "Community guidelines and behavioral expectations",
      icon: Users,
      color: "purple",
      lastUpdated: "January 2025"
    },
    {
      title: "License Agreement",
      description: "Software licensing terms and open source compliance",
      icon: Scale,
      color: "red",
      lastUpdated: "January 2025"
    },
    {
      title: "Cookie Policy",
      description: "Information about cookies and tracking technologies",
      icon: Globe,
      color: "indigo",
      lastUpdated: "January 2025"
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
      
      {/* Back Button - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 hover:border-white/30 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-6">
            <Scale className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Legal</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Legal documents, policies, and compliance information for 100xDevs
          </p>
        </div>

        {/* Legal Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {legalDocs.map((doc, index) => {
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
                  <span className="text-gray-400 text-xs">
                    Updated {doc.lastUpdated}
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

        {/* Legal Overview */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Legal Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Platform Usage</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Open Source</div>
                    <div className="text-gray-400 text-sm">100xDevs is built on open source principles</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3 h-3 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Privacy First</div>
                    <div className="text-gray-400 text-sm">Your data privacy is our top priority</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-3 h-3 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Community Driven</div>
                    <div className="text-gray-400 text-sm">Built by and for the developer community</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Compliance</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">GDPR Compliant</div>
                  <div className="text-gray-400 text-sm">European data protection standards</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">CCPA Compliant</div>
                  <div className="text-gray-400 text-sm">California consumer privacy act</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-medium mb-2">SOC 2 Ready</div>
                  <div className="text-gray-400 text-sm">Security and availability standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Legal */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Legal Contact</h2>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Legal Inquiries</h3>
            <p className="text-gray-400 mb-4">
              For legal questions, compliance issues, or policy clarifications
            </p>
            <div className="bg-white/5 rounded-lg p-4 inline-block">
              <div className="text-blue-400 font-medium">suryanshunab@gmail.com</div>
              <div className="text-gray-400 text-sm">Response within 48 hours</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Legal;
