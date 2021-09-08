import { Action, ThunkAction } from '@reduxjs/toolkit';

import store from '~/store';

import type { Store } from '@reduxjs/toolkit';
import type { AuthState } from '~/store/auth/authSlice';
import type { ItemsState } from '~/store/items/itemsSlice';
import type { SearchState } from '~/store/search/searchSlice';

declare module '@reduxjs/toolkit' {
  export type AppState = {
    auth: AuthState;
    items: ItemsState;
    search: SearchState;
  };

  export type RootDispatch = typeof store.dispatch;

  export type AppStore = Store<AppState>;

  export type AppThunk<A extends Action, S = AppState, R = void, E = unknown> = ThunkAction<
    R,
    S,
    E,
    A
  >;

  export type AppThunkConfig = {
    state: AppState;
  };
}
