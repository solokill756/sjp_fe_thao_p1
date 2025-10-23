import type { Review } from './review';

export interface Product {
  id: string;
  name: string;
  imageUrls: string[];
  salePercentage?: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  tags?: string[];
  description?: string;
  categoryId: string;
  reviews?: Review[];
}
