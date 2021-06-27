import authReducer from './auth/authSlice';
import itemsReducer from './items/itemsSlice';
import { ACTION_DOMAINS } from '~/constants/actionDomains';

const rootReducer = {
  [ACTION_DOMAINS.AUTH]: authReducer,
  [ACTION_DOMAINS.ITEMS]: itemsReducer,
};

export default rootReducer;
