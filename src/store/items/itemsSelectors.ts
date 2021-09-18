import type { Variants, Item } from '~/commonTypes';
import type { RootState } from '~/store';

export const itemByTypeAndIDSelector =
  <T extends Variants>(itemType: T, itemID: string) =>
  (store: RootState) =>
    (store.items[itemType] as Item[] | undefined)?.find((item) => item.id === itemID);

export const itemVariantSelector =
  <T extends Variants>(variant: T) =>
  (state: RootState) =>
    state.items[variant];
