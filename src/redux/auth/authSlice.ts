import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/api/authApi';
import { UserInterface } from '@/shared/interfaces/user.interface';

interface AuthState {
  user: UserInterface | null;
  loadingStatus: 'loading' | 'loaded' | 'idle';
}

const initialState: AuthState = {
  user: null,
  loadingStatus: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      },
    );
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.loadingStatus = 'loading';
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.loadingStatus = 'loaded';
      },
    );
    builder.addMatcher(authApi.endpoints.login.matchRejected, (state) => {
      state.user = null;
      state.loadingStatus = 'loaded';
    });
    builder.addMatcher(authApi.endpoints.getMe.matchPending, (state) => {
      state.loadingStatus = 'loading';
    });
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.loadingStatus = 'loaded';
      },
    );
    builder.addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
      state.user = null;
      state.loadingStatus = 'loaded';
    });
    builder.addMatcher(
      (action) =>
        authApi.endpoints.logout.matchFulfilled(action) ||
        authApi.endpoints.logout.matchRejected(action),
      (state) => {
        state.user = null;
        state.loadingStatus = 'loaded';
      },
    );
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
