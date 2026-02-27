import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import { useImage } from "../../hooks/useImage";
import { Play, ArrowUpRight, X } from "lucide-react";

interface ProjectData {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

const ProjectCard: React.FC<{ project: ProjectData; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const { src: thumbnailSrc } = useImage(project.thumbnail);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-900 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-16/10 overflow-hidden relative">
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
            loading="lazy"
          />
        )}
        {/* Video Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-20 h-20 rounded-full bg-sky-500/90 backdrop-blur-sm flex items-center justify-center text-slate-950 shadow-2xl"
          >
            <Play size={32} fill="currentColor" className="ml-1" />
          </motion.div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span className="px-4 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-sky-400 uppercase tracking-widest rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-10 flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <div className="flex gap-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            <span>4K // RAW</span>
            <span>•</span>
            <span>2024</span>
          </div>
        </div>
        <motion.div
          whileHover={{ rotate: 45 }}
          className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500 transition-all"
        >
          <ArrowUpRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { getVal, getList } = useSiteContent();

  const sectionTitle = getVal('portfolio', 'section_title') || 'Selected Works';
  const sectionSubtitle = getVal('portfolio', 'section_subtitle') || 'A curated list of projects that define my creative direction and technical execution.';

  // Build projects from content
  const projectsData = getList('portfolio', 'proj_', ['title', 'category', 'thumbnail', 'video']);
  const projects: ProjectData[] = projectsData.map((p, i) => ({
    id: i + 1,
    title: p.title,
    category: p.category,
    thumbnail: p.thumbnail,
    videoUrl: p.video,
  }));

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="portfolio"
      className="py-24 bg-cinematic-navy relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-bold uppercase mb-4 tracking-tighter">
              {sectionTitle.split(' ').slice(0, -1).join(' ')}{" "}
              <span className="text-sky-500 italic">{sectionTitle.split(' ').slice(-1)[0]}</span>
            </h2>
            <p className="text-slate-400 max-w-md font-light">
              {sectionSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${filter === cat
                    ? "bg-sky-500 text-slate-950 border-sky-500 shadow-[0_10px_30px_rgba(56,189,248,0.3)]"
                    : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-500 flex items-center justify-center p-4 md:p-10 backdrop-blur-2xl bg-slate-950/90"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <video
                src={selectedProject.videoUrl}
                title={selectedProject.title}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                loop
              ></video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
