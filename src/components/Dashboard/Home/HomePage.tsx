import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, Target, Zap } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Floating Animation Utils
const floatingAnimation = {
  y: [0, -15, 0],
  rotate: [0, 2, 0],
};

const glowAnimation = {
  boxShadow: [
    "0 0 25px rgba(59, 130, 246, 0.4)",
    "0 0 40px rgba(59, 130, 246, 0.7)",
    "0 0 25px rgba(59, 130, 246, 0.4)"
  ]
};

// Floating Logos Component
const FloatingLogos: React.FC = () => {
  const logos = [
    {
      src: "https://img.icons8.com/color/96/visual-studio-code-2019.png",
      alt: "VS Code",
      position: "top-20 left-4 md:left-8 lg:left-16",
      color: "blue"
    },
    {
      src: "https://img.icons8.com/color/96/typescript.png",
      alt: "TypeScript",
      position: "top-20 right-4 md:right-8 lg:right-16",
      color: "blue"
    },
    {
      src: "https://img.icons8.com/color/96/nodejs.png",
      alt: "Node.js",
      position: "bottom-32 left-4 md:left-8 lg:left-16",
      color: "green"
    }
  ];

  return (
    <>
      {logos.map((logo, index) => (
        <div key={logo.alt} className={`absolute ${logo.position} z-10 opacity-60`}>
          <motion.div
            className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-${logo.color}-600/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-${logo.color}-400/40 shadow-lg shadow-${logo.color}-400/40`}
            animate={{
              ...floatingAnimation,
              ...glowAnimation
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={logo.src} 
              alt={logo.alt} 
              className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14"
            />
          </motion.div>
        </div>
      ))}
      
      {/* Deno Logo */}
      <div className="absolute bottom-32 right-4 md:right-8 lg:right-16 z-10 opacity-60">
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-green-600/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-green-400/30 shadow-lg shadow-green-400/30"
          animate={{
            y: [0, 12, 0],
            rotate: [0, -3, 0],
            boxShadow: [
              "0 0 25px rgba(48, 220, 128, 0.4)",
              "0 0 40px rgba(48, 220, 128, 0.7)",
              "0 0 25px rgba(48, 220, 128, 0.4)"
            ]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 48 48" className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14">
            <path fill="#30dc80" d="M24,14.088C11.427,14.088,1.108,23.716,0,36h48C46.892,23.716,36.573,14.088,24,14.088z M33.179,27.079c0-1.104,0.895-1.999,1.999-1.999c1.104,0,1.999,0.895,1.999,1.999c0,1.104-0.895,1.999-1.999,1.999	C34.074,29.078,33.179,28.183,33.179,27.079z M12.822,29.078c-1.104,0-1.999-0.895-1.999-1.999c0-1.104,0.895-1.999,1.999-1.999	s1.999,0.895,1.999,1.999C14.821,28.183,13.926,29.078,12.822,29.078z"/>
            <path fill="#30dc80" d="M34.038,19.313c-0.14,0-0.281-0.035-0.41-0.11c-0.393-0.227-0.527-0.729-0.301-1.122l5.197-9.008	c0.227-0.394,0.729-0.529,1.122-0.301c0.393,0.227,0.527,0.729,0.301,1.122l-5.197,9.008C34.598,19.166,34.322,19.313,34.038,19.313	z"/>
            <path fill="#30dc80" d="M13.962,19.313c-0.284,0-0.56-0.148-0.712-0.411L8.054,9.894C7.827,9.501,7.962,8.999,8.354,8.772	c0.392-0.228,0.895-0.093,1.122,0.301l5.197,9.008c0.227,0.394,0.092,0.896-0.301,1.122C14.243,19.278,14.102,19.313,13.962,19.313z"/>
          </svg>
        </motion.div>
      </div>
    </>
  );
};

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

  return (
    <div className="relative bg-black min-h-screen">

      {/* Dark blue aesthetic spots */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-800/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Hero Section */}
      <div className="text-center mb-12 pt-16 relative min-h-[85vh] flex flex-col justify-center bg-black">
        {/* Floating Logos */}
        <FloatingLogos />
        
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight relative">
            <span className="text-white font-black">Class</span><span className="text-blue-400 font-black">X</span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-12 tracking-tight relative">
            <span className="text-white font-black">Unlock Your</span> <span className="text-white font-black">Potential</span>
          </h2>
          
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto mb-12 leading-relaxed relative z-10"
          >
            <span className="text-white">Join ClassX and transform your career with</span> <span className="text-white font-semibold">cutting-edge courses, expert instructors, and a vibrant community.</span>
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex justify-center items-center relative z-10"
          >
            <button 
              onClick={() => onNavigate('browse')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-400/30 hover:border-blue-300/50 hover:scale-105"
            >
              Explore Courses
            </button>
          </motion.div>
        </motion.div>
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
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
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