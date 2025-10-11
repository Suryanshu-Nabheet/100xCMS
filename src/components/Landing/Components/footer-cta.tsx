'use client';
import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterCTA = () => {
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
        className="relative flex min-h-[400px] w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-blue-400 to-blue-700 p-8 md:min-h-[350px] md:flex-col md:px-12"
      >
        <div className="flex flex-col justify-end gap-4">
          <div className="flex flex-col gap-2 md:w-[70%]">
            <h3 className="text-3xl font-black tracking-tight text-white drop-shadow-lg md:text-4xl lg:text-5xl">
              ClassX –{' '}
              <span className="font-black tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                Ahead of Time
              </span>
            </h3>
            <p className="text-lg font-semibold text-white/90 drop-shadow-md md:text-xl lg:text-2xl">
              Give yourself the power you deserve with ClassX today!
            </p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <button 
              className="flex w-full items-center gap-3 md:w-fit bg-black text-white hover:bg-black/90 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              aria-label="Download ClassX mobile app"
            >
              <Download className="size-4" />
              Download App
            </button>
            <button 
              className="flex w-full items-center gap-3 md:w-fit bg-white/20 text-white hover:bg-white/30 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 border border-white/30 shadow-xl hover:shadow-2xl"
              aria-label="Join ClassX platform"
            >
              <Sparkles className="size-4" />
              Join Now
            </button>
          </div>
        </div>
        <motion.div
          animate={floatingAnimation}
          className="absolute mx-auto w-full justify-center md:-right-8 md:top-4"
        >
          <div className="absolute w-[100%] rotate-3 transition-all duration-300 group-hover:-translate-y-4 group-hover:rotate-6 md:-right-8 md:w-[55%]">
            <img
              src="public/Mockup.png"
              alt="ClassX App Mockup"
              className="w-full h-auto shadow-2xl mockup-image"
              loading="lazy"
              decoding="async"
              style={{ 
                backgroundColor: 'transparent !important',
                background: 'none !important',
                backgroundImage: 'none !important',
                borderRadius: '0px !important',
                filter: 'contrast(1.2) brightness(1.1)',
                mixBlendMode: 'screen',
                border: 'none !important',
                outline: 'none !important'
              }}
            />
          </div>
        </motion.div>
        </motion.div>
        </div>
      </div>
      
      {/* Colorful separator line */}
      <div className="w-full h-px bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-60"></div>
    </section>
  );
};

export default FooterCTA;