import { configureStore } from '@reduxjs/toolkit';

import { authStateChanged } from './auth/authSlice';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV !== 'test') {
  store.dispatch(authStateChanged());
}

export type RootState = ReturnType<typeof store.getState>;
export type { AuthState } from './auth/authSlice';
export type { ItemsState } from './items/itemsSlice';

export default store;
