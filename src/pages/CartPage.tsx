import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, Tag, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/utils';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, clearCart } = useStore();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [error, setError] = useState('');

  const discount = couponApplied ? Math.round(cartSubtotal * 0.2) : 0;
  const shipping = cartSubtotal > 0 ? (cartSubtotal >= 5000 ? 0 : 250) : 0;
  const total = cartSubtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'PUMA20') {
      setCouponApplied(true);
      setError('');
    } else {
      setError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
          <ShoppingBag size={32} className="text-ink-400" />
        </div>
        <div className="text-center">
          <p className="font-display text-xl font-bold text-ink-900 dark:text-white">Your cart is empty</p>
          <p className="mt-1 text-ink-500">Looks like you haven't added anything yet.</p>
        </div>
        <Link to="/shop" className="btn-primary">Start Shopping <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-px py-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">Shopping Cart</h1>
        <p className="mt-2 text-ink-600 dark:text-ink-400">{cart.length} item(s) in your cart</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-4 rounded-2xl border border-ink-100 p-4 dark:border-ink-800"
                  >
                    <img src={item.image} alt={item.name} className="h-28 w-28 flex-shrink-0 rounded-xl object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/product/${item.productId}`} className="font-semibold text-ink-900 hover:text-brand-600 dark:text-white">
                          {item.name}
                        </Link>
                        <button onClick={() => removeFromCart(item.id)} className="rounded-lg p-1.5 text-ink-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-ink-500">Size: {item.size.replace('UK', 'UK ')} · Color: {item.color}</p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-1 rounded-lg border border-ink-200 dark:border-ink-700">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold text-ink-900 dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-lg font-bold text-brand-600">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link to="/shop" className="text-sm font-medium text-brand-600 hover:underline">← Continue Shopping</Link>
              <button onClick={clearCart} className="text-sm font-medium text-ink-500 transition hover:text-red-500">Clear Cart</button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-ink-100 p-6 dark:border-ink-800">
              <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white">Order Summary</h2>
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full rounded-xl border border-ink-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-500 dark:border-ink-700 dark:bg-ink-900 dark:text-white"
                  />
                </div>
                <button onClick={applyCoupon} className="rounded-xl bg-ink-900 px-4 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-white dark:text-ink-900">
                  Apply
                </button>
              </div>
              {couponApplied && <p className="mt-2 flex items-center gap-1 text-sm text-green-600"><CheckCircle2 size={14} /> Coupon PUMA20 applied — 20% off!</p>}
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              <p className="mt-2 text-xs text-ink-400">Try code: PUMA20</p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-ink-600 dark:text-ink-300">
                  <span>Subtotal</span><span className="font-semibold text-ink-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (20%)</span><span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-ink-600 dark:text-ink-300">
                  <span>Shipping</span><span className="font-semibold text-ink-900 dark:text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-ink-100 pt-3 text-base dark:border-ink-800">
                  <span className="font-bold text-ink-900 dark:text-white">Total</span>
                  <span className="font-bold text-brand-600">{formatPrice(total)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary mt-5 w-full">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
