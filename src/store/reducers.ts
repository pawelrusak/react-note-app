import authReducer from './auth/authSlice';
import itemsReducer from './items/itemsSlice';
import searchReducer from './search/searchSlice';
import { ACTION_DOMAINS } from '~/constants';

const rootReducer = {
  [ACTION_DOMAINS.AUTH]: authReducer,
  [ACTION_DOMAINS.ITEMS]: itemsReducer,
  [ACTION_DOMAINS.SEARCH]: searchReducer,
};

export default rootReducer;
