import {
  ADD_ITEM_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from '~/constants/actionTypes';

import type {
  FetchRequestAction,
  FetchSuccessAction,
  FetchFailureAction,
  RemoveItemSuccessAction,
  AddItemSuccessAction,
} from './itemsActions';
import type { Item, NoteItem, ArticleItem, TwitterItem } from '~/commonTypes';

export type ItemsState = {
  readonly notes: NoteItem[];
  readonly twitters: TwitterItem[];
  readonly articles: ArticleItem[];
  readonly isLoading: boolean;
};

const initialState = {
  notes: [],
  twitters: [],
  articles: [],
  isLoading: false,
};

type RootAction =
  | FetchRequestAction
  | FetchSuccessAction
  | FetchFailureAction
  | RemoveItemSuccessAction
  | AddItemSuccessAction;

const rootReducer = (state: ItemsState = initialState, action: RootAction) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.itemType]: [...action.payload.data],
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.data],
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...(state[action.payload.itemType] as Item[]).filter(
            (item) => item.id !== action.payload.id,
          ),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
