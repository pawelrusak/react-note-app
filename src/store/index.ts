import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type { AuthState } from './auth/authSlice';
export type { ItemsState } from './items/itemsSlice';

export default store;
