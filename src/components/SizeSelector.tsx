import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, X } from 'lucide-react';
import { sizeChart } from '../data/products';

interface SizeChartModalProps {
  open: boolean;
  onClose: () => void;
}

export function SizeChartModal({ open, onClose }: SizeChartModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-ink-900"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 dark:text-white">
                <Ruler size={20} className="text-brand-600" /> Size Chart
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-ink-400 transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-ink-100 dark:border-ink-800">
                    <th className="py-3 px-4 text-left font-semibold text-ink-900 dark:text-white">UK</th>
                    <th className="py-3 px-4 text-left font-semibold text-ink-900 dark:text-white">EUR</th>
                    <th className="py-3 px-4 text-left font-semibold text-ink-900 dark:text-white">US</th>
                    <th className="py-3 px-4 text-left font-semibold text-ink-900 dark:text-white">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row) => (
                    <tr
                      key={row.uk}
                      className="border-b border-ink-100 transition hover:bg-brand-50/50 dark:border-ink-800 dark:hover:bg-ink-800/40"
                    >
                      <td className="py-3 px-4 font-medium text-ink-900 dark:text-ink-100">{row.uk}</td>
                      <td className="py-3 px-4 text-ink-700 dark:text-ink-300">{row.eur}</td>
                      <td className="py-3 px-4 text-ink-700 dark:text-ink-300">{row.us}</td>
                      <td className="py-3 px-4 text-ink-700 dark:text-ink-300">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl bg-ink-50 p-4 dark:bg-ink-800/60">
              <h4 className="mb-2 text-sm font-semibold text-ink-900 dark:text-white">How to measure your foot size</h4>
              <ol className="list-inside list-decimal space-y-1 text-sm text-ink-600 dark:text-ink-300">
                <li>Place a blank sheet of paper on a flat surface against a wall.</li>
                <li>Stand on the paper with your heel touching the wall.</li>
                <li>Trace the outline of your foot with a pen held upright.</li>
                <li>Measure from the heel mark to the longest toe mark in centimeters.</li>
                <li>Compare the measurement to the Foot Length column above to find your size.</li>
              </ol>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SizeSelectorProps {
  sizes: string[];
  soldOutSizes?: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  shake?: boolean;
}

export function SizeSelector({ sizes, soldOutSizes = [], selected, onSelect, shake }: SizeSelectorProps) {
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-900 dark:text-white">Select Size (UK)</span>
        <button
          onClick={() => setChartOpen(true)}
          className="flex items-center gap-1 text-xs font-medium text-brand-600 transition hover:text-brand-700"
        >
          <Ruler size={14} /> Size Chart
        </button>
      </div>
      <motion.div
        className="flex flex-wrap gap-2"
        animate={shake ? { x: [0, -6, 6, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {sizes.map((size) => {
          const soldOut = soldOutSizes.includes(size);
          const isSelected = selected === size;
          return (
            <button
              key={size}
              disabled={soldOut}
              onClick={() => onSelect(size)}
              className={[
                'relative min-w-[3.5rem] rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                soldOut
                  ? 'cursor-not-allowed border-ink-100 bg-ink-50 text-ink-300 line-through dark:border-ink-800 dark:bg-ink-900 dark:text-ink-600'
                  : isSelected
                    ? 'border-brand-600 bg-brand-600 text-white shadow-glow'
                    : 'border-ink-200 text-ink-900 hover:border-ink-900 dark:border-ink-700 dark:text-ink-100 dark:hover:border-ink-200',
              ].join(' ')}
            >
              {size.replace('UK', 'UK ')}
            </button>
          );
        })}
      </motion.div>
      <SizeChartModal open={chartOpen} onClose={() => setChartOpen(false)} />
    </div>
  );
}
