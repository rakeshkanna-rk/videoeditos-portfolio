import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SPECIALIZATIONS } from "../constants";
import * as LucideIcons from "lucide-react";
import { Brands } from "./Brands";

export const MegaIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create scroll progress for the first two sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  // Hero Animations (0% to 50% of the sticky scroll)
  const heroOpacity = useTransform(smoothProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 1.5]);
  const nameLetterSpacing = useTransform(
    smoothProgress,
    [0, 0.5],
    ["-0.05em", "0.5em"],
  );

  // About Animations (50% to 100% of the sticky scroll)
  const aboutOpacity = useTransform(smoothProgress, [0.4, 0.6, 1], [0, 1, 1]);
  const aboutY = useTransform(smoothProgress, [0.4, 0.6], [100, 0]);

  return (
    <div className="bg-cinematic-navy">
      {/* 1. STICKY HERO SECTION */}
      <div ref={containerRef} className="relative h-[150vh] sm:h-[180vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Cinematic Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 text-[10px] font-mono text-white/20 tracking-widest hidden sm:block">
              ISO 800 | 24FPS | 1/50
            </div>
            <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/20 tracking-widest hidden sm:block">
              REC_ACTIVE // {Math.floor(Date.now() / 1000) % 60}:00
            </div>
            {/* Viewfinder Corners */}
            <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-8 h-8 sm:w-10 sm:h-10 border-t border-l border-white/10" />
            <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-8 h-8 sm:w-10 sm:h-10 border-t border-r border-white/10" />
            <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-8 h-8 sm:w-10 sm:h-10 border-b border-l border-white/10" />
            <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-8 h-8 sm:w-10 sm:h-10 border-b border-r border-white/10" />

            <motion.div
              style={{ rotate: useTransform(smoothProgress, [0, 1], [0, 180]) }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[1px] border-sky-500/5 rounded-full"
            />
          </div>

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 text-center w-full px-6"
          >
            <div className="flex flex-col items-center">
              <motion.h1
                style={{ letterSpacing: nameLetterSpacing }}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-none mb-6 select-none uppercase"
              >
                THIRUVASAGAM
              </motion.h1>

              <div className="flex flex-col items-center gap-4">
                <h2 className="text-sm sm:text-lg md:text-2xl uppercase tracking-[0.3em] font-light text-slate-400">
                  Crafting{" "}
                  <span className="text-sky-500 font-bold">Emotion</span>
                </h2>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-sky-500/50"></span>
                  <span className="text-[10px] font-mono text-sky-400/80 uppercase">
                    Motion Graphic Designer
                  </span>
                  <span className="w-8 h-[1px] bg-sky-500/50"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* 2 & 3. COMBINED ABOUT & EXPERTISE (Normal Scroll) */}
      <div className="relative z-40 bg-cinematic-navy border-t border-slate-900/50">
        <section id="about" className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-xs sm:max-w-sm mx-auto lg:max-w-none"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative">
                  <img
                    src="./assets/photos/thiru.png"
                    alt="Thiruvasagam"
                    className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 border-[15px] border-slate-950/20 pointer-events-none" />
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-sky-500" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-sky-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-sky-500 mb-6">
                    <span className="w-8 h-[1px] bg-current" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">
                      THE_CREATIVE_PROCESS
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 leading-tight">
                    Visual storyteller with a cinematic edge.
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-lg leading-relaxed font-light">
                    Hi, I’m{" "}
                    <span className="text-white font-bold">Thiruvasagam</span> —
                    a Professional Video Editor currently shaping narratives at{" "}
                    <span className="text-sky-400">Srinivasa Academy</span>. I
                    don't just edit videos; I craft energy that captures the
                    heart.
                  </p>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {[
                    {
                      id: "01",
                      title: "Dynamic 3D Editing",
                      desc: "Combining storytelling with spatial 3D elements.",
                    },
                    {
                      id: "02",
                      title: "Emotional Impact",
                      desc: "Crafting energy and rhythm in every single frame.",
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/50 group"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 flex-shrink-0 font-mono text-[10px] font-bold">
                        {item.id}
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase text-xs sm:text-sm mb-1">
                          {item.title}
                        </h4>
                        <p className="text-slate-400 text-[10px] sm:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-white font-semibold italic text-lg sm:text-xl border-l-4 border-sky-500 pl-4 sm:pl-6 py-2">
                  "I craft emotion, energy, and impact in every frame."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <Brands />

        <section className="py-24 px-6 bg-slate-950/20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase mb-4">
                Expertise Area
              </h2>
              <p className="text-slate-500 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                Specialized production workflows
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {SPECIALIZATIONS.map((spec, i) => {
                const IconComponent = (LucideIcons as any)[spec.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{
                      y: -5,
                      backgroundColor: "rgba(56, 189, 248, 0.05)",
                    }}
                    className="p-8 md:p-10 bg-slate-900/40 border border-slate-800 rounded-[2rem] flex gap-6 md:gap-8 items-start transition-all relative overflow-hidden group"
                  >
                    <div className="p-5 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                      {IconComponent && <IconComponent size={28} />}
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                        {spec.title}
                      </h4>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                        {spec.description}
                      </p>
                    </div>
                    <div className="absolute top-4 right-6 text-[8px] font-mono text-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                      SEQ_00{i + 1}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>{" "}
    </div>
  );
};
