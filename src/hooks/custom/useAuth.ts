import { useSelector, useDispatch } from 'react-redux';

import { authenticate as authenticateAction } from '~/store/auth/authActions';
import { userIDSelector } from '~/store/auth/authSelectors';

export const useAuth = () => {
  const userID = useSelector(userIDSelector);
  const dispatch = useDispatch();

  const authenticate = (email: string, password: string) => {
    dispatch(authenticateAction(email, password));
  };

  return {
    userID,
    authenticate,
  };
};
