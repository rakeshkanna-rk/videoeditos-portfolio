
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Linkedin, Twitter, Mail, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-tight tracking-tighter">
                Let's Create Something <span className="text-sky-500">Cinematic</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">
                Ready to take your content to the next level? I'm always open to new projects, 
                collaborations, and creative challenges. Drop a message or reach out on socials.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:thiruvasagam@example.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/50 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Email Address</div>
                    <div className="text-white font-bold group-hover:text-sky-400 transition-colors">hello@thiru.studio</div>
                  </div>
                </a>
                <a href="mailto:thiruvasagam@example.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/50 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Phone Number</div>
                    <div className="text-white font-bold group-hover:text-sky-400 transition-colors">+91 9876543210</div>
                  </div>
                </a>                
                <div className="flex gap-4 pt-4">
                  {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl relative"
            >
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell me about your project..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-sky-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  SEND MESSAGE
                </motion.button>
              </form>
              
              {/* Corner decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sky-500/10 blur-[40px] rounded-full pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
