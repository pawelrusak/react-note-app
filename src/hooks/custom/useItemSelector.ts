import { useSelector } from 'react-redux';

import { itemByTypeAndIDSelector } from '~/store/items/itemsSelectors';

import type { Variants, Item } from '~/commonTypes';

export const useItemSelector = <V extends Variants>(itemType: V, itemID: Item['id']) =>
  useSelector(itemByTypeAndIDSelector(itemType, itemID));
