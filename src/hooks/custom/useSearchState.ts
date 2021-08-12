import { useDispatch, useSelector } from 'react-redux';

import { ItemVariants } from '~/commonTypes';
import { searchVariantSelector } from '~/store/search/searchSelectors';
import { searchItems } from '~/store/search/searchSlice';

export const useSearchState = <T extends ItemVariants>(variant: T) => {
  const dispatch = useDispatch();
  const search = useSelector(searchVariantSelector(variant));

  const setSearch = (value: string) => {
    dispatch(searchItems({ variant, value }));
  };

  return [search, setSearch] as const;
};
