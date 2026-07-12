import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Banknote, Check, CheckCircle2, Lock, ArrowRight, Truck, ShoppingBag, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/utils';
import { cn } from '../lib/cn';
import { createOrder } from '../lib/api';

interface ShippingForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useStore();
  const [payment, setPayment] = useState<'card' | 'cod'>('card');
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderError, setOrderError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ShippingForm>({ name: '', email: '', phone: '', address: '', city: '', postalCode: '' });
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});

  const shipping = cartSubtotal >= 5000 ? 0 : 250;
  const tax = Math.round(cartSubtotal * 0.05);
  const total = cartSubtotal + shipping + tax;

  const validate = () => {
    const e: Partial<ShippingForm> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10,}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Valid phone required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.postalCode.trim()) e.postalCode = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setOrderError('');
    try {
      const res = await createOrder({
        name: form.name,
        email: form.email || undefined,
        phone: form.phone,
        address: form.address,
        payment_method: payment,
        items: cart.map((item) => ({
          product_id: item.productId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        })),
      });
      setOrderId(res.order.orderNumber);
      setOrderTotal(res.order.totalAmount);
      setPlaced(true);
      clearCart();
      window.scrollTo(0, 0);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center pt-20">
        <motion.div
          className="mx-auto max-w-lg rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card dark:border-ink-800 dark:bg-ink-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <motion.div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 12, stiffness: 200 }}
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <CheckCircle2 size={48} className="text-green-600" />
            </motion.div>
          </motion.div>
          <h1 className="mt-6 font-display text-2xl font-bold text-ink-900 dark:text-white">Order Confirmed!</h1>
          <p className="mt-2 text-ink-600 dark:text-ink-400">Thank you for your purchase. Your order has been placed successfully.</p>
          <div className="mt-5 rounded-2xl bg-ink-50 p-4 dark:bg-ink-800">
            <p className="text-sm text-ink-500">Order Number</p>
            <p className="font-display text-xl font-bold text-brand-600">{orderId}</p>
            {orderTotal > 0 && (
              <>
                <p className="mt-2 text-sm text-ink-500">Total Amount</p>
                <p className="font-display text-xl font-bold text-ink-900 dark:text-white">{formatPrice(orderTotal)}</p>
              </>
            )}
          </div>
          <p className="mt-4 text-sm text-ink-500">A confirmation email has been sent to {form.email}</p>
          <div className="mt-6 flex gap-3">
            <Link to="/shop" className="btn-primary flex-1">Continue Shopping <ArrowRight size={16} /></Link>
            <Link to="/" className="btn-outline flex-1">Go Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
          <ShoppingBag size={32} className="text-ink-400" />
        </div>
        <p className="font-display text-xl font-bold text-ink-900 dark:text-white">Nothing to checkout</p>
        <Link to="/shop" className="btn-primary">Browse Products <ArrowRight size={16} /></Link>
      </div>
    );
  }

  const inputClass = (field: keyof ShippingForm) => cn(
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-500 dark:bg-ink-900 dark:text-white',
    errors[field] ? 'border-red-400' : 'border-ink-200 dark:border-ink-700',
  );

  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-px py-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">Checkout</h1>
        <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-ink-100 p-6 dark:border-ink-800">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink-900 dark:text-white">
                <Truck size={20} className="text-brand-600" /> Shipping Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} placeholder="John Doe" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} placeholder="john@email.com" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} placeholder="03001234567" />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Address</label>
                  <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass('address')} placeholder="House #, Street, Area" />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">City</label>
                  <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass('city')} placeholder="Karachi" />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-700 dark:text-ink-300">Postal Code</label>
                  <input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className={inputClass('postalCode')} placeholder="74000" />
                  {errors.postalCode && <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-100 p-6 dark:border-ink-800">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink-900 dark:text-white">
                <Lock size={20} className="text-brand-600" /> Payment Method
              </h2>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPayment('card')}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition',
                    payment === 'card' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/20' : 'border-ink-200 dark:border-ink-700',
                  )}
                >
                  <CreditCard size={22} className={payment === 'card' ? 'text-brand-600' : 'text-ink-400'} />
                  <div className="flex-1">
                    <p className="font-semibold text-ink-900 dark:text-white">Credit / Debit Card</p>
                    <p className="text-sm text-ink-500">Visa, Mastercard. Secure payment.</p>
                  </div>
                  <div className={cn('flex h-5 w-5 items-center justify-center rounded-full border-2', payment === 'card' ? 'border-brand-600 bg-brand-600' : 'border-ink-300')}>
                    {payment === 'card' && <Check size={12} className="text-white" />}
                  </div>
                </button>

                <AnimatePresence>
                  {payment === 'card' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 rounded-xl bg-ink-50 p-4 dark:bg-ink-800/60">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-ink-600 dark:text-ink-400">Card Number</label>
                          <input placeholder="4242 4242 4242 4242" className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm dark:border-ink-700 dark:bg-ink-900 dark:text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-ink-600 dark:text-ink-400">Expiry</label>
                            <input placeholder="MM/YY" className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm dark:border-ink-700 dark:bg-ink-900 dark:text-white" />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-ink-600 dark:text-ink-400">CVV</label>
                            <input placeholder="123" className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm dark:border-ink-700 dark:bg-ink-900 dark:text-white" />
                          </div>
                        </div>
                        <p className="text-xs text-ink-400">Demo only — no real payment is processed.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setPayment('cod')}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition',
                    payment === 'cod' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/20' : 'border-ink-200 dark:border-ink-700',
                  )}
                >
                  <Banknote size={22} className={payment === 'cod' ? 'text-brand-600' : 'text-ink-400'} />
                  <div className="flex-1">
                    <p className="font-semibold text-ink-900 dark:text-white">Cash on Delivery</p>
                    <p className="text-sm text-ink-500">Pay when you receive your order.</p>
                  </div>
                  <div className={cn('flex h-5 w-5 items-center justify-center rounded-full border-2', payment === 'cod' ? 'border-brand-600 bg-brand-600' : 'border-ink-300')}>
                    {payment === 'cod' && <Check size={12} className="text-white" />}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-ink-100 p-6 dark:border-ink-800">
              <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white">Order Summary</h2>
              <div className="mt-4 max-h-48 space-y-3 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">{item.quantity}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-ink-500">{item.size.replace('UK', 'UK ')} · {item.color}</p>
                    </div>
                    <span className="text-sm font-semibold text-ink-900 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm dark:border-ink-800">
                <div className="flex justify-between text-ink-600 dark:text-ink-300">
                  <span>Subtotal</span><span className="font-semibold text-ink-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-600 dark:text-ink-300">
                  <span>Shipping</span><span className="font-semibold text-ink-900 dark:text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-ink-600 dark:text-ink-300">
                  <span>Tax (5%)</span><span className="font-semibold text-ink-900 dark:text-white">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-ink-100 pt-2 text-base dark:border-ink-800">
                  <span className="font-bold text-ink-900 dark:text-white">Total</span>
                  <span className="font-bold text-brand-600">{formatPrice(total)}</span>
                </div>
              </div>
              {orderError && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{orderError}</span>
                </div>
              )}
              <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full text-base">
                {submitting ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <>{payment === 'cod' ? 'Place Order' : 'Pay & Place Order'} <ArrowRight size={18} /></>
                )}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-ink-400">
                <Lock size={12} /> Secure checkout
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
