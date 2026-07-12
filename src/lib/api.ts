const API_URL = import.meta.env.VITE_API_URL || 'https://hot-oranges-thank.loca.lt/api';

const DEFAULT_HEADERS: Record<string, string> = {
  'Bypass-Tunnel-Reminder': 'true',
  'Content-Type': 'application/json',
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...DEFAULT_HEADERS, ...options?.headers },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || body.error || message;
    } catch {
      // not JSON
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

// ---- Backend types ----

export interface ApiVariant {
  id: number;
  size: string;
  color: string;
  stock_quantity: number;
}

export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  original_price?: number | null;
  category: string;
  description: string;
  badge?: string | null;
  rating?: number;
  reviews_count?: number;
  images: string[];
  variants: ApiVariant[];
}

export interface ProductsResponse {
  success: boolean;
  products: ApiProduct[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

export interface SingleProductResponse {
  success: boolean;
  product: ApiProduct;
}

export interface OrderItemPayload {
  product_id: number;
  size: string;
  color: string;
  quantity: number;
}

export interface CreateOrderResponse {
  success: boolean;
  order: { orderNumber: string; totalAmount: number; paymentMethod: string };
}

export interface ApiTestimonial {
  id: number;
  customer_name: string;
  rating: number;
  review_text: string;
  avatar_url: string;
  created_at: string;
}

export interface TestimonialsResponse {
  success: boolean;
  testimonials: ApiTestimonial[];
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// ---- API functions ----

export interface ProductQuery {
  category?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export function fetchProducts(params: ProductQuery = {}): Promise<ProductsResponse> {
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  if (params.color) q.set('color', params.color);
  if (params.size) q.set('size', params.size);
  if (params.minPrice != null) q.set('minPrice', String(params.minPrice));
  if (params.maxPrice != null) q.set('maxPrice', String(params.maxPrice));
  if (params.search) q.set('search', params.search);
  if (params.sort && params.sort !== 'popular') q.set('sort', params.sort);
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  const qs = q.toString();
  return request<ProductsResponse>(`/products${qs ? `?${qs}` : ''}`);
}

export function fetchProduct(id: number | string): Promise<SingleProductResponse> {
  return request<SingleProductResponse>(`/products/${id}`);
}

export function createOrder(payload: {
  name: string;
  email?: string;
  phone: string;
  address: string;
  payment_method: 'card' | 'cod';
  items: OrderItemPayload[];
}): Promise<CreateOrderResponse> {
  return request<CreateOrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchTestimonials(): Promise<TestimonialsResponse> {
  return request<TestimonialsResponse>('/testimonials');
}

export function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  return request<ContactResponse>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
}

export interface CategoriesResponse {
  success: boolean;
  categories: ApiCategory[];
}

export function fetchCategories(): Promise<CategoriesResponse> {
  return request<CategoriesResponse>('/categories');
}