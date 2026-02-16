import React, { useState, useEffect } from "react";
import { VideoEditor } from "./pages/VideoEditor";
import { DJ } from "./pages/DJ";
import { motion, AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"video" | "dj">("video");

  useEffect(() => {
    document.body.classList.add("opacity-100");
  }, []);

  return (
    <div className="relative min-h-screen bg-cinematic-navy overflow-x-hidden">
      {/* GLOBAL TOGGLE SWITCH */}
      <div className="fixed bottom-8 md:bottom-auto md:top-8 left-1/2 -translate-x-1/2 z-[300]">
        <div className="flex items-center bg-slate-900/60 backdrop-blur-2xl px-2 py-2 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-90 md:scale-100">
          <div className="flex items-center relative">
            {/* Sliding Background Selection */}
            <motion.div
              layoutId="activeTab"
              className={`absolute inset-0 rounded-full ${
                activeTab === "video" ? "bg-sky-500" : "bg-purple-600"
              }`}
              animate={{
                x: activeTab === "video" ? 0 : 135,
                width: activeTab === "video" ? 135 : 75,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            <button
              onClick={() => setActiveTab("video")}
              className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 w-[135px] ${
                activeTab === "video"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Video Editor
            </button>

            <button
              onClick={() => setActiveTab("dj")}
              className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 w-[75px] ${
                activeTab === "dj"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              DJ
            </button>
          </div>
        </div>
      </div>

      {/* PAGE RENDERING */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen"
        >
          {activeTab === "video" ? <VideoEditor /> : <DJ />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
