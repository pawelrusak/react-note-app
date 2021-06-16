import type { RootState } from '~/reducers';
import type { ItemVariants, Item } from '~/commonTypes';

export const itemByTypeAndIDSelector =
  <T extends ItemVariants>(itemType: T, itemID: string) =>
  (store: RootState) =>
    (store[itemType] as Item[] | undefined)?.find((item) => item.id === itemID);

export const userIDSelector = ({ userID }: RootState) => userID;
