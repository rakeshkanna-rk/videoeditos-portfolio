import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Phone, Mail, Instagram } from "lucide-react";
import { DJ_INFO, DJ_AVAILABLE_FOR } from "../../constants";

export const DJBooking: React.FC = () => {
  return (
    <section className="py-24 bg-linear-to-t from-purple-900/20 to-transparent">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-slate-900/80 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mx-auto mb-8"
            >
              <Calendar size={32} />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black italic mb-6">
              Booking & Contact
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Available for worldwide bookings and special performances.
            </p>

            <div className="grid md:grid-cols-2 gap-12 text-left mb-16">
              <div className="space-y-6">
                <h4 className="text-xs font-mono tracking-[0.4em] text-purple-500 uppercase">
                  Available For
                </h4>
                {DJ_AVAILABLE_FOR.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="text-green-500" size={20} />
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <h4 className="text-xs font-mono tracking-[0.4em] text-blue-500 uppercase">
                  Direct Connect
                </h4>
                <div className="space-y-4">
                  <a
                    href={`tel:${DJ_INFO.phone}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 transition-all group"
                  >
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                      <Phone size={20} />
                    </div>
                    <span className="font-bold text-white group-hover:text-purple-400 transition-colors">
                      {DJ_INFO.phone}
                    </span>
                  </a>
                  <a
                    href={`mailto:${DJ_INFO.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {DJ_INFO.email}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <motion.a
              href={DJ_INFO.instagram}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-purple-600 to-blue-600 rounded-full font-bold text-white shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] transition-all"
            >
              <Instagram size={20} />
              FOLLOW ON INSTAGRAM
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};
