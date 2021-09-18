import { useDispatch, useSelector } from 'react-redux';

import { searchVariantSelector } from '~/store/search/searchSelectors';
import { searchItems } from '~/store/search/searchSlice';

import type { Variants } from '~/commonTypes';

export const useSearchState = <T extends Variants>(variant: T) => {
  const dispatch = useDispatch();
  const search = useSelector(searchVariantSelector(variant));

  const setSearch = (value: string) => {
    dispatch(searchItems({ variant, value }));
  };

  return [search, setSearch] as const;
};
