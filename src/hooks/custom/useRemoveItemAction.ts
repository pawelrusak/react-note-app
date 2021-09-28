import { useDispatch } from 'react-redux';

import { removeItem } from '~/store/items/itemsSlice';

import type { Variants } from '~/commonTypes';

export const useRemoveItemAction = <V extends Variants>() => {
  const dispatch = useDispatch();

  return (itemVariant: V, id: string) => dispatch(removeItem({ itemVariant, id }));
};
