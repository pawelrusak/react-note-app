import { PayloadAction, Action, ThunkAction } from '@reduxjs/toolkit';

import type { Store } from '@reduxjs/toolkit';
import type { ItemVariants } from '~/commonTypes';
import type { AuthState } from '~/store/auth/authSlice';
import type { ItemsState } from '~/store/items/itemsSlice';

declare module '@reduxjs/toolkit' {
  export type RootState = {
    auth: AuthState;
    items: ItemsState;
  };

  export type AppStore = Store<RootState>;

  export type AppItemsPayloadAction<
    P = void,
    T extends string = string,
    M = never,
    E = never,
  > = PayloadAction<
    {
      itemType: ItemVariants;
    } & P,
    T,
    M,
    E
  >;

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
