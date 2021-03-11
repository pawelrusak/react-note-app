import {
  ADD_ITEM,
  REMOVE_ITEM,
  AUTH_SUCCESS,
  // eslint-disable-next-line
  FETCH_REQUEST,
  FETCH_SUCCESS,
  // eslint-disable-next-line
  FETCH_FAILURE,
} from 'actions';

const initialState = {
  /**
   * You can find the original code of the course in the link below.
   *
   * @deprecated This hard code userID property value will be removing in future
   *
   * @see {@link https://github.com/eduwebpl/kurs-react-w-praktyce/blob/ce05514413ce0d022623870c7327ca4fe7dea0d5/06/src/reducers/index.js#L4}
   */
  userID: process.env.REACT_APP_TEMPORARY_USER_ID,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
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
        userID: action.payload.user.uid,
      };
    case ADD_ITEM:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.item],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter((item) => item.id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
