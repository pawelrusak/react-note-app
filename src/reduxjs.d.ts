import { PayloadAction } from '@reduxjs/toolkit';

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
}
