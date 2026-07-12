import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, Sun, Moon, Home, Grid3x3 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import { cn } from '../lib/cn';
import { formatPrice } from '../lib/utils';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const { cartCount, openCart, wishlist } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20));

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const suggestions = query
    ? products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 shadow-sm backdrop-blur-md dark:bg-ink-950/90'
            : 'bg-transparent',
        )}
      >
        <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link to="/" className="flex items-center gap-2" aria-label="Puma Sports Store home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-display text-lg font-extrabold text-white">
              P
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-ink-900 dark:text-white">
              PUMA<span className="text-brand-600"> SPORTS</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-600'
                      : 'text-ink-700 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-600"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2.5 text-ink-700 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-full p-2.5 text-ink-700 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Moon size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Sun size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              to="/wishlist"
              className="relative rounded-full p-2.5 text-ink-700 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-900">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              id="cart-icon-btn"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-ink-700 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 400 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2.5 text-ink-700 transition hover:bg-ink-100 lg:hidden dark:text-ink-300 dark:hover:bg-ink-800"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              className="mx-auto mt-20 w-full max-w-xl px-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={20} />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for sneakers, suede, sports..."
                  className="w-full rounded-2xl border border-ink-200 bg-white py-4 pl-12 pr-4 text-ink-900 shadow-xl outline-none transition focus:border-brand-500 dark:border-ink-700 dark:bg-ink-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800"
                >
                  <X size={18} />
                </button>
              </form>
              {suggestions.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-xl dark:border-ink-700 dark:bg-ink-900">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 border-b border-ink-100 p-3 transition last:border-0 hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-800"
                    >
                      <img src={p.images[0]} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-ink-500">{p.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-brand-600">{formatPrice(p.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-72 max-w-[80%] bg-white p-6 shadow-2xl dark:bg-ink-900"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-bold text-ink-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-2 text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition',
                        isActive
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                          : 'text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
                      )
                    }
                  >
                    {link.to === '/' ? <Home size={18} /> : <Grid3x3 size={18} />}
                    {link.label}
                  </NavLink>
                ))}
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                >
                  <Heart size={18} /> Wishlist
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
