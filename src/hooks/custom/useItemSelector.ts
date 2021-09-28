import { useSelector } from 'react-redux';

import { itemByTypeAndIDSelector } from '~/store/items/itemsSelectors';

import type { Variants } from '~/commonTypes';

export const useItemSelector = <V extends Variants>(itemType: V, itemID: string) =>
  useSelector(itemByTypeAndIDSelector<V>(itemType, itemID));
