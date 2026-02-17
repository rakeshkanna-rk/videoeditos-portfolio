import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REELS } from "../../constants";
import { Play, X, Smartphone, Instagram } from "lucide-react";

export const VerticalShowcase: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<any>(null);

  return (
    <section id="reels" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center md:justify-start gap-3 text-sky-500 mb-4">
              <Smartphone size={20} />
              <span className="text-xs font-mono tracking-[0.3em] uppercase">
                Short_Form_Content
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
              9:16 <span className="text-sky-500 italic">Showcase</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-sm font-light text-sm md:text-base"
          >
            Optimized for engagement. High-energy edits for Instagram Reels,
            YouTube Shorts, and TikTok.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {REELS.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-slate-900 rounded-4xl overflow-hidden border border-slate-800/50 cursor-pointer aspect-9/16"
              onClick={() => setSelectedReel(reel)}
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-sky-500/90 flex items-center justify-center text-slate-950 shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block mb-2">
                  {reel.category}
                </span>
                <h3 className="text-sm md:text-lg font-bold text-white line-clamp-1 group-hover:text-sky-500 transition-colors uppercase tracking-tight">
                  {reel.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-500 flex items-center justify-center p-4 backdrop-blur-3xl bg-slate-950/95"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm aspect-9/16 bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(56,189,248,0.2)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors"
                onClick={() => setSelectedReel(null)}
              >
                <X size={20} />
              </button>

              <video
                src={selectedReel.videoUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                loop
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
