export function formatPrice(amount: number): string {
  return 'Rs. ' + amount.toLocaleString('en-PK');
}

export function discountPercent(price: number, original?: number): number {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

export const WHATSAPP_NUMBER = '923001234567';
export const WHATSAPP_MESSAGE = "Hi! I'm interested in a Puma sneaker from your store.";

export function whatsappLink(message?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message ?? WHATSAPP_MESSAGE)}`;
}
