import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ItemVariants } from '~/commonTypes';
import { fetchItems } from '~/store/items/itemsActions';

import type { RootState, ItemsState } from '~/reducers';

export const useFetchItems = <T extends ItemVariants>(itemType: T): ItemsState[T] => {
  const items = useSelector((state: RootState) => state.items[itemType]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems(itemType));
  }, [dispatch, itemType]);

  return items;
};
