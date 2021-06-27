import { useDispatch } from 'react-redux';

import { removeItem } from '~/store/items/itemsSlice';

import type { ItemVariants } from '~/commonTypes';

export const useRemoveItemAction = () => {
  const dispatch = useDispatch();

  return (itemVariant: ItemVariants, id: string) => dispatch(removeItem({ itemVariant, id }));
};
