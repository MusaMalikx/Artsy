import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../constants/api-base-url';

export const signinReducer = createApi({
  reducerPath: 'signinReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  tagTypes: ['SignIn'],
  endpoints: (builder) => ({
    // getPosts: builder.query({
    //   query: () => '/posts',
    //   providesTags: ['Post']
    // }),
    signInBuyerWithGoogle: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/user/google',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      transformResponse: (res) => {
        console.log(res);
        localStorage.setItem('auth', JSON.stringify({ ...res, type: 'buyer' }));
      },
      transformErrorResponse: (res) => console.log(res),
      invalidatesTags: ['SignIn']
    }),
    signInBuyerWithEmailAndPass: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/user/signin',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      transformResponse: (res) => {
        console.log('res', res);
        localStorage.setItem('auth', JSON.stringify({ ...res, type: 'buyer' }));
      },
      transformErrorResponse: (res) => console.log(res),
      invalidatesTags: ['SignIn']
    }),
    signInArtistWithGoogle: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/artist/google',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      transformResponse: (res) => {
        console.log(res);
        localStorage.setItem('auth', JSON.stringify({ ...res, type: 'artist' }));
      },
      transformErrorResponse: (res) => console.log(res),
      invalidatesTags: ['SignIn']
    }),
    signInArtistWithEmailAndPass: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/artist/signin',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      transformResponse: (res) => {
        console.log(res);
        localStorage.setItem('auth', JSON.stringify({ ...res, type: 'artist' }));
      },
      transformErrorResponse: (res) => console.log(res),
      invalidatesTags: ['SignIn']
    })
  })
});

export const {
  useSignInBuyerWithGoogleMutation,
  useSignInBuyerWithEmailAndPassMutation,
  useSignInArtistWithGoogleMutation,
  useSignInArtistWithEmailAndPassMutation
} = signinReducer;
