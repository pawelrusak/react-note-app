import auth, { AuthAction } from '~/store/auth/authReducer';
import items, { ItemsAction } from '~/store/items/itemsReducer';

import type { Store } from '@reduxjs/toolkit';

declare module '@reduxjs/toolkit' {
  export type RootAction = AuthAction & ItemsAction;

  export type RootState = {
    auth: ReturnType<typeof auth>;
    items: ReturnType<typeof items>;
  };

  export type AppStore = Store<RootState, RootAction>;
}
