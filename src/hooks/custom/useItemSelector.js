import { useSelector } from 'react-redux';
import { itemByTypeAndIDSelector } from 'selectors';

export const useItemSelector = (itemType, itemID) =>
  useSelector(itemByTypeAndIDSelector(itemType, itemID));
