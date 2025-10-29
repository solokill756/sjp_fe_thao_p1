import type { User } from './userModel';

interface OrderItem {
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id?: number;
  userId: string | number;
  createdAt: string;
  status: 'Processing' | 'Shipping' | 'Delivered' | 'Cancelled';

  subtotal: number;
  shippingCost: number;
  total: number;

  paymentMethod: string;
  shippingMethod: string;

  contactEmail: string;
  contactPhone: string;

  billingAddress: OrderAddress;
  shippingAddress: OrderAddress | undefined;

  items: OrderItem[];

  orderNotes?: string;
}

export type { Order, OrderItem, OrderAddress };
