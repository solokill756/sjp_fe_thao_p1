import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import i18n from '../../i18n';
import { getUserWithoutPassword, type User } from '../../models/userModel';
import { setCredentials } from '../auth/authSlice';
import type { Product } from '../../models/productModel';
import type { Category } from '../../models/categoryModel';
import type { CartItem, NewCartItem } from '../../models/CartModel';
import type { Review } from '../../models/review';
import type { Order } from '../../models/checkoutModel';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  }),
  tagTypes: ['User', 'Product', 'Category', 'Cart', 'Review', 'Order'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserId: builder.query<User, number>({
      query: (id: number) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    postUser: builder.mutation<User, Partial<User>>({
      query: (body) => {
        // Validation
        if (!body || typeof body !== 'object') {
          throw new Error('Invalid user data');
        }
        if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
          throw new Error('Invalid email format');
        }
        if (!body.username || typeof body.username !== 'string') {
          throw new Error('Username is required');
        }
        return {
          url: '/users',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getUserByEmail: builder.query<User | null, string>({
      query: (email: string) => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error('Invalid email format');
        }
        return `/users?email=${email}`;
      },
      transformResponse: (response: User[]) => {
        return response.length > 0 ? response[0] : null;
      },
    }),
    login: builder.mutation<User | null, { email: string; password: string }>({
      query: ({ email, password }) => {
        if (!email || !password) {
          throw new Error(i18n.t('error:login.missingEmailOrPassword'));
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error(i18n.t('error:login.invalidEmailFormat'));
        }
        return {
          url: `/users?email=${email}&password=${password}`,
        };
      },
      transformResponse: (response: User[]) => {
        if (!Array.isArray(response)) {
          throw new Error(i18n.t('error:login.unexpectedResponse'));
        }
        return response.length > 0 ? response[0] : null;
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            const userToStore = getUserWithoutPassword(data);
            localStorage.setItem('loggedInUser', JSON.stringify(userToStore));
            dispatch(setCredentials(userToStore));
          } else {
            console.log(i18n.t('error:login.invalidCredentials'));
            throw new Error(i18n.t('error:login.invalidCredentials'));
          }
        } catch (error: any) {
          console.error(i18n.t('error:login.loginFailed'), error);
          if (error.message) throw new Error(error.message);
          throw new Error(i18n.t('error:login.loginFailed'));
        }
      },
    }),
    putUser: builder.mutation<User | null, Partial<User> & { id: number }>({
      query: ({ id, ...body }) => {
        // Validation
        if (!id || typeof id !== 'number') {
          throw new Error('Invalid user id');
        }
        if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
          throw new Error('Invalid email format');
        }
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body,
        };
      },

      async onQueryStarted({ id, ...patch }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            const userToStore = getUserWithoutPassword(data);
            const storedUser = localStorage.getItem('loggedInUser');
            if (storedUser) {
              const parsedStoredUser = JSON.parse(storedUser);
              if (parsedStoredUser.id === id) {
                localStorage.setItem(
                  'loggedInUser',
                  JSON.stringify(userToStore)
                );
                dispatch(setCredentials(userToStore));
              }
            }
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật người dùng:', error);
        }
      },

      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
    }),
    getProducts: builder.query<Product[], { tag: string | undefined }>({
      query: ({ tag }) => {
        if (tag && typeof tag !== 'string') {
          throw new Error('Invalid tag');
        }
        const params: { tags_like?: string } = {};
        if (tag) {
          params.tags_like = tag;
        }
        return {
          url: '/products',
          params: params,
        };
      },
      transformResponse: (response: Product[]) => {
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!Array.isArray(data)) {
            throw new Error('Invalid products response format');
          }
          data.forEach((product) => {
            if (
              typeof product !== 'object' ||
              typeof product.id !== 'number' ||
              typeof product.name !== 'string'
            ) {
              throw new Error('Product validation failed');
            }
          });
        } catch (error) {
          console.error('Validation error in getProducts:', error);
        }
      },
    }),
    getProductById: builder.query<Product, number>({
      query: (id: number) => {
        if (!id || typeof id !== 'number') {
          throw new Error('Invalid product id');
        }
        return `/products/${id}`;
      },
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getProductsByCategory: builder.query<Product[], number>({
      query: (categoryId: number) => {
        if (!categoryId || typeof categoryId !== 'number') {
          throw new Error('Invalid category id');
        }
        return `/products?categoryId=${categoryId}`;
      },
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>(
      {
        query: ({ id, ...body }) => {
          if (!id || typeof id !== 'number') {
            throw new Error('Invalid product id');
          }
          if (body.name && typeof body.name !== 'string') {
            throw new Error('Invalid product name');
          }
          return {
            url: `/products/${id}`,
            method: 'PUT',
            body,
          };
        },
        invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
      }
    ),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
    }),
    getCarts: builder.query<CartItem[], number>({
      query: (userId) => {
        if (!userId || typeof userId !== 'number') {
          throw new Error('Invalid user id');
        }
        return `/cartItems?userId=${userId}&_expand=product`;
      },
      transformResponse: (response: CartItem[]) => {
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      },
      providesTags: (result, _error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cart' as const, id })),
              { type: 'Cart', id: `LIST-${userId}` },
            ]
          : [{ type: 'Cart', id: `LIST-${userId}` }],
    }),
    deleteCartItem: builder.mutation<void, { id: number; userId: number }>({
      query: ({ id, userId }) => {
        if (!id || typeof id !== 'number') {
          throw new Error('Invalid cart item id');
        }
        if (!userId || typeof userId !== 'number') {
          throw new Error('Invalid user id');
        }
        return {
          url: `/cartItems/${id}`,
          method: 'DELETE',
        };
      },

      invalidatesTags: (_result, _error, { id, userId }) => [
        { type: 'Cart', id },
        { type: 'Cart', id: `LIST-${userId}` },
      ],
    }),
    addCartItem: builder.mutation<CartItem, Partial<NewCartItem>>({
      query: (body) => {
        if (!body || typeof body !== 'object') {
          throw new Error('Invalid cart item data');
        }
        if (!body.userId || typeof body.userId !== 'number') {
          throw new Error('Invalid user id');
        }
        if (!body.productId || typeof body.productId !== 'number') {
          throw new Error('Invalid product id');
        }
        if (!body.quantity || typeof body.quantity !== 'number') {
          throw new Error('Invalid quantity');
        }
        return {
          url: '/cartItems',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response: CartItem) => {
        if (!response || typeof response !== 'object') {
          throw new Error('Invalid response format');
        }
        return response;
      },

      invalidatesTags: (result) =>
        result
          ? [
              { type: 'Cart', id: result.id },
              { type: 'Cart', id: `LIST-${result.userId}` },
            ]
          : [],
    }),
    updateCartItem: builder.mutation<
      CartItem,
      Partial<NewCartItem> & { id: number }
    >({
      query: ({ id, ...body }) => {
        if (!id || typeof id !== 'number') {
          throw new Error('Invalid cart item id');
        }
        if (body.quantity && typeof body.quantity !== 'number') {
          throw new Error('Invalid quantity');
        }
        return {
          url: `/cartItems/${id}`,
          method: 'PUT',
          body,
        };
      },
      transformResponse: (response: CartItem) => {
        if (!response || typeof response !== 'object') {
          throw new Error('Invalid response format');
        }
        return response;
      },

      invalidatesTags: (_result, _error, { id, userId }) => [
        { type: 'Cart', id },
        { type: 'Cart', id: `LIST-${userId}` },
      ],
    }),

    clearCart: builder.mutation<void, number>({
      async queryFn(userId, _queryApi, _extraOptions, fetchWithBQ) {
        if (!userId || typeof userId !== 'number') {
          return {
            data: undefined,
            error: { status: 400, data: 'Invalid user id' },
          };
        }
        const cartItemsResponse = await fetchWithBQ(
          `/cartItems?userId=${userId}`
        );
        if (cartItemsResponse.error) {
          return { data: undefined, error: cartItemsResponse.error };
        }

        const cartItems: CartItem[] = cartItemsResponse.data as CartItem[];

        for (const item of cartItems) {
          const deleteResponse = await fetchWithBQ({
            url: `/cartItems/${item.id}`,
            method: 'DELETE',
          });
          if (deleteResponse.error) {
            return { data: undefined, error: deleteResponse.error };
          }
        }

        return { data: undefined };
      },
      invalidatesTags: (_result, _error, userId) => [
        { type: 'Cart', id: `LIST-${userId}` },
      ],
    }),
    getReviewsByProduct: builder.query<Review[], number>({
      query: (productId: number) => {
        if (!productId || typeof productId !== 'number') {
          throw new Error('Invalid product id');
        }
        return `/reviews?productId=${productId}&_expand=user`;
      },
      transformResponse: (response: Review[]) => {
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      },
      providesTags: (result, _error, productId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Review' as const, id })),
              { type: 'Review', id: `LIST-${productId}` },
            ]
          : [{ type: 'Review', id: `LIST-${productId}` }],
    }),
    addOrder: builder.mutation<void, Partial<Order>>({
      query: (body) => {
        if (!body || typeof body !== 'object') {
          throw new Error('Invalid order data');
        }
        if (!body.userId || typeof body.userId !== 'number') {
          throw new Error('Invalid user id');
        }
        return {
          url: '/orders',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    getOrdersByUser: builder.query<Order[], number>({
      query: (userId: number) => {
        if (!userId || typeof userId !== 'number') {
          throw new Error('Invalid user id');
        }
        return `/orders?userId=${userId}`;
      },
      transformResponse: (response: Order[]) => {
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      },
      providesTags: (result, _error, _userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: `LIST` },
            ]
          : [{ type: 'Order', id: `LIST` }],
    }),
    getOrderById: builder.query<Order, number>({
      query: (orderId: number) => {
        if (!orderId || typeof orderId !== 'number') {
          throw new Error('Invalid order id');
        }
        return `/orders/${orderId}`;
      },
      providesTags: (_result, _error, orderId) => [
        { type: 'Order', id: orderId },
      ],
    }),
    getOrders: builder.query<Order[], void>({
      query: () => `/orders?_expand=user`,
      transformResponse: (response: Order[]) => {
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
    getReviews: builder.query<Review[], void>({
      query: () => `/reviews?_expand=user`,
      transformResponse: (response: Review[]) => {
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Review' as const, id })),
              { type: 'Review', id: 'LIST' },
            ]
          : [{ type: 'Review', id: 'LIST' }],
    }),
    updateOrder: builder.mutation<Order, Partial<Order> & { id: number }>({
      query: ({ id, ...body }) => {
        if (!id || typeof id !== 'number') {
          throw new Error('Invalid order id');
        }
        return {
          url: `/orders/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Order', id }],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id: number) => {
        if (!id || typeof id !== 'number') {
          throw new Error('Invalid product id');
        }
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => {
        if (!body || typeof body !== 'object') {
          throw new Error('Invalid product data');
        }
        if (!body.name || typeof body.name !== 'string') {
          throw new Error('Product name is required');
        }
        return {
          url: '/products',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    editProduct: builder.mutation<Product, Partial<Product> & { id: number }>({
      query: ({ id, ...body }) => {
        if (!id || typeof id !== 'number') {
          throw new Error('Invalid product id');
        }
        if (body.name && typeof body.name !== 'string') {
          throw new Error('Invalid product name');
        }
        if (body.price && typeof body.price !== 'number') {
          throw new Error('Invalid product price');
        }
        if (body.originalPrice && typeof body.originalPrice !== 'number') {
          throw new Error('Invalid product original price');
        }
        if (body.salePercentage && typeof body.salePercentage !== 'number') {
          throw new Error('Invalid product sale percentage');
        }
        if (body.imageUrls && !Array.isArray(body.imageUrls)) {
          throw new Error('Invalid product image URLs');
        }
        return {
          url: `/products/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
    }),
  }),
});

export const {
  useEditProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateOrderMutation,
  useGetReviewsQuery,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateProductMutation,
  useGetOrdersByUserQuery,
  useAddOrderMutation,
  useClearCartMutation,
  useGetReviewsByProductQuery,
  useGetCartsQuery,
  useDeleteCartItemMutation,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetUsersQuery,
  useGetUserIdQuery,
  usePostUserMutation,
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  useLoginMutation,
  usePutUserMutation,
  useGetProductsQuery,
  useGetCategoriesQuery,
} = apiSlice;
