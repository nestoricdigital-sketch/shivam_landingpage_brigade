import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/shivam_logo.webp';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Contact', href: '#enquiry' },
];

const CONTAINER = 'w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-[5vw]';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-[#0d1a12] border-t border-[rgba(200,169,106,0.15)]"
    >
      <div className={`${CONTAINER} pt-16 pb-10`}>
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="logo" className='w-24 h-24' />
            </div>
            <p className="font-['Inter',sans-serif] text-[0.875rem] text-white/45 leading-[1.75] max-w-[280px]">
              A 14-acre luxury residential community with 80% open green spaces and
              1124 premium homes in Yelahanka, North Bengaluru.
            </p>
            <div className="inline-block mt-4 bg-[rgba(200,169,106,0.1)] border border-[rgba(200,169,106,0.25)]
                            rounded-lg px-[0.875rem] py-2">
              <span className="font-['Inter',sans-serif] text-[0.7rem] text-[#C8A96A] tracking-[0.06em]">
                RERA: PRM/KA/RERA/1251/310/PR/000000/000000
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Inter',sans-serif] text-[0.72rem] font-semibold tracking-[0.18em]
                           uppercase text-[#C8A96A] mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-['Inter',sans-serif] text-[0.875rem] text-white/50
                               no-underline transition-colors duration-200 hover:text-[#C8A96A]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Inter',sans-serif] text-[0.72rem] font-semibold tracking-[0.18em]
                           uppercase text-[#C8A96A] mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+919876543210" className="flex items-start gap-3 no-underline group">
                <Phone size={16} color="#C8A96A" className="mt-0.5 shrink-0" />
                <span className="font-['Inter',sans-serif] text-[0.875rem] text-white/50
                                 transition-colors duration-200 group-hover:text-[#C8A96A]">
                  +91 98765 43210
                </span>
              </a>
              <a href="mailto:sales@brigadeeternia.in" className="flex items-start gap-3 no-underline group">
                <Mail size={16} color="#C8A96A" className="mt-0.5 shrink-0" />
                <span className="font-['Inter',sans-serif] text-[0.875rem] text-white/50
                                 transition-colors duration-200 group-hover:text-[#C8A96A]">
                  sales@brigadeeternia.in
                </span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={16} color="#C8A96A" className="mt-0.5 shrink-0" />
                <span className="font-['Inter',sans-serif] text-[0.875rem] text-white/50 leading-[1.65]">
                  Yelahanka,
                  <br />North Bengaluru — 560 064
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-['Inter',sans-serif] text-[0.75rem] text-white/30 leading-[1.6] max-w-[640px]">
            <strong className="text-white/50">Disclaimer:</strong> This website is for informational
            purposes only. All renders, images, and floor plans are artist's impressions.
            Specifications, amenities, and pricing are subject to change without notice.
            Please refer to the RERA-approved documents for official project details.
          </p>
          <div className="flex items-center gap-5 shrink-0">
            <span className="font-['Inter',sans-serif] text-[0.75rem] text-white/30">
              © {year} Brigade Eternia. All rights reserved.
            </span>
            <a
              href="#"
              className="font-['Inter',sans-serif] text-[0.75rem] text-white/30
                         no-underline transition-colors duration-200 hover:text-[#C8A96A]"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
