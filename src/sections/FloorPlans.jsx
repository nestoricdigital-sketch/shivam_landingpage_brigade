import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Maximize } from 'lucide-react';

const CONFIGS = [
  {
    type: '2 BHK', tagline: 'Perfect Beginnings',
    sizes: ['1,180 – 1,320 sq.ft'],
    features: ['Premium Layout', 'Large Balconies', 'Vastu Compliant'],
    price: 'Price on Request',
    gradient: 'linear-gradient(135deg, #1E5A3A 0%, #2a7a50 100%)',
  },
  {
    type: '3 BHK', tagline: 'Elevated Comfort',
    sizes: ['1,650 – 1,920 sq.ft'],
    features: ['Spacious Living', 'Study Room Option', 'Premium Finishes'],
    price: 'Price on Request',
    gradient: 'linear-gradient(135deg, #153f29 0%, #1E5A3A 100%)',
    featured: true,
  },
  {
    type: '4 BHK', tagline: 'The Grand Residences',
    sizes: ['2,400 – 2,850 sq.ft'],
    features: ['Grand Living Room', 'Servant Quarter', 'Exclusive Views'],
    price: 'Price on Request',
    gradient: 'linear-gradient(135deg, #1E5A3A 0%, #2a7a50 100%)',
  },
];

const CONTAINER = 'w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]';

function FloorPlanCard({ config, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-[28px] overflow-hidden"
      style={{
        background:  config.gradient,
        boxShadow:   hovered ? '0 32px 80px rgba(30,90,58,0.4)' : '0 12px 40px rgba(30,90,58,0.2)',
        transform:   hovered
          ? config.featured ? 'translateY(-10px) scale(1.02)' : 'translateY(-8px)'
          : config.featured ? 'scale(1.025)' : 'scale(1)',
        border:      config.featured ? '1px solid rgba(200,169,106,0.5)' : '1px solid rgba(200,169,106,0.15)',
        transition:  'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Featured badge */}
      {config.featured && (
        <div className="absolute top-4 right-4 bg-[#C8A96A] text-[#0d1a12] rounded-full
                        px-[0.85rem] py-[0.3rem] font-['Inter',sans-serif] text-[0.68rem]
                        font-bold tracking-[0.1em] uppercase">
          Most Popular
        </div>
      )}

      <div className="flex flex-col flex-1 p-[clamp(1.75rem,4vw,2.5rem)]">
        {/* Type tag */}
        <div className="mb-1">
          <span className="font-['Inter',sans-serif] text-[0.7rem] tracking-[0.2em]
                           uppercase text-[#C8A96A] font-semibold">
            {config.tagline}
          </span>
        </div>

        <h3 className="font-['Playfair_Display',serif] text-white font-bold leading-none mb-2
                       text-[clamp(2.2rem,4vw,3rem)]">
          {config.type}
        </h3>

        {/* Size */}
        <div className="flex items-center gap-2 font-['Inter',sans-serif] text-[0.9rem]
                        text-white/75 mb-7">
          <Maximize size={14} color="rgba(200,169,106,0.8)" />
          {config.sizes[0]}
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(200,169,106,0.2)] mb-6" />

        {/* Features */}
        <ul className="flex flex-col gap-2 flex-1 mb-8">
          {config.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 font-['Inter',sans-serif]
                                   text-[0.875rem] text-white/70">
              <span className="w-[5px] h-[5px] rounded-full bg-[#C8A96A] shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#enquiry"
          id={`floor-plan-${config.type.replace(' ', '-').toLowerCase()}-btn`}
          className="flex items-center justify-between
                     bg-white/10 border border-[rgba(200,169,106,0.35)] rounded-full
                     px-6 py-[0.85rem] text-[#C8A96A]
                     font-['Inter',sans-serif] text-[0.85rem] font-medium
                     tracking-[0.06em] uppercase no-underline
                     backdrop-blur-sm transition-all duration-300
                     hover:bg-[#C8A96A] hover:text-[#0d1a12]"
        >
          Request Floor Plan
          <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}

export default function FloorPlans() {
  const headRef    = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="floor-plans" className="py-16 md:py-24 lg:py-28 bg-[#F8F8F6]">
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-['Inter',sans-serif] text-[0.72rem] font-semibold
                           tracking-[0.18em] uppercase text-[#C8A96A]">
            Floor Plans &amp; Configurations
          </span>
          <h2
            className="font-['Playfair_Display',serif] text-[#0d1a12] font-semibold mt-3
                       leading-[1.2] tracking-tight text-[clamp(2rem,4vw,3.2rem)]"
          >
            Choose Your
            <br />
            <span className="text-[#1E5A3A]">Perfect Residence</span>
          </h2>
          <p className="font-['Inter',sans-serif] text-[1rem] text-[#7a7a7a] mx-auto mt-4
                        max-w-[480px] leading-[1.7] font-light">
            Thoughtfully designed floor plans offering the perfect balance of
            space, elegance, and functionality.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {CONFIGS.map((config, i) => (
            <FloorPlanCard key={i} config={config} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          className="text-center mt-8 font-['Inter',sans-serif] text-[0.75rem] text-[#7a7a7a]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          * Sizes and configurations are indicative. Actual specifications may vary.
          Contact our sales team for official RERA-approved details.
        </motion.p>
      </div>
    </section>
  );
}
