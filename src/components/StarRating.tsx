import { Star } from 'lucide-react';
import { cn } from '../lib/cn';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  count?: number;
}

export function StarRating({ rating, size = 16, className, showValue, count }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < Math.ceil(rating);
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled || half ? 'text-gold-400' : 'text-ink-200 dark:text-ink-700',
                filled && 'fill-gold-400',
                half && 'fill-gold-400',
              )}
            />
          );
        })}
      </div>
      {showValue && <span className="text-sm font-medium text-ink-600 dark:text-ink-300">{rating.toFixed(1)}</span>}
      {typeof count === 'number' && (
        <span className="text-xs text-ink-400 dark:text-ink-500">({count})</span>
      )}
    </div>
  );
}
