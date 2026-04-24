import React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import { useImage } from "../../hooks/useImage";

interface SoftwareItem {
  name: string;
  icon: string;
}

const SoftwareCard: React.FC<{ tool: SoftwareItem; index: number }> = ({ tool, index }) => {
  const { src: iconSrc } = useImage(tool.icon);

  return (
    <motion.div
      key={tool.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-slate-900/30 border border-slate-800/50 p-10 rounded-3xl overflow-hidden hover:border-sky-500/50 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <motion.div
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        className="mb-8 flex justify-center h-16"
      >
        {iconSrc && (
          <img
            src={iconSrc}
            alt={tool.name}
            className="h-full w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
            loading="lazy"
          />
        )}
      </motion.div>

      <h3 className="text-xl font-bold text-white uppercase tracking-widest text-center">
        {tool.name}
      </h3>

      {/* editor UI corner focus marks */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10 group-hover:border-sky-500 transition-colors" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/10 group-hover:border-sky-500 transition-colors" />
    </motion.div>
  );
};

export const Software: React.FC = () => {
  const { getList, loading } = useSiteContent();

  const softwareItems = getList('software', 'soft_', ['name', 'icon']);

  return (
    <section className="py-24 bg-cinematic-navy relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4 tracking-tighter">
              The Toolkit
            </h2>
            <p className="text-slate-400 max-w-md font-light">
              Industry-standard tools mastered for high-end production.
            </p>
          </div>
          <div className="text-slate-700 text-[10px] font-mono tracking-widest hidden md:block uppercase">
            HARDWARE_ACCELERATION: ON
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softwareItems.map((tool: any, index) => (
            <SoftwareCard key={tool.name || index} tool={{
                ...tool,
                icon: tool.icon || `/assets/photos/software/${tool.name?.toLowerCase().replace(/\s+/g, '')}.png`
            }} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
