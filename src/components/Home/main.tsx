import { useState } from "react";
import { Menu, X, Star, Clock, Users, ArrowRight, Quote, Github, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker, SiKubernetes, SiAmazon, SiGit, SiFigma, SiGraphql, SiRedis, SiExpress, SiNextdotjs, SiVim } from "react-icons/si";

// Category colors configuration
const categoryColors = {
  "Full Stack": "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30",
  "Mobile": "bg-green-500/20 text-green-400 hover:bg-green-500/30",
  "Blockchain": "bg-violet-500/20 text-violet-400 hover:bg-violet-500/30",
  "AI/ML": "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
  "Cybersecurity": "bg-red-500/20 text-red-400 hover:bg-red-500/30",
  "Cloud & DevOps": "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30",
  "Data Engineering": "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30",
  "Game Development": "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30",
  "IoT & Embedded": "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
  "Quantum Computing": "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30",
  "Programming Languages": "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30",
  "Robotics": "bg-teal-500/20 text-teal-400 hover:bg-teal-500/30",
  "AR/VR": "bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/30",
  "Software Architecture": "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30",
  "AI Ethics": "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
  "Edge AI": "bg-lime-500/20 text-lime-400 hover:bg-lime-500/30",
};

const hoverColors = {
  "Full Stack": "group-hover:text-purple-400",
  "Mobile": "group-hover:text-green-400",
  "Blockchain": "group-hover:text-violet-400",
  "AI/ML": "group-hover:text-blue-400",
  "Cybersecurity": "group-hover:text-red-400",
  "Cloud & DevOps": "group-hover:text-orange-400",
  "Data Engineering": "group-hover:text-cyan-400",
  "Game Development": "group-hover:text-pink-400",
  "IoT & Embedded": "group-hover:text-yellow-400",
  "Quantum Computing": "group-hover:text-indigo-400",
  "Programming Languages": "group-hover:text-emerald-400",
  "Robotics": "group-hover:text-teal-400",
  "AR/VR": "group-hover:text-fuchsia-400",
  "Software Architecture": "group-hover:text-slate-400",
  "AI Ethics": "group-hover:text-amber-400",
  "Edge AI": "group-hover:text-lime-400",
};

// Tech skills data
interface TechSkill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const techSkills: TechSkill[] = [
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-400" },
  { name: "Python", icon: SiPython, color: "text-yellow-400" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-300" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "HTML5", icon: SiHtml5, color: "text-orange-400" },
  { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
  { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-500" },
  { name: "AWS", icon: SiAmazon, color: "text-orange-400" },
  { name: "Git", icon: SiGit, color: "text-red-400" },
  { name: "Vim", icon: SiVim, color: "text-green-400" },
  { name: "Figma", icon: SiFigma, color: "text-purple-400" },
  { name: "GraphQL", icon: SiGraphql, color: "text-pink-400" },
  { name: "Redis", icon: SiRedis, color: "text-red-500" },
  { name: "Express", icon: SiExpress, color: "text-gray-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
];


// Navigation Component
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/95 backdrop-blur-lg border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg sm:text-xl md:text-2xl font-bold">
                  <span className="text-white">Class</span><span className="text-blue-400">X</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-6 lg:ml-10 flex items-baseline space-x-3 lg:space-x-6">
                <SignInButton 
                  mode="modal"
                  appearance={{
                    elements: {
                      modalContent: "bg-black border border-white/10",
                      headerTitle: "text-white",
                      headerSubtitle: "text-white/80",
                      socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                      socialButtonsBlockButtonText: "text-white",
                      formFieldInput: "bg-white/5 border border-white/10 text-white",
                      formFieldLabel: "text-white",
                      identityPreviewText: "text-white",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                      footerActionLink: "text-blue-400 hover:text-blue-300",
                      formResendCodeLink: "text-blue-400 hover:text-blue-300",
                      formFieldSuccessText: "text-green-400",
                      formFieldErrorText: "text-red-400",
                      alertText: "text-white"
                    }
                  }}
                >
                  <button className="text-white/80 hover:text-white transition-colors duration-200 px-4 lg:px-6 py-2 text-sm font-medium border border-white/20 rounded-xl hover:bg-white/10">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton 
                  mode="modal"
                  appearance={{
                    elements: {
                      modalContent: "bg-black border border-white/10",
                      headerTitle: "text-white",
                      headerSubtitle: "text-white/80",
                      socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                      socialButtonsBlockButtonText: "text-white",
                      formFieldInput: "bg-white/5 border border-white/10 text-white",
                      formFieldLabel: "text-white",
                      identityPreviewText: "text-white",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                      footerActionLink: "text-blue-400 hover:text-blue-300",
                      formResendCodeLink: "text-blue-400 hover:text-blue-300",
                      formFieldSuccessText: "text-green-400",
                      formFieldErrorText: "text-red-400",
                      alertText: "text-white"
                    }
                  }}
                >
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 rounded-xl">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </div>
            
            <div className="md:hidden">
              <button 
                className="text-white/80 hover:text-white p-1.5 bg-transparent border-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-col space-y-3">
                <SignInButton 
                  mode="modal"
                  appearance={{
                    elements: {
                      modalContent: "bg-black border border-white/10",
                      headerTitle: "text-white",
                      headerSubtitle: "text-white/80",
                      socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                      socialButtonsBlockButtonText: "text-white",
                      formFieldInput: "bg-white/5 border border-white/10 text-white",
                      formFieldLabel: "text-white",
                      identityPreviewText: "text-white",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                      footerActionLink: "text-blue-400 hover:text-blue-300",
                      formResendCodeLink: "text-blue-400 hover:text-blue-300",
                      formFieldSuccessText: "text-green-400",
                      formFieldErrorText: "text-red-400",
                      alertText: "text-white"
                    }
                  }}
                >
                  <button className="text-white/80 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium cursor-pointer rounded-lg hover:bg-white/10 border border-white/20 w-full">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton 
                  mode="modal"
                  appearance={{
                    elements: {
                      modalContent: "bg-black border border-white/10",
                      headerTitle: "text-white",
                      headerSubtitle: "text-white/80",
                      socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                      socialButtonsBlockButtonText: "text-white",
                      formFieldInput: "bg-white/5 border border-white/10 text-white",
                      formFieldLabel: "text-white",
                      identityPreviewText: "text-white",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                      footerActionLink: "text-blue-400 hover:text-blue-300",
                      formResendCodeLink: "text-blue-400 hover:text-blue-300",
                      formFieldSuccessText: "text-green-400",
                      formFieldErrorText: "text-red-400",
                      alertText: "text-white"
                    }
                  }}
                >
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl w-full">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Hero Component
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 md:mb-8 px-4">
            <span className="text-white">Master Modern</span>{" "}
            <span className="text-blue-400">
              Development
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
            <span className="text-white">Join thousands of developers building the future.</span>{" "}
            <span className="text-blue-400">Learn cutting-edge technologies, 
            work on real projects, and get industry-ready with our comprehensive courses.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-12">
            <SignUpButton 
              mode="modal"
              appearance={{
                elements: {
                  modalContent: "bg-black border border-white/10",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/80",
                  socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                  socialButtonsBlockButtonText: "text-white",
                  formFieldInput: "bg-white/5 border border-white/10 text-white",
                  formFieldLabel: "text-white",
                  identityPreviewText: "text-white",
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                  footerActionLink: "text-blue-400 hover:text-blue-300",
                  formResendCodeLink: "text-blue-400 hover:text-blue-300",
                  formFieldSuccessText: "text-green-400",
                  formFieldErrorText: "text-red-400",
                  alertText: "text-white"
                }
              }}
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105 rounded-xl">
                Get Started
              </button>
            </SignUpButton>
            <SignInButton 
              mode="modal"
              appearance={{
                elements: {
                  modalContent: "bg-black border border-white/10",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/80",
                  socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                  socialButtonsBlockButtonText: "text-white",
                  formFieldInput: "bg-white/5 border border-white/10 text-white",
                  formFieldLabel: "text-white",
                  identityPreviewText: "text-white",
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                  footerActionLink: "text-blue-400 hover:text-blue-300",
                  formResendCodeLink: "text-blue-400 hover:text-blue-300",
                  formFieldSuccessText: "text-green-400",
                  formFieldErrorText: "text-red-400",
                  alertText: "text-white"
                }
              }}
            >
              <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-medium transition-all duration-200 rounded-xl bg-transparent">
                Sign In
              </button>
            </SignInButton>
          </div>
          
          <div className="mt-10 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-3 md:mb-4">50K+</div>
                <div className="text-white text-sm sm:text-base md:text-lg font-medium">Students</div>
              </div>
            </div>
            <div className="text-center bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-3 md:mb-4">25+</div>
                <div className="text-white text-sm sm:text-base md:text-lg font-medium">Courses</div>
              </div>
            </div>
            <div className="text-center bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-3 md:mb-4">95%</div>
                <div className="text-white text-sm sm:text-base md:text-lg font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Image Slider Component
function ImageSlider() {
  const images = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  ];

  const duplicatedImages = [...images, ...images];

  return (
    <section className="py-12 md:py-16 lg:py-20 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
            <span className="text-white">Our</span>{" "}
            <span className="text-blue-400">
              Courses
            </span>
          </h2>
          <p className="text-white text-base sm:text-lg max-w-xl md:max-w-2xl mx-auto px-4">
            <span className="text-white">Explore our comprehensive</span>{" "}
            <span className="text-blue-400">courses and learning paths</span>
          </p>
        </div>

        <div className="slider-container">
          <div className="flex animate-slide-left">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] h-48 sm:h-56 md:h-72 lg:h-80 mx-2 sm:mx-3 md:mx-4 rounded-xl overflow-hidden shadow-2xl border border-slate-700/30"
              >
                <img
                  src={image}
                  alt={`Project ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Tech Skills Component
function TechSkills() {
  const tripleSkills = [...techSkills, ...techSkills, ...techSkills];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
            <span className="text-white">Technical</span>{" "}
            <span className="text-blue-400">
              Skills
            </span>
          </h2>
          <p className="text-white text-base sm:text-lg max-w-xl md:max-w-2xl mx-auto px-4">
            <span className="text-white">Technologies and tools we master to</span>{" "}
            <span className="text-blue-400">build exceptional solutions</span>
          </p>
        </div>

        <div className="space-y-6">
          {/* First row - Left to Right */}
          <div className="slider-container">
            <div className="flex animate-slide-left">
              {tripleSkills.map((skill, index) => (
                <div
                  key={`left-${index}`}
                  className="flex-shrink-0 flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 mx-2 sm:mx-2.5 md:mx-3 min-w-fit relative overflow-hidden"
                >
                  <skill.icon className={`w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 ${skill.color} relative z-10`} />
                  <span className="text-xs sm:text-sm md:text-base font-mono font-medium whitespace-nowrap text-slate-300 relative z-10">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - Right to Left */}
          <div className="slider-container">
            <div className="flex animate-slide-right">
              {tripleSkills.map((skill, index) => (
                <div
                  key={`right-${index}`}
                  className="flex-shrink-0 flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 mx-2 sm:mx-2.5 md:mx-3 min-w-fit relative overflow-hidden"
                >
                  <skill.icon className={`w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 ${skill.color} relative z-10`} />
                  <span className="text-xs sm:text-sm md:text-base font-mono font-medium whitespace-nowrap text-slate-300 relative z-10">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Third row - Left to Right */}
          <div className="slider-container">
            <div className="flex animate-slide-left">
              {tripleSkills.map((skill, index) => (
                <div
                  key={`left2-${index}`}
                  className="flex-shrink-0 flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 mx-2 sm:mx-2.5 md:mx-3 min-w-fit relative overflow-hidden"
                >
                  <skill.icon className={`w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 ${skill.color} relative z-10`} />
                  <span className="text-xs sm:text-sm md:text-base font-mono font-medium whitespace-nowrap text-slate-300 relative z-10">
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
}



// Footer Component
function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">
              <span className="text-white">Class</span><span className="text-blue-400">X</span>
            </h3>
            <p className="text-white mb-4 md:mb-6 max-w-md text-sm sm:text-base">
              <span className="text-white">Empowering developers worldwide with</span>{" "}
              <span className="text-blue-400">cutting-edge courses and real-world projects.</span>{" "}
              <span className="text-white">Join the community of successful developers.</span>
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200">
                <Github className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200">
                <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm sm:text-base">Courses</h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">Web Development</a></li>
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">Data Science</a></li>
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">Mobile Development</a></li>
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">DevOps</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">Community</a></li>
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-white/80 text-xs sm:text-sm">
            &copy; 2024 ClassX. All rights reserved. Built with ❤️ for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function Main() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <ImageSlider />
      <TechSkills />
      <Footer />
    </div>
  );
}
