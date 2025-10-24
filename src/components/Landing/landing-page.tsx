'use client';
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SignIn, SignUp } from '../Auth';
import { motion } from 'framer-motion';
import FooterCTA from './Components/footer-cta';
import Footer from './Components/footer';
import { 
  Projects, 
  Documentation, 
  Community, 
  Legal, 
  TermsConditions, 
  PrivacyPolicy, 
  RefundPolicy 
} from './Links';
import { SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker, SiKubernetes, SiAmazon, SiGit, SiFigma, SiGraphql, SiRedis, SiExpress, SiNextdotjs, SiVim } from "react-icons/si";

const heroItems = [
  {
    imageUrl: "https://t4.ftcdn.net/jpg/04/63/37/51/240_F_463375173_vBKRkUbVoCuS9lpUmhdfCc13pprPr148.jpg",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/03/48/39/74/360_F_348397404_wXuf22GUPNAh67htBZZnaDSx3Bj92yep.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/52/58/99/360_F_352589922_wrQkznnjAYjCX0OOhryzYgzsWAOZboBN.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/72/69/25/360_F_372692509_UzLYB03rpChTTDhrT3EStFEq4j8CIeqd.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/98/40/81/360_F_398408157_McCktDBclnNQ1VPPTO03kQF9eZRG80SL.jpg",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/15/11/23/360_F_315112337_WpBJPvZbFWIGL2mJIGL00AoIPvYIAfJW.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.webp",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/02/85/92/64/360_F_285926473_L4IqNJhss4ym9WOYUQYN0TCecpFDFerR.webp",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/09/39/36/60/360_F_939366028_KbGbRltHnATTbBhPXJUKAyWl9MP9gVYb.jpg",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/05/76/74/60/360_F_576746048_xb0A6qns2CD9MxO6vxUCtKVFEntTwuVg.jpg",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/04/63/37/51/240_F_463375173_vBKRkUbVoCuS9lpUmhdfCc13pprPr148.jpg",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/03/48/39/74/360_F_348397404_wXuf22GUPNAh67htBZZnaDSx3Bj92yep.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/52/58/99/360_F_352589922_wrQkznnjAYjCX0OOhryzYgzsWAOZboBN.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/72/69/25/360_F_372692509_UzLYB03rpChTTDhrT3EStFEq4j8CIeqd.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/98/40/81/360_F_398408157_McCktDBclnNQ1VPPTO03kQF9eZRG80SL.jpg",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/15/11/23/360_F_315112337_WpBJPvZbFWIGL2mJIGL00AoIPvYIAfJW.webp",
  },
  {
    imageUrl: "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.webp",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/02/85/92/64/360_F_285926473_L4IqNJhss4ym9WOYUQYN0TCecpFDFerR.webp",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/09/39/36/60/360_F_939366028_KbGbRltHnATTbBhPXJUKAyWl9MP9gVYb.jpg",
  },
  {
    imageUrl: "https://t3.ftcdn.net/jpg/05/76/74/60/360_F_576746048_xb0A6qns2CD9MxO6vxUCtKVFEntTwuVg.jpg",
  },
];

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <nav className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg sm:text-xl md:!text-2xl !font-bold">
                  <span className="text-white">Class</span><span className="text-blue-400">X</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-6 lg:ml-10 flex items-baseline space-x-4 lg:space-x-6">
                <button 
                  onClick={() => setIsSignInOpen(true)}
                  className="text-white/90 hover:text-white transition-all duration-300 px-6 lg:px-8 py-3 text-base font-semibold border border-white/30 rounded-xl hover:bg-white/15 hover:border-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Open sign in modal"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsSignUpOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 lg:px-8 py-3 text-base font-semibold transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg hover:shadow-xl border border-blue-500/30 hover:border-blue-400/50"
                  aria-label="Open sign up modal"
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button 
                className="text-white/80 hover:text-white p-1.5 bg-transparent border-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => {
                    setIsSignInOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-white/90 hover:text-white transition-all duration-300 px-4 py-3 text-base font-semibold cursor-pointer rounded-xl hover:bg-white/15 border border-white/30 hover:border-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 w-full"
                  aria-label="Open sign in modal"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    setIsSignUpOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 text-base font-semibold transition-all duration-300 rounded-xl w-full shadow-lg hover:shadow-xl border border-blue-500/30 hover:border-blue-400/50 transform hover:scale-105"
                  aria-label="Open sign up modal"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Auth Modals */}
      <SignIn 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUp 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
    </nav>
  );
});

// Infinite Moving Cards Component
const InfiniteMovingCards = React.memo(({ items }: { items: typeof heroItems }) => {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="slider-container relative group">
      
      <div className="flex image-slider">
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 sm:w-80 md:w-[24rem] lg:w-[28rem] h-40 sm:h-48 md:h-56 lg:h-64 mx-2 sm:mx-3 md:mx-4 rounded-xl overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={`Course ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

// Tech Skills Component

// Create different tech stacks for each row
const frontendSkills = [
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "HTML5", icon: SiHtml5, color: "text-orange-400" },
  { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-300" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "Figma", icon: SiFigma, color: "text-purple-400" },
];

const backendSkills = [
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-400" },
  { name: "Python", icon: SiPython, color: "text-yellow-400" },
  { name: "Express", icon: SiExpress, color: "text-gray-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Redis", icon: SiRedis, color: "text-red-500" },
  { name: "GraphQL", icon: SiGraphql, color: "text-pink-400" },
  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
];

const devopsSkills = [
  { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-500" },
  { name: "AWS", icon: SiAmazon, color: "text-orange-400" },
  { name: "Git", icon: SiGit, color: "text-red-400" },
  { name: "Vim", icon: SiVim, color: "text-green-400" },
  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
  { name: "Redis", icon: SiRedis, color: "text-red-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Express", icon: SiExpress, color: "text-gray-400" },
];

// Duplicate each array to create continuous scrolling effect
const frontendSkillsExtended = [...frontendSkills, ...frontendSkills, ...frontendSkills, ...frontendSkills];
const backendSkillsExtended = [...backendSkills, ...backendSkills, ...backendSkills, ...backendSkills];
const devopsSkillsExtended = [...devopsSkills, ...devopsSkills, ...devopsSkills, ...devopsSkills];

const TechSkills = React.memo(() => {
  return (
    <section className="py-8 md:py-10 bg-black overflow-hidden relative">
      {/* Dark blue aesthetic spots */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-800/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-700/25 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
            <span className="text-white">Technical</span>{" "}
            <span className="text-blue-400">
              Skills
            </span>
          </h2>
          <p className="text-white text-base sm:text-lg max-w-xl md:max-w-2xl mx-auto px-4">
            Technologies and tools we master to build exceptional solutions
          </p>
        </div>

        <div className="space-y-6">
          {/* First row - Right to Left */}
          <div className="slider-container relative group">
            <div className="flex skills-slider-row1">
              {frontendSkillsExtended.map((skill, index) => (
                <div
                  key={`frontend-${index}`}
                  className="flex-shrink-0 flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 mx-2 sm:mx-2.5 md:mx-3 min-w-fit relative overflow-hidden"
                >
                  <skill.icon className={`w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 ${skill.color} relative z-10`} />
                  <span className="text-xs sm:text-sm font-mono !font-medium whitespace-nowrap text-slate-300 relative z-10">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - Left to Right */}
          <div className="slider-container relative group">
            <div className="flex skills-slider-row2">
              {backendSkillsExtended.map((skill, index) => (
                <div
                  key={`backend-${index}`}
                  className="flex-shrink-0 flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 mx-2 sm:mx-2.5 md:mx-3 min-w-fit relative overflow-hidden"
                >
                  <skill.icon className={`w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 ${skill.color} relative z-10`} />
                  <span className="text-xs sm:text-sm font-mono !font-medium whitespace-nowrap text-slate-300 relative z-10">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Third row - Right to Left */}
          <div className="slider-container relative group">
            <div className="flex skills-slider-row3">
              {devopsSkillsExtended.map((skill, index) => (
                <div
                  key={`devops-${index}`}
                  className="flex-shrink-0 flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 mx-2 sm:mx-2.5 md:mx-3 min-w-fit relative overflow-hidden"
                >
                  <skill.icon className={`w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 ${skill.color} relative z-10`} />
                  <span className="text-xs sm:text-sm font-mono !font-medium whitespace-nowrap text-slate-300 relative z-10">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default function LandingPage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});

  // Handle URL changes for routing
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      switch (path) {
        case '/projects':
          setCurrentPage('projects');
          break;
        case '/documentation':
          setCurrentPage('documentation');
          break;
        case '/community':
          setCurrentPage('community');
          break;
        case '/terms-conditions':
          setCurrentPage('terms-conditions');
          break;
        case '/privacy-policy':
          setCurrentPage('privacy-policy');
          break;
        case '/refund-policy':
          setCurrentPage('refund-policy');
          break;
        case '/legal':
          setCurrentPage('legal');
          break;
        default:
          setCurrentPage('home');
      }
    };

    // Listen for URL changes
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange(); // Check initial route

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Scroll position tracking with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY
        setScrollPositions(prev => ({
          ...prev,
          [currentPage]: scrollY
        }))
      }, 100) // Debounce scroll events
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [currentPage])

  // Restore scroll position when page changes (with delay to ensure DOM is ready)
  useEffect(() => {
    const savedPosition = scrollPositions[currentPage]
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (savedPosition !== undefined && savedPosition > 0) {
        window.scrollTo({ top: savedPosition, behavior: 'instant' })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    })
  }, [currentPage, scrollPositions])

  // Handle navigation
  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path);
    const pathname = window.location.pathname;
    switch (pathname) {
      case '/projects':
        setCurrentPage('projects');
        break;
      case '/documentation':
        setCurrentPage('documentation');
        break;
      case '/community':
        setCurrentPage('community');
        break;
      case '/terms-conditions':
        setCurrentPage('terms-conditions');
        break;
      case '/privacy-policy':
        setCurrentPage('privacy-policy');
        break;
      case '/refund-policy':
        setCurrentPage('refund-policy');
        break;
      case '/legal':
        setCurrentPage('legal');
        break;
      default:
        setCurrentPage('home');
    }
  };

  // Render the appropriate page based on current route
  const renderPage = () => {
    switch (currentPage) {
      case 'projects':
        return <Projects />;
      case 'documentation':
        return <Documentation />;
      case 'community':
        return <Community />;
      case 'terms-conditions':
        return <TermsConditions />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'refund-policy':
        return <RefundPolicy />;
      case 'legal':
        return <Legal />;
      default:
        return (
          <>
            <style>{`
              @keyframes slide-left-slow {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              
              @keyframes slide-right-slow {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              
              .group:hover .image-slider,
              .group:hover .skills-slider-row1,
              .group:hover .skills-slider-row2,
              .group:hover .skills-slider-row3 {
                animation-play-state: paused !important;
              }
              
              .image-slider {
                animation: slide-left-slow 60s linear infinite;
              }
              
              .skills-slider-row1 {
                animation: slide-right-slow 50s linear infinite;
              }
              
              .skills-slider-row2 {
                animation: slide-left-slow 45s linear infinite;
              }
              
              .skills-slider-row3 {
                animation: slide-right-slow 55s linear infinite;
              }
            `}</style>
            <div className="flex min-h-screen flex-col bg-black relative overflow-x-hidden">
            {/* Left and Right Side Shadows */}
            <div className="fixed inset-0 pointer-events-none z-30">
              {/* Left shadow */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent"
                style={{ 
                  background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)'
                }}
              ></div>
              {/* Right shadow */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent"
                style={{ 
                  background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)'
                }}
              ></div>
            </div>

            <Navigation />
            
            <main className="flex h-full flex-col items-center justify-center gap-4">
              {/* Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25,
                  type: 'spring',
                  damping: 10,
                  stiffness: 100,
                }}
                className="flex max-w-7xl flex-col items-center justify-center gap-2 px-4"
              >
                <h1 className="max-w-2xl py-2 pt-36 text-center text-5xl font-extrabold tracking-tighter md:text-6xl xl:text-7xl">
                  <span className="w-fit bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1.5 text-center text-transparent md:mb-4">
                    ClassX,
                  </span>{' '}
                  <span className="bg-gradient-to-b from-white/90 to-white/60 bg-clip-text py-1 text-transparent">
                    because learning ain&apos;t enough!
                  </span>
                </h1>

                <p className="mx-auto text-center text-lg font-medium tracking-tight text-white/80 md:text-xl">
                  A beginner-friendly platform for mastering programming skills.
                </p>
              </motion.div>
              
              {/* Get Started Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.625,
                  type: 'spring',
                  damping: 10,
                  stiffness: 100,
                }}
                className="flex items-center justify-center py-6"
              >
                <button 
                  onClick={() => setIsSignUpOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105 rounded-xl shadow-lg hover:shadow-xl"
                  aria-label="Get started with ClassX"
                >
                  Get Started
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.75,
                  type: 'spring',
                  damping: 10,
                  stiffness: 100,
                }}
                className="relative mx-auto my-2 md:my-3 flex w-full flex-col items-center justify-center overflow-hidden antialiased"
              >
                <InfiniteMovingCards items={heroItems} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 1,
                }}
                className="absolute bottom-0 -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]"
              />
            </main>
            
            <TechSkills />
              <FooterCTA setIsSignUpOpen={setIsSignUpOpen} />
            <Footer onNavigate={handleNavigation} />
            
            {/* Auth Modals */}
            <SignIn 
              isOpen={isSignInOpen} 
              onClose={() => setIsSignInOpen(false)}
              onSwitchToSignUp={() => {
                setIsSignInOpen(false);
                setIsSignUpOpen(true);
              }}
            />
            <SignUp 
              isOpen={isSignUpOpen} 
              onClose={() => setIsSignUpOpen(false)}
              onSwitchToSignIn={() => {
                setIsSignUpOpen(false);
                setIsSignInOpen(true);
              }}
            />
            </div>
          </>
        );
    }
  };

  return renderPage();
}
