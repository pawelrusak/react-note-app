import { useDispatch } from 'react-redux';
import { removeItem } from 'actions';

export const useRemoveItemAction = () => {
  const dispatch = useDispatch();

  return (itemType, id) => dispatch(removeItem(itemType, id));
};
