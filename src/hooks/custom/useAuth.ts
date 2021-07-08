import { RootDispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { userIDSelector } from '~/store/auth/authSelectors';
import {
  authenticate as authenticateAction,
  register as registerAction,
} from '~/store/auth/authSlice';

export const useAuth = () => {
  const userID = useSelector(userIDSelector);
  const dispatch = useDispatch<RootDispatch>();

  const authenticate = async (email: string, password: string) =>
    dispatch(authenticateAction({ email, password })).unwrap();

  const register = (email: string, password: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(registerAction({ email, password }));
  };

  return {
    userID,
    authenticate,
    register,
  };
};
