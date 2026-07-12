import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 flex-col items-center gap-2 sm:left-auto sm:right-6 sm:translate-x-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="flex items-center gap-3 rounded-full bg-ink-900 py-2.5 pl-4 pr-3 text-white shadow-cardHover dark:bg-ink-800"
          >
            <CheckCircle2 size={18} className="text-green-400" />
            <span className="text-sm font-medium">{toast.message}</span>
            {toast.actionLabel && toast.actionLink && (
              <Link
                to={toast.actionLink}
                onClick={() => dismissToast(toast.id)}
                className="flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-brand-700"
              >
                <ShoppingBag size={12} /> {toast.actionLabel}
              </Link>
            )}
            <button onClick={() => dismissToast(toast.id)} className="ml-1 text-ink-400 transition hover:text-white">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function FlyToCart() {
  const { flyImage } = useStore();

  if (!flyImage) return null;

  const { src, from, to } = flyImage;
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  return (
    <motion.img
      src={src}
      className="pointer-events-none fixed z-[90] h-16 w-16 rounded-lg object-cover shadow-lg"
      style={{ left: from.left, top: from.top }}
      initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      animate={{ scale: 0.2, opacity: 0, x: dx, y: dy }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
    />
  );
}
