import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Plane, GraduationCap, Hospital,
  Cpu, Train, ShoppingBag, Navigation,
} from 'lucide-react';

const LOCATION_ITEMS = [
  { icon: MapPin, label: 'Yelahanka', desc: 'Heart of the project' },
  { icon: Plane, label: 'Airport Connectivity', desc: 'Kempegowda International, ~20 min' },
  { icon: Navigation, label: 'Airport Road', desc: 'Direct & seamless access' },
  { icon: Navigation, label: 'Bellary Road', desc: 'Prime arterial connectivity' },
  { icon: Navigation, label: 'Doddaballapura Road', desc: 'Easy north corridor access' },
  { icon: ShoppingBag, label: 'RMZ Galleria Mall', desc: 'Luxury retail & dining nearby' },
  { icon: GraduationCap, label: 'Top Schools & Colleges', desc: 'Ryan, Vidyashilp & more' },
  { icon: Hospital, label: 'Leading Hospitals', desc: 'Columbia Asia, Aster & more' },
  { icon: Cpu, label: 'Tech Parks', desc: 'KIADB, Manyata & more' },
  { icon: Train, label: 'Metro Connectivity', desc: 'Upcoming metro corridor' },
];

const CONTAINER = 'w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]';

const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 bg-[#1E5A3A] text-white ' +
  "font-['Inter',sans-serif] font-medium text-[0.9rem] tracking-[0.04em] uppercase " +
  'py-[0.875rem] px-8 rounded-full border-2 border-transparent cursor-pointer ' +
  'no-underline transition-all duration-300 w-full sm:w-auto ' +
  'hover:bg-transparent hover:border-[#C8A96A] hover:text-[#C8A96A] hover:-translate-y-0.5 ' +
  'hover:shadow-[0_12px_32px_rgba(200,169,106,0.25)]';

function LocationItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      className="flex items-start gap-3 group py-3 border-b border-[rgba(30,90,58,0.08)]"
    >
      <span
        className="w-[38px] h-[38px] shrink-0 rounded-[10px] flex items-center justify-center
                   bg-[rgba(30,90,58,0.08)] border border-[rgba(30,90,58,0.1)]
                   transition-all duration-300 group-hover:bg-[rgba(30,90,58,0.15)]"
      >
        <item.icon size={16} color="#1E5A3A" />
      </span>
      <div>
        <div className="font-['Inter',sans-serif] text-[0.92rem] font-medium text-[#0d1a12]">
          {item.label}
        </div>
        <div className="font-['Inter',sans-serif] text-[0.78rem] text-[#7a7a7a] mt-0.5">
          {item.desc}
        </div>
      </div>
    </motion.li>
  );
}

export default function Location() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, margin: '-60px' });

  return (
    <section id="location" className="py-16 md:py-24 lg:py-28 bg-white">
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
            Prime Location
          </span>
          <h2
            className="font-['Playfair_Display',serif] text-[#0d1a12] font-semibold mt-3
                       leading-[1.2] tracking-tight text-[clamp(2rem,4vw,3.2rem)]"
          >
            Connected to Everything
            <br />
            <span className="text-[#1E5A3A]">That Matters</span>
          </h2>
          <p className="font-['Inter',sans-serif] text-[1rem] text-[#7a7a7a] mx-auto mt-4
                        max-w-[480px] leading-[1.7] font-light">
            Nestled in Yelahanka, places you at the heart of North
            Bengaluru's finest infrastructure and connectivity.
          </p>
        </motion.div>

        {/* Map + Location list */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Map */}
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            animate={mapInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] overflow-hidden
                       shadow-[0_24px_80px_rgba(30,90,58,0.12)]
                       border border-[rgba(30,90,58,0.1)]"
            style={{ aspectRatio: '4/3' }}
          >
            <iframe
              title="Brigade Eternia Location Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3886.044087183595!2d77.5930503!3d13.0963925!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19006cf48567%3A0x7149f40019720494!2sBrigade%20Eternia!5e0!3m2!1sen!2sin!4v1782986353150!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Location list + CTA */}
          <div>
            <ul className="flex flex-col">
              {LOCATION_ITEMS.map((item, i) => (
                <LocationItem key={i} item={item} index={i} />
              ))}
            </ul>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a href="#enquiry" className={BTN_PRIMARY} id="location-tour-btn">
                <Navigation size={16} />
                Schedule Location Tour
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
