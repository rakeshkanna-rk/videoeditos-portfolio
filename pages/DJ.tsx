import React, { useState, useEffect } from "react";
import { DJHero } from "../components/dj/DJHero";
import { DJAbout } from "../components/dj/DJAbout";
import { DJGigs } from "../components/dj/DJGigs";
import { DJBooking } from "../components/dj/DJBooking";
import { Footer } from "../components/Footer";
import { Preloader } from "../components/Preloader";
import { useSiteContent } from "../context/SiteContentContext";
import { motion } from "framer-motion";

export const DJ: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { content } = useSiteContent();

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
        className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white"
      >
        <DJHero />
        <DJAbout />
        <DJGigs />
        <DJBooking />
        <Footer />
      </motion.div>
    </>
  );
};
