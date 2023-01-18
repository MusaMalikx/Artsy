import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../constants/api-base-url';

export const signupReducer = createApi({
  reducerPath: 'signupReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  tagTypes: ['SignUp'],
  endpoints: (builder) => ({
    // getPosts: builder.query({
    //   query: () => '/posts',
    //   providesTags: ['Post']
    // }),
    signUpBuyerWithGoogle: builder.mutation({
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
      invalidatesTags: ['SignUp']
    }),
    signUpBuyerWithEmail: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/user/signup',
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
      invalidatesTags: ['SignUp']
    }),
    signUpArtistWithGoogle: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/artist/google',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      transformResponse: (res) => {
        console.log('res', res);
        localStorage.setItem('auth', JSON.stringify({ ...res, type: 'artist' }));
      },
      transformErrorResponse: (res) => console.log(res),
      invalidatesTags: ['SignUp']
    }),
    signUpArtistWithEmail: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/artist/signup',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      transformResponse: (res) => {
        console.log('res', res);
        localStorage.setItem('auth', JSON.stringify({ ...res, type: 'artist' }));
      },
      transformErrorResponse: (res) => console.log(res),
      invalidatesTags: ['SignUp']
    })
  })
});

export const {
  useSignUpBuyerWithGoogleMutation,
  useSignUpBuyerWithEmailMutation,
  useSignUpArtistWithGoogleMutation,
  useSignUpArtistWithEmailMutation
} = signupReducer;
