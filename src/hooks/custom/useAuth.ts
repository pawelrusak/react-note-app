import { useSelector, useDispatch } from 'react-redux';

import { userIDSelector } from '~/store/auth/authSelectors';
import { authenticate as authenticateAction } from '~/store/auth/authSlice';

export const useAuth = () => {
  const userID = useSelector(userIDSelector);
  const dispatch = useDispatch();

  const authenticate = (email: string, password: string) => {
    dispatch(authenticateAction({ email, password }));
  };

  return {
    userID,
    authenticate,
  };
};
