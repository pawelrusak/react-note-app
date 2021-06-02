import firebase from 'firebase/app';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
// eslint-disable-next-line import/no-cycle
import { RootState } from 'reducers';
import { ItemVariants, Item, Modify } from 'commonTypes';
import {
  authenticateUser,
  fetchItems as fetchRemoteItems,
  removeItem as removeRemoteItems,
  addItem as addRemoteItems,
} from 'services';

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

type AppThunk<A extends Action, S = RootState, R = void, E = unknown> = ThunkAction<R, S, E, A>;

type FetchRequestAction = { type: typeof FETCH_REQUEST };
type FetchSuccessAction = {
  type: typeof FETCH_SUCCESS;
  payload: { itemType: ItemVariants; data: Item[] };
};
type FetchFailureAction = { type: typeof FETCH_FAILURE };
type ThunkFetchItemsAction = AppThunk<FetchRequestAction | FetchSuccessAction | FetchFailureAction>;

/**
 * You can find the original code in the link below
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/a54a88872b762b772252d26b0373ae3b66248895/06/src/actions/index.js#L14-L30}
 */
export const fetchItems =
  (itemType: ItemVariants): ThunkFetchItemsAction =>
  (dispatch, getState) => {
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

type RemoveItemRequestAction = { type: typeof REMOVE_ITEM_REQUEST };
type RemoveItemSuccessAction = {
  type: typeof REMOVE_ITEM_SUCCESS;
  payload: { itemType: ItemVariants; id: string };
};
type RemoveItemFailureAction = { type: typeof REMOVE_ITEM_FAILURE };
type ThunkRemoveItemAction = AppThunk<
  RemoveItemRequestAction | RemoveItemSuccessAction | RemoveItemFailureAction
>;

export const removeItem =
  (itemType: ItemVariants, id: string): ThunkRemoveItemAction =>
  (dispatch) => {
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

type AddItemRequestAction = { type: typeof ADD_ITEM_REQUEST };
type AddItemSuccessAction = {
  type: typeof ADD_ITEM_SUCCESS;
  payload: { itemType: ItemVariants; data: Item };
};
type AddItemFailureAction = { type: typeof ADD_ITEM_FAILURE };
type ThunkAddItemAction = AppThunk<
  AddItemRequestAction | AddItemSuccessAction | AddItemFailureAction
>;

/**
 * You can find the original code in the link below
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/1144f53bbb0014406bb97cc03801b0bcf4a3ed97/06/src/actions/index.js#L82-L104}
 */
export const addItem =
  (itemType: ItemVariants, itemContent: Modify<Item, { created: undefined }>): ThunkAddItemAction =>
  (dispatch, getState) => {
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

type AuthRequestAction = { type: typeof AUTH_REQUEST };
type AuthSuccessAction = { type: typeof AUTH_SUCCESS; payload: firebase.auth.UserCredential };
type AuthFailureAction = { type: typeof AUTH_FAILURE };
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
