import type { Product } from './productModel';
import type { User } from './userModel';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  user: User;
  added_at: Date;
}
