import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ItemVariants } from '~/commonTypes';
import { fetchItems } from '~/store/items/itemsSlice';

import type { RootState, ItemsState } from '~/store';

export const useFetchItems = <T extends ItemVariants>(itemVariant: T): ItemsState[T] => {
  const items = useSelector((state: RootState) => state.items[itemVariant]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems({ itemVariant }));
  }, [dispatch, itemVariant]);

  return items;
};
