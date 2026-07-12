import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Search, ChevronDown, LayoutGrid } from 'lucide-react';
import { colorOptions, allSizes, colorHexMap, type Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { ProductGridSkeleton, ErrorState } from '../components/Skeletons';
import { formatPrice } from '../lib/utils';
import { cn } from '../lib/cn';
import { useProducts, useCategories, type ProductQuery } from '../lib/hooks';

const sortOptions = [
  { value: 'popular', label: 'Popularity' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

const MAX_PRICE = 10000;

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(MAX_PRICE);
  const [sort, setSort] = useState('popular');
  const [query, setQuery] = useState('');

  const { categories: categoryOptions } = useCategories();

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    const s = searchParams.get('sort');
    if (cat) setSelectedCategories([cat]);
    if (q) setQuery(q);
    if (s) setSort(s);
  }, [searchParams]);

  const apiQuery: ProductQuery = useMemo(
    () => ({
      category: selectedCategories.length ? selectedCategories.join(',') : undefined,
      color: selectedColors.length ? selectedColors.join(',') : undefined,
      size: selectedSizes.length ? selectedSizes.join(',') : undefined,
      maxPrice: priceRange < MAX_PRICE ? priceRange : undefined,
      search: query || undefined,
      sort: sort !== 'popular' ? sort : undefined,
      page,
      limit: 12,
    }),
    [selectedCategories, selectedColors, selectedSizes, priceRange, query, sort, page],
  );

  const { products, pagination, status, error } = useProducts(apiQuery);

  useEffect(() => { setPage(1); }, [selectedCategories, selectedColors, selectedSizes, priceRange, sort, query]);

  const toggleArray = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const activeFilters =
    selectedCategories.length + selectedColors.length + selectedSizes.length + (priceRange < MAX_PRICE ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange(MAX_PRICE);
    setQuery('');
    setSearchParams({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900 dark:text-white">Category</h3>
        <div className="space-y-2">
          {categoryOptions.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleArray(selectedCategories, setSelectedCategories, cat)}
                className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-ink-700 dark:text-ink-300">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900 dark:text-white">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggleArray(selectedColors, setSelectedColors, c)}
              className={cn(
                'h-8 w-8 rounded-full border-2 transition',
                selectedColors.includes(c) ? 'border-brand-600 ring-2 ring-brand-200' : 'border-ink-200 dark:border-ink-700',
              )}
              style={{ backgroundColor: colorHexMap[c] ?? '#ccc' }}
              title={c}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900 dark:text-white">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleArray(selectedSizes, setSelectedSizes, s)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition',
                selectedSizes.includes(s)
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-ink-200 text-ink-700 hover:border-ink-900 dark:border-ink-700 dark:text-ink-300',
              )}
            >
              {s.replace('UK', 'UK ')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900 dark:text-white">Price Range</h3>
        <input
          type="range"
          min={2000}
          max={MAX_PRICE}
          step={100}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-2 flex justify-between text-sm text-ink-600 dark:text-ink-400">
          <span>Rs. 2,000</span>
          <span className="font-semibold text-brand-600">Up to {formatPrice(priceRange)}</span>
        </div>
      </div>

      {activeFilters > 0 && (
        <button onClick={clearAll} className="w-full rounded-xl border border-ink-200 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800">
          Clear All Filters ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-16 lg:pt-20">
      <div className="border-b border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/40">
        <div className="container-px py-8">
          <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">Shop All Sneakers</h1>
          <p className="mt-2 text-ink-600 dark:text-ink-400">
            {status === 'success' ? `${pagination.total} products available` : 'Loading products...'}
          </p>
        </div>
      </div>

      <div className="container-px py-8">
        <div className="flex gap-8">
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <div className="mb-4 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-brand-600" />
                <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 sm:max-w-xs">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 dark:border-ink-700 dark:bg-ink-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-700 lg:hidden dark:border-ink-700 dark:text-ink-300"
                >
                  <SlidersHorizontal size={16} /> Filters {activeFilters > 0 && `(${activeFilters})`}
                </button>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-full border border-ink-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-ink-700 outline-none transition focus:border-brand-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
                </div>
              </div>
            </div>

            {status === 'loading' && <ProductGridSkeleton count={8} />}

            {status === 'error' && <ErrorState message={error ?? 'Failed to load products'} onRetry={clearAll} />}

            {status === 'success' && products.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
                  <LayoutGrid size={32} className="text-ink-400" />
                </div>
                <div>
                  <p className="font-semibold text-ink-900 dark:text-white">No products found</p>
                  <p className="mt-1 text-sm text-ink-500">Try adjusting your filters.</p>
                </div>
                <button onClick={clearAll} className="btn-outline">Clear Filters</button>
              </div>
            )}

            {status === 'success' && products.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} onQuickView={setQuickView} index={i} />
                  ))}
                </div>

                {page < pagination.totalPages && (
                  <div className="mt-10 text-center">
                    <button onClick={() => setPage((p) => p + 1)} className="btn-outline">
                      Load More ({pagination.total - page * pagination.limit} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
            <motion.div
              className="absolute left-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white p-6 shadow-2xl dark:bg-ink-900"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} className="rounded-full p-2 text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800">
                  <X size={20} />
                </button>
              </div>
              <FilterContent />
              <button onClick={() => setFiltersOpen(false)} className="btn-primary mt-6 w-full">
                Show {pagination.total} Results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}