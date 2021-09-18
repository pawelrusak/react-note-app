import { useDispatch } from 'react-redux';

import { addItem } from '~/store/items/itemsSlice';

import type { Variants, NewItem } from '~/commonTypes';

export const useAddItemAction = <T extends Variants>() => {
  const dispatch = useDispatch();

  return (itemVariant: T, newItem: NewItem) =>
    dispatch(addItem({ itemVariant, itemContent: newItem }));
};
