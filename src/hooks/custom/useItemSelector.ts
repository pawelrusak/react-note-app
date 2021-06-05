import { useSelector } from 'react-redux';
import { itemByTypeAndIDSelector } from 'selectors';
import type { ItemVariants } from 'commonTypes';

export const useItemSelector = (itemType: ItemVariants, itemID: string) =>
  useSelector(itemByTypeAndIDSelector(itemType, itemID));
