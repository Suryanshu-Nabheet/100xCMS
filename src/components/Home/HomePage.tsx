import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Award } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Students Enrolled",
      sublabel: "Worldwide community"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      sublabel: "From 10K+ reviews"
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      sublabel: "Career advancement"
    }
  ];

  return (
    <div className="p-6 md:p-4 sm:p-2 relative bg-black min-h-screen">
      {/* Dark blue aesthetic spots */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-800/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8 relative min-h-[85vh] flex flex-col justify-center bg-black">
        {/* Dark blue aesthetic spots for hero */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-800/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="px-4 relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 tracking-tight relative">
            <span className="relative inline-block">
              <span className="text-white font-black" style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
              }}>
                Class
              </span>
              <span className="relative inline-block ml-2" style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #1e40af 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'waterFlow 4s ease-in-out infinite',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'
              }}>
                X
              </span>
            </span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-16 tracking-tight relative">
            <span className="relative inline-block" style={{
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}>
              Unlock Your Potential
            </span>
          </h2>
          
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed relative z-10"
          >
            Join ClassX and transform your career with cutting-edge courses, expert instructors, and a vibrant community.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex justify-center items-center relative z-10"
          >
            <button 
              onClick={() => onNavigate('browse')}
              className="btn-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover-lift glow-blue"
            >
              Explore Courses
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 relative">
        {/* Dark blue aesthetic spots for stats */}
        <div className="absolute -top-10 left-1/4 w-64 h-64 bg-blue-900/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-blue-800/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              whileHover={{ y: -2 }}
              className="relative z-10"
            >
              {/* Pure Glass Card */}
              <div className="relative bg-white/3 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/5 transition-all duration-300">
                {/* Icon Container */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/10">
                    <IconComponent className="w-8 h-8 text-white/80" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-4xl md:text-5xl font-bold text-white">{stat.value}</h3>
                  <p className="text-white/90 font-medium text-lg">{stat.label}</p>
                  <p className="text-white/60 text-sm">{stat.sublabel}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
