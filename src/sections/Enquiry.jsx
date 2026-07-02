import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Ban, ShieldCheck } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const TRUST_BADGES = [
  { icon: Ban, label: 'No Spam' },
  { icon: Phone, label: 'Instant Callback' },
  { icon: ShieldCheck, label: 'Official Sales Team' },
];

const CONTAINER = 'w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]';

export default function Enquiry() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  return (
    <section
      id="enquiry"
      className="py-16 md:py-24 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1a12 0%, #1a2e1f 100%)' }}
    >
      {/* BG radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 70% 30%, rgba(200,169,106,0.07) 0%, transparent 55%), ' +
            'radial-gradient(circle at 20% 70%, rgba(30,90,58,0.2) 0%, transparent 50%)',
        }}
      />

      <div className={`${CONTAINER} relative z-10`}>
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — Heading & Trust */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, x: -30 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block font-['Inter',sans-serif] text-[0.72rem] font-semibold
                             tracking-[0.18em] uppercase text-[#C8A96A]">
              Exclusive Invitation
            </span>

            <h2
              className="font-['Playfair_Display',serif] text-white font-semibold mt-3
                         leading-[1.15] tracking-tight text-[clamp(2.2rem,4vw,3.4rem)]"
            >
              Book Your Exclusive
              <br />
              <span className="text-[#C8A96A]">Site Visit</span>
            </h2>

            <p className="font-['Inter',sans-serif] text-[1rem] text-white/55 mt-5
                          leading-[1.75] font-light max-w-[420px]">
              Experience the grandeur in person. Our luxury lifestyle
              consultants are ready to curate a bespoke experience just for you.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {TRUST_BADGES.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/[0.06] border border-[rgba(200,169,106,0.2)]
                             rounded-full px-4 py-[0.55rem]"
                >
                  <badge.icon size={14} color="#C8A96A" />
                  <span className="font-['Inter',sans-serif] text-[0.78rem] text-white/70 tracking-[0.04em]">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Project identity */}
            <div className="mt-10 pt-8 border-t border-white/[0.08] flex items-center gap-4">
              <div>
                {/* <div className="font-['Playfair_Display',serif] text-white text-xl font-semibold">
                  Brigade Eternia
                </div> */}
                <div className="font-['Inter',sans-serif] text-[0.78rem] text-[#C8A96A]
                                tracking-[0.12em] uppercase mt-0.5">
                  Yelahanka · North Bengaluru
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form card (glass-card-dark) */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={formInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[rgba(13,26,18,0.65)] border border-[rgba(200,169,106,0.2)]
                       backdrop-blur-xl rounded-[28px]
                       p-[clamp(1.75rem,4vw,2.75rem)]"
          >
            <ContactForm
              formId="enquiry-contact-form"
              title="Get Exclusive Details"
              subtitle="Fill in your details and our team will get in touch shortly."
              submitLabel="Book My Site Visit"
              tableName="shivambrigade"
              extraData={{ form_location: 'enquiry_section' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
