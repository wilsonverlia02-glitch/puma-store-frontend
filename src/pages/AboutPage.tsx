import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Globe, Heart } from 'lucide-react';
import { SectionHeading, Reveal } from '../components/SectionHeading';

export function AboutPage() {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Globe, value: '12+', label: 'Cities Served' },
    { icon: Award, value: '100%', label: 'Authentic Products' },
    { icon: Heart, value: '4.8★', label: 'Average Rating' },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="About Puma Sports Store" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 to-transparent" />
        <div className="container-px relative z-10 flex h-full items-center">
          <div className="max-w-xl">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              Our Story
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Born to Move
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-lg text-white/90">
              Puma Sports Store brings authentic Puma footwear to sneaker lovers across Pakistan.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container-px py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-ink-100 p-8 dark:border-ink-800">
              <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Who We Are</h2>
              <p className="mt-4 text-ink-600 dark:text-ink-300">
                We are a dedicated team of sneaker enthusiasts committed to bringing you the finest Puma footwear — from the iconic Suede Classic to the latest Speedcat and performance running shoes. Every pair we sell is 100% authentic, sourced directly from authorized distributors.
              </p>
              <p className="mt-4 text-ink-600 dark:text-ink-300">
                Our mission is simple: make premium sneakers accessible, affordable, and easy to buy online with fast delivery and hassle-free returns.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-3xl border border-ink-100 p-6 text-center dark:border-ink-800">
                  <s.icon size={28} className="mx-auto text-brand-600" />
                  <p className="mt-3 font-display text-3xl font-bold text-ink-900 dark:text-white">{s.value}</p>
                  <p className="mt-1 text-sm text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading center eyebrow="What We Stand For" title="Our Values" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Authenticity First', desc: 'Every product is verified genuine. No fakes, ever.' },
              { title: 'Customer Obsessed', desc: 'From sizing help to returns, we go the extra mile.' },
              { title: 'Fast & Reliable', desc: 'Quick delivery and real-time WhatsApp support.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="rounded-3xl border border-ink-100 p-8 text-center dark:border-ink-800">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 font-display text-xl font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900 dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-brand-900 p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white">Ready to Step Into Style?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/80">Explore our full collection of premium Puma sneakers.</p>
            <Link to="/shop" className="btn-primary mt-6 text-base">
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
