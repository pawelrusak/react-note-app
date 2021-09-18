import { useSelector } from 'react-redux';

import { itemByTypeAndIDSelector } from '~/store/items/itemsSelectors';

import type { Variants } from '~/commonTypes';

export const useItemSelector = (itemType: Variants, itemID: string) =>
  useSelector(itemByTypeAndIDSelector(itemType, itemID));
