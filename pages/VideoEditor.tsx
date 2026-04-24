import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { MegaIntro } from "../components/ve/MegaIntro";
import { Software } from "../components/ve/Software";
import { Experience } from "../components/ve/Experience";
import { Portfolio } from "../components/ve/Portfolio";
import { VerticalShowcase } from "../components/ve/VerticalShowcase";
import { Contact } from "../components/ve/Contact";
import { Footer } from "../components/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { FloatingIcons } from "../components/ve/FloatingIcons";
import { motion, AnimatePresence } from "framer-motion";
import { Preloader } from "../components/Preloader";
import { useSiteContent } from "../context/SiteContentContext";

export const VideoEditor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { content } = useSiteContent();

  useEffect(() => {
    document.body.classList.add("opacity-100");
  }, []);

  // Background Video Preloading
  useEffect(() => {
    if (!isLoading && content) {
      const videos: string[] = [];
      Object.values(content).forEach(section => {
        section.forEach(item => {
          if ((item.type === 'url' || item.type === 'video') && item.value && (item.value.includes('.mp4') || item.value.includes('.mov'))) {
            videos.push(item.value);
          }
        });
      });

      const uniqueVideos = Array.from(new Set(videos));
      uniqueVideos.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = src;
        document.head.appendChild(link);
      });
    }
  }, [isLoading, content]);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="relative selection:bg-sky-500 selection:text-white"
      >
      <FloatingIcons />
      <CustomCursor />
      <Header />

      {/* Background Editor Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-[5%] text-[8px] font-mono text-white/5 uppercase tracking-widest rotate-90 origin-left">
          Timeline_v01_Export
        </div>
        <div className="absolute bottom-[20%] right-[3%] text-[8px] font-mono text-white/5 uppercase tracking-[0.5em] -rotate-90 origin-right">
          Buffer_Sync_Active
        </div>
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/3 right-10 w-24 h-px bg-white/10"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/3 left-10 w-px h-24 bg-white/10"
        />
      </div>

      <main className="relative z-10">
        <MegaIntro />
        <Software />
        <div id="experience">
          <Experience />
        </div>
        <Portfolio />
        <VerticalShowcase />
        <Contact />
      </main>

      <Footer />

      {/* Cinematic Frame Overlay (Fixed) */}
      <div className="fixed inset-0 pointer-events-none z-200 border-10 md:border-20 border-slate-950/30">
        {/* Dynamic crop marks */}
        <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 flex flex-col gap-1">
          <div className="w-4 h-px bg-white/20" />
          <div className="w-2 h-px bg-white/10" />
          <div className="w-4 h-px bg-white/20" />
        </div>
        <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 flex flex-col gap-1 items-end">
          <div className="w-4 h-px bg-white/20" />
          <div className="w-2 h-px bg-white/10" />
          <div className="w-4 h-px bg-white/20" />
        </div>

        {/* Decorative Playhead Lines */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-4 bg-white/10" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px h-4 bg-white/10" />
      </div>
    </motion.div>
    </>
  );
};
