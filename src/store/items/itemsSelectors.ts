import type { Variants, Item } from '~/commonTypes';

import type { RootState } from '~/store';

export const itemByTypeAndIDSelector =
  <T extends Variants>(variant: T, itemID: string) =>
  (store: RootState) =>
    (store.items[variant] as Item<T>[]).find((item) => item.id === itemID);

export const itemVariantSelector =
  <T extends Variants>(variant: T) =>
  (state: RootState) =>
    state.items[variant];

export const itemsStatusSelector = () => (state: RootState) => state.items.status;
