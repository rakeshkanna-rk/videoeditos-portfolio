import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";



export const ExpertAreas: React.FC = () => {

  const { getList } = useSiteContent();

  // Get specializations using the consistent plural key
  const specializations = getList('specializations', 'spec_', ['title', 'desc', 'icon']);
  return (
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
          {specializations.map((spec, i) => {
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
                className="p-8 md:p-10 bg-slate-900/40 border border-slate-800 rounded-4xl flex gap-6 md:gap-8 items-start transition-all relative overflow-hidden group"
              >
                <div className="p-5 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-110 transition-transform duration-500 shrink-0">
                  {spec.icon &&
                  (spec.icon.startsWith("http") ||
                    spec.icon.startsWith("/")) ? (
                    <img
                      src={spec.icon}
                      alt={spec.title}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    IconComponent && <IconComponent size={28} />
                  )}
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                    {spec.title}
                  </h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                    {spec.desc}
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
  );
};
