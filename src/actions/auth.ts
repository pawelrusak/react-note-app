import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from './actionTypes';
import { authenticateUser } from '~/services';

import type firebase from 'firebase/app';
import type { Action } from 'redux';
import type { AppThunk } from 'redux-thunk';

export type AuthRequestAction = Action<AUTH_REQUEST>;
export type AuthSuccessAction = {
  type: AUTH_SUCCESS;
  payload: firebase.auth.UserCredential;
};
export type AuthFailureAction = Action<AUTH_FAILURE>;
type ThunkAuthAction = AppThunk<AuthRequestAction | AuthSuccessAction | AuthFailureAction>;
/**
 * Simulate original course code by Firebase
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/54f2da267adf1c60ba8428ae64db8e1d42ec6c57/06/src/actions/index.js#L31-L47}
 */
export const authenticate =
  (email: string, password: string): ThunkAuthAction =>
  (dispatch) => {
    dispatch({ type: AUTH_REQUEST });

    return (
      authenticateUser(email, password)
        .then((payload) => {
          dispatch({ type: AUTH_SUCCESS, payload });
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((err) => {
          dispatch({ type: AUTH_FAILURE });
        })
    );
  };
