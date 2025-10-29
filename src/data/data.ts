// ...existing code...

// Đặt sau cùng file, sau export products
import type { CartItem } from '../models/CartModel';
import type { User } from '../models/userModel';

export const users: User[] = [
  {
    id: 'u1',
    username: 'alice',
    email: 'alice@example.com',
    role: 'customer',
    firstName: 'Alice',
    lastName: 'Smith',
    phoneNumber: '123456789',
    address: '123 Main St',
  },
  {
    id: 'u2',
    username: 'bob',
    email: 'bob@example.com',
    role: 'customer',
    firstName: 'Bob',
    lastName: 'Brown',
    phoneNumber: '987654321',
    address: '456 Oak St',
  },
  {
    id: 'u3',
    username: 'carol',
    email: 'carol@example.com',
    role: 'customer',
    firstName: 'Carol',
    lastName: 'White',
    phoneNumber: '555666777',
    address: '789 Pine St',
  },
];

import type { Product } from '../models/productModel';

export const heroData = {
  title: 'Shopping with us for better quality and the best price',
  subtitle:
    "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
  image: '/bg.png',
  cta: 'Shop Now',
  discount: {
    price: 21.67,
    originalPrice: 26.67,
  },
};

export const categories = [
  {
    id: '1',
    name: 'Fruits & Vegetables',
    imageUrl: '/list02.png',
  },
  {
    id: '2',
    name: 'Dairy & Pregnancy',
    imageUrl: '/list05.png',
  },

  {
    id: '3',
    name: 'Beverages',
    imageUrl: '/list08.png',
  },
  {
    id: '4',
    name: 'Meats & Seafood',
    imageUrl: '/list11.png',
  },

  {
    id: '5',
    name: 'Biscuits & Snacks',
    imageUrl: '/list14.png',
  },
  {
    id: '6',
    name: 'Breads & Bakery',
    imageUrl: '/list17.png',
  },

  {
    id: '7',
    name: 'Breakfast & Dairy',
    imageUrl: '/list20.png',
  },
  {
    id: '8',
    name: 'Frozen Foods',
    imageUrl: '/list23.png',
  },
  {
    id: '9',
    name: 'Grocery & Staples',
    imageUrl: '/list26.png',
  },
];

export const promotionalBanners = [
  {
    id: '1',
    tag: 'Only This Week',
    title: 'We provide you the best quality products',
    subtitle: 'A family place for grocery',
    image: '/banner-18.jpg.png',
    bgColor: 'bg-[#F3E8E8]',
  },
  {
    id: '2',
    tag: 'Only This Week',
    title: 'We make your grocery shopping more exciting',
    subtitle: 'Shine the morning...',
    image: '/banner-19.jpg.png',
    bgColor: 'bg-[#E8F3F3]',
  },
  {
    id: '3',
    tag: 'Only This Week',
    title: 'The one supermarket that saves your money',
    subtitle: 'Breakfast made better',
    image: '/banner-20.jpg.png',
    bgColor: 'bg-[#F3EEE8]',
  },
];

function getRandomImages(mainImage: string, count: number = 3) {
  const images = [
    '132.png',
    '342.png',
    '349.png',
    '353.png',
    '357.png',
    '365.png',
    '372.png',
    '384.png',
    '388.png',
    '396.png',
    '400.png',
    '403.png',
    '404.png',
    '408.png',
    '413.png',
    '424.png',
    '432.png',
    '436.png',
    '440.png',
    '444.png',
    '500.jpg',
    'banner-18.jpg.png',
    'banner-19.jpg.png',
    'banner-20.jpg.png',
    'banner-21.jpg.png',
    'bg.png',
    'list02.png',
    'list05.png',
    'list08.png',
    'list11.png',
    'list14.png',
    'list17.png',
    'list20.png',
    'list23.png',
    'list26.png',
  ];
  const filtered = images.filter((img) => !mainImage.includes(img));
  const randoms = Array.from(
    { length: count },
    () => filtered[Math.floor(Math.random() * filtered.length)]
  );
  return [mainImage, ...randoms.map((img) => `/${img}`)];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Great Value Rising Crust Frozen Supreme',
    imageUrls: getRandomImages('/Great Value Rising Crust Frozen Supreme.jpeg'),
    salePercentage: 31,
    rating: 5,
    reviewCount: 120,
    price: 8.99,
    originalPrice: 12.99,
    inStock: true,
    categoryId: '8',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '2',
    name: 'Simple Kitchen Fit Sliced Strawberries - 10oz',
    imageUrls: getRandomImages(
      '/Simple Kitchen Fit Sliced Strawberries - 10oz.jpeg'
    ),
    salePercentage: 12,
    rating: 5,
    reviewCount: 85,
    price: 21.9,
    originalPrice: 24.99,
    inStock: true,
    categoryId: '1',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '3',
    name: 'Red Baron Frozen Hand Tossed 4-Meat Pizza',
    imageUrls: getRandomImages(
      '/Red Baron Frozen Hand Tossed 4-Meat Pizza.jpeg'
    ),
    salePercentage: 21,
    rating: 5,
    reviewCount: 95,
    price: 14.99,
    originalPrice: 18.99,
    inStock: true,
    categoryId: '8',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '4',
    name: '100 Percent Apple Juice - 64 fl oz Bottle',
    imageUrls: getRandomImages('/413.png'),
    salePercentage: 92,
    rating: 5,
    reviewCount: 450,
    price: 0.5,
    originalPrice: 5.99,
    inStock: true,
    categoryId: '3',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '5',
    name: 'Angel Soft Toilet Paper, 9Mega Rolls',
    imageUrls: getRandomImages('/372.png'),
    salePercentage: 10,
    rating: 5,
    reviewCount: 320,
    price: 8.99,
    originalPrice: 9.99,
    inStock: true,
    categoryId: '9',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '6',
    name: 'California Pizza Kitchen Margherita, Crispy Thin Crust',
    imageUrls: getRandomImages('/357.png'),
    salePercentage: 17,
    rating: 5,
    reviewCount: 180,
    price: 14.99,
    originalPrice: 17.99,
    inStock: true,
    categoryId: '8',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '7',
    name: 'Cantaloupe Melon Fresh Organic Cut',
    imageUrls: getRandomImages('/365.png'),
    salePercentage: 42,
    rating: 4,
    reviewCount: 140,
    price: 2.45,
    originalPrice: 4.19,
    inStock: true,
    categoryId: '1',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '8',
    name: 'Alcohol Grapefruit Plasma Sparkling Vodka Cocktail',
    imageUrls: getRandomImages('/440.png'),
    salePercentage: 10,
    rating: 5,
    reviewCount: 95,
    price: 8.99,
    originalPrice: 9.99,
    inStock: true,
    categoryId: '9',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '9',
    name: 'Vitamineramic aam sugar lyopheat electroyte',
    imageUrls: getRandomImages('/444.png'),
    salePercentage: 44,
    rating: 4,
    reviewCount: 210,
    price: 4.99,
    originalPrice: 8.99,
    inStock: true,
    categoryId: '2',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '10',
    name: 'Great Value Rising Crust Frozen Pizza, Supreme',
    imageUrls: getRandomImages(
      '/Great Value Rising Crust Frozen Pizza, Supreme.jpeg'
    ),
    salePercentage: 31,
    rating: 5,
    reviewCount: 75,
    price: 8.99,
    originalPrice: 12.99,
    inStock: true,
    categoryId: '8',
    tags: ['featured', 'bestseller'],
  },
  {
    id: '11',
    name: 'Ocean Spray Pulp Free Orange Juice - 52 fl oz',
    imageUrls: getRandomImages(
      '/Ocean Spray Pulp Free Orange Juice - 52 fl oz.jpeg'
    ),
    salePercentage: 22,
    rating: 4,
    reviewCount: 110,
    price: 14.12,
    originalPrice: 18.2,
    inStock: true,
    categoryId: '3',
    tags: ['featured', 'bestseller'],
  },
];

export const cartData: CartItem[] = [
  {
    id: 'c1',
    product: products[0],
    quantity: 2,
    user: users[0],
    added_at: new Date('2025-10-01T10:00:00'),
  },
  {
    id: 'c2',
    product: products[1],
    quantity: 1,
    user: users[1],
    added_at: new Date('2025-10-02T11:00:00'),
  },
  {
    id: 'c3',
    product: products[2],
    quantity: 3,
    user: users[2],
    added_at: new Date('2025-10-03T12:00:00'),
  },
  {
    id: 'c4',
    product: products[3],
    quantity: 1,
    user: users[0],
    added_at: new Date('2025-10-04T13:00:00'),
  },
  {
    id: 'c5',
    product: products[4],
    quantity: 2,
    user: users[1],
    added_at: new Date('2025-10-05T14:00:00'),
  },
  {
    id: 'c6',
    product: products[5],
    quantity: 1,
    user: users[2],
    added_at: new Date('2025-10-06T15:00:00'),
  },
  {
    id: 'c7',
    product: products[6],
    quantity: 4,
    user: users[0],
    added_at: new Date('2025-10-07T16:00:00'),
  },
  {
    id: 'c8',
    product: products[7],
    quantity: 2,
    user: users[1],
    added_at: new Date('2025-10-08T17:00:00'),
  },
  {
    id: 'c9',
    product: products[8],
    quantity: 1,
    user: users[2],
    added_at: new Date('2025-10-09T18:00:00'),
  },
  {
    id: 'c10',
    product: products[9],
    quantity: 3,
    user: users[0],
    added_at: new Date('2025-10-10T19:00:00'),
  },
];
