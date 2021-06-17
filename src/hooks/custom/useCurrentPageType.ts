import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import type { ItemVariants } from '~/commonTypes';

export const useCurrentPageType = () => {
  const [pageType, setPageType] = useState<ItemVariants | undefined>('notes');
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTypes = ['twitters', 'articles', 'notes'] as const;

    const [currentPage] = pageTypes.filter((page) => pathname.includes(page));

    setPageType(currentPage);
  }, [pathname]);

  return pageType;
};
