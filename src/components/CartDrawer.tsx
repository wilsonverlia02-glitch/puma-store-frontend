import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/utils';

export function CartDrawer() {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, cartSubtotal, cartCount } = useStore();

  const shipping = cartSubtotal > 0 ? (cartSubtotal >= 5000 ? 0 : 250) : 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={closeCart} />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-ink-900"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-ink-800">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900 dark:text-white">
                <ShoppingBag size={20} className="text-brand-600" />
                Your Cart
                <span className="text-sm font-normal text-ink-400">({cartCount})</span>
              </h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
                  <ShoppingBag size={32} className="text-ink-400" />
                </div>
                <div>
                  <p className="font-semibold text-ink-900 dark:text-white">Your cart is empty</p>
                  <p className="mt-1 text-sm text-ink-500">Add some sneakers to get started.</p>
                </div>
                <Link to="/shop" onClick={closeCart} className="btn-primary">
                  Browse Shop <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="flex flex-col gap-4">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, x: 60, height: 0 }}
                          className="flex gap-3 rounded-2xl border border-ink-100 p-3 dark:border-ink-800"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                          />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="line-clamp-2 text-sm font-semibold text-ink-900 dark:text-white">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex-shrink-0 rounded-lg p-1 text-ink-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="mt-0.5 text-xs text-ink-500">
                              Size: {item.size.replace('UK', 'UK ')} · Color: {item.color}
                            </p>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center gap-1 rounded-lg border border-ink-200 dark:border-ink-700">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-7 text-center text-sm font-semibold text-ink-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <span className="text-sm font-bold text-brand-600">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="border-t border-ink-100 px-5 py-4 dark:border-ink-800">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-ink-600 dark:text-ink-300">
                      <span>Subtotal</span>
                      <span className="font-semibold text-ink-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ink-600 dark:text-ink-300">
                      <span>Shipping</span>
                      <span className="font-semibold text-ink-900 dark:text-white">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="rounded-lg bg-gold-50 px-3 py-1.5 text-xs text-gold-800 dark:bg-gold-950/40 dark:text-gold-300">
                        Add {formatPrice(5000 - cartSubtotal)} more for free shipping
                      </p>
                    )}
                    <div className="flex justify-between border-t border-ink-100 pt-2 text-base dark:border-ink-800">
                      <span className="font-bold text-ink-900 dark:text-white">Total</span>
                      <span className="font-bold text-brand-600">{formatPrice(cartSubtotal + shipping)}</span>
                    </div>
                  </div>
                  <Link to="/checkout" onClick={closeCart} className="btn-primary mt-4 w-full">
                    Proceed to Checkout <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="mt-2 block text-center text-sm font-medium text-ink-500 transition hover:text-ink-900 dark:hover:text-white"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
