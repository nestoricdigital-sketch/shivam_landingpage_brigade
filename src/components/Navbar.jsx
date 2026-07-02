import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Menu } from 'lucide-react';
import logo from '../assets/shivam_logo.webp';

/* ── Shared Tailwind class strings ───────────────────────── */
const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 bg-[#1E5A3A] text-white ' +
  "font-['Inter',sans-serif] font-medium text-[0.9rem] tracking-[0.04em] uppercase " +
  'py-[0.875rem] px-8 rounded-full border-2 border-transparent cursor-pointer ' +
  'no-underline transition-all duration-300 ' +
  'hover:bg-transparent hover:border-[#C8A96A] hover:text-[#C8A96A] hover:-translate-y-0.5';

const BTN_OUTLINE =
  'inline-flex items-center justify-center gap-2 bg-transparent text-white ' +
  "font-['Inter',sans-serif] font-medium text-[0.9rem] tracking-[0.04em] uppercase " +
  'py-[0.875rem] px-8 rounded-full border-[1.5px] border-white/60 cursor-pointer ' +
  'no-underline transition-all duration-300 backdrop-blur-sm ' +
  'hover:bg-white/15 hover:border-[#C8A96A] hover:text-[#C8A96A] hover:-translate-y-0.5';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Floor Plans', href: '#floor-plans' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className=" fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 py-2 md:py-4 mt-0 "
        style={{
          background: scrolled ? 'rgba(13,26,18,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,169,106,0.15)' : 'none',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.2)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Container */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw] flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={() => handleNavClick('#hero')}
            className="flex flex-col leading-none cursor-pointer"
          >
            <img src={logo} className="h-16 w-16 object-contain scale-150 md:scale-200" alt="shivam-logo" />
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/80 hover:text-[#C8A96A] transition-colors duration-300
                             text-sm font-normal tracking-wide bg-transparent border-0 cursor-pointer
                             font-['Inter',sans-serif]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918618297315"
              className={BTN_PRIMARY}
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden text-white p-2 bg-transparent border-0 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[4900]"
            style={{ background: 'rgba(13,26,18,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="flex flex-col leading-none text-center mb-4">
                <span className="font-['Playfair_Display',serif] text-white text-3xl font-semibold">Brigade</span>
                <span className="font-['Inter',sans-serif] text-[0.7rem] font-medium tracking-[0.22em] uppercase text-[#C8A96A]">
                  Eternia
                </span>
              </div>

              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/80 hover:text-[#C8A96A] text-2xl font-['Playfair_Display',serif]
                             transition-colors duration-300 bg-transparent border-0 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.div
                className="flex flex-col gap-3 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a href="tel:+919876543210" className={BTN_PRIMARY}>
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20Brigade%20Eternia.%20Please%20share%20more%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={BTN_OUTLINE}
                >
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
