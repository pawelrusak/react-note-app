import { RootDispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { userIDSelector } from '~/store/auth/authSelectors';
import * as actions from '~/store/auth/authSlice';

export const useAuth = () => {
  const userID = useSelector(userIDSelector);
  const dispatch = useDispatch<RootDispatch>();

  const authenticate = async (email: string, password: string) =>
    dispatch(actions.authenticate({ email, password })).unwrap();

  const register = (email: string, password: string) =>
    dispatch(actions.register({ email, password })).unwrap();

  const logout = () => dispatch(actions.logout()).unwrap();

  return {
    userID,
    authenticate,
    register,
    logout,
  };
};
