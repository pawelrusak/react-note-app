import { useDispatch } from 'react-redux';

import { removeItem } from '~/store/items/itemsSlice';

import type { Variants, Item } from '~/commonTypes';

export const useRemoveItemAction = <V extends Variants>() => {
  const dispatch = useDispatch();

  return (variant: V, id: Item['id']) => dispatch(removeItem({ variant, id }));
};
