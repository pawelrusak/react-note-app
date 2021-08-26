import {
  createSlice,
  createAsyncThunk,
  AppThunkConfig,
  AppThunk,
  PayloadAction,
  ActionCreator,
} from '@reduxjs/toolkit';

import authPersist from './authPersist';
import { ACTION_DOMAINS } from '~/constants/actionDomains';
import * as services from '~/services';
import { auth } from '~/services/core';

import type firebase from 'firebase/app';
import type { AuthCredentials } from '~/commonTypes';

export type AuthState = {
  readonly userID: string | null;
  readonly isLoading: boolean;
};

const initialState: AuthState = {
  userID: process.env.NODE_ENV === 'test' ? null : authPersist.getUserID(),
  isLoading: false,
};

type FirebaseReturnUserCredential = firebase.auth.UserCredential;

type AuthenticateReturn = FirebaseReturnUserCredential;
type AuthenticateArg = AuthCredentials;

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
type RegisterArg = AuthCredentials;

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
      authPersist.setUserID(actions.payload);
      state.userID = actions.payload;
    },
    onLogout: (state) => {
      authPersist.removeUserID();
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
        authPersist.removeUserID();
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
