import React from "react";
import { motion } from "framer-motion";
import { Music, Disc, Radio, Headphones, Mic2, Star } from "lucide-react";
import { DJ_INFO } from "../../constants";

export const DJHero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Neon Circles Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex justify-center gap-4"
        >
          <Headphones className="text-purple-500" size={32} />
          <Disc className="text-blue-500 animate-spin-slow" size={32} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-9xl font-black italic tracking-tighter mb-4"
        >
          DJ{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500 uppercase">
            {DJ_INFO.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 font-medium tracking-widest uppercase"
        >
          {DJ_INFO.tagline}
        </motion.p>
      </div>

      {/* Floating Icons for DJ */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[Music, Disc, Radio, Headphones, Mic2, Star].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -40, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + ((i * 17) % 80)}%`,
            }}
          >
            <Icon size={24 + (i % 3) * 8} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
