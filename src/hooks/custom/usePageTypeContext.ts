import { useContext } from 'react';

import PageContext from '~/context';

import type { ItemVariants } from '~/commonTypes';

export const usePageTypeContext = (initialValue: ItemVariants = 'notes'): ItemVariants => {
  const pageType = useContext(PageContext);

  return pageType ?? initialValue;
};
