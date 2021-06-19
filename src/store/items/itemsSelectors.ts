import type { ItemVariants, Item } from '~/commonTypes';
import type { RootState } from '~/store';

export const itemByTypeAndIDSelector =
  <T extends ItemVariants>(itemType: T, itemID: string) =>
  (store: RootState) =>
    (store.items[itemType] as Item[] | undefined)?.find((item) => item.id === itemID);
