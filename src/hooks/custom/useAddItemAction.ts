import { useDispatch } from 'react-redux';

import { addItem } from '~/store/items/itemsSlice';

import type { ItemVariants, NewItem } from '~/commonTypes';

export const useAddItemAction = <T extends ItemVariants>() => {
  const dispatch = useDispatch();

  return (itemVariant: T, newItem: NewItem) =>
    dispatch(addItem({ itemVariant, itemContent: newItem }));
};
