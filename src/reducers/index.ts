import firebase from 'firebase/app';
import { Item, NoteItem, ArticleItem, TwitterItem, ItemVariants } from 'commonTypes';
import {
  ADD_ITEM_SUCCESS,
  // REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  AUTH_SUCCESS,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  // eslint-disable-next-line
  FETCH_FAILURE,
} from 'actions';

export type RootState = {
  readonly notes: NoteItem[];
  readonly twitters: TwitterItem[];
  readonly articles: ArticleItem[];
  readonly userID: string | null;
  readonly isLoading: boolean;
};

const initialState = {
  notes: [],
  twitters: [],
  articles: [],
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

type RootAction =
  | { type: typeof FETCH_REQUEST }
  | { type: typeof FETCH_SUCCESS; payload: { itemType: ItemVariants; data: Item[] } }
  | { type: typeof FETCH_FAILURE }
  | { type: typeof REMOVE_ITEM_SUCCESS; payload: { itemType: ItemVariants; id: string } }
  | { type: typeof ADD_ITEM_SUCCESS; payload: { itemType: ItemVariants; data: Item } }
  | { type: typeof AUTH_SUCCESS; payload: firebase.auth.UserCredential };

const rootReducer = (state: RootState = initialState, action: RootAction) => {
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
