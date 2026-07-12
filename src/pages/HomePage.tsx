import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { categories, heroSlides } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading, Reveal } from '../components/SectionHeading';
import { StarRating } from '../components/StarRating';
import { useStore } from '../context/StoreContext';
import { useProducts, useTestimonials } from '../lib/hooks';
import { ProductCarouselSkeleton, TestimonialSkeleton } from '../components/Skeletons';

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [auto]);

  const go = (n: number) => {
    setAuto(false);
    setIndex((n + heroSlides.length) % heroSlides.length);
    setTimeout(() => setAuto(true), 8000);
  };

  return (
    <section className="relative h-[88vh] min-h-[520px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={heroSlides[index].image} alt={heroSlides[index].title} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[index].accent}`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center">
        <div className="container-px">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="max-w-xl"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                {heroSlides[index].eyebrow}
              </span>
              <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
                {heroSlides[index].title}
              </h1>
              <p className="mt-4 max-w-md text-lg text-white/90">{heroSlides[index].subtitle}</p>
              <Link to={heroSlides[index].link} className="btn-primary mt-8 text-base">
                {heroSlides[index].cta} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/40"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/40"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-brand-600' : 'w-2 bg-white/60 hover:bg-white'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturesBar() {
  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over Rs. 5000' },
    { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
    { icon: ShieldCheck, title: 'Authentic', desc: '100% genuine products' },
    { icon: Headphones, title: '24/7 Support', desc: 'WhatsApp anytime' },
  ];
  return (
    <section className="border-b border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="container-px grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950">
                <f.icon size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900 dark:text-white">{f.title}</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">{f.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductCarousel() {
  const { products, status } = useProducts({ sort: 'newest', limit: 10 });
  const featured = products.filter((p) => p.badge === 'Best Seller' || p.badge === 'New Arrival').slice(0, 8);
  const display = featured.length > 0 ? featured : products.slice(0, 8);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-px">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured" title="Trending Products" subtitle="Best-selling and newly arrived sneakers loved by our customers." />
          <Link to="/shop" className="hidden flex-shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 sm:flex">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {status === 'loading' && (
          <div className="mt-8"><ProductCarouselSkeleton /></div>
        )}
        {status === 'error' && (
          <p className="mt-8 text-center text-sm text-ink-500">Unable to load products right now.</p>
        )}
        {status === 'success' && display.length > 0 && (
          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x">
            {display.map((p, i) => (
              <div key={p.id} className="w-72 flex-shrink-0 snap-start sm:w-80 lg:w-96">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function useCountdown(target: number) {
  const [time, setTime] = useState(target - Date.now());
  useEffect(() => {
    const t = setInterval(() => setTime(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const clamp = Math.max(0, time);
  return {
    hours: Math.floor(clamp / 3.6e6),
    minutes: Math.floor((clamp % 3.6e6) / 6e4),
    seconds: Math.floor((clamp % 6e4) / 1000),
  };
}

function PromoBanner() {
  const target = useState(() => Date.now() + 1000 * 60 * 60 * 18 + 1000 * 60 * 23)[0];
  const { hours, minutes, seconds } = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="py-16 sm:py-20">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900 px-6 py-12 sm:px-12 sm:py-16">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-600/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-lg">
                <span className="inline-block rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                  Limited Time Offer
                </span>
                <h2 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
                  Flat 20% Off
                </h2>
                <p className="mt-3 text-lg text-white/80">
                  Use code <span className="font-bold text-gold-400">PUMA20</span> at checkout. Buy 1 Get 1 on selected suede styles.
                </p>
                <Link to="/shop" className="btn-primary mt-6 text-base">
                  Shop the Sale <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex gap-3">
                {[
                  { label: 'Hours', value: pad(hours) },
                  { label: 'Mins', value: pad(minutes) },
                  { label: 'Secs', value: pad(seconds) },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                    <span className="font-display text-3xl font-bold text-white tabular-nums">{t.value}</span>
                    <span className="mt-1 text-xs uppercase tracking-wide text-white/70">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-px">
        <SectionHeading center eyebrow="Browse" title="Shop by Category" subtitle="Find your perfect pair across our curated collections." />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.08}>
              <Link
                to={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-bold text-white">{cat.name}</h3>
                  <p className="mt-0.5 text-sm text-white/70">{cat.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-400 transition group-hover:gap-2">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const { testimonials, status } = useTestimonials();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <section className="bg-ink-50 py-16 sm:py-20 dark:bg-ink-900/40">
      <div className="container-px">
        <SectionHeading center eyebrow="Reviews" title="What Our Customers Say" subtitle="Thousands of happy customers stepping in style." />
        <div className="relative mx-auto mt-10 max-w-3xl">
          {status === 'loading' && <TestimonialSkeleton />}
          {status === 'error' && (
            <p className="text-center text-sm text-ink-500">Unable to load testimonials right now.</p>
          )}
          {status === 'success' && testimonials.length > 0 && (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  className="rounded-3xl bg-white p-8 shadow-card dark:bg-ink-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <StarRating rating={testimonials[index].rating} size={22} />
                  <p className="mt-4 text-lg leading-relaxed text-ink-700 dark:text-ink-200">"{testimonials[index].text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img src={testimonials[index].avatar} alt={testimonials[index].name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-ink-900 dark:text-white">{testimonials[index].name}</p>
                      <p className="text-sm text-ink-500">{testimonials[index].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-brand-600' : 'w-2 bg-ink-300 dark:bg-ink-700'}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const { pushToast } = useStore();
  const [email, setEmail] = useState('');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      pushToast({ message: 'Subscribed! Check your inbox for 10% off.' });
      setEmail('');
    }
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container-px">
        <Reveal>
          <div className="rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card sm:p-12 dark:border-ink-800 dark:bg-ink-900">
            <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white">Join the Pack</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-600 dark:text-ink-400">
              Subscribe for exclusive drops, early access, and 10% off your first order.
            </p>
            <form onSubmit={subscribe} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-ink-200 bg-white px-5 py-3 text-ink-900 outline-none transition focus:border-brand-500 dark:border-ink-700 dark:bg-ink-800 dark:text-white"
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSlider />
      <FeaturesBar />
      <ProductCarousel />
      <PromoBanner />
      <CategoriesSection />
      <TestimonialsCarousel />
      <Newsletter />
    </div>
  );
}