import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Star, Waves, Dumbbell, Shield, Tv2,
  UtensilsCrossed, Baby, Trees, Clock, Heart,
} from 'lucide-react';

const AMENITIES = [
  { icon: Star, label: 'Grand Clubhouse', desc: 'World-class social & recreation hub' },
  { icon: Waves, label: 'Swimming Pool', desc: 'Temperature-controlled luxury pool' },
  { icon: Dumbbell, label: 'Modern Gym', desc: 'State-of-the-art fitness centre' },
  { icon: Star, label: 'Sports Courts', desc: 'Tennis, basketball & multi-sport' },
  { icon: Tv2, label: 'Mini Theatre', desc: 'Private screening experience' },
  { icon: UtensilsCrossed, label: 'Banquet Hall', desc: 'Elegant event & celebration space' },
  { icon: Baby, label: "Children's Play Area", desc: 'Safe & imaginative play zones' },
  { icon: Trees, label: 'Landscaped Gardens', desc: 'Curated green walkways & parks' },
  { icon: Shield, label: '24×7 Security', desc: 'CCTV & manned access control' },
  { icon: Heart, label: 'Day Care', desc: 'Professional childcare facility' },
];

const CONTAINER = 'w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]';

function AmenityCard({ amenity, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden rounded-[28px] cursor-default
                 bg-white/[0.05] border border-[rgba(200,169,106,0.15)]
                 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                 p-[clamp(1.25rem,3vw,1.75rem)]"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
        style={{ background: 'linear-gradient(135deg, rgba(200,169,106,0.08) 0%, rgba(30,90,58,0.12) 100%)' }}
      />

      {/* Icon */}
      <div className="relative w-[50px] h-[50px] rounded-xl mb-4 flex items-center justify-center
                      bg-[rgba(200,169,106,0.12)] border border-[rgba(200,169,106,0.2)]
                      transition-all duration-300">
        <amenity.icon size={22} color="#C8A96A" />
      </div>

      {/* Label */}
      <h3 className="relative font-['Playfair_Display',serif] text-white text-[1.1rem] font-medium mb-1">
        {amenity.label}
      </h3>

      {/* Description */}
      <p className="relative font-['Inter',sans-serif] text-[0.82rem] text-white/50 leading-[1.6]">
        {amenity.desc}
      </p>

      {/* Bottom gold accent on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0
                   group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'linear-gradient(90deg, transparent, #C8A96A, transparent)' }}
      />
    </motion.div>
  );
}

export default function Amenities() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section
      id="amenities"
      className="py-16 md:py-24 lg:py-28 relative overflow-hidden bg-[#0d1a12]"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(30,90,58,0.25) 0%, transparent 60%), ' +
            'radial-gradient(circle at 80% 20%, rgba(200,169,106,0.08) 0%, transparent 50%)',
        }}
      />

      <div className={`${CONTAINER} relative z-10`}>

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
            Lifestyle &amp; Amenities
          </span>
          <h2
            className="font-['Playfair_Display',serif] text-white font-semibold mt-3
                       leading-[1.2] tracking-tight text-[clamp(2rem,4vw,3.2rem)]"
          >
            Where Every Day Feels Like
            <br />
            <span className="text-[#C8A96A]">A Five-Star Resort</span>
          </h2>
          <p className="font-['Inter',sans-serif] text-[1rem] text-white/50 mx-auto mt-4
                        max-w-[500px] leading-[1.7] font-light">
            An exhaustive collection of world-class amenities crafted for residents who
            deserve nothing less than extraordinary.
          </p>
          {/* Centre gold line */}
          <div
            className="w-[60px] h-[2px] mx-auto rounded-full mt-5"
            style={{ background: 'linear-gradient(90deg, transparent, #C8A96A, transparent)' }}
          />
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(220px,100%),1fr))]">
          {AMENITIES.map((amenity, i) => (
            <AmenityCard key={i} amenity={amenity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
