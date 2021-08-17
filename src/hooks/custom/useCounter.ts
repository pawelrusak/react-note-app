import { useSelector } from 'react-redux';

import { itemVariantSelector } from '~/store/items/itemsSelectors';
import {
  searchItemsByVariantSelector,
  searchVariantSelector,
} from '~/store/search/searchSelectors';

import type { ItemVariants } from '~/commonTypes';

export const useCounter = <T extends ItemVariants>(variant: T) => {
  const searchedItems = useSelector(searchItemsByVariantSelector(variant));
  const items = useSelector(itemVariantSelector(variant));
  const searchQuery = useSelector(searchVariantSelector(variant));

  return {
    currentNumber: searchedItems.length,
    totalNumber: items.length,
    isSearching: () => Boolean(searchQuery),
  };
};
