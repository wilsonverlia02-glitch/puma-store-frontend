import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Instagram, Facebook, Twitter, AlertCircle } from 'lucide-react';
import { SectionHeading, Reveal } from '../components/SectionHeading';
import { whatsappLink } from '../lib/utils';
import { cn } from '../lib/cn';
import { submitContact } from '../lib/api';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError('');
    try {
      const res = await submitContact(form);
      setSuccessMsg(res.message || 'Message sent successfully!');
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof ContactForm) => cn(
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-500 dark:bg-ink-900 dark:text-white',
    errors[field] ? 'border-red-400' : 'border-ink-200 dark:border-ink-700',
  );

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '123 Street Road, Karachi, Pakistan' },
    { icon: Phone, label: 'Phone', value: '+92 300 1234567' },
    { icon: Mail, label: 'Email', value: 'support@pumasports.pk' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10am – 9pm' },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      <div className="border-b border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/40">
        <div className="container-px py-12 text-center">
          <SectionHeading center eyebrow="Get in Touch" title="Contact Us" subtitle="Questions about sizing, orders, or returns? We're here to help." />
        </div>
      </div>

      <div className="container-px py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-ink-100 p-6 dark:border-ink-800">
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">Send us a message</h2>
              <form onSubmit={submit} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} placeholder="Your name" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Email</label>
                    <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} placeholder="you@email.com" />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Phone</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} placeholder="03001234567" />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={inputClass('message')} placeholder="How can we help?" />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                {submitError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
                <motion.button
                  type="submit"
                  disabled={loading || sent}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    'btn-primary w-full',
                    sent && 'bg-green-600 hover:bg-green-600',
                  )}
                >
                  {loading ? (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white" />
                  ) : sent ? (
                    <><CheckCircle2 size={18} /> {successMsg}</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-ink-100 p-6 dark:border-ink-800">
                <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">Store Information</h2>
                <div className="mt-5 space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950">
                        <info.icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink-900 dark:text-white">{info.label}</p>
                        <p className="text-sm text-ink-600 dark:text-ink-400">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-3xl bg-green-500 p-6 text-white transition hover:bg-green-600"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle size={26} />
                </div>
                <div>
                  <p className="font-display text-lg font-bold">Chat with us on WhatsApp</p>
                  <p className="text-sm text-white/90">Fastest way to reach us — tap to start a chat</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex justify-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition hover:bg-brand-600 hover:text-white dark:bg-ink-800 dark:text-ink-300" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition hover:bg-brand-600 hover:text-white dark:bg-ink-800 dark:text-ink-300" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition hover:bg-brand-600 hover:text-white dark:bg-ink-800 dark:text-ink-300" aria-label="TikTok">
                  <Twitter size={20} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-ink-100 dark:border-ink-800">
            <iframe
              title="Store Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=66.95%2C24.82%2C67.10%2C24.92&layer=mapnik&marker=24.8607%2C67.0011"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
