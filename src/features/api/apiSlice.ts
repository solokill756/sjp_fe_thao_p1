import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../../models/userModel';

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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserIdQuery,
  usePostUserMutation,
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
} = apiSlice;
