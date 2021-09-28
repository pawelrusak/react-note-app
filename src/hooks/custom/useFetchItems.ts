import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useItemsStatus } from './useItemsStatus';

import { fetchItems } from '~/store/items/itemsSlice';
import { searchItemsByVariantSelector } from '~/store/search/searchSelectors';

import type { Variants } from '~/commonTypes';
import type { ItemsState } from '~/store';

type UseFetchItemsReturn<V extends Variants> = {
  data: ItemsState[V];
  isLoading: () => boolean;
};

export const useFetchItems = <V extends Variants>(variant: V): UseFetchItemsReturn<V> => {
  const searchedItems = useSelector(searchItemsByVariantSelector(variant));
  const { isLoading } = useItemsStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems({ variant }));
  }, [dispatch, variant]);

  return {
    data: searchedItems,
    isLoading,
  };
};
