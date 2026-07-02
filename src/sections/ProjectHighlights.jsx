import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Maximize2, Trees, Home, Building2,
  Layers, LayoutGrid, Calendar, ShieldCheck,
} from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Maximize2, value: '14', suffix: ' Acres', label: 'Total Development Area' },
  { icon: Trees, value: '80', suffix: '%', label: 'Open Landscape' },
  { icon: Home, value: '1124', suffix: '', label: 'Premium Homes' },
  { icon: Building2, value: '12', suffix: '', label: 'Elegant Towers' },
  { icon: Layers, value: 'G+14', suffix: '', label: 'Floors Per Tower' },
  { icon: LayoutGrid, value: '2,3,4', suffix: '', label: 'BHK Configurations' },
  { icon: Calendar, value: '2030', suffix: '', label: 'Possession From' },
  { icon: ShieldCheck, value: 'RERA', suffix: '', label: 'Approved Project' },
];

const CONTAINER = 'w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]';

function useCounter(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/\D/g, ''), 10) || 0;
  useEffect(() => {
    if (!inView || isNaN(numericTarget) || numericTarget === 0) return;
    let start = 0;
    const step = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numericTarget, duration]);
  return count;
}

function HighlightCard({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isNumeric = /^\d+$/.test(card.value);
  const animated = useCounter(card.value, inView && isNumeric);
  const display = isNumeric ? animated.toLocaleString('en-IN') : card.value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(30,90,58,0.18)' }}
      className="group bg-white border border-[rgba(30,90,58,0.1)] rounded-[28px]
                 shadow-[0_8px_48px_rgba(0,0,0,0.09)] cursor-default
                 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                 p-[clamp(1.25rem,3vw,2rem)]"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[rgba(30,90,58,0.08)] flex items-center justify-center mb-4
                      transition-all duration-300">
        <card.icon size={22} color="#1E5A3A" />
      </div>

      {/* Value */}
      <div className="font-['Playfair_Display',serif] text-[#0d1a12] font-bold leading-none mb-1.5
                      text-[clamp(1.8rem,3vw,2.6rem)] tracking-tight">
        {display}
        <span className="text-[#C8A96A] text-[0.6em]">{card.suffix}</span>
      </div>

      {/* Label */}
      <p className="font-['Inter',sans-serif] text-[0.82rem] text-[#7a7a7a] tracking-[0.04em] uppercase">
        {card.label}
      </p>

      {/* Hover gold line */}
      <div
        className="h-[2px] rounded-sm mt-4 w-0 group-hover:w-full transition-all duration-[400ms]"
        style={{ background: 'linear-gradient(90deg, #C8A96A, transparent)' }}
      />
    </motion.div>
  );
}

export default function ProjectHighlights() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="highlights" className="py-16 md:py-24 lg:py-28 bg-[#F8F8F6]">
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          {/* Gold divider center */}
          <div
            className="w-[60px] h-[2px] mx-auto rounded-full mb-4"
            style={{ background: 'linear-gradient(90deg, transparent, #C8A96A, transparent)' }}
          />
          <span className="inline-block font-['Inter',sans-serif] text-[0.72rem] font-semibold
                           tracking-[0.18em] uppercase text-[#C8A96A]">
            Project Highlights
          </span>
          <h2
            className="font-['Playfair_Display',serif] text-[#0d1a12] font-semibold mt-3
                       leading-[1.2] tracking-tight text-[clamp(2rem,4vw,3.2rem)]"
          >
            A Community Designed for
            <br />
            <span className="text-[#1E5A3A]">Extraordinary Living</span>
          </h2>
          <p className="font-['Inter',sans-serif] text-[1rem] text-[#7a7a7a] mx-auto mt-4
                        max-w-[520px] leading-[1.7] font-light">
            Every detail has been meticulously crafted to deliver an
            unparalleled living experience.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))]">
          {HIGHLIGHTS.map((card, i) => (
            <HighlightCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
