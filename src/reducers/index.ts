import { combineReducers } from 'redux';

import items from './items';
import auth from '~/store/auth/authReducer';

import type { InferRootState } from '~/commonTypes';

const reducers = {
  auth,
  items,
};

const rootReducer = combineReducers(reducers);

export type test = ReturnType<typeof rootReducer>;

export default rootReducer;

export type RootState = InferRootState<typeof reducers>;
export type { AuthState } from '~/store/auth/authReducer';
export type { ItemsState } from './items';
