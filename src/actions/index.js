import { v4 as getUuid } from 'uuid';
import { authenticateUser } from 'api';

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const removeItem = (itemType, id) => ({
  type: REMOVE_ITEM,
  payload: {
    itemType,
    id,
  },
});

export const addItem = (itemType, itemContent) => ({
  type: ADD_ITEM,
  payload: {
    itemType,
    item: {
      id: getUuid(),
      ...itemContent,
    },
  },
});

/**
 * Simulate original course code by Firebase
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/54f2da267adf1c60ba8428ae64db8e1d42ec6c57/06/src/actions/index.js#L31-L47}
 */
export const authenticate = (email, password) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  return (
    authenticateUser(email, password)
      .then((payload) => {
        dispatch({ type: AUTH_SUCCESS, payload });
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        dispatch({ type: AUTH_FAILURE });
      })
  );
};
