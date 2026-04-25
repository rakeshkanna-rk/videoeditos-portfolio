import React from "react";
import { Send, Instagram, Linkedin, Twitter, Mail, Phone, CheckCircle, RefreshCw, Globe } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";

export const Contact: React.FC = () => {
  const { getVal, getList } = useSiteContent();

  const heading = getVal('contact', 'heading') || "Let's Create Something Cinematic";
  const description = getVal('contact', 'description') || "Ready to take your content to the next level?";
  const email = getVal('contact', 'email') || 'hello@thiru.studio';
  const phone = getVal('contact', 'phone') || '+91 9876543210';

  const formUrl = getVal('contact', 'contact_form_url') || 'https://docs.google.com/forms/d/e/1FAIpQLSeAdnOjiQkgQdds4TjdSgdAzWsOySlCF4r5ul16MTqGEyilXg/formResponse';
  const nameField = getVal('contact', 'contact_name_field') || 'entry.1347914730';
  const emailField = getVal('contact', 'contact_email_field') || 'entry.1645104450';
  const messageField = getVal('contact', 'contact_message_field') || 'entry.1582415800';

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData();
    formData.append(nameField, form.name);
    formData.append(emailField, form.email);
    formData.append(messageField, form.message);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      setIsSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Transmission error:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Fetch dynamic social links
  const socialLinks = getList('social_links', 'social_', ['name', 'url', 'icon']);

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Success Popup */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-50 bg-sky-500 text-slate-950 px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <CheckCircle className="w-5 h-5" />
            MESSAGE SENT SUCCESSFULLY!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-tight tracking-tighter">
                {heading.includes('Cinematic') ? (
                  <>
                    {heading.split('Cinematic')[0]}
                    <span className="text-sky-500">Cinematic</span>
                    {heading.split('Cinematic')[1]}
                  </>
                ) : heading}
              </h2>
              <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">
                {description}
              </p>

              <div className="space-y-6">
                <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/50 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Email Address</div>
                    <div className="text-white font-bold group-hover:text-sky-400 transition-colors">{email}</div>
                  </div>
                </a>
                <a href={`tel:${phone}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/50 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Phone Number</div>
                    <div className="text-white font-bold group-hover:text-sky-400 transition-colors">{phone}</div>
                  </div>
                </a>
                <div className="flex gap-4 pt-4">
                  {socialLinks.map((social, i) => {
                    const Icon = (LucideIcons as any)[social.icon] || Globe;
                    return (
                      <motion.a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                        title={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl relative"
            >
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSending}
                  type="submit"
                  className="w-full bg-white text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-sky-50 transition-colors disabled:opacity-50"
                >
                  {isSending ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSending ? "SENDING..." : "SEND MESSAGE"}
                </motion.button>
              </form>

              {/* Corner decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sky-500/10 blur-2xl rounded-full pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
