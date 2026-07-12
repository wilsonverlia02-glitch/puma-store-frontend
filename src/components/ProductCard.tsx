import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import type { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice, discountPercent } from '../lib/utils';
import { cn } from '../lib/cn';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, triggerFly } = useStore();
  const [selectedSize] = useState<string>(
    () => product.sizes.find((s) => !product.soldOutSizes?.includes(s)) ?? '',
  );
  const [shake, setShake] = useState(false);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const wishlisted = isWishlisted(product.id);

  const badgeColor: Record<string, string> = {
    'Best Seller': 'bg-brand-600 text-white',
    'New Arrival': 'bg-gold-500 text-ink-900',
  };

  const validateSize = () => {
    if (!selectedSize) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return false;
    }
    return true;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validateSize()) return;
    const card = cardRef.current;
    const cartBtn = document.getElementById('cart-icon-btn');
    if (card && cartBtn) {
      const img = card.querySelector('img[data-product-img]') as HTMLImageElement | null;
      if (img) {
        triggerFly(img.src, img.getBoundingClientRect(), cartBtn.getBoundingClientRect());
      }
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: product.colors[0],
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validateSize()) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: product.colors[0],
      quantity: 1,
    });
    navigate('/checkout');
  };

  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all hover:shadow-cardHover dark:border-ink-800 dark:bg-ink-900"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-ink-50 dark:bg-ink-800">
        <img
          data-product-img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', badgeColor[product.badge] ?? 'bg-ink-900 text-white')}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-ink-900 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-ink-900">
              -{discount}%
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
          }}
          className={cn(
            'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all',
            wishlisted ? 'bg-brand-600 text-white' : 'bg-white/80 text-ink-700 hover:bg-white hover:text-brand-600',
          )}
          aria-label="Add to wishlist"
        >
          <Heart size={18} className={cn(wishlisted && 'fill-current')} />
        </button>
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-12 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </button>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-center">
          <Link to={`/product/${product.id}`}>
            <h3 className="truncate text-base font-semibold text-ink-900 transition hover:text-brand-600 dark:text-white">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 flex items-center justify-center gap-2">
            {product.originalPrice && (
              <span className="text-sm text-ink-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            <span className={cn('text-base font-bold', product.originalPrice ? 'text-brand-600' : 'text-ink-900 dark:text-white')}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <motion.div
          className="mt-3 flex items-center gap-2"
          animate={shake ? { x: [0, -6, 6, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={handleBuyNow}
            className="flex-1 rounded-xl bg-brand-600 py-2.5 text-base font-semibold text-white transition-all hover:bg-brand-700 active:scale-95"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white transition-all hover:bg-brand-600 active:scale-95 dark:bg-white dark:text-ink-900 dark:hover:bg-brand-600 dark:hover:text-white"
          >
            {added ? <Check size={19} /> : <ShoppingBag size={19} />}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}