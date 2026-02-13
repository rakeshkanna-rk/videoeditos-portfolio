import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants";
import { Clock, Briefcase } from "lucide-react";

export const Experience: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Decorative funky floating element */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 -right-20 w-64 h-64 border border-sky-500/5 rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 glitch-text"
            data-text="THE TIMELINE"
          >
            The Timeline
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Playhead (The Line) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 md:-translate-x-1/2">
            <motion.div
              style={{ originY: 0 }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full bg-gradient-to-b from-sky-500 via-sky-400 to-transparent"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: index % 2 === 0 ? -30 : 30,
                }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: index * 0.1,
                }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Mobile: align text left. Desktop: alternate alignment */}
                <div
                  className={`flex-1 w-full pl-16 md:pl-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <motion.div
                    whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 bg-slate-900/50 border border-slate-800 rounded-2xl md:rounded-3xl hover:border-sky-500/30 transition-all cursor-default"
                  >
                    <div className="inline-flex items-center gap-2 mb-4 text-sky-400 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-sky-500/5 px-3 py-1 rounded-full border border-sky-500/10">
                      <Clock className="w-3 h-3" />
                      {exp.period}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-base md:text-lg text-sky-500/80 font-mono mb-4">
                      {exp.company}
                    </div>
                    <p className="text-slate-400 text-sm md:text-lg leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>

                {/* The Timeline Node */}
                <div className="absolute left-0 md:relative md:left-0 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-sky-500 flex items-center justify-center text-slate-950"
                  >
                    <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full border border-sky-500 animate-ping opacity-20"></div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
