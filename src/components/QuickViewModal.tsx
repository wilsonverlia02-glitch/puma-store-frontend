import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import type { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { StarRating } from './StarRating';
import { SizeSelector } from './SizeSelector';
import { formatPrice, discountPercent } from '../lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] ?? '');
  const [shake, setShake] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const discount = product ? discountPercent(product.price, product.originalPrice) : 0;
  const wishlisted = product ? isWishlisted(product.id) : false;

  const handleAdd = () => {
    if (!product || !selectedSize) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const colorHex: Record<string, string> = {
    White: '#ffffff', Black: '#111116', 'Dark Green': '#1f4d3a', 'Sky Blue': '#7ec8e3',
    Grey: '#9ca3af', Gold: '#d4af37', Navy: '#1e2a4a', Red: '#dc1818',
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-ink-900"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-2 text-ink-700 backdrop-blur transition hover:bg-white dark:bg-ink-800/80 dark:text-ink-200"
            >
              <X size={20} />
            </button>

            <div className="grid max-h-[85vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
              <div className="relative bg-ink-50 dark:bg-ink-800">
                <img src={product.images[activeImg]} alt={product.name} className="aspect-square w-full object-cover" />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink-900 backdrop-blur transition hover:bg-white"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink-900 backdrop-blur transition hover:bg-white"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {product.images.map((_, i) => (
                        <span key={i} className={`h-1.5 rounded-full transition-all ${i === activeImg ? 'w-5 bg-brand-600' : 'w-1.5 bg-ink-300'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-brand-600">{product.category}</span>
                  <h2 className="mt-1 font-display text-xl font-bold text-ink-900 dark:text-white">{product.name}</h2>
                  <div className="mt-2 flex items-center gap-3">
                    <StarRating rating={product.rating} size={16} showValue count={product.reviewsCount} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-ink-900 dark:text-white">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-base text-ink-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                  {discount > 0 && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-600 dark:bg-brand-950">Save {discount}%</span>}
                </div>

                <p className="text-sm text-ink-600 dark:text-ink-300">{product.description}</p>

                <div>
                  <span className="mb-2 block text-sm font-semibold text-ink-900 dark:text-white">Color: {selectedColor}</span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`h-8 w-8 rounded-full border-2 transition ${selectedColor === c ? 'border-brand-600 ring-2 ring-brand-200' : 'border-ink-200 dark:border-ink-700'}`}
                        style={{ backgroundColor: colorHex[c] ?? '#ccc' }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                <SizeSelector
                  sizes={product.sizes}
                  soldOutSizes={product.soldOutSizes}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                  shake={shake}
                />

                <div className="flex gap-3">
                  <button onClick={handleAdd} className="btn-primary flex-1">
                    {added ? <><Check size={18} /> Added!</> : <><ShoppingBag size={18} /> Add to Cart</>}
                  </button>
                  <button
                    onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                    className={`rounded-full border p-3 transition ${wishlisted ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-200 text-ink-700 hover:border-brand-600 dark:border-ink-700 dark:text-ink-300'}`}
                  >
                    <Heart size={20} className={wishlisted ? 'fill-current' : ''} />
                  </button>
                </div>

                <Link to={`/product/${product.id}`} onClick={onClose} className="text-center text-sm font-medium text-brand-600 hover:underline">
                  View full details →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


