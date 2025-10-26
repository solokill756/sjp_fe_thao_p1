import type { User } from './userModel';

export interface Review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
  userId: number;
  productId: number;
}
