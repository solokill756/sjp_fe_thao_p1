import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import i18n from '../../i18n';
import { getUserWithoutPassword, type User } from '../../models/userModel';
import { setCredentials } from '../auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  }),

  tagTypes: ['User'],
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
    getUserId: builder.query<User, string>({
      query: (id: string) => `/users/${id}`,
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
    putUser: builder.mutation<User | null, Partial<User> & { id: string }>({
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserIdQuery,
  usePostUserMutation,
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  useLoginMutation,
  usePutUserMutation,
} = apiSlice;
