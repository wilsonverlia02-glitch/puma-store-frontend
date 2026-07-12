import { NavLink } from 'react-router-dom';
import { Home, Grid3x3, ShoppingBag, Heart, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { cn } from '../lib/cn';

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/shop', label: 'Shop', icon: Grid3x3 },
  { to: '/cart', label: 'Cart', icon: ShoppingBag },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/account', label: 'Account', icon: User },
];

export function MobileBottomNav() {
  const { cartCount, wishlist } = useStore();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur-md lg:hidden dark:border-ink-800 dark:bg-ink-950/95">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const badge = item.to === '/cart' ? cartCount : item.to === '/wishlist' ? wishlist.length : 0;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition',
                  isActive ? 'text-brand-600' : 'text-ink-500 dark:text-ink-400',
                )
              }
            >
              <Icon size={20} />
              {badge > 0 && (
                <span className="absolute right-1 top-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">
                  {badge}
                </span>
              )}
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
