import { useLocation } from 'react-router-dom';

import type { ItemVariants } from '~/commonTypes';

export const useCurrentPageType = (): ItemVariants => {
  const { pathname } = useLocation();

  const AVAILABLE_PAGE_TYPES = ['twitters', 'articles', 'notes'] as const;
  const [currentRootDirectory] = pathname.split('/').filter(Boolean);
  const currentPageType = AVAILABLE_PAGE_TYPES.find(
    (pageType) => pageType === currentRootDirectory,
  );

  return currentPageType ?? 'notes';
};
