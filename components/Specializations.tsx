
import React from 'react';
import { motion } from 'framer-motion';
import { SPECIALIZATIONS } from '../constants';
import * as LucideIcons from 'lucide-react';

export const Specializations: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-16 text-center tracking-tighter">Expertise Area</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {SPECIALIZATIONS.map((spec, index) => {
            const IconComponent = (LucideIcons as any)[spec.icon];
            
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col md:flex-row gap-6 p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:bg-slate-800/80 transition-all duration-500 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {IconComponent && <IconComponent className="w-8 h-8" />}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{spec.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {spec.description}
                  </p>
                </div>
                
                {/* Decorative Frame Overlay */}
                <div className="absolute top-4 right-4 text-[8px] font-mono text-slate-700 select-none group-hover:text-slate-500 transition-colors">
                  MODE: 4K_RAW // 60FPS
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
