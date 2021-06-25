import { configureStore } from '@reduxjs/toolkit';

import auth, { AuthAction } from './auth/authReducer';
import items, { ItemsAction } from './items/itemsReducer';
import rootReducer from './reducers';

// add explicit type to disable TypeScript error
const store = configureStore<
  {
    auth: ReturnType<typeof auth>;
    items: ReturnType<typeof items>;
  },
  AuthAction & ItemsAction
>({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type { AuthState } from './auth/authReducer';
export type { ItemsState } from './items/itemsReducer';

export default store;
