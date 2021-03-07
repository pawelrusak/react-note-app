import { v4 as getUuid } from 'uuid';
import { authenticateUser } from 'api';

export const removeItem = (itemType, id) => ({
  type: 'REMOVE_ITEM',
  payload: {
    itemType,
    id,
  },
});

export const addItem = (itemType, itemContent) => ({
  type: 'ADD_ITEM',
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
  dispatch({ type: 'AUTHENTICATE_REQUEST' });

  return (
    authenticateUser(email, password)
      .then((payload) => {
        dispatch({ type: 'AUTHENTICATE_SUCCESS', payload });
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        dispatch({ type: 'AUTHENTICATE_FAILURE' });
      })
  );
};
