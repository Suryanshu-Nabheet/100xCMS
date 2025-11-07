'use client';
import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterCTAProps {
  setIsSignUpOpen: (isOpen: boolean) => void;
}

const FooterCTA: React.FC<FooterCTAProps> = ({ setIsSignUpOpen }) => {
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut' as const,
      repeat: Infinity,
    },
  };

  return (
    <section className="py-4 md:py-6 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="group">
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
            className="relative flex h-[75vh] w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-blue-400 to-blue-700 p-8 md:h-[45vh] md:flex-col"
          >
            <div className="flex flex-col justify-end gap-4">
              <div className="flex flex-col gap-2 md:w-[70%]">
                <h3 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                  Every developer deserves to be a great engineer, a{' '}
                  <span className="font-extrabold tracking-tighter">
                    100xEngineer!
                  </span>
                </h3>

                <p className="text-lg font-medium text-white/80 md:text-xl">
                  Give yourself the power you deserve with a 100xdevs today!
                </p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <a
                  href="https://play.google.com/store/apps/details?id=com.hundredx.devs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 md:w-fit bg-black text-white hover:bg-black/90 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl min-h-[48px]"
                  aria-label="Download 100xDevs mobile app"
                >
                  <Download className="size-4" />
                  Download App
                </a>
                <button 
                  onClick={() => setIsSignUpOpen(true)}
                  className="flex w-full items-center gap-2 md:w-fit bg-white/20 text-white hover:bg-white/30 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 min-h-[48px]"
                  aria-label="Join 100xDevs platform"
                >
                  <Sparkles className="size-4" />
                  Join Now
                </button>
              </div>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.hundredx.devs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                animate={floatingAnimation}
                className="absolute mx-auto w-full justify-end md:right-6 md:top-12"
              >
                <img
                  src="public/Mockup.png"
                  alt="Mockup"
                  className="absolute w-[80%] rotate-3 transition-all duration-300 group-hover:-translate-y-4 group-hover:rotate-6 md:right-6 md:w-[30%]"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Colorful separator line */}
      <div className="w-full h-px bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-60"></div>
    </section>
  );
};

export default FooterCTA;