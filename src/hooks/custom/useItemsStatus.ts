import { useSelector } from 'react-redux';

import type { RootState } from '~/store';

export const useItemsStatus = () => {
  const status = useSelector((state: RootState) => state.items.status);

  return {
    isLoading: () => status === 'idle' || status === 'loading',
    isSucceeded: () => status === 'succeeded',
    isFailed: () => status === 'failed',
  };
};
