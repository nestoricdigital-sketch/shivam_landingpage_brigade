import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroImg from '../assets/hero.jpg';
import ContactForm from '../components/ContactForm';

/* ── Framer-motion variants ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

/* ── Stats ───────────────────────────────────────────────── */
const STATS = [
  { value: '14',   unit: 'Acres',  label: 'Low-Density Spread' },
  { value: '80%',  unit: 'Open',   label: 'Green Spaces' },
  { value: '12',   unit: 'Towers', label: 'Elegant Towers' },
  { value: '1124', unit: 'Homes',  label: 'Premium Residences' },
];

export default function Hero() {
  return (
    /*
     * STRUCTURE (root fix)
     * ─────────────────────────────────────────────────────────────
     * <section>   min-h-screen + flex-col  ← owns the full viewport
     *   <bg>      absolute inset-0          ← pure visual layer
     *   <wrapper> flex-1 flex-col           ← fills remaining height
     *     pt-24   clears the sticky navbar (nav is ~80-88px tall)
     *     pb-10   breathing room at bottom
     *     justify-center  content vertically centred in the space
     *     <container>
     *       <grid>  1 col mobile | 2 cols laptop (items-center)
     * ─────────────────────────────────────────────────────────────
     */
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
    >
      {/* ── Background ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Brigade Eternia luxury residential community — aerial view"
          loading="eager"
          className="w-full h-full object-cover"
        />
        {/* Multi-stop dark gradient — kept as style (Tailwind can't do this) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,26,18,0.50) 0%, rgba(13,26,18,0.38) 30%, rgba(13,26,18,0.80) 68%, rgba(13,26,18,0.97) 100%)',
          }}
        />
        {/* Radial vignette — Tailwind has no arbitrary radial equivalent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.26) 100%)',
          }}
        />
      </div>

      {/* ── Content wrapper ──────────────────────────────────────
           flex-1      → takes all remaining height inside the flex-col section
           flex flex-col justify-center → vertically centres the grid content
           pt-24       → clears sticky navbar (~80–88px high with my-6 + py-4)
           pb-10       → breathing room at the bottom
      ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-16 md:pb-24">

        {/* Max-width container */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]">

          {/*
           * Grid layout
           *   Mobile (<lg) → 1 column, gap-8 between copy and form
           *   Laptop (≥lg) → 2 columns: 55% copy / 45% form, centred vertically
           *   items-center → both cols aligned to their shared vertical midpoint
           */}
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-10 items-center">

            {/* ════ LEFT — Hero copy + stats ════ */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <div className="w-10 h-px bg-[#C8A96A] shrink-0" />
                <span className="text-[#C8A96A] text-[0.72rem] font-['Inter',sans-serif] font-semibold tracking-[0.18em] uppercase">
                  Yelahanka · North Bengaluru
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-['Playfair_Display',serif] text-white font-semibold
                           leading-[1.08] tracking-tight mb-4
                           text-[clamp(1.9rem,4vw,3.6rem)]"
              >
                80% Open Green Spaces.
                <br />
                <span className="text-[#C8A96A]">14 Acre</span> Low&nbsp;Density
                <br />
                Community.
              </motion.h1>

              {/* Sub-heading */}
              <motion.p
                variants={fadeUp}
                className="font-['Inter',sans-serif] text-white/75 font-light
                           leading-relaxed mb-8 max-w-lg
                           text-[clamp(0.88rem,1.4vw,1.05rem)]"
              >
                Luxury 2, 3 &amp; 4 BHK Residences in Yelahanka,
                <br className="hidden sm:block" />
                {' '}North Bengaluru — RERA Approved
              </motion.p>

              {/* Stats — always 2 × 2 */}
              <motion.div variants={stagger} className="grid grid-cols-2 gap-3 max-w-sm lg:max-w-none">
                {STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white/[0.08] border border-white/[0.14]
                               backdrop-blur-xl rounded-2xl px-4 py-3"
                  >
                    <div className="font-['Playfair_Display',serif] text-white font-bold leading-none text-[clamp(1.25rem,2vw,1.7rem)]">
                      {s.value}
                      <span className="text-[#C8A96A] text-[0.6em] ml-1">{s.unit}</span>
                    </div>
                    <div className="font-['Inter',sans-serif] text-white/55 text-[0.68rem] tracking-wide mt-1">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ════ RIGHT — Contact form card ════
                 self-stretch removed → card only as tall as its content
                 max-w-md on mobile so it doesn't stretch edge-to-edge on tablets
            */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md lg:max-w-none mx-auto lg:mx-0
                         rounded-3xl p-5 md:p-6
                         bg-[rgba(13,26,18,0.78)]
                         border border-[rgba(200,169,106,0.22)]
                         backdrop-blur-2xl"
            >
              {/* Gold accent bar */}
              <div
                className="w-10 h-[3px] rounded-full mb-4"
                style={{ background: 'linear-gradient(90deg, #C8A96A, transparent)' }}
              />

              <ContactForm
                formId="hero-contact-form"
                title="Book a Site Visit"
                subtitle="Our consultant will call you within 30 minutes."
                submitLabel="Request a Callback"
                tableName="enquiries"
                extraData={{ form_location: 'hero' }}
              />
            </motion.div>

          </div>
        </div>

        {/* ── Scroll indicator — desktop only ──────────────── */}
        <motion.div
          className="absolute bottom-6 right-6 md:right-10 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span
            className="font-['Inter',sans-serif] text-white/40 tracking-[0.18em] uppercase text-[0.6rem]"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={14} color="rgba(200,169,106,0.7)" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
