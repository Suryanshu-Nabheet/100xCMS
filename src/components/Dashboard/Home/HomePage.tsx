import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Award, BookOpen, Clock, CheckCircle, TrendingUp, Target, Zap } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// BentoGrid Components
const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "row-span-1 rounded-xl group/bento transition duration-200 p-4 bg-black border border-white/10 justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-white mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-white/80 text-xs">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton Components
const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-col space-y-2 rounded-xl p-4"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
        <div className="w-full bg-white/10 h-4 rounded-full" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 w-3/4 ml-auto bg-black"
      >
        <div className="w-full bg-white/10 h-4 rounded-full" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
        <div className="w-full bg-white/10 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-col space-y-2 rounded-xl p-4"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skeleton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 bg-white/10 w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl flex-col space-y-2 p-4"
      style={{
        background:
          "linear-gradient(-45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-row space-x-2 rounded-xl p-4"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-black p-4 border border-white/10 flex flex-col items-center justify-center"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-2" />
        <p className="text-xs text-center font-semibold text-white/80 mt-2">
          Interactive Learning
        </p>
        <p className="border border-blue-500 bg-blue-500/20 text-blue-400 text-xs rounded-full px-2 py-0.5 mt-2">
          Active
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-black p-4 border border-white/10 flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-2" />
        <p className="text-xs text-center font-semibold text-white/80 mt-2">
          Expert Instructors
        </p>
        <p className="border border-green-500 bg-green-500/20 text-green-400 text-xs rounded-full px-2 py-0.5 mt-2">
          Verified
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-black p-4 border border-white/10 flex flex-col items-center justify-center"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-2" />
        <p className="text-xs text-center font-semibold text-white/80 mt-2">
          Career Growth
        </p>
        <p className="border border-purple-500 bg-purple-500/20 text-purple-400 text-xs rounded-full px-2 py-0.5 mt-2">
          Trending
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-col space-y-2 rounded-xl p-4"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-white/10 p-2 items-start space-x-2 bg-black"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
        <p className="text-xs text-white/80">
          Join thousands of students learning cutting-edge technologies with expert guidance and hands-on projects...
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-black"
      >
        <p className="text-xs text-white/80">Start Learning Today.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

// BentoGrid Items
const bentoItems = [
  {
    title: "Interactive Learning",
    description: (
      <span className="text-sm text-white/80">
        Experience hands-on learning with real-world projects and interactive exercises.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <BookOpen className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Progress Tracking",
    description: (
      <span className="text-sm text-white/80">
        Track your learning journey with detailed analytics and milestone achievements.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <TrendingUp className="h-4 w-4 text-green-400" />,
  },
  {
    title: "Expert Instructors",
    description: (
      <span className="text-sm text-white/80">
        Learn from industry experts with years of experience in their respective fields.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Target className="h-4 w-4 text-purple-400" />,
  },
  {
    title: "Community & Support",
    description: (
      <span className="text-sm text-white/80">
        Connect with fellow learners and get support from our vibrant community.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Users className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Career Advancement",
    description: (
      <span className="text-sm text-white/80">
        Accelerate your career with industry-recognized certifications and job placement assistance.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <Zap className="h-4 w-4 text-yellow-400" />,
  },
];

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
    <div className="relative bg-black min-h-screen">

      {/* Dark blue aesthetic spots */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-800/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Hero Section */}
      <div className="text-center mb-12 pt-24 relative min-h-[85vh] flex flex-col justify-center bg-black">
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 tracking-tight relative">
            <span className="text-white font-black">Class</span><span className="text-blue-400 font-black">X</span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-16 tracking-tight relative">
            <span className="text-white font-black">Unlock Your</span> <span className="text-blue-400 font-black">Potential</span>
          </h2>
          
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 leading-relaxed relative z-10"
          >
            <span className="text-white">Join ClassX and transform your career with</span> <span className="text-blue-400">cutting-edge courses, expert instructors, and a vibrant community.</span>
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

      {/* BentoGrid Section */}
      <div className="mb-16 relative">
        {/* Dark blue aesthetic spots for bento */}
        <div className="absolute -top-20 left-10 w-96 h-96 bg-blue-900/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-800/12 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-blue-700/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose ClassX?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover the features that make ClassX the perfect platform for your learning journey
            </p>
          </div>
          
          <BentoGrid className="max-w-6xl mx-auto">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={cn("[&>p:text-lg]", item.className)}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </div>
  );
}



