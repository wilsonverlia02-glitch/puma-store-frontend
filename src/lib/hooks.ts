import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchProducts,
  fetchProduct,
  fetchTestimonials,
  fetchCategories, 
  type ProductQuery,
  type ApiProduct,
  type ApiTestimonial,
} from './api';
import { transformProduct, transformTestimonial } from './transformers';
import type { Product } from '../data/products';
export type { ProductQuery };

type Status = 'idle' | 'loading' | 'success' | 'error';

// ---- Products list (Shop page) ----

export function useProducts(query: ProductQuery) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 0 });
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const seqRef = useRef(0);

  useEffect(() => {
    const seq = ++seqRef.current;
    setStatus('loading');
    setError(null);
    fetchProducts(query)
      .then((res) => {
        if (seq !== seqRef.current) return;
        setProducts(res.products.map(transformProduct));
        setPagination(res.pagination);
        setStatus('success');
      })
      .catch((e) => {
        if (seq !== seqRef.current) return;
        setError(e instanceof Error ? e.message : 'Failed to load products');
        setStatus('error');
      });
  }, [JSON.stringify(query)]);

  return { products, pagination, status, error };
}

// ---- Single product (Detail page) ----

export function useProduct(id: number | string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [raw, setRaw] = useState<ApiProduct | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id == null) return;
    let active = true;
    setStatus('loading');
    setError(null);
    fetchProduct(id)
      .then((res) => {
        if (!active) return;
        setRaw(res.product);
        setProduct(transformProduct(res.product));
        setStatus('success');
      })
      .catch((e) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Failed to load product');
        setStatus('error');
      });
    return () => { active = false; };
  }, [id]);

  return { product, raw, status, error };
}

// ---- Testimonials (Home page) ----

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchTestimonials()
      .then((res) => {
        if (!active) return;
        const mapped = (res.testimonials ?? []).map((t: ApiTestimonial) => {
          const r = transformTestimonial(t);
          return { id: r.id, name: r.name, role: 'Verified Buyer', avatar: r.avatar, rating: r.rating, text: r.text };
        });
        setTestimonials(mapped);
        setStatus('success');
      })
      .catch((e) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Failed to load testimonials');
        setStatus('error');
      });
    return () => { active = false; };
  }, []);

  return { testimonials, status, error };
}

// ---- Related products (by category) ----

export function useRelatedProducts(category: string | undefined, excludeId: number | undefined) {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const load = useCallback(() => {
    if (!category) return;
    fetchProducts({ category, limit: 8 })
      .then((res) => {
        setProducts(res.products.map(transformProduct).filter((p) => p.id !== excludeId).slice(0, 4));
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [category, excludeId]);

  useEffect(() => { load(); }, [load]);

  return { products, status };
}

// ---- Categories (Shop page filters) ----

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchCategories()
      .then((res) => {
        if (!active) return;
        setCategories(res.categories.map((c) => c.name));
        setStatus('success');
      })
      .catch((e) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Failed to load categories');
        setStatus('error');
      });
    return () => { active = false; };
  }, []);

  return { categories, status, error };
}