import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="font-display text-[120px] font-extrabold leading-none text-brand-600 sm:text-[180px]"
      >
        404
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Page Not Found</h1>
        <p className="mx-auto mt-2 max-w-sm text-ink-600 dark:text-ink-400">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-3">
        <Link to="/" className="btn-primary"><Home size={16} /> Go Home</Link>
        <Link to="/shop" className="btn-outline"><Search size={16} /> Browse Shop</Link>
      </motion.div>
    </div>
  );
}
