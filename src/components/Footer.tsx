import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { whatsappLink } from '../lib/utils';

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-950">
      <div className="container-px py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-display text-lg font-extrabold text-white">
                P
              </span>
              <span className="font-display text-lg font-extrabold text-ink-900 dark:text-white">
                PUMA<span className="text-brand-600"> SPORTS</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-ink-600 dark:text-ink-400">
              Premium Puma sneakers, suede, and sports footwear. Step into style with authentic quality.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white p-2.5 text-ink-700 shadow-sm transition hover:bg-brand-600 hover:text-white dark:bg-ink-800 dark:text-ink-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white p-2.5 text-ink-700 shadow-sm transition hover:bg-brand-600 hover:text-white dark:bg-ink-800 dark:text-ink-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white p-2.5 text-ink-700 shadow-sm transition hover:bg-brand-600 hover:text-white dark:bg-ink-800 dark:text-ink-300" aria-label="TikTok">
                <Twitter size={18} />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white p-2.5 text-ink-700 shadow-sm transition hover:bg-green-500 hover:text-white dark:bg-ink-800 dark:text-ink-300" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">All Products</Link></li>
              <li><Link to="/shop?category=Sneakers" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">Sneakers</Link></li>
              <li><Link to="/shop?category=Suede+Collection" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">Suede Collection</Link></li>
              <li><Link to="/shop?category=Sports" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">Sports Shoes</Link></li>
              <li><Link to="/shop?sort=newest" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white">Help</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">Contact Us</Link></li>
              <li><Link to="/about" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">About Us</Link></li>
              <li><Link to="/cart" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">Your Cart</Link></li>
              <li><Link to="/wishlist" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">Wishlist</Link></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-ink-600 transition hover:text-brand-600 dark:text-ink-400">WhatsApp Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white">Store Info</h3>
            <ul className="space-y-3 text-sm text-ink-600 dark:text-ink-400">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-600" /> 123 Street Road, Karachi, Pakistan</li>
              <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 flex-shrink-0 text-brand-600" /> +92 300 1234567</li>
              <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 flex-shrink-0 text-brand-600" /> support@pumasports.pk</li>
              <li className="flex items-start gap-2"><Clock size={16} className="mt-0.5 flex-shrink-0 text-brand-600" /> Mon–Sat: 10am – 9pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-6 dark:border-ink-800 sm:flex-row">
          <p className="text-sm text-ink-500 dark:text-ink-400">
            © {new Date().getFullYear()} Puma Sports Store. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-400">We accept:</span>
            <div className="flex gap-2">
              {['VISA', 'Mastercard', 'COD'].map((m) => (
                <span key={m} className="rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-bold text-ink-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
