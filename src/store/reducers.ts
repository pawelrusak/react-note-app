import auth from './auth/authReducer';
import items from './items/itemsReducer';

const rootReducer = {
  auth,
  items,
};

export default rootReducer;
