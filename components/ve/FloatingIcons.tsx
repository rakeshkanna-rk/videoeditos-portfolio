import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Scissors,
  Film,
  Clapperboard,
  Play,
  Monitor,
  Layers,
  Volume2,
  Settings,
  MousePointer2,
} from "lucide-react";

const editorIcons = [
  { Icon: Video, size: 28, top: "10%", left: "5%", delay: 0 },
  { Icon: Scissors, size: 24, top: "25%", left: "85%", delay: 2 },
  { Icon: Film, size: 32, top: "45%", left: "10%", delay: 1 },
  { Icon: Clapperboard, size: 26, top: "65%", left: "90%", delay: 3 },
  { Icon: Play, size: 20, top: "80%", left: "12%", delay: 0.5 },
  { Icon: Monitor, size: 30, top: "15%", left: "75%", delay: 2.5 },
  { Icon: Layers, size: 24, top: "35%", left: "92%", delay: 1.5 },
  { Icon: Volume2, size: 28, top: "55%", left: "6%", delay: 4 },
  { Icon: Settings, size: 20, top: "72%", left: "82%", delay: 2 },
  { Icon: MousePointer2, size: 24, top: "88%", left: "68%", delay: 1 },
  { Icon: Video, size: 22, top: "40%", left: "80%", delay: 5 },
  { Icon: Scissors, size: 20, top: "60%", left: "20%", delay: 0.2 },
];

export const FloatingIcons: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {editorIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-white/30"
          style={{
            top: item.top,
            left: item.left,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0.15],
            scale: [0.8, 1.3, 0.9],
            y: [0, -60, 0],
            x: [0, 30, 0],
            rotate: [0, 25, -25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <item.Icon size={item.size} strokeWidth={1.2} />
        </motion.div>
      ))}

      {/* Additional UI elements like timeline numbers or codes */}
      <div className="absolute top-[15%] right-[12%] text-[10px] font-mono text-sky-500/20 tracking-[0.5em] hidden md:block">
        REC ● 00:42:15:08
      </div>
      <div className="absolute bottom-[20%] left-[10%] text-[10px] font-mono text-sky-500/20 tracking-[0.5em] hidden md:block">
        PRO_RES_422_HQ
      </div>
    </div>
  );
};
