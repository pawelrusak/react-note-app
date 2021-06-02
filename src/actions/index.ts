import { Dispatch } from 'redux';
import { Item, ItemVariants, Modify } from 'commonTypes';
import {
  authenticateUser,
  fetchItems as fetchRemoteItems,
  removeItem as removeRemoteItems,
  addItem as addRemoteItems,
} from 'services';
import type { RootState } from 'reducers';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

type GetState = () => RootState;

/**
 * You can find the original code in the link below
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/a54a88872b762b772252d26b0373ae3b66248895/06/src/actions/index.js#L14-L30}
 */
export const fetchItems = (itemType: ItemVariants) => (dispatch: Dispatch, getState: GetState) => {
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

export const removeItem = (itemType: ItemVariants, id: string) => (dispatch: Dispatch) => {
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

/**
 * You can find the original code in the link below
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/1144f53bbb0014406bb97cc03801b0bcf4a3ed97/06/src/actions/index.js#L82-L104}
 */
export const addItem =
  (itemType: ItemVariants, itemContent: Modify<Item, { created: undefined }>) =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: ADD_ITEM_REQUEST });

    addRemoteItems({
      type: itemType,
      userID: getState().userID,
      ...itemContent,
    })
      .then(({ data }) => {
        dispatch({
          type: ADD_ITEM_SUCCESS,
          payload: {
            itemType,
            data,
          },
        });
      })
      .catch(() => {
        dispatch({ type: ADD_ITEM_FAILURE });
      });
  };

/**
 * Simulate original course code by Firebase
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/54f2da267adf1c60ba8428ae64db8e1d42ec6c57/06/src/actions/index.js#L31-L47}
 */
export const authenticate = (email: string, password: string) => (dispatch: Dispatch) => {
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
