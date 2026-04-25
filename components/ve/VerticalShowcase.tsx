import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import { useImage } from "../../hooks/useImage";
import { Play, X, Smartphone } from "lucide-react";

interface ReelData {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

const ReelCard: React.FC<{
  reel: ReelData;
  index: number;
  onClick: () => void;
}> = ({ reel, index, onClick }) => {
  const { src: thumbnailSrc } = useImage(reel.thumbnail);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-slate-900 rounded-4xl overflow-hidden border border-slate-800/50 cursor-pointer aspect-9/16"
      onClick={onClick}
    >
      {thumbnailSrc && (
        <img
          src={thumbnailSrc}
          alt={reel.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-sky-500/90 flex items-center justify-center text-slate-950 shadow-2xl scale-75 group-hover:scale-100 transition-transform">
          <Play size={24} fill="currentColor" className="ml-1" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block mb-2">
          {reel.category}
        </span>
        <h3 className="text-sm md:text-lg font-bold text-white line-clamp-1 group-hover:text-sky-500 transition-colors uppercase tracking-tight">
          {reel.title}
        </h3>
      </div>
    </motion.div>
  );
};

export const VerticalShowcase: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<ReelData | null>(null);
  const [filter, setFilter] = useState("All");
  const { getVal, getList } = useSiteContent();

  const sectionTitle = getVal("reels", "section_title") || "9:16 Showcase";
  const sectionSubtitle =
    getVal("reels", "section_subtitle") ||
    "Optimized for engagement. High-energy edits for Instagram Reels, YouTube Shorts, and TikTok.";

  // Build reels from content
  const reelsData = getList("reels", "reel_", [
    "title",
    "category",
    "thumbnail",
    "video",
  ]);
  const reels: ReelData[] = reelsData.map((r, i) => ({
    id: i + 1,
    title: r.title,
    category: r.category,
    thumbnail: r.thumbnail,
    videoUrl: r.video,
  }));

  const categories = ["All", ...new Set(reels.map((r) => r.category))];
  const filteredReels =
    filter === "All" ? reels : reels.filter((r) => r.category === filter);

  return (
    <section id="reels" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-sky-500 mb-4">
              <Smartphone size={20} />
              <span className="text-xs font-mono tracking-[0.3em] uppercase">
                Short_Form_Content
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold uppercase mb-4 tracking-tighter">
              {sectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-sky-500 italic">
                {sectionTitle.split(" ").slice(-1)[0]}
              </span>
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
                className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                  filter === cat
                    ? "bg-sky-500 text-slate-950 border-sky-500 shadow-[0_10px_30px_rgba(56,189,248,0.3)]"
                    : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredReels.map((reel, i) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={i}
                onClick={() => setSelectedReel(reel)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedReel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-9999 flex items-center justify-center p-4 backdrop-blur-3xl bg-slate-950/95"
              onClick={() => setSelectedReel(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative h-[85vh] aspect-9/16 max-w-[90vw] bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(56,189,248,0.2)] border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors"
                  onClick={() => setSelectedReel(null)}
                >
                  <X size={20} />
                </button>

                {selectedReel.videoUrl.includes('youtube.com') || selectedReel.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedReel.videoUrl.split('v=')[1]?.split('&')[0] || selectedReel.videoUrl.split('/').pop()}?autoplay=1`}
                    title={selectedReel.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={selectedReel.videoUrl}
                    title={selectedReel.title}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    playsInline
                    loop
                  ></video>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
