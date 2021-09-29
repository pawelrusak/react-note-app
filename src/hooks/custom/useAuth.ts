import { RootDispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { userIDSelector } from '~/store/auth/authSelectors';
import * as actions from '~/store/auth/authSlice';

import type { AuthCredentials } from '~/commonTypes';

export const useAuth = () => {
  const userID = useSelector(userIDSelector);
  const dispatch = useDispatch<RootDispatch>();

  const authenticate = (email: AuthCredentials['email'], password: AuthCredentials['password']) =>
    dispatch(actions.authenticate({ email, password })).unwrap();

  const register = (email: AuthCredentials['email'], password: AuthCredentials['password']) =>
    dispatch(actions.register({ email, password })).unwrap();

  const logout = () => dispatch(actions.logout()).unwrap();

  return {
    userID,
    authenticate,
    register,
    logout,
  };
};
