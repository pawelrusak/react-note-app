import { useDispatch } from 'react-redux';

import { removeItem } from '~/store/items/itemsSlice';

import type { Variant, Item } from '~/commonTypes';

export const useRemoveItemAction = <V extends Variant>() => {
  const dispatch = useDispatch();

  return (variant: V, id: Item['id']) => dispatch(removeItem({ variant, id }));
};
