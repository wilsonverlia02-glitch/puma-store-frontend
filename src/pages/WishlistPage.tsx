import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { StarRating } from '../components/StarRating';
import { formatPrice } from '../lib/utils';

export function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const wishlistProducts = wishlist
    .map((w) => products.find((p) => p.id === w.productId))
    .filter(Boolean) as typeof products;

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
          <Heart size={32} className="text-ink-400" />
        </div>
        <div className="text-center">
          <p className="font-display text-xl font-bold text-ink-900 dark:text-white">Your wishlist is empty</p>
          <p className="mt-1 text-ink-500">Save your favorite sneakers for later.</p>
        </div>
        <Link to="/shop" className="btn-primary">Discover Sneakers <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-px py-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">My Wishlist</h1>
        <p className="mt-2 text-ink-600 dark:text-ink-400">{wishlistProducts.length} item(s) saved</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900"
            >
              <Link to={`/product/${p.id}`} className="relative block aspect-square overflow-hidden bg-ink-50 dark:bg-ink-800">
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${p.id}`}>
                  <h3 className="line-clamp-2 text-sm font-semibold text-ink-900 hover:text-brand-600 dark:text-white">{p.name}</h3>
                </Link>
                <div className="mt-1.5"><StarRating rating={p.rating} size={13} count={p.reviewsCount} /></div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-base font-bold text-ink-900 dark:text-white">{formatPrice(p.price)}</span>
                  {p.originalPrice && <span className="text-sm text-ink-400 line-through">{formatPrice(p.originalPrice)}</span>}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => addToCart({ productId: p.id, name: p.name, price: p.price, image: p.images[0], size: p.sizes[0], color: p.colors[0], quantity: 1 })}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink-900 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-white dark:text-ink-900"
                  >
                    <ShoppingBag size={15} /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="rounded-xl border border-ink-200 p-2.5 text-ink-400 transition hover:border-red-400 hover:text-red-500 dark:border-ink-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
