import { useDispatch } from 'react-redux';

import { addItem } from '~/store/items/itemsSlice';

import type { Variant, NewItem } from '~/commonTypes';

export const useAddItemAction = <V extends Variant>() => {
  const dispatch = useDispatch();

  return (variant: V, newItem: NewItem<V>) => dispatch(addItem({ variant, newItem }));
};
