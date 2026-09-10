import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Github, Linkedin, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import Cubes from '../components/Cubes';
import emailjs from '@emailjs/browser';

const getEnvVar = (val) => (val || '').replace(/['";]/g, '').trim();

export default function Contact({ personalInfo }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const formRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const serviceId = getEnvVar(import.meta.env.VITE_EMAILJS_SERVICE_ID);
    const templateId = getEnvVar(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    const publicKey = getEnvVar(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    if (!serviceId || !templateId || !publicKey || publicKey === 'YOUR_EMAILJS_PUBLIC_KEY' || publicKey.startsWith('template_')) {
      console.error('EmailJS Error: Missing or invalid environment variables. Check your .env file and ensure VITE_EMAILJS_PUBLIC_KEY is set to your actual EmailJS Public Key (not Template ID).');
      setStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey }
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative bg-[var(--color-bg)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div style={{ y: y1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[var(--color-accent-dark)]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
              07 / Connect
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] tracking-tight">
            LET'S <span className="text-gradient">TALK.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          
          {/* Contact Info */}
          <div>
            <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-8">
              {[
                { 
                  icon: Mail, 
                  label: "Email", 
                  value: personalInfo.email || personalInfo.socials.email.replace('mailto:', ''), 
                  href: personalInfo.socials.email?.startsWith('mailto:') ? personalInfo.socials.email : `mailto:${personalInfo.socials.email}` 
                },
                { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: "Location", value: personalInfo.location, href: null }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-card)] border border-black/5 flex items-center justify-center text-[var(--color-text)] group-hover:bg-[var(--color-accent-dark)] group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-[var(--color-text)] font-medium hover:text-[var(--color-accent-dark)] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[var(--color-text)] font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-black/5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-6">Social Profiles</div>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: personalInfo.socials.github, label: "GitHub" },
                  { icon: Linkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" }
                ].map((social) => (
                  <MagneticButton key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-card)] border border-black/5 text-[var(--color-text)] hover:text-[var(--color-accent-dark)] hover:border-[var(--color-accent-light)] transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Desktop-only ambient Cubes grid (7 cols x 4 rows) */}
            <div className="hidden lg:block mt-8 w-full max-w-[320px] aspect-[7/4] relative opacity-85 hover:opacity-100 transition-opacity">
              <Cubes 
                gridCols={7}
                gridRows={4}
                maxAngle={35}
                radius={2.5}
                cellGap={14}
                borderStyle="1.5px dashed #3F6F52"
                faceColor="#FFFFFF"
                rippleColor="#7FAF8D"
                rippleSpeed={1.5}
                autoAnimate={true}
                rippleOnClick={true}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="minimal-card p-6 sm:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[var(--color-bg)] border border-black/10 rounded-lg px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent-dark)] transition-colors placeholder:text-black/20 font-medium"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[var(--color-bg)] border border-black/10 rounded-lg px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent-dark)] transition-colors placeholder:text-black/20 font-medium"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[var(--color-bg)] border border-black/10 rounded-lg px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent-dark)] transition-colors placeholder:text-black/20 font-medium resize-none"
                  placeholder="Hello Dharun, I would like to talk about..."
                />
              </div>

              <MagneticButton className="w-full">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] font-bold tracking-wider text-sm hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      SEND MESSAGE <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </MagneticButton>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[var(--color-accent-dark)] font-medium text-sm bg-[var(--color-accent-dark)]/10 px-4 py-3 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5" />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-600 font-medium text-sm bg-red-50 px-4 py-3 rounded-lg"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
