import { useDispatch } from 'react-redux';

import { removeItem } from '~/store/items/itemsActions';

import type { ItemVariants } from '~/commonTypes';

export const useRemoveItemAction = () => {
  const dispatch = useDispatch();

  return (itemType: ItemVariants, id: string) => dispatch(removeItem(itemType, id));
};
