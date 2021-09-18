import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useItemsStatus } from './useItemsStatus';

import { fetchItems } from '~/store/items/itemsSlice';
import { searchItemsByVariantSelector } from '~/store/search/searchSelectors';

import type { Variants } from '~/commonTypes';
import type { ItemsState } from '~/store';

type UseFetchItemsReturn<T extends Variants> = {
  data: ItemsState[T];
  isLoading: () => boolean;
};

export const useFetchItems = <T extends Variants>(itemVariant: T): UseFetchItemsReturn<T> => {
  const searchedItems = useSelector(searchItemsByVariantSelector(itemVariant));
  const { isLoading } = useItemsStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems({ itemVariant }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: searchedItems,
    isLoading,
  };
};
