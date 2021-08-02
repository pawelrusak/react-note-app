import { useSelector } from 'react-redux';

import type { RootState } from '~/store';

export const useItemsStatus = () => {
  const loading = useSelector((state: RootState) => state.items.isLoading);

  return { isLoading: () => loading };
};
