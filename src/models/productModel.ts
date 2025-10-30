import type { Review } from './review';

export interface Product {
  id: number;
  name: string;
  imageUrls: string[];
  salePercentage?: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  stockCurrent: number;
  tags?: string[];
  description?: string;
  categoryId: number;
  reviews?: Review[];
  createdAt: string;
  isDeleted?: boolean;
}
