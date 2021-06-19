import { combineReducers } from 'redux';

import auth from './auth/authReducer';
import items from './items/itemsReducer';

const rootReducer = combineReducers({
  auth,
  items,
});

export default rootReducer;
