import { useSelector } from 'react-redux';

import { itemsStatusSelector } from '~/store/items/itemsSelectors';

export const useItemsStatus = () => {
  const status = useSelector(itemsStatusSelector());

  return {
    isLoading: () => status === 'idle' || status === 'loading',
    isSucceeded: () => status === 'succeeded',
    isFailed: () => status === 'failed',
  };
};
