import {
  createSlice,
  createAsyncThunk,
  AppThunkConfig,
  AppThunk,
  PayloadAction,
  ActionCreator,
} from '@reduxjs/toolkit';

import { ACTION_DOMAINS } from '~/constants/actionDomains';
import * as services from '~/services';
import { auth } from '~/services/core';

import type firebase from 'firebase/app';

export type AuthState = {
  readonly userID: string | null;
  readonly isLoading: boolean;
};

const initialState: AuthState = {
  userID: null,
  isLoading: false,
};

type FirebaseReturnUserCredential = firebase.auth.UserCredential;
type UserCredential = {
  email: string;
  password: string;
};

type AuthenticateReturn = FirebaseReturnUserCredential;
type AuthenticateArg = UserCredential;

export const authenticate = createAsyncThunk<AuthenticateReturn, AuthenticateArg, AppThunkConfig>(
  `${ACTION_DOMAINS.AUTH}/authenticate`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await services.authenticateUser(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type RegisterReturn = FirebaseReturnUserCredential;
type RegisterArg = UserCredential;

export const register = createAsyncThunk<RegisterReturn, RegisterArg, AppThunkConfig>(
  `${ACTION_DOMAINS.AUTH}/register`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await services.register(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk<void, void, AppThunkConfig>(
  `${ACTION_DOMAINS.AUTH}/logout`,
  async () => {
    await services.logout();
  },
);

const authSlice = createSlice({
  name: ACTION_DOMAINS.AUTH,
  initialState,
  reducers: {
    onLogin: (state, actions: PayloadAction<string>) => {
      state.userID = actions.payload;
    },
    onLogout: (state) => {
      state.userID = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.userID = action.payload.user?.uid ?? null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userID = action.payload.user?.uid ?? null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userID = null;
      }),
});

const { onLogin, onLogout } = authSlice.actions;

type OnLoginAction = PayloadAction<string>;
type OnLogoutAction = PayloadAction<void>;
type AuthStateChangedAction = ActionCreator<AppThunk<OnLoginAction | OnLogoutAction>>;

export const authStateChanged: AuthStateChangedAction = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(onLogin(user.uid));
    } else {
      dispatch(onLogout());
    }
  });
};

export default authSlice.reducer;
