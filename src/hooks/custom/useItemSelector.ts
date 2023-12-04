import { useSelector } from 'react-redux';

import { itemByTypeAndIDSelector } from '~/store/items/itemsSelectors';

import type { Variant, Item } from '~/commonTypes';

export const useItemSelector = <V extends Variant>(itemType: V, itemID: Item['id']) =>
  useSelector(itemByTypeAndIDSelector(itemType, itemID));
