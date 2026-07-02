import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import wha from '../assets/wApp.webp';

/* ── btn-gold Tailwind string ─────────────────────────────── */
const BTN_GOLD =
  'inline-flex items-center justify-center gap-2 bg-[#C8A96A] text-[#0d1a12] ' +
  "font-['Inter',sans-serif] font-semibold text-[0.9rem] tracking-[0.04em] uppercase " +
  'rounded-full border-2 border-transparent cursor-pointer no-underline ' +
  'transition-all duration-300 hover:bg-[#a8843f] hover:-translate-y-0.5 ' +
  'hover:shadow-[0_12px_32px_rgba(200,169,106,0.4)]';

export default function FloatingCTA() {
  return (
    <>
      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/918618297315?text=Hi%2C%20I'm%20interested%20in%20Brigade%20Eternia.%20Please%20share%20more%20details."
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-float-btn"
        aria-label="Chat on WhatsApp"
        className="fixed z-[9000] rounded-full cursor-pointer
                   shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                   transition-[transform,box-shadow] duration-300
                   hover:scale-[1.08] hover:-translate-y-[3px]
                   hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]
                   flex items-center justify-center
                   w-14 h-14"
        style={{ bottom: '5.5rem', right: '1.25rem' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={wha} alt="wApp-logo" className='h-full w-full  object-contain' />
        {/* <MessageCircle size={26} color="white" fill="white" /> */}
      </motion.a>

      {/* Sticky CTA bar — mobile only */}
      <div
        id="mobile-sticky-cta"
        className="fixed bottom-0 left-0 right-0 z-[8000] md:hidden
                   bg-[#1E5A3A] border-t border-[rgba(200,169,106,0.3)]
                   shadow-[0_-8px_32px_rgba(0,0,0,0.2)]
                   px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <a
            href="tel:+918618297315"
            id="sticky-call-btn"
            className="flex-1 flex items-center justify-center gap-2
                       text-white font-['Inter',sans-serif] font-medium text-[0.85rem]
                       tracking-[0.05em] no-underline
                       bg-white/[0.12] border border-white/20
                       rounded-full py-3 px-4 backdrop-blur-sm
                       transition-colors duration-200 hover:bg-white/20"
          >
            <Phone size={16} />
            Call Now
          </a>
          {/* <a
            href="#enquiry"
            id="sticky-enquiry-btn"
            className={`${BTN_GOLD} flex-1 py-3 px-4 text-[0.85rem]`}
          >
            Book Site Visit
          </a> */}
        </div>
      </div>
    </>
  );
}
