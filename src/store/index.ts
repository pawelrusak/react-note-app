import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type { AuthState } from './auth/authReducer';
export type { ItemsState } from './items/itemsReducer';

export default store;
