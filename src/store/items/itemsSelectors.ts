import type { Variant, Item } from '~/commonTypes';

import type { RootState } from '~/store';

export const itemByTypeAndIDSelector =
  <T extends Variant>(variant: T, itemID: string) =>
  (store: RootState) =>
    (store.items[variant] as Item<T>[]).find((item) => item.id === itemID);

export const itemVariantSelector =
  <T extends Variant>(variant: T) =>
  (state: RootState) =>
    state.items[variant];

export const itemsStatusSelector = () => (state: RootState) => state.items.status;
