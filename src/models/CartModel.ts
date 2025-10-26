import type { Product } from './productModel';
import type { User } from './userModel';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  user: User;
  added_at: Date;
  productId: number;
  userId: number;
}

export type NewCartItem = {
  quantity: number;
  added_at: Date;
  userId: number;
  productId: number;
};
