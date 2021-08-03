import { Action, ThunkAction } from '@reduxjs/toolkit';

import store from '~/store';

import type { Store } from '@reduxjs/toolkit';
import type { AuthState } from '~/store/auth/authSlice';
import type { ItemsState } from '~/store/items/itemsSlice';

declare module '@reduxjs/toolkit' {
  export type RootState = {
    auth: AuthState;
    items: ItemsState;
  };

  export type RootDispatch = typeof store.dispatch;

  export type AppStore = Store<RootState>;

  export type AppThunk<A extends Action, S = RootState, R = void, E = unknown> = ThunkAction<
    R,
    S,
    E,
    A
  >;

  export type AppThunkConfig = {
    state: RootState;
  };
}
