import { useDispatch } from 'react-redux';

import { addItem } from '~/store/items/itemsSlice';

import type { Variants, NewItem } from '~/commonTypes';

export const useAddItemAction = <V extends Variants>() => {
  const dispatch = useDispatch();

  return (itemVariant: V, newItem: NewItem<V>) =>
    dispatch(addItem({ itemVariant, itemContent: newItem }));
};
