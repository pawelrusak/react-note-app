import { v4 as getUuid } from 'uuid';
import {
  authenticateUser,
  fetchItems as fetchRemoteItems,
  removeItem as removeRemoteItems,
} from 'api';

export const ADD_ITEM = 'ADD_ITEM';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

/**
 * You can find the original code in the link below
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/a54a88872b762b772252d26b0373ae3b66248895/06/src/actions/index.js#L14-L30}
 */
export const fetchItems = (itemType) => (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST });

  return fetchRemoteItems({ type: itemType, userID: getState().userID })
    .then(({ data }) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data,
          itemType,
        },
      });
    })
    .catch(() => {
      dispatch({ type: FETCH_FAILURE });
    });
};

export const removeItem = (itemType, id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM_REQUEST });

  removeRemoteItems(id)
    .then(() => {
      dispatch({
        type: REMOVE_ITEM_SUCCESS,
        payload: {
          itemType,
          id,
        },
      });
    })
    .catch(() => dispatch({ type: REMOVE_ITEM_FAILURE }));
};

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
