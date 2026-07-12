import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../lib/utils';

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 sm:h-14 sm:w-14 lg:bottom-6 lg:right-6"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', damping: 14 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-30" />
      <MessageCircle size={24} className="relative sm:hidden" />
      <MessageCircle size={28} className="relative hidden sm:block" />
    </motion.a>
  );
}