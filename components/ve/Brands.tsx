import React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import { useImage } from "../../hooks/useImage";

interface BrandData {
  name: string;
  logo: string;
}

const BrandLogo: React.FC<{ brand: BrandData }> = ({ brand }) => {
  const { src: logoSrc } = useImage(brand.logo);

  if (!logoSrc) return null;

  return (
    <div className="flex items-center gap-6 cursor-default group shrink-0">
      <img
        src={logoSrc}
        alt={brand.name}
        className="h-8 md:h-20 w-auto object-contain grayscale-0 md:grayscale-75 opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
        loading="lazy"
      />
    </div>
  );
};

export const Brands: React.FC = () => {
  const { content } = useSiteContent();

  // Build brands list from content
  const brands: BrandData[] = [];
  if (content?.brands) {
    const items = content.brands;
    const indices = new Set<number>();
    items.forEach((item: any) => {
      const match = item.key.match(/^brand_(\d+)_/);
      if (match) indices.add(parseInt(match[1]));
    });
    Array.from(indices).sort((a, b) => a - b).forEach(idx => {
      const name = items.find((i: any) => i.key === `brand_${idx}_name`);
      if (name) {
        brands.push({
          name: name.value,
          logo: `/assets/photos/brands/${name.value.toLowerCase().replace(/\s+/g, '').replace(/&/g, '')}.png`,
        });
      }
    });
  }

  // Duplicate brands for seamless scroll loop
  const brandsList = [...brands, ...brands, ...brands, ...brands];

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
            <BrandLogo key={i} brand={brand} />
          ))}
        </motion.div>
      </div>

      {/* Fade Masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
