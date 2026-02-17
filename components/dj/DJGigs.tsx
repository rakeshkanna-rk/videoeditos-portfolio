import React from "react";
import { motion } from "framer-motion";
import { DJ_GIGS, DJ_INFO } from "../../constants";

export const DJGigs: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold flex items-center gap-4">
            <div className="h-1 w-12 bg-purple-500"></div>
            LIVE PERFORMANCE
          </h2>
          <p className="text-slate-500 mt-2 uppercase tracking-widest text-xs font-mono">
            Successfully Performed in {DJ_INFO.experience_count}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {DJ_GIGS.map((gig, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 10 }}
            className="p-8 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all"
          >
            <span className="text-purple-500 font-mono text-sm mb-2 block">
              {gig.type}
            </span>
            <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
              {gig.title}
            </h3>
            <p className="text-slate-500 uppercase tracking-widest text-xs mt-2">
              {gig.location}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
