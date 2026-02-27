import React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import { useImage } from "../../hooks/useImage";

interface SoftwareItem {
  name: string;
  icon: string;
  level: string;
}

const SoftwareCard: React.FC<{ tool: SoftwareItem; index: number }> = ({ tool, index }) => {
  const { src: iconSrc } = useImage(tool.icon);
  const level = parseInt(tool.level) || 0;

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

      <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest text-center">
        {tool.name}
      </h3>

      <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute inset-0 bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        />
      </div>
      <div className="mt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span>EFFICIENCY</span>
        <span>{level}%</span>
      </div>

      {/* editor UI corner focus marks */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10 group-hover:border-sky-500 transition-colors" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/10 group-hover:border-sky-500 transition-colors" />
    </motion.div>
  );
};

export const Software: React.FC = () => {
  const { content, loading } = useSiteContent();

  // Build software list from content
  const softwareItems: SoftwareItem[] = [];
  if (content?.software) {
    const items = content.software;
    const indices = new Set<number>();
    items.forEach((item: any) => {
      const match = item.key.match(/^sw_(\d+)_/);
      if (match) indices.add(parseInt(match[1]));
    });
    Array.from(indices).sort((a, b) => a - b).forEach(idx => {
      const getName = items.find((i: any) => i.key === `sw_${idx}_name`);
      const getLevel = items.find((i: any) => i.key === `sw_${idx}_level`);
      if (getName) {
        softwareItems.push({
          name: getName.value,
          icon: `/assets/photos/software/${getName.value.toLowerCase().replace(/\s+/g, '')}.png`,
          level: getLevel?.value || '0',
        });
      }
    });
  }

  // Get image paths from the DB (content_type = 'image' excluded from RPC, so use known paths)
  // We need the image paths. Let's fetch them separately.
  // Actually, since software icons are at known paths, we construct them from the name.
  // But let's also query for them from the DB for correct paths.

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
          {softwareItems.map((tool, index) => (
            <SoftwareCard key={tool.name} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
