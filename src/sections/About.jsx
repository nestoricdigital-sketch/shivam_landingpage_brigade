import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, MapPin, Award, Home, Layers } from 'lucide-react';
import aboutImg from '../assets/about.jpg';

const FEATURES = [
  { icon: Leaf, label: '80% Open Green Spaces' },
  { icon: MapPin, label: '14 Acre Gated Community' },
  { icon: Award, label: 'Premium Brigade Quality' },
  { icon: Home, label: 'Luxury Lifestyle' },
  { icon: Layers, label: 'Low Density Living' },
];

/* ── Shared Tailwind strings ─────────────────────────────── */
const CONTAINER = 'w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]';

const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 bg-[#1E5A3A] text-white ' +
  "font-['Inter',sans-serif] font-medium text-[0.9rem] tracking-[0.04em] uppercase " +
  'py-[0.875rem] px-8 rounded-full border-2 border-transparent cursor-pointer ' +
  'no-underline transition-all duration-300 w-full sm:w-auto ' +
  'hover:bg-transparent hover:border-[#C8A96A] hover:text-[#C8A96A] hover:-translate-y-0.5 ' +
  'hover:shadow-[0_12px_32px_rgba(200,169,106,0.25)]';

const BTN_OUTLINE =
  'inline-flex items-center justify-center gap-2 bg-transparent ' +
  "font-['Inter',sans-serif] font-medium text-[0.9rem] tracking-[0.04em] uppercase " +
  'py-[0.875rem] px-8 rounded-full border-[1.5px] cursor-pointer ' +
  'no-underline transition-all duration-300 backdrop-blur-sm w-full sm:w-auto ' +
  'hover:bg-white/15 hover:-translate-y-0.5';

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      className="py-16 md:py-24 lg:py-28 bg-white"
    >
      <div className={CONTAINER}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Image */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, scale: 0.94, x: -30 }}
            animate={imgInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(30,90,58,0.18)]"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={aboutImg}
                alt="Brigade Eternia lush green community gardens"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 bg-[#1E5A3A] rounded-[20px] px-6 py-5
                            shadow-[0_12px_40px_rgba(30,90,58,0.35)]">
              <div className="font-['Playfair_Display',serif] text-white text-[2.2rem] font-bold leading-none">14</div>
              <div className="font-['Inter',sans-serif] text-[0.7rem] tracking-[0.14em] uppercase text-[#C8A96A] mt-1">
                Acre Community
              </div>
            </div>

            {/* Gold accent border */}
            <div
              className="absolute -top-3 -left-3 w-[60%] h-[60%] border-2 border-[#C8A96A]/30
                         rounded-[28px] -z-[1]"
            />
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-2">
                {/* Gold divider */}
                <div className="w-[60px] h-[2px] rounded-full bg-gradient-to-r from-[#C8A96A] to-transparent" />
                <span className="inline-block font-['Inter',sans-serif] text-[0.72rem] font-semibold
                                 tracking-[0.18em] uppercase text-[#C8A96A]">
                  About
                </span>
              </div>
              <h2
                className="font-['Playfair_Display',serif] text-[#0d1a12] font-semibold
                           leading-[1.15] tracking-tight
                           text-[clamp(2rem,3.5vw,3rem)]"
              >
                Experience Grandeur
                <br />
                <span className="text-[#1E5A3A]">Amid Nature</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="font-['Inter',sans-serif] text-[1.025rem] leading-[1.8] text-[#7a7a7a] font-light">
                An exclusive luxury residential community spread across
                14 acres in the heart of Yelahanka, North Bengaluru. Designed with over
                80% open green spaces, the development offers thoughtfully crafted 2, 3 &amp; 4 BHK
                residences that combine elegance, privacy, and modern urban living.
              </p>
            </AnimatedSection>

            {/* Feature List */}
            <AnimatedSection delay={0.3}>
              <ul className="flex flex-col gap-3 mt-2">
                {FEATURES.map((f, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                  >
                    <span className="w-9 h-9 rounded-full bg-[rgba(30,90,58,0.1)] flex items-center justify-center shrink-0">
                      <f.icon size={16} color="#1E5A3A" />
                    </span>
                    <span className="font-['Inter',sans-serif] text-[0.95rem] text-[#3d3d3d]">
                      {f.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a href="#enquiry" className={BTN_PRIMARY} id="about-enquire-btn">
                  Enquire Now
                </a>
                <a
                  href="#floor-plans"
                  className={`${BTN_OUTLINE} text-[#1E5A3A] border-[#1E5A3A]`}
                  id="about-floor-plan-btn"
                >
                  View Floor Plans
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
