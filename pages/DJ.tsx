import React from "react";
import { DJHero } from "../components/dj/DJHero";
import { DJAbout } from "../components/dj/DJAbout";
import { DJGigs } from "../components/dj/DJGigs";
import { DJBooking } from "../components/dj/DJBooking";
import { Footer } from "../components/Footer";

export const DJ: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white">
      <DJHero />
      <DJAbout />
      <DJGigs />
      <DJBooking />
      <Footer />
    </div>
  );
};
