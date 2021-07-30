import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ItemVariants } from '~/commonTypes';
import { fetchItems } from '~/store/items/itemsSlice';

import type { RootState, ItemsState } from '~/store';

type UseFetchItemsReturn<T extends ItemVariants> = {
  data: ItemsState[T];
  isLoading: () => boolean;
};

export const useFetchItems = <T extends ItemVariants>(itemVariant: T): UseFetchItemsReturn<T> => {
  const data = useSelector((state: RootState) => state.items[itemVariant]);
  const loading = useSelector((state: RootState) => state.items.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems({ itemVariant }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading: () => loading,
  };
};
