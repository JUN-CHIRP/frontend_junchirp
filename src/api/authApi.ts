import mainApi from './mainApi';

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['auth'],
    }),
    getMe: builder.query({
      query: () => ({
        url: 'users/me',
      }),
      providesTags: ['auth'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
    }),
    sendConfirmationEmail: builder.mutation({
      query: (data) => ({
        url: 'users/send-confirmation-email',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    confirmEmail: builder.mutation({
      query: (data) => ({
        url: 'users/confirm',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    requestPasswordReset: builder.mutation({
      query: (data) => ({
        url: 'users/request-password-reset',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'users/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    validateToken: builder.query({
      query: (token) => ({
        url: `users/validate-password-token?token=${encodeURIComponent(token)}`,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'users/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    cancelResetPassword: builder.mutation({
      query: (token) => ({
        url: `users/password-token?token=${token}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useSendConfirmationEmailMutation,
  useUpdateUserMutation,
  useConfirmEmailMutation,
  useRequestPasswordResetMutation,
  useValidateTokenQuery,
  useResetPasswordMutation,
  useCancelResetPasswordMutation,
} = authApi;
