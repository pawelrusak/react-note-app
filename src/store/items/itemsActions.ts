import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from '~/constants/actionTypes';
import {
  fetchItems as fetchRemoteItems,
  removeItem as removeRemoteItems,
  addItem as addRemoteItems,
} from '~/services';

import type { Action, AppItemsPayloadAction, AppThunk } from '@reduxjs/toolkit';
import type { ItemVariants, Item, NewItem } from '~/commonTypes';

export type FetchRequestAction = Action<FETCH_REQUEST>;
export type FetchSuccessAction = AppItemsPayloadAction<{ data: Item[] }, FETCH_SUCCESS>;
export type FetchFailureAction = Action<FETCH_FAILURE>;
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

    return fetchRemoteItems({ type: itemType, userID: getState().auth.userID })
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

export type RemoveItemRequestAction = Action<REMOVE_ITEM_REQUEST>;
export type RemoveItemSuccessAction = AppItemsPayloadAction<{ id: string }, REMOVE_ITEM_SUCCESS>;
export type RemoveItemFailureAction = Action<REMOVE_ITEM_FAILURE>;
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

export type AddItemRequestAction = Action<ADD_ITEM_REQUEST>;
export type AddItemSuccessAction = AppItemsPayloadAction<{ data: Item }, ADD_ITEM_SUCCESS>;
export type AddItemFailureAction = Action<ADD_ITEM_FAILURE>;
type ThunkAddItemAction = AppThunk<
  AddItemRequestAction | AddItemSuccessAction | AddItemFailureAction
>;

/**
 * You can find the original code in the link below
 *
 * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/1144f53bbb0014406bb97cc03801b0bcf4a3ed97/06/src/actions/index.js#L82-L104}
 */
export const addItem =
  (itemType: ItemVariants, itemContent: NewItem): ThunkAddItemAction =>
  (dispatch, getState) => {
    dispatch({ type: ADD_ITEM_REQUEST });

    addRemoteItems({
      type: itemType,
      userID: getState().auth.userID,
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
