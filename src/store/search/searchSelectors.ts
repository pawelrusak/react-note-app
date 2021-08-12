import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { ItemVariants, Item } from '~/commonTypes';
import { itemVariantSelector } from '~/store/items/itemsSelectors';

import type { RootState, ItemsState } from '~/store';

export const searchVariantSelector =
  <T extends ItemVariants>(variant: T) =>
  (state: RootState) =>
    state.search[variant];

export const searchItemsByVariantSelector = <T extends ItemVariants>(variant: T) =>
  createDraftSafeSelector(
    itemVariantSelector(variant),
    searchVariantSelector(variant),
    (items, filter) => {
      return (items as Item[]).filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase()),
      ) as ItemsState[T];
    },
  );
