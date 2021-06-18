import { AUTH_SUCCESS } from '~/constants/actionTypes';

import type { AuthSuccessAction } from './authActions';

export type AuthState = {
  readonly userID: string | null;
  readonly isLoading: boolean;
};

const initialState = {
  /**
   * You can find the original code of the course in the link below.
   *
   * @deprecated This hard code userID property value will be removing in future
   *
   * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/ce05514413ce0d022623870c7327ca4fe7dea0d5/06/src/reducers/index.js#L4}
   */
  userID: process.env.REACT_APP_TEMPORARY_USER_ID as string,
  isLoading: false,
};

type AuthAction = AuthSuccessAction;

const rootReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    /**
     * You can find the original code of the course in the link below.
     *
     * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/ecdbd720fa8e84f853b127293328f6addaf2c587/06/src/reducers/index.js#L106-L110 }
     */
    case AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.user?.uid ?? null,
      };
    default:
      return state;
  }
};

export default rootReducer;
