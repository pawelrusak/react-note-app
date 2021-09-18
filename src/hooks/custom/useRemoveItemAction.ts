import { useDispatch } from 'react-redux';

import { removeItem } from '~/store/items/itemsSlice';

import type { Variants } from '~/commonTypes';

export const useRemoveItemAction = () => {
  const dispatch = useDispatch();

  return (itemVariant: Variants, id: string) => dispatch(removeItem({ itemVariant, id }));
};
