import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
      query: ({ email, password }) => ({
        url: `/users?email=${email}&password=${password}`,
      }),
      transformResponse: (response: User[]) => {
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
            console.log('Đăng nhập thất bại: Sai email hoặc mật khẩu');
          }
        } catch (error) {
          console.error('Lỗi khi đăng nhập:', error);
        }
      },
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
} = apiSlice;
