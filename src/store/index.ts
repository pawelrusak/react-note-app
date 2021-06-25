import { configureStore, RootState as AppState, RootAction } from '@reduxjs/toolkit';

import rootReducer from './reducers';

// add explicit type to disable TypeScript error
const store = configureStore<AppState, RootAction>({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type { AuthState } from './auth/authReducer';
export type { ItemsState } from './items/itemsReducer';

export default store;
