/**
 * ContactForm — Reusable lead-capture form
 *
 * Props
 * ─────
 * @param {string}   title        Form heading
 * @param {string}   subtitle     Subtitle text
 * @param {string}   submitLabel  Button label
 * @param {string}   tableName    Supabase table to insert into
 * @param {string}   formId       HTML id for the <form> element
 * @param {function} onSuccess    Callback fired after successful submission
 * @param {object}   extraData    Additional key-value pairs merged into the Supabase payload
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ── Validation ──────────────────────────────────────────── */
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-Z\s.''-]{2,60}$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  else if (!NAME_RE.test(form.name.trim())) errors.name = 'Please enter a valid name (2–60 characters).';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!PHONE_RE.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit Indian mobile number (starts 6–9).';
  if (form.email && !EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address.';
  if (form.message && form.message.trim().length > 500) errors.message = 'Message must be 500 characters or fewer.';
  return errors;
}

/* ── Shared Tailwind strings ─────────────────────────────── */
const INPUT_BASE =
  "w-full bg-white/[0.06] border border-white/[0.18] rounded-[20px] " +
  "py-[0.875rem] px-5 text-white font-['Inter',sans-serif] text-[0.925rem] " +
  "outline-none transition-all duration-200 " +
  "placeholder:text-white/45 " +
  "focus:border-[#C8A96A] focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(200,169,106,0.12)]";

const INPUT_ERROR = " border-red-400/60";

const LABEL =
  "block font-['Inter',sans-serif] text-[0.78rem] font-medium " +
  "tracking-[0.08em] uppercase text-white/65 mb-2";

const BTN_GOLD =
  "w-full inline-flex items-center justify-center gap-2 " +
  "bg-[#C8A96A] text-[#0d1a12] font-['Inter',sans-serif] font-semibold " +
  "text-[0.9rem] tracking-[0.04em] uppercase " +
  "py-[0.5rem] rounded-full border-2 border-transparent cursor-pointer " +
  "transition-all duration-300 hover:bg-[#a8843f] hover:-translate-y-0.5 " +
  "hover:shadow-[0_12px_32px_rgba(200,169,106,0.4)] " +
  "disabled:opacity-75 disabled:cursor-not-allowed";

/* ── Field wrapper ───────────────────────────────────────── */
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 font-['Inter',sans-serif] text-[0.73rem] text-red-400 mt-1.5"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Success view ────────────────────────────────────────── */
function SuccessView() {
  return (
    <motion.div
      className="text-center py-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-[72px] h-[72px] rounded-full mx-auto mb-6
                   bg-[rgba(30,90,58,0.2)] border-2 border-[#1E5A3A]
                   flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}
      >
        <CheckCircle2 size={32} color="#C8A96A" />
      </motion.div>

      <h3 className="font-['Playfair_Display',serif] text-white text-2xl font-semibold mb-2">
        Thank You!
      </h3>
      <p className="font-['Inter',sans-serif] text-white/60 text-[0.95rem] leading-[1.7]">
        Our luxury consultant will reach out within{' '}
        <span className="text-[#C8A96A]">30 minutes</span>.
        <br />
        We look forward to welcoming you.
      </p>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function ContactForm({
  title = 'Get Exclusive Details',
  subtitle = 'Fill in your details and our team will get in touch shortly.',
  submitLabel = 'Book My Site Visit',
  tableName = 'enquiries',
  formId = 'contact-form',
  onSuccess,
  extraData = {},
}) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverErr, setServerErr] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverErr) setServerErr('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setServerErr('');

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        message: form.message.trim() || null,
        source_url: typeof window !== 'undefined' ? window.location.href : null,
        created_at: new Date().toISOString(),
        ...extraData,
      };

      const { error } = await supabase.from(tableName).insert([payload]);
      if (error) throw error;

      setSubmitted(true);
      onSuccess?.({ form, payload });
    } catch (err) {
      console.error('[ContactForm] Supabase error:', err);
      setServerErr(
        err?.message?.includes('fetch')
          ? 'Network error — please check your connection and try again.'
          : 'Something went wrong. Please try again or call us directly.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessView />;

  return (
    <form onSubmit={handleSubmit} noValidate id={formId}>
      {/* Header */}
      <h3 className="font-['Playfair_Display',serif] text-white text-2xl font-semibold mb-1">
        {title}
      </h3>
      <p className="font-['Inter',sans-serif] text-white/45 text-[0.82rem] mb-4">
        {subtitle}
      </p>

      <div className="flex flex-col gap-4">
        {/* Full Name */}
        <Field id={`${formId}-name`} label="Full Name *" error={errors.name}>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={INPUT_BASE + (errors.name ? INPUT_ERROR : '')}
            autoComplete="name"
            aria-required="true"
          />
        </Field>

        {/* Phone */}
        <Field id={`${formId}-phone`} label="Phone Number *" error={errors.phone}>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={INPUT_BASE + (errors.phone ? INPUT_ERROR : '')}
            autoComplete="tel"
            maxLength={10}
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            aria-required="true"
          />
        </Field>

        {/* Email */}
        <Field id={`${formId}-email`} label="Email Address (optional)" error={errors.email}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={INPUT_BASE + (errors.email ? INPUT_ERROR : '')}
            autoComplete="email"
          />
        </Field>

        {/* Message */}
        <Field id={`${formId}-message`} label="Message (optional)" error={errors.message}>
          <textarea
            id={`${formId}-message`}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="I'm interested in a 3 BHK…"
            className={INPUT_BASE + (errors.message ? INPUT_ERROR : '')}
            rows={3}
            maxLength={500}
            style={{ resize: 'vertical', minHeight: '80px' }}
          />
          {form.message && (
            <p className="font-['Inter',sans-serif] text-white/30 text-[0.68rem] text-right mt-0.5">
              {form.message.length}/500
            </p>
          )}
        </Field>

        {/* Server error */}
        <AnimatePresence>
          {serverErr && (
            <motion.div
              key="server-err"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2 bg-red-400/10 border border-red-400/25
                         rounded-xl px-4 py-3 font-['Inter',sans-serif] text-[0.8rem] text-red-400"
            >
              <AlertCircle size={14} className="shrink-0 mt-px" />
              {serverErr}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          type="submit"
          id={`${formId}-submit`}
          disabled={submitting}
          whileHover={!submitting ? { scale: 1.02 } : {}}
          whileTap={!submitting ? { scale: 0.98 } : {}}
          className={BTN_GOLD}
        >
          {submitting ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 size={16} className="animate-spin" />
              Submitting…
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              <Send size={16} />
              {submitLabel}
            </span>
          )}
        </motion.button>

        {/* Disclaimer */}
        <p className="text-center font-['Inter',sans-serif] text-[0.72rem] text-white/30 leading-snug">
          By submitting, you agree to be contacted by official
          sales team. Your information is 100% confidential.
        </p>
      </div>
    </form>
  );
}
