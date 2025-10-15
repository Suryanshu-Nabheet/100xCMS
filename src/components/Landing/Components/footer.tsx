import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/20 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Brand Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                ClassX
              </span>
            </h3>
            <p className="text-sm text-white/80">
              because learning ain&apos;t enough.
            </p>
            <p className="text-xs text-white/60">
              Made by <span className="text-blue-400 font-medium">Suryanshu Nabheet</span>
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 mt-2">
                  <a
                    href="https://x.com/suryanshuxdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-8 h-8 bg-white/5 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
                    aria-label="Follow Suryanshu on X"
                  >
                    <Twitter className="w-4 h-4 text-white group-hover:text-blue-400 transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/suryanshu-nabheet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-8 h-8 bg-white/5 hover:bg-blue-600/20 rounded-lg transition-all duration-300"
                    aria-label="Connect with Suryanshu on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-white group-hover:text-blue-500 transition-colors" />
                  </a>
                  <a
                    href="https://github.com/Suryanshu-Nabheet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-8 h-8 bg-white/5 hover:bg-gray-500/20 rounded-lg transition-all duration-300"
                    aria-label="Check out Suryanshu's GitHub"
                  >
                    <Github className="w-4 h-4 text-white group-hover:text-gray-300 transition-colors" />
                  </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-semibold text-sm">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a
                href="/projects"
                className="text-white hover:text-blue-400 active:text-blue-400 transition-colors duration-200 text-sm w-fit focus:outline-none focus:ring-0 focus:border-0 outline-none"
                style={{ outline: 'none', border: 'none' }}
              >
                Projects
              </a>
              <a
                href="/documentation"
                className="text-white hover:text-blue-400 active:text-blue-400 transition-colors duration-200 text-sm w-fit focus:outline-none focus:ring-0 focus:border-0 outline-none"
                style={{ outline: 'none', border: 'none' }}
              >
                Documentation
              </a>
              <a
                href="/community"
                className="text-white hover:text-blue-400 active:text-blue-400 transition-colors duration-200 text-sm w-fit focus:outline-none focus:ring-0 focus:border-0 outline-none"
                style={{ outline: 'none', border: 'none' }}
              >
                Community
              </a>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-semibold text-sm">Legal</h4>
            <div className="flex flex-col space-y-2">
              <a
                href="/terms-conditions"
                className="text-white hover:text-blue-400 active:text-blue-400 transition-colors duration-200 text-sm w-fit focus:outline-none focus:ring-0 focus:border-0 outline-none"
                style={{ outline: 'none', border: 'none' }}
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy-policy"
                className="text-white hover:text-blue-400 active:text-blue-400 transition-colors duration-200 text-sm w-fit focus:outline-none focus:ring-0 focus:border-0 outline-none"
                style={{ outline: 'none', border: 'none' }}
              >
                Privacy Policy
              </a>
              <a
                href="/refund-policy"
                className="text-white hover:text-blue-400 active:text-blue-400 transition-colors duration-200 text-sm w-fit focus:outline-none focus:ring-0 focus:border-0 outline-none"
                style={{ outline: 'none', border: 'none' }}
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-xs">
                &copy; 2025 ClassX. Open source project by Suryanshu Nabheet.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/60 text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
