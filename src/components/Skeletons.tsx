import { AlertCircle, RefreshCw } from 'lucide-react';

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="skeleton aspect-square w-full" />
      <div className="p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton mt-2 h-3 w-1/2 rounded" />
        <div className="skeleton mt-3 h-5 w-1/3 rounded" />
        <div className="skeleton mt-3 h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}

export function ProductCarouselSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-64 flex-shrink-0 sm:w-72">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-px pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="skeleton aspect-square w-full rounded-3xl" />
            <div className="flex gap-3">
              <div className="skeleton h-20 w-20 rounded-xl" />
              <div className="skeleton h-20 w-20 rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-9 w-3/4 rounded" />
            <div className="skeleton h-6 w-32 rounded" />
            <div className="skeleton h-8 w-40 rounded" />
            <div className="skeleton h-24 w-full rounded" />
            <div className="skeleton h-10 w-full rounded-xl" />
            <div className="skeleton h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
      <AlertCircle size={32} className="text-red-500" />
      <div>
        <p className="font-semibold text-red-700 dark:text-red-400">Something went wrong</p>
        <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/70">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline">
          <RefreshCw size={16} /> Try Again
        </button>
      )}
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-card dark:bg-ink-900">
      <div className="skeleton h-5 w-28 rounded" />
      <div className="skeleton mt-4 h-6 w-full rounded" />
      <div className="skeleton mt-2 h-6 w-5/6 rounded" />
      <div className="mt-6 flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-full" />
        <div>
          <div className="skeleton h-4 w-28 rounded" />
          <div className="skeleton mt-1.5 h-3 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}
