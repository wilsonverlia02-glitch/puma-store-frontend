import type { ApiProduct, ApiTestimonial } from './api';
import type { Product, Review } from '../data/products';

export function transformProduct(api: ApiProduct): Product {
  const variants = api.variants ?? [];

  const allColors = [...new Set(variants.map((v) => v.color))];
  const allSizes = [...new Set(variants.map((v) => v.size))];
  const soldOutSizes = [...new Set(variants.filter((v) => v.stock_quantity <= 0).map((v) => v.size))];

  const totalStock = variants.reduce((sum, v) => sum + (v.stock_quantity ?? 0), 0);
  const stock: Product['stock'] =
    totalStock <= 0 ? 'Sold Out' : totalStock <= 10 ? 'Low Stock' : 'In Stock';

  return {
    id: api.id,
    name: api.name,
    price: api.price,
    originalPrice: api.original_price ?? undefined,
    category: api.category,
    colors: allColors,
    sizes: allSizes,
    soldOutSizes,
    images: api.images?.length ? api.images : ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=900'],
    description: api.description ?? '',
    stock,
    badge: api.badge ?? '',
    rating: api.rating ?? 4.5,
    reviewsCount: api.reviews_count ?? 0,
    reviews: [],
  };
}

export function transformTestimonial(api: ApiTestimonial): Review & { avatar: string } {
  return {
    id: `t${api.id}`,
    name: api.customer_name,
    rating: api.rating,
    date: api.created_at?.slice(0, 10) ?? '',
    text: api.review_text,
    avatar: api.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  };
}
