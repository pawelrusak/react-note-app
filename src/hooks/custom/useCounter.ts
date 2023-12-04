import { useSelector } from 'react-redux';

import { itemVariantSelector } from '~/store/items/itemsSelectors';
import {
  searchItemsByVariantSelector,
  searchVariantSelector,
} from '~/store/search/searchSelectors';

import type { Variant } from '~/commonTypes';

export const useCounter = <V extends Variant>(variant: V) => {
  const searchedItems = useSelector(searchItemsByVariantSelector(variant));
  const items = useSelector(itemVariantSelector(variant));
  const searchQuery = useSelector(searchVariantSelector(variant));

  return {
    currentNumber: searchedItems.length,
    totalNumber: items.length,
    isSearching: () => Boolean(searchQuery),
  };
};
