import { combineReducers } from 'redux';

import auth from './auth/authReducer';
import items from './items/itemsReducer';

import type { InferRootState } from '~/commonTypes';

const reducers = {
  auth,
  items,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

export type RootState = InferRootState<typeof reducers>;
export type { AuthState } from './auth/authReducer';
export type { ItemsState } from './items/itemsReducer';
