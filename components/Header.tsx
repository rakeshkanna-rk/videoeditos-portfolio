
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
        scrolled ? 'py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 shadow-lg' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a 
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold tracking-tighter uppercase"
        >
          THIRU<span className="text-sky-500">.</span>STUDIO
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.1, color: '#38bdf8' }}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 border border-sky-500/50 text-sky-400 text-xs font-bold rounded-lg uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
          >
            Hire Me
          </motion.a>
        </nav>

        {/* Mobile toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 left-0 w-full bg-slate-950 z-90 flex flex-col items-center justify-center gap-8 md:hidden overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-bold uppercase tracking-tighter hover:text-sky-500"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
