import React from "react";
import { motion } from "framer-motion";
import { BRANDS } from "../../constants";

export const Brands: React.FC = () => {
  // Duplicate brands to ensure seamless loop
  const brandsList = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-[10px] text-slate-600 uppercase tracking-[0.5em] font-mono"
        >
          Trusted by Top Brands
        </motion.p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center py-4"
        >
          {brandsList.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-6 cursor-default group shrink-0"
            >
              {brand.logo.includes("/") ||
              brand.logo.includes(".") ||
              brand.logo.length > 4 ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 md:h-20 w-auto object-contain grayscale-0 md:grayscale-75 opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <span className="text-2xl md:text-5xl grayscale-0 md:grayscale-75 opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                  {brand.logo}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade Masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
