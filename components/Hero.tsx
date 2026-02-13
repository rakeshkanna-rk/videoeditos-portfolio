
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Scissors, Layers, Film } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cinematic-navy py-20 px-6">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-700/20 rounded-full blur-[150px]"
        />
        
        {/* Film grain / Scanlines effect simulation */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 border border-sky-500/30 rounded-full bg-sky-500/10 text-sky-400 text-sm font-semibold tracking-widest uppercase"
          >
            Video Editor & Motion Designer
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Crafting <span className="text-electric glitch-text" data-text="Emotion">Emotion</span> <br />
            Frame by <span className="italic font-light">Frame</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
            Dynamic storytelling through cinematic motion graphics and high-impact visual editing. 
            Turning visions into scroll-stopping digital experiences.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-slate-950 font-bold rounded-lg flex items-center gap-2 hover:bg-sky-50 transition-colors shadow-lg shadow-sky-500/20"
            >
              <Play className="w-5 h-5 fill-current" />
              VIEW MY WORK
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-slate-700 font-bold rounded-lg hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              LET'S TALK
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative group"
        >
          {/* Main Photo Frame */}
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-2xl border-2 border-slate-800 shadow-2xl">
            <img 
              src="https://picsum.photos/id/64/800/1000" 
              alt="Thiruvasagam" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Viewfinder overlay */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-white/50 tracking-[0.3em]">REC ● 00:00:23:14</div>
            </div>
          </div>

          {/* Floating Icons */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -left-6 p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-20"
          >
            <Scissors className="w-6 h-6 text-sky-400" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 -right-10 p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-20"
          >
            <Layers className="w-6 h-6 text-purple-400" />
          </motion.div>
          <motion.div 
            animate={{ x: [0, -10, 0] }} 
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -bottom-8 left-1/4 p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-20"
          >
            <Film className="w-6 h-6 text-emerald-400" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto"></div>
        <span className="text-[10px] uppercase tracking-[0.5em] mt-2 block">SCROLL</span>
      </motion.div>
    </section>
  );
};
