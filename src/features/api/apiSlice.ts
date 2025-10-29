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
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getUserByEmail: builder.query<User | null, string>({
      query: (email: string) => `/users?email=${email}`,
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
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),

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
      query: (id: number) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getProductsByCategory: builder.query<Product[], number>({
      query: (categoryId: number) => `/products?categoryId=${categoryId}`,
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>(
      {
        query: ({ id, ...body }) => ({
          url: `/products/${id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
      }
    ),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
    }),
    getCarts: builder.query<CartItem[], number>({
      query: (userId) => `/cartItems?userId=${userId}&_expand=product`,
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
      query: ({ id }) => ({
        url: `/cartItems/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: (_result, _error, { id, userId }) => [
        { type: 'Cart', id },
        { type: 'Cart', id: `LIST-${userId}` },
      ],
    }),
    addCartItem: builder.mutation<CartItem, Partial<NewCartItem>>({
      query: (body) => ({
        url: '/cartItems',
        method: 'POST',
        body,
      }),
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
      query: ({ id, ...body }) => ({
        url: `/cartItems/${id}`,
        method: 'PUT',
        body,
      }),
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
        try {
          if (!userId) {
            return { error: undefined, data: undefined };
          }
          const cartItemsResponse = await fetchWithBQ(
            `/cartItems?userId=${userId}`
          );
          if (cartItemsResponse.error) {
            return { error: cartItemsResponse.error, data: undefined };
          }

          const cartItems: CartItem[] = cartItemsResponse.data as CartItem[];

          for (const item of cartItems) {
            const deleteResponse = await fetchWithBQ({
              url: `/cartItems/${item.id}`,
              method: 'DELETE',
            });
            if (deleteResponse.error) {
              return { error: deleteResponse.error, data: undefined };
            }
          }

          return { data: undefined };
        } catch (error) {
          return { error: undefined, data: undefined };
        }
      },
      invalidatesTags: (_result, _error, userId) => [
        { type: 'Cart', id: `LIST-${userId}` },
      ],
    }),
    getReviewsByProduct: builder.query<Review[], number>({
      query: (productId: number) =>
        `/reviews?productId=${productId}&_expand=user`,
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
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    getOrdersByUser: builder.query<Order[], number>({
      query: (userId: number) => `/orders?userId=${userId}`,
      transformResponse: (response: Order[]) => {
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      },
      providesTags: (result, _error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: `LIST` },
            ]
          : [{ type: 'Order', id: `LIST` }],
    }),
    getOrderById: builder.query<Order, number>({
      query: (orderId: number) => `/orders/${orderId}`,
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
      query: ({ id, ...body }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Order', id }],
    }),
  }),
});

export const {
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
