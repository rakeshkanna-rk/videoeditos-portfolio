import React from "react";
import {
  Play,
  Film,
  Layers,
  Tv,
  Scissors,
  Zap,
  Smartphone,
  Box,
  Palette,
  Star,
  Camera,
} from "lucide-react";
import { Experience, Software, Project, Specialization } from "./types";
import bellavita from "./assets/photos/bellavita.png";
import sathya from "./assets/photos/sathya.png";
import vasanthnco from "./assets/photos/vasanthnco.png";

export const EXPERIENCES: Experience[] = [
  {
    role: "Part-Time Video Editor",
    company: "Srinivasa Academy",
    period: "Present",
    description:
      "Creating engaging and professional educational video content, focusing on clarity and audience retention.",
  },
  {
    role: "Video Editing Intern",
    company: "MillennialLabs",
    period: "Previous",
    description:
      "Gained hands-on experience in creative editing production workflows and high-paced delivery.",
  },
];

export const SOFTWARE: Software[] = [
  {
    name: "Premiere Pro",
    icon: "https://cdn.simpleicons.org/adobepremierepro",
    level: 95,
  },
  {
    name: "After Effects",
    icon: "https://cdn.simpleicons.org/adobeaftereffects",
    level: 90,
  },
  {
    name: "Photoshop",
    icon: "https://cdn.simpleicons.org/adobephotoshop",
    level: 85,
  },
  { name: "Canva", icon: "https://cdn.simpleicons.org/canva", level: 90 },
];

export const SPECIALIZATIONS: Specialization[] = [
  {
    title: "Instagram Reels & Short-form",
    description:
      "Crafting viral, scroll-stopping content designed for high engagement and retention.",
    icon: "Smartphone",
  },
  {
    title: "Motion Graphics & 3D Editing",
    description:
      "Combining dynamic 2D/3D elements to add depth and professional flair to every frame.",
    icon: "Box",
  },
  {
    title: "Cinematic Color Grading",
    description:
      "Manipulating color and light to evoke specific emotions and create high-end visual appeal.",
    icon: "Palette",
  },
  {
    title: "High-impact Storytelling",
    description:
      "Structuring narratives that resonate deeply with the audience through perfect pacing.",
    icon: "Film",
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Cinematic Travel Narrative",
    category: "Short Film",
    thumbnail: "https://picsum.photos/id/10/800/450",
    videoUrl: "./assets/videos/video1.mp4", // Standard test video
  },
  {
    id: 2,
    title: "Tech Brand Commercial",
    category: "Commercial",
    thumbnail: "https://picsum.photos/id/20/800/450",
    videoUrl: "./assets/videos/video2.mp4",
  },
  {
    id: 3,
    title: "Dynamic Sports Reel",
    category: "Motion Graphics",
    thumbnail: "https://picsum.photos/id/30/800/450",
    videoUrl: "./assets/videos/video3.mp4",
  },
  {
    id: 4,
    title: "Product Launch Teaser",
    category: "Commercial",
    thumbnail: "https://picsum.photos/id/40/800/450",
    videoUrl: "./assets/videos/video4.mp4",
  },
  {
    id: 5,
    title: "Lifestyle Vlog Edit",
    category: "Social Media",
    thumbnail: "https://picsum.photos/id/50/800/450",
    videoUrl: "./assets/videos/video5.mp4",
  },
  {
    id: 6,
    title: "Music Video FX",
    category: "Motion Graphics",
    thumbnail: "https://picsum.photos/id/60/800/450",
    videoUrl: "./assets/videos/video6.mp4",
  },
];

export const BRANDS = [
  { name: "Bella Vita", logo: bellavita },
  { name: "Sathya", logo: sathya },
  { name: "Vasanth & Co", logo: vasanthnco },
  { name: "Srinivasa", logo: "🏛️" }, // One fallback or found another? Let's use what we have.
];
