import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { itemVariantSelector } from '~/store/items/itemsSelectors';

import type { Variant, Item } from '~/commonTypes';
import type { RootState, ItemsState } from '~/store';

export const searchVariantSelector =
  <T extends Variant>(variant: T) =>
  (state: RootState) =>
    state.search[variant];

export const searchItemsByVariantSelector = <T extends Variant>(variant: T) =>
  createDraftSafeSelector(
    itemVariantSelector(variant),
    searchVariantSelector(variant),
    (items, filter) => {
      return (items as Item<T>[]).filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase()),
      ) as ItemsState[T];
    },
  );
