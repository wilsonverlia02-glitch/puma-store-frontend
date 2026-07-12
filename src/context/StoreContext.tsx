import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  addedAt: number;
}

export interface Toast {
  id: number;
  message: string;
  actionLabel?: string;
  actionLink?: string;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: WishlistItem[];
  toasts: Toast[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleWishlist: (product: { id: number; name: string; price: number; image: string }) => void;
  isWishlisted: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: number) => void;
  flyImage: { src: string; from: DOMRect; to: DOMRect } | null;
  triggerFly: (src: string, from: DOMRect, to: DOMRect) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = 'puma_cart';
const WISH_KEY = 'puma_wishlist';

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadStored<CartItem[]>(CART_KEY, []));
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => loadStored<WishlistItem[]>(WISH_KEY, []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyImage, setFlyImage] = useState<{ src: string; from: DOMRect; to: DOMRect } | null>(null);
  const toastId = useState(() => ({ n: 0 }))[0];

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = ++toastId.n;
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => dismissToast(id), 3800);
    },
    [dismissToast, toastId],
  );

  const triggerFly = useCallback((src: string, from: DOMRect, to: DOMRect) => {
    setFlyImage({ src, from, to });
    setTimeout(() => setFlyImage(null), 700);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, 'id'>) => {
      setCart((prev) => {
        const existing = prev.find(
          (c) => c.productId === item.productId && c.size === item.size && c.color === item.color,
        );
        if (existing) {
          return prev.map((c) =>
            c.id === existing.id ? { ...c, quantity: c.quantity + item.quantity } : c,
          );
        }
        return [...prev, { ...item, id: Date.now() + Math.random() }];
      });
      pushToast({
        message: `${item.name} added to cart`,
        actionLabel: 'View Cart',
        actionLink: '/cart',
      });
    },
    [pushToast],
  );

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity } : c)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const toggleWishlist = useCallback(
    (product: { id: number; name: string; price: number; image: string }) => {
      setWishlist((prev) => {
        if (prev.some((w) => w.productId === product.id)) {
          pushToast({ message: 'Removed from wishlist' });
          return prev.filter((w) => w.productId !== product.id);
        }
        pushToast({ message: `${product.name} added to wishlist`, actionLabel: 'View', actionLink: '/wishlist' });
        return [
          { productId: product.id, name: product.name, price: product.price, image: product.image, addedAt: Date.now() },
          ...prev,
        ];
      });
    },
    [pushToast],
  );

  const isWishlisted = useCallback((productId: number) => wishlist.some((w) => w.productId === productId), [wishlist]);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((prev) => prev.filter((w) => w.productId !== productId));
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, c) => sum + c.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, c) => sum + c.price * c.quantity, 0), [cart]);

  const value: StoreContextValue = {
    cart,
    wishlist,
    toasts,
    cartCount,
    cartSubtotal,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleWishlist,
    isWishlisted,
    removeFromWishlist,
    pushToast,
    dismissToast,
    flyImage,
    triggerFly,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
