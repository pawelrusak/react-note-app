import { ItemVariants } from '~/commonTypes';

import type { RootState } from '~/store';

export const searchVariantSelector =
  <T extends ItemVariants>(variant: T) =>
  (state: RootState) =>
    state.search[variant];
