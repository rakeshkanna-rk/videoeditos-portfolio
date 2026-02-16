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
import bellavita from "./public/assets/photos/brands/bellavita.png";
import sathya from "./public/assets/photos/brands/sathya.png";
import vasanthnco from "./public/assets/photos/brands/vasanthnco.png";
import srinivasa from "./public/assets/photos/brands/srinivasa.png";

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
    icon: "/assets/photos/software/premierepro.png",
    level: 95,
  },
  {
    name: "After Effects",
    icon: "/assets/photos/software/aftereffects.png",
    level: 90,
  },
  {
    name: "Photoshop",
    icon: "/assets/photos/software/photoshop.png",
    level: 85,
  },
  {
    name: "CapCut",
    icon: "/assets/photos/software/capcut.png",
    level: 90,
  },
  { name: "Canva", icon: "/assets/photos/software/canva.png", level: 90 },
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
    videoUrl: "/assets/videos/placeholdervideo.mp4", // Standard test video
  },
  {
    id: 2,
    title: "Tech Brand Commercial",
    category: "Commercial",
    thumbnail: "https://picsum.photos/id/20/800/450",
    videoUrl: "/assets/videos/placeholdervideo.mp4",
  },
  {
    id: 3,
    title: "Dynamic Sports Reel",
    category: "Motion Graphics",
    thumbnail: "https://picsum.photos/id/30/800/450",
    videoUrl: "/assets/videos/placeholdervideo.mp4",
  },
  {
    id: 4,
    title: "Product Launch Teaser",
    category: "Commercial",
    thumbnail: "https://picsum.photos/id/40/800/450",
    videoUrl: "/assets/videos/placeholdervideo.mp4",
  },
  {
    id: 5,
    title: "Lifestyle Vlog Edit",
    category: "Social Media",
    thumbnail: "https://picsum.photos/id/50/800/450",
    videoUrl: "/assets/videos/placeholdervideo.mp4",
  },
  {
    id: 6,
    title: "Music Video FX",
    category: "Motion Graphics",
    thumbnail: "https://picsum.photos/id/60/800/450",
    videoUrl: "/assets/videos/placeholdervideo.mp4",
  },
];

export const BRANDS = [
  { name: "Bella Vita", logo: bellavita },
  { name: "Sathya", logo: sathya },
  { name: "Vasanth & Co", logo: vasanthnco },
  { name: "Srinivasa", logo: srinivasa }, // One fallback or found another? Let's use what we have.
];
