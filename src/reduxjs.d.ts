import { PayloadAction, Action, ThunkAction } from '@reduxjs/toolkit';

import auth, { AuthAction } from '~/store/auth/authReducer';
import items, { ItemsAction } from '~/store/items/itemsReducer';

import type { Store } from '@reduxjs/toolkit';
import type { ItemVariants } from '~/commonTypes';

declare module '@reduxjs/toolkit' {
  export type RootAction = AuthAction & ItemsAction;

  export type RootState = {
    auth: ReturnType<typeof auth>;
    items: ReturnType<typeof items>;
  };

  export type AppStore = Store<RootState, RootAction>;

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
