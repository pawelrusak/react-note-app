import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useItemsStatus } from './useItemsStatus';

import { fetchItems } from '~/store/items/itemsSlice';
import { searchItemsByVariantSelector } from '~/store/search/searchSelectors';

import type { Variant } from '~/commonTypes';
import type { ItemsState } from '~/store';

type UseFetchItemsReturn<V extends Variant> = {
  data: ItemsState[V];
  isLoading: () => boolean;
  isSucceeded: () => boolean;
};

export const useFetchItems = <V extends Variant>(variant: V): UseFetchItemsReturn<V> => {
  const searchedItems = useSelector(searchItemsByVariantSelector(variant));
  const { isLoading, isSucceeded } = useItemsStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems({ variant }));
  }, [dispatch, variant]);

  return {
    data: searchedItems,
    isLoading,
    isSucceeded,
  };
};
