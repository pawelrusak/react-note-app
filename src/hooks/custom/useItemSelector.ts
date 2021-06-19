import { useSelector } from 'react-redux';

import { itemByTypeAndIDSelector } from '~/store/items/itemsSelectors';

import type { ItemVariants } from '~/commonTypes';

export const useItemSelector = (itemType: ItemVariants, itemID: string) =>
  useSelector(itemByTypeAndIDSelector(itemType, itemID));
