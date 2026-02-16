import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Music2, Cpu, Headphones } from "lucide-react";

export const DJAbout: React.FC = () => {
  return (
    <section className="py-24  relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 text-purple-500 mb-6">
                <Sparkles size={20} />
                <span className="text-xs font-mono tracking-[0.5em] uppercase">
                  About_The_Artist
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black italic mb-6">
                About Me
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                I am a professional DJ with experience performing at{" "}
                <span className="text-white font-bold">10+ live shows</span>. I
                specialize in creating high-energy atmospheres, seamless
                transitions, and unforgettable crowd experiences.
              </p>
              <p className="text-slate-400 mt-4 leading-relaxed">
                My performances blend rhythm, emotion, and energy to keep
                audiences fully engaged from start to finish. With a deep
                understanding of music flow and crowd psychology, I deliver
                powerful live sets that turn events into memorable experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-purple-500 mb-2">
                  <Headphones size={24} />
                </div>
                <h4 className="font-bold text-white mb-1">Smooth Mixes</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Professional Transitions
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-blue-500 mb-2">
                  <Zap size={24} />
                </div>
                <h4 className="font-bold text-white mb-1">High Energy</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Crowd Interaction
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Music2 className="text-purple-400" />
                Music Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Commercial Hits",
                  "EDM",
                  "Tamil & South Indian Party Mix",
                  "Hip-Hop",
                  "Bollywood",
                  "Mashups & Remixes",
                  "Festival & Club Sets",
                ].map((genre) => (
                  <span
                    key={genre}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-slate-900/50 border border-white/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Cpu className="text-blue-400" />
                Equipment Knowledge
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-slate-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Pioneer DJ Controllers
                </li>
                <li className="flex items-center gap-4 text-slate-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Professional Sound Setup Handling
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
