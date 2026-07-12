import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, ShoppingBag, Check, Heart, Truck, RotateCcw, ShieldCheck,
  Minus, Plus, ChevronRight as Crumb,
} from 'lucide-react';
import { colorHexMap } from '../data/products';
import { useStore } from '../context/StoreContext';
import { StarRating } from '../components/StarRating';
import { SizeSelector } from '../components/SizeSelector';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import { ProductDetailSkeleton, ErrorState } from '../components/Skeletons';
import { formatPrice, discountPercent, whatsappLink } from '../lib/utils';
import { cn } from '../lib/cn';
import { useProduct, useRelatedProducts } from '../lib/hooks';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, raw, status, error } = useProduct(id);
  const { products: related, status: relatedStatus } = useRelatedProducts(product?.category, product?.id);
  const { addToCart, toggleWishlist, isWishlisted, triggerFly } = useStore();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [shake, setShake] = useState(false);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setActiveImg(0);
    setSelectedSize(null);
    setSelectedColor(product?.colors[0] ?? '');
    setQuantity(1);
  }, [product?.id, product?.colors]);

  if (status === 'loading') return <ProductDetailSkeleton />;

  if (status === 'error' || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-20">
        <ErrorState message={error ?? 'Product not found'} />
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const discount = discountPercent(product.price, product.originalPrice);

  // Derive available colors for the currently selected size from raw variants
  const colorsForSize = selectedSize
    ? [...new Set((raw?.variants ?? []).filter((v) => v.size === selectedSize && v.stock_quantity > 0).map((v) => v.color))]
    : product.colors;

  // Ensure selectedColor is valid for the current size
  const effectiveColor = colorsForSize.includes(selectedColor) ? selectedColor : colorsForSize[0] ?? '';

  const handleAdd = () => {
    if (!selectedSize) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    const img = imgRef.current?.querySelector('img');
    const cartBtn = document.getElementById('cart-icon-btn');
    if (img && cartBtn) {
      triggerFly(img.src, img.getBoundingClientRect(), cartBtn.getBoundingClientRect());
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: effectiveColor,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoom) return;
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-px py-6">
        <nav className="flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <Crumb size={14} />
          <Link to="/shop" className="hover:text-brand-600">Shop</Link>
          <Crumb size={14} />
          <span className="truncate text-ink-900 dark:text-white">{product.name}</span>
        </nav>
      </div>

      <div className="container-px pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div
              ref={imgRef}
              className="relative aspect-square overflow-hidden rounded-3xl bg-ink-50 dark:bg-ink-800"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-200"
                style={zoom ? { transform: `scale(2)`, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-ink-900 backdrop-blur transition hover:bg-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-ink-900 backdrop-blur transition hover:bg-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">{product.badge}</span>
                )}
                {discount > 0 && (
                  <span className="rounded-full bg-ink-900 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-ink-900">-{discount}%</span>
                )}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      'h-20 w-20 overflow-hidden rounded-xl border-2 transition',
                      i === activeImg ? 'border-brand-600' : 'border-ink-200 hover:border-ink-400 dark:border-ink-700',
                    )}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-600">{product.category}</span>
              <h1 className="mt-1 font-display text-3xl font-bold text-ink-900 dark:text-white">{product.name}</h1>
              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={product.rating} size={18} showValue count={product.reviewsCount} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-ink-900 dark:text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-ink-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-600 dark:bg-brand-950">Save {discount}%</span>
              )}
            </div>

            <p className={cn(
              'inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
              product.stock === 'In Stock' ? 'bg-green-50 text-green-600 dark:bg-green-950/40' : product.stock === 'Low Stock' ? 'bg-gold-50 text-gold-700 dark:bg-gold-950/40' : 'bg-red-50 text-red-500',
            )}>
              <span className="h-2 w-2 rounded-full bg-current" /> {product.stock}
            </p>

            <p className="text-ink-600 dark:text-ink-300">{product.description}</p>

            <div>
              <span className="mb-2 block text-sm font-semibold text-ink-900 dark:text-white">Color: {effectiveColor}</span>
              <div className="flex gap-2.5">
                {colorsForSize.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={cn(
                      'h-9 w-9 rounded-full border-2 transition',
                      effectiveColor === c ? 'border-brand-600 ring-2 ring-brand-200' : 'border-ink-200 dark:border-ink-700',
                    )}
                    style={{ backgroundColor: colorHexMap[c] ?? '#ccc' }}
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

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-xl border border-ink-200 dark:border-ink-700">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center rounded-l-xl text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold text-ink-900 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="flex h-10 w-10 items-center justify-center rounded-r-xl text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1 text-base">
                {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingBag size={18} /> Add to Cart</>}
              </button>
              <button
                onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                className={cn(
                  'rounded-xl border p-3 transition',
                  wishlisted ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-200 text-ink-700 hover:border-brand-600 dark:border-ink-700 dark:text-ink-300',
                )}
              >
                <Heart size={20} className={wishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            <a
              href={whatsappLink(`Hi! I'm interested in the ${product.name} (${formatPrice(product.price)}). Is it available?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:underline"
            >
              Ask about this product on WhatsApp →
            </a>

            <div className="grid grid-cols-3 gap-3 border-t border-ink-100 pt-5 dark:border-ink-800">
              {[
                { icon: Truck, label: 'Free shipping over Rs. 5000' },
                { icon: RotateCcw, label: '7-day easy returns' },
                { icon: ShieldCheck, label: '100% authentic' },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <f.icon size={22} className="text-brand-600" />
                  <span className="text-xs text-ink-600 dark:text-ink-400">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedStatus === 'success' && related.length > 0 && (
          <div className="mt-16">
            <SectionHeading eyebrow="You May Also Like" title="Related Products" />
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={() => navigate(`/product/${p.id}`)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
