import React from "react";
import { motion } from "framer-motion";
import { Brands } from "./Brands";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-cinematic-navy border-y border-slate-800/50 overflow-hidden"
    >
      <div className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/50 p-2">
              <img
                src="https://picsum.photos/id/64/800/800"
                alt="Workspace"
                className="rounded-xl grayscale opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <div className="text-4xl font-bold text-white mb-1">05+</div>
                <div className="text-sky-400 text-sm uppercase tracking-widest font-semibold">
                  Years of Vision
                </div>
              </div>
            </div>
            {/* Funky decorative element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-dashed border-sky-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-sky-500/10 backdrop-blur-sm rounded-lg border border-sky-500/20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
              <span className="text-sky-500">/</span> THE CREATIVE BEHIND
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
              Hi, I’m <span className="text-white font-bold">Thiruvasagam</span>{" "}
              — a Professional Video Editor and Motion Graphic Designer with a
              strong passion for visual storytelling and cinematic content
              creation.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Currently, I'm shaping visual narratives at{" "}
              <span className="text-sky-400">Srinivasa Academy</span> and have
              honed my craft through immersive intern experience at{" "}
              <span className="text-sky-400">MillennialLabs</span>. My journey
              is fueled by a deep understanding of audience engagement and the
              perfect timing of every transition.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <span className="text-xs font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm mb-1 tracking-wider">
                    Dynamic 3D Editing
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Combining traditional storytelling with high-end spatial
                    elements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <span className="text-xs font-bold">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm mb-1 tracking-wider">
                    Emotional Impact
                  </h4>
                  <p className="text-slate-400 text-sm">
                    I don’t just cut clips; I craft energy that moves the
                    viewer.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white font-semibold italic text-xl border-l-4 border-sky-500 pl-6 py-2">
              "I craft emotion, energy, and impact in every frame."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Brands section included here */}
      <Brands />
    </section>
  );
};
