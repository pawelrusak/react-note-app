import { combineReducers } from 'redux';

import auth from './auth';
import items from './items';

import type { InferRootState } from '~/commonTypes';

const reducers = {
  auth,
  items,
};

const rootReducer = combineReducers(reducers);

export type test = ReturnType<typeof rootReducer>;

export default rootReducer;

export type RootState = InferRootState<typeof reducers>;
export type { AuthState } from './auth';
export type { ItemsState } from './items';
