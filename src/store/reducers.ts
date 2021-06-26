import authReducer from './auth/authSlice';
import items from './items/itemsReducer';
import { ACTION_DOMAINS } from '~/constants/actionDomains';

const rootReducer = {
  [ACTION_DOMAINS.AUTH]: authReducer,
  items,
};

export default rootReducer;
